exports.navTo = (context, path, internal = true) => {
  if (internal) context.$router.push({ name: path })
  else window.open(path, '_blank')
}
