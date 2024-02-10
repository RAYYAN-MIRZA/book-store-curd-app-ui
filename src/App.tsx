import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ShowBook from './components/ShowBook';
import CreateBook from './components/CreateBook';
import UpdateBook from './components/UpdateBook';


const App: React.FC = () => {  
  return (
    <Routes>
      <Route path='/home'  element={<Home greet ="Hello from the Home of Books"  />} />
      <Route path='/showbooks/:bookId' element={<ShowBook />}> </Route>
      <Route path='/add' element={<CreateBook></CreateBook>}> </Route>
      <Route path='/update/:bookId' element={<UpdateBook/>}> </Route>
    </Routes>
  )
}

export default App;
