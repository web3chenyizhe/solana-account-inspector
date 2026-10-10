export type AccountSummary = {
  address: string;
  owner: string;
  lamports: number;
  executable: boolean;
  dataLength: number;
  rentEpoch: number;
};

type RpcAccount = {
  data: [string, string];
  executable: boolean;
  lamports: number;
  owner: string;
  rentEpoch: number;
};

export function summarizeAccount(address: string, value: RpcAccount): AccountSummary {
  if (!Array.isArray(value.data) || value.data[1] !== "base64") throw new Error("Unexpected account encoding");
  return {
    address,
    owner: value.owner,
    lamports: value.lamports,
    executable: value.executable,
    dataLength: Buffer.from(value.data[0], "base64").byteLength,
    rentEpoch: value.rentEpoch,
  };
}

export async function inspectAccount(address: string, rpcUrl: string): Promise<AccountSummary | null> {
  const response = await fetch(rpcUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "getAccountInfo", params: [address, { encoding: "base64", commitment: "confirmed" }] }),
  });
  if (!response.ok) throw new Error(`RPC HTTP ${response.status}`);
  const body = await response.json() as { error?: { message: string }; result?: { value: RpcAccount | null } };
  if (body.error) throw new Error(body.error.message);
  if (!body.result) throw new Error("Malformed RPC response");
  return body.result.value ? summarizeAccount(address, body.result.value) : null;
}
