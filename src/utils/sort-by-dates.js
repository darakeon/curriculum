function sortByDates(collection) {
	return collection.sort((a, b) => {
		if (a.End == b.End) {
			if (a.Start < b.Start) return +1
			if (a.Start > b.Start) return -1
			return 0
		}

		if (!b.End || a.End < b.End) return +1
		if (!a.End || a.End > b.End) return -1
	})
}

export default sortByDates
