"use client";

import * as React from "react"

import { X, Trash2, CreditCard, Printer, SquareArrowOutUpRight } from "lucide-react";

interface CardOnholdorderProps {
  onClose: () => void;
}

import CardNewpayment from "@/components/custom/cardnewpayment";

const onHoldOrders = [
  { id: "123123191", price: 7000, items: 5, customer: "Walk in" },
  { id: "2200302", price: 3000, items: 2, customer: "John" },
  { id: "330030", price: 8500, items: 5, customer: "Walk in" },
  { id: "8080993", price: 12000, items: 7, customer: "Walk in" },
  { id: "2300203", price: 1500, items: 3, customer: "Walk in" },
  { id: "33435523", price: 2500, items: 3, customer: "Walk in" },
  { id: "2435763", price: 3000, items: 8, customer: "Walk in" },
  { id: "78567456", price: 7000, items: 8, customer: "Walk in" },
  { id: "6653325", price: 7000, items: 8, customer: "Walk in" },
  { id: "23143535", price: 7000, items: 8, customer: "Walk in" },
  { id: "98008967", price: 7000, items: 8, customer: "Walk in" },
  { id: "23564783", price: 7000, items: 8, customer: "Walk in" },
];

export default function CardOnholdorder({ onClose }: CardOnholdorderProps) {

    const [showNewpayments, setNewpayments] = React.useState(false);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-[800px] relative">
            {/* Close button */}
            <button
            onClick={onClose}
            className="absolute top-2 right-2 btn-closebutton"
            >
            <X size={20} />
            </button>

            <h2 className="text-xl font-semibold text-black mb-4">
                On Hold Orders
            </h2>

            <hr className="border-b border-[0.5px] mb-4" 
                style={{ borderColor: "var(--color-grayclear)" }}
            />

            {/* Grid card orders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto">
                {onHoldOrders.map((order) => (
                    <div
                        key={order.id}
                        className="border rounded-lg p-3 shadow-sm flex flex-col justify-between text-sm"
                    >
                        <div className="mb-2 flex items-start justify-between">
                            <div className="flex flex-col">
                                <p className="text-gray-600">
                                Ref #:{" "}
                                <span className="text-blue-600 font-semibold">
                                    {order.id}
                                </span>
                                </p>
                                <p className="text-gray-600">Price : Rp. {order.price}</p>
                                <p className="text-gray-600">Items : {order.items}</p>
                                <p className="text-gray-600">Customer : {order.customer}</p>
                            </div>
                            <div>
                                <button className="flex items-center gap-1 text-white text-xs py-1 rounded justify-between">
                                <SquareArrowOutUpRight className="text-yellow-500" size={14} />
                            </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-auto">
                            <button className="flex-[1] flex items-center justify-center gap-1 bg-red-500 text-white text-xs py-1 rounded hover:bg-red-600">
                                <Trash2 size={14} />
                            </button>

                            <button className="flex-[1] flex items-center justify-center gap-1 bg-blue-500 text-white text-xs py-1 rounded hover:bg-blue-600">
                                <Printer size={14} />
                            </button>
                            
                            <button onClick={() => setNewpayments(true)} className="flex-[3] flex items-center justify-center gap-1 bg-green-500 text-white text-xs py-1 rounded hover:bg-green-600">
                                <CreditCard size={14} /> Pay Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {showNewpayments && <CardNewpayment onClose={() => setNewpayments(false)} />}
    </div>
  );
}
