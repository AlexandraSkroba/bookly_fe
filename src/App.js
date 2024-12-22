import './App.css';
import { React } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import { ConfirmEmailWrapper } from './pages/ConfirmEmail';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

function App() {
  const isAuthenticated = Boolean(localStorage.getItem('accessToken'))

  return (
    <>
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="auth/confirm" element={<ConfirmEmailWrapper />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
