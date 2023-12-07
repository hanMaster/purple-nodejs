export const getArgs = (...args) => {
    const res = {};
    const filtered = args.slice(2);

    if (filtered.includes('-h')) {
        res.h = true;
        return res;
    }

    filtered.forEach((param, idx) => {
        if (param === '-s' || param === '-t') {
            const next = filtered[idx + 1];
            if (next && !next.startsWith('-')) {
                res[param.substring(1)] = next;
            }
        }
    });

    if (filtered.length && Object.keys(res).length === 0) {
        res.h = true;
    }

    return res;
};
