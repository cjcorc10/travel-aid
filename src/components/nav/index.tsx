import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

const Nav = () => {
  return (
    <nav className="w-full bg-[dodgerblue]">
      <ul className="flex gap-4 p-4 items-center justify-between text-white">
        <li>
          <Link to={'/'}>
            <ArrowLeft />
          </Link>
        </li>
        <li>
          <Link to={'/flights'}>Book a flight</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
