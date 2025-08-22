"use client";

import { useState } from "react"
import { useRouter } from "next/navigation";

import Link from 'next/link'

import { Input } from "@/components/ui/input"

import { api_register } from "@/lib/api";

import Lottie  from "lottie-react";

// Sudah dicoba menggunakan @, tapi tidak terbaca lottienya
import invoicelottie from "../src/lottie/invoice-auth2.json";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



export default function Register() {
    
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setLoading(true);
        setError(null);

        try {

        const res = await api_register.post("/api/register", { email, name, password });

        router.push("/login");
        } catch (err: any) {
        setError(err.message || "Login gagal");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="font-sans">
           
            <main className="flex items-center justify-center min-h-screen">
                
                <div className="flex flex-col">

                    <div className="flex justify-center -mt-8 mb-6">

                        <img
                            src="/invocanteen-icon-color-long.png"
                            alt="Logo"
                            width={150}
                            height={150}
                        />
                    
                    </div>

                    <div className="flex flex-row">

                        <div className="hidden md:flex flex-col justify-center">
                            <Card className="p-16">
                                <Lottie 
                                    animationData={invoicelottie} 
                                    loop={true}
                                    style={{ width: 245, height: 245 }}
                                />
                            </Card>
                        </div>

                        <div className="flex flex-col w-[400px]">

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl">Register</CardTitle>
                                    <CardDescription>Input your credentials</CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                                        <Input
                                            type="email"
                                            placeholder="Email*"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />

                                        <Input
                                            type="name"
                                            placeholder="Name*"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />

                                        <Input
                                            type="password"
                                            placeholder="Password*"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />

                                        {error && (
                                        <div className="text-red-500 text-sm">{error}</div>
                                        )}

                                        <button
                                        type="submit"
                                        className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-base h-12 px-5"
                                        disabled={loading}
                                        >
                                        {loading ? "Loading..." : "Login"}
                                        </button>

                                        <p className="text-sm text-center">
                                            Already have an account?{" "}
                                        <Link
                                            href="/login"
                                            className="text-purple-500 hover:underline"
                                        >
                                            Login
                                        </Link>
                                        </p>
                                    </form>
                                </CardContent>

                            </Card>

                        </div>

                    </div>

                </div>
                
            </main>
        </div>
    );
}