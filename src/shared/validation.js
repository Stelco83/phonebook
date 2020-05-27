export const checkEmptyInput = (value) => {

    const result = {
        valueOutput: '',
        req: true
    }

    result.valueOutput = value.trim();

    if (result.valueOutput === '') {
        result.req = false
    } else {
        result.req = true
    }

    return result

}


export  const checkValidity = (value, rules) => {
    let isValid = true;

    if(rules.required){
        isValid = value.trim() !== '' && isValid
    }

    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid
    }
    if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid
    }

    return isValid;
    
}