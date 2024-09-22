import React, { useState, useEffect, useRef } from 'react';
// import $ from 'jquery';
import axiosClient, {baseURL} from '../../../Components/Other/axiosClient';
import {useHistory , useNavigate, Link } from 'react-router-dom';
//giải mã token
import { jwtDecode } from "jwt-decode";

import {gapi} from 'gapi-script';
import { GoogleLogin } from "react-google-login";
import { Modal, Form, Input, Button } from 'antd';
import "./Login.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const clientIdd = "566347892077-lnssobmhq14flqi1fhe1t1f84gmglqba.apps.googleusercontent.com"


const DangNhap = () => {

    const navigate = useNavigate();
    const [loginVisible, setLoginVisible] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    
    const [account, setAccount] = useState({
      Username: '',
      PasswordHash: '',
    });
  
    const st = useRef({ current: false });
  
    const handleChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      setAccount((prev) => ({ ...prev, [name]: value }));
    };
  
    const switchToLogin = () => {
      setLoginVisible(true);
    };
  
    const switchToRegister = () => {
      setLoginVisible(false);
    };
  //Điều khiển ẩn hiện mật khẩu
    const togglePasswordVisibility = () => {
      const passwordInput = document.getElementById('password');
      const eyeIcon = document.getElementById('bg');
  
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.style.color = 'white';
      } else {
        passwordInput.type = 'password';
        eyeIcon.style.color = 'black';
      }
    };

    //Điều khiển ẩn hiện con mắt của trường passwword
    const showHint = () => {
      const passwordInput = document.getElementById('password');
      const eyeIcon = document.getElementById('bg');
  
      if (st.current) {
        passwordInput.setAttribute('type', 'password');
        eyeIcon.style.color = 'black';
        st.current = false;
      } else {
        passwordInput.setAttribute('type', 'text');
        eyeIcon.style.color = 'white';
        st.current = true;
      }
    };
    

    useEffect(() => {
      const initClient = () => {
        gapi.client.init({
          clientId: {clientIdd},
          scope: ''
        });
      };
      gapi.load('client:auth2', initClient);
    }, []);
    useEffect(() => {
      const loginBtn = document.getElementById('loginbtn');
      const registerBtn = document.getElementById('registerbtn');
      const bgElement = document.getElementById('bg');
    
      if (loginBtn && registerBtn && bgElement) {
        loginBtn.addEventListener('click', switchToLogin);
        registerBtn.addEventListener('click', switchToRegister);
        bgElement.addEventListener('click', showHint);
    
        return () => {
          loginBtn.removeEventListener('click', switchToLogin);
          registerBtn.removeEventListener('click', switchToRegister);
          bgElement.removeEventListener('click', showHint);
        };
       
      }
    }, [loginVisible]);
   
    const handleSubmit = (e) =>{
        e.preventDefault();
        
        axiosClient.post(`/Users/login`, account)
        .then(res => {localStorage.setItem("token", res.data.token);
              const token = localStorage.getItem('token');
              const decodedToken = jwtDecode(token);
              const isAdmin = decodedToken && decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin';
              const expirationTime = decodedToken.exp;
              const dateToken = new Date(expirationTime * 1000);
              const dateNow = new Date();
              if(dateToken > dateNow)
              {
                console.log(true)
              }

              if(isAdmin){
                localStorage.setItem('tokenadmin',token);
                window.location.href = `http://localhost:3000/admin`; 
              }
              else{
                navigate('/')
              }    
    })
      .catch(error => {
        // Xử lý lỗi nếu cần
        toast.error('Tài khoản mật khẩu không đúng');
    });
            // .then(() => navigate('/admin/account'));
           
    }

    //login gg
  const navigates = useNavigate();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axiosClient.get(`/Users`).then((res) => setAccounts(res.data));
  }, []);

  const onSuccess = (res) => {
    const userEmail = res.profileObj?.email?.toLowerCase();
    const userLastname = res.profileObj?.familyName?.toLowerCase();
    const userFirtname = res.profileObj?.givenName?.toLowerCase();
    console.log(userEmail);
    if (userEmail) {
      // Kiểm tra xem người dùng đã tồn tại hay chưa
      const userExists = accounts.find((user) => user.userName === userEmail);
      if (userExists) {
        console.log("User exists. Do something...");
        account.Username = userEmail;

        let flag = res?.tokenId;
        if (flag) {
          flag = true;
        }

        axiosClient.post(`/Users/logingg?flag=${flag}`, account)
        .then(res => {localStorage.setItem("token", res.data.token);
              const token = localStorage.getItem('token');
              const decodedToken = jwtDecode(token);
              console.log(decodedToken);
              const isAdmin = decodedToken && decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin';
              console.log('isadmin:',isAdmin);
              // // Lấy thời gian hết hạn từ decodedToken
              const expirationTime = decodedToken.exp;
              const dateToken = new Date(expirationTime * 1000);
              console.log('tokenDate',dateToken)
              const dateNow = new Date();
              console.log('token Time',dateNow )
              if(dateToken > dateNow)
              {
                console.log(true)
              }

              if(isAdmin){
                localStorage.setItem('tokenadmin',token);
                window.location.href = `http://localhost:3000/admin`; 
              }
              else{
                navigate('/')
              }    
    })
      .catch(error => {
        // Xử lý lỗi nếu cần
        toast.error('Tài khoản hoặc mật khẩu không đúng');
    });

      }else if(userExists == null){ 
        // Nếu người dùng không tồn tại, thêm người dùng mới
        const accountdata = {
          username: userEmail,
          LastName: userLastname,
          Firtname: userFirtname,
          Status : true
        };

        const accountParams = Object.keys(accountdata)
          .map((key) => `${key}=${encodeURIComponent(accountdata[key])}`)
          .join("&");
        axiosClient.post(`/Users/register?${accountParams}`).then(() => {
        
          account.Username = userEmail;

          let flag = res?.tokenId;
          if (flag) {
            flag = true;
          }

          axiosClient.post(`/Users/logingg?flag=${flag}`, account)
          .then(res => {localStorage.setItem("token", res.data.token);
                const token = localStorage.getItem('token');
                const decodedToken = jwtDecode(token);
                console.log(decodedToken);
                const isAdmin = decodedToken && decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin';
                console.log('isadmin:',isAdmin);
                // // Lấy thời gian hết hạn từ decodedToken
                const expirationTime = decodedToken.exp;
                const dateToken = new Date(expirationTime * 1000);
                console.log('tokenDate',dateToken)
                const dateNow = new Date();
                console.log('token Time',dateNow )
                if(dateToken > dateNow)
                {
                  console.log(true)
                }

                if(isAdmin){
                  localStorage.setItem('tokenadmin',token);
                  window.location.href = `http://localhost:3000/admin`; 
                }
                else{
                  navigate('/')
                }    
        })
        .catch(error => {
          // Xử lý lỗi nếu cần
          toast.error('Tài khoản hoặc mật khẩu không đúng');
        });
        })
        .catch(error =>{toast.error('Thao tác Không hợp lệ!');
          setTimeout(() =>{
            navigate('/');
          },1200)
        });
    }
    } else {
      console.error("Email is undefined or null.");
    }
  };

  const onFailure = (res) => {
    console.log("LOGIN FAILED! res:", res);
  };
  
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [EmailRP, setEmailRP] = useState({
    Email: '',
    code: '',
    newPasswordHash: '',
  });

  const handleCloseEmailModal = () => setShowEmailModal(false);
  const handleCloseResetPasswordModal = () => setShowResetPasswordModal(false);

  const handleSendResetEmail = async (e) => {
    e.preventDefault();
    // Thực hiện logic gửi email xác nhận
    // ...
    const Emaildata = {
      email: EmailRP.Email,
    };
    // Chuyển đổi đối tượng thành chuỗi tham số
    const accountParams = Object.keys(Emaildata)
    .map(key => `${key}=${encodeURIComponent(Emaildata[key])}`)
    .join('&');
    await axiosClient.post(`/Users/forgot-password?${accountParams}`)
    .then(()=>{toast.success("Mã số đã được gửi đến email của bạn")})
    .catch(err =>(toast.success("Mã số đã được gửi đến email của bạn")));
    
    // Sau khi gửi email thành công, mở modal nhập mã và mật khẩu mới
    setShowEmailModal(false);
    setShowResetPasswordModal(true);
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    // Thực hiện logic xác nhận mã và đặt lại mật khẩu mới
    // ...
    const Emaildata = {
      email: EmailRP.Email,
      code: EmailRP.code,
      newPassword: EmailRP.newPasswordHash,
    };
    // Chuyển đổi đối tượng thành chuỗi tham số
    const accountParams = Object.keys(Emaildata)
    .map(key => `${key}=${encodeURIComponent(Emaildata[key])}`)
    .join('&');
    axiosClient.post(`/Users/reset-password?${accountParams}`)
    .then(()=>{toast.success("Đặt lại mật khẩu thành công")})
    .catch(err =>(toast.error("Người dùng không tồn tại hoặc Mã số không đúng hoặc đã hết hạn")));
    // Sau khi xác nhận thành công, có thể đóng modal
    setShowResetPasswordModal(false);
    
  };
    
  return (
    <div className="page-container_Login">
                <div className="form__login">
                <div className="login__login">
                    <div
                        className="left__login"
                        style={{ left: loginVisible ? '1px' : '-390px', opacity: loginVisible ? 1 : 0 }}
                    >
                        <form>
                        <div className="top__login">
                            <p>
                            Bạn chưa có tài khoản đăng nhập?{' '}
                            <Link style={{color: 'blue'}} to="/Login/Register"  onClick={switchToRegister}>
                                Đăng Kí
                            </Link>
                            </p>
                            <h2>Đăng Nhập</h2>
                        </div>
                        <div className="input__login">
                            <input type="text" name="Username"  value={account.Username}  onChange={handleChange} placeholder="Tên tài khoản hoặc email" required />
                            <span>
                            {' '}
                            <i className="fa fa-user"></i>
                            </span>
                        </div>
                        <div className="input__login">
                            <input
                            type="password"
                            name="PasswordHash"
                            id="password"
                            placeholder="Mật Khẩu"
                            value={account.PasswordHash}
                            onChange={handleChange}
                            required
                            />
                            <span>
                            <i
                                className="fa fa-eye"
                                id="bg"
                                onClick={togglePasswordVisibility}
                                aria-hidden="true"
                            ></i>
                            </span>
                        </div>
                        <div className="forget__login">
                            <label>
                            <input type="checkbox" />Nhớ lại
                            </label>
                            <a onClick={() => setShowEmailModal(true)}>
                              Quên mật khẩu
                            </a>
                        </div>
                        <div className="button__login">
                            <button className="btnoflogin" onClick={handleSubmit}>Tiếp Tục</button>
                        </div>
                        <div className="or">
                            <p>or</p>
                            <div id="signInButton" style={{position:'relative'}}>
                              <GoogleLogin
                                clientId={clientIdd}
                                buttonText="Login with Google"
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                              />
                            </div>
                            <div className="with">
                            
                            </div>
                        </div>
                        </form>
                    </div>

                    </div>
                </div>
                <div>
                  
                </div>

                <Modal
                title={<><i className="fa fa-envelope"></i> <b>Gửi Email Đặt Lại Mật Khẩu</b></>}
                open={showEmailModal}
                onCancel={handleCloseEmailModal}
                centered
                footer={[
                  <Button key="cancel" onClick={handleCloseEmailModal}>Đóng</Button>,
                  <Button key="submit" type="primary" onClick={handleSendResetEmail}>Gửi email đặt lại mật khẩu</Button>,
                ]}
              >
                <Form>
                  <Form.Item label="Email của bạn">
                    <Input type="email" placeholder="Nhập email" value={EmailRP.Email} onChange={(e) => setEmailRP({ ...EmailRP, Email: e.target.value })} />
                  </Form.Item>
                </Form>
              </Modal>


              <Modal
                title={<><i className="fa fa-key"></i> <b>Xác Nhận Đặt Lại Mật Khẩu</b></>}
                open={showResetPasswordModal}
                onCancel={handleCloseResetPasswordModal}
                centered
                footer={[
                  <Button key="cancel" onClick={handleCloseResetPasswordModal}>Đóng</Button>,
                  <Button key="submit" type="primary" onClick={handleResetPasswordSubmit}>Xác nhận đặt lại mật khẩu</Button>,
                ]}
              >
                <Form>
                  <Form.Item label="Mã xác nhận">
                    <Input type="text" placeholder="Nhập mã xác nhận" value={EmailRP.code} onChange={(e) => setEmailRP({ ...EmailRP, code: e.target.value })} />
                  </Form.Item>
                  <Form.Item label="Mật khẩu mới">
                    <Input.Password type="password" placeholder="Nhập mật khẩu mới" value={EmailRP.newPasswordHash} onChange={(e) => setEmailRP({ ...EmailRP, newPasswordHash: e.target.value })} />
                  </Form.Item>
                </Form>
              </Modal>

      <ToastContainer
            position="top-center"
            pauseOnHover={false}
            autoClose={1500}
            theme={'dark'}
        />
        </div>
        
    );
}

export default DangNhap;
