import React, { useEffect, useState } from "react";
import { SearchReturnType, getAllPois, listPlaces } from "./fetch";
import { Container, ListGroup, Nav, Navbar } from "react-bootstrap";
import AddPlace from "./AddPlace";

const PoiList: React.FC<{
  onPoiSelect: (name: string) => void;
  selected: string;
}> = ({ onPoiSelect, selected }) => {
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
    <Navbar>
      <Container>
        <Nav className="me-auto">
          {data.map((each) => (
            <Nav.Link
              onClick={() => onPoiSelect(each)}
              active={each === selected}
            >
              {each}
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
};

const PlacesList: React.FC<{ name: string }> = ({ name }) => {
  const [data, setData] = useState<SearchReturnType>();

  const fetchData = async () => {
    const response = await listPlaces(name);
    console.log({ response });
    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, [name]);

  if (!data) return null;

  return (
    <ListGroup className="list-group-flush">
      {data.map((each) => (
        <ListGroup.Item>
          {each.name}{" "}
          <span>
            {each.coordinates.latitude},{each.coordinates.longitude}
          </span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

interface Props {
  selectedPoi: string;
  setSelectedPoi: (name: string) => void;
}

const POIs: React.FC<Props> = ({ selectedPoi, setSelectedPoi }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PoiList onPoiSelect={setSelectedPoi} selected={selectedPoi} />
      <div>
        <PlacesList name={selectedPoi} />
      </div>
    </div>
  );
};

export default POIs;
