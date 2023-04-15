import React from 'react'
import cl from './BookedDetails.module.css'
import { ITicket } from '../../../../types'
import Show from '../../../../components/Show/Show'


const BookedDetails: React.FC = () => {

    const booked: ITicket[] = JSON.parse(localStorage.getItem('booked') as string)

    if(!booked?.length) {
        return (
            <section className={cl['section']}>
                <div className="container">
                    <div className={cl['inner-section']}>
                        
                        <h1 className={cl['title']}>You have not booked any show</h1> 
    
                    </div>
                </div>
            </section>
        ) 
    }

    return (
        <section className={cl['section']}>
            <div className="container">
                <div className={cl['inner-section']}>
                    
                    <h1 className={cl['title']}>Your booked shows</h1>

                    <div role='list' className={cl['list']}>
                        {booked.map((bookedOne) => (
                            <div key={bookedOne.id} role='listitem' className={cl['item']}>
                                <p>Name: {bookedOne.name}</p>
                                <p>Code: {bookedOne.code}</p>
                                <p>RowName: {bookedOne.row.name}</p>
                                <p>Seat: {bookedOne.seat}</p>
                                <h2>SHOW: </h2>
                                <Show 
                                    location={bookedOne.show.concert.location} 
                                    isLink={false} 
                                    concertId={bookedOne.show.concert.id} 
                                    artist={bookedOne.show.concert.artist} 
                                    show={bookedOne.show} 
                                />
                            </div>
                        ))}
                    </div>  

                </div>
            </div>
        </section>
    )
}

export default BookedDetails
