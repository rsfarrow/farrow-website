exports.navTo = (context, name, internal = true) => {
  if (internal) context.$router.push({ name })
  else window.open(name, '_blank')
}
