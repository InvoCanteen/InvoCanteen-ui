"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOrderbyid } from "@/lib/api";

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID").format(Number(n));
}

export default function PrintInvoicePage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getOrderbyid(Number(id)).then((res) => {
        if (res?.success) setOrder(res.data);
      });
    }
  }, [id]);

  useEffect(() => {
    if (order) {
      setTimeout(() => window.print(), 500);
    }
  }, [order]);

  if (!order) return <div>Loading...</div>;

  const items =
    order.items?.map((it: any) => ({
      name: it.product.name,
      qty: it.quantity,
      price: Number(it.price),
    })) || [];

  const subtotal = Number(order.subtotal);
  const tax = Number(order.tax);
  const total = Number(order.total);

  const today = new Date(order.updatedAt || order.createdAt).toLocaleDateString("id-ID");

  return (
    <div style={{ width: 800, margin: "0 auto", padding: 32, background: "#fff", color: "#111827" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img src="/invocanteen-icon-black-long.png" style={{ width: 140, objectFit: "contain" }} alt="Logo" />
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Dumbways Depok</div>
          <div style={{ fontSize: 10, color: "#6B7280" }}>Ruko Citra Lake Sawangan</div>
          <div style={{ fontSize: 10, color: "#6B7280" }}>Blok D-01. 15, Jl. Cinangka Raya</div>
          <div style={{ fontSize: 10, color: "#6B7280" }}>Telp: 0811-1513-388</div>
        </div>
      </div>

      <div style={{ margin: "24px 0 12px 0", borderBottom: "1px solid #E5E7EB", paddingBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Invoice {order.id}</div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#000000" }}>Tanggal : {today}</div>
            <div style={{ color: "#000000" }}>Customer : {order.customerName}</div>
          </div>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
        <thead>
          <tr style={{ background: "#F3F4F6" }}>
            <th style={{ textAlign: "left", padding: 8, border: "1px solid #E5E7EB" }}>Item</th>
            <th style={{ textAlign: "center", padding: 8, border: "1px solid #E5E7EB" }}>Qty</th>
            <th style={{ textAlign: "right", padding: 8, border: "1px solid #E5E7EB" }}>Harga</th>
            <th style={{ textAlign: "right", padding: 8, border: "1px solid #E5E7EB" }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it : any, idx : any) => (
            <tr key={idx}>
              <td style={{ padding: 8, border: "1px solid #E5E7EB" }}>{it.name}</td>
              <td style={{ textAlign: "center", padding: 8, border: "1px solid #E5E7EB" }}>{it.qty}</td>
              <td style={{ textAlign: "right", padding: 8, border: "1px solid #E5E7EB" }}>Rp {formatIDR(it.price)}</td>
              <td style={{ textAlign: "right", padding: 8, border: "1px solid #E5E7EB" }}>Rp {formatIDR(it.qty * it.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 24, textAlign: "right" }}>
        <div>Subtotal : Rp {formatIDR(subtotal)}</div>
        <div>Tax : Rp {formatIDR(tax)}</div>
        <div style={{ fontWeight: "bold" }}>Total Price : Rp {formatIDR(total)}</div>
      </div>
    </div>
  );
}