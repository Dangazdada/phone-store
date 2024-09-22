// import '/src/Pages/Admin/index.css';
import { Layout, Form, Input, Button, Checkbox, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../../Components/Other/axiosClient';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const { Content } = Layout;

const SupplierAdd = () => {
  const { colorBgContainer, borderRadiusLG } = theme.useToken();
  const [Supplier, setSupplier] = useState([]);
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values:', values);
    // Xử lý logic khi người dùng gửi form
  };
  const handleChange = (name, value) => {
    setSupplier(prev => ({ ...prev, [name]: value }));
  };

  
  const handelSubmit = () =>{
    const SupplierData  = {
        name: Supplier.name,
        address: Supplier.address,
        phone: Supplier.phone,
        email: Supplier.email,
        status: true
  };
  const SupplierParams = Object.keys(SupplierData) .map ( key => `${key}=${encodeURIComponent(SupplierData[key])}`)
  .join('&');
 
    axiosClient.post(`/Suppliers?${SupplierParams}`)
    .then(() => {
      toast.success('Thêm thông tin nhà cung cấp thành công');
      setTimeout(() => {
      navigate('/admin/supplier')

      },1500)
    })
    .catch(error => { toast.error('Thêm thông tin nhà cung cấp thất bại'); });
    console.log('nhà cung cấp', SupplierData);
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
        <h1>Thêm Nhà Cung Cấp Mới</h1>
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
        name: Supplier.name,
        address: Supplier.address,
        phone: Supplier.phone,
        email: Supplier.email
      }}
      style={{ marginTop:20 ,fontWeight:700, fontSize:'16px'}}
    >
      <Form.Item
        label="Tên nhà cung cấp"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên nhà cung cấp!' }]}
      >
        <Input value={Supplier.name} className='input-add' onChange={(e) => handleChange('name', e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
      </Form.Item>

      <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Vui lòng nhập email của nhà cung cấp!' }]}
    >
      <Input value={Supplier.email} className='input-add' onChange={(e) => handleChange('email', e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
    </Form.Item>

    <Form.Item
        label="Địa chỉ"
        name="address"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ của cung cấp!' }]}
    >
        <Input value={Supplier.address} className='input-add' onChange={(e) => handleChange('address', e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
  </Form.Item>

  <Form.Item
        label="Số điện thoại"
        name="phone"
        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của cung cấp!' }]}
    >
        <Input value={Supplier.phone} className='input-add' onChange={(e) => handleChange('phone', e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
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

export default SupplierAdd;
  