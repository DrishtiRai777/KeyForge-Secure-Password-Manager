import { useState } from "react"
import { useNavigate } from "react-router-dom";

const TwoFactorSetupAgain = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate(); 
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:3000/auth/issue-auth-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({email}),
        });

        if (response.ok) {
            const data = await response.json();
            setAuthToken(data.authToken); 
            navigate('/2fa'); 
        } else {
            const data = await response.json();
            if (data.error === 'TOTP already set up') {
                setError('TOTP is already set up for this account.');
            } else {
                setError(data.error || 'An error occurred.');
            }
        }
    }
    catch(error) {
        console.log("Error in 2FA Setup: ", error.message);
        setError("An error occurred. Please try again");
    }
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black opacity-90"></div>
      <div className="absolute top-1/3 left-1/4 w-56 h-56 bg-blue-500 rounded-full filter blur-3xl opacity-25"></div>
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-purple-500 rounded-full filter blur-3xl opacity-25"></div>

      {/* Form Container */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        <h1 className="text-5xl font-bold text-blue-500 mb-8">2FA Setup</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="bg-transparent border-b-2 border-blue-500 focus:outline-none text-white text-lg p-2 w-full"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-2 px-6 rounded-full mt-4 w-full">Send 2FA Token</button>
        </form>
      </div>
    </div>
  )
}

export default TwoFactorSetupAgain;
