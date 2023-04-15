import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface ConcertSliceState {
    date: string
    location: string
    artist: string
    choosedSeats: Array<{
        id: number
        name: string
        seat: number
    }>
}

const initialState: ConcertSliceState = {
    date: '',
    location: '',
    artist: '',
    choosedSeats: []
}


export const concertSlice = createSlice({
    name: 'concert',
    initialState, 
    reducers: {
        changeDate(state, action: PayloadAction<string>) {
            state.date = action.payload
        },

        changeLocation(state, action: PayloadAction<string>) {
            state.location = action.payload
        },

        changeArtist(state, action: PayloadAction<string>) {
            state.artist = action.payload
        },

        chooseSeat(state, action: PayloadAction<{name: string, seat: number, id: number}>) {
            state.choosedSeats.push({name: action.payload.name, seat: action.payload.seat, id: action.payload.id})
        },

        resetSeatings(state) {
            state.choosedSeats = []
        },

        removeSeating(state, action: PayloadAction<{seat: number, name: string}>) {
            const removeSeat = state.choosedSeats.findIndex((el, _, arr) => arr.indexOf(el) !== action.payload.seat - 1 && el.name === action.payload.name && el.seat === action.payload.seat)
            state.choosedSeats.splice(removeSeat, 1)            
        }
    }
})

export const { changeArtist, changeDate, changeLocation, chooseSeat, resetSeatings, removeSeating } = concertSlice.actions  
export default concertSlice.reducer
