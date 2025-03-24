import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in before rendering
    useEffect(() => {
      const checkRegisterStatus = async () => {
        try {
          const response = await fetch("http://localhost:3000/auth/register", {
            method: "GET", 
            credentials: "include",
          });
  
          const data = await response.json();
          if (response.ok && data.authenticated) {
            navigate("/password"); // Redirect if already logged in
          }
        } catch (error) {
          console.error("Register check failed:", error);
        }
      };
  
      checkRegisterStatus();
    }, [navigate]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",  
    });

    const data = await response.json();
    if (data.error) {
        setError(data.error);
    } else {
        navigate("/2fa");
    }
};

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
      <Link to="/2fa/set2fa">Set Up 2FA</Link>
    </div>
  )
}

export default Register
