"use client";

import { useState } from "react";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";

import { 
  LayoutDashboard, 
  ShoppingBasket, 
  User2, 
  ShoppingCart, 
  SquareChevronRight, 
  SquareChevronLeft, 
  LogOut,
  ReceiptText
} from "lucide-react";

type NavItem = { href: string; label: string; icon: React.ReactNode };

const navbarcontent: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { href: "/products", label: "Products", icon: <ShoppingBasket size={20} /> },
  { href: "/cart", label: "Cart", icon: <ShoppingCart size={20} /> },
  { href: "/invoice", label: "Invoice", icon: <ReceiptText size={20} /> },
  { href: "/profile", label: "Profile", icon: <User2 size={20} /> },
];

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside
      className={`${isOpen ? "w-42" : "w-16"} 
        h-screen
        top-0 left-0
        bg-blue-950
        text-white        
        p-2
        transition-all
        duration-200
        flex flex-col`}
    >
      {/* Toggle */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="mb-4 bg-transparent flex justify-center"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <> <SquareChevronLeft className="mr-2" /> Close</> : <SquareChevronRight />}
      </button>

      {/* Logo InvoCanteen */}
      <div className={`mb-4 font-semibold ${isOpen ? "block" : "hidden"}`}>
        <img
            src="/invocanteen-icon-color2-long.png"
            alt="Logo"
            width={140}
            height={140}
             />
      </div>

      {/* Navbar Content */}
      <nav className="">
        {navbarcontent.map((x) => {
          const active = pathname === x.href;
          return (
            <Link
              key={x.href}
              href={x.href}
              className={`flex items-center gap-2 rounded-lg pl-4 pb-4 pt-4 text-sm
                ${active ? "bg-white text-pink-500" : "hover:bg-white/10"}`}
              title={x.label}
            >
              {x.icon}
              {isOpen && <span>{x.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button
          onClick={() => router.push("/logout")}
          className="w-full rounded-lg pl-2 pb-2 pt-2 text-left text-sm bg-red-700 hover:bg-red-500"
        >
          {isOpen ? "Logout" : <LogOut className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
}
