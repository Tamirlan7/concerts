import React from 'react'
import cl from './Seats.module.css'
import { ISeatRow } from '../../types'
import Seat from '../Seat/Seat'
import { useAppSelector } from '../../hooks/useRedux'


interface SeatsProps {
    seatRow: ISeatRow
}

const Seats: React.FC<SeatsProps> = ({ seatRow }) => {

    const { choosedSeats } = useAppSelector(state => state.concert)

    return (
        <div className={cl['seats-block']}>
            <span className={cl['seat-name']}>{seatRow.name}</span>
            <ol className={cl['seats']}>
                {Array.from({length: seatRow.seats.total}, (_, index) => index + 1)
                .map((seat, index) => {
                    
                    return seatRow.seats.unavailable.find((unavail) => unavail === seat) 
                    ? <Seat key={seat} rowName={seatRow.name} isUnavailable={true} seat={seat} />
                    : choosedSeats.find((choosedSeat) => choosedSeat.seat === seat && choosedSeat.name === seatRow.name) 
                    ? <Seat key={seat} rowName={seatRow.name} isChoosed={true} seat={seat} />
                    : <Seat rowIndex={seatRow.id} key={seat} rowName={seatRow.name} seat={seat} />
                })}
            </ol>
        </div>
    )
}

export default Seats
