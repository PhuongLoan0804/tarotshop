import React from 'react'
import { Link } from 'react-router-dom'

import Helmet from './Helmet'
import Button from './Button'

const Login = () => {
    // const [user, setUser] = useState({
    //     email:'', password:''
    // })

    return (
        <Helmet title="Đăng nhập">
            <div className="login-page">
                <form action="">
                    <h2>đăng nhập</h2>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Email" 
                        required
                        // value={user.email}
                    />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password" 
                        required
                        // value={user.password}
                    />
                    <div className="row">
                        <Button size="sm" type="submit">đăng nhập</Button>
                        <Link className="link" to="/register">Đăng ký</Link>
                    </div>
                </form>
            </div>
        </Helmet>
    )
}

export default Login
