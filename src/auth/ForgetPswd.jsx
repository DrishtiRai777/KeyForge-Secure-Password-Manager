import { useState } from "react";

export default function ForgetPswd() {
    const [email, setEmail] = useState("");
    const [totp, setTotp] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("/totp/reset-pswd", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, totp })
        });

        const data = await response.json();
        if (data.error) {
            setError(data.error);
        } else {
            alert("Verification successful!"); 
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
