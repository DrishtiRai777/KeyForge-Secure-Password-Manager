import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

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
        <div className="h-screen bg-black text-white flex flex-col items-center justify-center relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black opacity-90"></div>
            <div className="absolute top-1/3 left-1/4 w-56 h-56 bg-blue-500 rounded-full filter blur-3xl opacity-25"></div>
            <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-purple-500 rounded-full filter blur-3xl opacity-25"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-md">
                <h2 className="text-5xl font-bold text-blue-500 mb-6">Enable TOTP</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <p className="text-gray-300 mb-4 text-center">
                    Scan the QR Code below using Google Authenticator or any TOTP app:
                </p>

                {qrCodeUrl && (
                    <img src={qrCodeUrl} alt="TOTP QR Code" className="w-40 h-40 mb-6 border border-gray-700 rounded-lg" />
                )}

                <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-6">
                    {/* Input Field */}
                    <input
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={totpCode}
                        onChange={(e) => setTotpCode(e.target.value)}
                        required
                        pattern="[0-9]{6}"
                        className="bg-transparent border-b-2 border-blue-500 focus:outline-none text-white text-lg p-2 w-full text-center"
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-2 px-6 rounded-full w-full"
                    >
                        Verify & Enable TOTP
                    </button>
                </form>

                <p className="text-gray-400 text-sm mt-6 text-center">
                    Don&apos;t want to set up yet? <br /> There is no other way to reset your password and enter.
                </p>
                
                <Link to="/login" className="text-blue-400 hover:underline mt-2">
                    Skip Anyway
                </Link>
            </div>
        </div>
    );
}
