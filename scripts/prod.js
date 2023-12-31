/*
    Aster PROD SERVER
*/

const subProcess = require("child_process");

const r = "\x1b[0m";
const b = "\x1b[1m";
const d = "\x1b[2m";

const fgBlack = "\x1b[30m";
const fgRed = "\x1b[31m";
const fgGreen = "\x1b[32m";
const fgYellow = "\x1b[33m";
const fgBlue = "\x1b[34m";
const fgMagenta = "\x1b[35m";
const fgCyan = "\x1b[36m";
const fgWhite = "\x1b[37m";
const fgGray = "\x1b[90m";

function log(type, msg) {
    if (type === 0) {
        console.log(
            `${fgYellow}[${fgMagenta}aster ${fgCyan}INFO${fgYellow}] ${r}` + msg
        );
    } else if (type === 1) {
        console.log(
            `${fgYellow}[${fgMagenta}aster ${fgYellow}WARN${fgYellow}] ${r}` +
            msg
        );
    } else if (type === 2) {
        console.log(
            `${fgYellow}[${fgMagenta}aster ${fgRed}ERROR${fgYellow}] ${r}` + msg
        );
    }
}

log(0, `                        ${fgGreen}[RUNNING IN PRODUCTION MODE]${r}`);
log(
    0,
    `Report any bugs you may encounter at ${b}https://github.com/ihateblueb/aster${r}`
);

buninstall();

function buninstall() {
    log(0, `${fgGray}${b}> bun i${r} \n`);
    const bunprocess = subProcess.spawn("bun", ["i"]);
    bunprocess.stdout.on("data", (data) => {
        console.log(`${fgBlack}${data}${r}`);
    });
    bunprocess.on("exit", () => {
        log(0, `${r}Packages refreshed.`);
        build();
    });
}

function build() {
    log(0, `${fgGray}${b}> nuxt build${r} \n`);

    const nuxtprocess = subProcess.spawn("nuxt", ["build"]);
    nuxtprocess.stdout.on("data", (data) => {
        console.log(`${fgBlack}${data}${r}`);
    });
    nuxtprocess.on("exit", () => {
        log(0, `${r}Build complete.`);
        run();
    });
}

function run() {
    log(0, `${fgGray}${b}> bun run .output/server/index.mjs${r} \n`);

    const nuxtprocess = subProcess.spawn("bun", [
        "run",
        ".output/server/index.mjs",
    ]);
    nuxtprocess.stdout.on("data", (data) => {
        console.log(`${fgBlack}${data}${r}`);
    });
    nuxtprocess.on("exit", () => {
        log(0, `${r}${fgRed}Server died.`);
    });
}
