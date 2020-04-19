import { ToStringConverter } from "./to-string.converter"

describe('To String Converter Tests', () => {
    let converter: ToStringConverter;

    beforeEach(() => {
        converter = new ToStringConverter();
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

    it('submit a single list of number should return string', () => {
        converter.getInputs().submit({
            'number': 
            {
                features: ['f1', 'f2'],
                examples: [[1, 2], [3, 4]]
            }
        })
        const data = converter.transform();
        expect(data).toEqual([
            {
                features: ['f1', 'f2'],
                examples: [["1", "2"], ["3", "4"]]
            }
        ])
    });

    it('submit a single list of boolean should return strings', () => {
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
                examples: [["true", "false"], ["true", "false"]]
            }
        ]);
    });

    it('submit a two list of number and boolean should return strings', () => {
        converter.getInputs().submit({
            'boolean': {
                features: ['f1', 'f2'],
                examples: [[true, false], [true, false]]
            },
            'number': {
                features: ['f3', 'f4'],
                examples: [[1, 2], [3, 4]]      
            }
        })
        const data = converter.transform();
        expect(data).toEqual([
            {
                features: ['f3', 'f4'],
                examples: [["1", "2"], ["3", "4"]]
            },
            {
                features: ['f1', 'f2'],
                examples: [["true", "false"], ["true", "false"]]
            },
        ]);
    });

    it('submit two empty list should return empty lists', () => {
        converter.getInputs().submit({
            'boolean': {
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

