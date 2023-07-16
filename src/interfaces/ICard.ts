import { IOpponent } from "./IOpponent";

export interface ICard {
    id: string
    gameDate: Date
    location: string
    players: any[]
    opponent: string
    currentUser?: any
}