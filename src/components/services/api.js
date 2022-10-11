import axios from 'axios';
const options = {
  key: '29776170-5db4a15cb76834f05dd09f0ed',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};
const { key, per_page, image_type, orientation } = options;
axios.defaults.baseURL = 'https://pixabay.com/api/';
export const GetImages = async (searchQuery, page) => {
  const response = await axios.get(
    `?key=${key}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}&image_type=${image_type}&orientation=${orientation}`
  );
  // return response.data.hits;
  return response;
};
export const GetMaterialToServer = async () => {
  const response = await axios.get('/materials');
  return response.data;
};
