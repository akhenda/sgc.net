import { NavLink, useLocation } from 'react-router';

import { Button } from '@/components/ui/button';

import { Logo } from './logo';
import { NavMenu } from './nav-menu';
import { NavigationSheet } from './navigation-sheet';
import { UserButton } from './user-button';

export function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const location = useLocation();

  if (location?.pathname === '/login' || location?.pathname === '/signup') return null;

  return (
    <nav className="fixed inset-x-4 top-6 z-50 mx-auto h-16 max-w-screen-xl rounded-full border bg-background dark:border-slate-700/70">
      <div className="mx-auto flex h-full items-center justify-between px-4">
        <Logo />

        {/* Desktop Menu */}
        {isLoggedIn && <NavMenu className="hidden md:block" />}

        {!isLoggedIn && (
          <div className="flex items-center gap-3">
            <NavLink to="/login">
              <Button variant="outline" className="hidden rounded-full sm:inline-flex">
                Sign In
              </Button>
            </NavLink>
            <NavLink to="/signup">
              <Button className="rounded-full">Get Started</Button>
            </NavLink>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        )}
        {isLoggedIn && <UserButton />}
      </div>
    </nav>
  );
}
