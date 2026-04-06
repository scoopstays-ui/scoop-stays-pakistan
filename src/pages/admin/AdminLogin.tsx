import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LogIn, Loader2, UserPlus, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Mode = "login" | "signup" | "forgot";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<Mode>("login");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setLoading(false);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Email sent!", description: "Check your inbox for a password reset link." });
        setMode("login");
      }
      return;
    }

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (error) {
        toast({ title: "Signup failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Account created!", description: "You can now sign in. An admin will need to grant you the admin role." });
        setMode("login");
      }
      return;
    }

    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("invalid login credentials") || msg.includes("invalid_credentials")) {
        toast({ title: "Login failed", description: "Invalid email or password. Please try again.", variant: "destructive" });
      } else if (msg.includes("email not confirmed")) {
        toast({ title: "Email not confirmed", description: "Please check your inbox and confirm your email first.", variant: "destructive" });
      } else {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      }
    } else {
      navigate("/admin");
    }
  };

  const titles: Record<Mode, { title: string; desc: string }> = {
    login: { title: "Admin Login", desc: "Sign in to manage ScoopStays" },
    signup: { title: "Create Account", desc: "Create your admin account" },
    forgot: { title: "Reset Password", desc: "Enter your email to receive a reset link" },
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl">{titles[mode].title}</CardTitle>
          <CardDescription>{titles[mode].desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@scoopstays.com" />
            </div>
            {mode !== "forgot" && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} placeholder="••••••••" />
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : mode === "login" ? (
                <LogIn className="w-4 h-4 mr-2" />
              ) : mode === "signup" ? (
                <UserPlus className="w-4 h-4 mr-2" />
              ) : (
                <Mail className="w-4 h-4 mr-2" />
              )}
              {mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
            </Button>
          </form>
          <div className="mt-4 space-y-2 text-center">
            {mode === "login" && (
              <>
                <button type="button" onClick={() => setMode("forgot")} className="block w-full text-sm text-accent hover:text-accent/80 transition-colors">
                  Forgot Password?
                </button>
                <button type="button" onClick={() => setMode("signup")} className="block w-full text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Need an account? Sign up
                </button>
              </>
            )}
            {mode !== "login" && (
              <button type="button" onClick={() => setMode("login")} className="block w-full text-sm text-muted-foreground hover:text-foreground transition-colors">
                Back to Sign In
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
