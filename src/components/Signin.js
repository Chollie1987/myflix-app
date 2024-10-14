import React from 'react'
import { signInWithPopup } from 'firebase/auth';
import { Button } from '@mui/material';
import myflix from '../images/myflix.png'
import { auth, googleAuth } from '../firebase/setup';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signin() {

  const navigate = useNavigate()

    const googleSignIn = async()=>{
        try{
            // const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, googleAuth)
            setTimeout(()=>{
              auth.currentUser?.emailVerified && navigate('/')
            },2000)
            toast.success('Signed in successfully')
        }catch(err){
            console.error(err)
        }
    }

    console.log(auth?.currentUser)

  return (
    <div style={{backgroundColor:'#081d35', height:'100vh'}}>
      <ToastContainer autoClose={2000}/>
      <img 
      style={{width:'200px', padding:'20px'}} 
      src={myflix}
      alt=''/>
      <div style={{position:'fixed', left:'45%', top:'30%'}}>
      <Button onClick={googleSignIn} variant='contained'>Signin with Google</Button>
      <br/>
      <h2 style={{color:'#f4f6f7'}}>Explore movies here!</h2>
      </div>
    </div>
  )
}

export default Signin
