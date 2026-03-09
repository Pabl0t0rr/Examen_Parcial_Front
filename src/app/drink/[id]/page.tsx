'use client';

import { getCocktailById } from '@/lib/api/drinks';
import { Drink } from '@/types';
import { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import './page.css';

const getId = () => {
  const { id } = useParams();

  const router = useRouter();

  const [cocktail, setCocktail] = useState<Drink | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCocktailById(Number(id))
      .then((res: any) => {
        setCocktail(res.drinks[0]);
      })
      .catch((err: AxiosError) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const Ingredientes = [
    cocktail?.strIngredient1,
    cocktail?.strIngredient2,
    cocktail?.strIngredient3,
    cocktail?.strIngredient4,
    cocktail?.strIngredient5,
    cocktail?.strIngredient6,
    cocktail?.strIngredient7,
    cocktail?.strIngredient8,
    cocktail?.strIngredient9,
    cocktail?.strIngredient10,
    cocktail?.strIngredient11,
    cocktail?.strIngredient12,
    cocktail?.strIngredient13,
    cocktail?.strIngredient14,
    cocktail?.strIngredient15,
  ].filter((i) => i !== null);

  return (
    <div className="mainContainer">
      {!loading && !error && cocktail && (
        <>
          <img src={cocktail?.strDrinkThumb}></img>

          <div className="drinkDataContainer">
            <p>Nombre: {cocktail?.strDrink}</p>
            <p>Categoria: {cocktail?.strCategory}</p>
            <p>Alcoholico: {cocktail?.strAlcoholic}</p>
            <p>Vaso: {cocktail?.strGlass}</p>
            <p>Instrucciones Ingles: {cocktail?.strInstructions}</p>
            <p>Ingredientes: {Ingredientes.join(',')}</p>

            <button onClick={() => router.back()}>Volver</button>
          </div>
        </>
      )}

      {!cocktail && loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default getId;
