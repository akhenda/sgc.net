import { useNavigate } from 'react-router';

import { CircleUserRoundIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authActions, useAuthValue } from '@/stores';

export function UserButton() {
  const navigate = useNavigate();
  const user = useAuthValue('user');

  if (!user) return null;

  const onLogout = () => {
    authActions('logout');
    navigate('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Open account menu"
          className="rounded-full p-1"
        >
          <CircleUserRoundIcon className="h-12 w-12" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex flex-col">
          <span>Signed in as</span>
          <span className="font-normal text-foreground text-xs">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>{user.firstName}</DropdownMenuItem>
          <DropdownMenuItem>{user.lastName}</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
