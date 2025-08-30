import Navbar from "@/components/navbar";

export default function InvoicePage() {
  return (
    <div className="flex min-h-screen">
      <Navbar />

      <main className="pl-[var(--sidebar-w)] transition-[padding] duration-200">
        <h1 className="text-2xl font-bold">Invoice</h1>
        <p className="text-sm text-gray-600">
          Ini adalah invoice.
        </p>
      </main>
    </div>
  );
}