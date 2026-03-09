'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Drink } from '@/types';
import { getCocktailsRandom, getCocktailsStart } from '@/lib/api/drinks';
import { AxiosError } from 'axios';
import Coktail from './component/coktail';

import './page.css';

const Home = () => {
  const router = useRouter();

  const [palabra, setPalabra] = useState<string>('');
  const [palabraFinal, setPalabraFinal] = useState<string>('');

  const [drink, setDrink] = useState<Drink[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  //Para tener unos coktails (margarita) al emmpezar
  useEffect(() => {
    getCocktailsStart()
      .then((data) => {
        setDrink(data.drinks);
      })
      .catch((err: AxiosError) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //Para crear el aleatorio
  const randomDrink = () => {
    getCocktailsRandom()
      .then((d) => {
        setDrink(d.drinks);
        router.push('/drink/' + d.drinks[0].idDrink);
      })
      .catch((err: AxiosError) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="mainContainer">
        <h1>Bebidas</h1>
        <button onClick={randomDrink}>Dime algo bonito</button>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}

      <div className="cocktailContainer">
        {!loading &&
          !error &&
          drink.length > 0 &&
          drink.map((d) => <Coktail key={d.idDrink} drink={d}></Coktail>)}
      </div>
    </div>
  );
};

export default Home;
