import chalk from 'chalk';
import { getIcon } from './api.service.js';

export const printError = (error) => {
    console.log(chalk.bgRed(' ERROR '), error);
};

export const printSuccess = (msg) => {
    console.log(chalk.bgBlue(' SUCCESS '), msg);
};

export const printHelp = () => {
    console.log(
        `${chalk.bgCyan(' HELP ')}  Без параметров  - вывод погоды
        -h              - вывод этой справки
        -s [CITY]       - установить город
        -t [API_KEY]    - установить токен
        `
    );
};

export const printWeather = (weather) => {
    console.log(
        `\n${chalk.bgGreen(' Погода ')} ${weather.name}: ${getIcon(weather.weather[0].icon)}  ${
            weather.weather[0].description
        }`
    );
    console.log(`Температура: ${weather.main.temp}℃ (ощущается как: ${weather.main.feels_like}℃)`);
    console.log(`Влажность: ${weather.main.humidity}%`);
    console.log(`Скорость ветра: ${weather.wind.speed} м/с`);
    console.log(
        `Восход: ${new Date(weather.sys.sunrise * 1000).toLocaleTimeString()} Закат: ${new Date(
            weather.sys.sunset * 1000
        ).toLocaleTimeString()}\n`
    );
};
