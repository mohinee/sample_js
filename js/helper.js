import * as testData from '../data/test.js';
import * as resetValues from '../data/reset.js';

export const attachEventListeners = (event, element, handler, options = false) => {
    element.addEventListener(event, handler, options);
}

export const fetchData = (path) => {
    return testData[path]
}

export const resetData = (path) => {
    testData[path] = resetValues[path];
}