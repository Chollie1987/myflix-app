import React, { useEffect, useState } from 'react';
import myflix from '../images/myflix.png';
import {Button, TextField} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/setup';
import { signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Trailer from './Trailer'


function Navbar() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
     
    const api_key= process.env.REACT_APP_API_KEY;
    
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async(event)=>{
        event.preventDefault();
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=REACT_APP_API_KEY&query=${searchQuery}`);
            const data = await response.json();
            setMovies(data.results);
        } catch (error) {
            console.error('Error searching for movies:', error);
        }
    };
    

    const getMovie = () => {
        try {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`)
            .then(res => res.json())
            .then(json => setMovies(json.results))
        } catch (err) {
            console.error(err)
        }
    }
    
    const logout = async() =>{
        try{
            await signOut(auth)
            toast.success('Logged out successfully',{
                theme:'dark'
        })
        }catch(err){
            console.error(err)
        }
    }
    const signinClick = ()=>{
       navigate("/signin")
    }

    useEffect(() => {
        getMovie()
    }, []);

    const movieTitle = movies.length > 2 ? movies[2]?.original_title : '';
    const movieOverview = movies.length > 2 ? movies[2]?.overview : '';


    console.log(auth.currentUser?.email)
  return (
    <div style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original${movies[2]?.poster_path})`, backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundSize:'cover', height:'500px',width:'100%' }}>
        <ToastContainer autoClose={2000}/>
        <div style={{display:'flex', justifyContent:'space-between', padding:'20px'}}>
            <img style={{width:'140px', height:'40px'}} src={myflix}/>
              <h2 style={{backgroundColor:'white',fontFamily:'initial', borderRadius:'5px', marginLeft:'30%'}} onSubmit={handleSearchSubmit}>
                <TextField style={{fontFamily:'initial'}}
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    size='small'
                    label="Search for movies"
                />
                <Button style={{fontFamily:'initial', fontWeight:'bold'}} type="submit" variant="contained" color="info" >
                    Search
                </Button>
            </h2>
            <div>
            {auth.currentUser?.emailVerified ? <Button onClick={logout} style={{fontFamily:'initial', margin:'8px'}} color='primary' variant='contained'>Logout</Button>
            :<Button color='info' onClick={signinClick} style={{fontFamily:'initial'}}  variant='contained'>SignIn</Button>}
            </div>
        </div>
        <div style={{padding:'20px'}}>
            <h1 style={{color:'#03a5e7', fontSize:'60px', fontFamily:'initial'}}>{movies[2]?.original_title}</h1>
            <h4 style={{color:'#f2f4f7', fontSize:'25px', fontFamily:'initial'}}>{movies[2]?.overview}</h4>
            <Trailer movieId={movies[2]?.id}/>
            {/* <form onSubmit={handleSearchSubmit}>
                <TextField
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    label="Search for movies"
                    variant="outlined"
                    style={{ margin: '0 20px' }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Search
                </Button>
            </form> */}
        </div>
    </div>
  )
}

export default Navbar
