import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateArticle from './pages/CreateArticle';
import SettingsPage from './pages/SettingsPage';
import Homepage from './pages/Homepage';
import ArticleDetail from './pages/ArticleDetail';
import EditArticle from './pages/EditArticle';
import MyArticles from './pages/MyArticles';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreateArticle />} />
        <Route path="/account" element={<SettingsPage />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/edit/:id" element={<EditArticle />} />
        <Route path="/mine" element={<MyArticles />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;