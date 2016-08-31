/**
 * test if variable is an object
 *
 * @param {mixed} param The variable to test
 *
 * @return {boolean} If the variable is an object or not
 */
function is_object(param) {
    'use strict';
    return Object.prototype.toString.call(param) === '[object Object]';
}

/**
 * dynamically unset value of a multi-dimensional array
 *
 * @param {Array} path List of properties to traverse to reach the property to be unset
 * @param {object} original The object from which to unset the property
 *
 * @return {mixed} unset element on success, false if property does not exist or if original is not an object
 */
function dynamic_unset(path, original) {
    'use strict';
    if (!is_object(original))  {
        return false;
    }
    var part;
    while (path.length > 1) {
        part = path.shift();
        if (original.hasOwnProperty(part)) {
            original = original[part];
        } else {
            return false;
        }
    }
    if (!original.hasOwnProperty(path[0])) {
        return false;
    }
    var ret = original[path[0]];
    delete original[path[0]];
    return ret;
}

/**
 * dynamically set value of a multi-dimensional array
 *
 * @param {Array} path List of properties to traverse to reach the property to be set
 * @param {object} original The object in which to set the property
 * @param {mixed} val The value to set
 *
 * @return {boolean} If the assignment succeeded or not. If original is not an object returns false
 */
function dynamic_set(path, original, val) {
    'use strict';
    if (!is_object(original))  {
        return false;
    }
    var part;
    while (path.length > 1) {
        part = path.shift();
        if (!original.hasOwnProperty(part)) {
            original[part] = {};
        }
        original = original[part];
    }
    if (!original) {
        return false;
    }
    
    original[path[0]] = val;
    return true;
}