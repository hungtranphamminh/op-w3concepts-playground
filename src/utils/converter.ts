export const AddressShortener = (address:string, partialLength:number):string => {
  return address.slice(0, 6) +"..." +address.slice(-6)
}