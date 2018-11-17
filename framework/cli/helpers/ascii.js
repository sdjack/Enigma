/**
*
* ASCII ART STRING CONVERTER
* REGEX GRAY CHARS: /([\\/|_\s]+)/g
* REGEX COLOR CHARS: /(█+)/g
*
*/
var chalk = require('chalk'),
LINE_DIVIDER = chalk.black('|') + "\n",
FONT_OBJECT = {},
charData;

let ascii_character = function (strArray) {
  for (var x = 1; x <= 9; x++) {
    var index = (x - 1);
    var line = (!strArray[index]) ? "\n" : strArray[index];
    this["line"+x] = line;
  }
};

charData = [
"      ",
"      ",
"      ",
"      ",
"      ",
"      ",
"      ",
"      ",
"      "];

FONT_OBJECT.u32 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __ ",
"/ ██|",
"| ██|",
"| ██|",
"| ██|",
"|__/ ",
"  __ ",
"/ ██|",
"|__/ "];

FONT_OBJECT.u33 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __  __ ",
"/ ██|/██|",
"| ██| ██|",
"| ██| ██|",
"|__/|__/ ",
"         ",
"         ",
"         ",
"         "];

FONT_OBJECT.u34 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"    __  __   ",
"  / ██ /██|  ",
"  / ██ /██|  ",
"/ ██████████|",
"|   ██  ██_/ ",
"/ ██████████|",
"|_  ██  ██_/ ",
"  | ██| ██|  ",
"  |__/|__/   "];

FONT_OBJECT.u35 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"     __   ",
"   / ██|  ",
" / ██████|",
"| ██  \\__/",
"|  ██████|",
" \\____ ██|",
"| ██████/ ",
" \\_ ██_/  ",
"   \\__/   "];

FONT_OBJECT.u36 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __    __ ",
"/ ██  / ██|",
"|__/ / ██/ ",
"    / ██/  ",
"   / ██/   ",
"  / ██/    ",
" / ██/     ",
"/ ██/ / ██|",
"|__/  |__/ "];

FONT_OBJECT.u37 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"   ___     ",
" / ███|    ",
"/ ██ ██|   ",
"|  ███|    ",
"/ ██ ██/██|",
"| ██  ██_/ ",
"| ██ \\ ██| ",
"|  ████/██|",
" \\____/\\_/  "];

FONT_OBJECT.u38 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __ ",
"/ ██|",
"| █/ ",
"|_/  ",
"     ",
"     ",
"     ",
"     ",
"     "];

FONT_OBJECT.u39 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"    ___  ",
"  / ███| ",
" / ██ _/ ",
"/ ██ /   ",
"| ██|    ",
"| ██|    ",
"|  ██|   ",
" \\  ███| ",
"  \\___/  "];

FONT_OBJECT.u40 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  ___    ",
"/ ███|   ",
"|_  ██|  ",
"  \\  ██| ",
"   | ██| ",
"   | ██| ",
"  / ██/  ",
"/ ███ /  ",
"|___/    "];

FONT_OBJECT.u41 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"          ",
"   __ __  ",
" / ██/██| ",
" |  ███ / ",
"/ ███████|",
"|__ ███_/ ",
" / ██ ██| ",
" |__/__/  ",
"          "];

FONT_OBJECT.u42 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"           ",
"     __    ",
"   / ██|   ",
"   | ██|   ",
"/ ████████|",
"|__  ██__/ ",
"   | ██|   ",
"   |__/    ",
"           "];

FONT_OBJECT.u43 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"     ",
"     ",
"     ",
"     ",
"     ",
"  __ ",
"/ ██|",
"| █/ ",
"|_/  "];

FONT_OBJECT.u44 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"         ",
"         ",
"         ",
"  ______ ",
"/ ██████|",
"|______/ ",
"         ",
"         ",
"         "];

FONT_OBJECT.u45 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"     ",
"     ",
"     ",
"     ",
"     ",
"     ",
"  __ ",
"/ ██|",
"|__/ "];

FONT_OBJECT.u46 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"           ",
"      / ██|",
"     / ██/ ",
"    / ██/  ",
"   / ██/   ",
"  / ██/    ",
" / ██/     ",
"/ ██/      ",
"|__/       "];

