export interface ILocation {
    id: number,
    name: string
}

export interface IShow {
    id: number,
    start: string,
    end: string
}

export interface IConcert {
    id: number,
    artist: string,
    location: ILocation,
    shows: IShow[]
}

export interface IOption {
    id: number,
    text: string
}

export interface ISeat {
    total: number
    unavailable: number[]
}

export interface ISeatRow {
    id: number
    name: string
    seats: ISeat
}

export interface IFormBooking {
    name: string
    address: string
    zip: string
    city: string
    country: string

    [key: string]: string
}

export interface IBookingFormRequestBody extends IFormBooking{
    reservation_token: string
}

export interface IReservation {
    row: number | string, 
    seat: number
}

export interface ITicketShow extends IShow {
    concert: IConcert
}

export interface ITicketForm {
    code: string
    name: string

    [key: string]: string
}

export interface ITicket {
    id: number
    code: string
    name: string
    created_at: string
    row: {
        id: number
        name: string
    } 
    seat: number
    show: ITicketShow
}
