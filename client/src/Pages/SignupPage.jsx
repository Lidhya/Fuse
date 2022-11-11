import React from 'react'
import AuthBg from '../Components/Auth/AuthBg'
import Signup from '../Components/Signup'

function SignupPage() {
  return (
    <>
    <div className='hidden md:block'><AuthBg/></div>
    <div ><Signup/></div>
    </>
  )
}

export default SignupPage