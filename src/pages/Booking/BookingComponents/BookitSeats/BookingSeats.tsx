import React from "react"
import cl from './BookingSeats.module.css'
import { useGetConcertSeatingsQuery } from "../../../../services/concertApi"
import { useParams, useSearchParams } from "react-router-dom"
import Seats from "../../../../components/Seats/Seats"
import BookingSelect from "../BookingSelect/BookingSelect"


const BookingSeats: React.FC = () => {
    
    const { id } = useParams()
    const [queryParams] = useSearchParams('show')
    const showId = queryParams.get('show')
    const {data: seatings} = useGetConcertSeatingsQuery({concertId: Number(id), showId: Number(showId)})


    return (
        <section className={cl['seats-section']}>
            <div className="container">
                <div className={cl['inner-seats']}>
                    
                    <div>
                        {seatings?.rows.map((seatRow) => (
                            <Seats key={seatRow.id} seatRow={seatRow} />
                        ))}
                    </div>
                    
                    <BookingSelect />

                </div>
            </div>
        </section>
    )
}

export default BookingSeats
