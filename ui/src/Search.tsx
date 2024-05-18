import React, { useState } from "react";
import { InputGroup, Form, Button, ListGroup, Card } from "react-bootstrap";
import { PLAZA_CDELU } from "./PlazaCdelU";
import { search, SearchReturnType } from "./fetch";

const sortByDistance = (data: SearchReturnType) => Array.from(data).sort((a, b) => {
  const distanceA = parseFloat(a.distance);
  const distanceB = parseFloat(b.distance);
  return distanceA - distanceB;
});

interface Props {
  poiList: string[];
}

const SearchForm: React.FC<Props> = ({ poiList }) => {
  const [places, setPlaces] = useState<SearchReturnType>([]);
  const [latitude, setLatitude] = useState(PLAZA_CDELU.latitude);
  const [longitude, setLongitude] = useState(PLAZA_CDELU.longitude);
  const [poi, setPoi] = useState("");

  const [range, setRange] = useState<number>(1);

  const isButtonDisabled = !(latitude && longitude && poi);

  const handleSubmit = async (e: React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isButtonDisabled) return;

    const response = await search(poi, latitude, longitude, range);
    setPlaces(sortByDistance(response));
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <InputGroup className="my-3">
          <Form.Label>Distancia {range}kms</Form.Label>
          <Form.Range
            value={range}
            onChange={(e) => setRange(Number(e.target.value))}
            step={0.1}
            min={0}
            max={100}
          />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon3">Latitud</InputGroup.Text>
          <Form.Control
            value={latitude}
            onChange={(e) => setLatitude(Number(e.target.value))}
            type="number"
            step="0.000001"
            id="latitude"
            defaultValue={PLAZA_CDELU.latitude}
            aria-describedby="basic-addon3"
          />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon3">Longitud</InputGroup.Text>
          <Form.Control
            value={longitude}
            onChange={(e) => setLongitude(Number(e.target.value))}
            defaultValue={PLAZA_CDELU.longitude}
            type="number"
            step="0.000001"
            id="longitude"
            aria-describedby="basic-addon3"
          />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon3">Categoria</InputGroup.Text>
          <Form.Select
            aria-label="Select category"
            value={poi}
            onChange={(e) => setPoi(e.target.value)}
          >
            <option value="">Seleccionar categoria</option>
            {poiList.map((poi) => (
              <option key={poi} value={poi}>
                {poi}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
        <InputGroup className="my-3">
          <Button variant="primary" type="submit" disabled={isButtonDisabled}>
            Buscar
          </Button>
        </InputGroup>
      </form>
      {!places.length ? (
        <div className="my-3">
          <h3>No hay resultados</h3>{" "}
        </div>
      ) : (
        <div className="my-3">
          <h3>Resultados:</h3>
          <ListGroup>
            {places.map((result, index) => (
              <ListGroup.Item key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title>{result.name}</Card.Title>
                    <Card.Text>
                      Distancia: {result.distance} km
                      <br />
                      Coordenadas: Latitud {result.coordinates.latitude},
                      Longitud {result.coordinates.longitude}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}{" "}
    </>
  );
};

export default SearchForm;
