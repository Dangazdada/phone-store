import axiosClient, {baseURL} from '../../../Components/Other/axiosClient';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import data from "../OrderPage/data.json";
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from '../../../Components/Other/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './member.css';

const { Option } = Select;

const Member = () => {
  const { userId, username } = useAuth();
  const [editing, setEditing] = useState(false);
  const [account, setAccount] = useState([]);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [provinces] = useState(data);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  
  const [showAddress, setShowAddress] = useState(false);
  const [addressEx, setAddressEx] = useState(null);

  const [EmailRP, setEmailRP] = useState({
    id: '',
    PasswordCheck: '',
    Email: '',
    code: '',
    newPasswordHash: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get(`/Users/${userId}`)
      .then(res => setAccount(res.data));
  }, [userId]);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setAccount(prev => ({ ...prev, [name]: value || '' }));
  }

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setShowAddress(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(showAddress === true)
      {
        if(selectedProvince === null ||  selectedDistrict === null || selectedWard === null || addressEx === null 
        || addressEx === '' || addressEx === undefined )
        {
          toast.error('Vui lòng nhập đầy đủ thông tin địa chỉ.');
          return;
        }
        else{
          account.address = ` ${addressEx}, ${selectedWard.FullName}, ${selectedDistrict.FullName} ${selectedProvince.FullName}`;
        }
      }
    if (!account.userName.includes('@')) {
      if (!account.lastName || !account.firstName || !account.email || !account.phoneNumber || !account.address) {
        toast.error('Vui lòng nhập đủ thông tin.');
        return;
      }
    } else if (account.userName.includes('@')) {
      if (!account.lastName || !account.firstName || !account.phoneNumber || !account.address) {
        toast.error('Vui lòng nhập đủ thông tin.');
        return;
      }
    }

    const accountdata = {
      id: account.id,
      lastName: account.lastName,
      firstName: account.firstName,
      username: account.userName,
      password: account.PasswordHash,
      email: account.email,
      phoneNumber: account.phoneNumber,
      Address: account.address,
      Status: true
    };

    axiosClient.put(`/Users/${account.id}`, accountdata)
      .then(() => {
        toast.success('Chỉnh sửa thông tin tài khoản thành công!');
        setTimeout(() => {
        handleCancelEdit();
        window.location.reload();
        }, 1200)
      })
      .catch(error => {
        toast.error('Lỗi: ' + error.response.data);
      });
  }

  const handleClosePasswordModal = () => setShowPasswordModal(false);

  const handlePasswordSubmit = async (e) => {
    
    e.preventDefault();
    if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z\d@$!%*#?&]/.test(EmailRP.newPasswordHash)) {
      toast.error('Mật khẩu cần chứa ít nhất một kí tự hoa, một số, và một kí tự đặc biệt.');
      return;
    } else {
      const accountdata = {
        id: account.id,
        lastName: account.lastName,
        firstName: account.firstName,
        username: account.userName,
        passwordHash: EmailRP.newPasswordHash,
        email: account.email,
        phoneNumber: account.phoneNumber,
        Address: account.address,
        Status: true
      };

      axiosClient.put(`/Users/${account.id}?MKC=${encodeURIComponent(EmailRP.PasswordCheck)}`, accountdata)
        .then(() => {
          toast.success("Đổi mật khẩu thành công!");
          setTimeout(() =>{
            navigate('/member')
          }, 1500)
        })
        .catch((err) => alert(err.response.data));
      setShowPasswordModal(false);
    }
  };

  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleCloseEmailModal = () => setShowEmailModal(false);
  const handleCloseResetPasswordModal = () => setShowResetPasswordModal(false);

  const handleSendResetEmail = async (e) => {
    e.preventDefault();
    const Emaildata = {
      email: EmailRP.Email,
    };
    const accountParams = Object.keys(Emaildata)
      .map(key => `${key}=${encodeURIComponent(Emaildata[key])}`)
      .join('&');
    await axiosClient.post(`/Users/forgot-password?${accountParams}`)
      .then(() => { toast.success("Mã số đã được gửi đến email của bạn") })
      .catch(err => (toast.success("Mã số đã được gửi đến email của bạn")));
    setShowEmailModal(false);
    setShowResetPasswordModal(true);
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    const Emaildata = {
      email: EmailRP.Email,
      code: EmailRP.code,
      newPassword: EmailRP.newPasswordHash,
    };
    const accountParams = Object.keys(Emaildata)
      .map(key => `${key}=${encodeURIComponent(Emaildata[key])}`)
      .join('&');
    axiosClient.post(`/Users/reset-password?${accountParams}`)
      .then(() => { toast.success("Đặt lại mật khẩu thành công") })
      .catch(err => (toast.success("Người dùng không tồn tại hoặc Mã số không đúng hoặc đã hết hạn")));
    setShowResetPasswordModal(false);
  };

  //address
  const handleProvinceChange = (value) => {
    const selected = provinces.find(province => province.Code === value);
    if (selected) {
      setSelectedProvince(selected);
      setDistricts(selected.District); // Cập nhật danh sách quận/huyện tương ứng
    }
  };

  const handleDistrictChange = (value) => {
    const selected = districts.find(district => district.Code === value);
    if (selected) {
      setSelectedDistrict(selected);
      setWards(selected.Ward); // Cập nhật danh sách quận/huyện tương ứng
    }
    
  };
  const handleWardChange = (value) => {
    const selected = wards.find(ward => ward.Code === value);
    if(selected)
        {
            setSelectedWard(selected);
        }
  }
  const handleEditAddress = () => {
    setShowAddress(true);
  }

  console.log('em', EmailRP);
  console.log("acc", account);

  return (
    <>
      <div className="hosomeber_info">
        <h2>Hồ sơ cá nhân</h2>
      </div>
      <div className="Formhosomember_info">
        <form className='formmember_info'>
          <div className="Nameformmerber">
            <div className="left_namemember">
              <input type="text" placeholder="LastName" name="lastName" value={account.lastName || ''} onChange={handleChange} readOnly={!editing} />
              <span><i className="fa fa-user"></i></span>
            </div>
            <div className="right_namemember">
              <input type="text" placeholder="FirstName" name="firstName" value={account.firstName || ''} onChange={handleChange} readOnly={!editing} />
              <span><i className="fa fa-user"></i></span>
            </div>
          </div>
          
          {!username.includes('@') && (
            <div className="Input_formmerber">
              <input type="email" placeholder="Email" name="email" value={account.email || ''} onChange={handleChange} readOnly={!editing} />
              <span><i className="fa fa-envelope"></i></span>
            </div>
          )}
          
          <div className="Input_formmerber">
            <input type="PhoneNumber" placeholder="PhoneNumber" name="phoneNumber" value={account.phoneNumber || ''} onChange={handleChange} readOnly={!editing} />
            <span><i className="fa fa-phone"></i></span>
          </div>
          
          {!editing ? 
          <div className="Input_formmerber">
            <input type="Address" placeholder="Address" name="address" value={account.address || ''} onChange={handleChange} readOnly={!editing} />
            <span><i className="fa fa-home"></i></span>
          </div> :             
              showAddress === true ? (
                <div>
                <Form.Item
                name="province"
                label="Chọn tỉnh/thành phố"
                rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
              >
                <Select
                  placeholder="-- Chọn tỉnh/thành phố --"
                  onChange={handleProvinceChange}
                >
                {data.map((province) => (
                  <Option key={province.Code} value={province.Code}>
                    {province.FullName}
                  </Option>
                ))}
                </Select>
              </Form.Item>
        
            
                  {districts !== null && districts.length > 0 ? (
                    <Form.Item
                    name="district"
                    label="Chọn quận/huyện"
                    rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
                  >
                    <Select
                      placeholder="-- Chọn quận/huyện --"
                      onChange={handleDistrictChange}
                    >
                    {districts.map((district, index) => (
                      <Option key={district.Code} value={district.Code}>
                        {district.FullName}
                      </Option>
                    ))}
                    </Select>
                  </Form.Item>
                  ) : (
                    <Form.Item
                    name="district"
                    label="Chọn quận/huyện"
                    rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
                  >
                    <Select
                      placeholder="-- Chọn quận/huyện --"
                      onChange={handleDistrictChange}
                    >
                    <Option>-- Không có dữ liệu quận/huyện --</Option>
                    </Select>
                  </Form.Item>
                    
                  )}
            
                  {wards !== null && wards.length > 0 ? (
                    <Form.Item
                    name="ward"
                    label="Chọn phường/xã"
                    rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}
                  >
                    <Select
                      placeholder="-- Chọn phường/xã --"
                      onChange={handleWardChange}
                    >
                    {wards.map((ward, index) => (
                      <Option key={ward.Code} value={ward.Code}>
                        {ward.FullName}
                      </Option>
                    ))}
                    </Select>
                  </Form.Item>
                  ) : (
                    <Form.Item
                    name="ward"
                    label="Chọn phường/xã"
                    rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}
                  >
                    <Select
                      placeholder="-- Chọn phường/xã --"
                      onChange={handleWardChange}
                    >
                    <Option>-- Không có dữ liệu phường/xã --</Option>
                    </Select>
                  </Form.Item>
                  )}
            
                  <Form.Item
                  name="address"
                  label="Địa chỉ"
                  rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết!' }]}
                  onChange={(e) => {setAddressEx(e.target.value)}}
                >
                  <Input placeholder="Nhập địa chỉ chi tiết" />
                </Form.Item>
          
                </div>
              ) : (
                <div className = "edit_address_block_order" >
                  <div   className = "edit_address_tile_order" >
                    <p className = "edit_address_content_order" >Địa chỉ:</p>
                    <p>{account.address}</p>
                    <button
                    className="edit_address_btn_order"
                    
                      onClick={() => handleEditAddress()}
                    >
                      Sửa
                    </button>
                  </div>
                </div>
              )
            }

          {!editing ? (
            <button type="button" className='btnoflogin_member' onClick={handleEditClick}>
              Chỉnh sửa thông tin
            </button>
          ) : null}
          
          <div className="button__login_member">
            {editing && (
              <>
                <button type="button" className='btnoflogin_member' onClick={handleSubmit}>
                  Lưu thông tin
                </button>
                <button type="button" className='btnoflogin_member' onClick={handleCancelEdit}>
                  Hủy bỏ
                </button>
              </>
            )}
          </div>
          
          {!username.includes('@') && (
            <div className="forget__login_member">
              <a href="/" onClick={(e) => { e.preventDefault(); setShowPasswordModal(true) }}>
                Đổi mật khẩu
              </a>
            </div>
          )}
        </form>
        <Modal
          title={<><LockOutlined /> Đổi Mật Khẩu</>}
          open={showPasswordModal}
          onCancel={handleClosePasswordModal}
          footer={[
            <Button key="cancel" onClick={handleClosePasswordModal}>
              Đóng
            </Button>,
            <Button key="submit" type="primary" onClick={handlePasswordSubmit}>
              Xác nhận
            </Button>,
          ]}
        >
          <Form>
            <Form.Item label="Mật khẩu cũ">
              <Input.Password
                placeholder="Nhập mật khẩu cũ"
                value={EmailRP.PasswordCheck}
                onChange={(e) => setEmailRP({ ...EmailRP, PasswordCheck: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Mật khẩu mới">
              <Input.Password
                placeholder="Nhập mật khẩu mới"
                value={EmailRP.newPasswordHash}
                onChange={(e) => setEmailRP({ ...EmailRP, newPasswordHash: e.target.value })}
              />
            </Form.Item>
            <Button type="link" onClick={() => setShowEmailModal(true)}>
              Quên mật khẩu
            </Button>
          </Form>
        </Modal>

        <Modal
          title={<><MailOutlined /> Gửi Email Đặt Lại Mật Khẩu</>}
          open={showEmailModal}
          onCancel={handleCloseEmailModal}
          footer={[
            <Button key="cancel" onClick={handleCloseEmailModal}>
              Đóng
            </Button>,
            <Button key="submit" type="primary" onClick={handleSendResetEmail}>
              Gửi email đặt lại mật khẩu
            </Button>,
          ]}
        >
          <Form>
            <Form.Item label="Email của bạn">
              <Input
                type="email"
                placeholder="Nhập email"
                value={EmailRP.Email}
                onChange={(e) => setEmailRP({ ...EmailRP, Email: e.target.value })}
              />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title={<><LockOutlined /> Xác Nhận Đặt Lại Mật Khẩu</>}
          open={showResetPasswordModal}
          onCancel={handleCloseResetPasswordModal}
          footer={[
            <Button key="cancel" onClick={handleCloseResetPasswordModal}>
              Đóng
            </Button>,
            <Button key="submit" type="primary" onClick={handleResetPasswordSubmit}>
              Xác nhận đặt lại mật khẩu
            </Button>,
          ]}
        >
          <Form>
            <Form.Item label="Mã xác nhận">
              <Input
                placeholder="Nhập mã xác nhận"
                value={EmailRP.code}
                onChange={(e) => setEmailRP({ ...EmailRP, code: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Mật khẩu mới">
              <Input.Password
                placeholder="Nhập mật khẩu mới"
                value={EmailRP.newPasswordHash}
                onChange={(e) => setEmailRP({ ...EmailRP, newPasswordHash: e.target.value })}
              />
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
    </>
  );
};

export default Member;
