import { Loader2 } from 'lucide-react';

export function FullScreenLoader() {
  return (
    <div className="absolute inset-0 flex h-screen items-center justify-center bg-white/20">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}
