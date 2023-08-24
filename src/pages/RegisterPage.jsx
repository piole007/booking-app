import React from 'react'
import LoginForm from '../components/loginForm/LoginForm'

const RegisterPage = () => {

  return (
    <div className='mt-4 grow flex items-center justify-around'>
        <LoginForm questionText={"Already a member?"} btnText={"Register"} routText="Login" rout={"/login"} title={"Register"}/>
    </div>
  )
}

export default RegisterPage