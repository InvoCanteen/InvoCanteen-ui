import Navbar from "@/components/navbar";
import Sidebarproducts from "@/components/sidebarproducts";

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen">
      
      <Navbar />

      <main className="">
        <div className="flex flex-row">
          
          <div className="flex flex-col">

            <Sidebarproducts />

          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-sm text-gray-600">
              Ini adalah products.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}