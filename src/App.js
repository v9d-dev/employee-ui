import { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { AuthContext } from './components/store/auth-context';
import LoginPage from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={!authCtx.isLoggedIn ? <LoginPage /> : <HomePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
