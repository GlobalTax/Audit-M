import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Globe, AlertTriangle, Clock } from 'lucide-react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [lockoutUntil, setLockoutUntil] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if locked out
  useEffect(() => {
    if (lockoutUntil) {
      const lockoutDate = new Date(lockoutUntil);
      const now = new Date();
      
      if (now < lockoutDate) {
        const interval = setInterval(() => {
          const currentNow = new Date();
          if (currentNow >= lockoutDate) {
            setLockoutUntil(null);
            setRemainingAttempts(null);
            clearInterval(interval);
          }
        }, 1000);
        
        return () => clearInterval(interval);
      } else {
        setLockoutUntil(null);
        setRemainingAttempts(null);
      }
    }
  }, [lockoutUntil]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Zod validation
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      await signIn(email, password);
      toast({
        title: 'Access granted',
        description: 'Welcome to the administration portal',
      });
      navigate('/admin');
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Update remaining attempts and lockout
      if (error.remainingAttempts !== undefined) {
        setRemainingAttempts(error.remainingAttempts);
      }
      
      if (error.lockoutUntil) {
        setLockoutUntil(error.lockoutUntil);
      }

      let errorMessage = 'Invalid credentials';
      
      if (error.message?.includes('Too many')) {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (error.message?.includes('Access denied')) {
        errorMessage = 'Access denied: You are not an administrator.';
      } else if (error.message?.includes('Account disabled')) {
        errorMessage = 'Your account has been disabled. Contact an administrator.';
      }
      
      toast({
        title: 'Authentication error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isLockedOut = lockoutUntil && new Date(lockoutUntil) > new Date();
  const lockoutMinutes = isLockedOut 
    ? Math.ceil((new Date(lockoutUntil!).getTime() - new Date().getTime()) / 60000)
    : 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl" />
      </div>
      
      <Card className="w-full max-w-md relative border-t-4 border-t-amber-500 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-2xl border border-amber-500/20">
              <Globe className="h-10 w-10 text-amber-500" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Navarro International
          </CardTitle>
          <CardDescription className="text-sm tracking-wide">
            Global Administration Portal
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLockedOut && (
            <Alert variant="destructive" className="mb-4">
              <Clock className="h-4 w-4" />
              <AlertDescription>
                Too many failed attempts. Please wait {lockoutMinutes} minutes before trying again.
              </AlertDescription>
            </Alert>
          )}
          
          {remainingAttempts !== null && remainingAttempts < 3 && remainingAttempts > 0 && !isLockedOut && (
            <Alert variant="default" className="mb-4 border-amber-500/50 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                You have {remainingAttempts} attempts remaining before your account is temporarily locked.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                required
                disabled={isLoading || isLockedOut}
                className="focus-visible:ring-amber-500/50"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                required
                disabled={isLoading || isLockedOut}
                className="focus-visible:ring-amber-500/50"
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-medium" 
              disabled={isLoading || isLockedOut}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
