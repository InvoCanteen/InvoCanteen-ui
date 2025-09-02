"use client";

import * as React from "react"

import Navbar from "@/components/navbar";
import Sidebarproducts from "@/components/sidebarproducts";

import { cn } from "@/lib/utils"

import { Check, ChevronDown, Hand, UserRound } from "lucide-react"

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

import { ItemProductsMenu } from "@/types/product";

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

const initialItems: ItemProductsMenu[] = [
  { id: 1, name: "Hotdog", qty: 1, price: 10000 },
  { id: 2, name: "Coca Cola", qty: 2, price: 7000  },
  { id: 3, name: "Burger", qty: 1, price: 15000 },
  { id: 4, name: "Kebab", qty: 2, price: 8000  },
  { id: 5, name: "Meatballs", qty: 1, price: 15000 },
  { id: 6, name: "French Fries", qty: 2, price: 8000  },
];

import CardOnholdorder from "@/components/custom/cardonholdorder";
import CardCustomerorder from "@/components/custom/cardcustomerorder";

export default function ProductsPage() {

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [showCardOnholdorder, setCardOnholdorder] = React.useState(false);
  const [showCardCustomerorder, setCardCustomerorder] = React.useState(false);

  return (
    <div className="flex min-h-screen">
      
      <Navbar />

      <main className="flex-1 pl-[var(--sidebar-w)] transition-[padding] duration-200">
        <div className="flex-1 flex flex-row">
          
          <div className="flex flex-col">

            <Sidebarproducts />

          </div>

          <div className="flex flex-col p-2 flex-1">
            <div className="flex flex-row p-2 gap-2">
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
                  Customers Orders
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col p-2">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {initialItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center border rounded-lg p-2 hover:shadow-md transition cursor-pointer"
                  >
                    <img
                      src="https://picsum.photos/200/200"
                      alt={item.name}
                      className="w-[100px] h-[100px] object-cover rounded"
                    />
                    <p className="mt-2 font-medium">{item.name}</p>
                    <p className="text-sm"
                      style={{ 
                        color: "var(--color-greenstandard)" 
                      }}>
                      Rp. {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
          {showCardOnholdorder && <CardOnholdorder onClose={() => setCardOnholdorder(false)} />}
          {showCardCustomerorder && <CardCustomerorder onClose={() => setCardCustomerorder(false)} />}
        </div>
      </main>
    </div>
  );
}