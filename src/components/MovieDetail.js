import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid, Button, TextField } from '@mui/material';
import { addDoc, doc, collection, getDocs } from 'firebase/firestore';
import { auth, database } from '../firebase/setup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Trailer from './Trailer';


function MovieDetail() {

    const [review, setReview] = useState('')
    const [reviewData, setReviewData] = useState([])
    const location = useLocation()

    console.log(location)
    
    const movieRef = doc(database, "Movies", `${location.state.movie.id}`)

    const reviewRef = collection(movieRef, "Reviews")

    const addReview = async() =>{
       try{
           auth.currentUser && await addDoc(reviewRef, {
            movieReview:review, 
            email:auth.currentUser?.email,
            username:auth.currentUser?.displayName,
            profile_image:auth.currentUser?.photoURL
        })
           auth.currentUser ? toast.success('Review added successfully',{
                theme:'dark'
             })
             : toast.warning('Log in first')
        }catch(err){
         console.error(err)
       }
    }

    const showReview = async() =>{
        try{
         const data = await getDocs(reviewRef)
         const filteredData = data.docs.map((doc)=>({
            ...doc.data(),
            id:doc.id
         }))
         setReviewData(filteredData);
        }catch(err){
            console.error(err)
        }
    }
    useEffect(()=>{
        showReview()
    },[showReview])

    console.log(reviewData)

  return (
    <div style={{backgroundColor:'#06121e', height:'100%'}}>
    <Grid container>
    
        <Grid item xs={8}>
        <div style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original${location.state.movie.poster_path})`, backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>
            <ToastContainer autoClose={1500}/>
            <div style={{paddingTop:'80%', paddingLeft:'20px', paddingRight:'20px'}}>
            <h1 style={{color:'#03a5e7', fontFamily:'initial', fontSize:'50px'}}>{location.state.movie?.original_title}</h1>
            <div style={{display:'flex'}}>
            <h4 style={{color:'white', fontFamily:'initial', fontSize:'20px'}}>Language: {location.state.movie?.original_language} - </h4>
            <h4 style={{color:'white', fontFamily:'initial', fontSize:'20px', paddingLeft:'8px'}}> Release Date: {location.state.movie?.release_date}</h4>
            </div>
           
            <h3 style={{color:'white', fontFamily:'initial', fontSize:'25px'}}>{location.state.movie?.overview}</h3>
            {/* <Button color='info' variant='contained' style={{fontFamily:'initial',fontWeight:'bold'}}>Play Trailer</Button> */}
            <Trailer location={location}/>
           
            </div>
        </div>
        </Grid>
        <Grid item xs={4}>
        <div style={{backgroundColor:'#06121e', height:'100vh', padding:'20px'}}>
            <Grid container>
            <div>
                <h2 style={{color:'#b2882e', fontFamily:'initial', fontSize:'30px', fontWeight:'bold', paddingLeft:'8px'}}>Review: {location.state.movie?.original_title}</h2>
                <TextField onChange={(e)=>setReview(e.target.value)} style={{backgroundColor:'white', borderRadius:'5px', marginRight:'8px'}} size='small' label='Add Review'
                />
                <Button onClick={addReview} color='info' variant='contained' style={{fontFamily:'initial', fontWeight:'bold'}} >submit</Button>
            </div>
            </Grid>
            <div>
                 <h2 style={{color:'#b2882e', fontFamily:'initial', fontSize:'28px', fontWeight:'bold', paddingLeft:'8px'}}>Movie Reviews:</h2>
                 {reviewData.map((each)=>{
                    return <>
                    <div style={{display:'flex'}}>
                    <img 
                    style={{width:'20px', borderRadius:'50px', paddingRight:'8px'}} 
                    src={each.profile_image}
                    alt='profile image'/>
                    <li style={{color:'#b2882e', fontFamily:'initial', fontSize:'20px'}}>{each.username}</li>
                    </div>
                     <h4 style={{color:'#b2882e', fontFamily:'initial', fontSize:'20px'}}>"{each.movieReview}"</h4>
                    </>
                })}
            </div>
        </div>
        </Grid>
      
    </Grid>
    </div>
  )
}

export default MovieDetail
