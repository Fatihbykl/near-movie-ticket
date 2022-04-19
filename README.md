# Near Movie Ticket

This is a project that users can buy movie tickets with a NEAR tokens.

## Cloning the project

```
git clone https://github.com/Fatihbykl/near-movie-ticket.git
```
After that please run
```
yarn
```
for install all of the necessary packages.

## Building and deploying the contract

Follow these steps for the deploy contract to the NEAR testnet

1. run `yarn build:release`
2. run `near dev-deploy ./build/release/ticket.wasm`

Second command will create testnet account and deploy the contract into it. You can find your account id after executing this command. It will look like this: dev-###-###

### Setting environment variable

You need to set environment variable for be able to run the contract

```
export CONTRACT=ACCOUNT_ID
```
After these steps you should initialize contract with
```
near call $CONTRACT init '{}' --accountId $CONTRACT
```

## Scripts

### `./scripts/1.dev-deploy.sh`
It creates a new testnet account and deply the contract into it automatically.
### `./scripts/2.use-contract.sh`
1. Initiates the contract
2. Creates example event
3. Buys a ticket
4. Shows transactions

## Functions

