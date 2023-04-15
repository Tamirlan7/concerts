import React from "react"
import cl from './Home.module.css'
import Header from "../../components/Header/Header"
import Search from "./HomeComponents/Search/Search"
import Concerts from "./HomeComponents/Concerts/Concerts"


const Home: React.FC = () => {
    
    return (
        <>
            <Header />
            <main>
                <Search />
                <Concerts />
            </main>
        </>
    )
}


export default Home
