import { Plane } from 'lucide-react';
import { Link } from 'react-router';

const Nav = () => {
  return (
    <nav className="w-full h-[4rem] sticky top-0 shadow-md bg-emerald-600 z-10">
      <ul className="flex gap-4 p-4 items-center text-emerald-600">
        <li className="text-white">
          <Link to={'/'}>
            <h3 className="font-bold text-4xl text-white font-vice">
              Travel
              <Plane className="text-pink-300 inline-block" size={32} />
              aid
            </h3>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