FONT_OBJECT.u47 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"   ______  ",
" / ██████| ",
"/ ███_  ██|",
"| ████ \\██|",
"| ██ ██ ██|",
"| ██ \\████|",
"| ██ \\ ███|",
"|  ██████/ ",
" \\______/  "];

FONT_OBJECT.u48 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"    __   ",
"  / ██|  ",
"/ ████|  ",
"|_  ██|  ",
"  | ██|  ",
"  | ██|  ",
"  | ██|  ",
"/ ██████|",
"|______/ "];

FONT_OBJECT.u49 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"   ______  ",
" / ██████| ",
"/ ██__  ██|",
"|__/  \\ ██|",
" / ██████/ ",
"/ ██____/  ",
"| ██|      ",
"| ████████|",
"|________/ "];

FONT_OBJECT.u50 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"   ______  ",
" / ██████| ",
"/ ██__  ██|",
"|__/  \\ ██|",
"  / █████/ ",
"  |___  ██|",
"/ ██  \\ ██|",
"|  ██████/ ",
" \\______/  "];

FONT_OBJECT.u51 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __    __ ",
"/ ██  / ██|",
"| ██  | ██|",
"| ██  | ██|",
"| ████████|",
"|_____  ██|",
"      | ██|",
"      | ██|",
"      |__/ "];

FONT_OBJECT.u52 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  _______  ",
"/ ███████| ",
"| ██____/  ",
"| ██       ",
"| ███████| ",
"|_____  ██|",
"/ ██  \\ ██|",
"|  ██████/ ",
" \\______/  "];

FONT_OBJECT.u53 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"   ______  ",
" / ██████| ",
"/ ██__  ██|",
"| ██  \\__/ ",
"| ███████| ",
"| ██__  ██|",
"| ██  \\ ██|",
"|  ██████/ ",
" \\______/  "];

FONT_OBJECT.u54 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  ________ ",
"/ ████████|",
"|_____ ██/ ",
"    / ██/  ",
"   / ██/   ",
"  / ██/    ",
" / ██/     ",
"/ ██/      ",
"|__/       "];

FONT_OBJECT.u55 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"   ______  ",
" / ██████| ",
"/ ██__  ██|",
"| ██  \\ ██|",
"|  ██████/ ",
" >██__  ██|",
"| ██  \\ ██|",
"|  ██████/ ",
" \\______/  "];

FONT_OBJECT.u56 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"   ______  ",
" / ██████| ",
"/ ██__  ██|",
"| ██  \\ ██|",
"|  ███████|",
" \\____  ██|",
"/ ██  \\ ██|",
"|  ██████/ ",
" \\______/  "];

FONT_OBJECT.u57 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"     ",
"  __ ",
"/ ██|",
"|__/ ",
"  __ ",
"/ ██|",
"|__/ ",
"     ",
"     "];

FONT_OBJECT.u58 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"     ",
"  __ ",
"/ ██|",
"|__/ ",
"  __ ",
"/ ██|",
"| █/ ",
"|_/  ",
"     "];

FONT_OBJECT.u59 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"     __ ",
"   / ██|",
"  / ██/ ",
" / ██/  ",
"| ██/   ",
" \\ ██|  ",
"  \\ ██| ",
"   \\ ██|",
"    \\__/"];

FONT_OBJECT.u60 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"       ",
"       ",
"  ____ ",
"/ ████|",
"|____/ ",
"/ ████|",
"|____/ ",
"       ",
"       "];

FONT_OBJECT.u61 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __    ",
"| ██|   ",
" \\ ██|  ",
"  \\ ██| ",
"   \\ ██|",
"  / ██/ ",
" / ██/  ",
"/ ██/   ",
"\\__/    "];

FONT_OBJECT.u62 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"   ____  ",
" / ████| ",
"/ ██  ██|",
"|__/\\ ██|",
"   / ██/ ",
"  / ██ / ",
"  |__/   ",
"  / ██|  ",
"  |__/   "];

FONT_OBJECT.u63 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"    / ██████|    ",
"  / ███__  ███|  ",
" / ██_/  \\_  ██| ",
"/ ██//  ████  ██|",
"| ██|  ████████/ ",
"|  ██\\________/  ",
" \\  ███  / ███|  ",
"  \\_  ██████_/   ",
"    \\______/     "];

