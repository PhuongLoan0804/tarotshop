import axios from "axios"

const getUser = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${document.cookie.split("=")[1]}`,
    },
  }
  try {
    const user = await axios.get(
      `${process.env.REACT_APP_BACK_END_URL}/users/me`,
      config
    )
    return user.data.isOk ? true : false
  } catch (error) {
    console.log(error)
    return false
  }
}

export default getUser
