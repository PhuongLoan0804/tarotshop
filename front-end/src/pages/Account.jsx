import Helmet from "../components/Helmet"
import Grid from "../components/Grid"
import Button from "../components/Button"
import { useState } from "react"

import Modal from "../components/Modal"

const Account = (props) => {
    const [account, setAccount] = useState({
        name: "Bùi Long",
        email: "builong1101@gmail.com",
        password: "longlong123",
    })

    const [cart, setCart] = useState({
        date: "17/12/2021 9:06AM",
        product: "Đá phong thủy",
        quantily: "2",
    })

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <Helmet title="Tài khoản">
            <div className='account'>
                <Grid col={2} mdCol={2} smCol={1} gap={20}>
                    <div className="account__info">
                        <div className="account__info-title">
                            <h1>thông tin tài khoản</h1>
                        </div>
                        <div className="account__info-form">
                            <div className="form-group">
                                <label>Tên tài khoản:</label>
								<p>{account.name}</p>
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
								<p>{account.email}</p>
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu:</label>
								<p>{account.password}</p>
                            </div>
                            <div className="btn-group">
                                <Button size="sm" className="openModalBtn" onClick={() => setModalOpen(true)}>Sửa</Button>
                                
                            </div>
                            
                        </div>
                    </div>
                    <div className="account__cart">
                        <div className="account__cart-title">
                            <h1>lịch sử đơn hàng</h1>
                        </div>
                        <div className="account__cart-body">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Ngày đặt hàng</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Số lượng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{cart.date}</td>
                                        <td>{cart.product}</td>
                                        <td>{cart.quantily}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Grid>
                {modalOpen && <Modal closeModal={setModalOpen} />}
            </div>
            
        </Helmet>
    )
}

export default Account
