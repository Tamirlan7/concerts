import React from 'react'
import cl from './Show.module.css'
import { ILocation, IShow } from '../../types'
import { getFormattedDate, getFormattedTime } from '../../utils/dateTime'
import { useNavigate } from 'react-router-dom'


interface ShowProps {
    location: ILocation,
    artist: string,
    show: IShow,
    concertId?: number,
    isLink: boolean
}

const Show: React.FC<ShowProps> = ({ isLink, location, artist, show, concertId }) => {

    const navigate = useNavigate()

    function redirectToBookingPage() {
        navigate(`/booking/${concertId}?show=${show.id}`)
    }

    if(!isLink) {
        return (
            <div role='listitem' className={cl['show-no-link']}>
                <span className={cl['date']}>{getFormattedDate(show?.start)}</span>
                <h2 className={cl['artist']}>{artist}</h2>
                <p className={cl['location']}>{location.name}</p>
                <div className={cl['time']}>{getFormattedTime(show.start)} - {getFormattedTime(show.end)}</div>
            </div>
        )
    }

    return (
        <div role='listitem' className={cl['show']} onClick={redirectToBookingPage}>
            <span className={cl['date']}>{getFormattedDate(show.start)}</span>
            <h2 className={cl['artist']}>{artist}</h2>
            <p className={cl['location']}>{location.name}</p>
            <div className={cl['time']}>{getFormattedTime(show.start)} - {getFormattedTime(show.end)}</div>
        </div>
    )
}

export default Show
