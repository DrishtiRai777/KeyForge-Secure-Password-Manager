import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function ForgetPswd() {
    const [email, setEmail] = useState("");
    const [totp, setTotp] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/2fa/reset-pswd", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, totp })
        });

        const data = await response.json();
        if (data.error) {
            setError(data.error);
        } else {
            // Redirect user to reset pswd page with token
            console.log("Redirecting to login...");
            navigate(`/2fa/reset-password?token=${data.resetToken}`);
        }
    };

    return (
        <div>
            <h1>Reset Password</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter Email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br /><br />
                <label htmlFor="totp">Enter the 6-digit code from your app:</label>
                <input 
                    type="text" 
                    name="totp" 
                    id="totp" 
                    value={totp} 
                    onChange={(e) => setTotp(e.target.value)}
                    required 
                    pattern="[0-9]{6}"
                />
                <button type="submit">Verify</button>
            </form>
        </div>
    );
}
