import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import AddUserPage from './pages/AddUserPage';
import GetUserPage from './pages/GetUserPage';
import './App.css';
import PrivateRoutes from './components/PrivateRoutes';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/add-user" element={<AddUserPage />} />
          <Route path="/get-user" element={<GetUserPage />} />
          <Route path="*" element={<Navigate to="/add-user" />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
