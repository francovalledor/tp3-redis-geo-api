import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from './components/Home/Home';
import { Details } from './components/EpisodeDetails';
import { Title } from './components/Home/Title';

function App() {
  return (
    <div className="container">
      <Title />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path='/details/season/:season/episode/:episode/:name' element={<Details />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
