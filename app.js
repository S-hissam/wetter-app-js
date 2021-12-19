const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = ({ cityDets, wetter }) => {
  // update details temp
  details.innerHTML = `
    <div class="text-muted text-uppercase text-center details">
      <h5 class="my-3">${cityDets.EnglishName}</h5>
      <div class="my-3">${wetter.WeatherText}</div>
      <div class="display-4 my-4">
        <span>${wetter.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
      </div>
    </div>
  `
  //remove the display none class
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
  //icon update
  const iconSrc = `img/icons/${wetter.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  //night and day
  let timeSrc = wetter.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  // if (wetter.IsDayTime){
  //   timeSrc = 'img/day.svg';
  // } else {
  //   timeSrc = 'img/night.svg';
  // }
  time.setAttribute('src', timeSrc);

}

const updateCity = async city => {
  const cityDets = await getCity(city);
  const wetter = await getWeather(cityDets.Key);

  return {
    cityDets,
    wetter
  };
}

cityForm.addEventListener('submit', e => {
  e.preventDefault();

  //get input from ui
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the ui with new city
  updateCity(city).then(data => updateUI(data)).catch(err => console.log(err))
  //localstorage
  localStorage.setItem('city', city);

})

if (localStorage.getItem('city')) {
  updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data)).catch(err => console.log(err));
}
