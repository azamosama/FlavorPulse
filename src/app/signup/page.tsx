// /app/signup/page.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/ui/Header";

export default function SignupPage() {
  return (
    <>
      <Header />
      <div className="p-10 max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Your Name" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full mt-4">
            Sign Up
          </Button>
        </form>
      </div>
    </>
  );
}
