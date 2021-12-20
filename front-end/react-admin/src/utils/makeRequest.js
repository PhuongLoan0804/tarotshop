import axios from "axios"

const config = {
  headers: {
    Authorization: `Bearer ${document.cookie.split("=")[1]}`,
  },
}

export const makePostRequeset = async (url, body) => {
  try {
    const user = await axios.post(url, body, config)
    return user.data.isOk ? true : false
  } catch (error) {
    console.log(error)
    return false
  }
}

export const makeGetRequest = async (url) => {
  try {
    const response = await axios.get(url, config)
    const user = response.data

    return user
  } catch (error) {
    throw new Error(error)
  }
}

export const makePatchRequest = async (url, body) => {
  try {
    const response = await axios.patch(url, body, config)
    const user = response.data

    return user
  } catch (error) {
    throw new Error(error)
  }
}

export const makeDeleteRequest = async (url) => {
  try {
    const response = await axios.delete(url, config)
    const user = response.data

    return user
  } catch (error) {
    throw new Error(error)
  }
}
