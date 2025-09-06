"use client";

import * as React from "react"

import Navbar from "@/components/navbar";
import Sidebarproducts from "@/components/sidebarproducts";

import { cn } from "@/lib/utils"

import { Check, ChevronDown, Hand, UserRound, Plus, Minus } from "lucide-react"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { ItemProductsMenu, ItemProductsSidebar } from "@/types/product";

const choosecategories = [
  {
    value: "foods",
    label: "Foods",
  },
  {
    value: "drinks",
    label: "Drinks",
  },
]

// const initialItems: ItemProductsMenu[] = [
//   { id: 1, name: "Hotdog", qty: 1, price: 10000 },
//   { id: 2, name: "Coca Cola", qty: 2, price: 7000  },
//   { id: 3, name: "Burger", qty: 1, price: 15000 },
//   { id: 4, name: "Kebab", qty: 2, price: 8000  },
//   { id: 5, name: "Meatballs", qty: 1, price: 15000 },
//   { id: 6, name: "French Fries", qty: 2, price: 8000  },
// ];

import CardOnholdorder from "@/components/custom/cardonholdorder";
import CardCustomerorder from "@/components/custom/cardcustomerorder";

import { useEffect, useState } from "react";
import { getProducts, getAllcart } from "@/lib/api";

import { Toaster } from "@/components/ui/sonner";

export default function ProductsPage() {

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [showCardOnholdorder, setCardOnholdorder] = React.useState(false);
  const [showCardCustomerorder, setCardCustomerorder] = React.useState(false);

  const [products, setProducts] = useState<ItemProductsMenu[]>([]);
  const [items, setItems] = useState<ItemProductsSidebar[]>([]);

  const [customerName, setCustomerName] = useState("");
  const [customerNo, setCustomerNo] = useState(1);

  const [offset, setOffset] = useState(0);
  const limit = 12;
  const currentPage = Math.floor(offset / limit) + 1;

  const handleIncreaseItem = (item: ItemProductsMenu) => {
    setItems((prev) => {
      const exist = prev.find((it) => it.id === item.id);
      if (exist) {
        return prev.map((it) =>
          it.id === item.id ? { ...it, qty: it.qty + 1 } : it
        );
      }
      return [...prev, { id: item.id, name: item.name, qty: 1, price: item.price }];
    });
  };

  const handleDecreaseItem = (item: ItemProductsMenu) => {
    setItems((prev) =>
      prev
        .map((it) =>
          it.id === item.id ? { ...it, qty: Math.max(0, it.qty - 1) } : it
        )
        .filter((it) => it.qty > 0)
    );
  };

  useEffect(() => {
    getAllcart().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setCustomerNo(data[0].id);
      }
    });
  }, []);

  const fetchProducts = (offsetValue: number) => {
    getProducts({
      sortBy: "name",
      order: "desc",
      minPrice: "",
      maxPrice: "",
      limit,
      offset: offsetValue,
    }).then((res) => {
      setProducts(res.data);
    });
  };

  useEffect(() => {
    fetchProducts(offset);
  }, [offset]);

  const handleNext = () => {
    setOffset((prev) => prev + limit);
  };

  const handlePrev = () => {
    setOffset((prev) => Math.max(0, prev - limit));
  };

  return (
    <div className="flex min-h-screen">
      
      <Navbar />

      <main className="flex-1 pl-[var(--sidebar-w)] transition-[padding] duration-200">
        <Toaster position="top-center" richColors />
        <div className="flex-1 flex flex-row">
          
          <div className="flex flex-col">

            <Sidebarproducts
              items={items}
              setItems={setItems}
              customerName={customerName}
              customerNo={customerNo}
              setCustomerName={setCustomerName}
              setCustomerNo={setCustomerNo}
              clearItems={() => setItems([])}
            />

          </div>

          <div className="flex flex-col p-2 flex-1">
            <div className="flex flex-row px-2 gap-2">
              <Input
                placeholder="Search products by name or code"
              />
              
              <div className="flex flex-col w-36">

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                      style={{ 
                        backgroundColor: "var(--color-graypopoverbg)", 
                        color: "var(--color-graypopovertext)" 
                      }}
                    >
                      {value
                        ? choosecategories.find((choosecategories) => choosecategories.value === value)?.label
                        : "All Categories"}
                      <ChevronDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="p-0 w-full">
                    <Command>
                      <CommandInput placeholder="Search category..." className="h-8" />
                      <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup className="w-[260px]">
                          {choosecategories.map((choosecategories) => (
                            <CommandItem
                              key={choosecategories.value}
                              value={choosecategories.value}
                              onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue);
                                setOpen(false);
                              }}
                              className="text-black"
                            >
                              {choosecategories.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  value === choosecategories.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

              </div>            

              <div className="flex flex-1 flex-row justify-end gap-2">
                <Button variant="outline" className="btn-bluebutton">All</Button>

                <Button onClick={() => setCardOnholdorder(true)}
                variant="outline" className="btn-yellowbutton">
                  <Hand />
                  On Hold Orders
                </Button>
                <Button onClick={() => setCardCustomerorder(true)}
                 variant="outline" className="btn-greenbutton">
                  <UserRound />
                  Unpaid Orders
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col p-2">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center border rounded-lg p-2 hover:shadow-md transition cursor-pointer"
                  >
                    <img
                      src={item.imageProduct || "https://picsum.photos/200/200"}
                      alt={item.name}
                      className="w-[90px] h-[90px] object-cover rounded"
                    />
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm" style={{ color: "var(--color-greenstandard)" }}>
                      Rp. {Number(item.price).toLocaleString("id-ID")}
                    </p>
                    <div className="flex flex-row gap-4 pt-2">
                      <Button onClick={() => handleDecreaseItem(item)} variant="outline" className="btn-greenbutton w-[30px] h-[30px]">
                        <Minus />
                      </Button>
                      <Button onClick={() => handleIncreaseItem(item)} variant="outline" className="btn-bluebutton w-[30px] h-[30px]">
                        <Plus className="w-[12px] h-[12px]" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={handlePrev} />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">{Math.floor(offset / limit) + 1}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" onClick={handleNext}/>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>

          </div>
          {showCardOnholdorder && <CardOnholdorder onClose={() => setCardOnholdorder(false)} />}
          {showCardCustomerorder && <CardCustomerorder onClose={() => setCardCustomerorder(false)} 
            setCustomerName={setCustomerName}
            customerNo={customerNo}
            setCustomerNo={setCustomerNo}/>}
        </div>
      </main>
    </div>
  );
}