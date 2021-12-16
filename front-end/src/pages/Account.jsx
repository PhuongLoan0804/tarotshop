import Helmet from "../components/Helmet"
import Grid from "../components/Grid"
import Button from "../components/Button"
import { useState } from "react"

const Account = (props) => {
    const initialState = {
        name: "Bùi Long",
        email: "builong1101@gmail.com",
        password: "longlong123",
      }
    const [{name, email, password}, setAccount] = useState(initialState)

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
                                <label>Tên tài khoản</label>
								<p>{props.name}</p>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
								<p>{props.email}</p>
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu</label>
								<p>{props.password}</p>
                            </div>
                            <div className="btn-group">
                                <Button size="sm">Sửa</Button>
                            </div>
                        </div>
                    </div>
                    <div className="account__cart">
                        <div className="account__cart-title">
                            <h1>lịch sử đơn hàng</h1>
                        </div>
                    </div>
                </Grid>
            </div>
        </Helmet>
    )
}

export default Account
