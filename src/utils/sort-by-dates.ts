import Dateable from "../domain/dateable"


function sortByDates<TDateable extends Dateable>(collection: TDateable[]): TDateable[] {
	return collection.sort((a, b): number => {
		if (a.start < b.start) return +1
		if (a.start > b.start) return -1

		if (!b.end || (a.end && a.end < b.end)) return +1
		if (!a.end || (b.end && a.end > b.end)) return -1

		return 0
	})
}

export default sortByDates
