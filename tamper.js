// ==UserScript==
// @name         INPUT TPQ
// @namespace    https://anggota.badkolpqsemarang.com/
// @version      1.0
// @description  Sync dari excel badkolpqsemarang.com
// @author       faisalhakim47
// @match        https://anggota.badkolpqsemarang.com/*
// @icon         https://admin.awqot.com/assets/images/awqot-brand-simple.png
// @grant        none
// ==/UserScript==

initUI();

const COL_FTKK = 'FTKK';
const COL_ID = 'ID';
const COL_NIK = 'NIK';
// const COL_ID = 'NoInduk';
const COL_NAME = 'NamaSantri';
const COL_BIRTH_CITY = 'Tempat';
const COL_BIRTH_DATE = 'Tanggal Lahir';
const COL_SEX = 'Jenis Kelamin';
// const COL_ID = 'Status Keluarga';
const COL_ADDRESS = 'Alamat';
const COL_REG_DATE = 'MasukTPQTanggal';
// const COL_ID = 'MasukTPQJilid';
// const COL_ID = 'MasukTPQKelasFormal';
// const COL_OUT_DATE = 'Keluar TPQTanggal';
// const COL_ID = 'KeluarTPQKelas';
// const COL_ID = 'Formulir';
// const COL_ID = 'FC Akte Kelahiran';
// const COL_ID = 'FC KK';
// const COL_ID = 'Pas Photo';
const COL_FATHER_NAME = 'Nama Ayah';
const COL_MOTHER_NAME = 'Nama Ibu';
// const COL_ID = 'Alamat Orang Tua';
const COL_FATHER_EDU = 'Pendidikan Ayah';
const COL_MOTHER_EDU = 'Pendidikan Ibu';
const COL_FATHER_JOB = 'Pekerjaan Ayah';
const COL_MOTHER_JOB = 'Pekerjaan Ibu';
// const COL_ID = 'Penghasilan Keluarga';
// const COL_ID = 'JumlahInfaqPerbulan';
// const COL_ID = 'FotoRaport';
// const COL_ID = 'FotoEBTAQ';

