export default arr => {
  let dateToNum = date =>  +date.split(".")
                                .reverse()
                                .reduce((prev, el)=> prev += el,"")

  return arr.sort((a,b) => dateToNum(b) - dateToNum(a))[0]
}
