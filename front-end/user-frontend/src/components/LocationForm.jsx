import useLocationForm from "../hooks/useLocationForm"
import Select from "react-select"
import Button from "./Button"
import checkValidCookie from "../utils/checkValidCookie"
import { makePostRequeset } from "../utils/makeRequest"
import { useState } from "react"

function LocationForm(props) {
  const { state, onCitySelect, onDistrictSelect, onWardSelect } =
    useLocationForm(true)

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state

  const [userInput, setUserInput] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInput({ ...userInput, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // props.setProvince({ selectedCity, selectedDistrict, selectedWard })

    const isLogged = await checkValidCookie()
    props.setIsLogged(isLogged)

    console.log(props.items)

    console.log({
      ...props.items,
      selectedCity,
      selectedDistrict,
      selectedWard,
      ...userInput,
    })

    await makePostRequeset(`${process.env.REACT_APP_BACK_END_URL}/orders`, {
      ...props.items,
      selectedCity,
      selectedDistrict,
      selectedWard,
      ...userInput,
    })
    localStorage.clear()
    alert("Đặt hàng thành công")
    window.location.href = "/me"
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className='order-info'>
          <div className='order-info__title'>
            <h1>thông tin giao hàng</h1>
          </div>
          <div className='order-info__form'>
            <div className='form-group'>
              <label>Họ và tên</label>
              <input
                type='text'
                name='name'
                value={userInput.name}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Số điện thoại</label>
              <input
                type='tel'
                name='phoneNumber'
                value={userInput.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Địa chỉ</label>
              <input
                type='text'
                name='address'
                value={userInput.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='form-group'>
            <label>Tỉnh/Thành Phố</label>
            <Select
              name='cityId'
              key={`cityId_${selectedCity?.value}`}
              isDisabled={cityOptions.length === 0}
              options={cityOptions}
              onChange={(option) => onCitySelect(option)}
              placeholder='Tỉnh/Thành'
              defaultValue={selectedCity}
              className='width'
            />
          </div>

          <div className='form-group'>
            <label>Quận/Huyện</label>
            <Select
              name='districtId'
              key={`districtId_${selectedDistrict?.value}`}
              isDisabled={districtOptions.length === 0}
              options={districtOptions}
              onChange={(option) => onDistrictSelect(option)}
              placeholder='Quận/Huyện'
              defaultValue={selectedDistrict}
              className='width'
            />
          </div>

          <div className='form-group'>
            <label>Phường/Xã</label>
            <Select
              name='wardId'
              key={`wardId_${selectedWard?.value}`}
              isDisabled={wardOptions.length === 0}
              options={wardOptions}
              placeholder='Phường/Xã'
              onChange={(option) => onWardSelect(option)}
              defaultValue={selectedWard}
              className='width'
            />
          </div>
          <Button size='block' type='submit'>
            Đặt hàng
          </Button>
        </div>
      </div>
    </form>
  )
}

export default LocationForm
