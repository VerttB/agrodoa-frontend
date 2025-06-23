import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";

export const LoadingSpin = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Tailspin size="40" stroke="5" speed="0.9" color="orange" />
    </div>
  );
};
