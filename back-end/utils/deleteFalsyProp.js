const deleteFalsyProp = (object) => {
  for (const k in object) {
    if (object.hasOwnProperty(k) && !object[k]) {
      delete object[k]
    }
  }

  return object
}

module.exports = { deleteFalsyProp }
