import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Logo } from './logo';
import { NavMenu } from './nav-menu';

export const NavigationSheet = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Logo />
        {isLoggedIn && <NavMenu orientation="vertical" className="mt-12" />}
      </SheetContent>
    </Sheet>
  );
};
