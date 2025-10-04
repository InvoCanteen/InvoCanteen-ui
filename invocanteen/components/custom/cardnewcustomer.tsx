"use client";

import * as React from "react"
import { useEffect, useState } from "react";

import { createNewcart, createNewnameoncart } from "@/lib/api";

import { X } from "lucide-react";
import { Input } from "../ui/input";

import { toast } from "sonner";

interface CardNewcustomerProps {
  onClose: () => void;
  setCustomerName: (name: string) => void;
  customerNo: number;
  setCustomerNo: (no: number) => void;
  clearItems: () => void;
}

export default function CardNewcustomer({ onClose, setCustomerName, customerNo, setCustomerNo, clearItems }: CardNewcustomerProps) {

  const [name, setName] = React.useState("");

  // React.useEffect(() => {
  //   setCustomerNo(customerNo + 1);
  // }, []);

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
              color: "var(--color-redwarning)"
            }} >*</span>
          </p>
          <Input
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              color: "var(--color-blackclear)"
            }}
          />
        </div>

        <div className="mt-4 w-full">
          <button
            onClick={async () => {
              try {
                const cart = await createNewcart();

                setCustomerNo(cart.id);

                await createNewnameoncart(cart.id, name);

                setCustomerName(name);
                clearItems();

                toast.success("Customer Success Added!");

                onClose();

              } catch (error) {
                toast.error("Failed to added costumerr!");
              }
            }}
            className="btn-bluebutton w-full px-4 py-2 text-sm border rounded-full"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
