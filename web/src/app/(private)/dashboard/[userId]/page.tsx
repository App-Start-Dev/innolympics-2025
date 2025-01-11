"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth.provider";
import { User } from "firebase/auth";

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const [userAccount, setUserAccount] = useState<User | null>(null);


  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
    setUserAccount(user);
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-8">
        Welcome to your dashboard {userAccount?.displayName}
      </h1>
    </div>
  );
}
