import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <ToastContainer
        position='bottom-right'
        theme='light'
        pauseOnHover
        autoClose={1500}
      />

      <Navbar />
      <main className='w-10/12 max-w-4xl mx-auto mb-auto'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} />
      {/* 로그인과 상관없이 갈 수 있는 경로 */}
      <Route path='/landing' element={<LandingPage />} />

      {/* 로그인한 사람은 갈 수 없는 경로 */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
    </Routes>
  );
}
 
export default App;
