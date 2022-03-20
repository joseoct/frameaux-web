import { parseCookies } from 'nookies';
import { useQuery } from 'react-query';
import { api } from '../../api';

type Technology = {
  id: string;
  name: string;
  technology_image: string;
}

type ContentCretorTechnology = {
  technology: Technology;
};

async function getTechnologiesByContentCreator(
  content_creator_id: string,
): Promise<ContentCretorTechnology[]> {
  const { data } = await api.get<ContentCretorTechnology[]>(
    '/content-creators-technologies', {
      params: {
        content_creator_id,
      }
    }
  );

  return data;
}

export function useGetTechnologiesByContentCreator() {
  const { 'fa.user_id': id  } = parseCookies();

  return useQuery(
    ['content-creator-technologies'],
    () => getTechnologiesByContentCreator(id),
  );
}