const EDUS = ['SD', 'SLTP', 'SLTA', 'D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3'];
const JOBS = [{'key':'1','label':'BELUM/TIDAK BEKERJA'},{'key':'2','label':'MENGURUS RUMAH TANGGA'},{'key':'3','label':'PELAJAR/MAHASISWA'},{'key':'4','label':'PENSIUNAN'},{'key':'5','label':'PEGAWAI NEGERI SIPIL'},{'key':'6','label':'TENTARA NASIONAL INDONESIA'},{'key':'7','label':'KEPOLISIAN RI'},{'key':'8','label':'PERDAGANGAN'},{'key':'9','label':'PETANI/PEKEBUN'},{'key':'10','label':'PETERNAK'},{'key':'11','label':'NELAYAN/PERIKANAN'},{'key':'12','label':'INDUSTRI'},{'key':'13','label':'KONSTRUKSI'},{'key':'14','label':'TRANSPORTASI'},{'key':'15','label':'KARYAWAN SWASTA'},{'key':'16','label':'KARYAWAN BUMN'},{'key':'17','label':'KARYAWAN BUMD'},{'key':'18','label':'KARYAWAN HONORER'},{'key':'19','label':'BURUH HARIAN LEPAS'},{'key':'20','label':'BURUH TANI/PERKEBUNAN'},{'key':'21','label':'BURUH NELAYAN/PERIKANAN'},{'key':'22','label':'BURUH PETERNAKAN'},{'key':'23','label':'PEMBANTU RUMAH TANGGA'},{'key':'24','label':'TUKANG CUKUR'},{'key':'25','label':'TUKANG LISTRIK'},{'key':'26','label':'TUKANG BATU'},{'key':'27','label':'TUKANG KAYU'},{'key':'28','label':'TUKANG SOL SEPATU'},{'key':'29','label':'TUKANG LAS/PANDAI BESI'},{'key':'30','label':'TUKANG JAHIT'},{'key':'31','label':'TUKANG GIGI'},{'key':'32','label':'PENATA RIAS'},{'key':'33','label':'PENATA BUSANA'},{'key':'34','label':'PENATA RAMBUT'},{'key':'35','label':'MEKANIK'},{'key':'36','label':'SENIMAN'},{'key':'37','label':'TABIB'},{'key':'38','label':'PARAJI'},{'key':'39','label':'PERANCANG BUSANA'},{'key':'40','label':'PENTERJEMAH'},{'key':'41','label':'IMAM MESJID'},{'key':'42','label':'PENDETA'},{'key':'43','label':'PASTOR'},{'key':'44','label':'WARTAWAN'},{'key':'45','label':'USTADZ/MUBALIGH'},{'key':'46','label':'JURU MASAK'},{'key':'47','label':'PROMOTOR ACARA'},{'key':'48','label':'ANGGOTA DPR-RI'},{'key':'49','label':'ANGGOTA DPD'},{'key':'50','label':'ANGGOTA BPK'},{'key':'51','label':'PRESIDEN'},{'key':'52','label':'WAKIL PRESIDEN'},{'key':'53','label':'ANGGOTA MAHKAMAH KONSTITUSI'},{'key':'54','label':'ANGGOTA KABINET/KEMENTERIAN'},{'key':'55','label':'DUTA BESAR'},{'key':'56','label':'GUBERNUR'},{'key':'57','label':'WAKIL GUBERNUR'},{'key':'58','label':'BUPATI'},{'key':'59','label':'WAKIL BUPATI'},{'key':'60','label':'WALIKOTA'},{'key':'61','label':'WAKIL WALIKOTA'},{'key':'62','label':'ANGGOTA DPRD PROVINSI'},{'key':'63','label':'ANGGOTA DPRD KABUPATEN/KOTA'},{'key':'64','label':'DOSEN'},{'key':'65','label':'GURU'},{'key':'66','label':'PILOT'},{'key':'67','label':'PENGACARA'},{'key':'68','label':'NOTARIS'},{'key':'69','label':'ARSITEK'},{'key':'70','label':'AKUNTAN'},{'key':'71','label':'KONSULTAN'},{'key':'72','label':'DOKTER'},{'key':'73','label':'BIDAN'},{'key':'74','label':'PERAWAT'},{'key':'75','label':'APOTEKER'},{'key':'76','label':'PSIKIATER/PSIKOLOG'},{'key':'77','label':'PENYIAR TELEVISI'},{'key':'78','label':'PENYIAR RADIO'},{'key':'79','label':'PELAUT'},{'key':'80','label':'PENELITI'},{'key':'81','label':'SOPIR'},{'key':'82','label':'PIALANG'},{'key':'83','label':'PARANORMAL'},{'key':'84','label':'PEDAGANG'},{'key':'85','label':'PERANGKAT DESA'},{'key':'86','label':'KEPALA DESA'},{'key':'87','label':'BIARAWATI'},{'key':'88','label':'WIRASWASTA'},{'key':'89','label':'LAINNYA'}];

/**
 * @typedef {Object} Santri 
 * @property {number} ftkkId
 * @property {String} nik
 * @property {String} name
 * @property {String} sex
 * @property {String} birthCity
 * @property {Date} birthDate
 * @property {String} address
 * @property {Date} regDate
 * @property {String} fatherName
 * @property {String} fatherEdu
 * @property {String} fatherJob
 * @property {String} motherJobText
 * @property {String} motherName
 * @property {String} motherEdu
 * @property {String} motherJob
 * @property {String} motherJobText
 */

/**
 * @param {Santri} santri 
 */
function isSantriValid(santri) {
    return !!santri.nik && santri.nik.length === 16
        && !!santri.name
        && !!santri.birthCity
        && ['L', 'P'].includes(santri.sex)
        && santri.birthDate instanceof Date && !isNaN(santri.birthDate)
        && santri.regDate instanceof Date && !isNaN(santri.regDate)
        && !!santri.fatherName
        && EDUS.includes(santri.fatherEdu)
        && !!santri.motherName
        && EDUS.includes(santri.motherEdu);
}

