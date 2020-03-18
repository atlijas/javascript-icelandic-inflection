/*
This script allows communication with one of Árnastofnun's API, The DMII Core (BÍN-kjarninn)
https://bin.arnastofnun.is/DMII/dmii-core/api/
https://bin.arnastofnun.is/binkjarni/forritaskil/
*/

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function getJSON(url) {
    var url = encodeURI(url);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    var response = xmlHttp.responseText;
    return JSON.parse(response);
}

function getWordForms(word, wordCat = null, pos = null) {
    if (wordCat === null) {
        var json = getJSON(`https://bin.arnastofnun.is/api/ord/${word}`);
        var wordForms = json[0]['bmyndir'];
        return wordForms;
    } else {
        var json = getJSON(`https://bin.arnastofnun.is/api/ord/${wordCat}/${word}`);
        var wordForms = json[0]['bmyndir'];
        if (pos === null) {
            return wordForms;
        } else {
            for (i in wordForms) {
                if (wordForms[i]['g'] === pos) {
                    return wordForms[i]['b'];
                }
            }
        }
    }
}

console.log(getWordForms('maður', wordCat='no'));
