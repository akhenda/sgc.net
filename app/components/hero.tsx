import { useNavigate } from 'react-router';

import { ArrowUpRight, CirclePlay } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { logger } from '@/lib/logger';
import { authActions } from '@/stores';

import { BackgroundPattern } from './background-pattern';

export function Hero() {
  const navigate = useNavigate();

  const onLoginAnonymously = () => {
    authActions('loginAnonymously');
    navigate('/dashboard');
    logger.success('Logged in anonymously').toast();
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <BackgroundPattern />

      <div className="relative z-10 max-w-2xl text-center">
        <Badge className="rounded-full border-none bg-gradient-to-br from-black via-60% via-primary/90 to-black py-1">
          Stargate Network v1.0
        </Badge>
        <h1 className="!leading-[1.2] mt-6 font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
          UFO Sightings Dashboard
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          "The gate is open!" Join the Stargate Command's mission to track anomalous crafts, be they
          alien vessels or oversized seagulls, circling over the Procode headquarters.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base" onClick={onLoginAnonymously}>
            Launch Dashboard <ArrowUpRight className="!h-5 !w-5" />
          </Button>
          <Button variant="outline" size="lg" className="rounded-full text-base shadow-none">
            <CirclePlay className="!h-5 !w-5" /> View Mission Logs
          </Button>
        </div>
      </div>
    </div>
  );
}
