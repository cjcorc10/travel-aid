import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

const Nav = () => {
  return (
    <nav className="w-full bg-emerald-700 sticky top-0">
      <ul className="flex gap-4 p-4 items-center justify-between text-white">
        <li className="hover:underline">
          <Link to={'/'}>
            <ArrowLeft />
          </Link>
        </li>
        <li className="hover:underline">
          <Link to={'/flights'} className='font-ubuntu font-bold'>Book a flight</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
