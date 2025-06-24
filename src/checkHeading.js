export function checkHeading(str){
    return /^(\*)(\*)(.*)\*$/.test(str)
}
export function removeStar(str){
    return str.replace(/^(\*)(\*)|(\*)$/g,'')
}