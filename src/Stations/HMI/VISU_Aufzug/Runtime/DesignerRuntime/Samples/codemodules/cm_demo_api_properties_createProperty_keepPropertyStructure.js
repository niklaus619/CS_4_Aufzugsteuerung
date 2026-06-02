/**
 * Demo how to use sigApi.properties.createProperty
 * 
 * demo setup:
 *   required datapoint (by name)
 *     * '0:SampleObject.SampleServer' with unit and unitScheme
 * 
 * there are 3 possible scenarios we need to handle
 *  * scenario 1: 
 *      - datapoint has unit
 *      - datapoint has no unitScheme
 * 
 *      blueprint structure:
 *        {PropertyUnit}
 * 
 *      -> this._property is {PropertyUnit}
 * 
 *  * scenario 2:
 *      - datapoint has no unit
 *      - datapoint has unitScheme
 * 
 *      blueprint structure:
 *        {PropertyScheme}
 *          |- {PropertyUnit}
 *          |- ...
 * 
 *      -> this._property and updatedProperty are {PropertyScheme}
 * 
 *  * scenario 3:
 *      - datapoint has unit
 *      - datapoint has unitScheme
 * 
 *      blueprint structure:
 *        {PropertyPropertySwitch}
 *          |- {PropertyUnit}
 *          |- {PropertyScheme}
 *               |- {PropertyUnit}
 *               |- ...
 * 
 *       -> this._property is {PropertyPropertySwitch}
 * 
 * copyright by Sigmatek GmbH & CoKG
 */

const DATAPOINT_NAME = '0:SampleObject.SampleServer';

class DemoApiPropertiesCreateProperty {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiPropertiesCreateProperty();
        });
    }

    constructor() {
        this._property = undefined;

        const datapoint = sigApi.datapointManager.getDatapoint(DATAPOINT_NAME);
        if (!datapoint) {
            console.log(`[cm_demo_api_properties_createProperty_keepPropertyStructure] sigApi.datapointManager.getDatapoint('${DATAPOINT_NAME}') failed!`);
            return;
        }
        const blueprint = sigApi.datapointManager.getDatapoint(DATAPOINT_NAME).getProperties().unit;
        if (!blueprint) {
            console.log(`[cm_demo_api_properties_createProperty_keepPropertyStructure] sigApi.datapointManager.getDatapoint('${DATAPOINT_NAME}').getProperties().unit failed!`);
            return;
        }
        // for a blueprint to be observable it requires a name and a dest != SIG_CONST.PROP_DEST_NONE
        blueprint.name = 'unit';
        blueprint.dest = sigApi.SIG_CONST.PROP_DEST_VARIABLE;
        const predefPropMask = undefined; // [predefPropMask=sigApi.SIG_CONST.PROP_PREDEF_PROPS_MASK_AUTO]
        const keepPropertyStructure = true;
        this._property = sigApi.properties.createProperty(blueprint, predefPropMask, keepPropertyStructure);
        if (sigApi.properties.instanceofPropertyUnit(this._property)) {
            // scenario 1 - no observer required
            console.log(`[cm_demo_api_properties_createProperty_keepPropertyStructure] the unitText of this._property is: ${this._property.getValue().getUnitText()}`);
            console.log('[cm_demo_api_properties_createProperty_keepPropertyStructure] this._property is instanceof {PropertyUnit} -> no observer required');
            return;
        } else if (sigApi.properties.instanceofPropertyScheme(this._property)) {
            // scenario 2
            console.log('[cm_demo_api_properties_createProperty_keepPropertyStructure] this._property is instanceof {PropertyScheme} -> addObserver');
        } else if (sigApi.properties.instanceofPropertyPropertySwitch(this._property)) {
            // scenario 3
            console.log('[cm_demo_api_properties_createProperty_keepPropertyStructure] this._property is instanceof {PropertyPropertySwitch} -> addObserver');
        }
        this._property.addObserver(
            /**
             * @param {Unit|undefined} updatedValue 
             */
            (updatedValue) => {
                console.log('[cm_demo_api_properties_createProperty_keepPropertyStructure] observer callback');
                if (sigApi.unitManager.instanceofUnit(updatedValue)) {
                    // scenario 2.1, 3
                    console.log('[cm_demo_api_properties_createProperty_keepPropertyStructure] updatedValue is instanceof {Unit}');
                    console.log(`[cm_demo_api_properties_createProperty_keepPropertyStructure] the unitText of updatedValue is: ${updatedValue.getUnitText()}`);
                } else {
                    // scenario 2.2
                    console.log('[cm_demo_api_properties_createProperty_keepPropertyStructure] updatedValue is NOT instanceof {Unit}');
                    console.log('[cm_demo_api_properties_createProperty_keepPropertyStructure] the unitText of updatedValue is: undefined');
                }

                if (sigApi.properties.instanceofPropertyScheme(this._property)) {
                    // scenario 2
                    const propertyUnit = this._property.getValue();
                    if (!propertyUnit) {
                        // scenario 2.2
                        console.log('[cm_demo_api_properties_createProperty_keepPropertyStructure] PropertyScheme input value is NOT valid');
                        console.log('');
                        return;
                    }
                    if (sigApi.properties.instanceofPropertyUnit(propertyUnit)) {
                        // scenario 2.1
                        console.log(`[cm_demo_api_properties_createProperty_keepPropertyStructure] the unitText of propertyUnit is: ${propertyUnit.getValue().getUnitText()}`);
                    } else {
                        console.log('[cm_demo_api_properties_createProperty_keepPropertyStructure] ERROR: propertyUnit is NOT instanceof {PropertyUnit}');
                    }
                } else if (sigApi.properties.instanceofPropertyPropertySwitch(this._property)) {
                    // scenario 3
                    const propertyUnit = this._property.getValue();
                    if (sigApi.properties.instanceofPropertyUnit(propertyUnit)) {
                        console.log(`[cm_demo_api_properties_createProperty_keepPropertyStructure] the unitText of propertyUnit is: ${propertyUnit.getValue().getUnitText()}`);
                    } else {
                        console.log('[cm_demo_api_properties_createProperty_keepPropertyStructure] ERROR: propertyUnit is NOT instanceof {PropertyUnit}');
                    }
                } else {
                    console.log('[cm_demo_api_properties_createProperty_keepPropertyStructure] ERROR: this._property is NOT instanceof {PropertyPropertySwitch|PropertyScheme}');
                }
                console.log('');
            });
    }

}

DemoApiPropertiesCreateProperty.init();
