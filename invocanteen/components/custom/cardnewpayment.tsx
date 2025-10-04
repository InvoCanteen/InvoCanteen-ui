"use client";

import * as React from "react"

import { X } from "lucide-react";

import { useMemo, useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

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

import { addConfirmorder, addNewproductoncart } from "@/lib/api";

interface CardPaymentProps {
  onClose: () => void;
  totalwithtax: number;
  customername: string;
  customerNo: number;
  cartId: number;
  items: { id: number; qty: number }[];
  clearItems: () => void;
  clearCustomer: () => void;
}

export default function CardNewpayment({ onClose, totalwithtax, customername, customerNo,items, clearItems, clearCustomer }: CardPaymentProps) {
  
  const [showPrintreceipt, setPrintreceipt] = React.useState(false);

  const [tendered, setTendered] = useState<string>("");

  const [idparamsinvoice, setIdparamsinvoice] = useState<number | null>(null);

  const cartId = customerNo;

  // const change = Math.max(0, Number(tendered || "0") - totalwithtax);
  const [change, setChange] = useState(0);

  useEffect(() => {
    setChange(Math.max(0, Number(tendered || "0") - totalwithtax));
  }, [tendered, totalwithtax]);

  function formatIDR(n: number | string) {
    return Number(n).toLocaleString("id-ID");
  }

  const addtocart = async () => {

    console.log("Isi items :", items);

    if (!items.length) {
      toast.error("Cart tidak boleh kosong!");
      return;
    }
    try {
      for (const it of items) {
        await addNewproductoncart(customerNo, it.id, it.qty);
      }
      toast.success("Cart berhasil di-hold!");
      clearItems();
      clearCustomer();
      setTimeout(() => {
        console.log({ customername });
      }, 0);
    } catch (error) {
    }
  };

  const handleConfirmPayment = async () => {
    if (Number(tendered) < totalwithtax) {
      toast.error("Nilai harus lebih tinggi dari TotalPrice");
      return;
    }
    try {
      const body = { cartId };
      console.log("Body yang dikirim ke API:", body);
      console.log("customerNo yang dikirim ke API:", cartId);
      const res = await addConfirmorder(cartId);
      if (res?.success) {
        setIdparamsinvoice(res.data.id);
        toast.success("Order berhasil dikonfirmasi!");
        setPrintreceipt(true);
      } else {
        toast.error("Gagal konfirmasi order 1!");
      }
    } catch (error) {
      toast.error("Gagal konfirmasi order 2!");
    }
  };

  const handlePaymentProcess = async () => {
    console.log("Isi items :", items);
    if (!items.length) {
      toast.error("Item kosong!");
      await addtocart();
      await handleConfirmPayment();
    } else {
      await addtocart();
      await handleConfirmPayment();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 btn-closebutton"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-black mb-4">Payment</h2>
        
        <hr className="border-b border-[0.5px] mb-4" 
                style={{ borderColor: "var(--color-grayclear)" }}
            />

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
                }}>Total Price :
              </div>
              <div className="flex-1 px-3 py-2 w-56">
                <Input
                  readOnly
                  value={"Rp " + formatIDR(totalwithtax)}
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
                  type="text"
                  value={tendered ? formatIDR(Number(tendered)) : ""}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, ""); 
                    const cleaned = raw.replace(/^0+(?=\d)/, "");
                    setTendered(cleaned);
                  }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className=""
                  style={{
                    color: "var(--color-blackclear)",
                    backgroundColor: "var(--color-whiteclear)",
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
                  value={"Rp. " + formatIDR(change)}
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
            onClick={handlePaymentProcess}
            className="btn-bluebutton w-full px-4 py-2 text-sm border rounded-full"
          >
            Confirm Payment
          </button>
        </div>
      </div>
      {showPrintreceipt && <CardPrintreceipt
        onClose={() => setPrintreceipt(false)}
        order={{ id: customerNo }}
        totalwithtax={totalwithtax}
        customername={customername}
        customerNo={customerNo}
        change={change}
        tendered={Number(tendered)}
        idparamsinvoice={idparamsinvoice}
        clearItems={clearItems}
        clearCustomer={clearCustomer}
        clearCustomerno={() => {}}
      />}
    </div>
  );
}
