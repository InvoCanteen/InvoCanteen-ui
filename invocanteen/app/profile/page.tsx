"use client"
import { useState } from "react";

import Navbar from "@/components/navbar";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Avatar, 
  AvatarFallback,
  AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";

export default function ProfilePage() {

  const [openprofilepic, setOpenprofilepic] = useState(false);

  return (

    <div className="flex min-h-screen">

      <Navbar />

      <main className="flex-1 p-6">
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-sm text-gray-600">
            Profile Picture.
          </p>
          {/* Foto Profile */}
          
          <div className="flex flex-row items-center gap-4 mt-6 mb-6 pt-4">
            <Dialog open={openprofilepic} onOpenChange={setOpenprofilepic}>
              <DialogTitle className="sr-only">Profile Picture</DialogTitle>
              
              <DialogTrigger asChild>
                <Avatar className="w-24 h-24 cursor-pointer border">
                  <AvatarImage src="https://picsum.photos/200/200" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DialogTrigger>

            <DialogContent className="max-w-md p-0 bg-transparent border-0 shadow-none">
              <img
                src="https://picsum.photos/200/200"
                alt="Profile"
                className="w-full h-auto rounded-lg"
              />
            </DialogContent>
            
          </Dialog>

            <Button variant="outline" className="bg-blue-500 text-white hover:text-white hover:bg-blue-400">Change Picture</Button>

            <Button variant="outline" className="bg-red-500 text-white hover:text-white hover:bg-red-400">Delete Picture</Button>

          </div>

          {/* Info User */}
          <div className="space-y-1 flex flex-col pt-4 pl-4 pr-4">
            <h3 className="text-l font-semibold font-sans">Email</h3>
            <Input type="email" placeholder="Email" />

            <h3 className="text-l font-semibold font-sans pt-4">Name</h3>
            <Input type="text" placeholder="Name" />

            <h3 className="text-l font-semibold font-sans pt-4">Password</h3>
            <Input type="password" placeholder="Password" />

            <div className="flex justify-end pt-6">
              <Button variant="outline" className="bg-green-500 text-white hover:text-white hover:bg-green-400">Save Changes</Button>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}