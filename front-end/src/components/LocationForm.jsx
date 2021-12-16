import useLocationForm from "../hooks/useLocationForm"
import Select from "react-select"
import Button from "./Button"

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

  return (
    <form>
      <div className=''>
        <div className='order-info'>
          <div className='order-info__title'>
            <h1>thông tin giao hàng</h1>
          </div>
          <div className='order-info__form'>
            <div className='form-group'>
              <label>Họ và tên</label>
              <input type='text' />
            </div>
            <div className='form-group'>
              <label>Số điện thoại</label>
              <input type='text' />
            </div>
            <div className='form-group'>
              <label>Địa chỉ</label>
              <input type='text' />
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
          <Button size='block' onClick={props.handleOrder}>
            Đặt hàng
          </Button>
        </div>
      </div>
    </form>
  )
}

export default LocationForm
