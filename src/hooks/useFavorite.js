import { useState } from 'react';

export default function useFavorite (item) {
  let currentValue = sessionStorage.getItem(item);
  currentValue = currentValue === 'true' ? true : false;
  const [isFavorite, switchIsFavorite] = useState(currentValue);

  // persist this value on session storage API
  sessionStorage.setItem(item, isFavorite);

  return [isFavorite, () => switchIsFavorite(!isFavorite)];
}