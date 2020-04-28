"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var data_science_lab_core_1 = require("data-science-lab-core");
var ToBooleanConverter = /** @class */ (function (_super) {
    __extends(ToBooleanConverter, _super);
    function ToBooleanConverter() {
        var _this = _super.call(this) || this;
        _this.options = new ToBooleanConverterPluginOptions();
        _this.inputs = new ToBooleanConverterPluginInputs(_this);
        _this.inputData = [];
        return _this;
    }
    ToBooleanConverter.prototype.getOptions = function () {
        return this.options;
    };
    ToBooleanConverter.prototype.getInputs = function () {
        return this.inputs;
    };
    ToBooleanConverter.prototype.transform = function () {
        return this.inputData.map(function (value) { return ({
            features: value.features,
            examples: value.examples.map(function (row) { return row.map(function (example) { return !!example; }); })
        }); });
    };
    ToBooleanConverter.prototype.add = function (pluginData) {
        this.inputData.push(pluginData);
    };
    return ToBooleanConverter;
}(data_science_lab_core_1.TransformPlugin));
exports.ToBooleanConverter = ToBooleanConverter;
var ToBooleanConverterPluginInputs = /** @class */ (function (_super) {
    __extends(ToBooleanConverterPluginInputs, _super);
    function ToBooleanConverterPluginInputs(converter) {
        var _this = _super.call(this) || this;
        _this.converter = converter;
        return _this;
    }
    ToBooleanConverterPluginInputs.prototype.submit = function (inputs) {
        if (inputs['number'] !== undefined) {
            this.converter.add(inputs['number']);
        }
        if (inputs['string'] !== undefined) {
            this.converter.add(inputs['string']);
        }
    };
    ToBooleanConverterPluginInputs.prototype.inputs = function () {
        return [{
                id: 'number',
                label: 'Features to convert number to boolean',
                min: 0,
                type: 'number'
            },
            {
                id: 'string',
                label: 'Features to convert string to boolean',
                min: 0,
                type: 'string'
            }];
    };
    return ToBooleanConverterPluginInputs;
}(data_science_lab_core_1.PluginInputs));
var ToBooleanConverterPluginOptions = /** @class */ (function (_super) {
    __extends(ToBooleanConverterPluginOptions, _super);
    function ToBooleanConverterPluginOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToBooleanConverterPluginOptions.prototype.submit = function (inputs) {
        throw new Error("To Boolean Converter has no submit options.");
    };
    ToBooleanConverterPluginOptions.prototype.options = function () {
        throw new Error("To Boolean Converter has no options.");
    };
    ToBooleanConverterPluginOptions.prototype.noMore = function () {
        return true;
    };
    return ToBooleanConverterPluginOptions;
}(data_science_lab_core_1.PluginOptions));
