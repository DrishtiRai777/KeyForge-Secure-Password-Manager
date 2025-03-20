import { useState, useEffect } from "react";

export default function EnableTOTP() {
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [totpCode, setTotpCode] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch QR code URL when component mounts
        async function fetchQrCode() {
            const response = await fetch("/totp/get-qrcode"); 
            const data = await response.json();
            if (data.qrCodeUrl) {
                setQrCodeUrl(data.qrCodeUrl);
            } else {
                setError("Failed to load QR code");
            }
        }
        fetchQrCode();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("/totp/verify-totp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ totpCode })
        });

        const data = await response.json();
        if (data.error) {
            setError(data.error);
        } else {
            alert("TOTP enabled successfully!"); 
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
        </div>
    );
}
