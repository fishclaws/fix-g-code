import * as fs from 'fs';

function replaceAll(str: string, find: string, replace: string) {
    return str.split(find).join(replace);
}

async function fix(filename: string) {
    const contents = fs.readFileSync(filename, 'utf8');

    let fixed = replaceAll(contents, 'P E N D O W N', '\nPEN_DOWN');
    fixed = replaceAll(fixed, 'PENUP', 'PEN_UP\n');
    fixed = replaceAll(fixed, 'P E N U P', 'PEN_UP\n');
    fixed = replaceAll(fixed, 'P R I N T S T A R T', 'PRINT_START');
    fixed = replaceAll(fixed, 'P R I N T E N D', '\nPRINT_END');

    const index = fixed.lastIndexOf('PEN_UP')
    fixed = fixed.slice(0, index) + '\n' + fixed.slice(index + 1);

    const newFilename = filename.split('.')

    fs.writeFileSync(newFilename[0] + '_fixed.' + newFilename[1], fixed);
}

fix(process.argv[2]);