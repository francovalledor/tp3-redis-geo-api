import React, { useRef } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { Place } from "./types";

const PLAZA_CDELU = {
  latitude: -32.48466173466737,
  longitude: -58.23210006838209,
};

interface Props {
  addPlace: (poiName: string, place: Place) => void;
  poiList: string[];
}

const AddPlace: React.FC<Props> = ({ addPlace, poiList }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const latitudeRef = useRef<HTMLInputElement>(null);
  const longitudeRef = useRef<HTMLInputElement>(null);
  const poiRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const name = nameRef.current?.value;
    const latitude = latitudeRef.current?.valueAsNumber;
    const longitude = longitudeRef.current?.valueAsNumber;
    const poi = poiRef.current?.value;

    if (!(name && latitude && longitude && poi)) return;

    addPlace(poi, { name, latitude, longitude });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon3">Nombre</InputGroup.Text>
          <Form.Control
            ref={nameRef}
            id="poi-name"
            aria-describedby="basic-addon3"
          />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon3">Latitud</InputGroup.Text>
          <Form.Control
            ref={latitudeRef}
            defaultValue={PLAZA_CDELU.latitude}
            type="number"
            id="poi-latitude"
            aria-describedby="basic-addon3"
          />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon3">Longitud</InputGroup.Text>
          <Form.Control
            ref={longitudeRef}
            defaultValue={PLAZA_CDELU.longitude}
            type="number"
            id="poi-longitude"
            aria-describedby="basic-addon3"
          />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon3">Categoria</InputGroup.Text>
          <Form.Select ref={poiRef} aria-label="Select category">
            <option value="">Seleccionar categoria</option>
            {poiList.map((poi) => (
              <option key={poi} value={poi}>
                {poi}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
        <InputGroup className="my-3">
          <Button variant="primary" type="submit">
            Agregar
          </Button>
        </InputGroup>
      </form>
    </div>
  );
};

export default AddPlace;
