![](https://siasky.net/PAMGM9PeehQQWOYCCC7B8ux2go5FgiMIu0gxvSO-0v770A)

## The Problem

Need for a Do It Yourself Ethereum (Hardware) Wallet.

## The Goal

An Ethereum Wallet GUI powered by [Signatory Server](https://signatory.dev), that:

- [x] Creates accounts from imported mnemonic phrases or keystore files
- [x] Allows generation of mnemonic phrases and keystore files
- [x] Provides ability to sign and verify messages
- [x] Provides ability to sign and broadcast transactions
- [ ] Interact with smart contracts
- [ ] Send ERC20 tokens

It is greatly inspired by [MyCrypto Wallet](https://github.com/MyCryptoHQ/MyCrypto), an electronjs client for generating ether wallets, handling ERC-20 tokens, and interacting with the blockchain more easily.

## Getting started

1. Setup [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/install/).

2. Clone this repo and run:

```
    $ make
```

3. Visit app at http://localhost:4444

## Upgrading

Rerun `make run` to use the latest updates. This will:

- Pull any fresh docker image layers
- Remove old docker image layers
- Recreate the docker containers

This preserves any previously imported accounts which are stored in the local `data` directory.

## Video Demo

https://youtu.be/g6LZ1osKw8k

## Contributing

### Building from source

The project is mainly composed of a React frontend that interfaces with an instance of the Signatory Server. To get started,

1. Ensure you have the following pre-requisites:

- NodeJS 10.x
- Yarn

2. Install the node dependencies

```
    yarn
```

3. Start the Signatory server

```
    yarn server
```

This starts the server on port 1999.

4. Start the frontend builder

```
    yarn start
```

This starts a package builder that exposes the frontend on port 4444. It also watches for file changes, builds a new bundle and reloads the current tab to view the change.

### Features

The frontend app is a Reactjs app that utilizes the following main packages:

- Redux for the global store
- MaterialUI for consistent material design UX
- OpenRPC for communication with the Signatory Server
- ReactIdleTimer for session timeout management

### Build & Release

Bundle the frontend app to `build/` with:

```
  yarn build
```

Then run `./buildx.sh my-image-name:tag` to build multi-arch docker images which you can then push to a private docker registry or to [Docker Hub](https://hub.docker.com/).

## Documentation

How to contribute, build and release are outlined in [CONTRIBUTING.md](CONTRIBUTING.md), [BUILDING.md](BUILDING.md) and [RELEASING.md](RELEASING.md) respectively. Commits in this repository follow the [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) specification.
