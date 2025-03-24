import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';

export default function EnableTOTP() {
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [totpCode, setTotpCode] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/2fa/", { 
            method: "GET", 
            credentials: "include"  
        })
        .then(res => res.json())
        .then(data => {
            console.log("QR Code Data Received:", data);
            setQrCodeUrl(data.qrCodeUrl);
        })
        .catch(err => console.error("QR Fetch Error:", err));
    }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("http://localhost:3000/2fa/verify-totp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ totpCode })
        });
    
        const data = await response.json();
        if (data.error) {
            setError(data.error);
        } else {
            alert("TOTP enabled successfully!...Redirecting to login"); 
            navigate("/login");
        }
    };

    return (
        <div className="container">
            <h2>Enable Two-Factor Authentication</h2>
            {error && <p className="error" style={{ color: "red" }}>{error}</p>}
            <p>Scan the QR Code below using Google Authenticator or any TOTP app:</p>
            {qrCodeUrl && <img src={qrCodeUrl} alt="TOTP QR Code" />}
            <form onSubmit={handleSubmit}>
                <label htmlFor="totpCode">Enter the 6-digit code from your app:</label>
                <input 
                    type="text" 
                    name="totpCode" 
                    id="totpCode" 
                    value={totpCode} 
                    onChange={(e) => setTotpCode(e.target.value)}
                    required 
                    pattern="[0-9]{6}"
                />
                <button type="submit">Verify & Enable TOTP</button>
            </form>


            <p>Don&apos;t want to set up yet ? There is no other way to reset password and enter.</p>
            <Link to="/login">Skip Anyway</Link>

        </div>
    );
}
