const fs = require('fs');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
    const santris = await loadData('./data.tsv');
    console.log(santris[0]);
})();

/**
 * @typedef {Object} Santri 
 * @property {String} KK
 * @property {String} NIK
 * @property {String} NamaSantri
 * @property {String} TempatLahir
 * @property {String} TanggalLahir
 * @property {String} JenisKelamin
 * @property {String} Alamat
 * @property {String} NamaAyah
 * @property {String} PendidikanAyah
 * @property {String} NamaIbu
 * @property {String} PendidikanIbu
 */

/**
 * @param {String} filename
 * @returns {Array<Santri>} 
 */
async function loadData(filename) {
    const table = fs.readFileSync(path.join(__dirname, filename), { encoding: 'utf-8' });
    const rows = table.split(os.EOL).map(function (row) {
        return row.split('\t').map((column) => column.trim());
    });
    const header = rows.shift();
    return rows.map(function (row) {
        return header.reduce(function (santri, column, index) {
            santri[column] = row[index];
            return santri;
        }, {});
    }).map((santri) => {
        return {
            KK: santri.KK,
            NIK: santri.NIK,
            NamaSantri: santri.NamaSantri,
            TempatLahir: santri.TempatLahir,
            TanggalLahir: santri.TanggalLahir,
            JenisKelamin: santri.JenisKelamin,
            Alamat: santri.Alamat,
            NamaAyah: santri.NamaAyah,
            PendidikanAyah: santri.PendidikanAyah,
            NamaIbu: santri.NamaIbu,
            PendidikanIbu: santri.PendidikanIbu,
        }
    });
}

/**
 * @param {(browser: import('puppeteer').Browser) => Promise} user 
 */
async function useBrowser(user) {
    const browser = await puppeteer.launch({
        devtools: false,
    });
    await user(browser);
    await browser.close();
}
