import { authenticatedFetch } from "./auth";
import { WebAuth, defaultHeaders } from "./http";

export async function fetchChampionshipInfo(baseUrl: string, auth: WebAuth, championshipId: string) {
  const url = new URL(`/championship/${championshipId}/export`, baseUrl);

  const { res, cookie } = await authenticatedFetch(
    url,
    {
      method: 'GET',
      redirect: 'manual',
      headers: defaultHeaders
    },
    auth
  );

  if (res.status !== 200) {
    throw Error('Failed to find a championship with the specified ID.');
  }

  const info: ChampionshipInfo = await res.json();
  return { info, cookie };
}

export interface ChampionshipInfo {
  ID: string;
  Name: string;
}
