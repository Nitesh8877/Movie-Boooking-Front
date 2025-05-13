import React, { useEffect, useState } from 'react'
import Navbar from '../../componets/Navbar/Navbar'
import ReactPlayer from 'react-player'
import {useParams,Link} from 'react-router-dom'
import {getMoviesById} from '../../api/movie/index'
import {getAllTheaters} from '../../api/theatre/index'
const  MovieDetails=()=> {

  const {movieid:id}=useParams();
  const [selectedMovie,setSelectedMovie]=useState(id);
  const [movieDetails,setMovieDetails]=useState({});
  const [releaseStatus,setMovieReleaseStatus]=useState(false);
  const [movieCast,setMovieCast]=useState([]);
  const [isLoggedin,setLoggedin]=useState(false);

   
  const init=async()=>{

    try {
      const results=await getAllTheaters();
      if(results){
        setLoggedin(true);
      }
    } catch (error) {
      setLoggedin(false);
    }
    const response=await getMoviesById(selectedMovie);
   
    setMovieDetails(response.data[0]);
    setMovieReleaseStatus(response.data[0].releaseStatus=='RELEASED')
    setMovieCast(response.data[0].casts)


  }
  console.log(movieDetails)
  
  useEffect(()=>{
    init();
  },[])

  const render=()=>{
  return (
   <>
   <Navbar/><br></br>
   <div className='bg-light'>
    <div className='box bg-black backg'>
      <ReactPlayer url={movieDetails.trailerUrl} controls={true} className="video" width="100%" height="300px" />
    </div>
    <div className='container my-4 justify-content-center'>
      <div className='row'>
        <div className='col'>
          <img src={movieDetails.posterUrl} className='card' width={300} height={450} alt='...' />
        </div>
        <div className='col'>
          <h2 className='fw-bolder'>About The Movie</h2>
          <div className='d-flex'>
            <span className='badge rounded-fill text-bg-danger m-1'>{movieDetails.description}</span>
            <span className='dot my-auto'></span>
            <span className='badge rounded-fill text-bg-secondary m-1'>{movieDetails.language}</span>
           
            <span className='badge rounded-fill text-bg-secondary m-1'>{movieDetails.releaseStatus}</span>
           
          </div>
          <hr/>
          <h3>Movie Name: {movieDetails.name}</h3>
          <h3>Director: {movieDetails.director}</h3>
          <h3>ReleaseDate: {movieDetails.releaseDate}</h3>
          <hr/>
        <h5>Cast</h5>
        {
          movieCast.map(name=><li key={name} className='list-group-item'>{name}</li>)
        }
        <hr/>
          <div className='text-center my-3' style={{display:isLoggedin?"block":'none'}}><Link key={selectedMovie} className='text-decoration-none btn btn-lg btn-success text-center' to={releaseStatus?`/buytickets/${movieDetails.name}/${selectedMovie}`:`#`}> {releaseStatus?"BOOk TICKET":"COMMING SOON"}</Link></div>
          {
            !isLoggedin?"Please login then book the ticket":""
          }
        </div>
        
      </div>
    </div>
   </div>
   </>
  )
  }

  return (
    render()
  )
}


export default MovieDetails
