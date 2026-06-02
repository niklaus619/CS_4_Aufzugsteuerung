//////////////////////////////////////////////////////////////////////////////////////////////
// Usage of Singleton as javaScript module (for application and control developers)

// IMPORTANT: If used in control development, ship the implementation in the control folder and
// add the file to control dependencies, rather than adding it to the LVDs codemodules!

// Use javascript module import to import the class from singleton.js
// IMPORTANT: Module import is only necessary if the singleton will be accessed from a different file!
import { Singleton } from './singleton.js'; // './cm_template_singleton.js'

// Access of the singleton through direct call of getInstance
const singletonInstance = Singleton.getInstance();
console.log(`Singleton.getInstance() returned instanceof Singleton: ${singletonInstance instanceof Singleton}`);

const someResult = Singleton.getInstance().doSomething('someData');
console.log(someResult);

// Access of the singleton in control development
export class CustomControl extends LasalRuntimeSigElement {
    static get is() {
        return 'custom-control';
    }

    /*
    .
    .
    .
    */

    someFunction() {
        // Access singleton via singletonInstance
        singletonInstance.doSomething('someData');

        // Access singleton via Singleton.getInstance()
        const someResult = Singleton.getInstance().doSomething('someData');
        console.log(someResult);
    }

}
