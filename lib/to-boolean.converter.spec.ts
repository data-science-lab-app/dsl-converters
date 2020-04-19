import { ToBooleanConverter } from "./to-boolean.converter"

describe('To Boolean Converter Tests', () => {
    let converter: ToBooleanConverter;

    beforeEach(() => {
        converter = new ToBooleanConverter();
    });

    it('options should return true for no more', () => {
        expect(converter.getOptions().noMore()).toBeTruthy();
    });

    it('options should throw for options', (done) => {
        try {
            converter.getOptions().options();
            done.fail();
        } catch (error) {
            expect().nothing();
            done();
        }
    });

    it('options should throw for submit', (done) => {
        try {
            converter.getOptions().submit({});
            done.fail();
        } catch (error) {
            expect().nothing();
            done();
        }
    });

    it('inputs should return two inputs', () => {
        expect(converter.getInputs().inputs().length).toBe(2);
    });

    it('submit a single list of number should return boolean', () => {
        converter.getInputs().submit({
            'number':
            {
                features: ['f1', 'f2'],
                examples: [[-1, 0], [1, 2]]
            }
        })
        const data = converter.transform();
        expect(data).toEqual([
            {
                features: ['f1', 'f2'],
                examples: [[true, false], [true, true]]
            }
        ])
    });

    it('submit a single list of strings should return boolean', () => {
        converter.getInputs().submit({
            'string': {
                features: ['f1', 'f2'],
                examples: [["true", ""], ["true", ""]]
            }
        })
        const data = converter.transform();
        expect(data).toEqual([
            {
                features: ['f1', 'f2'],
                examples: [[true, false], [true, false]]
            }
        ]);
    });

    it('submit a two list of number and string should return boolean', () => {
        converter.getInputs().submit({
            'string': {
                features: ['f1', 'f2'],
                examples: [["true", ""], ["true", ""]]
            },
            'number': {
                features: ['f3', 'f4'],
                examples: [[0, 1], [0, 1]]
            }
        })
        const data = converter.transform();
        expect(data).toEqual([
            {
                features: ['f3', 'f4'],
                examples: [[false, true], [false, true]]
            },
            {
                features: ['f1', 'f2'],
                examples: [[true, false], [true, false]]
            },
        ]);
    });

    it('submit two empty list should return empty lists', () => {
        converter.getInputs().submit({
            'string': {
                features: [],
                examples: []
            },
            'number': {
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

