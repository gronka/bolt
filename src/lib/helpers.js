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


export function makeTimeLabel(format, time, tzOffset) {
		var timeLabel = ""
		var localTime = time + tzOffset
		var hour = localTime.getHours()
		var minute = localTime.getMinutes()
		if (format === "standard") {
					var suffix = " AM"
					if (hour > 12) {
									suffix = " PM"
									hour = hour - 12
								}
					timeLabel = hour + ":" + minute + suffix
				} else {
							timeLabel = hour + ":" + minute
						}
		return timeLabel
}
