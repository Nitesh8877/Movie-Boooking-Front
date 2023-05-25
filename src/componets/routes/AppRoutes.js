import {BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import LandingPage from '../../pages/LandingPage/LandingPage'
import Auth from '../../pages/Auth/Auth';
import Admin from '../../pages/Admin/Admin';
import Client from '../../pages/Client/Client';
import Booking from '../../pages/Booking/Booking';
import MovieDetails from '../../pages/MovieDetails/MovieDetails';
import MovieTheatre from '../../pages/MovieTheatre/MovieTheatre';
const AppRoutes=()=>{
    return (
        <Router>
            <Routes>
                <Route 
                exact 
                path='/'
                element={<LandingPage/>}
                />

                <Route
                exact
                path='/login'
                element={<Auth/>}
                />
                <Route
                exact 
                path='/admin'
                element={<Admin/>}
                />
                <Route
                exact 
                path='/client'
                element={<Client/>}
                />
                <Route
                exact 
                path='/movie/:movieid/details'
                element={<MovieDetails/>}
                />

            <Route
            exact
            path='/buytickets/:moviename/:movieid'
            element={
                <MovieTheatre/>
            }
            />
            <Route
            exact 
            path='/movie/:movieid/:theatreid'
            element={<Booking/>}
            />

            </Routes>
        </Router>
    )
}

export default AppRoutes;