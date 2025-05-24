// import React from "react";
import { useState, useRef } from "react";

const OTPInput = ({ length = 6, onComplete }:{length?: number, onComplete?: (otp: string) => void}) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef<any>([]);

    const handleChange = (index:number, e:any) => {
        const value = e.target.value;
        if (!/^[0-9]?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        if (newOtp.every((digit) => digit !== "")) {
            onComplete?.(newOtp.join(""));
        }
    };

    const handleKeyDown = (index:number, e:any) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex space-x-2">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    ref={(el:any) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 focus:border-blue-500 rounded-lg outline-none"
                />
            ))}
        </div>
    );
}


export default OTPInput