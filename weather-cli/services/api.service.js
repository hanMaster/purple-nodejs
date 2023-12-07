import axios from 'axios';
import { printError } from './log.service.js';

export const getWeather = async (settings) => {
    if (!settings.city) {
        printError('Не выбран город, укажите его с помщью -s [CITY]');
        return;
    }
    if (!settings.token) {
        printError('Не задан api_key, укажите его с помщью -t [API_KEY]');
        return;
    }
    try {
        const { data } = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: settings.city,
                appid: settings.token,
                lang: 'ru',
                units: 'metric',
            },
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
