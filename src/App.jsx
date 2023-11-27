import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./routes/Menu";
import Reservation from './routes/reservation';
import Login from './routes/Login';
import Cart from './routes/Cart';

function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;

