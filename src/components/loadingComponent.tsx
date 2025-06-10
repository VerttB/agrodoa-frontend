import { Tailspin } from "ldrs/react";
import 'ldrs/react/Tailspin.css'


export const LoadingSpin = () => {
return (
    <div className="min-h-screen w-full flex justify-center items-center">

      <Tailspin
        size="40"
        stroke="5"
        speed="0.9"
        color="orange" 
      />
  
  </div>
);
}