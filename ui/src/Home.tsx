import React, { useEffect, useState } from "react";
import { SearchReturnType, addPoi, getAllPois, listPlaces } from "./fetch";

const PoiList: React.FC = () => {
  const [data, setData] = useState<string[]>();

  const fetchData = async () => {
    const response = await getAllPois();
    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return null;

  return (
    <ul>
      {data.map((each) => (
        <li>{each}</li>
      ))}
    </ul>
  );
};

const PlacesList: React.FC<{ name: string }> = ({ name }) => {
  const [data, setData] = useState<SearchReturnType>();

  const fetchData = async () => {
    const response = await listPlaces(name);
    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return null;

  return (
    <ul>
      {data.map((each) => (
        <li>
          <b>{each.name}</b>
          <span>
            {each.coordinates.latitude},{each.coordinates.longitude}
          </span>
        </li>
      ))}
    </ul>
  );
};

const Home: React.FC = () => {
  return (
    <div>
      <div>
        <AddPoi />
        <PoiList />
      </div>
      <div>
        <PlacesList name="Universidades" />
      </div>
    </div>
  );
};

const AddPoi: React.FC = () => {
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!name) return;

    await addPoi(name);
    setName("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Home;
