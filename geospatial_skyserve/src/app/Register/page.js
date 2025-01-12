"use client";

import '../register/register.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Register() {
  const [RegisterInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',// Added state for confirm password
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = RegisterInfo;
    if(!name){
      alert('Please Enter User Name');
      return;
    }else if(!email){
      alert('Please Enter Email');
      return;
    }else if(!password){
      alert('Please Enter Password');
      return;
    }

    try{

      const url = "http://localhost:8080/api/auth/signup";

      const response = await fetch(url,{
        method: "POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(RegisterInfo)
      });
      const result = await response.json();
      console.log(result)

    } catch(err){
      console.log(err,"Error Occured")
    }

  };

  return (
    <form className="wrapper" onSubmit={handleSubmit}>
      <div className="title">
        Registration Form
      </div>
      <div className="form">
        <div className="inputfield">
          <label>User Name</label>
          <input 
            type="text" 
            name="name" 
            className="input" 
            onChange={handleChange} 
            value={RegisterInfo.name}/>
        </div>
        <div className="inputfield">
          <label>Email Address</label>
          <input 
            type="text" 
            name="email" 
            className="input" 
            onChange={handleChange} 
            value={RegisterInfo.email}/>
        </div>
        <div className="inputfield">
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            className="input" 
            onChange={handleChange} 
            value={RegisterInfo.password}/>
        </div>
        <div className="inputfield">
          <input type="submit" value="Register" className="btn" />
        </div>
        <div className="links">
          <Link href="/">
            Back to Login
          </Link>
        </div>
      </div>
    </form>
  );
}
