import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateArticle from './pages/CreateArticle';
import SettingsPage from './pages/SettingsPage';
import Homepage from './pages/Homepage';
import ArticleDetail from './pages/ArticleDetail';
import EditArticle from './pages/EditArticle';
import MyArticles from './pages/MyArticles';
import ProtectedRoute from './components/ProtectedRoute';
import UnProtectedRoute from './components/UnProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* unprotected ones */}
        <Route element={<UnProtectedRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>


        {/* protected ones */}
        <Route path="/" element={ <ProtectedRoute /> }>
            <Route index element={ <Homepage /> } />
            <Route path="/create" element={ <CreateArticle /> } />
            <Route path="/account" element={ <SettingsPage /> } />
            <Route path="/article/" element={ <ArticleDetail /> } />
            <Route path="/edit" element={ <EditArticle /> } />
            <Route path="/mine" element={ <MyArticles /> } />
        </Route>

        <Route path="*" element={<div className='text-center text-6xl'>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
