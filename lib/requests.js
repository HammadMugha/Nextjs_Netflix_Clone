const key = process.env.NEXT_PUBLIC_API_KEY

const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
    requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=true`,
    requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
  };


  export const getMovieDetailsById = async (id) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWE0NTRkNmI2YmU2Y2M5MTBhZjhiN2E2Y2U4MGFlYSIsInN1YiI6IjY2MmJmYzIxZDRmZTA0MDEyODRmZDQ0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LafH2bdWQJbXx-pGnXgAH5x0ebKSOl7vfdjAcnzaj-4'
        }
      };
      
     const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
       
      const data = await res.json();
  
      return data && data.results;
    } catch (e) {
      console.log(e);
    }
  };
  

  //search 
  export const getTVorMovieSearchResults = async (query) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${key}`,
        {
          method: "GET",
        }
      );
  
      const data = await res.json();
  
      return data && data.results;
    } catch (e) {
      console.log(e);
    }
  };
  export default requests