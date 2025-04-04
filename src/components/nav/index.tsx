import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

const Nav = () => {
  return (
    <nav className="w-full sticky top-0 shadow-md">
      <ul className="flex gap-4 p-4 items-center justify-between text-emerald-700">
        <li className="hover:underline">
          <Link to={'/'}>
            <ArrowLeft />
          </Link>
        </li>
        <li className="hover:underline">
          <Link to={'/flights'} className='font-ubuntu font-bold border-2 px-4 py-2 rounded-full hover:bg-gray-50'>Book a flight</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
