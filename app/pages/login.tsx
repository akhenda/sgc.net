import { useState } from 'react';
import { NavLink } from 'react-router';

import { DramaIcon } from 'lucide-react';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { authActions } from '@/stores';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, _setEmailError] = useState('');
  const [passwordError, _setPasswordError] = useState('');

  const onLogin = () => authActions('login', email, password);
  const onLoginAnonymously = () => authActions('loginAnonymously');

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-full w-full lg:grid-cols-2">
        <div className="m-auto flex w-full max-w-sm flex-col items-center">
          <Logo />
          <p className="mt-4 font-bold text-lg tracking-tight">Welcome back!</p>

          <Button className="mt-8 w-full gap-3" onClick={onLoginAnonymously}>
            <DramaIcon className="h-8 w-8" />
            Login Anonymously
          </Button>

          <div className="my-7 flex w-full items-center justify-center overflow-hidden">
            <Separator />
            <span className="px-2 text-sm">OR</span>
            <Separator />
          </div>

          <div className="w-full space-y-6">
            <div className="space-y-4">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Email"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>{emailError}</span>
            </div>
            <div className="space-y-4">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Password"
                className="w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>{passwordError}</span>
            </div>
            <Button type="submit" className="mt-4 w-full" onClick={onLogin}>
              Login
            </Button>
          </div>

          <div className="mt-5 space-y-5">
            <p className="text-center text-sm">
              Don&apos;t have an account?
              <NavLink to="/signup" className="ml-1 text-muted-foreground underline">
                Create account
              </NavLink>
            </p>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <img src="/daedalus.jpg" alt="Daedalus Login" className="h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-white" />
        </div>
      </div>
    </div>
  );
}
