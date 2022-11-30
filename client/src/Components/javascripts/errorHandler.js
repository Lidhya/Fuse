import Swal from 'sweetalert2'

export  const errorHandler = () => {
    Swal.fire({
       icon: 'error',
       title: 'Oops...',
       text: 'Something went wrong!',
    })
 }