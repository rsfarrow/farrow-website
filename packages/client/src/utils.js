/**
 * @desc global navigation method used to navigate either inside the app or to an external page
 * @param context this object from where it is being called, needed to grab the $router object
 * @param name String this is either the path name (internal) or url (external)
 * @param internal Boolean to mark if we should use the internal router or open in a new page
 */
exports.navTo = (context, name, internal = true) => {
  if (internal) context.$router.push({ name })
  else window.open(name, '_blank')
}

/**
 * @desc Used to remove items from an array, uses a simple
 * filter function to check and see if each element is equal to
 * an empty string, if it is, filter it.  Otherwise keep it.
 * @param removeFromArr Array to remove items from
 * @param itemToRemove This is the item you want to remove, default is an empty string
 * @return new Array without the items in it
 */
exports.removeItemFromArray = (removeFromArr, itemToRemove = undefined) => {
  return removeFromArr.filter((el) => { return el !== itemToRemove && el !== '' })
}
