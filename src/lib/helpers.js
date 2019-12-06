export function asLocation(lat, lng) {
	return {
		latitude: lat,
		longitude: lng,
	}
}


export function cleanResults(results, uuidName) {
	// NOTE tbg: don't sort by distance since lat lng is private data
	let sorted = []
	let sortedUuids = []

	// remove duplicates
	results.forEach((result, idx) => {
		if (sortedUuids.indexOf(result[uuidName]) === -1) {
			sorted.push(result)
			sortedUuids.push(result[uuidName])
		}
	})
	
	return sorted
}


export function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
