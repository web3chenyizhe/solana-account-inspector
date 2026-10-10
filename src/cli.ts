#!/usr/bin/env node
import { inspectAccount } from "./rpc.js";

const account = process.argv[2];
const rpcUrl = process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com";
if (!account) {
  console.error("Usage: npm run inspect -- <ACCOUNT_ADDRESS>");
  process.exit(2);
}

try {
  const result = await inspectAccount(account, rpcUrl);
  if (!result) {
    console.error("Account not found on the selected cluster");
    process.exit(3);
  }
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
