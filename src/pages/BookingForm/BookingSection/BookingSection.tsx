import React from "react"
import cl from './Booking.module.css'
import BookingSelect from "../../Booking/BookingComponents/BookingSelect/BookingSelect"
import Input from "../../../UI/Input/Input"
import Select from "../../../UI/Select/Select"
import { IFormBooking, IOption } from "../../../types"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useBookSeatingsMutation } from "../../../services/concertApi"
import { useAppDispatch } from "../../../hooks/useRedux"
import { resetSeatings } from "../../../slices/concertSlice"
import Papa from 'papaparse'

const BookingSection: React.FC = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const showId = searchParams.get('show')
    const navigate = useNavigate()
    let [countries, setCountries] = React.useState<IOption[]>([])
    const [formData, setFormData] = React.useState<IFormBooking>({
        name: '',
        address: '',
        city: '',
        country: '',
        zip: ''
    })
    const inputNameRef = React.useRef<HTMLInputElement>(null)
    const [isEmpty, setIsEmpty] = React.useState<boolean>(false)
    const [bookSeatings ] = useBookSeatingsMutation()

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => ({...prev as IFormBooking, [e.target.name]: e.target.value}))
    }

    async function getCountriesFromCSV() {
        const response = await fetch('/data/countries.csv')
        const reader = response.body?.getReader()
        const result = await reader?.read()
        const decoder = new TextDecoder('utf-8')
        const csv = decoder.decode(result?.value)
        const results = Papa.parse(csv, { header: true })
        const rows = results.data as Array<{ Albania: string }>
        setCountries(rows.map((row, index) => ({text: row.Albania, id: index + 1})).filter((el) => el.id !== rows.length))
    }

    React.useEffect(() => {
        getCountriesFromCSV()
    }, [])

    function changeCountry(val: string) {
        setFormData((prev) => ({...prev as IFormBooking, country: val}))
    }

    async function bookSeats() {
        if(!formData) return

        for(let key in formData) {
            if(!formData[key]) {
                setIsEmpty(true)
                return
            }
        }
        
        const data = await bookSeatings({
            body: {
                ...formData,
                reservation_token: JSON.parse(localStorage.getItem('reservedData') as string)['reservation_token']
            },
            concertId: id as string,
            showId: showId as string,
        }).unwrap()
        
        console.log(data)
        let arr = JSON.parse(localStorage.getItem('booked') as string)
        arr = arr ? [...arr, ...data.tickets] : [...data.tickets]
        localStorage.setItem('booked', JSON.stringify(arr))

        navigate('/booked')
        localStorage.removeItem('seats')
        localStorage.removeItem('reservedData')
        dispatch(resetSeatings())
    }

    function focusInput() {
        if(inputNameRef && inputNameRef.current) 
            inputNameRef.current.focus()
    }


    return (
        <>
            <section className={cl['section']}>
                <div className="container">
                    <div className={cl['inner-section']}>
                        <BookingSelect isForm={true} />

                        <div className={cl['form-block']}>
                            <h2 onClick={focusInput}>Please enter your details</h2>
                            <form className={cl['form']}>
                                <div className={cl['inputs']}>
                                    <Input key={1} isInvalid={!formData?.name && isEmpty ? true : false} required ref={inputNameRef} onChange={onChange} name="name" label="Name" />
                                    <Input key={2} isInvalid={!formData?.address && isEmpty ? true : false} required onChange={onChange} name="address" label="Address" />
                                    <Input key={3} isInvalid={!formData?.zip && isEmpty ? true : false} required onChange={onChange} name="zip"type="number" label="ZIP code" />
                                    <Input key={4} isInvalid={!formData?.city && isEmpty ? true : false} required onChange={onChange} name="city" label="City" />
                                    <Select onChange={changeCountry} value={formData?.country as string} defaultValue="None" options={countries} />
                                </div>
                                <div className={cl['seperator']}></div>
                                <div className={cl['submit']}>
                                    <h3>By clicking "Book" you accept that you are not actually booking a <br /> ticket as this is is a test project and not a real website</h3>
                                    <div className={cl['buttons']}>
                                        <div className={cl['info']}>
                                            Your ticket wil be available <br /> immediately after booking
                                        </div>
                                        <button onClick={bookSeats} type="button" className={cl['button']}>Book</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default BookingSection
