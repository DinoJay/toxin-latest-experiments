import { groups } from "./group";

const extractVars = (d, value, arr) => {
    const [k, ...rest] = arr;
    if (rest.length === 0) {
        d[k] = value;
    } else {
        d[k] = {};
        extractVars(d[k], value, rest);
    }
};
export default function deepVars(d) {

    const arg = d
    const nested = Object.keys(d).map((k) => {
        const res = {};
        extractVars(res, d[k], k.split('X'));
        return res;
    });
    const grs = groups(nested, (d) => Object.keys(d)[0])
        .map(([key, values]) => ({
            key,
            values
        }))
        .map((d) => {
            const values = d.values.map((d) => d[Object.keys(d)[0]]);
            if (d.values.length === 1) {
                return { [d.key]: d.values[0][Object.keys(d.values[0])[0]] };
            }

            const firstLevelGroups = groups(values, (d) => {
                return Object.keys(d)[0];
            }).map(([key, values]) => {
                // console.log('values', values);
                const vals = values.map((d) => d[Object.keys(d)[0]]);

                if (values.length === 1 && typeof values[0] === 'string') {
                    return { [d.key]: values[0] };
                }

                const objs = vals.filter((d) => typeof d === 'object');
                const strings = vals.filter((d) => typeof d === 'string');
                const grs = groups(objs, (d) => Object.keys(d)[0]);

                const grsVals = [
                    ...strings,
                    ...grs.map(([key, values]) => {
                        const vals = values.map((d) => d[Object.keys(d)[0]]);
                        // console.log('vals', vals[0], typeof vals[0]);
                        return {
                            //level 3
                            [key]:
                                vals.length === 1 && typeof vals[0] === 'string'
                                    ? vals[0]
                                    : vals.reduce((acc, cur) => ({ ...acc, ...cur }), {})
                        };
                    })
                ];



                // console.log('d.id', d)
                // if (grsVals.length === 1) console.log('grsVals', grsVals);

                return {
                    [key]: grsVals
                };
            });


            return {
                [d.key]: firstLevelGroups
                    .map((d) => {
                        const key = Object.keys(d)[0];
                        const value = d[key];
                        // if (arg.id === 'http://toxin.vub.be/resource/test/repeated-dose-toxicity/oecd_408/72') {
                        //     console.log('key', d[key])
                        // }
                        return {
                            [key]: value.every(v => typeof v === 'object') ? value
                                .reduce((acc, cur) => ({ ...acc, ...cur }), {}) : value[0]
                        };
                    })
                    .reduce((acc, cur) => ({ ...acc, ...cur }), {})
            };
        })
        .reduce((acc, cur) => ({ ...acc, ...cur }), {});




    return grs;
}