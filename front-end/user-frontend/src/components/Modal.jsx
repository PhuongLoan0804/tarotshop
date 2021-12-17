import React from 'react'

const Modal = ({ closeModal }) => {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => closeModal(false)}>
                        X
                    </button>
                </div>
                <div className="title">
                    <h1>sửa thông tin tài khoản</h1>
                </div>
                <div className="body">
                    <div className="form-group">
                        <label>Tên tài khoản mới:</label>
						<input type="text" />	
                    </div>
                    <div className="form-group">
                        <label>Email mới:</label>
						<input type="text" />	
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu mới:</label>
						<input type="password" />	
                    </div>
                </div>
                <div className="modal-footer">
                    <button id="cancelBtn" onClick={() => closeModal(false)}>
                        Hủy
                    </button>
                    <button>Sửa</button>
                </div>
            </div>
        </div>
    )
}

export default Modal
