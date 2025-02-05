"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";
export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const handleSignIn = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: callbackUrl|| DEFAULT_LOGIN_REDIRECT });
    
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => handleSignIn("google")}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => handleSignIn("github")}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};
