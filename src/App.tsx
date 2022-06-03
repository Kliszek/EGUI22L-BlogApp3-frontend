import { LoginForm } from './LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BlogsPage } from './BlogsPage';

function App() {
  return (
    <Router>
      <div className="container text-center d-flex flex-column min-vh-100">
        <header className="App-header vh-100 align-middle">
          <Routes>
            <Route path='signin' element={<LoginForm/>} />
            <Route path='blogs' element={<BlogsPage/>} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