/**
 * @param {any} data 
 * @returns {Santri}
 */
function toSantri(data) {
    return {
        ftkkId: data[COL_FTKK],
        nik: data[COL_NIK],
        name: data[COL_NAME],
        sex: fixSex(data[COL_SEX]),
        birthCity: data[COL_BIRTH_CITY],
        birthDate: fixDate(data[COL_BIRTH_DATE]),
        address: data[COL_ADDRESS],
        regDate: fixDate(data[COL_REG_DATE]),
        fatherName: data[COL_FATHER_NAME],
        fatherEdu: fixEdu(data[COL_FATHER_EDU]),
        fatherJobText: data[COL_FATHER_JOB] ?? '-',
        fatherJob: fixJob(data[COL_FATHER_JOB]),
        motherName: data[COL_MOTHER_NAME],
        motherEdu: fixEdu(data[COL_MOTHER_EDU]),
        motherJobText: data[COL_MOTHER_JOB] ?? '-',
        motherJob: fixJob(data[COL_MOTHER_JOB]),
    }
}

/**
 * @param {*} sex
 * @returns {String} 
 */
function fixSex(sex) {
    if (sex === 'Perempuan') sex = 'P';
    if (sex === 'Laki-laki') sex = 'L';
    return sex;
}

/**
 * @param {String} dateStr
 * @returns {Date}
 */
