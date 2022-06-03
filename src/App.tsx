import { LoginForm } from './LoginForm';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { BlogsList } from './BlogsList';
import { BlogNav } from './BlogNav';
import { BlogView } from './BlogView';
import { RegisterForm } from './RegisterForm';

function App() {
  const WithNavBar = () => (
    <div>
      <BlogNav />
      <header className="App-header vh-100 align-middle">
        <Outlet />
      </header>
    </div>
  )
  const WithoutNavBar = () => (
    <div>
      <header className="App-header vh-100 align-middle">
        <Outlet />
      </header>
    </div>
  )

  return (
    <Router>
      <div className="container text-center d-flex flex-column min-vh-100">
        <Routes>
          <Route path='blogs' element={<WithNavBar/>}>
            <Route path='' element={<BlogsList />} />
            <Route path=':blogId' element={<BlogView />} />
          </Route>
          <Route element={<WithoutNavBar/>}>
            <Route path='signin' element={<LoginForm/>} />
            <Route path='signup' element={<RegisterForm/>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
