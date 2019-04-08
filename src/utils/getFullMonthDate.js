export default date => {
	const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]
	return date.split(".")
			   .reduce((prev, el, ind) => {
					ind === 1? prev += " "+ monthNames[+el] : prev += " " + el
					return prev
				},"")
				.trim()
}