import { api } from './api';
import { Drink, DrinkResponse } from '@/types';

export const getCocktailById = async (id: number) => {
  const response = await api.get<Drink>('lookup.php?i=' + id);
  return response.data;
};

export const getCocktailsStart = async () => {
  const response = await api.get<DrinkResponse>('search.php?s=margarita');
  return response.data;
};

export const getCocktailsByName = async (name: string) => {
  const response = await api.get<DrinkResponse>('search.php?s=' + name);
  return response.data;
};

export const getCocktailsRandom = async () => {
  const response = await api.get<DrinkResponse>('random.php');
  return response.data;
};
