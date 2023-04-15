import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IBookingFormRequestBody, IConcert, IReservation, ISeatRow, ITicket, ITicketForm } from '../types'


export const concertApi = createApi({
    reducerPath: 'concertApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://apic.polytech.kz/api/v1' }),
    endpoints: (build) => ({
        getConcerts: build.query<{concerts: IConcert[]}, null>({
            query: () => '/concerts'
        }),
        getConcert: build.query<{concert: IConcert}, number>({
            query: (id) => `/concerts/${id}`
        }),
        getConcertSeatings: build.query<
            {rows: ISeatRow[]}, {concertId: number, showId: number}
        >({
            query: ({concertId, showId}) => `/concerts/${concertId}/shows/${showId}/seating`
        }),
        reserveSeatings: build.mutation<{
            reserved: boolean
            reservation_token: string
            reserved_until: string
        }, {
            reservations: IReservation[], 
            concertId: number | string,
            showId: number | string,
        }>({
            query: ({ reservations, concertId, showId }) => ({
                url: `/concerts/${concertId}/shows/${showId}/reservation`,
                method: 'POST',
                body: localStorage.getItem('reservedData') ? {
                    reservations,
                    reservation_token: JSON.parse(localStorage.getItem('reservedData') as string)['reservation_token']
                } : {
                    reservations,
                }
            })
        }),
        bookSeatings: build.mutation<{tickets: ITicket[]}, 
            {
                body: IBookingFormRequestBody,
                concertId: string | number,
                showId: string | number
            }
        >({
            query: (params) => ({
                url: `/concerts/${params.concertId}/shows/${params.showId}/booking`,
                method: 'POST',
                body: params.body
            })
        }),
        retrieveTickets: build.mutation<{tickets: ITicket[]}, ITicketForm>({
            query: (body) => ({
                url: `/tickets`,
                method: 'POST',
                body
            })
        }),
        cancelTicket: build.mutation<undefined, {ticketId: number | string, body: ITicketForm}>({
            query: ({ ticketId, body }) => ({
                url: `/tickets/${ticketId}/cancel`,
                method: 'POST',
                body
            })
        })
    }),
})

export const { 
    useGetConcertsQuery, 
    useGetConcertQuery, 
    useGetConcertSeatingsQuery,
    useReserveSeatingsMutation,
    useBookSeatingsMutation,
    useRetrieveTicketsMutation,
    useCancelTicketMutation
 } = concertApi
