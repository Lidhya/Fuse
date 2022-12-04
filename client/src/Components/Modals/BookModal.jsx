import React from 'react'
import Modal from 'react-modal'
import { customStyles } from '../javascripts/profileModalStyle'
import CloseIcon from '@mui/icons-material/Close';

function BookModal({setModal, modal, book}) {
  Modal.setAppElement('#root')
    let thumbnail=book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;

  return (
    <Modal isOpen={modal} onRequestClose={() => { setModal(false) }} style={customStyles}>
    <div className='text-end'><CloseIcon onClick={() => { setModal(false) }} /></div>
    <div className="inner-box">
                        <img src={thumbnail} alt="book" />
                        <div className="info">
                            <h1>{book.volumeInfo.title}</h1>
                            <h3>{book.volumeInfo.authors}</h3>
                            <h4>{book.volumeInfo.publisher}<span>{book.volumeInfo.publishedDate}</span></h4><br/>
                            <p>{book.volumeInfo.description}</p>
                            <a href={book.volumeInfo.previewLink}><button className='underline text-blue-800'>More</button></a>
                        </div>
                    </div> 
     
</Modal>

  )
}

export default BookModal