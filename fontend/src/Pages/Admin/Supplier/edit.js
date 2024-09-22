// import '/src/Pages/Admin/index.css';

import { Layout, Form, Input, Button, Checkbox, theme } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../Components/Other/axiosClient';
import {useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
const { Content } = Layout;

const SupplierEdit = () => {
    var { id } = useParams();
    const { colorBgContainer, borderRadiusLG } = theme.useToken();
  const [Supplier, setSupplier] = useState({});
  const navigate = useNavigate();
  useEffect(() =>{
    axiosClient.get(`/Suppliers/${id}`)
         .then(res =>setSupplier(res.data));
},[]);
console.log('Supplier',Supplier);

  const handleChange = (name, value) => {
    setSupplier(prev => ({ ...prev, [name]: value }));
  };

  
  const handelSubmit = () =>{
    
    axiosClient.put(`/Suppliers/${id}`, Supplier)
    .then(() => {
      toast.success('Cập nhật thông tin nhà cung cấp thành công');
      setTimeout(() => {
      navigate('/admin/supplier')

      },1500)
    })
   
    .catch(error => {toast.error('Cập nhật thông tin nhà cung cấp thất bại');});
    console.log('Supplier', Supplier);
  }
    return (
        <>
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
          <h1>Cập Nhật Thông Tin Nhà Cung Cấp</h1>
        </div>
        <nav>
          <ul>
            <li className="fs16">
              <Link to="/admin/productType" className="home-link">
                Quay lại
              </Link>
            </li>
          </ul>
        </nav>
        <Form
        name="productTypeForm"
        
        layout="vertical"
        initialValues={{ // Sử dụng initialValues để thiết lập giá trị ban đầu của form
            name: Supplier.name,
            address: Supplier.address,
            phone: Supplier.phone,
            email: Supplier.email,
           
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
          rules={[{ required: true, message: 'Vui lòng nhập email nhà cung cấp!' }]}
        >
          <Input value={Supplier.email} className='input-add' onChange={(e) => handleChange('email', e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: 'Vui lòng nhập địa nhà cung cấp!' }]}
        >
          <Input value={Supplier.address} className='input-add' onChange={(e) => handleChange('address', e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của nhà cung cấp!' }]}
        >
          <Input value={Supplier.phone} className='input-add' onChange={(e) => handleChange('phone', e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
        </Form.Item>
       
        <Form.Item
            label="Trạng thái"
            name="Status"
            valuePropName="defaultChecked" 
        >
            <Checkbox checked={Supplier.status} onChange={(e) => handleChange('status', e.target.checked)}>{Supplier.status ? 'Hoạt động': 'Ngưng hoạt động '}</Checkbox>
        </Form.Item>
      
        <Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" className='btn-add' onClick={handelSubmit}>
              Cập nhật
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
        </>  );
}
 
export default SupplierEdit;