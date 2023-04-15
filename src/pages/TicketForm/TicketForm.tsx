import React from 'react'
import cl from './TicketForm.module.css'
import Header from '../../components/Header/Header'
import Input from '../../UI/Input/Input'
import { ITicket, ITicketForm } from '../../types'
import { useRetrieveTicketsMutation } from '../../services/concertApi'
import { useNavigate } from 'react-router-dom'


const TicketForm: React.FC = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = React.useState<ITicketForm>({
        code: '',
        name: '',
    })
    const [retrieveTickets, {error, isLoading}] = useRetrieveTicketsMutation()
    const [isEmpty, setIsEmpty] = React.useState<boolean>(false)

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    async function handleRetrieveTicket(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        for(let key in formData) {
            if(formData && !formData[key]) {
                setIsEmpty(true)
                return
            }
        }

        const data = await retrieveTickets(formData).unwrap()
        let arr = JSON.parse(localStorage.getItem('tickets') as string)
        arr = arr ? [...arr, ...data.tickets] : [...data.tickets]
        localStorage.setItem('tickets', JSON.stringify(arr))

        
        let booked: ITicket[] = JSON.parse(localStorage.getItem('booked') as string)
        booked = data.tickets.filter((ticket: ITicket) => {
            for(let bookedOne of booked) 
                if(bookedOne.id === ticket.id)
                    return false
            

            return true
        })
        localStorage.setItem('booked', JSON.stringify(booked))

        navigate('/tickets')
    }

    return (
        <>
            <Header />
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
            <main>
                <section className={cl['section']}>
                    <div className="container">
                        <div className={cl['inner-section']}>
                            
                            <h1 className={cl['title']}>Retrieve your tickets</h1>
                            
                            <form onSubmit={handleRetrieveTicket} className={cl['form']}>
                                <Input 
                                    onChange={onChange} 
                                    name='name' 
                                    label='Name' 
                                    isInvalid={!formData?.name && isEmpty ? true : false} 
                                />
                                <Input 
                                    onChange={onChange} 
                                    name='code' 
                                    label='Code' 
                                    isInvalid={!formData?.code && isEmpty ? true : false} 
                                />
                                <button type='submit' className={cl['button']}>Get Ticket</button>
                            </form>

                            {error && 'status' in error && error.status === 401 &&
                                <p style={{color: 'red', margin: '10px 0'}}>Could not find tickets with these details.</p>
                            }
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default TicketForm
