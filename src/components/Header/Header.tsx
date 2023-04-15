import React from 'react'
import cl from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useRedux'
import { resetSeatings } from '../../slices/concertSlice'


interface HeaderProps {
    isDispatchable?: true
}

const Header: React.FC<HeaderProps> = ({ isDispatchable }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    function handleResetSeatings() {
        dispatch(resetSeatings())
        localStorage.removeItem('seats')
        localStorage.removeItem('reservedData')
    }

    function goTicketForm() {
        navigate('/ticket-form')
    }

    return (
        <header className={cl['header']}>
            <div className="container">
                <div className={cl['inner-header']}>

                    {isDispatchable
                    ? (
                        <Link onClick={handleResetSeatings} to={'/'} role='heading' className={cl['title']} >
                            EuroSkills Concerts
                        </Link>
                    )
                    : (
                        <Link to={'/'} role='heading' className={cl['title']} >
                            EuroSkills Concerts
                        </Link>
                    )
                    }

                    <div className={cl['right']}>
                        <Link style={{marginRight: '10px'}} className={cl['link']} to="/tickets">My Tickets</Link>
                        <Link className={cl['link']} to="/booked">Already booked?</Link>
                        <button className={cl['button']} onClick={goTicketForm}>Get Tickets</button>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default React.memo(Header)
