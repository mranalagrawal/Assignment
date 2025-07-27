import axios from 'axios';

export const fetchRandomDogImage = async (): Promise<string> => {
  const response = await axios.get('https://dog.ceo/api/breeds/image/random');
  return response.data.message;
};
