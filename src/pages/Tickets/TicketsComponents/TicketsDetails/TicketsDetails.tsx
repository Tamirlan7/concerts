import React from 'react'
import cl from './TicketsDetails.module.css'


const TicketsDetails: React.FC = () => {

    return (
        <section className={cl['section']}>
            <div className="container">
                <div className={cl['inner-section']}>
                    
                    <h1 className={cl['title']}>Your Tickets are ready!</h1>

                </div>
            </div>
        </section>
    )
}

export default TicketsDetails
