import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { Button } from "..";

const OtpVerifier = ({ phone, cb }) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleConfirmOTP = () => {
    setIsLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        // console.log(result);
        setIsLoading(false);
        cb();
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  return (
    <div className="p-4 flex items-center justify-center h-full flex-col gap-12">
      <span>
        We sent OTP code to your phone number .Please check your smartphone
      </span>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span>•</span>}
        renderInput={(props) => <input {...props} />}
        inputStyle="h-20 otp-item border rounded-md outline-none inline-block border-blue-600 text-lg mx-2 "
        shouldAutoFocus={true}
      />
      <div className="flex gap-4 items-center justify-center">
        <Button disabled={isLoading} handleOnClick={handleConfirmOTP}>
          Confirm OTP
        </Button>
        <Button handleOnClick={() => setOtp("")} className="bg-orange-600">
          Clear{" "}
        </Button>
      </div>
    </div>
  );
};

export default OtpVerifier;
