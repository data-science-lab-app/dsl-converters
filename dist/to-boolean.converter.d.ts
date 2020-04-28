import { TransformPlugin, PluginInputs, PluginData, PluginDataInput, Option, PluginOptions } from "data-science-lab-core";
export declare class ToBooleanConverter extends TransformPlugin {
    options: ToBooleanConverterPluginOptions;
    inputs: ToBooleanConverterPluginInputs;
    inputData: PluginData[];
    constructor();
    getOptions(): PluginOptions;
    getInputs(): PluginInputs;
    transform(): PluginData | PluginData[];
    add(pluginData: PluginData): void;
}
declare class ToBooleanConverterPluginInputs extends PluginInputs {
    converter: ToBooleanConverter;
    constructor(converter: ToBooleanConverter);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class ToBooleanConverterPluginOptions extends PluginOptions {
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
export {};
