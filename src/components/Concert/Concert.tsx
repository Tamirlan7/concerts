import React from 'react'
import { IConcert } from '../../types'
import Show from '../Show/Show'


interface ConcertProps {
    concert: IConcert
}

const Concert: React.FC<ConcertProps> = ({ concert }) => (
    <>
        {concert.shows.map((show) => (
            <Show isLink={true} concertId={concert.id} show={show} artist={concert.artist} key={show.id} location={concert.location} />
        ))}
    </>
)

export default Concert;
