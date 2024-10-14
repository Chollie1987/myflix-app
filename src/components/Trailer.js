import { Button } from '@mui/material';
import React, { useEffect, useState, useCallback} from 'react'
import Modal from 'react-modal';
import YouTube from 'react-youtube';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Trailer({location, movieId}) {

   const [trailerView, setTrailerView] = useState([])

   const api_key=process.env.REACT_APP_API_KEY;

   const showTrailer = useCallback(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${movieId ? movieId : location?.state?.movie?.id}/videos?api_key=${api_key}&language=en-US`)
        .then(res => res.json())
        .then(json => setTrailerView(json.results))
        .catch(err => console.error(err));
    },[api_key, location, movieId])

    useEffect(()=>{
        showTrailer();
    },[showTrailer]);

    let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
   
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }



 return (
 <div>
      <Button variant='contained' color='info' style={{fontFamily:'initial',fontWeight:'bold'}} onClick={openModal}>Play Trailer</Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Clips and Trailers</h2>
        {trailerView && trailerView.length > 0 && <YouTube videoId={trailerView[0].key}/>}
       
      </Modal>
    </div>
  );
}

export default Trailer
