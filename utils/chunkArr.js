export default  function splitArray(oldArr, num) {
	oldArr.sort((a, b) => {
		return a - b
	})
	if (oldArr.length <= 0) return oldArr
	let newArr = [];
	if (Math.ceil(oldArr.length / num) <= 1) {
		newArr.push(oldArr)
		return newArr
	}
	for (let i = 0; i < oldArr.length; i = i + num) {
		newArr.push(oldArr.slice(i, i + num));
	}
return newArr
}
