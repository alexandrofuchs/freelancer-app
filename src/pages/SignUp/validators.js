function isNullorUndefined(value) {
    return value === undefined | value === null;
}

function isEmpty(value) {
    if (isNullorUndefined(value)) return true; 
    if (Array.isArray(value) && !(value.length > 0)) return true;
    return !(String(value).length > 0);
}

function isValidEmail(value) {
    if (isEmpty(value)) return false; 
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(value).toLowerCase());
}

function isAlphanumeric(value) {
    if (isEmpty(value)) return false; 
    const regex = /^[0-9a-zA-Z]+$/;
    return regex.test(String(value));
}

function isNumeric(value) {
    if (isEmpty(value)) return false; 
    const regex = /^[0-9]+$/;
    return regex.test(String(value));
}

function isWord(value) {
    if (isEmpty(value)) return false;  
    const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/;
    return regex.test(String(value));
}

function maxLength(value, max) {
    if (!isEmpty(value)) {
        return !(String(value).length > max);
    }
    return false;
}

function minLength(value, min) {
    if (isEmpty(value)) return false;
    return (String(value).length >= min);        
}

function maxAndMinLength(value, min, max) {
    if (!isEmpty(value)) {
        return !(String(value).length < min) && !(String(value).length > max);
    }
    return false;
}

export {
    isValidEmail,
    isAlphanumeric,
    isNullorUndefined,
    isEmpty,
    isNumeric,
    isWord,
    maxAndMinLength,
    maxLength,
    minLength
};