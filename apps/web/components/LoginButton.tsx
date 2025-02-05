import { SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

function LoginButton() {
  return (
    <SignInButton mode="modal">
      <button
      className="group flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 
      hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-300 
      font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 
      hover:scale-[1.02] active:scale-[0.98]"
      >
      <LogIn className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
      <span className="tracking-wide text-sm">Sign In</span>
      </button>
    </SignInButton>
  );
}
export default LoginButton;