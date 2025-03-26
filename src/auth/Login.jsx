import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in before rendering
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "GET", 
          credentials: "include",
        });

        const data = await response.json();
        if (response.ok && data.authenticated) {
          navigate("/password"); // Redirect if already logged in
        }
      } catch (error) {
        console.error("Login check failed:", error);
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })

    const data = await response.json();
    if(data.error) {
      setError(data.error);
    }else {
      navigate("/password");
    }
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black opacity-90"></div>
      <div className="absolute top-1/3 left-1/4 w-56 h-56 bg-blue-500 rounded-full filter blur-3xl opacity-25"></div>
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-purple-500 rounded-full filter blur-3xl opacity-25"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        <h1 className="text-5xl font-bold text-blue-500 mb-8">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-6">
          {/* Email */}
       
            <input type="email" id="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-transparent border-b-2 border-blue-500 focus:outline-none text-white text-lg p-2 w-full"/>

          {/* Password */}
         
            <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-transparent border-b-2 border-blue-500 focus:outline-none text-white text-lg p-2 w-full"/>
        

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-2 px-6 rounded-full mt-4 w-full">Login</button>
        </form>

        {/* Links */}
        <div className="mt-6 flex gap-4">
          <Link to="/2fa/forgetPswd" className="text-blue-400 hover:underline">Forget Password</Link>
          <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
