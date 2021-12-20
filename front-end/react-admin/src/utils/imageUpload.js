const uploadImage = async (imageInput) => {
  if (!imageInput) return

  const file = imageInput.files[0]

  // get secure url from our server
  const getUrl = await fetch("https://upload-image-123.azurewebsites.net/")
  const { url } = await getUrl.json()

  if (!file) {
    alert("Please put an image here!")
  } else {
    // check if this is an image
    const fileType = file.type
    const acceptedFiletype = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/gif",
    ]

    if (acceptedFiletype.indexOf(fileType) < 0) {
      alert(`Only accept ${acceptedFiletype.toString()}`)
    } else {
      // post the image directly to the s3 bucket
      await fetch(url, {
        method: "put",
        headers: {
          "Content-Type": fileType,
        },
        body: file,
      })

      return url.split("?")[0]
    }
  }
}

module.exports = {
  uploadImage,
}
