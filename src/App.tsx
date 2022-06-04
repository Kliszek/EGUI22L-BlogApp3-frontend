import { LoginForm } from './LoginForm';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { BlogsList } from './BlogsList';
import { BlogNav } from './BlogNav';
import { BlogView } from './BlogView';
import { RegisterForm } from './RegisterForm';
import { CreateBlog } from './CreateBlog';

function App() {
  const WithNavBar = () => (
    <div>
      <BlogNav />
      <header className="align-middle">
        <Outlet />
      </header>
    </div>
  )
  const WithoutNavBar = () => (
    <div>
      <header className="vh-100 align-middle">
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
            <Route path='create' element={<CreateBlog />} />
            <Route path=':blogId' element={<BlogView />} />
          </Route>
          <Route element={<WithoutNavBar/>}>
            <Route path='signin' element={<LoginForm/>} />
            <Route path='signup' element={<RegisterForm/>} />
            <Route path='' element={<Navigate to='blogs' />}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
