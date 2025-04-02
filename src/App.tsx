import { Outlet } from 'react-router'
import Nav from './components/nav'

const App = () => {
  return (
    <main>
      <Nav />
      <Outlet />
    </main>
  )
}
export default App
