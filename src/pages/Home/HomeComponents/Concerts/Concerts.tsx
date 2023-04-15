import React from 'react'
import cl from './Concerts.module.css'
import { useGetConcertsQuery } from '../../../../services/concertApi'
import Concert from '../../../../components/Concert/Concert'
import { useAppSelector } from '../../../../hooks/useRedux'
import { IConcert } from '../../../../types'
import { getFormattedDate } from '../../../../utils/dateTime'


const Concerts: React.FC = () => {

    const { data: concerts, isLoading, error } = useGetConcertsQuery(null)
    const { artist, date, location } = useAppSelector(state => state.concert)

    const filteredConcerts: IConcert[] | undefined  = React.useMemo((): IConcert[] | undefined =>  {
        if(artist && concerts) {
            return concerts?.concerts.filter((el) => el.artist === artist) 
        }

        if(date && concerts) {
            const mapepdConcerts = concerts?.concerts.map((el) => {
                const shows = el.shows.filter((el) => getFormattedDate(el.start) === date)
                return shows.length ? {...el, shows} : undefined 
            }) as IConcert[]

            return mapepdConcerts.filter((el) => el !== undefined).length 
            ? mapepdConcerts.filter((el) => el !== undefined) 
            : undefined
        }

        if(location && concerts) {
            return concerts?.concerts.filter((el) => el.location.name === location)
        }
        
        return concerts ? concerts.concerts : undefined 

    }, [artist, date, location, concerts])

    if (error) {
        return (
            <>
            <p>Произошла ошибка...</p>            
            <pre>
                {JSON.stringify(error, null, 2)}
            </pre>
            </>
        )
    }

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

    return (
        <section className={cl['concerts-section']}>
            <div className="container">
                <div className={cl['inner-concerts']}>

                    <div role='list' className={cl['concerts']}>
                        {filteredConcerts ?
                        (
                            filteredConcerts.map((concert) => (
                                <Concert key={concert.id} concert={concert} />
                            ))
                        )
                        : (
                            <div>No shows are matching the current filter criteria.</div>
                        )
                        }
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Concerts
