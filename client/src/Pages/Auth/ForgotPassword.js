import React, { useState } from 'react'
import AppLayout from '../../Compo/AppLayout/AppLayout'

import toast from 'react-hot-toast'
import axios from 'axios'
import '../../style/AuthStyle.css'
import {  useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/auth.js'

const ForgotPassword = () => {


    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    
    const [answer, setAnswer] = useState("")

    const navigate = useNavigate();
    


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const res = await axios.post('/api/v1/auth/forgot-password', { email, newPassword,answer })
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
              
                navigate('/login')

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
                    <h4 className='title'>RESET PASSWORD</h4>

                    <div className="mb-3">
                        <input required onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter Your Email' type="email" className="form-control" id="exampleInputEmail1"  />

                    </div>
                    <div className="mb-3">
                        <input required onChange={(e) => setAnswer(e.target.value)} value={answer} placeholder='Enter Your Answer'  className="form-control" id="exampleInputAnswer"  />

                    </div>
                    <div className="mb-3">
                        <input required onChange={(e) => setNewPassword(e.target.value)} value={newPassword} placeholder='Enter Your Password' type="password" className="form-control" id="exampleInputPassword"  />

                    </div>
                    

                    
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>


            </div>
        </AppLayout>
    )
}

export default ForgotPassword
