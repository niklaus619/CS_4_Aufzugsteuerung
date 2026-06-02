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
 *      -> scenario 2.1: this._property and updatedProperty are {PropertyUnit}
 *         or
 *         scenario 2.2: {PropertyScheme} when scheme evaluation has undefined result
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
 *       -> this._property is {PropertyUnit}
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
            console.log(`[cm_demo_api_properties_createProperty] sigApi.datapointManager.getDatapoint('${DATAPOINT_NAME}') failed!`);
            return;
        }
        const blueprint = sigApi.datapointManager.getDatapoint(DATAPOINT_NAME).getProperties().unit;
        if (!blueprint) {
            console.log(`[cm_demo_api_properties_createProperty] sigApi.datapointManager.getDatapoint('${DATAPOINT_NAME}').getProperties().unit failed!`);
            return;
        }
        // for a blueprint to be observable it requires a name and a dest != SIG_CONST.PROP_DEST_NONE
        blueprint.name = 'unit';
        blueprint.dest = sigApi.SIG_CONST.PROP_DEST_VARIABLE;
        this._property = sigApi.properties.createProperty(blueprint);
        if (blueprint.src === sigApi.SIG_CONST.PROP_SRC_UNIT) {
            // scenario 1 - no observer required
            console.log(`[cm_demo_api_properties_createProperty] the unitText of this._property is: ${this._property.getValue().getUnitText()}`);
            if (sigApi.properties.instanceofPropertyUnit(this._property)) {
                console.log('[cm_demo_api_properties_createProperty] this._property is instanceof {PropertyUnit} -> no observer required');
            } else {
                console.log('[cm_demo_api_properties_createProperty] ERROR: this._property is NOT instanceof {PropertyUnit}');
            }
            return;
        }
        this._property.addObserver(
            /**
             * @param {Unit|undefined} updatedValue 
             * @param {PropertyUnit} updatedProperty 
             */
            (updatedValue, updatedProperty) => {
                console.log('[cm_demo_api_properties_createProperty] observer callback');
                if (sigApi.unitManager.instanceofUnit(updatedValue)) {
                    // scenarios 2.1, 3
                    console.log('[cm_demo_api_properties_createProperty] updatedValue is instanceof {Unit}');
                    console.log(`[cm_demo_api_properties_createProperty] the unitText of updatedValue is: ${updatedValue.getUnitText()}`);
                } else {
                    // scenario 2.2
                    console.log('[cm_demo_api_properties_createProperty] updatedValue is NOT instanceof {Unit}');
                    console.log('[cm_demo_api_properties_createProperty] the unitText of updatedValue is: undefined');
                }

                // >>>
                // NOTE: do not use .__ in production code; this code is here to illustrate what is going on
                // compare .__ 'runtime property'-instances because 'user'-instances are created as they are requied and thus can never be compared by reference
                if (updatedProperty && this._property.__ !== updatedProperty.__) {
                    console.log('[cm_demo_api_properties_createProperty] updatedProperty has changed');
                } else {
                    console.log('[cm_demo_api_properties_createProperty] updatedProperty has NOT changed');
                }
                // <<<

                // locally stored reference of 'user'-instance needs to be updated
                this._property = updatedProperty;

                if (sigApi.properties.instanceofPropertyUnit(this._property)) {
                    // scenarios 2.1, 3
                    console.log(`[cm_demo_api_properties_createProperty] the unitText of this._property is: ${this._property.getValue().getUnitText()}`);
                } else if (sigApi.properties.instanceofPropertyScheme(this._property)) {
                    // scenario 2.2
                    console.log('[cm_demo_api_properties_createProperty] the unitText of this._property is: undefined');
                } else {
                    console.log('[cm_demo_api_properties_createProperty] ERROR: this._property is NOT instanceof {PropertyUnit|PropertyScheme}');
                }
                console.log('');
            }
        );
    }

}

DemoApiPropertiesCreateProperty.init();
