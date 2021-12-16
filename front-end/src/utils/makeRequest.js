import axios from "axios"

export const makePostRequeset = async (url, body) => {
  const config = {
    headers: {
      Authorization: `Bearer ${document.cookie.split("=")[1]}`,
    },
  }
  try {
    const user = await axios.post(url, body, config)
    return user.data.isOk ? true : false
  } catch (error) {
    console.log(error)
    return false
  }
}
