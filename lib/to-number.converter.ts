import { TransformPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData } from 'data-science-lab-core';


export class ToNumberConverter extends TransformPlugin {

    options: ToNumberConverterPluginOptions;
    inputs: ToNumberConverterPluginInputs;

    inputData: PluginData[];

    constructor() {
        super();
        this.options = new ToNumberConverterPluginOptions();
        this.inputs = new ToNumberConverterPluginInputs(this);
        this.inputData = [];
    }

    getOptions(): PluginOptions {
        return this.options;
    }
    getInputs(): PluginInputs {
        return this.inputs;
    }

    transform(): PluginData | PluginData[] {
        return this.inputData.map(value => ({
            features: value.features,
            examples: value.examples.map(row => row.map(example => +example))
        }));
    }

    add(pluginData: PluginData) {
        this.inputData.push(pluginData);
    }

}

class ToNumberConverterPluginInputs extends PluginInputs {
    constructor(public converter: ToNumberConverter) {
        super();
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        if (inputs['string'] !== undefined) {
            this.converter.add(inputs['string']);
        }
        if (inputs['boolean'] !== undefined) {
            this.converter.add(inputs['boolean']);
        }
    }

    inputs(): PluginDataInput[] {
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
    }
}

class ToNumberConverterPluginOptions extends PluginOptions {
    submit(inputs: { [id: string]: any; }): void {
        throw new Error("To Number Converter has no submit options.");
    }
    options(): Option[] {
        throw new Error("To Number Converter has no options.");
    }
    noMore(): boolean {
        return true;
    }

}
