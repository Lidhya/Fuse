import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../axios'
import { UserContext } from '../context/UserContext'


function Signin() {
  const { setCurrentUser } = useContext(UserContext)
  const navigate = useNavigate()
  const initialValues = { username: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        Axios.post('/auth/login', formValues)
          .then((response) => {
            console.log(response.data);
            const { user, token } = response.data
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', JSON.stringify(token))
            setCurrentUser(user)
            navigate('/')
          })
          .catch((error) => {
            console.log(error);
            setErrorMessage(error.response?.data.message)
          })
      } catch (err) {
        setErrorMessage(err)
      }
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "username is required";
    }

    if (!values.password) {
      errors.password = "password is required";
    } else if (values.password.length < 5) {
      errors.password = "password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <>
      <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className=" flex justify-center absolute overflow-y-auto overflow-x-hidden  z-50 w-full md:inset-0  md:h-full">
        <div className=" relative w-full max-w-6xl md:max-w-md h-full md:h-auto bg-black lg:-mr-96">

          <div className=" h-screen flex justify-center items-center  bg-black  dark:bg-black">
            <div className=" py-6 px-6 lg:px-8 flex-1">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to <span className='text-white font-bold '>FUSE</span></h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage}</div>}
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your username</label>
                  <input type="text" name="username" id="username" value={formValues.username} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="john_doe" required /></div>
                <p className='text-red-400 text-xs'>{formErrors.username}</p>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                  <input type="password" name="password" id="password" value={formValues.password} onChange={handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                  <p className='text-red-400 text-xs'>{formErrors.password}</p>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                    </div>
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                  </div>
                  <Link to="/" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</Link>
                </div>
                <button type='submit' className="w-full mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered? <Link to={'/signup'} className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Signin