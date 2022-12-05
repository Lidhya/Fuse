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
                            <h1 className='font-bold text-xl'>{book.volumeInfo.title}</h1>
                            <h3 className='font-semibold text-base'>{book.volumeInfo.authors}</h3>
                            <h4>{book.volumeInfo.publisher}<span> {book.volumeInfo.publishedDate}</span></h4><br/>
                            <p>{book.volumeInfo.description}</p>
                            <div className='flex justify-center my-2'>
                            <div>
                              <a  href={book.volumeInfo.previewLink} className='bg-purple-700 text-white px-2 py-1 rounded-lg hover:bg-purple-800 my-2'>More</a>
                              </div> 
                            </div>
                        </div>
                    </div> 
     
</Modal>

  )
}

export default BookModal