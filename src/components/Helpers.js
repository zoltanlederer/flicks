
// MovieListTemplate.js - Makes the list in Alphabetic Order
export const alphabeticSorting = (data, alphabeticOrder) => {
  let dataListing = [...data.results]

  if (alphabeticOrder === null) {
    dataListing = data.results
  } else if(alphabeticOrder) {
    dataListing = dataListing.sort((a,b) => {
      const titleA = a.title.toLowerCase()
      const titleB = b.title.toLowerCase()

      if (titleA < titleB) {
        return 1
      }

      if (titleA > titleB) {
        return -1
      }
      return 0

    })
  } else if (!alphabeticOrder) {
    dataListing = dataListing.sort((a,b) => {
      const titleA = a.title.toLowerCase()
      const titleB = b.title.toLowerCase()

      if (titleA < titleB) {
        return -1
      }

      if (titleA > titleB) {
        return 1
      }
      return 0

    })
  }
  return dataListing
}