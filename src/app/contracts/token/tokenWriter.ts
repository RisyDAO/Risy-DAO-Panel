import { ContractWriter, TransferResult } from "../types";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { BaseTokenService } from "./baseTokenService";
import { type Account } from "thirdweb/wallets";
import { TransactionError } from "../../utils/errorUtils";
import { type PreparedTransaction } from "thirdweb";

export class TokenWriter extends BaseTokenService<typeof import("../../client").risyTokenContract> implements ContractWriter<typeof import("../../client").risyTokenContract> {
  constructor(
    contract: typeof import("../../client").risyTokenContract,
    public account: Account
  ) {
    super(contract);
  }

  async prepare(method: "transfer" | "burn" | "approve", params: string[]): Promise<PreparedTransaction> {
    if (!this.validateAmount(params[method === "burn" ? 0 : 1])) {
      throw new TransactionError("Invalid amount");
    }

    const amount = this.convertToWei(params[method === "burn" ? 0 : 1]);

    if (method === "burn") {
      return prepareContractCall({
        contract: this.contract,
        method: "function burn(uint256 value)",
        params: [amount]
      });
    }

    if (method === "approve") {
      return prepareContractCall({
        contract: this.contract,
        method: "function approve(address spender, uint256 value)",
        params: [params[0], amount]
      });
    }

    return prepareContractCall({
      contract: this.contract,
      method: "function transfer(address to, uint256 value) returns (bool)",
      params: [params[0], amount]
    });
  }

  async transfer(to: string, amount: string): Promise<TransferResult> {
    if (!this.validateAmount(amount)) {
      throw new TransactionError("Invalid amount");
    }

    const amountInWei = this.convertToWei(amount);
    
    const transaction = await this.prepare("transfer", [to, amount]);

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

    const transaction = await this.prepare("burn", [amount]);

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