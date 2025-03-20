
import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OtpVerificationProps {
  onVerify: () => void;
  onCancel: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ onVerify, onCancel }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [isVerified, setIsVerified] = useState(false);
  
  useEffect(() => {
    if (timer > 0 && !isVerified) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, isVerified]);
  
  const handleVerify = () => {
    if (otp.length === 6) {
      setIsVerified(true);
      setTimeout(() => {
        onVerify();
      }, 1500);
    }
  };
  
  const handleResend = () => {
    setTimer(60);
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass card-shadow rounded-xl p-6 w-full max-w-md animate-scale-in">
        <div className="text-center mb-6">
          {isVerified ? (
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-xl font-bold">Verified Successfully!</h2>
              <p className="text-muted-foreground mt-2">Redirecting to payment...</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-2">OTP Verification</h2>
              <p className="text-muted-foreground">
                We've sent a one-time password to your registered mobile number
              </p>
            </>
          )}
        </div>
        
        {!isVerified && (
          <>
            <div className="mb-6">
              <InputOTP 
                maxLength={6} 
                value={otp} 
                onChange={setOtp}
                className="gap-2 justify-center"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="glass border-white/10 focus-visible:ring-green-500/40" />
                  <InputOTPSlot index={1} className="glass border-white/10 focus-visible:ring-green-500/40" />
                  <InputOTPSlot index={2} className="glass border-white/10 focus-visible:ring-green-500/40" />
                  <InputOTPSlot index={3} className="glass border-white/10 focus-visible:ring-green-500/40" />
                  <InputOTPSlot index={4} className="glass border-white/10 focus-visible:ring-green-500/40" />
                  <InputOTPSlot index={5} className="glass border-white/10 focus-visible:ring-green-500/40" />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-1">
                {timer > 0 ? (
                  <>Resend code in <span className="font-medium">{timer}s</span></>
                ) : (
                  <>Didn't receive the code?</>
                )}
              </p>
              
              {timer === 0 && (
                <button 
                  onClick={handleResend}
                  className="text-green-500 text-sm font-medium hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={onCancel}
                className="py-3 rounded-xl glass border-white/10 font-medium hover:bg-white/5 active:scale-[0.99] transition-all duration-200"
              >
                Cancel
              </button>
              <button 
                onClick={handleVerify}
                className={`py-3 rounded-xl font-medium active:scale-[0.99] transition-all duration-200 ${
                  otp.length === 6 
                    ? "bg-green-500 text-black hover:bg-green-600" 
                    : "bg-green-500/50 text-black/50 cursor-not-allowed"
                }`}
                disabled={otp.length !== 6}
              >
                Verify
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OtpVerification;
