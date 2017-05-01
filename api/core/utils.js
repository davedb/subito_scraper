function replaceDates(input) {
    //2017-04-14T19:11:17.758Z
    var regex = /datetime.datetime\((\d{4}), (\d{1,2}), (\d{1,2}), 0, 0\)/g;

    var match = regex.exec(input);

    return input.replace(regex, "\"$1-$2-$3T0:0:0.0Z\"");
}

function replaceNone(input) {
    return input.replace(/None/g, "null");
}

function replaceApex(input) {
    input = input.replace(/ '/g, " \"");
    input = input.replace(/':/g, "\":");
    input = input.replace(/\{'/g, "{\"");
    input = input.replace(/'\}/g, "\"}");
    input = input.replace(/',/g, "\",");
    return input;
}

function formatScraperArray(input) {
    var ret = '';

    // remove last comma
    if (input.substring(input.length - 1) === ',') {
        ret = input.substring(0, input.length - 1);
    }
    else{
        ret = input;
    }

    // fix dates
    ret = replaceNone(replaceDates(ret));

    ret = '[' + replaceApex(ret) + ']';

    return ret;
}

module.exports = {
    formatScraperArray: formatScraperArray,
    replaceDates: replaceDates
}