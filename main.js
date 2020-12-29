'use strict'

const input = document.querySelector('input[type=text]'),
  button = document.querySelector('svg'),
  info = document.querySelector('.info'),
  infoTitle = document.querySelector('.info__title'),
  infoItems = document.querySelectorAll('.info__content-item');

const REG_EXP = /^[A-Z]{1}[a-z]+$/,
  API_KEY = '6b90412c51dc18509be1b202fe6e8f3c';


button.addEventListener('click', () => {
  if (input.value.match(REG_EXP)) {
    const city = input.value;
    //
    let request = new XMLHttpRequest();
    request.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${API_KEY}`);

    request.addEventListener('load', () => {
      if (request.status == 200) {
        const resp = JSON.parse(request.response);

        info.style.display = 'flex';
        infoTitle.textContent = resp.name;
        const desc = resp.weather[0].description;
        infoItems[0].textContent = desc[0].toUpperCase() + desc.slice(1);
        infoItems[1].textContent = 'Температура(℃): ' + Math.round(resp.main.temp);
        infoItems[2].textContent = 'По ощущению(℃): ' + Math.round(resp.main.feels_like);
        infoItems[3].textContent = 'Атмосферное давление(мм.рт.ст): ' + Math.round(resp.main.pressure * 0.750062);
        infoItems[4].textContent = 'Облачность(%): ' + Math.round(resp.clouds.all);
        infoItems[5].textContent = 'Влажность(%): ' + Math.round(resp.main.humidity);
        
        let dir = "";
        const directions = ['Западный', 'Юго-западный', 'Южный', 'Юго-Восточный', 'Восточный', 'Северо-восточный', 'Северный', 'Северо-западный'];
      
        //определение по градусам направление ветра
        for (let i = 1; i <= 16; ++i) {
          if ((Math.round(resp.wind.deg) <= 22.5 * i) && (i != 16)) {
              dir = directions[Math.trunc(i / 2)];
              break;
          } else if (i == 16) {
            dir = directions[0];
            console.log(0);
          }
        }

        infoItems[6].textContent = 'Направление ветра: ' + dir;
        infoItems[7].textContent = 'Скорость ветра(м/с): ' + Math.round(resp.wind.speed);
      } else {
        alert('Такой город не найден в нашей базе');
      }
    });
    request.send();
    //
  } else if (!input.value.match(REG_EXP) && (input.value)) {
    alert('Введите город на английском');
  } else if (!input.value) {
    alert('Введите город');
  }
})  

