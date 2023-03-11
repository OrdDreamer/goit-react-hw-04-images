import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    per_page: 12,
    key: '11787817-40db1f003b43fc092494dffec',
  },
});

export const getImages = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
      image_type: 'photo',
      orientation: 'horizontal',
    },
  });
  return data;
};
