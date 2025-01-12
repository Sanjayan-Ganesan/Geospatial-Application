import '../register/register.css';
import Link from 'next/link';

export default function Register() {

  return (
    <div className="wrapper">
      <div className="title">
        Registration Form
      </div>
      <div className="form">
        <div className="inputfield">
          <label>User Name</label>
          <input type="text" className="input" required />
        </div>
        <div className="inputfield">
          <label>Email Address</label>
          <input type="text" className="input" required />
        </div>
        <div className="inputfield">
          <label>Password</label>
          <input type="password" className="input" required />
        </div>
        <div className="inputfield">
          <label>Confirm Password</label>
          <input type="password" className="input" required />
        </div>
        <div className="inputfield terms">
          <label className="check">
            <input type="checkbox" required />
            <span className="checkmark"></span>
          </label>
          <p>Agreed to terms and conditions</p>
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
    </div>
  );
}
