import axios from 'axios';

export const postPetDetails = async (data: FormData) => {
  const response = await axios.post('https://reqres.in/api/users', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ' x-api-key': 'reqres-free-v1',
    },
  });
  return response.data;
};
