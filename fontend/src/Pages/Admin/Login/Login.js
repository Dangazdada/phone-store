import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";


import './Login.css'; // Your custom CSS
import axiosClient from '../../../Components/Other/axiosClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [UserName, setUserName] = useState(null);
  const [Password, setPassword] = useState(null);

  const onFinish = (values) => {
    console.log('Received values:', values);
  }; 
  const handleLogin = () => {
    if (UserName === null || UserName === '' || Password === null || Password === '') {
      toast.error("Vui lòng nhập thông tin đăng nhập");
    } else {
      axiosClient.post(`/Users/login/admin?username=${UserName}&password=${Password}`)
        .then(res => {
          localStorage.setItem('tokenadmin', res.data.token);
          const token = localStorage.getItem('tokenadmin');
          const decodedToken = jwtDecode(token);
          console.log(decodedToken);
          toast.success('Đăng nhập thành công');
          setTimeout(() => {
            window.location.href = `http://localhost:3000/admin`; // Chuyển hướng đúng cách bằng cách gọi hàm navigate
          }, 1500);
        })
        .catch(error => {
          toast.error(error.data);
        });
    }
  }
  console.log('password', Password);
  console.log('username', UserName);

  return (
    <>
    <div className="login-container">
      <Form
        name="login-form"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h2>Đăng nhập Admin</h2>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
        >
          <Input placeholder="Username"  onChange={(e) => {setUserName(e.target.value)}}/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleLogin}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
    <ToastContainer
    position="top-center"
    pauseOnHover={false}
    autoClose={1500}
    theme={'dark'}
  />
    </>
  );
}

export default Login;