function fixDate(dateStr) {
    const parts = dateStr.split('/');
    return new Date(2000 + parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
}

/**
 * @param {String} edu 
 * @returns {String}
 */
function fixEdu(edu) {
    if (!edu) return '';
    if (edu.toLowerCase().includes('sd')) edu = 'SD';
    else if (edu.toLowerCase().includes('pesantren')) edu = 'SD';
    else if (edu.toLowerCase().includes('smp')) edu = 'SLTP';
    else if (edu.toLowerCase().includes('sma')) edu = 'SLTA';
    else if (edu.toLowerCase().includes('s.1')) edu = 'S1';
    else if (edu.toLowerCase().includes('s.2')) edu = 'S2';
    else if (edu.toLowerCase().includes('s.3')) edu = 'S3';
    return edu;
}

/**
 * @param {String} job
 * @returns {String} 
 */
function fixJob(job) {
    if (!job) return '89';
    job = job
        .replace('Pegawai Swasta/Karyawan', 'KARYAWAN SWASTA')
        .replace('PNS', 'PEGAWAI NEGERI SIPIL')
        .toLowerCase()
        .replace('ibu ', '');
    const found = JOBS.find(function (_) {
        if (!_ || !_.label) return false;
        const label = _.label.toLowerCase();
        return job.includes(label)
            || label.includes(job);
    });
    if (found) return found.key;
    else return '89';
}

async function initUI() {
    await ensureScript('https://unpkg.com/localforage@1.9.0/dist/localforage.min.js');
    await ensureScript('https://unpkg.com/xlsx@0.17.0/dist/xlsx.full.min.js');
    await localforage.ready();

    if (location.pathname === '/santri') {
        /** @type {HTMLAnchorElement} */
        const a = document.querySelector('a[href="https://anggota.badkolpqsemarang.com/tambah-santri"]');
        a.parentElement.classList.remove('col-xs-1');
        a.parentElement.classList.add('col-xs-2');
        a.parentElement.previousElementSibling.classList.remove('col-xs-11');
        a.parentElement.previousElementSibling.classList.add('col-xs-10');
        const loadBtn = document.createElement('a');
        loadBtn.classList.add('btn');
        loadBtn.classList.add('btn-success');
        loadBtn.classList.add('pull-right');
        loadBtn.style.marginRight = '1rem';
        const icon = document.createElement('i');
        icon.classList.add('glyphicon');
        icon.classList.add('glyphicon-folder-open');
        icon.style.marginRight = '1rem';
        loadBtn.appendChild(icon);
        const text = document.createTextNode('Buka Data Santri');
        loadBtn.appendChild(text);
        loadBtn.addEventListener('click', async function () {
            if (loadBtn.disabled) return;
            loadBtn.classList.add('disabled');
            loadBtn.disabled = true;
            text.textContent = 'Memuat...';
            try { await openDataSantri(); } catch (error) { console.warn(error) }
            loadBtn.classList.remove('disabled');
            loadBtn.disabled = false;
            text.textContent = 'Buka Data Santri';
        });
        a.insertAdjacentElement('afterend', loadBtn);
        await refreshStats();
    }

    if (location.pathname === '/tambah-santri') {
        const submittedNiks = await getSubmittedNiks();
        const santris = await getCurrentSantris();
        const validSantris = santris.filter(isSantriValid);
        const unsubmittedSantris = validSantris.filter(function (santri) {
            return !submittedNiks.includes(santri.nik);
        });
        const header = document.querySelector('body > div > div > section > div > div > div > div.widget-user-header.bg-yellow');
        header.style.display = 'flex';
        /** @type {HTMLHeadingElement} */
        const title = header.children.item(0);
        title.style.marginLeft = '0px';
        title.style.marginRight = '1rem';
        title.style.whiteSpace = 'nowrap';
        const select = document.createElement('select');
        select.classList.add('form-control');
        unsubmittedSantris.forEach(function (santri) {
            const option = document.createElement('option');
            option.value = santri.nik;
            option.textContent = santri.ftkkId.toString() + '. ' + santri.name;
            select.appendChild(option);
        });
        select.addEventListener('change', async function () {
            await loadAddSantri(select.value);
        });
        header.appendChild(select);
        const fatherJobNote = document.querySelector('#formtambah > fieldset > div.row > div:nth-child(2) > div:nth-child(2) > div > span.help-block');
        fatherJobNote.id = 'fatherJobNote';
        fatherJobNote.classList.add('text-warning');
        fatherJobNote.style.fontStyle = 'italic';
        const motherJobNote = document.querySelector('#formtambah > fieldset > div.row > div:nth-child(2) > div:nth-child(5) > div > span.help-block');
        motherJobNote.id = 'motherJobNote';
        motherJobNote.classList.add('text-warning');
        motherJobNote.style.fontStyle = 'italic';
        if (select.options.length !== 0) {
            await loadAddSantri(select.options.item(0).value);
        }
    }
}

async function openDataSantri() {
    /** @type {FileSystemDirectoryHandle} */
    const dirHandle = await window.showDirectoryPicker();
    for await (const entry of dirHandle.values()) {
        if (entry.name.includes('xlsx') && entry.kind === 'file') {
            /** @type {File} */
            const file = await entry.getFile();
            await readDataSantriFile(file);
        }
        if (entry.name.includes('kk') && entry.kind === 'directory') {
            await saveKKPhotos(entry);
        }
    }
    await localforage.setItem('lastOpenDataSantri', new Date().toISOString());
    await refreshStats();
}

/**
 * @param {File} file
 */
async function readDataSantriFile(file) {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        reader.addEventListener('load', async function (event) {
            const workbook = XLSX.read(event.target.result, { type: 'array' });
            const table = XLSX.utils.sheet_to_json(workbook.Sheets['TbDataSantri'], { raw: false });
            const tableString = JSON.stringify(table);
            await localforage.setItem('dataSantriTable', tableString);
            resolve();
        });
        reader.addEventListener('error', reject);
        reader.readAsArrayBuffer(file);
    });
}

/**
 * @param {FileSystemDirectoryHandle} dirHandle 
 */
async function saveKKPhotos(dirHandle) {
    for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file') {
            await localforage.setItem('KK_PHOTO_' + entry.name, await entry.getFile());
        }
    }
}

/**
 * @returns {Promise<Array<Santri>>}
 */
