import { Button } from "react-bootstrap";
import { Episode, EPISODE_STATUS } from "../types";
import { useEffect, useState } from "react";
import { fetchEpisodeDetails, pay, reserve } from "../fetch";

interface Props {
  episode: Episode;
}

const labelByStatus = {
  [EPISODE_STATUS.AVAILABLE]: "Reserve",
  [EPISODE_STATUS.RENTED]: "Rented",
  [EPISODE_STATUS.RESERVED]: "Pay",
};

const actionByStatus = {
  [EPISODE_STATUS.AVAILABLE]: reserve,
  [EPISODE_STATUS.RESERVED]: pay,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [EPISODE_STATUS.RENTED]: async (season: number, episode: number) => {},
}

export const ActionButton: React.FC<Props> = ({ episode }) => {
  const [status, setStatus] = useState<EPISODE_STATUS>(episode.status);

  const runAction = () => actionByStatus[status](episode.season, episode.episode);

  const handleClick = async () => {
    await runAction();
    const newDetails = await fetchEpisodeDetails(episode.season, episode.episode);

    setStatus(newDetails.status);
  };

  const buttonLabel = labelByStatus[status];

  return (
    <Button disabled={status === EPISODE_STATUS.RENTED} onClick={handleClick}>
      {buttonLabel}
    </Button>
  );
};
