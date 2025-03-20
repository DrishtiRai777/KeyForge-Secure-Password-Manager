import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if(data.error) {
      setError(data.error);
    }else {
      navigate("/password");
    }
  }

  return (
    <div>
      {error && <p style={{color: "red"}}>{error}</p>}
      
      <h1>Log In Page</h1>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit">Login</button>
      </form>

      {/* Links */}
      <Link to="/totp/forgetPswd">Forget Password</Link>
      <Link to="/register">Register</Link>
    </div>
  )
}

export default Login
