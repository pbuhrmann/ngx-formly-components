export default function createAutoCorrectedDateTimePipe(dateFormat?: string): (conformedValue: any) => false | {
    value: any;
    indexesOfPipedChars: any[];
};
