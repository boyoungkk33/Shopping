import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'

function Layout() {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <main className='mb-auto w-10/12 max-w-4'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* 로그인과 상관없이 갈 수 있는 경로 */}
        <Route index element={<LandingPage />} />


        {/* 로그인한 사람은 갈 수 없는 경로 */}
        <Route element={<LoginPage />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
