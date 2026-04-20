import { MockResult } from './categories';

export const compareProducts = async (query: string): Promise<MockResult[]> => {
  const res = await fetch(`/api/compare/product?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const compareTransport = async (pickup: string, dropoff: string): Promise<MockResult[]> => {
  const res = await fetch(`/api/compare/transport?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}`);
  if (!res.ok) throw new Error('Failed to fetch transport estimates');
  return res.json();
};