FONT_OBJECT.u64 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"   ______  ",
" / ██████| ",
"/ ██|_  ██|",
"| ██|_\\ ██|",
"| ████████|",
"| ██|_  ██|",
"| ██| | ██|",
"| ██| | ██|",
"|__/  |__/ "];

FONT_OBJECT.u65 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  _______  ",
"/ ███████| ",
"| ██|_  ██|",
"| ██|_\\ ██|",
"| ███████| ",
"| ██|_  ██|",
"| ██|_\\ ██|",
"| ███████/ ",
"|_______/  "];

FONT_OBJECT.u66 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"   ______  ",
" / ██████| ",
"/ ██|_  ██|",
"| ██| \\__/ ",
"| ██|      ",
"| ██|   __ ",
"| ██|__/██|",
"|  ██████/ ",
" \\______/  "];

FONT_OBJECT.u67 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  _______  ",
"/ ███████| ",
"| ██|_  ██|",
"| ██| \\ ██|",
"| ██| | ██|",
"| ██| | ██|",
"| ██|_| ██|",
"| ███████/ ",
"|_______/  "];

FONT_OBJECT.u68 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  ________ ",
"/ ████████|",
"| ██|____/ ",
"| ██|__    ",
"| █████|   ",
"| ██|_/    ",
"| ██|_____ ",
"| ████████|",
"|________/ "];

FONT_OBJECT.u69 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  ________ ",
"/ ████████|",
"| ██|____/ ",
"| ██|__    ",
"| █████|   ",
"| ██|_/    ",
"| ██|      ",
"| ██|      ",
"|__/       "];

FONT_OBJECT.u70 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"   ______  ",
" / ██████| ",
"/ ██|_  ██|",
"| ██| \\__/ ",
"| ██|/████|",
"| ██|_  ██|",
"| ██|_\\ ██|",
"|  ██████/ ",
" \\______/  "];

FONT_OBJECT.u71 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __    __ ",
"/ ██| / ██|",
"| ██| | ██|",
"| ██|_| ██|",
"| ████████|",
"| ██|_  ██|",
"| ██| | ██|",
"| ██| | ██|",
"|__/  |__/ "];

FONT_OBJECT.u72 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  ______ ",
"/ ██████|",
"|_  ██_/ ",
"  | ██|  ",
"  | ██|  ",
"  | ██|  ",
"  | ██|  ",
"/ ██████|",
"|______/ "];

FONT_OBJECT.u73 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"     _____ ",
"   / █████|",
"   |__  ██|",
"      | ██|",
"  __  | ██|",
"/ ██| | ██|",
"| ██| | ██|",
"|  ██████/ ",
" \\______/  "];

FONT_OBJECT.u74 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __    __ ",
"/ ██| / ██|",
"| ██|/ ██/ ",
"| ██| ██/  ",
"| █████/   ",
"| ██| ██|  ",
"| ██|\\ ██| ",
"| ██| \\ ██|",
"|__/   \\__/"];

FONT_OBJECT.u75 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __       ",
"/ ██|      ",
"| ██|      ",
"| ██|      ",
"| ██|      ",
"| ██|      ",
"| ██|_____ ",
"| ████████|",
"|________/ "];

FONT_OBJECT.u76 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __       __ ",
"/ ██|    / ██|",
"| ███|  / ███|",
"| ████|/ ████|",
"| ██|██ ██ ██|",
"| ██| ███| ██|",
"| ██|\\ █ | ██|",
"| ██|\\/  | ██|",
"|__/     |__/ "];

FONT_OBJECT.u77 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __    __ ",
"/ ██| / ██|",
"| ███|| ██|",
"| ████| ██|",
"| ██|██ ██|",
"| ██| ████|",
"| ██|\\ ███|",
"| ██|\\  ██|",
"|__/  \\__/ "];

FONT_OBJECT.u78 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"   ______  ",
" / ██████| ",
"/ ██|_  ██|",
"| ██| \\ ██|",
"| ██| | ██|",
"| ██| | ██|",
"| ██|_| ██|",
"|  ██████/ ",
" \\______/  "];

FONT_OBJECT.u79 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  _______  ",
"/ ███████| ",
"| ██|_  ██|",
"| ██|_\\ ██|",
"| ███████/ ",
"| ██|___/  ",
"| ██|      ",
"| ██|      ",
"|__/       "];

