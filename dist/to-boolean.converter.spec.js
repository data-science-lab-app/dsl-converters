"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var to_boolean_converter_1 = require("./to-boolean.converter");
describe('To Boolean Converter Tests', function () {
    var converter;
    beforeEach(function () {
        converter = new to_boolean_converter_1.ToBooleanConverter();
    });
    it('options should return true for no more', function () {
        expect(converter.getOptions().noMore()).toBeTruthy();
    });
    it('options should throw for options', function (done) {
        try {
            converter.getOptions().options();
            done.fail();
        }
        catch (error) {
            expect().nothing();
            done();
        }
    });
    it('options should throw for submit', function (done) {
        try {
            converter.getOptions().submit({});
            done.fail();
        }
        catch (error) {
            expect().nothing();
            done();
        }
    });
    it('inputs should return two inputs', function () {
        expect(converter.getInputs().inputs().length).toBe(2);
    });
    it('submit a single list of number should return boolean', function () {
        converter.getInputs().submit({
            'number': {
                features: ['f1', 'f2'],
                examples: [[-1, 0], [1, 2]]
            }
        });
        var data = converter.transform();
        expect(data).toEqual([
            {
                features: ['f1', 'f2'],
                examples: [[true, false], [true, true]]
            }
        ]);
    });
    it('submit a single list of strings should return boolean', function () {
        converter.getInputs().submit({
            'string': {
                features: ['f1', 'f2'],
                examples: [["true", ""], ["true", ""]]
            }
        });
        var data = converter.transform();
        expect(data).toEqual([
            {
                features: ['f1', 'f2'],
                examples: [[true, false], [true, false]]
            }
        ]);
    });
    it('submit a two list of number and string should return boolean', function () {
        converter.getInputs().submit({
            'string': {
                features: ['f1', 'f2'],
                examples: [["true", ""], ["true", ""]]
            },
            'number': {
                features: ['f3', 'f4'],
                examples: [[0, 1], [0, 1]]
            }
        });
        var data = converter.transform();
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
    it('submit two empty list should return empty lists', function () {
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
        var data = converter.transform();
        expect(data).toEqual([
            {
                features: [],
                examples: []
            },
            {
                features: [],
                examples: []
            },
        ]);
    });
    it('submit nothing should return nothing', function () {
        converter.getInputs().submit({});
        var data = converter.transform();
        expect(data).toEqual([]);
    });
});
