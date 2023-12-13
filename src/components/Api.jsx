import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const apiKey = '40298326-3542dba9bdb0915da3eae5d6c';
const fetchImages = async (query, page) => {
  try {
    const { data } = await axios.get(
      `?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};
export default fetchImages;
