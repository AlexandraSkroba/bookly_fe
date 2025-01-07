import './App.css';
import { React } from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
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
import { Book, BookWrapper } from './components/Books/Book';
import { NotificationsTest } from './pages/NotificationsTest';
import { Notifications } from './components/Notifications/Notifications';
import { Exchange } from './components/Exchange/Exchange';
import { Dialogs } from './pages/Dialogs';
import { ViewDialog } from './pages/ViewDialog';

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} />
        {isAuthenticated && <Notifications />}
        <Routes>
          <Route index element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="auth/confirm" element={<ConfirmEmailWrapper />} />
          <Route path="auth/password-recovery" element={<RecoverPassword />} />
          <Route path="password-reset" element={<ResetPassword />} />
          <Route element={<RequireAuth isAuthenticated={isAuthenticated} />}>
            <Route path="profile" element={<Profile isOwner={true} />} />
            <Route path="users/:id" element={<Profile isOwner={false} />} />
            <Route path="books" element={<BooksList />} />
            <Route path="books/:id/edit" element={<BookWrapper />} />
            <Route path="notifications/test" element={<NotificationsTest />} />
            <Route path="books/new" element={<Book isNew={true} />} />
            <Route path="exchanges/new" element={<Exchange isNew={true} />} />
            <Route path="exchanges/:id/edit" element={<Exchange isNew={false} />} />
            <Route path="dialogs" element={<Dialogs />} />
            <Route path="dialogs/:id" element={<ViewDialog />} />
          </Route>

          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
