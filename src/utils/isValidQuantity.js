export function isValidQuantity(input){
// input is expected to be string 
// this accepts an empty input as zero //

const quantityPattern =  /^\d+(\.\d)?$/;

if(!quantityPattern.test(input) || typeof input !== "string"){
    return false;
}

const quantity = Number(input);

if(!Number.isFinite(quantity)){
    return false;
}

return true;
}