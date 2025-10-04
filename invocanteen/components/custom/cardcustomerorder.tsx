"use client";

import * as React from "react"
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { X, CreditCard, Printer, SquareArrowOutUpRight } from "lucide-react";

interface CardCustomerorderProps {
  onClose: () => void;
  setCustomerName: (name: string) => void;
  customerNo: number;
  setCustomerNo: (no: number) => void;
}

import CardNewpayment from "@/components/custom/cardnewpayment";
import CardDeleteorder from "@/components/custom/carddeleteorder";

import { getAllunpaidcart, addConfirmorder } from "@/lib/api";

export default function CardCustomerorder({ onClose }: CardCustomerorderProps) {

    const router = useRouter();
    
    const [showNewpayments, setNewpayments] = React.useState(false);
    const [showDeleteorder, setDeleteorder] = React.useState(false);

    const [orders, setOrders] = useState<any[]>([]);

    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    useEffect(() => {
        getAllunpaidcart().then((res) => {
        if (res && res.data) setOrders(res.data);
        });
    }, []);

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
                Unpaid Orders
            </h2>

            <hr className="border-b border-[0.5px] mb-4" 
                style={{ borderColor: "var(--color-grayclear)" }}
            />

            {/* Grid card orders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto">
          {orders.map((order) => (
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
                        <p className="text-gray-600">Price : Rp. {order.total}</p>
                        <p className="text-gray-600">Customer : {order.customerName}</p>
                        <p className="text-gray-600">Status : 
                            <span className="text-red-600 font-semibold">{order.payStatus}</span>
                        </p>
                    </div>
                    <div>
                        <button className="flex items-center gap-1 text-white text-xs py-1 rounded justify-between">
                            <SquareArrowOutUpRight className="text-yellow-500" size={14} />
                        </button>
                    </div>
            </div>
              {/* Actions */}
              <div className="flex gap-2 mt-auto">
                <button className="flex-[1] flex items-center justify-center gap-1 bg-blue-500 text-white text-xs py-1 rounded hover:bg-blue-600">
                  <Printer size={14} />
                </button>
                <button onClick={() => {
                    setSelectedOrder(order);
                    setNewpayments(true);
                  }} className="flex-[3] flex items-center justify-center gap-1 bg-green-500 text-white text-xs py-1 rounded hover:bg-green-600">
                  <CreditCard size={14} /> Pay Now
                </button>
                </div>
                </div>
            ))}
            </div>
        </div>
        {showNewpayments && selectedOrder && (
          <CardNewpayment
            onClose={() => setNewpayments(false)}
            totalwithtax={Number(selectedOrder.total) + Number(selectedOrder.tax)}
            customername={selectedOrder.customerName}
            customerNo={selectedOrder.id}
            cartId={selectedOrder.id}
            items={selectedOrder.items || []}
            clearItems={() => {}}
            clearCustomer={() => {}}
          />
        )}
        {showDeleteorder && <CardDeleteorder onClose={() => setDeleteorder(false)} />}
    </div>
  );
}
