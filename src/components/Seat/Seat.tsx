import React from "react"
import cl from './Seat.module.css'
import { useAppDispatch } from "../../hooks/useRedux"
import { chooseSeat, removeSeating } from "../../slices/concertSlice"


interface SeatProps {
    seat: number
    isUnavailable?: boolean
    rowName: string
    isChoosed?: boolean
    rowIndex?: number
}

const Seat: React.FC<SeatProps> = ({ rowIndex, isChoosed, rowName, seat, isUnavailable }) => {

    const dispatch = useAppDispatch()

    async function handleChooseSeat() {
        dispatch(chooseSeat({name: rowName, seat, id: rowIndex as number}))
    }

    function handleRemoveSeating() {
        dispatch(removeSeating({seat, name: rowName}))
    }

    if(isChoosed) {
        return <li title="Отменить" onClick={handleRemoveSeating} className={cl['choosed-seat']} />
    }

    if(isUnavailable) {
        return <li title="Недоступно" className={cl['seat-unavail']} />
    }

    return (
        <li 
            onClick={handleChooseSeat} 
            title="Бронировать" 
            className={cl['seat']}
        >
            {seat}
        </li>
    )
}

export default Seat
