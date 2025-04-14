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
        <Route path="/signup" element={ <UnProtectedRoute>  <Signup />  </UnProtectedRoute> } />
        <Route path="/login"  element={ <UnProtectedRoute>  <Login />   </UnProtectedRoute> } />

        {/* protected ones */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateArticle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/article/:id"
          element={
            <ProtectedRoute>
              <ArticleDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditArticle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mine"
          element={
            <ProtectedRoute>
              <MyArticles />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div className='text-center text-6xl'>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
