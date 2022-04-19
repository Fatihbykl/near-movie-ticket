import { storage, Context, context, ContractPromiseBatch, u128 } from "near-sdk-as"
import { Movie, Event, events, Transaction, transactions } from "./models";


export function init(): void {
    assert_init()
    storage.setString("owner", context.sender)
    storage.set("currentID", 0)
}

export function createEvent(title: string, director: string, year: u32, genres: string, plot: string, cinema: string, city: string, date: string, max: u32, price: u32): Event {
    assert_owner()
    let id = storage.getSome<u32>("currentID")
    storage.set("currentID", id + 1)
    const movie = new Movie(title, director, year, genres, plot)
    const event = new Event(id, cinema, city, date, movie, max, price)
    events.set(id, event)
    return event
}

export function removeEvent(id: u32): void {
    assert_owner()
    events.delete(id)
}

export function buyTicket(id: u32): void {
    let event = findById(id)
    let price = event.price
    let sender = context.sender

    assert_ended(event)
    assert_max_tickets(event)
    assert_deposit(price)
    
    ContractPromiseBatch.create(sender).transfer(u128.from(price))
    event.updateRemainingTickets()
    createTransaction(sender, event)
}

export function findById(id: u32): Event {
    return events.getSome(id)
}

export function getEvents(): Event[] {
    let array = new Array<Event>();
    let length = storage.getSome<i32>("currentID")
    for (let i = 0; i < length; i++) {
        if (events.contains(i)) {
            let event = events.getSome(i)
            array.push(event);
        }
    }
    return array
}

export function getTransactions(): Transaction[] {
    let array = new Array<Transaction>()
    for (let i = 0; i < transactions.length; i++) {
        array.push(transactions[i])
    }
    return array
}

export function filterTransactionsBySender(sender: string): Transaction[] {
    let array = new Array<Transaction>()
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].sender == sender) {
            array.push(transactions[i])
        }
    }
    return array
}

export function endTheEvent(id: u32): void {
    let event = findById(id)
    event.endTheEvent()
}

function createTransaction(sender: string, event: Event): void {
    const transaction = new Transaction(sender, event)
    transactions.push(transaction)
}

// Assert functions

function assert_owner(): void {
    assert(context.predecessor == storage.getString("owner"), "Only owner may call this function!")
}

function assert_max_tickets(event: Event): void {
    assert(event.remainingTickets > 0, "All tickets are sold out!")
}

function assert_deposit(price: number): void {
    assert(context.attachedDeposit >= u128.from(price), "Please send enough NEAR!")
}

function assert_init(): void {
    assert(!storage.hasKey("owner"), "Contract initialized before!")
}

function assert_ended(event: Event): void {
    assert(!event.ended, "This event is ended!")
}





