import React, { useState } from 'react';
import AppLayout from '../../Compo/AppLayout/AppLayout';
import toast from 'react-hot-toast';
import axios from 'axios';
import '../../style/AuthStyle.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/v1/auth/register', {
        name,
        email,
        password,
        phone,
        address,
        answer
      });

      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Something went wrong");
      toast.error("Something went wrong");
    }
  };

  return (
    <AppLayout title={"Register"}>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h4 className='title'>REGISTER FORM</h4>
          <div className="mb-3">
            <input
              required
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Your Email'
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <input
              required
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
              required
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
              required
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
              required
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
    </AppLayout>
  );
};

export default Register;
