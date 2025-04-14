import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateArticle from './pages/CreateArticle';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/create" element={<CreateArticle/>} />
        <Route path="/account" element={<SettingsPage/>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;