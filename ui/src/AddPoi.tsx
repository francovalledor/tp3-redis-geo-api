import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

interface Props {
  addPoi: (poiName: string) => void;
}

const AddPoi: React.FC<Props> = ({ addPoi }) => {
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!name) return;

    addPoi(name);
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
      <form onSubmit={handleSubmit}>
        <InputGroup className="my-3" style={{ maxWidth: 500 }}>
          <InputGroup.Text id="basic-addon3">POI Name</InputGroup.Text>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="poi-name"
            aria-describedby="basic-addon3"
          />
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </InputGroup>
      </form>
    </div>
  );
};

export default AddPoi;
