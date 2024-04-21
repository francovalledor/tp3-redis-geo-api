import { Episode } from "../../types";
import { Link } from "react-router-dom";
import { ActionButton } from "../ActionButton";

interface Props {
  episode: Episode;
}

export const EpisodeListItem: React.FC<Props> = ({ episode }) => {
  return (
    <>
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title"><Link to={`/details/season/${episode.season}/episode/${episode.episode}/${episode.name}`}>{episode.name}</Link></h5>
            <ActionButton episode={episode}/>
          </div>
        </div>
      </div>
    </>
  );
};
