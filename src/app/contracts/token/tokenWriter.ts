import { ContractWriter, TransferResult } from "../types";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { BaseTokenService } from "./baseTokenService";
import { type Account } from "thirdweb/wallets";
import { TransactionError } from "../../utils/errorUtils";

export class TokenWriter extends BaseTokenService<typeof import("../../client").risyTokenContract> implements ContractWriter<typeof import("../../client").risyTokenContract> {
  constructor(
    contract: typeof import("../../client").risyTokenContract,
    public account: Account
  ) {
    super(contract);
  }

  async transfer(to: string, amount: string): Promise<TransferResult> {
    if (!this.validateAmount(amount)) {
      throw new TransactionError("Invalid amount");
    }

    const amountInWei = this.convertToWei(amount);
    
    const transaction = await prepareContractCall({
      contract: this.contract,
      method: "function transfer(address to, uint256 value) returns (bool)",
      params: [to, amountInWei]
    });

    const { transactionHash } = await sendTransaction({
      transaction,
      account: this.account
    });
    
    return {
      transactionHash,
      success: true
    };
  }

  async burn(amount: string): Promise<TransferResult> {
    if (!this.validateAmount(amount)) {
      throw new TransactionError("Invalid amount");
    }

    const amountInWei = this.convertToWei(amount);
    
    const transaction = await prepareContractCall({
      contract: this.contract,
      method: "function burn(uint256 value)",
      params: [amountInWei]
    });

    const { transactionHash } = await sendTransaction({
      transaction,
      account: this.account
    });
    
    return {
      transactionHash,
      success: true
    };
  }
} 