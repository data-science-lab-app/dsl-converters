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
var ToNumberConverter = /** @class */ (function (_super) {
    __extends(ToNumberConverter, _super);
    function ToNumberConverter() {
        var _this = _super.call(this) || this;
        _this.options = new ToNumberConverterPluginOptions();
        _this.inputs = new ToNumberConverterPluginInputs(_this);
        _this.inputData = [];
        return _this;
    }
    ToNumberConverter.prototype.getOptions = function () {
        return this.options;
    };
    ToNumberConverter.prototype.getInputs = function () {
        return this.inputs;
    };
    ToNumberConverter.prototype.transform = function () {
        return this.inputData.map(function (value) { return ({
            features: value.features,
            examples: value.examples.map(function (row) { return row.map(function (example) { return +example; }); })
        }); });
    };
    ToNumberConverter.prototype.add = function (pluginData) {
        this.inputData.push(pluginData);
    };
    return ToNumberConverter;
}(data_science_lab_core_1.TransformPlugin));
exports.ToNumberConverter = ToNumberConverter;
var ToNumberConverterPluginInputs = /** @class */ (function (_super) {
    __extends(ToNumberConverterPluginInputs, _super);
    function ToNumberConverterPluginInputs(converter) {
        var _this = _super.call(this) || this;
        _this.converter = converter;
        return _this;
    }
    ToNumberConverterPluginInputs.prototype.submit = function (inputs) {
        if (inputs['string'] !== undefined) {
            this.converter.add(inputs['string']);
        }
        if (inputs['boolean'] !== undefined) {
            this.converter.add(inputs['boolean']);
        }
    };
    ToNumberConverterPluginInputs.prototype.inputs = function () {
        return [{
                id: 'string',
                label: 'Features to convert string to number',
                min: 0,
                type: 'string'
            },
            {
                id: 'boolean',
                label: 'Features to convert boolean to number',
                min: 0,
                type: 'boolean'
            }];
    };
    return ToNumberConverterPluginInputs;
}(data_science_lab_core_1.PluginInputs));
var ToNumberConverterPluginOptions = /** @class */ (function (_super) {
    __extends(ToNumberConverterPluginOptions, _super);
    function ToNumberConverterPluginOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToNumberConverterPluginOptions.prototype.submit = function (inputs) {
        throw new Error("To Number Converter has no submit options.");
    };
    ToNumberConverterPluginOptions.prototype.options = function () {
        throw new Error("To Number Converter has no options.");
    };
    ToNumberConverterPluginOptions.prototype.noMore = function () {
        return true;
    };
    return ToNumberConverterPluginOptions;
}(data_science_lab_core_1.PluginOptions));
