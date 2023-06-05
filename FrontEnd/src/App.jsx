import React, { useEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from './store/thunkFunctions'
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedPage from './pages/ProtectedPage';
import NotAuthRoutes from './components/NotAuthRoutes';
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
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user?.isAuth);
  const location = useLocation();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, location.pathname, dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Layout />} />
      {/* 로그인과 상관없이 갈 수 있는 경로 */}
      <Route path='/landing' element={<LandingPage />} />

      {/* 로그인한 사람은 갈 수 없는 경로 */}
      <Route element={<ProtectedPage isAuth={isAuth}/>}>
      <Route path='/protected' element={<ProtectedPage />} />
      </Route>

      <Route element={<NotAuthRoutes isAuth={isAuth}/>}>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
