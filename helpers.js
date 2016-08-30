/**
 * dynamically unset value of a multi-dimensional array
 *
 * @param {Array} path List of properties to traverse to reach the property to be unset
 * @param {object} original The object from which to unset the property
 *
 * @return {mixed} unset element on success, false if property does not exist
 */
function dynamic_unset(path, original) {
    var pass = false, part;
    while (path.length > 1) {
        part = path.shift();
        if (!pass && original.hasOwnProperty(part)) {
            pass = original[part]
        } else if (pass && pass.hasOwnProperty(part)) {
            pass = pass[part]
        } else {
            return false;
        }
    }
    if (!pass.hasOwnProperty(path[0]) {
        return false;
    }
    var ret = pass[path[0]];
    delete pass[path[0]];
    return ret;
}

/**
 * dynamically set value of a multi-dimensional array
 *
 * @param {Array} path List of properties to traverse to reach the property to be set
 * @param {object} original The object in which to set the property
 * @param {mixed} val The value to set
 *
 * @return {boolean} If the assignment succeeded or not
 */
function dynamic_set(path, original, val) {
    var pass = false, part;
    while (path.length > 1) {
        part = path.shift();
        if (!pass) {
            if (!original.hasOwnProperty(part)) {
                original[part] = {};
            }
            pass = original[part];
        } else {
            if (!pass.hasOwnProperty(part)) {
                pass[part] = {};
            }
            pass = pass[part];
        }
    }
    if (!pass) {
        return false;
    }
    
    pass[path[0]] = val;
    return true;
}