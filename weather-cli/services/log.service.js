import chalk from 'chalk';

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
    console.log(weather.weather.main);
};
