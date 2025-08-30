"use client";

import * as React from "react"

import { X } from "lucide-react";

import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import CardPrintreceipt from "./cardprintreceipt";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  }
]


interface CardPaymentProps {
  onClose: () => void;
}

export default function CardNewpayment({ onClose }: CardPaymentProps) {
  
  const [showPrintreceipt, setPrintreceipt] = React.useState(false);

  const [tendered, setTendered] = useState<number>(60000);
  const total = 54000;
  const change = Math.max(0, tendered - total);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] relative">

        <button
          onClick={onClose}
          className="absolute top-2 right-2 btn-closebutton"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl text-black mb-4">Payment</h2>

        <div className="flex flex-row gap-2 pt-4 pb-4">
          {/* Tabs kiri */}
          <Tabs defaultValue="cash" className="flex flex-row w-full pt-6 pb-6">
            <TabsList className="flex flex-col w-42 items-start">
              <TabsTrigger value="cash" className="w-full justify-start p-2 border border-[var(--color-graypopovertext)] data-[state=active]:bg-[var(--color-greenmediumbright)] data-[state=active]:text-[var(--color-pinkverybright)]">
                Cash
              </TabsTrigger>
              <TabsTrigger value="check" className="w-full justify-start p-2 border border-[var(--color-graypopovertext)] data-[state=active]:bg-[var(--color-greenmediumbright)] data-[state=active]:text-[var(--color-pinkverybright)]">
                Check
              </TabsTrigger>
              <TabsTrigger value="card" className="w-full justify-start p-2 border border-[var(--color-graypopovertext)] data-[state=active]:bg-[var(--color-greenmediumbright)] data-[state=active]:text-[var(--color-pinkverybright)]">
                Card
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col w-full gap-2 -mt-4">
             {/* Total Price */}
            <div className="flex border border-circle"
              style={{ 
                backgroundColor: "var(--color-graypopovertext)",
              }}>
              <div className="w-40 px-3 py-4 font-medium" 
                style={{ 
                color:"var(--color-blackclear)"
                }}>Total Price :</div>
              <div className="flex-1 px-3 py-2 w-56">
                <Input
                  readOnly
                  value={"Rp. " + total}
                  className=""
                  style={{ 
                    color:"var(--color-blackclear)",
                    backgroundColor: "var(--color-graypopovertext)",
                    borderColor: "var(--color-grayclear)"
                  }}
                />
              </div>
            </div>

            <div className="flex border border-circle"
              style={{ 
                backgroundColor: "var(--color-graypopovertext)",
              }}>
              <div className="w-40 px-3 py-4 font-medium" 
                style={{ 
                color:"var(--color-blackclear)" 
                }}>Cash Tendered :</div>
              <div className="flex-1 px-3 py-2 w-56">
                <Input
                  type="number"
                  value={tendered}
                  onChange={(e) => setTendered(Number(e.target.value))}
                  className=""
                  style={{ 
                    color:"var(--color-blackclear)",
                    backgroundColor: "var(--color-whiteclear)"
                  }}
                />
              </div>
            </div>

            <div className="flex border border-circle"
              style={{ 
                backgroundColor: "var(--color-graypopovertext)",
              }}>
              <div className="w-40 px-3 py-4 font-medium" 
                style={{ 
                color:"var(--color-blackclear)" 
                }}>Change :</div>
              <div className="flex-1 px-3 py-2 w-56">
                <Input
                  readOnly
                  value={"Rp. " + total}
                  className=""
                  style={{ 
                    color:"var(--color-blackclear)",
                    backgroundColor: "var(--color-graypopovertext)",
                    borderColor: "var(--color-grayclear)"
                  }}
                />
              </div>
            </div>

          </div>
        </div>

        <div className="mt-4 w-full">
          <button
            onClick={() => setPrintreceipt(true)}
            className="btn-bluebutton w-full px-4 py-2 text-sm border rounded-full"
          >
            Confirm Payment
          </button>
        </div>
      </div>
      {showPrintreceipt && <CardPrintreceipt onClose={() => setPrintreceipt(false)} />}
    </div>
  );
}
