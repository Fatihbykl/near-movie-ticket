import { context, PersistentMap, PersistentUnorderedMap, PersistentVector } from "near-sdk-as";
import { Timestamp } from "../../utils";

export const events = new PersistentUnorderedMap<u32, Event>("t");
export const transactions = new PersistentVector<Transaction>("v");

@nearBindgen
export class Movie {
    title: string;
    director: string;
    year: u32;
    genres: string;
    plot: string;

    constructor(title: string, director: string, year: u32, genres: string, plot:string){
        this.title = title;
        this.director = director;
        this.year = year;
        this.genres = genres;
        this.plot = plot;
    }
}

@nearBindgen
export class Event {
    id: u32;
    cinema: string;
    city: string;
    date: string;
    movie: Movie;
    remainingTickets: u32;
    price: u32;
    ended: bool = false;
    
    constructor(id: u32, cinema: string, city: string, date: string, movie: Movie, max: u32, price: u32) {
        this.id = id;
        this.cinema = cinema;
        this.city = city;
        this.date = date;
        this.movie = movie;
        this.remainingTickets = max;
        this.price = price;
    }

    updateRemainingTickets(): void {
        this.remainingTickets -= 1;
        events.set(this.id, this);
    }

    endTheEvent(): void {
        this.ended = true;
        events.set(this.id, this)
    }
}

@nearBindgen
export class Transaction {
    timestamp: Timestamp = context.blockTimestamp;
    sender: string;
    event: Event;

    constructor(sender: string, event: Event) {
        this.sender = sender;
        this.event = event;
    }
    
}

