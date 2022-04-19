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

### init
---
* This function can only be called once
* Sets the function caller as owner
* Does not take any parameters

Example call: `near call $CONTRACT init '{}' --accountId $CONTRACT`

### createEvent
---
* Only owner can call this function
* Creates event with a given parameters
* Takes 10 parameters

| Parameter     | Type          |
| ------------- |---------------|
| title         | string        |
| director      | string        |
| year          | u32           |
| genres        | string        |
| plot          | string        |
| cinema        | string        |
| city          | string        |
| date          | string        |
| max           | u32           |
| price         | u32           |

Example call: `near call $CONTRACT createEvent '{ "title": "Jagten", "director": "Thomas Vinterberg", "year": 2012, "genres": "Drama", "plot": "plot", "cinema": "Serdivan AVM", "city": "Sakarya", "date": "20.04.2022", "max": 100, "price": 1}' --accountId $CONTRACT`

### removeEvent
---
* Only owner can call this function
* Takes 1 parameter

| Parameter     | Type          |
| ------------- |---------------|
| id            | u32           |

Example call: `near call $CONTRACT removeEvent '{ "id": 0 }' --accountId $CONTRACT`

### buyTicket
---
* Event must be active
* Event's remaining tickets must be greater than 0
* Deposited NEAR must be greater than event's price
* Takes 1 parameter

| Parameter     | Type          |
| ------------- |---------------|
| id            | u32           |

Example call: `near call $CONTRACT buyTicket '{ "id": 0 }' --accountId $CONTRACT --deposit 1`

### findById
---
* Finds and returns event
* Takes 1 parameter

| Parameter     | Type          |
| ------------- |---------------|
| id            | u32           |

Example call: `near view $CONTRACT findById '{ "id": 0 }'`

### getEvents
---
* Returns all events
* Does not take any parameters

Example call: `near view $CONTRACT getEvents '{}'`

### getTransactions
---
* Returns all transactions
* Does not take any parameters

Example call: `near view $CONTRACT getTransactions '{}'`

### filterTransactionsBySender
---
* Returns user's transactions
* Takes 1 parameter

| Parameter     | Type          |
| ------------- |---------------|
| sender        | string        |

Example call: `near view $CONTRACT filterTransactionsBySender '{ "sender": "fuzzzy.testnet"}'`

### endTheEvent
---
* Ends the event
* Takes 1 parameter

| Parameter     | Type          |
| ------------- |---------------|
| id            | u32           |

Example call: `near call $CONTRACT endTheEvent '{ "id": 0 }' --accountId $CONTRACT`
