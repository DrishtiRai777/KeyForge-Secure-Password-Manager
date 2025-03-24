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
    <div>
      <h1>2FA Setup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send 2FA Token</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default TwoFactorSetupAgain;
