'use client';

import { Drink } from '@/types/drink';
import { useRouter } from 'next/navigation';

import './coktail.css';

type Props = {
  drink: Drink;
};
const Coktail = ({ drink }: Props) => {
  const router = useRouter();

  return (
    <div className="drinkContainer">
      <button
        onClick={() => {
          router.push('/drink/' + drink.idDrink);
        }}
      >
        {drink?.strDrinkThumb && <img src={drink.strDrinkThumb}></img>}
        <p>{drink.strDrink}</p>
      </button>
    </div>
  );
};

export default Coktail;
