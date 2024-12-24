import './App.css';
import { React } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import { ConfirmEmailWrapper } from './pages/ConfirmEmail';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { RecoverPassword } from './pages/RecoverPassowrd';
import { ResetPassword } from './pages/ResetPassword';
import { useAuth } from './AuthContext';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';
import { Unauthorized } from './pages/Unauthorized';
import RequireAuth from './components/RequireAuth/RequireAuth';
import { BooksList } from './components/Books/BooksList';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="auth/confirm" element={<ConfirmEmailWrapper />} />
          <Route path="auth/password-recovery" element={<RecoverPassword />} />
          <Route path="password-reset" element={<ResetPassword />} />
          <Route element={<RequireAuth isAuthenticated={isAuthenticated} />}>
            <Route path="profile" element={<Profile isOwner={true} />} />
            <Route path="books" element={<BooksList isOwner={false} />} />
          </Route>

          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
