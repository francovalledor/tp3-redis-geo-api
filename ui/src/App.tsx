import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Pois from './Pois';
import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { addPlace, addPoi, getAllPois } from './fetch';
import AddPoi from './AddPoi';
import AddPlace from './AddPlace';
import { Place } from './types';
import Search from './Search';

function App() {
  const navigate = useNavigate();
  const [selectedPoi, setSelectedPoi] = useState<string>("Universidades");
  const [poiList, setPoiList] = useState<string[]>([]);

  const handleAddPoi = async (name: string) => {
    setSelectedPoi(name);
    await addPoi(name);
    navigate('/');
  }

  const handleAddPlace = async (poi: string, place: Place) => {
    setSelectedPoi(poi);
    await addPlace(poi, place);
    navigate('/');
  }

  const fetchData = async () => {
    const response = await getAllPois();
    setPoiList(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{height: '100vh', width: '100vw'}}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Pois selectedPoi={selectedPoi} setSelectedPoi={setSelectedPoi}/>}></Route>
        <Route path='/pois' element={<Pois selectedPoi={selectedPoi} setSelectedPoi={setSelectedPoi}/>} />
        <Route path='/search' element={<Search poiList={poiList}/>} />
        <Route path='/add-poi' element={<AddPoi addPoi={handleAddPoi}/>} />
        <Route path='/add-place' element={<AddPlace addPlace={handleAddPlace} poiList={poiList}/> } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
