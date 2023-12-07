import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';
import { printError } from './log.service.js';

const filePath = join(homedir(), 'weather-settings.json');

const loadSettings = async () => {
    try {
        const file = await promises.readFile(filePath);
        if (file) {
            return JSON.parse(file.toString());
        }
    } catch {}
};

export const handleSettings = async (args) => {
    const settings = (await loadSettings()) ?? {};
    if (Object.keys(args).length) {
        if (args.s) {
            settings.city = args.s;
        }
        if (args.t) {
            settings.token = args.t;
        }
        try {
            promises.writeFile(filePath, JSON.stringify(settings));
        } catch (e) {
            printError(e);
        }
    }
    return settings;
};
