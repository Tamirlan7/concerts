import React from 'react'
import cl from './BookingShow.module.css'
import { useGetConcertQuery } from '../../../../services/concertApi'
import { useParams, useSearchParams } from 'react-router-dom'
import Show from '../../../../components/Show/Show'
import { IConcert, ILocation } from '../../../../types'
import { findShow } from '../../../../utils/findShow'

const BookingShow: React.FC = () => {

    const { id } = useParams()
    const [queryParams] = useSearchParams()
    const showId = queryParams.get('show')
    const { data: concert} = useGetConcertQuery(Number(id))

    return (
        <section className={cl['show']}>
            <div className="container">
                <div className={cl['inner-show']}>

                    <h1 className={cl['title']}>Book seats for your show</h1>

                    <Show 
                        isLink={false}
                        key={concert?.concert.id}
                        artist={concert?.concert.artist as string}
                        location={concert?.concert.location as ILocation}
                        show={findShow(concert?.concert as IConcert, Number(showId))}
                    />



                </div>
            </div>
        </section>
    )
} 

export default BookingShow
