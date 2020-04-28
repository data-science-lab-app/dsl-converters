import { TransformPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData } from 'data-science-lab-core';
export declare class ToNumberConverter extends TransformPlugin {
    options: ToNumberConverterPluginOptions;
    inputs: ToNumberConverterPluginInputs;
    inputData: PluginData[];
    constructor();
    getOptions(): PluginOptions;
    getInputs(): PluginInputs;
    transform(): PluginData | PluginData[];
    add(pluginData: PluginData): void;
}
declare class ToNumberConverterPluginInputs extends PluginInputs {
    converter: ToNumberConverter;
    constructor(converter: ToNumberConverter);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class ToNumberConverterPluginOptions extends PluginOptions {
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
export {};
