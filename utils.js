const SimplePropertyRetriever = require('./SimplePropertyRetriever');

const default_methods = [
    'length',
    'prototype',
    'name',
    'arguments',
    'caller',
    'constructor',
    'apply',
    'bind',
    'call',
    'toString',
    '__defineGetter__',
    '__defineSetter__',
    'hasOwnProperty',
    '__lookupGetter__',
    '__lookupSetter__',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'valueOf',
    '__proto__',
    'toLocaleString'
];

class Utils {
    static getConstructorDescription(instance, instanceVariables, allMethodsAndVariables) {
        let variablesDescription = '';
        const KeysInstance = Object.keys(instance);
        KeysInstance.forEach((key) => {
           Utils.validateDiamondProblem({type: 'var', prop: key}, allMethodsAndVariables);
            if(instance[key].constructor === Object.bind.constructor) {
                variablesDescription += 'this.' + key + ' = this.'+ key +'.bind(this); '
            } else if(instance[key].constructor === ''.constructor){
                variablesDescription += 'this.' + key + " = '" + instance[key] + "'; ";
            } else {
                variablesDescription += 'this.' + key + " = " + instance[key] + "; ";
            }        
            instanceVariables.push(instance[key]);
        });
        return variablesDescription;
    }

    static getStaticMethods(clazz, staticProperties, allMethodsAndVariables) {
        const props = SimplePropertyRetriever.getOwnAndPrototypeEnumerablesAndNonenumerables(clazz); 
        const staticFilter = props.filter(prop => {
            return !default_methods.includes(prop)
        });
    
        for (let prop of staticFilter) {
            Utils.validateDiamondProblem({type: 'static', prop: prop}, allMethodsAndVariables);
            staticProperties[prop] = clazz[prop];
        }
    }

    static getInstanceMethods(clazz, instanceProperties, allMethodsAndVariables) {
        const propsInstance =  SimplePropertyRetriever.getOwnAndPrototypeEnumerablesAndNonenumerables(clazz.prototype); 
        const instanceFilter = propsInstance.filter(prop => {
            return !default_methods.includes(prop);
        });
        for (let prop of instanceFilter) {    
            Utils.validateDiamondProblem({type: 'instance', prop: prop}, allMethodsAndVariables);
            instanceProperties[prop] = clazz.prototype[prop];
        }
    } 

    static validateDiamondProblem(prop, allMethodsAndVariables) {
        if(prop.type === 'instance') {
            if(allMethodsAndVariables.instancefunctions.includes(prop.prop)) {
                throw new Error('You cannot extend multiple classes that contain methods or variables with the same name.')
            } else {
                allMethodsAndVariables.instancefunctions.push(prop.prop);
            }
        } else if(prop.type === 'static') {
            if(allMethodsAndVariables.staticFunctions.includes(prop.prop)) {
                throw new Error('You cannot extend multiple classes that contain methods or variables with the same name.')
            } else {
                allMethodsAndVariables.staticFunctions.push(prop.prop);
            } 
        } else if(prop.type === 'var') {
            if(allMethodsAndVariables.variables.includes(prop.prop)) {
                throw new Error('You cannot extend multiple classes that contain methods or variables with the same name.')
            } else {
                allMethodsAndVariables.variables.push(prop.prop);
            } 
        }
    }
}

module.exports = Utils;