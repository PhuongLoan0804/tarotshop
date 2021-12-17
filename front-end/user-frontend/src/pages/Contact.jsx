import { useState } from "react"
import emailjs from "emailjs-com"

import Helmet from "../components/Helmet"
import Grid from "../components/Grid"
import Button from "../components/Button"
import Alert from "../components/Alert"

const Contact = (props) => {
  const initialState = {
    name: "",
    email: "",
    message: "",
  }

  const [{ name, email, message }, setState] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const clearState = () => setState({ ...initialState })

  const [status, setStatus] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, email, message)
    emailjs
      .sendForm(
        "service_pyin8zo",
        "template_3xema5l",
        e.target,
        "user_PDVUm0P2xtCSGvc6gTsKc"
      )
      .catch((e) => console.log(e))
    clearState()
    setStatus("SUCCESS")
  }

  return (
    <Helmet title='Liên hệ'>
      <div className='contact'>
        <div className='contact__section-title'>
          <h2>liên hệ với chúng tôi</h2>
          <p>
            Vui lòng điền vào biểu mẫu bên dưới để gửi email cho chúng tôi và
            chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.
          </p>
          {status && (
            <Alert
              className='alert'
              message='Lời nhắn của bạn đã được gửi đi thành công!!!'
            />
          )}
        </div>
        {/* FORM CONTACT */}
        <form name='sentMessage' onSubmit={handleSubmit}>
          <Grid col={2} mdCol={2} smCol={1} gap={20}>
            <div className='contact__send-message'>
              <Grid col={2} mdCol={2} smCol={1} gap={20}>
                <div className='form-group'>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    className='form-control'
                    placeholder='Họ và tên'
                    required
                    onChange={handleChange}
                    value={name}
                  />
                  <p className='help-block text-danger'></p>
                </div>
                <div className='form-group'>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    className='form-control'
                    placeholder='Email'
                    required
                    onChange={handleChange}
                    value={email}
                  />
                  <p className='help-block text-danger'></p>
                </div>
              </Grid>
              <div className='form-group'>
                <textarea
                  style={{ border: "solid 2px #483434" }}
                  name='message'
                  id='message'
                  className='form-control'
                  rows='5'
                  placeholder='Nội dung lời nhắn...'
                  required
                  onChange={handleChange}
                  value={message}
                ></textarea>
                <p className='help-block text-danger'></p>
              </div>
              <div id='success'></div>
              <Button size='block'>gửi</Button>
            </div>
            {/* INFORMATION */}
            <div className='contact__info'>
              <div className='contact__info-item'>
                <h3>Thông tin liên hệ</h3>
                <p>
                  <i className='bx bx-map'></i> Địa chỉ: Khu phố 6, Linh Trung,
                  Thủ Đức
                </p>
              </div>
              <div className='contact__info-item'>
                <p>
                  <i className='bx bx-phone'></i> Số điện thoại: 0123456789
                </p>
              </div>
              <div className='contact__info-item'>
                <p>
                  <i className='bx bx-envelope'></i> Email: lonton@gmail.com
                </p>
              </div>
            </div>
          </Grid>
        </form>
      </div>
    </Helmet>
  )
}

export default Contact
