import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const STORAGE_KEY = "tkmart_customer";

export function getCustomerSession(): {
  name: string;
  email: string;
  phone: string;
} | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearCustomerSession() {
  localStorage.removeItem(STORAGE_KEY);
}

export default function CustomerLoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);

  // Sign up fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    // Store account in localStorage (keyed by email)
    const accounts = JSON.parse(
      localStorage.getItem("tkmart_accounts") || "{}",
    );
    if (accounts[email]) {
      toast.error("Account already exists with this email. Please log in.");
      setIsLoading(false);
      return;
    }
    accounts[email] = { name, email, phone, password };
    localStorage.setItem("tkmart_accounts", JSON.stringify(accounts));
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, email, phone }));
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created! Welcome to TKMART.");
      navigate("/account");
    }, 600);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter your email and password.");
      return;
    }
    setIsLoading(true);
    const accounts = JSON.parse(
      localStorage.getItem("tkmart_accounts") || "{}",
    );
    const account = accounts[email];
    if (!account || account.password !== password) {
      setTimeout(() => {
        setIsLoading(false);
        toast.error("Invalid email or password.");
      }, 600);
      return;
    }
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        name: account.name,
        email: account.email,
        phone: account.phone,
      }),
    );
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Welcome back, ${account.name}!`);
      navigate("/account");
    }, 600);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background px-4 py-12"
      data-ocid="customer_login.page"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/5" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
            ))}
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-1">
            TKMART
          </h1>
          <p className="text-muted-foreground text-sm">
            Premium Shopping Experience
          </p>
        </div>

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
              <ShoppingBag className="h-7 w-7 text-primary" />
            </div>
            {/* Mode tabs */}
            <div className="flex rounded-lg overflow-hidden border border-border mb-2">
              <button
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  mode === "login"
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setMode("login")}
                data-ocid="customer_login.login.tab"
                type="button"
              >
                Log In
              </button>
              <button
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  mode === "signup"
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setMode("signup")}
                data-ocid="customer_login.signup.tab"
                type="button"
              >
                Sign Up
              </button>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            {mode === "signup" ? (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    data-ocid="customer_login.name.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-email">Email ID</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    data-ocid="customer_login.email.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-phone">Phone Number</Label>
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    data-ocid="customer_login.phone.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      data-ocid="customer_login.password.input"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 text-sm font-medium mt-2"
                  disabled={isLoading}
                  data-ocid="customer_login.signup.submit_button"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="login-email">Email ID</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    data-ocid="customer_login.login_email.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      data-ocid="customer_login.login_password.input"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 text-sm font-medium mt-2"
                  disabled={isLoading}
                  data-ocid="customer_login.login.submit_button"
                >
                  {isLoading ? "Signing in..." : "Log In"}
                </Button>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">
                Admin?{" "}
                <a
                  href="/admin-login"
                  className="text-primary hover:underline"
                  data-ocid="customer_login.admin.link"
                >
                  Admin Login
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
