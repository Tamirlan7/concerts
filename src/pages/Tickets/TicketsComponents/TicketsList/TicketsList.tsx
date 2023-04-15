import React from 'react'
import cl from './TicketsList.module.css'
import { ITicket } from '../../../../types'
import Show from '../../../../components/Show/Show'
import { useCancelTicketMutation } from '../../../../services/concertApi'


const TicketsList: React.FC = () => {

    const tickets: ITicket[] = JSON.parse(localStorage.getItem('tickets') as string)
    const [cancelTicket, { isLoading }] = useCancelTicketMutation()
    const [isRerendered, setIsRerendered] = React.useState(false)

    async function handleCancelTicket(ticket: ITicket) {
        await cancelTicket({
            ticketId: ticket.id,
            body: {
                code: ticket.code,
                name: ticket.name
            }
        }).unwrap()

        let currTickets: ITicket[] = JSON.parse(localStorage.getItem('tickets') as string)
        currTickets = currTickets.filter((currTicket) => ticket.id !== currTicket.id)
        localStorage.setItem('tickets', JSON.stringify(currTickets))
        setIsRerendered((prev) => !prev)
    }


    return (
        <section className={cl['section']}>
            <div className="container">
                <div className={cl['inner-section']}>

                    {isLoading && (
                        <div className='loader'>
                            <div className="lds-ring">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    )}

                    <div role='list' className={cl['list']}>
                            {tickets.map((ticket) => (
                                <div key={ticket.id} role='listitem' className={cl['item']}>
                                    <h2 className={cl['ticket-title']}>Ticket</h2>
                                    <p>RowName: {ticket.row.name}</p>
                                    <p>Seat: {ticket.seat}</p>
                                    <p className={cl['code']}>Code: {ticket.code}</p>
                                    <Show 
                                        location={ticket.show.concert.location} 
                                        isLink={false} 
                                        concertId={ticket.show.concert.id} 
                                        artist={ticket.show.concert.artist} 
                                        show={ticket.show} 
                                    />
                                    <button onClick={() => handleCancelTicket(ticket)} className={cl['button']}>Cancel Ticket</button>
                                </div>
                            ))}
                        </div> 


                </div>
            </div>
        </section>
    )
}

export default TicketsList
