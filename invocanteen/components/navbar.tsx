"use client";

import { useState, useEffect } from "react";

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

import CardConfirmlogout from "@/components/custom/cardconfirmlogout"

const navbarcontent: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { href: "/products", label: "Products", icon: <ShoppingBasket size={20} /> },
  // { href: "/cart", label: "Cart", icon: <ShoppingCart size={20} /> },
  { href: "/invoice", label: "Invoice", icon: <ReceiptText size={20} /> },
  { href: "/profile", label: "Profile", icon: <User2 size={20} /> },
];

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const openW = "11rem";  
    const closedW = "4rem";
    document.documentElement.style.setProperty("--sidebar-w", isOpen ? openW : closedW);
  }, [isOpen]);

  return (
    <aside
      style={{ 
        backgroundColor: "var(--color-blueprimary)", 
        color:"var(--color-whiteclear)",
        width: "var(--sidebar-w)" 
      }}
      className={`aside-hover ${isOpen ? "w-42" : "w-16"}
        fixed
        h-screen
        top-0 left-0
        p-2
        transition-all
        duration-200
        flex flex-col`}
    >
      {/* Toggle */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="mb-4 bg-transparent flex justify-center cursor-pointer"
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
              className={`flex items-center gap-2 rounded-lg pl-4 pb-4 pt-4 text-sm ${
                active ? "navlink-active" : "navlink-inactive"
              }`}
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
          onClick={() => setShowLogout(true)}
          className="w-full rounded-lg pl-2 pb-2 pt-2 text-left text-sm btn-redbutton"
        >
          {isOpen ? "Logout" : <LogOut className="w-5 h-5" />}
        </button>
      </div>
      {showLogout && (
        <CardConfirmlogout onClose={() => setShowLogout(false)} />
      )}
    </aside>
  );
}
