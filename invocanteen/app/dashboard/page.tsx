import Navbar from "@/components/navbar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Navbar />

      <main className="pl-[var(--sidebar-w)] transition-[padding] duration-200">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-600">
          Ini adalah dashboard.
        </p>
      </main>
    </div>
  );
}