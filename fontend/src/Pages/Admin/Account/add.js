// import '/src/Pages/Admin/index.css';
import { Layout, Form, Input, Button, Checkbox, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../../Components/Other/axiosClient';
import { useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';

const { Content } = Layout;

const AccountAdd = () => {
  const { colorBgContainer, borderRadiusLG } = theme.useToken();

  const navigate = useNavigate();

  const [LastName, setLastName] = useState(null);
  const [FirtName, setFirtName] = useState(null);
  const [Address, setAddress] = useState(null);
  const [Username, setUsername] = useState(null);
  const [Password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [Status, setStatus] = useState(true);
  const [ShowPassword,setShowPassword] = useState(false);
  const [ValidatePassword, setValidatePassword] = useState(false);
  const [ValidateEmail, setValidateEmail] = useState(false);

  

  const onFinish = (values) => {
    console.log('Received values:', values);
    // Xử lý logic khi người dùng gửi form
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!ShowPassword);
  };
  const validatePassword = (_, value) => {
    // Biểu thức chính quy kiểm tra mật khẩu
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;

    if (!value) {
        setValidatePassword(true);
      return Promise.reject('Vui lòng nhập mật khẩu!');
    }

    if (!passwordRegex.test(value)) {
        setValidatePassword(true);
      return Promise.reject('Mật khẩu phải có ít nhất 1 chữ viết hoa, 1 kí tự đặc biệt, 1 kí tự số và độ dài ít nhất là 8 ký tự.');
    }
    setValidatePassword(false);
    return Promise.resolve();
  };
  const validateEmail = (_, value) => {
    // Biểu thức chính quy kiểm tra địa chỉ email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
        setValidateEmail(true);
      return Promise.reject('Vui lòng nhập địa chỉ email!');
    }

    if (!emailRegex.test(value)) {
        setValidateEmail(true);
      return Promise.reject('Địa chỉ email phải có dạng @gmail.com!');
    }
    setValidateEmail(false);
    return Promise.resolve();
  };


  
  const handelSubmit = () =>{

    if(LastName === null ||  FirtName === null || Address === null ||  Username === null || ValidatePassword === true 
    || ValidateEmail === true || phoneNumber === null || phoneNumber.length < 10  )
        {
            toast.error('Vui lòng nhập đầy đủ thông tin!')
        }
    
        else 
        {
            const UserData  = {
                LastName: LastName,
                FirtName: FirtName,
                Address: Address,
                username: Username,
                password: Password,
                email: email,
                phoneNumber: phoneNumber,
                Status: Status,
        
        
          };
          const UserParams = Object.keys(UserData) .map ( key => `${key}=${encodeURIComponent(UserData[key])}`)
          .join('&');
         
            axiosClient.post(`/Users/Register?${UserParams}`)
            .then(() => {
                toast.success('Bạn đã tạo tài khoản thành công');
                setTimeout(() =>{
                    navigate('/admin/account')
                },3000)
            })
                .catch(error => {
                    toast.error(error.response.data);
                
                    
        
                }
        );
        console.log('user', UserData);
        }
  
    
  }
  console.log('firstName', FirtName);
  console.log('LastNameLastName', LastName);
  console.log('Address', Address);
  console.log('username', Username);
  console.log('firstName', FirtName);


  return (
    <Content
      style={{
        margin: '24px auto',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        width: 600,
        maxWidth: 800, // Giới hạn chiều rộng của content
      }}
    >
      <div className="logo">
        <h1>Thêm Tài Khoản Mới</h1>
      </div>
      <nav>
        <ul>
          <li className="fs16">
            <Link to="/admin/account" className="home-link">
              Quay lại
            </Link>
          </li>
        </ul>
      </nav>
      <Form
      name="accountForm"
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ 
       Username: '',
       Password :''
      }}
    
      style={{ marginTop:20 ,fontWeight:700, fontSize:'16px'}}
    >
      <Form.Item
        label="Họ"
        name="LastName"
        rules={[{ required: true, message: 'Vui lòng nhập họ !' }]}
        
      >
        <Input  className='input-add' onChange={(e) => { setLastName(e.target.value)}} /> 
      </Form.Item>

      <Form.Item
      label="Tên"
      name="FirtName"
      rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
    >
      <Input  className='input-add' onChange={(e) => { setFirtName(e.target.value)}} /> 
    </Form.Item>

    <Form.Item
        label="Địa chỉ"
        name="Address"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ !' }]}
    >
        <Input className='input-add' onChange={(e) => { setAddress(e.target.value)}}  /> 
  </Form.Item>

  <Form.Item
        label="Tên đăng nhập"
        name="Username"
        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
    >
        <Input value={Username} className='input-add' onChange={(e) => { setUsername(e.target.value)}} /> 
  </Form.Item>

  <Form.Item
        label="Mật khẩu"
        name="Password"
        rules={[
           
            { validator: validatePassword }
          ]}
       
        
    >
        <Input 
        value={Password}
        type={ShowPassword ? 'text' : 'password'}
        className='input-add'
        onChange={(e) => { setPassword(e.target.value)}}
        suffix={
            ShowPassword ? (
              <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
            ) : (
              <EyeOutlined onClick={togglePasswordVisibility} />
            )
          }
         /> 
    </Form.Item>

    <Form.Item
            label="Email"
            name="email"
            rules={[{ validator: validateEmail }]}
    >
        <Input  type= 'email' className='input-add' onChange={(e) => { setEmail(e.target.value)}} /> 
    </Form.Item>

    <Form.Item
        label="Số điện thoại"
        name="phoneNumber"
        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
    >
        <Input  className='input-add' onChange={(e) => { setPhoneNumber(e.target.value)}} /> 
    </Form.Item>

  <Form.Item
            label="Trạng thái"
            name="Status"
            valuePropName="defaultChecked" 
        >
            <Checkbox onChange={(e) => { setStatus(e.target.checked)}} >{Status ? 'Hoạt động': 'Ngưng hoạt động '}</Checkbox>
        </Form.Item>
      
    
      <Form.Item>
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" className='btn-add' onClick={handelSubmit}>
            Thêm mới
          </Button>
        </div>
      </Form.Item>
    </Form>

    <ToastContainer
    position="top-center"
    pauseOnHover={false}
    autoClose={3000}
    theme={'dark'}
    />
    </Content>
  );
};

export default AccountAdd;
  