"use client";

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Link from 'next/link'

import { Input } from "@/components/ui/input"

import { api_login } from "@/lib/api";

import Lottie  from "lottie-react";

import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";

// Sudah dicoba menggunakan @, tapi tidak terbaca lottienya
import invoicelottie from "../src/lottie/invoice-auth2.json";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Login() {
    
    const router = useRouter();

    const successregisterParams = useSearchParams();

    useEffect(() => {
        if (successregisterParams.get("registered") === "success") {
            toast.success("Registrasi berhasil! Silakan login.");
        }
    }, [successregisterParams]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setLoading(true);
        setError(null);

        try {

            const res = await api_login.post("/api/login", { email, password });
            
            localStorage.setItem("token", res?.data?.data?.token);

            toast.success("Login berhasil!");

            setTimeout(() => {
                router.replace("/dashboard");
            }, 1500);

        } catch (err: any) {
            setError(err.message || "Login gagal");
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-sans">

            <Toaster position="top-right" richColors/>
           
            <main className="flex items-center justify-center min-h-screen">
                
                <div className="flex flex-col">


                    <div className="flex flex-row gap-8">

                        <div>
                            <img
                                src="/illustrationlogin2.png"
                                alt="Illustration"
                                className=" h-[320] mt-8"
                                />
                        </div>

                        <div className="flex flex-col w-[400px]">

                            <Card>
                                <div className="flex justify-center">

                                    <img
                                        src="/invocanteen-icon-color-long.png"
                                        alt="Logo"
                                        width={150}
                                        height={150}
                                    />
                                
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-2xl -mt-2">Login</CardTitle>
                                    <CardDescription>Input your credentials</CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <form className="flex flex-col gap-4 mt-2" onSubmit={handleLogin}>
                                        <Input
                                        type="email"
                                        placeholder="Email*"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        />
                                        <Input
                                        type="password"
                                        placeholder="Password*"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        />

                                        <button
                                        type="submit"
                                        className="btn-blackbutton rounded-full border border-transparent flex items-center justify-center font-medium text-base h-12 px-5 mt-6"
                                        disabled={loading}
                                        >
                                        {loading ? "Loading..." : "Login"}
                                        </button>

                                        {/* <p className="text-sm text-center">
                                        Dont have an account?{" "}
                                        <Link
                                            href="/register"
                                            className="hover:underline"
                                            style={{ 
                                                    color:"var(--color-linkpurple)" 
                                                    }}
                                        >
                                            Register
                                        </Link>
                                        </p> */}
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