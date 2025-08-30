"use client";

import { X } from "lucide-react";
import { Input } from "../ui/input";

interface CardNewcustomerProps {
  onClose: () => void;
}

export default function CardNewcustomer({ onClose }: CardNewcustomerProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] relative">

        <button
          onClick={onClose}
          className="absolute top-2 right-2 btn-closebutton"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl text-black mb-4">New Customer</h2>
        <hr className="border-b border-[0.5px] mb-4" 
          style={{ borderColor: "var(--color-grayclear)" }}
        />

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold text-black">Customer Name</span>
            <span style={{ 
                color: "var(--color-redwarning)" }} >*</span>
          </p>
          <Input placeholder="Full Name" />

          <p>
            <span className="font-semibold text-black">Customer Phone Number</span>
            <span style={{ 
                color: "var(--color-redwarning)" }} >*</span>
          </p>
          <Input placeholder="Phone Number" />

          <p>
            <span className="font-semibold text-black">Customer Email</span>
            <span style={{ 
                color: "var(--color-redwarning)" }} >*</span>
          </p>
          <Input placeholder="Email" />

          <p>
            <span className="font-semibold text-black">Customer Address</span>
            <span style={{ 
                color: "var(--color-redwarning)" }} >*</span>
          </p>
          <Input placeholder="Address" />
        </div>

        <div className="mt-4 w-full">
          <button
            onClick={onClose}
            className="btn-bluebutton w-full px-4 py-2 text-sm border rounded-full"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
