# Solana Account Inspector

A read-only command-line tool for inspecting a Solana account. It reports the account owner, lamports, executable flag, rent epoch, and decoded data length without interpreting untrusted account bytes.

## Run

```bash
npm ci
npm run inspect -- <ACCOUNT_ADDRESS>
```

The default endpoint is `https://api.devnet.solana.com`. Override it with:

```bash
SOLANA_RPC_URL=https://api.testnet.solana.com npm run inspect -- <ACCOUNT_ADDRESS>
```

## Verify

```bash
npm run check
```

## Deployment

No hosted deployment is needed. Install Node.js 20.18+, clone the repository, and run `npm ci`. The optional `SOLANA_RPC_URL` environment variable selects an RPC endpoint.

## Security notes

- The tool never executes or deserializes instructions found in account data.
- RPC output is treated as untrusted and checked before decoding.
- It does not request keys, sign transactions, or write on-chain state.

## License

MIT
