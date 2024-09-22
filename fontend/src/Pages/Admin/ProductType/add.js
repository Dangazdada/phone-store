// import '/src/Pages/Admin/index.css';
import { Layout, Form, Input, Button, Checkbox, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../../Components/Other/axiosClient';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const { Content } = Layout;

const ProductTypeAdd = () => {
  const { colorBgContainer, borderRadiusLG } = theme.useToken();
  const [productType, setProductType] = useState([]);
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values:', values);
    // Xử lý logic khi người dùng gửi form
  };
  const handleChange = (name, value) => {
    setProductType(prev => ({ ...prev, [name]: value }));
  };

  
  const handelSubmit = () =>{
    const productTypeData  = {
    Name: productType.Name,
    DesDescription: productType.DesDescription,
    Status: true
  };
  const productTypeParams = Object.keys(productTypeData) .map ( key => `${key}=${encodeURIComponent(productTypeData[key])}`)
  .join('&');
 
    axiosClient.post(`/ProductTypes?${productTypeParams}`)
    .then(() => {
      toast.success('Thêm loại sản phẩm thành công');
      setTimeout(() => {
      navigate('/admin/productType')

      },1500)
    })

    .catch(error => {toast.error('Thêm loại sản phẩm thất bại');});
    console.log('â', productTypeData);
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
        <h1>Thêm Loại Sản Phẩm Mới</h1>
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
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ // Sử dụng initialValues để thiết lập giá trị ban đầu của form
        Name: productType.Name,
        DesDescription: productType.DesDescription
      }}
      style={{ marginTop:20 ,fontWeight:700, fontSize:'16px'}}

    >
      <Form.Item
        label="Tên sản phẩm"
        name="Name"
        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
      >
        <Input value={productType.Name} className='input-add' onChange={(e) => handleChange('Name', e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
      </Form.Item>
      <Form.Item
        label="Mô tả"
        name="DesDescription"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
      >
        <Input.TextArea className='inputtext-add' value={productType.DesDescription} onChange={(e) => handleChange('DesDescription', e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
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

export default ProductTypeAdd;
  