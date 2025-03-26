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

        const response = await fetch("http://localhost:3000/2fa/update-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password, confirmPassword })
        });

        const data = await response.json();
        if (data.error) {
            setError(data.error);
        } else {
            alert("Password successfully reset!");
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

            {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-6">
                    <input type="hidden" name="token" value={token} />
                    <input 
                        type="password" 
                        name="password" 
                        id="password"
                        value={password} 
                        placeholder="New Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-transparent border-b-2 border-blue-500 focus:outline-none text-white text-lg p-2 w-full"
                    />
                    
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="bg-transparent border-b-2 border-blue-500 focus:outline-none text-white text-lg p-2 w-full"
                    />
                    
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-2 px-6 rounded-full mt-4 w-full">Reset Password</button>
                </form>
            </div>
        </div>
    );
}
