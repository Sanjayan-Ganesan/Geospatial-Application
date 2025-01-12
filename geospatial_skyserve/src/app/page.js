"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = (e) =>{
    e.preventDefault();
  }

  useEffect(() => {
    // This useEffect makes sure nothing unexpected happens on the client side
  }, []);

  return (
    <form className="login" onSubmit={handleLogin}>
      <h2>Welcome, User!</h2>
      <p>Please log in</p>
      <input 
        type="email" 
        name="email" 
        placeholder="Please Enter Your Email" 
        onChange={handleChange} 
        value={loginInfo.email} 
        required 
      />
      <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        onChange={handleChange} 
        value={loginInfo.password} 
        required 
      />
      <input type="submit" value="Log In" />
      <div className="links">
        <Link href="/Register">
          Register
        </Link>
      </div>
    </form>
  );
}
