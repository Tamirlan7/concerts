import React from 'react'
import cl from './BookingSelect.module.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux'
import { resetSeatings } from '../../../../slices/concertSlice'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useReserveSeatingsMutation } from '../../../../services/concertApi'


interface BookingSelectProps {
    isForm?: boolean
}

const BookingSelect: React.FC<BookingSelectProps> = ({ isForm }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [queryParams] = useSearchParams()
    const showId = queryParams.get('show')
    const [reserveSeatings] = useReserveSeatingsMutation()

    const dispatch = useAppDispatch()
    const { choosedSeats } = useAppSelector(state => state.concert)
    const [timer, setTimer] = React.useState<{minutes: number, seconds: number}>({
        seconds: 59,
        minutes: 4
    })
    

    async function goForm () {
        navigate(`/booking-form/${id}?show=${showId}`)

        if (choosedSeats.length) {
            const data = await reserveSeatings({
                concertId: id as string,
                showId: showId as string,
                reservations: [...choosedSeats.map((choseSeat) => ({row: choseSeat.id, seat: choseSeat.seat}))]
            }).unwrap()
            data && localStorage.setItem('reservedData', JSON.stringify(data))

            let arr = JSON.parse(localStorage.getItem('seats') as string)
            arr = arr ? [...arr, ...choosedSeats.filter((item) => {
                for(let i of arr) {
                    return item.id !== i.id
                }
            })] : [...choosedSeats]
            
            localStorage.setItem('seats', JSON.stringify(arr))
        }
    }

    function changeSeats() {
        navigate(`/booking/${id}?show=${showId}`)
    }

    React.useEffect(() => {
        if(choosedSeats.length === 0 && !localStorage.getItem('seats')) return

        const secondsInterval: number = window.setInterval(() => {
            setTimer((prev) => {
                if(prev.seconds === 0 && prev.minutes === 0) {
                    dispatch(resetSeatings())
                    localStorage.removeItem('seats')
                    return {minutes: 0, seconds: 0}
                }

                if(prev.seconds === 0) {
                    return {minutes: prev.minutes - 1, seconds: 59}
                }
    
                else {
                    return {minutes: prev.minutes, seconds: prev.seconds - 1}
                }
            })
        }, 1000)

        return () => {
            clearInterval(secondsInterval)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [choosedSeats])

    return (
        <aside className={cl['aside']}>
            <h2 className={cl['title']}>Selected seats</h2>

            <div className={cl['rows']}>
                {choosedSeats.length ?
                choosedSeats.map((choosedSeat: {id: number, name: string, seat: number}) => (
                    <p key={choosedSeat.id + Date.now() + choosedSeat.seat + Math.random()} className={cl['row']}>Row: {choosedSeat.name}, Seat: {String(choosedSeat.seat)}</p>
                ))
                : localStorage.getItem('seats') 
                ? JSON.parse(localStorage.getItem('seats') as string).map((choosedSeat: {id: number, name: string, seat: number}) => (
                    <p key={choosedSeat.id + Date.now() + choosedSeat.seat + Math.random()} className={cl['row']}>Row: {choosedSeat?.name}, Seat: {String(choosedSeat?.seat)}</p>
                ))
                : <p>No seats selected. <br /> Click on a seat to make a reservation.</p>
                }
            </div>

            {timer.seconds !== 0 && timer.minutes > -1 
                ? (
                    <p className={cl['timer']} role='contentinfo'>Your seats expire in 0{timer.minutes}:{timer.seconds < 10 && '0'}{timer.seconds}</p>
                ) : (
                    <p style={{color: 'red', marginBottom: 15}}>Your seat reservation expired. <br /> The reservation has been cancelled.</p>
                )
            }
            { !isForm
                ? (<button
                    onClick={goForm} 
                    disabled={choosedSeats.length || localStorage.getItem('seats') ? false : true} 
                    className={choosedSeats.length || localStorage.getItem('seats') ? cl['button'] : cl['disabled']}
                >
                    Enter Booking Details
                </button>)
                : (<button
                    onClick={changeSeats} 
                    className={cl['button']}
                >
                    Change Seats
                </button>)   
            }
        </aside>
    )
}

export default BookingSelect
