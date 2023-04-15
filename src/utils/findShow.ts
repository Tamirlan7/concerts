import { IConcert, IShow } from "../types";

export function findShow(concert: IConcert, showId: number): IShow {
    return concert?.shows?.filter((show) => show.id === showId)[0]
}