import { useEffect, useState } from "react";
import { Episode } from "../types";
import { fetchAllEpisodes } from "../fetch";
import { EpisodeListItem } from "./EpisodeListItem/EpisodeListItem";

export const AllTheEpisodes = () => {
  const [data, setData] = useState<Episode[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await fetchAllEpisodes();
    setData(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <div>Loading</div>;

  return (
    <>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {data?.map((ep) => (
              <EpisodeListItem key={ep.name} episode={ep} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
