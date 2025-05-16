import { NavLink } from 'react-router';

export function Logo() {
  return (
    <NavLink to="/">
      <div className="flex items-center gap-3">
        <p className="text-4xl">👽</p>
        <span className="font-bold text-emerald-800 text-xl uppercase tracking-tighter">
          SGC.net
        </span>
      </div>
    </NavLink>
  );
}
