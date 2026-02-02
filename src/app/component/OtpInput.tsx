"use client";

import { useState, useRef, useEffect } from "react";

interface OtpInputProps {
  length?: number;
  onComplete: (otp: string) => void;
}

export default function OtpInput({ length = 6, onComplete }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // Allow only last entered character
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Trigger onComplete if filled
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length && !newOtp.includes("")) {
      onComplete(combinedOtp);
    }

    // Move to next input if value entered
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length).split("");
    if (pastedData.every(char => !isNaN(Number(char)))) {
       const newOtp = [...otp];
       pastedData.forEach((char, i) => {
           if (i < length) newOtp[i] = char;
       });
       setOtp(newOtp);
       if(newOtp.join("").length === length) onComplete(newOtp.join(""));
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(ref) => { inputRefs.current[index] = ref; }}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-12 h-14 border-2 border-slate-200 rounded-xl text-center text-2xl font-bold text-slate-900 focus:border-orange-600 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
        />
      ))}
    </div>
  );
}
