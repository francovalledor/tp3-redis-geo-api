import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Episode } from "../types";
import { fetchEpisodeDetails } from "../fetch";
import { Cast } from "./EpisodeListItem/Cast";
import { ActionButton } from "./ActionButton";

export const Details: React.FC = () => {
  const { season, episode } = useParams();

  const [data, setData] = useState<Episode | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await fetchEpisodeDetails(Number(season), Number(episode));

    setData(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data || isLoading) return "Loading...";

  return (
    <>
      <h2 className="fs-3">{data.name} (S{season}E{episode}) <ActionButton episode={data} /></h2>
      <div className="my-3">
        <h3 className="fs-4 mb-2">Cast:</h3>
        <Cast cast={data.cast} />
      </div>
    </>
  );
};
