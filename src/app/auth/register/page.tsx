"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/services/auth/mutations/use-auth";
import { getErrorMessage } from "@/utils/error";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const registerMutation = useRegister();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(
      { name, email, password, address },
      {
        onSuccess: () => {
          alert("Registration successful! Please log in.");
          window.location.href = "/login";
        },
        onError: (error) => {
          alert(getErrorMessage(error));
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Image Section */}
      <div className="hidden w-1/2 bg-muted lg:block">
        <div className="relative h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FrZXN8ZW58MHx8MHx8fDA%3D"
            alt="Assorted cakes and pastries"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-pink-500/20" />
          <div className="absolute bottom-8 left-8 max-w-md rounded-lg bg-white/90 p-6 backdrop-blur-sm">
            <h2 className="mb-2 text-2xl font-bold text-pink-800">Sweet Delights Bakery</h2>
            <p className="text-muted-foreground">
              Indulge in our handcrafted cakes and pastries, made with love and the finest ingredients.
            </p>
          </div>
        </div>
      </div>

      {/* Register Form Section */}
      <div className="flex w-full items-center justify-center px-4 py-12 sm:px-6 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-pink-800">Create an account</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign up to order delicious cakes</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            <div className="space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Your address"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
              Sign up
            </Button>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-pink-600 hover:text-pink-800">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}