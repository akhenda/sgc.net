import { useId, useState } from 'react';
import { NavLink } from 'react-router';

import { DramaIcon } from 'lucide-react';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { authActions } from '@/stores';

export function Signup() {
  const userId = useId();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = () => {
    authActions('signup', { id: `SGC-${userId}`, firstName, lastName, email, password });
  };

  const onLoginAnonymously = () => authActions('loginAnonymously');

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-full w-full lg:grid-cols-2">
        <div className="m-auto flex w-full max-w-sm flex-col items-center">
          <Logo />
          <p className="mt-4 font-bold text-lg tracking-tight">Fill in your details.</p>

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
              <Label>First Name</Label>
              <Input
                type="text"
                placeholder="Jane"
                className="w-full"
                value={firstName}
                autoCapitalize="words"
                autoComplete="name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              <Label>Last Name</Label>
              <Input
                type="text"
                placeholder="Doe"
                className="w-full"
                value={lastName}
                autoCapitalize="words"
                autoComplete="name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Email"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
            </div>
            <Button type="button" className="mt-4 w-full" onClick={onSignUp}>
              Signup
            </Button>
          </div>

          <div className="mt-5 space-y-5">
            <p className="text-center text-sm">
              Already have an account?
              <NavLink to="/login" className="ml-1 text-muted-foreground underline">
                Log In
              </NavLink>
            </p>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <img src="/daedalus.jpg" alt="Daedalus Signup" className="h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-white" />
        </div>
      </div>
    </div>
  );
}
