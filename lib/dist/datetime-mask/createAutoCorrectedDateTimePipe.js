"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createAutoCorrectedDateTimePipe(dateFormat) {
    if (dateFormat === void 0) { dateFormat = 'dd-mm-yyyy HH:MM:SS'; }
    return function (conformedValue) {
        var indexesOfPipedChars = [];
        var dateFormatArray = dateFormat.split(/[^dmyHMS]+/);
        var maxValue = { 'dd': 31, 'mm': 12, 'yy': 99, 'yyyy': 9999, 'HH': 23, 'MM': 59, 'SS': 59 };
        var minValue = { 'dd': 1, 'mm': 1, 'yy': 0, 'yyyy': 1, 'HH': 0, 'MM': 0, 'SS': 0 };
        var conformedValueArr = conformedValue.split('');
        dateFormatArray.forEach(function (format) {
            var position = dateFormat.indexOf(format);
            var maxFirstDigit = parseInt(maxValue[format].toString().substr(0, 1), 10);
            if (parseInt(conformedValueArr[position], 10) > maxFirstDigit) {
                conformedValueArr[position + 1] = conformedValueArr[position];
                conformedValueArr[position] = 0;
                indexesOfPipedChars.push(position);
            }
        });
        var isInvalid = dateFormatArray.some(function (format) {
            var position = dateFormat.indexOf(format);
            var length = format.length;
            var textValue = conformedValue.substr(position, length).replace(/\D/g, '');
            var value = parseInt(textValue, 10);
            return value > maxValue[format] || (textValue.length === length && value < minValue[format]);
        });
        if (isInvalid) {
            return false;
        }
        return {
            value: conformedValueArr.join(''),
            indexesOfPipedChars: indexesOfPipedChars
        };
    };
}
exports.default = createAutoCorrectedDateTimePipe;
