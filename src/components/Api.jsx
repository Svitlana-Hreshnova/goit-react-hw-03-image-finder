const fetchImages = (page, query) => {
  const apiKey = '40298326-3542dba9bdb0915da3eae5d6c';
  const apiUrl = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => ({
      images: data.hits,
      nextPage: page + 1,
      hasMore: page < Math.ceil(data.totalHits / 12),
    }))
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error;
    });
};

export default fetchImages;
