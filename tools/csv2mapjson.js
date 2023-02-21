const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

// csv to json
async function convertCsvToJson(csvFilePath, jsonFilePath) {
    try {
        // CSVファイルを読み込む
        //const jsonArray = await csv().fromFile(csvFilePath);
        //console.log(jsonArray);
        csv().fromFile(csvFilePath).then((rows) => {
            const json = rows.map((row) => {
                return {
                    name_ja: row.name_ja,
                    name_en: row.name_en,
                    zip: row.zip,
                    position: { lat: row.lat, lng: row.lng },
                    address_ja: row.address_ja,
                    address_en: row.address_en,
                    phone: row.phone,
                    url_ja: row.url_ja,
                    url_en: row.url_en,
                    url_zh: row.url_zh,
                    url_ko: row.url_ko,
                    dentistry: row.dentistry.split(','),
                    internal_medicine: row.internal_medicine.split(','),
                    dermatology: row.internal_medicine.split(','),
                    obgyn: row.obgyn.split(','),
                    psychiatry: row.psychiatry.split(','),
                    pediatrics: row.pediatrics.split(','),
                };
            })
            fs.writeFileSync(jsonFilePath, JSON.stringify(json, null, 4));
        });

        // JSONファイルに書き出す
        console.log('Conversion completed!');
    } catch (error) {
        console.log('Conversion error:', error.message);
    }
};

// 関数を実行する
csvFilePath = process.argv[2];
jsonFilePath = process.argv[3];
console.log(csvFilePath, jsonFilePath);
convertCsvToJson(csvFilePath, jsonFilePath);