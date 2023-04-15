import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Booking from "./pages/Booking/Booking";
import BookingForm from "./pages/BookingForm/BookingForm";
import Booked from "./pages/Booked/Booked";
import TicketForm from "./pages/TicketForm/TicketForm";
import Tickets from "./pages/Tickets/Tickets";


export const router = createBrowserRouter([
    {
        path: '',
        element: <Home />
    },
    {
        path: 'booking-form/:id',
        element: <BookingForm />,
        index: true
    },
    {
        path: 'booking/:id',
        element: <Booking />
    },
    {
        path: 'booked',
        element: <Booked />
    },
    {
        path: 'ticket-form',
        element: <TicketForm />
    },
    {
        path: 'tickets',
        element: <Tickets />
    },
])
