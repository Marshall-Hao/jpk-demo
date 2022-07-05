import { memo } from 'react'
import AddressPicker from '@/Common/AddressPicker'

const AddressAdd = () => {
  // const [address, setAddress] = useState({
  //   id: '', // 地址id
  //   name: '', // 姓名
  //   mobile: '', // 手机号
  //   province: '', // 省
  //   city: '', // 市
  //   area: '', // 区
  //   address: '', // 详细地址
  //   default: true, // 是否为默认地址
  // })
  return (
    <main>
      <h1>收货地址</h1>
      <div>
        表单
        <button>按钮</button>
        {/* picker */}
        <AddressPicker />
      </div>
    </main>
  )
}

export default memo(AddressAdd)
