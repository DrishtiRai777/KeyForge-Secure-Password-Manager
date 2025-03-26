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
        <div className="h-screen bg-black text-white flex flex-col items-center justify-center relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black opacity-90"></div>
            <div className="absolute top-1/3 left-1/4 w-56 h-56 bg-blue-500 rounded-full filter blur-3xl opacity-25"></div>
            <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-purple-500 rounded-full filter blur-3xl opacity-25"></div>

            {/* Form Container */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-md">
                <h1 className="text-5xl font-bold text-blue-500 mb-8">Reset Password</h1>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-6">
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={email} 
                            placeholder="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent border-b-2 border-blue-500 focus:outline-none text-white text-lg p-2 w-full"
                            required
                        />
                        <input 
                            type="text" 
                            name="totp" 
                            id="totp" 
                            value={totp} 
                            placeholder="Enter the 6-digit code from your app"
                            onChange={(e) => setTotp(e.target.value)}
                            required 
                            className="bg-transparent border-b-2 border-blue-500 focus:outline-none text-white text-lg p-2 w-full"
                            pattern="[0-9]{6}"
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-2 px-6 rounded-full mt-4 w-full">Verify</button>
                    </form>
            </div>
        </div>
    );
}
