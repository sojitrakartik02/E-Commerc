import React, { useState } from 'react'
import AppLayout from '../../Compo/AppLayout/AppLayout'

import toast from 'react-hot-toast'
import axios from 'axios'
import '../../style/AuthStyle.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/auth.js'

const Login = () => {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const res = await axios.post('/api/v1/auth/login', { email, password })
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || '/')

            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Somthing went Wrong")
        }
    }

    return (
        <AppLayout title={"Login"}>
            <div className='form-container'>


                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Login FORM</h4>

                    <div className="mb-3">
                        <input required onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter Your Email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <input required onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter Your Password' type="password" className="form-control" id="exampleInputPassword" aria-describedby="emailHelp" />

                    </div>
                    <div className='mb-3'>
                    <button type="button" className="btn btn-primary"
                    onClick={()=>{navigate('/forgot-password')}}
                    >Forgot Password</button>
                    </div>

                    
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>


            </div>
        </AppLayout>
    )
}

export default Login
