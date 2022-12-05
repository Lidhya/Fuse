import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import BookModal from './Modals/BookModal'


function BookCard({ book }) {
    const [modal, setModal] = useState(false);
    const { title, authors } = book.volumeInfo
    let thumbnail = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;
    let amount = book.saleInfo.listPrice && book.saleInfo.listPrice.amount;
    const props = { setModal, modal, book }
    return (
        <>
            {thumbnail && amount &&
                <div onClick={() => setModal(true)} className="m-1 bg-white rounded-lg shadow-md p-1 hover:scale-105">
                    <img className="w-full h-56 rounded-t-lg" src={thumbnail} alt="book" />
                    <div className="px-5 pb-5">
                        <Link>
                            <h5 className="w-40 text-xl font-bold tracking-tight text-gray-900 hover:underline ">{title && title}</h5>
                        </Link>
                     {authors && <span className="w-40 text-gray-900 flex flex-col">{authors.length>1? (authors[0], authors[1]) : authors[0]}</span>}
                    </div>
                </div>
            }
            {modal && <BookModal {...props} />}
        </>
    )
}

export default BookCard