"use client";

import * as React from "react"
import { useEffect, useState } from "react";

import { X, Trash2, CreditCard, Printer, SquareArrowOutUpRight } from "lucide-react";

import { deleteCartbyid } from "@/lib/api";
import { toast } from "sonner";


interface CardOnholdorderProps {
  onClose: () => void;
  clearCustomer: () => void;
  setItems: (items: ItemProductsSidebar[]) => void;
  setCustomerName: (name: string) => void;
  setCustomerNo: (no: number) => void;
}

import CardNewpayment from "@/components/custom/cardnewpayment";
import { getAllcart, getCartbyid } from "@/lib/api";
import { ItemProductsSidebar } from "@/types/product";

export default function CardOnholdorder({ onClose, clearCustomer, setItems, setCustomerName, setCustomerNo }: CardOnholdorderProps) {

    const [orders, setOrders] = useState<any[]>([]);

    // const [showNewpayments, setNewpayments] = React.useState(false);

    useEffect(() => {
        getAllcart().then((data) => {
            setOrders(data);
        });
    }, []);

    const handleDelete = async (orderId: number) => {
        try {
            const res = await deleteCartbyid(orderId);
            console.log("customerNo:", orderId);
            if (res?.success) {
            toast.success("Customer dan order berhasil dihapus!");
            clearCustomer();
            onClose();
            } else {
            toast.error("Gagal menghapus customer!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Gagal menghapus customer!");
        }
    };

    const handleEdit = async (orderId: number) => {
        try {
            const cart = await getCartbyid(orderId);
            const newItems = cart.items.map((item: any) => ({
            id: item.productId,
            name: item.product?.name ?? "",
            qty: item.quantity,
            price: Number(item.product?.price ?? item.price),
            imageProduct: item.product?.imageProduct,
            }));
            setItems(newItems);
            setCustomerName(cart.customerName);
            setCustomerNo(cart.id); 
            onClose();
            toast.success("Order berhasil dimunculkan di sidebar!");
        } catch (error) {
            toast.error("Gagal mengambil data cart!");
            console.error(error);
        }
    };

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
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="border rounded-lg p-3 shadow-sm flex flex-col justify-between text-sm"
                    >
                        <div className="mb-2 flex items-start justify-between">
                            <div className="flex flex-col">
                                <p className="text-gray-600">
                                Ref #{""}
                                <span className="text-blue-600 font-semibold">
                                    {order.id}
                                </span>
                                </p>
                                <p className="text-gray-600">Price : Rp. {order.total}</p>
                                <p className="text-gray-600">Customer : {order.customerName}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-auto">
                            <button
                                onClick={() => handleDelete(order.id)}
                                className="flex-[1] flex items-center justify-center gap-1 bg-red-500 text-white text-xs py-1 rounded hover:bg-red-600"
                            >
                                <Trash2 size={14} />
                        </button>
                            
                            <button onClick={() => handleEdit(order.id)} className="flex-[3] flex items-center justify-center gap-1 btn-bluebutton text-white text-xs py-1 rounded ">
                                <CreditCard size={14} /> Edit Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {/* {showNewpayments && <CardNewpayment onClose={() => setNewpayments(false)} />} */}
    </div>
  );
}
