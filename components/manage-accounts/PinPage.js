import React from "react";
import { RxCross2 } from "react-icons/rx";
import PinInput from "react-pin-input";

export default function PinPage({
  pin,
  setPin,
  showPinContainer,
  setShowPinContainer,
  pinError,
  setPinError,
  handleLoginPin
}) {
  return (
    showPinContainer && (
      <div className="bg-[#141414] z-[40] flex items-center justify-center flex-col min-h-screen absolute top-0 right-0 left-0">
        <span className="absolute top-[40px] right-[40px] text-white cursor-pointer" onClick={()=> setShowPinContainer({
            ...showPinContainer,
            show: false
        })}>
          <RxCross2 />
        </span>
        <h1 className="text-gray-400 font-bold text-[16px] mb-4">
          Profile Lock is currently ON
        </h1>
        {pinError ? (
          <h2 className="text-[#e6b209] font-bold text-[30px]">
            Whoops, wrong PIN. Please try again
          </h2>
        ) : (
          <h2 className="text-white font-bold text-[30px]">
            Enter your PIN to access this profile
          </h2>
        )}
        <PinInput
          length={4}
          initialValue={pin}
          onChange={(value, index) => setPin(value)}
          secret
          secretDelay={100}
          type="numeric"
          inputMode="number"
          style={{ padding: "20px", display: "flex", gap: "10px" }}
          inputStyle={{
            borderColor: "white",
            height: "70px",
            width: "70px",
            fontSize: "40px",
          }}
          inputFocusStyle={{ borderColor: "white" }}
          onComplete={(value, index) => handleLoginPin(value, index)}
          autoSelect={true}
        />
      </div>
    )
  );
}
