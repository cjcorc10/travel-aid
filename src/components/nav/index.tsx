import { Link } from 'react-router'

const Nav = () => {
  return (
    <nav className="w-full sticky top-0 shadow-md bg-emerald-600 z-10">
      <ul className="flex gap-4 p-4 items-center  text-emerald-600">
        <li className="text-white">
          <Link to={'/'}>
            <h3 className="font-bold text-4xl font-teko text-white">
              Travel<span className="text-pink-300">-</span>aid
            </h3>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