FONT_OBJECT.u80 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"   ______  ",
" / ██████| ",
"/ ██|_  ██|",
"| ██| \\ ██|",
"| ██| | ██|",
"| ██| | ██|",
"| ██/██ ██|",
"|  ██████/ ",
" \\____ ███|",
"      \\__/ "];

FONT_OBJECT.u81 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  _______  ",
"/ ███████| ",
"| ██|_  ██|",
"| ██|_\\ ██|",
"| ███████/ ",
"| ██|_  ██|",
"| ██| \\ ██|",
"| ██| | ██|",
"|__/  |__/ "];

FONT_OBJECT.u82 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"   ______  ",
" / ██████| ",
"/ ██|_  ██|",
"| ██|__\\__/",
"|  ██████| ",
" \\____  ██|",
"/ ██|_\\ ██|",
"|  ██████/ ",
" \\______/  "];

FONT_OBJECT.u83 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  ________ ",
"/ ████████|",
"|__  ██__/ ",
"   | ██|   ",
"   | ██|   ",
"   | ██|   ",
"   | ██|   ",
"   | ██|   ",
"   |__/    "];

FONT_OBJECT.u84 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __    __ ",
"/ ██| / ██|",
"| ██| | ██|",
"| ██| | ██|",
"| ██| | ██|",
"| ██| | ██|",
"| ██| | ██|",
"|  ██████/ ",
" \\______/  "];

FONT_OBJECT.u85 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __     __ ",
"/ ██|  / ██|",
"| ██|  | ██|",
"| ██|  | ██|",
"|  ██|/ ██/ ",
" \\  ██ ██/  ",
"  \\  ███/   ",
"   \\  █/    ",
"    \\_/     "];

FONT_OBJECT.u86 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __       __ ",
"/ ██|    / ██|",
"| ██| /█ | ██|",
"| ██|/███| ██|",
"| ██/██ ██ ██|",
"| ████_  ████|",
"| ███ /\\  ███|",
"| ██ /  \\  ██|",
"|__/     \\__/ "];

FONT_OBJECT.u87 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __    __ ",
"/ ██| / ██|",
"| ██| / ██|",
"|  ██| ██/ ",
" \\  ████/  ",
" / ██| ██| ",
"/ ██/\\  ██|",
"| ██| | ██|",
"|__/  |__/ "];

FONT_OBJECT.u88 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __      __ ",
"/ ██|   / ██|",
"|  ██| / ██/ ",
" \\  ██| ██/  ",
"  \\  ████/   ",
"   \\  ██/    ",
"    | ██|    ",
"    | ██|    ",
"    |__/     "];

FONT_OBJECT.u89 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  ________ ",
"/ ████████|",
"|_____ ██| ",
"    / ██/  ",
"   / ██/   ",
"  / ██/    ",
" / ██/     ",
"/ ████████|",
"|________/ "];

FONT_OBJECT.u90 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  ____ ",
"/ ████|",
"| ██_/ ",
"| ██|  ",
"| ██|  ",
"| ██|  ",
"| ██|  ",
"| ████|",
"|____/ "];

FONT_OBJECT.u91 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __        ",
"/ ██|       ",
"\\  ██|      ",
" \\  ██|     ",
"  \\  ██|    ",
"   \\  ██|   ",
"    \\  ██|  ",
"     \\  ██| ",
"      \\__/  "];

FONT_OBJECT.u92 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  ____ ",
"/ ████|",
"|_  ██|",
"  | ██|",
"  | ██|",
"  | ██|",
"  | ██|",
"/ ████|",
"|____/ "];

FONT_OBJECT.u93 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"     _    ",
"   / █|   ",
"  / ███|  ",
" / ██ ██| ",
"/ ██|  ██|",
"|__/ \\__/ ",
"          ",
"          ",
"          "];

FONT_OBJECT.u94 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"          ",
"          ",
"          ",
"          ",
"          ",
"          ",
"  _______ ",
"/ ███████|",
"|_______/ "];

FONT_OBJECT.u95 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __ ",
"/ ██|",
"| █/ ",
"|_/  ",
"     ",
"     ",
"     ",
"     ",
"     "];

