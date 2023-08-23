import React from 'react'
import LoginForm from '../components/loginForm/LoginForm'

const LoginPage = () => {
    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <LoginForm questionText={"Don't have an account yet?"} btnText={"Login"} routText={"Register"} rout={"/register"} title="Login"/>
        </div>
    )
}

export default LoginPage