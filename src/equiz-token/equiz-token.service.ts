import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ethers } from 'ethers';

import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { EQuizToken } from 'src/entities/equiz-token';
import { EQuizToken__factory } from 'typechain-types';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Injectable()
export class EquizTokenService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(EQuizToken)
    private EQuizTokenRepository: Repository<EQuizToken>,
  ) {
    // this.startEQuizService();
  }

  async startEQuizService() {
    await this.contractCall();
  }

  async contractCall() {
    const sepoliaProvider = new ethers.providers.JsonRpcProvider(
      this.configService.get<string>('ENV_SEPOLIA_TESTNET'),
    );

    const sepoliaSigner = new ethers.Wallet(
      this.configService.get<string>('ENV_PRIVATE_KEY'),
      sepoliaProvider,
    );

    const sepoliaAddress = this.configService.get<string>(
      'ENV_SEPOLIA_ADDRESS',
    );

    const sepoliaContract = EQuizToken__factory.connect(
      sepoliaAddress,
      sepoliaSigner,
    );

    const amount = 100;

    try {
      const contractClaim = await sepoliaContract.claim(amount);
      const contractReceipt = await contractClaim.wait(1);

      const transferTokenEvent = contractReceipt.events?.find(
        (emit) => emit.event === 'TransferToken',
      );

      const EQuizTransferToken: EQuizToken = this.EQuizTokenRepository.create();

      if (transferTokenEvent !== undefined) {
        EQuizTransferToken.block_number = transferTokenEvent.blockNumber;
        EQuizTransferToken.block_hash = transferTokenEvent.blockHash;
        EQuizTransferToken.transaction_hash =
          transferTokenEvent.transactionHash;
        EQuizTransferToken.transferToken_event = transferTokenEvent.event;
        EQuizTransferToken.contract_address = transferTokenEvent.address;
        EQuizTransferToken.from_address = transferTokenEvent.args.ownerAddress;
        EQuizTransferToken.to_address = transferTokenEvent.args.claimerAddress;
        EQuizTransferToken.transfer_amount = String(
          parseInt(transferTokenEvent.args.transferAmount._hex, 16) / 10 ** 18,
        );
        EQuizTransferToken.player_address =
          transferTokenEvent.args.claimerAddress;
        EQuizTransferToken.player_score = String(
          parseInt(transferTokenEvent.args.transferAmount._hex, 16) / 10 ** 18,
        );

        await this.EQuizTokenRepository.save(EQuizTransferToken);
      }

      return Promise.all([EQuizTransferToken]);
    } catch (error) {
      console.log('Error in EGame Service:', error);
    } finally {
      await sleep(this.configService.get<number>('ENV_SEPOLIA_BLOCKTIME'));
      await this.contractCall();
    }
  }

  async claimContractCall(score: string, claim_receipt: any) {
    const transferTokenEvent = claim_receipt.events?.find(
      (emit: any) => emit.event === 'TransferToken',
    );

    const EQuizTransferToken: EQuizToken = this.EQuizTokenRepository.create();

    if (transferTokenEvent !== undefined) {
      EQuizTransferToken.block_number = transferTokenEvent.blockNumber;
      EQuizTransferToken.block_hash = transferTokenEvent.blockHash;
      EQuizTransferToken.transaction_hash = transferTokenEvent.transactionHash;
      EQuizTransferToken.transferToken_event = transferTokenEvent.event;
      EQuizTransferToken.contract_address = transferTokenEvent.address;
      EQuizTransferToken.from_address = transferTokenEvent.args[0];
      EQuizTransferToken.to_address = transferTokenEvent.args[1];
      EQuizTransferToken.transfer_amount = score;
      EQuizTransferToken.player_address = transferTokenEvent.args[1];
      EQuizTransferToken.player_score = String(
        parseInt(transferTokenEvent.args[2].hex, 16) / 10 ** 18,
      );

      await this.EQuizTokenRepository.save(EQuizTransferToken);
    }

    return Promise.all([EQuizTransferToken]);
  }
}
