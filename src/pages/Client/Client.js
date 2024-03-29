import { CWidgetStatsC } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../../api/movie'
import { getAllTheaters } from '../../api/theatre'
import './Client.css'
const Client = () => {
    let [theaters, setTheaters] = useState([])
    let [movies, setMovies] = useState([])

    const fetch = async () => {
        let result = await getAllMovies()
        setMovies(result.data)
        result = await getAllTheaters()
        setTheaters(result.data)
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div className='container bg-light mt-2'>
            <h3 className='text-center'>Welcome, Client!</h3>
            <p className='text-center text-secondary'>Take a quick look at your stats below</p>
            <div className='row header'>
                <div className='col'>
                    <CWidgetStatsC
                        className='mb-3 text-danger'
                        icon={<i className='bi bi-people-fill text-danger'></i>}
                        color="dark"
                        inverse
                        progress={{ value: theaters.length }}
                        text="Number of Theaters"
                        title="Theaters"
                        value={theaters.length}
                    />
                </div>
                <div className='col'>
                    <CWidgetStatsC
                        className='mb-3 text-danger'
                        icon={<i className='bi bi-people-fill text-danger'></i>}
                        color="dark"
                        inverse
                        progress={{ value: movies.length }}
                        text="Number of Movies"
                        title="Movies"
                        value={movies.length}
                    />
                </div>
            </div>
            <h2>Theaters</h2>
            <table className='w-100 client'>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>City</th>
                </tr>
                {theaters.map(theater => {
                    return (
                        <tr>
                            <td>{theater.name}</td>
                            <td>{theater.description}</td>
                            <td>{theater.city}</td>
                        </tr>
                    )
                })}
            </table>
            <h2>Movies</h2>
            <table className='w-100 client'>
                <tr>
                    <th>Movie</th>
                    <th>Description</th>
                    <th>Director</th>
                </tr>
                {movies.map(movie => {
                    return (
                        <tr>
                            <td>{movie.name}</td>
                            <td>{movie.description}</td>
                            <td>{movie.director}</td>
                        </tr>
                    )
                })
                }
            </table>
        </div>
    )
}

export default Client