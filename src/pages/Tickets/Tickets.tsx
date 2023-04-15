import React from 'react'
import Header from '../../components/Header/Header'
import TicketsDetails from './TicketsComponents/TicketsDetails/TicketsDetails'
import TicketsList from './TicketsComponents/TicketsList/TicketsList'


const Tickets: React.FC = () => {

    const tickets = JSON.parse(localStorage.getItem('tickets') as string)

    if(!tickets?.length) {
        return (
            <>
                <Header />
                <main>
                    <h1 style={{textAlign: 'center', margin: '20px 0'}}>You have no tickets</h1>
                </main>
            </>
        )
    }

    return (
        <>
            <Header />
            <main>
                <TicketsDetails />
                <TicketsList />
            </main>
        </>
    )
}

export default Tickets
