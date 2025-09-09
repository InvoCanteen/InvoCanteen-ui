"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAllunpaidcart, getAllpaidcart, getOrderbyid } from "@/lib/api";

import Navbar from "@/components/navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight, Clock, CheckCircle2, Printer } from "lucide-react";

type Invoice = {
  id: number;
  number: string;
  customerName: string;
  date: string;
  total: number;
  status: string;
  updatedAt : string;
};

function formatWIBDate(iso?: string) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    weekday: "short",      
    day: "2-digit",
    month: "short",        
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID").format(n);
}

function SectionHeader({
  title,
  count,
}: {
  title: string;
  count: number;
}) {
  return (
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Badge variant="secondary" className="rounded-full">
        {count}
      </Badge>
    </div>
  );
}

function InvoiceList({ items }: { items: Invoice[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-sm text-gray-500">
        Belum ada invoice di kategori ini.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {items.map((inv) => (
        <div
          key={inv.id}
          className="border rounded-xl p-2 shadow-sm bg-white/70 hover:shadow-md transition"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">{inv.number}</p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">
                  {formatWIBDate(inv.updatedAt || inv.date)}
                </p>
              </div>
              
            </div>
            {inv.status === "PAID" ? (
              <Badge className="gap-1 bg-green-600 hover:bg-green-600">
                <CheckCircle2 size={14} /> Paid
              </Badge>
            ) : (
              <Badge className="gap-1 bg-yellow-500 hover:bg-yellow-500">
                <Clock size={14} /> Unpaid
              </Badge>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-gray-600">Customer Name :</p>
            <p className="text-xs">{inv.customerName}</p>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-gray-600">Total</p>
            <p className="text-xs">Rp. {formatIDR(inv.total)}</p>
          </div>

          <div className="mt-4 flex flex-row items-center justify-end gap-2">
           <div>
              <Button
                variant="outline"
                size="sm"
                className="h-6 px-2 gap-1 text-xs"
              >
                <SquareArrowOutUpRight size={12} />
                Detail
              </Button>
            </div>

            <div>
              <Button
                asChild
                size="sm"
                className="h-6 px-2 gap-1 text-xs"
                style={{ backgroundColor: "var(--color-bluebutton)" }}
              >
                <a
                  href={`/invoice/print/${inv.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Printer size={12} />
                  Print
                </a>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function InvoicePage() {
  const [paid, setPaid] = useState<any[]>([]);

  useEffect(() => {
    getAllpaidcart().then((res) => {
      if (res && res.data) {
        const mappedPaid = res.data.map((item: any) => ({
          id: item.id,
          number: item.number || `INVOICE-${item.id}`,
          customerName: item.customerName,
          date: item.updatedAt || item.createdAt,
          total: Number(item.total),
          status: item.payStatus,
          updatedAt: item.updatedAt,
        }));
        setPaid(mappedPaid);
      }
    });
  }, []);

  return (
    <div className="flex min-h-screen">
      <Navbar />

      <main className="pl-[var(--sidebar-w)] transition-[padding] duration-200 w-full">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="mb-2">
            <h1 className="text-2xl font-bold">Invoice</h1>
            <p className="text-sm text-gray-600">
              Kelola dan pantau status invoice kamu di sini.
            </p>
          </div>

          <Tabs defaultValue="paid" className="w-full">
            <TabsList className="mb-2">
              <TabsTrigger value="paid">
                Paid ({paid.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="paid" className="space-y-2">
              <SectionHeader title="Paid" count={paid.length} />
              <InvoiceList items={paid} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
