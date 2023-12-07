#!/usr/bin/env node
import { getArgs } from './helpers/parse-args.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printWeather } from './services/log.service.js';
import { handleSettings } from './services/settings.service.js';

const initCLI = async () => {
    const args = getArgs(...process.argv);
    if (args.h) {
        return printHelp();
    }
    const settings = await handleSettings(args);
    const weather = await getWeather(settings);
    if (weather) printWeather(weather);
};

initCLI();
