const Utils = require('./utils');

class MultiClassNode {
    constructor(...classes) {    
        let variablesDescription = '';
        const allMethodsAndVariables = {
            instancefunctions: [],
            staticFunctions: [],
            variables: []
        };
        const instanceVariables = [];
        const staticProperties = {};
        const instanceProperties = {};
        let newClazzContructor = undefined;
        classes.forEach(clazz => {            
            const instance = new clazz();            
            Utils.getStaticMethods(clazz, staticProperties, allMethodsAndVariables);
            Utils.getInstanceMethods(clazz, instanceProperties, allMethodsAndVariables);
            variablesDescription += Utils.getConstructorDescription(instance, instanceVariables, allMethodsAndVariables);    
        });
        newClazzContructor = new Function('args', variablesDescription);

        Object.assign(newClazzContructor, staticProperties);

        const instPropsKeys = Object.keys(instanceProperties);

        instPropsKeys.forEach(key => {
            newClazzContructor.prototype[key] = instanceProperties[key];
        });

        const custom = new newClazzContructor();

        return custom.constructor;
    }
}



module.exports = MultiClassNode;