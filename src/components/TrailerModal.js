import React from "react";

import Modal from "react-bootstrap/Modal";
import CloseButton from 'react-bootstrap/CloseButton'


const TrailerModal = (props) => {
  return (
    <>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className='text-light py-2 border-0' style={{background: '#000'}}>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.videotitle && props.videotitle} - {props.trailertitle && props.trailertitle}          
        </Modal.Title>
        <CloseButton aria-label="Hide" variant="white" onClick={props.onHide} />
      </Modal.Header>
      <Modal.Body className='p-0' style={{backgroundColor: '#000'}}>
      {<iframe
          width = "100%"
          height = "450"
          src = {`https://www.youtube-nocookie.com/embed/${props.videokey && props.videokey}`}
          title = "YouTube video player"
          frameBorder = "0"
          allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen >
        </iframe>
        }
      </Modal.Body>
    </Modal>
    </>
  )
}

export default TrailerModal