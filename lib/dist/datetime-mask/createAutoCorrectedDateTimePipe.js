export default function createAutoCorrectedDateTimePipe(dateFormat) {
    if (dateFormat === void 0) { dateFormat = 'DD-MM-yyyy HH:mm:ss'; }
    return function (conformedValue) {
        var indexesOfPipedChars = [];
        var dateFormatArray = dateFormat.split(/[^DMYHms]+/);
        var maxValue = { 'DD': 31, 'MM': 12, 'YY': 99, 'YYYY': 9999, 'HH': 23, 'mm': 59, 'ss': 59 };
        var minValue = { 'DD': 1, 'MM': 1, 'YY': 0, 'YYYY': 1, 'HH': 0, 'mm': 0, 'ss': 0 };
        var conformedValueArr = conformedValue.split('');
        // Check first digit
        dateFormatArray.forEach(function (format) {
            var position = dateFormat.indexOf(format);
            var maxFirstDigit = parseInt(maxValue[format].toString().substr(0, 1), 10);
            if (parseInt(conformedValueArr[position], 10) > maxFirstDigit) {
                conformedValueArr[position + 1] = conformedValueArr[position];
                conformedValueArr[position] = 0;
                indexesOfPipedChars.push(position);
            }
        });
        // Check for invalid date
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
//# sourceMappingURL=createAutoCorrectedDateTimePipe.js.map