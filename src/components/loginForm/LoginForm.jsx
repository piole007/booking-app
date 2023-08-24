import React, {useState} from 'react'
import "./LoginForm.css"
import { Link } from 'react-router-dom'

const LoginForm = ({questionText, btnText, routText, rout, title} ) => {

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className='mb-64'>
            <h1 className='text-4xl text-center mb-4'>{title}</h1>
            <form className='max-w-md mx-auto'>

                <input className='email' 
                type="email" 
                placeholder='your@email.com' 
                value={email} 
                onChange={ev=>setEmail(ev.target.value)} />

                <input className="password" 
                type="password" 
                placeholder='password'
                value={password}
                onChange={ev=>setPassword(ev.target.value)} />
                 
                <button className='login'>{btnText}</button>
                <div className='text-center py-2 text-gray-500'>{questionText} <Link className='underline text-black' to={rout}>
                   {routText} 
                </Link></div>
            </form>
        </div>
    )
}

export default LoginForm