import { ContractWriter, TransferResult } from "../types";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { toWei } from "../../utils/formatUtils";
import { RISY_TOKEN_CONFIG } from "../../config/tokens";
import { type Account } from "thirdweb/wallets";

export class TokenWriter implements ContractWriter<typeof import("../../client").risyTokenContract> {
  constructor(
    public contract: typeof import("../../client").risyTokenContract,
    public account: Account
  ) {}

  async transfer(to: string, amount: string): Promise<TransferResult> {
    const amountInWei = toWei(amount, RISY_TOKEN_CONFIG.decimals);
    
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
    const amountInWei = toWei(amount, RISY_TOKEN_CONFIG.decimals);
    
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