async function getCurrentSantris() {
    const table = JSON.parse(await localforage.getItem('dataSantriTable'));
    return table.map(toSantri);
}

/**
 * @returns {Promise<Array<String>>}
 */
async function getSubmittedNiks() {
    if (location.pathname === '/santri') {
        const submittedNiks = Array
            .from(document.querySelectorAll('#example1 > tbody > tr > td:nth-child(2)'))
            .map(function (td) {
                return td.textContent.trim();
            });
        await localforage.setItem('submittedNiks', JSON.stringify(submittedNiks));
        return submittedNiks;
    } else {
        return JSON.parse(await localforage.getItem('submittedNiks'));
    }
}

async function refreshStats() {
    const submittedNiks = await getSubmittedNiks();
    const santris = await getCurrentSantris();
    const validSantris = santris.filter(isSantriValid);
    const unsubmittedSantris = validSantris.filter(function (santri) {
        return !submittedNiks.includes(santri.nik);
    });
    const separator = ' | ';
    const stats = [
        'Total: ' + santris.length,
        'Valid: ' + validSantris.length,
        'Belum Diinput: ' + unsubmittedSantris.length,
        'Terakhir Update: ' + new Date(await localforage.getItem('lastOpenDataSantri')).toLocaleString(),
    ];
    /** @type {HTMLElement} */
    const statsB = document.querySelector('body > div > div > section > div > div > div > div.box-body > div:nth-child(1) > div > p > b');
    const span = statsB.querySelector('span') ?? document.createElement('span');
    span.classList.add('text-warning');
    span.textContent = separator + stats.join(separator);
    statsB.insertAdjacentElement('beforeend', span);
}

async function loadAddSantri(nik) {
    const santris = await getCurrentSantris();
    const santri = santris.find(function (santri) {
        return santri.nik === nik;
    });
    const kkPhotoName = (await localforage.keys()).find(function (key) {
        return key.includes('KK_PHOTO_KK' + santri.ftkkId.toString().padStart(3, '0'));
    });
    const kkPhotoFile = await localforage.getItem(kkPhotoName);
    const dataTransfer = new DataTransfer();
    if (kkPhotoFile) {
        dataTransfer.items.add(kkPhotoFile);
    }
    /** @type {HTMLFormControlsCollection} */
    const elements = formtambah.elements;
    elements.nik.value = santri.nik;
    elements.nama.value = santri.name;
    elements.tgl_daftar.value = santri.regDate.toISOString().split('T')[0];
    elements.tempat.value = santri.birthCity;
    elements.tgl.value = santri.birthDate.toISOString().split('T')[0];
    elements.jkel.value = santri.sex;
    elements.alamat_ortu.value = santri.address
    elements.nama_ayah.value = santri.fatherName;
    $(elements.pekerjaan_ayah).val(santri.fatherJob).trigger('change');
    elements.pendidikan_ayah.value = santri.fatherEdu;
    elements.nama_ibu.value = santri.motherName;
    $(elements.pekerjaan_ibu).val(santri.motherJob).trigger('change');
    elements.pendidikan_ibu.value = santri.motherEdu;
    elements.ftkk.files = dataTransfer.files;
    fatherJobNote.textContent = 'Data Excel: ' + santri.fatherJobText;
    motherJobNote.textContent = 'Data Excel: ' + santri.motherJobText;
    fileValidation('ftkk','#imagekk','#pilih2');
}

/**
 * @param {String} scriptSrc 
 */
async function ensureScript(scriptSrc) {
    if (!ensureScript.promises) ensureScript.promises = {};
    if (!ensureScript.promises[scriptSrc]) {
        ensureScript.promises[scriptSrc] = new Promise(function (resolve, reject) {
            const script = document.createElement('script');
            script.async = true;
            script.src = scriptSrc;
            script.addEventListener('load', resolve);
            script.addEventListener('error', reject);
            document.body.appendChild(script);
        });
    }
    await ensureScript.promises[scriptSrc];
}
