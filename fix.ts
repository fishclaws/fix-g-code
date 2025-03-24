import * as fs from 'fs';

function replaceAll(str: string, find: string, replace: string) {
    return str.split(find).join(replace);
}

async function fix(filename: string) {
    const contents = fs.readFileSync(filename, 'utf8');

    let fixed = replaceAll(contents, 'P E N D O W N', 'PENDOWN');
    fixed = replaceAll(fixed, 'P E N U P', 'PEN_UP ');
    fixed = replaceAll(fixed, 'P R I N T S T A R T', 'PRINTSTART');
    fixed = replaceAll(fixed, 'P R I N T E N D', 'PRINTEND');

    const newFilename = filename.split('.')

    fs.writeFileSync(newFilename[0] + '_fixed.' + newFilename[1], fixed);
}

fix(process.argv[2]);