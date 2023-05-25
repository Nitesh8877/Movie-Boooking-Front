import React, { useEffect, useState } from 'react'
import Navbar from '../../componets/Navbar/Navbar'
import {getMoviesById} from '../../api/movie/index'
import {getAllTheaters,getTheatreById} from '../../api/theatre/index'
import {Navigate,useParams} from 'react-router-dom'
import clsx from 'clsx'
import './Booking.css'
import Payment from '../../componets/Payment/Payment'

const seats=Array.from({length:8*8},(_,i)=>i)
const   Booking=() =>{

  /**
   * 1. Get the movie id
   * 2. Get the theatre id
   * 3. get the booked seats
   */


    const [pageLoaded,setPageLoaded]=useState(false);
    const {movieid:movieId}=useParams()
    const {theatreid:theatreId}=useParams()
    const [selectedMovieId]=useState(movieId);
    const [selectedTheatreId]=useState(theatreId);

    const [selectedMovie,setSelectedMovie]=useState({})
    const [selectedTheater,setSelectedTheatre]=useState({})

    const [selectedSeats,setSelectedSeats]=useState([])
    const [moviePrice]=useState(150)

    const [occupiedSeats]=useState([10,12,50,28,33,47])

  
    useEffect(()=>{
      const init=async()=>{
        try {
          await getAllTheaters()
        } catch (error) {
          Navigate('/login')
        }

        const response=await getMoviesById(selectedMovieId);
        setSelectedMovie(response.data[0]);
        const theatreResponse=await getTheatreById(selectedTheatreId);
        setSelectedTheatre(theatreResponse.data);
        console.log("theater id", selectedTheatreId)
        setPageLoaded(true)
      }
      // http://localhost:3000/movie/645338d655e10f4666763a90/645338d655e10f4666763a9b
      // console.log(localStorage.getItem('token'))
      init()
    },[])    // console.log(selectedMovie.name)
    // console.log(selectedTheater)
  const render=()=>{
    return (
      <>
      <div className='App bg-black backg'>
        <h2 className='fw-bold text-light'>{selectedMovie.name}</h2>
        <ShowCase/>
        <Cinema
        movie={selectedMovie}
        selectedSeats={selectedSeats}
        occupiedSeats={occupiedSeats}
        onSelectedSeatsChange={selectedSeats=>setSelectedSeats(selectedSeats)}
        />

        <p className='info'>

          You have selected <span className='count'>{selectedSeats.length} </span>{''}
          seats for the price of {' '}
          <span className='total'>{
            selectedSeats.length*moviePrice
          }</span>
        </p>
      <Payment
      noOfSeats={selectedSeats.length}
      movie={selectedMovie}
      theatre={selectedTheater}
      price={moviePrice*selectedSeats.length}
      />
      </div>

      </>
    )
  }
  return (
    <>
    <Navbar/>
    <div className='App bg-black backg text-light'><br/>
    {
      pageLoaded?render():"Loading data......"
    }
    </div>
    </>
  )
}

function Cinema({selectedSeats,onSelectedSeatsChange,occupiedSeats}){
      function handleSelectedState(seat){
       const isSelected = selectedSeats.includes(seat)
        if (isSelected) {
            onSelectedSeatsChange(
                selectedSeats.filter(selectedSeat => selectedSeat !== seat),
            )
        } else {
            onSelectedSeatsChange([...selectedSeats, seat])
        }
      }
  return (
    <div className='Cinema'>
        <div className='screen'/>
          <div className='seats'>
            {
              seats.map(seat=>{
                
                const isSelected=selectedSeats.includes(seat)
                const isOccupied=occupiedSeats.includes(seat)
                return (
                  <span
                    tabIndex='0'
                    key={seat}
                    className={
                      clsx('seat', isSelected && 'selected', isOccupied && 'occupied',)
                    }
                    onClick={isOccupied?null:()=>handleSelectedState(seat)}
                    onKeyPress={isOccupied?null:e=>{
                      if(e.key==='Enter'){
                        handleSelectedState(seat)
                      }
                    }}
                  />
                )
              })
            }
          
        </div>
    </div>

  )
}

function ShowCase(){
  return (
    <ul className='ShowCase'>
      <li>
        <span className='seat'/> <small>Available</small>
      </li>
      <li>
        <span className='seat selected'/> <small>Selected</small>
      </li>
      <li>
        <span className='seat occupied'/> <small>Occupied</small>
      </li>
    </ul>
  )
}

export default Booking