
// Makes the list in Alphabetic Order
export const alphabeticSorting = (data, alphabeticOrder) => {
  let dataListing = [...data]
  
  // if (alphabeticOrder === null) {
  //   dataListing = [...data]
  //   console.log('HEY NULL')
  // } 
   if(alphabeticOrder) {
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
    } 

   if (!alphabeticOrder) {
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
