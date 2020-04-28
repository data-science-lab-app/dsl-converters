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
var ToStringConverter = /** @class */ (function (_super) {
    __extends(ToStringConverter, _super);
    function ToStringConverter() {
        var _this = _super.call(this) || this;
        _this.options = new ToStringConverterPluginOptions();
        _this.inputs = new ToStringConverterPluginInputs(_this);
        _this.inputData = [];
        return _this;
    }
    ToStringConverter.prototype.getOptions = function () {
        return this.options;
    };
    ToStringConverter.prototype.getInputs = function () {
        return this.inputs;
    };
    ToStringConverter.prototype.transform = function () {
        return this.inputData.map(function (value) { return ({
            features: value.features,
            examples: value.examples.map(function (row) { return row.map(function (example) { return "" + example; }); })
        }); });
    };
    ToStringConverter.prototype.add = function (pluginData) {
        this.inputData.push(pluginData);
    };
    return ToStringConverter;
}(data_science_lab_core_1.TransformPlugin));
exports.ToStringConverter = ToStringConverter;
var ToStringConverterPluginInputs = /** @class */ (function (_super) {
    __extends(ToStringConverterPluginInputs, _super);
    function ToStringConverterPluginInputs(converter) {
        var _this = _super.call(this) || this;
        _this.converter = converter;
        return _this;
    }
    ToStringConverterPluginInputs.prototype.submit = function (inputs) {
        if (inputs['number'] !== undefined) {
            this.converter.add(inputs['number']);
        }
        if (inputs['boolean'] !== undefined) {
            this.converter.add(inputs['boolean']);
        }
    };
    ToStringConverterPluginInputs.prototype.inputs = function () {
        return [{
                id: 'number',
                label: 'Features to convert number to string',
                min: 0,
                type: 'number'
            },
            {
                id: 'boolean',
                label: 'Features to convert boolean to string',
                min: 0,
                type: 'boolean'
            }];
    };
    return ToStringConverterPluginInputs;
}(data_science_lab_core_1.PluginInputs));
var ToStringConverterPluginOptions = /** @class */ (function (_super) {
    __extends(ToStringConverterPluginOptions, _super);
    function ToStringConverterPluginOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToStringConverterPluginOptions.prototype.submit = function (inputs) {
        throw new Error("To String Converter has no submit options.");
    };
    ToStringConverterPluginOptions.prototype.options = function () {
        throw new Error("To String Converter has no options.");
    };
    ToStringConverterPluginOptions.prototype.noMore = function () {
        return true;
    };
    return ToStringConverterPluginOptions;
}(data_science_lab_core_1.PluginOptions));
