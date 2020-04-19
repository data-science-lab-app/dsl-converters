import { TransformPlugin, PluginInputs, PluginData, PluginDataInput, Option, PluginOptions } from "data-science-lab-core";


export class ToBooleanConverter extends TransformPlugin {

    options: ToBooleanConverterPluginOptions;
    inputs: ToBooleanConverterPluginInputs;

    inputData: PluginData[];

    constructor() {
        super();
        this.options = new ToBooleanConverterPluginOptions();
        this.inputs = new ToBooleanConverterPluginInputs(this);

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
            examples: value.examples.map(row => row.map(example => !!example))
        }));
    }


    add(pluginData: PluginData) {
        this.inputData.push(pluginData);
    }
}

class ToBooleanConverterPluginInputs extends PluginInputs {
    constructor(public converter: ToBooleanConverter) {
        super();
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        if (inputs['number'] !== undefined) {
            this.converter.add(inputs['number']);
        }
        if (inputs['string'] !== undefined) {
            this.converter.add(inputs['string']);
        }
    }

    inputs(): PluginDataInput[] {
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
    }
}

class ToBooleanConverterPluginOptions extends PluginOptions {
    submit(inputs: { [id: string]: any; }): void {
        throw new Error("To Boolean Converter has no submit options.");
    }
    options(): Option[] {
        throw new Error("To Boolean Converter has no options.");
    }
    noMore(): boolean {
        return true;
    }

}
