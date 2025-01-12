import Link from 'next/link';

export default function Home() {
  return (
    <form className="login">
      <h2>Welcome, User!</h2>
      <p>Please log in</p>
      <input type="email" placeholder="Please Enter Your Email" required />
      <input type="password" placeholder="Password" required />
      <input type="submit" value="Log In" />
      <div className="links">
        <Link href="/Register">
          Register
        </Link>
      </div>
    </form>
  );
}
