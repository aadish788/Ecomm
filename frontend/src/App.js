import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './component/Footer';
import { Navbar } from './component/Navbar';
import HomePage from './component/Home';
import Login from './component/Login';
import SignUp from './component/Signup.';
import { Contact } from './component/Contact';
import Products from './component/Products';
import  Cart  from './component/Cart';
import { Main } from './component/Main';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/Home' element={<HomePage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='Main' element={<Main />} />
        <Route path='/Products' element={<Products />} />
        <Route path='/Cart' element={<Cart/>} />
        <Route path='/Signup' element={<SignUp />} />
        <Route path='/Contact' element={<Contact />} />
      </Routes>
      <Footer />
      
    </div>
  );
}

export default App;
