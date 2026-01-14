import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

interface PasswordGateProps {
  onUnlock: () => void;
  correctPassword: string;
  companyName?: string;
}

export const PasswordGate = ({ onUnlock, correctPassword, companyName = "Your Provider" }: PasswordGateProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      onUnlock();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center hero-gradient">
      <div 
        className={`bg-card rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 transition-transform ${
          isShaking ? "animate-shake" : ""
        }`}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {companyName}
          </h1>
          <p className="text-muted-foreground">
            Enter your password to view your personalized Medicare proposal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`text-center text-lg py-6 ${
                error ? "border-destructive focus-visible:ring-destructive" : ""
              }`}
            />
            {error && (
              <p className="text-destructive text-sm mt-2 text-center">
                Incorrect password. Please try again.
              </p>
            )}
          </div>
          
          <Button type="submit" className="w-full py-6 text-lg">
            View My Proposal
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          This proposal contains personalized information. If you didn't receive a password, please contact your agent.
        </p>
      </div>
    </div>
  );
};
