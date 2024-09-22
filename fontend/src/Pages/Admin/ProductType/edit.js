// import '/src/Pages/Admin/index.css';

import { Layout, Form, Input, Button, Checkbox, theme } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../Components/Other/axiosClient';
import {useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
const { Content } = Layout;

const ProductTypeEdit = () => {
    var { id } = useParams();
    const { colorBgContainer, borderRadiusLG } = theme.useToken();
  const [productType, setProductType] = useState({});
  const navigate = useNavigate();
  useEffect(() =>{
    axiosClient.get(`/ProductTypes/${id}`)
         .then(res =>setProductType(res.data));
},[]);
console.log('productType',productType);

  const handleChange = (name, value) => {
    setProductType(prev => ({ ...prev, [name]: value }));
  };

  
  const handelSubmit = () =>{
    
    axiosClient.put(`/ProductTypes/${id}`, productType)
    .then(() => {
      toast.success('Cập nhật loại sản phẩm thành công');
      setTimeout(() => {
      navigate('/admin/productType')

      },1500)
    })
    .catch(error => { toast.error('Cập nhật loại sản phẩm thất bại');    });
    console.log('â', productType);
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
          <h1>Cập Nhật Thông Tin Loại Sản Phẩm</h1>
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
          Name: productType.name,
          DesDescription: productType.description
        }}
        style={{ marginTop:20 ,fontWeight:700, fontSize:'16px'}}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="Name"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
        >
          <Input value={productType.name} className='input-add' onChange={(e) => handleChange('name', e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <Input.TextArea className='inputtext-edit' value={productType.description} onChange={(e) => handleChange('description', e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
        </Form.Item>
        <Form.Item
            label="Trạng thái"
            name="Status"
            valuePropName="defaultChecked" 
        >
            <Checkbox checked={productType.status} onChange={(e) => handleChange('status', e.target.checked)}>{productType.status ? 'Hoạt động': 'Ngưng hoạt động '}</Checkbox>
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
 
export default ProductTypeEdit;