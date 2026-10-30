export function isValidQuantity(input){
// input is expected to be string //

const quantityPattern =  /^\d+(\.\d)?$/;

if(typeof input !== "string" || !quantityPattern.test(input) ){
    return false;
}

const quantity = Number(input);

if(!Number.isFinite(quantity)){
    return false;
}

return true;
}