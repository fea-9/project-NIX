export default date => {
   var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"]
   return date.split(".").reduce((prev, el, ind)=> {
    ind === 0 ? prev = prev + el : ind === 1 ?
       prev = monthNames[+el]+ " " + prev : prev = prev + ", " + el
    return prev
   },"")
}
