export default (arr = [], key, toggle) => {
    if(!arr.length) return []
    if(arr.some(el => !(key in el))) return console.error("cannot find some keys in array")
    let workArr = JSON.parse(JSON.stringify(arr))
    let sortArr = []
    let type = typeof workArr[0][key]
    if ( type === "object" ){
        toggle ? sortArr = workArr.sort((a,b)=> a[key].length - b[key].length )
                : sortArr = workArr.sort((a,b)=> b[key].length - a[key].length  )
    }
    if ( type === "number" || type === "boolean"){
        toggle ? sortArr = workArr.sort((a,b)=> a[key] - b[key] )
                : sortArr = workArr.sort((a,b)=> b[key] - a[key]  )
    }
    if ( type === "string"){
        toggle ? sortArr = workArr.sort((a,b)=> a[key].charCodeAt() - b[key].charCodeAt() )
                : sortArr = workArr.sort((a,b)=> b[key].charCodeAt() - a[key].charCodeAt()  )
    }
    return sortArr
}
