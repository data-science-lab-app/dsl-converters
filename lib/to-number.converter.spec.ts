import { ToNumberConverter } from "./to-number.converter"

describe('To Number Converter Tests', () => {
    let converter: ToNumberConverter;

    beforeEach(() => {
        converter = new ToNumberConverter();
    });

    it('options should return true for no more', () => {
        expect(converter.getOptions().noMore()).toBeTruthy();
    });

    it('options should throw for options', (done) => {
        try {
            converter.getOptions().options();
            done.fail();
        } catch(error) {
            expect().nothing();
            done();
        }
    });

    it('options should throw for submit', (done) => {
        try {
            converter.getOptions().submit({});
            done.fail();
        } catch(error) {
            expect().nothing();
            done();
        }
    });

    it('inputs should return two inputs', () => {
        expect(converter.getInputs().inputs().length).toBe(2);
    });

    it('submit a single list of string should return numbers', () => {
        converter.getInputs().submit({
            'string': {
                features: ['f1', 'f2'],
                examples: [["1", "2"], ["3", "4"]]
            }
        })
        const data = converter.transform();
        expect(data).toEqual([
            {
                features: ['f1', 'f2'],
                examples: [[1, 2], [3, 4]]
            }
        ])
    });

    it('submit a single list of boolean should return numbers', () => {
        converter.getInputs().submit({
            'boolean': {
                features: ['f1', 'f2'],
                examples: [[true, false], [true, false]]
            }
        })
        const data = converter.transform();
        expect(data).toEqual([
            {
                features: ['f1', 'f2'],
                examples: [[1, 0], [1, 0]]
            }
        ]);
    });

    it('submit a two list of string and boolean should return numbers', () => {
        converter.getInputs().submit({
            'boolean': {
                features: ['f1', 'f2'],
                examples: [[true, false], [true, false]]
            },
            'string': {
                features: ['f3', 'f4'],
                examples: [["1", "2"], ["3", "4"]]      
            }
        })
        const data = converter.transform();
        expect(data).toEqual([
            {
                features: ['f3', 'f4'],
                examples: [[1, 2], [3, 4]]
            },
            {
                features: ['f1', 'f2'],
                examples: [[1, 0], [1, 0]]
            },
        ]);
    });

    it('submit two empty list should return empty lists', () => {
        converter.getInputs().submit({
            'boolean': {
                features: [],
                examples: []
            },
            'string': {
                features: [],
                examples: []
            },
        });
        const data = converter.transform();
        expect(data).toEqual([
            {
                features: [],
                examples: []
            },
            {
                features: [],
                examples: []
            },
        ])
    });

    it('submit nothing should return nothing', () => {
        converter.getInputs().submit({
        }); 
        const data = converter.transform();
        expect(data).toEqual([]);
    });

});

