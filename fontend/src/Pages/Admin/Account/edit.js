import React, { useEffect, useState } from 'react';
import { Layout, Form, Input, Button, Checkbox } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../Components/Other/axiosClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Content } = Layout;

const AccountEdit = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [Status, setStatus] = useState(false);

  const [User, setUser] = useState({
    lastName: '',
    firstName: '',
    address: '',
    userName: '',
    status: true,
  });

  useEffect(() => {
    axiosClient
      .get(`/Users/${id}`)
      .then((res) => {
        setUser(res.data); // Lưu dữ liệu vào state User
        form.setFieldsValue({
          LastName: res.data.lastName,
          FirtName: res.data.firstName,
          Address: res.data.address,
          phoneNumber: res.data.phoneNumber,
          Status: res.data.status,
        });
        setStatus(res.data.status);
      })
      .catch((error) => {
        console.log('Error get data user ', error);
      });
  }, [id, form]);

  const handleChange = (name, value) => {
    if(name === "status") 
        {
            setStatus(value);
        }
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
    // Xử lý logic khi người dùng gửi form
  };

  
  

  const handelSubmit = () => {
   

    const UserData = {
      LastName: User.lastName,
      FirstName: User.firstName,
      Address: User.address,
      phoneNumber: User.phoneNumber,
      Status: Status,
    };

    axiosClient
      .put(`/Users/${id}/admin`, UserData)
      .then(() => {
        toast.success('Bạn đã cập nhật thành công');
        setTimeout(() => {
          navigate('/admin/account');
        }, 3000);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });

    console.log('user', UserData);
  };
  console.log('user', User);

  return (
    <Content
      style={{
        margin: '24px auto',
        padding: 24,
        minHeight: 280,
        background: 'white',
        borderRadius: '8px',
        width: 600,
        maxWidth: 800, // Giới hạn chiều rộng của content
      }}
    >
      <div className="logo">
        <h1>Cập Nhật Thông Tin Tài Khoản</h1>
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
        form={form}
        name="accountForm"
        onFinish={onFinish}
        layout="vertical"
        initialValues={User} // Sử dụng initialValues để thiết lập giá trị ban đầu của form
        style={{ marginTop: 20, fontWeight: 700, fontSize: '16px' }}
      >
        <Form.Item
          label="Họ"
          name="LastName"
          rules={[{ required: true, message: 'Vui lòng nhập họ !' }]}
        >
          <Input className="input-add" onChange={(e) => {handleChange("lastName",e.target.value)}} />
        </Form.Item>

        <Form.Item
          label="Tên"
          name="FirtName"
          rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
        >
          <Input className="input-add" onChange={(e) => {handleChange("firstName",e.target.value)}} />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="Address"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ !' }]}
        >
          <Input className="input-add" onChange={(e) => {handleChange("address",e.target.value)}} />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại!' },
            { min: 10, message: 'Số điện thoại phải có ít nhất 10 ký tự!' },
          ]}
        >
          <Input className="input-add" onChange={(e) => {handleChange("phoneNumber",e.target.value)}} />
        </Form.Item>

        <Form.Item label="Trạng thái" name="Status" valuePropName="checked"  >
          <Checkbox onChange={(e) => {handleChange("status",e.target.checked)}}>{Status ? 'Hoạt động': 'Ngưng hoạt động '}</Checkbox>
        </Form.Item>

        <Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" className="btn-add" onClick={handelSubmit}>
              Lưu
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

export default AccountEdit;
