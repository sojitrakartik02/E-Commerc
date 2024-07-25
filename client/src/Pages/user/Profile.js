import React, { useEffect, useState } from 'react'
import AppLayout from '../../Compo/AppLayout/AppLayout.js'
import UserMenu from '../../Compo/AppLayout/UserMenu.js'
import { useAuth } from '../../Context/auth.js';
import toast from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [auth, setAuth] = useAuth();


  useEffect(()=>{
    const{email,name,phone,address}=auth.user;
    setName(name)
    setPhone(phone)
    setEmail(email)
    setAddress(address)
  },[auth?.user])



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.put('/api/v1/auth/profile', {
        name,
        email,
        password,
        phone,
        address,
        answer
      });
      if(data?.success){
        toast.success("Profile Upadte Succesfully")

      }else{
        setAuth([...auth,data?.updatedUser])
        let ls=localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user=data.updatedUser
        localStorage.setItem('auth',JSON.stringify(ls))
        toast.success("Profille update Succesfully")
      }

    } catch (error) {
      console.log("Something went wrong");
      toast.error("Something went wrong");
    }
  };




  return (
    <AppLayout>
      <div title={"Your Profile"}>
        <div className='container-fluid p-3 m-3'>
          <div className='row'>
            <div className='col-md-3'>
              <UserMenu />
            </div>
            <div className='col-md-9'>
              <div className='form-container'>
                <form onSubmit={handleSubmit}>
                  <h4 className='title'>USER FORM</h4>
                  <div className="mb-3">
                    <input
                      
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Enter Your Name'
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Enter Your Email'
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Enter Your Password'
                      type="password"
                      className="form-control"
                      id="exampleInputPassword"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder='Enter Your Phone'
                      type="number"
                      className="form-control"
                      id="exampleInputPhone"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder='Enter Your Address'
                      type="text"
                      className="form-control"
                      id="exampleInputAddress"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder='Enter Your Favorite Sport'
                      type="text"
                      className="form-control"
                      id="exampleInputAnswer"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Profile
