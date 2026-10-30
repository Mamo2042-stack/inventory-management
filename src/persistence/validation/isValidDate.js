export function isValidDate(dateData){
    if(typeof dateData !== "string"){
        return false;
    }

    const parsedDate = new Date(dateData);

    return (
        !Number.isNaN(parsedDate.getTime()) &&
        parsedDate.toISOString() === dateData // if parsedDate can be converted back to dateData //
    )
}