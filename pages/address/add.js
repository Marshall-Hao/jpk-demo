import { memo, useState } from 'react'
import AddressPicker from '@/Common/AddressPicker'
import s from './add.module.css'

const AddressAdd = () => {
  const [address, setAddress] = useState({
    id: '', // 地址id
    name: '', // 姓名
    mobile: '', // 手机号
    province: '', // 省
    city: '', // 市
    area: '', // 区
    address: '', // 详细地址
    default: true, // 是否为默认地址
  })
  const [isPickerShow, setIsPickerShow] = useState(false)

  const { province, city, area } = address

  // 表单项修改
  const handleChange = (e, name) => {
    const str = e.target.value.trim() || ''
    const data = { ...address }
    data[name] = str
    setAddress(data)
  }

  const handleAddress = (fullAddress) => {
    setAddress({
      ...address,
      ...fullAddress,
    })
    setIsPickerShow(false)
  }

  // 提交
  const handleSubmit = () => {
    console.log('submit')
  }

  // 渲染表单项
  const renderAddressItem = (label, placeholder, name, maxLength) => {
    if (name === 'region') {
      return (
        <div>
          <p className={s.label}>{label}</p>
          <input
            className={s.input}
            placeholder={placeholder}
            value={`${province} ${city} ${area}`}
            onClick={() => setIsPickerShow(true)}
            readOnly
          />
        </div>
      )
    } else if (name === 'address') {
      return (
        <div>
          <p className={s.label}>{label}</p>
          <textarea
            maxLength={maxLength}
            className={s.input}
            placeholder={placeholder}
            value={address[name]}
            onChange={(e) => handleChange(e, name)}
          />
        </div>
      )
    }
    return (
      <div>
        <p className={s.label}>{label}</p>
        <input
          maxLength={maxLength}
          className={s.input}
          placeholder={placeholder}
          value={address[name]}
          onChange={(e) => handleChange(e, name)}
        />
      </div>
    )
  }
  // 渲染表格
  const renderAddressForm = () => {
    const { default: isDefault } = address
    return (
      <div className={s.addressForm}>
        {renderAddressItem('收货人:', '姓名', 'name', 14)}
        {renderAddressItem('手机号:', '11位手机号码', 'mobile')}
        {renderAddressItem('收货地址:', '请选择地区', 'region')}
        {renderAddressItem('详细地址:', '请填写详细地址', 'address', 75)}
        <div className={s.defaultAddress}>
          <img
            className={s.icon}
            src={isDefault ? '/img/icSelect.png' : '/img/icNotSelect.png'}
            alt={''}
          />
          设为默认地址
        </div>
      </div>
    )
  }

  return (
    <main>
      <header>收货地址 </header>
      <div className={s.container}>
        {renderAddressForm()}
        {
          <button className={s.btn} onClick={handleSubmit}>
            保存并使用
          </button>
        }
        {isPickerShow ? (
          <AddressPicker
            handleAddressSelected={handleAddress}
            closePicker={() => setIsPickerShow(false)}
            province={province}
            city={city}
            area={area}
          />
        ) : null}
      </div>
    </main>
  )
}

export default memo(AddressAdd)
