import Main from './Landing/Main'
import "./App.css"; // or wherever your global styles are located
import Login from './Landing/Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App(){
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Main></Main>}></Route>
    <Route path='/login' element={<Login></Login>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App