FONT_OBJECT.u96 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"           ",
"           ",
"   ______  ",
" / ██████| ",
" |____  ██|",
" / ███████|",
"/ ██__  ██|",
"|  ███████|",
" \\_______/ "];

FONT_OBJECT.u97 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __        ",
"/ ██        ",
"| ██        ",
"| ███████|  ",
"| ██__  ██| ",
"| ██  \\ ██| ",
"| ██  | ██| ",
"| ███████/  ",
"|_______/   "];

FONT_OBJECT.u98 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"           ",
"           ",
"   _______ ",
" / ███████|",
"/ ██_____/ ",
"| ██       ",
"| ██       ",
"|  ███████|",
" \\_______/ "];

FONT_OBJECT.u99 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"        __ ",
"      / ██|",
"      | ██|",
" / ███████|",
"/ ██__  ██|",
"| ██  | ██|",
"| ██  | ██|",
"|  ███████|",
" \\_______/ "];

FONT_OBJECT.u100 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"           ",
"           ",
"   ______  ",
" / ██████| ",
"/ ██__  ██|",
"| ████████|",
"| ██_____/ ",
"|  ███████|",
" \\_______/ "];

FONT_OBJECT.u101 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"   ______  ",
" / ██████| ",
"/ ██__  ██|",
"| ██  \\__/ ",
"| ████|    ",
"| ██_/     ",
"| ██       ",
"| ██       ",
"|__/       "];

FONT_OBJECT.u102 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
" / ██████| ",
"/ ██__  ██|",
"| ██  \\ ██|",
"| ██  | ██|",
"|  ███████|",
" \\____  ██|",
"/ ██  \\ ██|",
"|  ██████/ ",
" \\______/  "];

FONT_OBJECT.u103 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __       ",
"/ ██       ",
"| ██       ",
"| ███████| ",
"| ██__  ██|",
"| ██  \\ ██|",
"| ██  | ██|",
"| ██  | ██|",
"|__/  |__/ "];

FONT_OBJECT.u104 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __ ",
"/ ██|",
"|__/ ",
"/ ██|",
"| ██|",
"| ██|",
"| ██|",
"| ██|",
"|__/ "];

FONT_OBJECT.u105 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"        __ ",
"      / ██|",
"      |__/ ",
"      / ██|",
"      | ██|",
"      | ██|",
"/ ██  | ██|",
"|  ██████/ ",
" \\______/  "];

FONT_OBJECT.u106 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __       ",
"/ ██       ",
"| ██    __ ",
"| ██  / ██|",
"| ██ / ██/ ",
"| ██████ / ",
"| ██_  ██| ",
"| ██ \\  ██|",
"|__/  \\__/ "];

FONT_OBJECT.u107 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __ ",
"/ ██|",
"| ██|",
"| ██|",
"| ██|",
"| ██|",
"| ██|",
"| ██|",
"|__/ "];

FONT_OBJECT.u108 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"               ",
"               ",
"  ______ ____  ",
"/ ██████/████| ",
"| ██_  ██_  ██|",
"| ██ \\ ██ \\ ██|",
"| ██ | ██ | ██|",
"| ██ | ██ | ██|",
"|__/ |__/ |__/ "];

FONT_OBJECT.u109 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"           ",
"           ",
"  _______  ",
"/ ███████| ",
"| ██__  ██|",
"| ██  \\ ██|",
"| ██  | ██|",
"| ██  | ██|",
"|__/  |__/ "];

FONT_OBJECT.u110 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"           ",
"           ",
"   ______  ",
" / ██████| ",
"/ ██__  ██|",
"| ██  \\ ██|",
"| ██  | ██|",
"|  ██████/ ",
" \\______/  "];

FONT_OBJECT.u111 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"   ______  ",
" / ██████| ",
"/ ██__  ██|",
"| ██  \\ ██|",
"| ██  | ██|",
"| ███████/ ",
"| ██____/  ",
"| ██       ",
"|__/       "];

FONT_OBJECT.u112 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"   ______  ",
" / ██████| ",
"/ ██__  ██|",
"| ██  \\ ██|",
"| ██  | ██|",
"|  ███████|",
" \\____  ██|",
"      | ██|",
"      |__/ "];

