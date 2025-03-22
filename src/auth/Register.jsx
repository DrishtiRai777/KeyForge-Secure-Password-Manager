import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
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

      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required/>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>

        <button type="submit">Register</button>
      </form>

      {/* Links */}
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Register
