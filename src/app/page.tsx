import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          🔒 Auth
        </h1>
        <p className="text-lg text-white">A simple Authentication service</p>
        <div>
          <LoginButton mode="modal" asChild>
            <Button size="lg" variant="secondary">
              sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
