import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from './Pages/Home'
import Movies from './Pages/Movies'
import MoviesDetails from './Pages/MoviesDetails'
import SeatLayout from './Pages/SeatLayout'
import MyBookings from './Pages/MyBookings'
import Favourite from './Pages/Favourite'
import {Toaster} from 'react-hot-toast'
import Footer from './Components/Footer'
import Layout from './Pages/Admin/Layout'
import Dashboard from './Pages/Admin/Dashboard'
import AddShow from './Pages/Admin/AddShow'
import ListBooking from './Pages/Admin/ListBooking'
import ListShow from './Pages/Admin/ListShow'

function App() {
    const isAdminRoute=useLocation().pathname.startsWith('/admin');

  return (
    <>
      <Toaster/>
     {!isAdminRoute && <Navbar/>}
     <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/movies" element={<Movies/>}/>
       <Route path="/movies/:id" element={<MoviesDetails/>}/>
       <Route path="/movies/:id/:date" element={<SeatLayout/>}/>
       <Route path="/mybookings" element={<MyBookings/>}/>
       <Route path="/favorites" element={<Favourite/>}/>

       <Route path="/admin/*" element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="add-shows" element={<AddShow/>}/>
        <Route path="list-shows" element={<ListShow/>}/>
        <Route path="list-bookings" element={<ListBooking/>}/>
       </Route>

     </Routes>
     {!isAdminRoute && <Footer/>}
    </>
  )
}

export default App
