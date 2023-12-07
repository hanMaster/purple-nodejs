#!/usr/bin/env node
import { getArgs } from './helpers/parse-args.js';

const initCLI = () => {
    const args = getArgs(...process.argv);
    console.log(args);
};

initCLI();
