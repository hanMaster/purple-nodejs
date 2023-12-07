import axios from 'axios';
import { printError } from './log.service.js';

export const getWeather = async (settings) => {
    if (!settings.city) {
        return printError('Не выбран город, укажите его с помщью -s [CITY]');
    }
    if (!settings.token) {
        return printError('Не задан api_key, укажите его с помщью -t [API_KEY]');
    }

    try {
        const { data } = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: settings.city,
                appid: settings.token,
                lang: 'ru',
                units: 'metric'
            }
        });
        return data;
    } catch (e) {
        if (e.response?.status === 404) {
            printError('Неверно указан город');
        } else if (e.response?.status === 401) {
            printError('Неверно указан токен');
        } else {
            printError('Что-то пошло не так, попробуйте повтороить запрос позже');
        }
    }
};

export const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '☀️';
        case '02':
            return '🌤️';
        case '03':
            return '☁️';
        case '04':
            return '☁️';
        case '09':
            return '🌧️';
        case '10':
            return '🌦️';
        case '11':
            return '🌩️';
        case '13':
            return '❄️';
        case '50':
            return '🌫️';
        default:
            return '';
    }
};
