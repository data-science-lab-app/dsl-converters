import { TransformPlugin, PluginInputs, PluginData, PluginDataInput, Option, PluginOptions } from "data-science-lab-core";


export class ToStringConverter extends TransformPlugin {

    options: ToStringConverterPluginOptions;
    inputs: ToStringConverterPluginInputs;

    inputData: PluginData[];

    constructor() {
        super();
        this.options = new ToStringConverterPluginOptions();
        this.inputs = new ToStringConverterPluginInputs(this);

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
            examples: value.examples.map(row => row.map(example => `${example}`))
        }));
    }


    add(pluginData: PluginData) {
        this.inputData.push(pluginData);
    }
}

class ToStringConverterPluginInputs extends PluginInputs {
    constructor(public converter: ToStringConverter) {
        super();
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        if (inputs['number'] !== undefined) {
            this.converter.add(inputs['number']);
        }
        if (inputs['boolean'] !== undefined) {
            this.converter.add(inputs['boolean']);
        }
    }

    inputs(): PluginDataInput[] {
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
    }
}

class ToStringConverterPluginOptions extends PluginOptions {
    submit(inputs: { [id: string]: any; }): void {
        throw new Error("To String Converter has no submit options.");
    }
    options(): Option[] {
        throw new Error("To String Converter has no options.");
    }
    noMore(): boolean {
        return true;
    }

}
