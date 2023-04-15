import React from 'react'
import cl from './Search.module.css'
import Select from '../../../../UI/Select/Select'
import { useGetConcertsQuery } from '../../../../services/concertApi'
import { getArtists, getLocations } from '../../../../utils/concerts'
import { changeArtist, changeDate, changeLocation } from '../../../../slices/concertSlice'
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux'


const Search: React.FC = () => {
    const {data: concerts} = useGetConcertsQuery(null)

    const dispatch = useAppDispatch()
    const { artist, date, location } = useAppSelector(state => state.concert)

    function handleChangeLocation(text: string) {
        dispatch(changeLocation(text))
        dispatch(changeArtist(''))
        dispatch(changeDate(''))
    }

    function handleChangeArtist(text: string) {
        dispatch(changeArtist(text))
        dispatch(changeLocation(''))
        dispatch(changeDate(''))
    }

    function handleChangeDate(text: string) {
        dispatch(changeDate(text))
        dispatch(changeLocation(''))
        dispatch(changeArtist(''))
    }

    function resetFilters() {
        return artist ? dispatch(changeArtist(''))
        : location ? dispatch(changeLocation('')) 
        : dispatch(changeDate(''))
    }

    return (
        <section className={cl['search-section']}>
            <div className="container">
                <div className={cl['inner-search']}>

                    <h1 className={cl['title']}>Checkout these amazing concerts in Graz</h1>
                    <div className={cl['selects']}>
                        <Select
                            value={artist} 
                            defaultValue='Artist' 
                            options={concerts ? getArtists(concerts.concerts) : [{id: 1, text: 'No artists'}]}
                            onChange={handleChangeArtist} 
                        />
                        <Select
                            value={location} 
                            defaultValue='Location' 
                            options={concerts ? getLocations(concerts.concerts) : [{id: 1, text: 'No locations'}]}
                            onChange={handleChangeLocation} 
                        />
                        <input value={date} onChange={(e) => handleChangeDate(e.target.value)} className={cl['input']} type='date' name="date" />
                    
                        { (date || location || artist) &&  
                            <button className={cl['button']} onClick={resetFilters}>Сбросить фильтры</button>
                        }
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Search
