import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import Home from './Home';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path='/search' element={<div>SEARCH</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
