const key = 'HyRhsOzRlEdmeleJ1DUBPj47sds64UCE';
const key2 = 'Y9HhkwuQLAnFmes64jgoU2FOAHXcuAG2';

const getWeather = async (id) => {
  const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1/'
  const query = `${id}?apikey=${key}`;

  const response = await fetch(baseUrl + query, {
    mode: 'cors'});
  const data = await response.json();
  return data[0];
}

const getCity = async (city) => {
  const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${city}`;
  const response = await fetch(baseUrl + query, { mode: "cors"});
  const data = await response.json();
  return data[0];
}

//sample
// getCity('berlin').then(data => getWeather(data.Key))
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

