import { parseCookies } from 'nookies';
import { useQuery } from 'react-query';
import { api } from '../../api';

type Technology = {
  id: string;
  name: string;
  technology_image: string;
};

async function getTechnologiesByUser(): Promise<Technology[]> {
  const { data } = await api.get<Technology[]>('/user/technologies');

  return data;
}

export function useGetTechnologiesByUser() {
  return useQuery(['content-creator-technologies'], () =>
    getTechnologiesByUser(),
  );
}
