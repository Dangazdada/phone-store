// import '/src/Pages/Admin/index.css';
import { Layout, Form, Input, Button, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../../Components/Other/axiosClient';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const { Content } = Layout;

const ManufacturerAdd = () => {
  const { colorBgContainer, borderRadiusLG } = theme.useToken();
  const [Manufacturer, setManufacturer] = useState([]);
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values:', values);
    // Xử lý logic khi người dùng gửi form
  };
  const handleChange = (name, value) => {
    setManufacturer(prev => ({ ...prev, [name]: value }));
  };

  
  const handelSubmit = () =>{
    const ManufacturerData  = {
        name: Manufacturer.name,
        address: Manufacturer.address,
        phone: Manufacturer.phone,
        email: Manufacturer.email,
        status: true
  };
  const ManufacturerParams = Object.keys(ManufacturerData) .map ( key => `${key}=${encodeURIComponent(ManufacturerData[key])}`)
  .join('&');
 
    axiosClient.post(`/Manufacturers?${ManufacturerParams}`)
    .then(() => {
      toast.success('Thêm nhà sản xuất thành công');
      setTimeout(() => {
      navigate('/admin/manufacturers')

      },1500)
    })
    .catch(error => {toast.error('Thêm nhà sản xuất thất bại'); });
    console.log('â', ManufacturerData);
  }

  return (
    <Content
      style={{
        margin: '24px auto',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        maxWidth: 800, // Giới hạn chiều rộng của content
      }}
    >
      <div className="logo">
        <h1>Thêm Nhà Sản Xuất Mới</h1>
      </div>
      <nav>
        <ul>
          <li className="fs16">
            <Link to="/admin/manufacturers" className="home-link">
              Quay lại
            </Link>
          </li>
        </ul>
      </nav>
      <Form
     
      name="productTypeForm"
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ // Sử dụng initialValues để thiết lập giá trị ban đầu của form
        name: Manufacturer.name,
        address: Manufacturer.address,
        phone: Manufacturer.phone,
        email: Manufacturer.email
      }}
      style={{ marginTop:20 ,fontWeight:700, fontSize:'16px'}}

    >
      <Form.Item
        label="Tên nhà sản xuất"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên nhà sản xuất!' }, {whitespace:true}]}
      >
        <Input value={Manufacturer.name} className='input-add' placeholder='Tên nhà sản xuất' onChange={(e) => handleChange('name', e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
      </Form.Item>

      <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Vui lòng nhập email của nhà sản xuất!' }]}
    >
      <Input value={Manufacturer.email} className='input-add' type='email' placeholder='Email' onChange={(e) => handleChange('email', e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
    </Form.Item>

    <Form.Item
        label="Địa chỉ"
        name="address"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ của sản xuất!' }]}
    >
        <Input value={Manufacturer.address} className='input-add' placeholder='Đại chỉ' onChange={(e) => handleChange('address', e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
  </Form.Item>

  <Form.Item
        label="Số điện thoại"
        name="phone"
        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của sản xuất!' }]}
    >
        <Input value={Manufacturer.phone} className='input-add' placeholder='Số điện thoại' onChange={(e) => handleChange('phone', e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
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
     autoClose={1500}
     theme={'dark'}
   />
    </Content>
  );
};

export default ManufacturerAdd;
  