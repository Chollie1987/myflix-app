import React, { useEffect, useState } from 'react'
import { Box, Grid, Card, CardMedia } from '@mui/material'
import { Link } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import { database } from '../firebase/setup'


function Home() {
    const [movies, setMovies] = useState([])

    const api_key= process.env.REACT_APP_API_KEY

    const getMovie = () => {
        try {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`)
                .then(res => res.json())
                .then(json => setMovies(json.results))
                .catch(err => console.error(err));
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getMovie()
    }, [])

    const addMovie = async(movie) =>{
        console.log(movie)
        const movieRef = doc(database, 'Movies', `${movie.id}`)
        try{
            await setDoc(movieRef,{movieTitle:movie.original_title})
        }catch(err){
            console.error(err)
        }
    }
    console.log(movies)

    return (
        <div style={{backgroundColor:'#06121e', height:''}}>
            <Grid container spacing={2} style={{paddingTop:'20px', paddingRight:'20px', paddingLeft:'20px'}}>
            {movies.map((movie) => {
                {addMovie(movie)}
              return <Grid item xs={3}  key={movie.id}>
                <Box >
                    <Link to="/movieDetail" state={{movie:movie}}>
                    <Card>
                            <CardMedia
                                component="img"
                                height='100%'
                                image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            />
                    </Card>
                    </Link>
                </Box>
                </Grid>
            })}
            </Grid>
        </div>
    );
}

export default Home


