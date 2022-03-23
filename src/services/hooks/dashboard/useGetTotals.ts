import { useQuery } from "react-query";
import { api } from "../../api";

type TotalsResponse = {
  totals: {
    label: string;
    total: number;
  }[];
}

async function getTotals(): Promise<TotalsResponse> {
  const { data } = await api.get<TotalsResponse>('/dashboard')

  return data; 
}

export function useGetTotals() {
  return useQuery(['totals'], () => getTotals(), {
    staleTime: 5000,
  });
}

