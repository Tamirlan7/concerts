import React from "react"
import Header from "../../components/Header/Header"
import BookingShow from "../Booking/BookingComponents/BookingShow/BookingShow"
import { useGetConcertQuery } from "../../services/concertApi"
import { Navigate, useParams, useSearchParams } from "react-router-dom"
import BookingSection from "./BookingSection/BookingSection"
import { useAppSelector } from "../../hooks/useRedux"


const BookingForm: React.FC = () => {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const showId = searchParams.get('show')
    const { isLoading } = useGetConcertQuery(Number(id))
    const { choosedSeats } = useAppSelector(state => state.concert)

    if (isLoading) {
        return (
            <div className='loader'>
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }

    if(!choosedSeats.length && !localStorage.getItem('seats')) {
        return <Navigate to={`/booking/${id}?show=${showId}`} replace />
    }

    return (
        <>
            <Header isDispatchable={true} />
            <main>
                <BookingShow />
                <BookingSection />
            </main>
        </>
    )
}

export default BookingForm
