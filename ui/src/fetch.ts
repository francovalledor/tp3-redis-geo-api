import { Episode } from "./types";

const HOST = `http://localhost:3000`;

const BASE_URL = `${HOST}/the-mandalorian/`;

const fetchJson = async <T>(...params: Parameters<typeof fetch>): Promise<T> => fetch(...params).then(res => res.json())

export const fetchAllEpisodes = () => fetchJson<Episode[]>(BASE_URL);

export const fetchEpisodeDetails = (season: number, episode: number) => fetchJson<Episode>(`${BASE_URL}/episode?season=${season}&episode=${episode}`);

export const reserve = (season: number, episode: number) => fetch(`${BASE_URL}/reserve?season=${season}&episode=${episode}`, {method: "POST"});

export const pay = (season: number, episode: number) => fetch(`${BASE_URL}/pay?season=${season}&episode=${episode}`, {method: "POST"});
