import { TransformPlugin, PluginInputs, PluginData, PluginDataInput, Option, PluginOptions } from "data-science-lab-core";
export declare class ToStringConverter extends TransformPlugin {
    options: ToStringConverterPluginOptions;
    inputs: ToStringConverterPluginInputs;
    inputData: PluginData[];
    constructor();
    getOptions(): PluginOptions;
    getInputs(): PluginInputs;
    transform(): PluginData | PluginData[];
    add(pluginData: PluginData): void;
}
declare class ToStringConverterPluginInputs extends PluginInputs {
    converter: ToStringConverter;
    constructor(converter: ToStringConverter);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class ToStringConverterPluginOptions extends PluginOptions {
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
export {};
