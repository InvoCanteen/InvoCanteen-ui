"use client";

import * as React from "react"
import { useEffect, useState } from "react";

import { Check, ChevronDown, Search, X, Banknote, Hand, CircleMinus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
const chooseplace = [
  {
    value: "takeaway",
    label: "Takeaway",
  },
  {
    value: "walkincostumer",
    label: "Walk-in Costumer",
  },
]

import { ItemProductsSidebar } from "@/types/product";

interface SidebarproductsProps {
  items: ItemProductsSidebar[];
  setItems: React.Dispatch<React.SetStateAction<ItemProductsSidebar[]>>;
  customerName: string;
  customerNo: number;
  setCustomerName: (name: string) => void;
  setCustomerNo: (no: number) => void;
  clearItems: () => void; 
}

// const initialItems: ItemProductsSidebar[] = [
//   { id: 1, name: "Hotdog", qty: 1, price: 10000 },
//   { id: 2, name: "Coca Cola", qty: 2, price: 7000  },
//   { id: 3, name: "Burger", qty: 1, price: 15000 },
//   { id: 4, name: "Kebab", qty: 2, price: 8000  },
//   { id: 5, name: "Meatballs", qty: 1, price: 15000 },
//   { id: 6, name: "French Fries", qty: 2, price: 8000  },
// ];

import CardNewcustomer from "@/components/custom/cardnewcustomer";
import CardNewpayment from "@/components/custom/cardnewpayment";
import CardCancelorder from "@/components/custom/cardcancelorder";

import { getAllcart } from "@/lib/api";

export default function Sidebarproducts({
  items,
  setItems,
  customerName,
  customerNo,
  setCustomerName,
  setCustomerNo,
  clearItems,
}: SidebarproductsProps) {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const [showNewcustomer, setNewcustomer] = React.useState(false);
    const [showNewpayments, setNewpayments] = React.useState(false);
    const [showCancelOrder, setCancelOrder] = React.useState(false);

    const refId = "#12345"
    const totalItem = items.reduce((sum, it) => sum + it.qty, 0);
    const serviceCharge = "10%"
    const priceGross = "550000"

    const updateQty = (id: number, qty: number) => {
        setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, qty: Math.max(0, qty) } : it)).filter((it) => it.qty > 0)
        );
    };

    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((it) => it.id !== id));
    };

    const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

    return (
        <aside
            className="h-screen
            bg-white
            text-white      
            transition-all
            duration-200
            flex flex-col
            border-r
            w-[280px]"
        >
            <div className="flex flex-col justify-between">

                <div className="flex flex-col gap-4 p-2 pb-8">
                    <div className="flex flex-row gap-2">

                        <div className="flex flex-col w-[220px]">
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full justify-between"
                                        style={{ 
                                            backgroundColor: "var(--color-graypopoverbg)", 
                                            color:"var(--color-graypopovertext)" 
                                        }}
                                    >
                                        {value
                                            ? chooseplace.find((chooseplace) => chooseplace.value === value)?.label
                                            : "Choose Place..."}
                                        <ChevronDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0 w-full">
                                    <Command className="">
                                    <CommandInput placeholder="Search place..." className="h-8" />
                                    <CommandList>
                                        <CommandEmpty>No place found.</CommandEmpty>
                                        <CommandGroup className="w-[260px]">
                                            {chooseplace.map((chooseplace) => (
                                                <CommandItem
                                                key={chooseplace.value}
                                                value={chooseplace.value}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue === value ? "" : currentValue)
                                                    setOpen(false)
                                                }}
                                                className="text-black"
                                                >
                                                {chooseplace.label}
                                                <Check
                                                    className={cn(
                                                    "ml-auto",
                                                    value === chooseplace.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex flex-col">
                            <button onClick={() => setNewcustomer(true)}
                                className="p-2 rounded py-2 px-2 btn-greenbutton"
                            >
                                <Plus className="h-4 w-8" />
                            </button>
                        </div>

                    </div>

                    <div className="flex flex-row gap-2 -mt-2">
                        <Input
                            placeholder="Search products..."
                        />

                        <button className="btn-bluebutton rounded p-1">
                            <Search className="h-4 w-8" />
                        </button>

                    </div>

                    <p className="text-sm">
                        <span className="text-black">Reference :</span>{" "}
                        <span className="text-blue-500">{refId}</span>
                    </p>

                    {customerName && (
                        <p className="text-sm -mt-2">
                            <span className="text-black">Name :</span>{" "}
                            <span className="text-blue-500">{customerName}</span>
                        </p>
                    )}
                    {customerName && (
                        <p className="text-sm -mt-2">
                            <span className="text-black">No :</span>{" "}
                            <span className="text-blue-500">{customerNo}</span>
                        </p>
                    )}

                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50"
                            style={{
                                        color:"var(--color-blackclear)"
                                    }}>
                            <tr className="text-left text-xs">
                                <th className="w-6 px-2 py-2 text-xs font-medium">#</th>
                                <th className="px-2 py-2 text-xs font-medium">Name</th>
                                <th className="w-20 px-2 py-2 text-xs font-medium text-center">Qty</th>
                                <th className="w-16 px-2 py-2 text-xs font-medium text-right">Price</th>
                                <th className="w-8 px-1 py-2"></th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {items.map((it, idx) => (
                                <tr key={it.id} className="text-xs">
                                <td className="px-2 py-2 text-gray-600 text-xs"
                                style={{
                                        color:"var(--color-blackclear)"
                                    }}>{idx + 1}</td>
                                <td className="px-2 py-2 text-xs"
                                style={{
                                        color:"var(--color-blackclear)"
                                    }}>{it.name}</td>
                                <td className="px-2 py-2 text-xs"
                                style={{
                                        color:"var(--color-blackclear)"
                                    }}>
                                    <input
                                    type="number"
                                    min={0}
                                    value={it.qty}
                                    onChange={(e) => updateQty(it.id, Number(e.target.value))}
                                    className="h-8 w-14 rounded-md border border-gray-300 bg-white text-center text-sm outline-none focus:border-blue-400"
                                    />
                                </td>
                                <td className="px-2 py-2 text-right tabular-nums text-xs"
                                style={{
                                        color:"var(--color-blackclear)"
                                    }}>{it.price * it.qty}</td>
                                <td className="px-1 py-2">
                                    <button
                                    onClick={() => removeItem(it.id)}
                                    className="grid h-7 w-7 place-items-center rounded bg-red-600 text-white hover:bg-red-500"
                                    aria-label={`Remove ${it.name}`}
                                    title="Remove"
                                    >
                                    <X size={14} />
                                    </button>
                                </td>
                                </tr>
                            ))}
                            {items.length === 0 && (
                                <tr>
                                <td colSpan={5} className="px-2 py-4 text-center text-gray-500 text-sm">
                                    <img
                                        src="/emptycart.png"
                                        alt="No items"
                                        className="w-[100px] h-[100px] object-cover rounded justify-center items-center mx-auto"
                                    />
                                </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex flex-row p-2 justify-between">

                    {/* Kiri */}
                    <div className="flex flex-col p-2">
                        <div className="flex flex-row pb-2">
                            <p className="text-xs" style={{
                                        color:"var(--color-blackclear)"
                                    }}>
                                Total item(s) : {totalItem}
                            </p>
                        </div>

                        <div className="flex flex-row gap-2 items-center pb-2">
                            <p className="text-xs" style={{
                                        color:"var(--color-blackclear)"
                                    }}>
                                Discount :
                            </p>
                            <Input
                                placeholder="Disc%"
                                className="w-20 h-6 placeholder:text-xs"
                            />
                        </div>

                        <div className="flex flex-row pb-2">
                            <p className="text-xs" style={{
                                        color:"var(--color-blackclear)"
                                    }}>
                                Service Charge : {serviceCharge}
                            </p>
                        </div>

                        <div className="flex flex-row pb-2">
                            <p className="text-xs" style={{
                                        color:"var(--color-blackclear)"
                                    }}>
                                Gross Price : Rp. {priceGross}
                            </p>
                        </div>

                        {/* Total (text-sm juga) */}
                        <div className="flex text-sm text-gray-700"
                            style={{
                                    color:"var(--color-pinkbright)"
                                    }}>
                            <div className="space-x-2">
                                <span>Total:</span>
                                <span className="font-semibold">Rp. {total}</span>
                            </div>
                        </div>
                    </div>

                    {/* Kanan */}
                    <div className="flex flex-col p-2">
                        <button onClick={() => setNewpayments(true)}
                            className="btn-greenbutton flex items-center justify-center gap-2 rounded h-8 w-20 text-xs mb-3">
                            <Banknote className="h-4 w-4" />
                            <span className="text-xs">Pay Now</span>
                        </button>

                        <button className="btn-yellowbutton flex items-center justify-center gap-2 rounded h-8 w-20 text-xs mb-3">
                            <Hand className="h-4 w-4" />
                            <span className="text-xs">Hold</span>
                        </button>

                        <button onClick={() => setCancelOrder(true)} className="btn-redbutton flex items-center justify-center gap-2 rounded h-8 w-20 text-xs">
                            <CircleMinus className="h-4 w-4" />
                            <span className="text-xs">Cancel</span>
                        </button>
                    </div>

                </div>

            </div>
            {showNewcustomer && (
                <CardNewcustomer
                    onClose={() => setNewcustomer(false)}
                    setCustomerName={setCustomerName}
                    customerNo={customerNo}
                    setCustomerNo={setCustomerNo}
                    clearItems={() => setItems([])}
                />
            )}
            {showNewpayments && <CardNewpayment onClose={() => setNewcustomer(false)} />}
            {showCancelOrder && (<CardCancelorder onClose={() => setCancelOrder(false)} clearItems={() => setItems([])}/>)}
        </aside>
    );
}
