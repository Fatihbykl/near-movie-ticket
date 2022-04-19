#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 0: Check for environment variable with contract name"
echo ---------------------------------------------------------
echo

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"

echo
echo ---------------------------------------------------------
echo "Step 1: Initialize the contract"
echo ---------------------------------------------------------
echo

near call $CONTRACT init '{}' --accountId $CONTRACT

echo
echo ---------------------------------------------------------
echo "Step 2: Create event"
echo ---------------------------------------------------------
echo

near call $CONTRACT createEvent '{ "title": "Jagten", "director": "Thomas Vinterberg", "year": 2012, "genres": "Drama", "plot": "plot", "cinema": "Serdivan AVM", "city": "Sakarya", "date": "20.04.2022", "max": 100, "price": 1}' --accountId $CONTRACT


echo
echo ---------------------------------------------------------
echo "Step 3: Buy ticket"
echo ---------------------------------------------------------
echo

near call $CONTRACT buyTicket '{ "id": 0 }' --accountId $CONTRACT --deposit 1

echo
echo ---------------------------------------------------------
echo "Step 4: Get transactions"
echo ---------------------------------------------------------
echo

near call $CONTRACT getTransactions '{}' --accountId $CONTRACT

echo
echo
exit 0
