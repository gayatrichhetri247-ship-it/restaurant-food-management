import { Route, Routes } from 'react-router'
import Home from './pages/public/Home'
import SignUp from './pages/auth/SignUp'
import NotFound from './pages/public/NotFound'
import LoginUser from './pages/auth/LoginUser'
import Navbar from './components/Navbar'

const AppRoutes = () => {
  return (
    <div>
            <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/login' element={<LoginUser />}></Route>
            <Route path='/sign-up' element={<SignUp/>}></Route>
            <Route path='*' element={<NotFound/>}></Route>
        </Routes>
    </div>
  )
}

export default AppRoutes