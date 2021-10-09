import React from 'react'
import { Link } from 'react-router-dom'

import Helmet from './Helmet'
import Button from './Button'

const Register = () => {
    // const [user, setUser] = useState({
    //     name:'', email:'', password: ''
    // })

    return (
        <Helmet title="Đăng kí">
            <div className="login-page">
                <form action="">
                    <h2>đăng ký</h2>
                    <label htmlFor="username">Tên đăng nhập</label>
                    <input type="text" name="username" placeholder="Tên đăng nhập" 
                        required
                        // value={user.name}
                    />
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
                        <Button size="sm" type="submit">đăng kí</Button>
                        <Link className="link" to="/login">Đăng nhập</Link>
                    </div>
                </form>
            </div>
        </Helmet>
    )
}

export default Register
