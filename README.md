![](https://siasky.net/vAEov_UffYU0bj_Vg-DyASXGGevpA0pYDXBUFgeNqXSw4Q)

## The Problem

Need for a Do It Yourself Ethereum (Hardware) Wallet.

## The Goal

An Ethereum Wallet GUI powered by [Signatory Server](https://signatory.dev), that:

- [x] Creates accounts from imported mnemonic phrases or keystore files
- [x] Allows generation of mnemonic phrases and keystore files
- [x] Provides ability to sign and verify messages
- [ ] Provides ability to sign and broadcast transactions

It is greatly inspired by [MyCrypto Wallet](https://github.com/MyCryptoHQ/MyCrypto), an electronjs client for generating ether wallets, handling ERC-20 tokens, and interacting with the blockchain more easily.

## Getting started

1. Setup [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/install/).

2. Copy `.env.sample` to `.env` and configure appropriately.

3. Clone this repo and run:

   \$ make

4. Visit app at http://localhost:4444

If you install the client on a remote node like a single-board computer, be sure to update the server location in settings.

## Contributing

How to contribute, build and release are outlined in [CONTRIBUTING.md](CONTRIBUTING.md), [BUILDING.md](BUILDING.md) and [RELEASING.md](RELEASING.md) respectively. Commits in this repository follow the [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) specification.
