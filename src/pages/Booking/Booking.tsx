import React from 'react'
import Header from '../../components/Header/Header'
import BookingShow from './BookingComponents/BookingShow/BookingShow'
import BookingSeats from './BookingComponents/BookitSeats/BookingSeats'
import { useGetConcertQuery, useGetConcertSeatingsQuery } from '../../services/concertApi'
import { useParams, useSearchParams } from 'react-router-dom'


const Booking: React.FC = () => {
    const { id } = useParams()
    const [queryParams] = useSearchParams('show')
    const showId = queryParams.get('show')
    const {isLoading: isConcertLoading, error: concertError} = useGetConcertQuery(Number(id))
    const {isLoading: isSeatingsLoading, error: seatingsError} = useGetConcertSeatingsQuery({concertId: Number(id), showId: Number(showId)})

    if (concertError || seatingsError) {
        return (
            <>
                <p>Произошла ошибка...</p>            
                <pre>
                    {JSON.stringify(concertError || seatingsError, null, 2)}
                </pre>
            </>
        )
    }

    if(isConcertLoading || isSeatingsLoading) {
        return (
            <>
                <Header />
                <div className='loader'>
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Header isDispatchable={true} />
            <main>
                {!isConcertLoading && !isSeatingsLoading &&
                <>
                    <BookingShow />     
                    <BookingSeats />
                </>
                }
            </main>
        </>
    )
}

export default Booking
