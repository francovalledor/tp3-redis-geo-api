import { ListGroup } from "react-bootstrap";

interface CharacterProps {
  character: string;
  actor: string;
}

export const Character: React.FC<CharacterProps> = ({ actor, character }) => {
  return (
    <ListGroup.Item>
      <span className="character">{character}</span>
      (<span className="actor">{actor}</span>)
    </ListGroup.Item>
  );
};