FONT_OBJECT.u113 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"           ",
"           ",
"   ______  ",
" / ██████| ",
"/ ██__  ██|",
"| ██  \\__/ ",
"| ██       ",
"| ██       ",
"|__/       "];

FONT_OBJECT.u114 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"           ",
"           ",
"   _______ ",
" / ███████|",
"/ ██_____/ ",
"|  ██████| ",
" \\____  ██|",
"/ ███████/ ",
"|_______/  "];

FONT_OBJECT.u115 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"    __     ",
"  / ██|    ",
"  | ██|    ",
"/ ██████|  ",
"|_  ██_/   ",
"  | ██|    ",
"  | ██ /██|",
"  |  ████/ ",
"   \\___/   "];

FONT_OBJECT.u116 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"           ",
"           ",
"  __    __ ",
"/ ██  / ██|",
"| ██  | ██|",
"| ██  | ██|",
"| ██  | ██|",
"|  ██████/ ",
" \\______/  "];

FONT_OBJECT.u117 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"            ",
"            ",
"  __     __ ",
"/ ██|  / ██|",
"|  ██|/ ██/ ",
" \\  ██|██/  ",
"  \\  ███/   ",
"   \\  █/    ",
"    \\_/     "];

FONT_OBJECT.u118 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"               ",
"               ",
"  __   __   __ ",
"/ ██ / ██ / ██|",
"| ██ | ██ | ██|",
"| ██ | ██ | ██|",
"| ██ | ██ | ██|",
"|  █████/████/ ",
" \\_____/\\___/ "];

FONT_OBJECT.u119 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"           ",
"           ",
"  __    __ ",
"/ ██| / ██|",
"|  ██| ██/ ",
" \\  ████ / ",
" / ██| ██| ",
"/ ██|\\  ██|",
"|__/  \\__/ "];

FONT_OBJECT.u120 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __    __ ",
"/ ██| / ██|",
"| ██| | ██|",
"| ██|_| ██|",
"|  ███████|",
" \\____  ██|",
"/ ██|_| ██|",
"|  ██████/ ",
" \\______/  "];

FONT_OBJECT.u121 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  ________ ",
"/ ████████|",
"|____/ ██/ ",
"  / ████/  ",
" / ██| /__ ",
"/ ████████|",
"|________/ "];

FONT_OBJECT.u122 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"    ___ ",
"  / ███|",
" / ██_/ ",
" | ██|  ",
"/ ███|  ",
"|  ██|  ",
" \\ ██|  ",
" |  ███| ",
"  \\___/  "];

FONT_OBJECT.u123 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  __ ",
"/ ██|",
"| ██|",
"| ██|",
"|__/ ",
"/ ██|",
"| ██|",
"| ██|",
"|__/ "];

FONT_OBJECT.u124 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"  ___   ",
"/ ███|  ",
"|_  ██| ",
"  | ██| ",
"  | ███|",
"  | ██/ ",
"  | ██| ",
"/ ███/  ",
"|___/   "];

FONT_OBJECT.u125 = new ascii_character(charData);

/* ----------------------------------------------------- */

charData = [
"           ",
"           ",
"   ___  __ ",
" / ███|/██|",
"/ ██ ██ ██|",
"| ██| ███/ ",
"|__/\\___/  ",
"           ",
"           "];

FONT_OBJECT.u126 = new ascii_character(charData);

/* ----------------------------------------------------- */

var COLOR_PATTERNS = {
    sky: ['black','cyan','blue','bold.blue','bold.cyan','bold.cyan','bold.yellow','bold.green','black'],
    hot: ['black','yellow','bold.yellow','bold.yellow','red','bold.red','bold.red','magenta','black'],
    cold: ['black','white','bold.cyan','bold.cyan','bold.blue','bold.blue','blue','cyan','black'],
    tron: ['black','bold.cyan','black','bold.cyan','bold.cyan','bold.cyan','bold.cyan','bold.cyan','black'],
    all: ['red','green','blue','bold.red','bold.green','bold.blue','bold.magenta','bold.cyan','bold.yellow']
};

