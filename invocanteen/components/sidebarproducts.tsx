"use client";

import * as React from "react"

import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
const chooseplace = [
  {
    value: "takeaway",
    label: "Takeaway",
  },
  {
    value: "walkincostumer",
    label: "Walk-in Costumer",
  },
]


export default function Sidebarproducts() {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    
    return (
        <aside
            className="h-screen
            bg-white
            text-white      
            transition-all
            duration-200
            flex flex-col
            border-r
            w-[280px]"
        >

            <div className="flex flex-col gap-4 p-2">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between bg-gray-100 text-gray-400"
                        >
                            {value
                                ? chooseplace.find((chooseplace) => chooseplace.value === value)?.label
                                : "Choose Place..."}
                            <ChevronDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-full">
                        <Command className="">
                        <CommandInput placeholder="Search place..." className="h-8" />
                        <CommandList>
                            <CommandEmpty>No place found.</CommandEmpty>
                            <CommandGroup className="w-[260px]">
                                {chooseplace.map((chooseplace) => (
                                    <CommandItem
                                    key={chooseplace.value}
                                    value={chooseplace.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                    className="text-black"
                                    >
                                    {chooseplace.label}
                                    <Check
                                        className={cn(
                                        "ml-auto",
                                        value === chooseplace.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <p className="text-black">Products</p>
                <p className="text-black">Products</p>
                <p className="text-black">Products</p>
                <p className="text-black">Products</p>
                <p className="text-black">Products</p>
                <p className="text-black">Products</p>
            </div>

        </aside>
    );
}
