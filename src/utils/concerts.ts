import { IConcert, IOption } from "../types";

export function getArtists (concert: IConcert[]): IOption[] {
    return concert.map((el) => ({id: el.id, text: el.artist}))
}

export function getLocations (concert: IConcert[]): IOption[] {
    return concert.map((el) => ({id: el.id, text: el.location.name}))
}
