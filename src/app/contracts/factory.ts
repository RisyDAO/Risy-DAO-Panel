import { risyTokenContract } from "../client";
import { TokenReader } from "./token/tokenReader";
import { TokenWriter } from "./token/tokenWriter";
import { type Account } from "thirdweb/wallets";

export class ContractFactory {
  private static tokenReader: TokenReader;
  private static tokenWriter: TokenWriter;

  static getTokenReader(): TokenReader {
    if (!this.tokenReader) {
      this.tokenReader = new TokenReader(risyTokenContract);
    }
    return this.tokenReader;
  }

  static getTokenWriter(account: Account): TokenWriter {
    if (!this.tokenWriter || this.tokenWriter.account !== account) {
      this.tokenWriter = new TokenWriter(risyTokenContract, account);
    }
    return this.tokenWriter;
  }
} 