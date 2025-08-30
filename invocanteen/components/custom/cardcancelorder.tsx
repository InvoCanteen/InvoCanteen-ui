"use client";

import { X } from "lucide-react";

import Lottie  from "lottie-react";
import warninglottie from "@/app/src/lottie/warning-lottie2.json";

interface CardCancelorderProps {
  onClose: () => void;
}

export default function CardCancelorder({ onClose }: CardCancelorderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] relative">

        <button
          onClick={onClose}
          className="absolute top-2 right-2 btn-closebutton"
        >
          <X size={20} />
        </button>

        <div className = "flex justify-center items-center -mt-4 p-2">
          <Lottie 
            animationData={warninglottie} 
            loop={true}
            style={{ width: 180, height: 180 }}
          />
        </div>


        <h1 className="text-3xl mb-2 -mt-6 text-center"
          style={{ color: "var(--color-blackclear)" }}
          >Cancel Order</h1>

        <div className="flex flex-col text-sm mb-4">
          <p className="text-center"
            style={{ 
              color:"var(--color-graystandard)" 
            }}>
            All items in the cart will be removed.
          </p>

          <p className="text-center"
            style={{ 
              color:"var(--color-graystandard)" 
            }}>
            Are you sure you want to proceed?
          </p>
          
        </div>

        <div className="mt-4 flex flex-row gap-4 pl-4 pr-4">
          <button
            onClick={onClose}
            className="btn-greenbutton w-full px-4 py-2 text-sm border rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="btn-redbutton w-full px-4 py-2 text-sm border rounded-xl"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
