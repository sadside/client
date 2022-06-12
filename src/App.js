import Todo from "./pages/Todo";
import { Routes, Route } from 'react-router-dom'
import Login from "./pages/Login";
import Register from './pages/Register'
import Profile from "./pages/Profile";

function App() {

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Todo />} exact={true}/>
        <Route path={'/login'} element={<Login />} exact={true}/>
        <Route path={'/register'} element={<Register />} />
        <Route path={'/profile'} element={<Profile email={'test@gmail.com'} />} />
      </Routes>
    </>
  )


}

export default App;
