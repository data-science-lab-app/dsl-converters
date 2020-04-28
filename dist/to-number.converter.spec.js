"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var to_number_converter_1 = require("./to-number.converter");
describe('To Number Converter Tests', function () {
    var converter;
    beforeEach(function () {
        converter = new to_number_converter_1.ToNumberConverter();
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
    it('submit a single list of string should return numbers', function () {
        converter.getInputs().submit({
            'string': {
                features: ['f1', 'f2'],
                examples: [["1", "2"], ["3", "4"]]
            }
        });
        var data = converter.transform();
        expect(data).toEqual([
            {
                features: ['f1', 'f2'],
                examples: [[1, 2], [3, 4]]
            }
        ]);
    });
    it('submit a single list of boolean should return numbers', function () {
        converter.getInputs().submit({
            'boolean': {
                features: ['f1', 'f2'],
                examples: [[true, false], [true, false]]
            }
        });
        var data = converter.transform();
        expect(data).toEqual([
            {
                features: ['f1', 'f2'],
                examples: [[1, 0], [1, 0]]
            }
        ]);
    });
    it('submit a two list of string and boolean should return numbers', function () {
        converter.getInputs().submit({
            'boolean': {
                features: ['f1', 'f2'],
                examples: [[true, false], [true, false]]
            },
            'string': {
                features: ['f3', 'f4'],
                examples: [["1", "2"], ["3", "4"]]
            }
        });
        var data = converter.transform();
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
    it('submit two empty list should return empty lists', function () {
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
