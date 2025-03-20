import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function PswdReset() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const response = await fetch("/totp/update-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password })
        });

        const data = await response.json();
        if (data.error) {
            setError(data.error);
        } else {
            alert("Password successfully reset!");
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            {error && <p className="error" style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="token" value={token} />
                
                <label htmlFor="password">New Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input 
                    type="password" 
                    name="confirmPassword" 
                    id="confirmPassword"
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}