var COLOR_ANIMATED = [
  ['black','black','black','black','black','black','black','black','black'],
  ['black','gray','black','black','black','black','black','black','black'],
  ['black','gray','gray','black','black','black','black','black','black'],
  ['black','gray','gray','gray','black','black','black','black','black'],
  ['black','gray','gray','gray','gray','black','black','black','black'],
  ['black','gray','gray','gray','gray','gray','black','black','black'],
  ['black','gray','gray','gray','gray','gray','gray','black','black'],
  ['black','gray','gray','gray','gray','gray','gray','gray','black']
];

var convertToASCII = function (str) {
  var ct = str.length,
      output = "";
  var line_holder = {
    line1: "",
    line2: "",
    line3: "",
    line4: "",
    line5: "",
    line6: "",
    line7: "",
    line8: "",
    line9: ""
  },
  line_colors = {};
  for (var x = 0; x <= ct; x++) {
    var uc = str.charCodeAt(x),
        fData = FONT_OBJECT['u'+uc];
    if (fData) {
      for (var y = 1; y <= 9; y++) {
        var key = 'line'+y;
        line_holder[key] += fData[key];
      }
    }
  }
  for (var z = 1; z <= 9; z++) {
    var key = 'line'+z;
    line_colors[key] = line_holder[key].match(/(([^█]+)|(█+))/g);
  }
  return line_colors;
};

var COLOR_TRANSPORT = COLOR_ANIMATED[0];
var CURRENTFRAME = 0;
var CURRENTLINES;

var animatedLoop = function () {
  // process.stdout.write('\033c\033E');
  // printf("\033[%d;%dH%s\n", 0, 0, "TEST");
  COLOR_TRANSPORT = COLOR_ANIMATED[CURRENTFRAME];
  for (var z = 1; z <= 9; z++) {
    var key = 'line'+z,
        output = "",
        bank = CURRENTLINES[key],
        ct = bank.length,
        ci = (z-1),
        color = (!COLOR_TRANSPORT || !COLOR_TRANSPORT[ci]) ? 'red' : COLOR_TRANSPORT[ci];
    for (var x = 0; x <= ct; x++) {
      var segment = bank[x];
      if (segment) {
        if (segment.indexOf("█") === 0) {
          var color_args = color.split('.');
          if (color_args[1]) {
            output += chalk.bold[color_args[1]](segment);
          } else {
            output += chalk[color_args[0]](segment);
          }
        } else {
          output += chalk.gray(segment);
        }
      }
    }
    //console.log(output);
    process.stdout.write('\033[' + z + ';0H' + output);
  }
  CURRENTFRAME++;
};

var HELPER_CONSTRUCT = function () {
  this.pattern = 'sky';
  this.animated_banner = function (str, callback) {
    CURRENTLINES = convertToASCII(str),
    max = COLOR_ANIMATED.length;
    CURRENTFRAME = 0;
    process.stdout.write('\033c\033E');
    for (var i = 0; i <= max; i++) {
      setTimeout(animatedLoop,(200*(i+1)));
    }
    setTimeout(callback, (200*(max+1)));
  };
  this.banner = function (str) {
    var useRand = false,
    output = "",
    colorSteps;
    CURRENTLINES = convertToASCII(str);
    if (!COLOR_PATTERNS[this.pattern]) {
      useRand = true;
      colorSteps = COLOR_PATTERNS.all;
    } else {
      colorSteps = COLOR_PATTERNS[this.pattern];
    }
    for (var z = 1; z <= 9; z++) {
      var key = 'line'+z,
          bank = CURRENTLINES[key],
          ct = bank.length,
          ci = (useRand) ? (Math.floor((Math.random() * 10) + 1) - 1) : (z-1);
          color = (!colorSteps[ci]) ? 'red' : colorSteps[ci];
      for (var x = 0; x <= ct; x++) {
        var segment = bank[x];
        if (segment) {
          if (segment.indexOf("█") === 0) {
            var color_args = color.split('.');
            if (color_args[1]) {
              output += chalk.bold[color_args[1]](segment);
            } else {
              output += chalk[color_args[0]](segment);
            }
          } else {
            output += chalk.gray(segment);
          }
        }
      }
      output += "\n";
    }
    return output;
  };
  this.space = function (iter) {
    var output = "",
    ct = (!iter) ? 1 : iter;
    for (var x = 1; x <= ct; x++) {
      output += LINE_DIVIDER;
    }
    return output;
  };
};

exports.plugin = new HELPER_CONSTRUCT();
