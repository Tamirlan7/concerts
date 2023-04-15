import React from "react"
import Header from "../../components/Header/Header"
import BookedDetails from "./BookedComponents/BookedDetails/BookedDetails"


const Booked: React.FC = () => {

    return (
        <>
            <Header />
            <main>
                <BookedDetails />
            </main>
        </>
    )
}

export default Booked
