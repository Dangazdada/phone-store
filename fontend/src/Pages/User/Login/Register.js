import axiosClient, {baseURL} from '../../../Components/Other/axiosClient';
import { useNavigate,Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Input, Select } from 'antd';
import data from "../OrderPage/data.json";
import $ from 'jquery';
import "./Login.css";

const { Option } = Select;
 

const Register = () => {
    const [loginVisible, setLoginVisible] = useState(false);
    const [provinces] = useState(data);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    
    const [showAddress, setShowAddress] = useState(false);
    const [addressEx, setAddressEx] = useState(null);

    const switchToLogin = () => {
      setLoginVisible(true);
    };
  
    const switchToRegister = () => {
      setLoginVisible(false);
    };
  
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

    const navigate =  useNavigate();

    const [account, setAccount] = useState([]);


    const handleChange = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setAccount(prev =>({...prev, [name]: value}));
    }


    const handleSubmit = (e)=>{
        e.preventDefault();
        if(selectedProvince === null ||  selectedDistrict === null || selectedWard === null || addressEx === null 
        || addressEx === '' || addressEx === undefined )
        {
            toast.error('Vui lòng nhập đầy đủ thông tin địa chỉ.');
            return;
        }
        else{
            account.Address = ` ${addressEx}, ${selectedWard.FullName}, ${selectedDistrict.FullName} ${selectedProvince.FullName}`;
        }
        console.log('account',account);
        if (!account.userName || !account.passwordHash || !account.lastName || !account.firtName || !account.Address || !account.email || !account.phoneNumber) {
            
            toast.error('Vui lòng nhập đủ thông tin.');  
            return;
        } else if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z\d@$!%*#?&]/.test(account.passwordHash)) {
            //const passwordRegex = ;
            toast.error('Mật khẩu cần chứa ít nhất một kí tự hoa, một số, và một kí tự đặc biệt.');
            return;
        }


        
    
        // Check if the password contains at least one uppercase letter, one number, and one special character
        

        const accountdata = {
            LastName: account.lastName,
            FirtName: account.firtName,
            username: account.userName,
            password: account.passwordHash,
            email: account.email,
            phoneNumber: account.phoneNumber,
            Address: account.Address,
          };
          // Chuyển đổi đối tượng thành chuỗi tham số
    const accountParams = Object.keys(accountdata)
    .map(key => `${key}=${encodeURIComponent(accountdata[key])}`)
    .join('&');
        axiosClient.post(`/Users/register?${accountParams}`)
        .then(() => 
            toast.success('Đăng ký tài khoản thành công!'),
            setTimeout(() =>{
            navigate('/Login')
            }, 1500)
        )
        .catch(error => {toast.error(error.response.data);});
    }
  
    useEffect(() => {
      const st = { current: false };
  
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
  
      $('#loginbtn').on('click', switchToLogin);
      $('#registerbtn').on('click', switchToRegister);
      $('#bg').on('click', showHint);
  
      return () => {
        $('#loginbtn').off('click', switchToLogin);
        $('#registerbtn').off('click', switchToRegister);
        $('#bg').off('click', showHint);
      };
    }, [loginVisible]);

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


  return (
    <div className="page-container_Login">
                <div style={{height:'95vh'}} className="form__login">
                <div className="login__login">
                    <div
                        className="right__login"
                        style={{right: loginVisible ? '-390px' : '1px', opacity: loginVisible ? 0 : 1 }}
                    >
                        <form>
                        <div className="top__login">
                            <p>
                            Bạn đã có có tài khoản đăng nhập?{' '}
                            <Link style={{color: 'blue'}} to="/Login" onClick={switchToLogin}>
                                Đăng Nhập
                            </Link>
                            </p>
                            <h2>Đăng Kí</h2>
                        </div>
                        <div className="two-input">
                            <div className="input__login">
                            <input type="text" placeholder="LastName" name="lastName" value={account.lastName} onChange={handleChange}/>
                            <span>
                                {' '}

                            </span>
                            </div>
                            <div className="input__login">
                            <input type="text" placeholder="FirstName" name="firtName" value={account.firtName} onChange={handleChange}/>
                            <span>
                                {' '}

                            </span>
                            </div>
                        </div>
                        <div className="two-input">
                        <div className="input__login">
                            <input type="userName" placeholder="UserName" name="userName" value={account.userName} onChange={handleChange}/>
                            <span>
                            <i className="fa fa-user"></i>
                            </span>
                        </div>
                        <div className="input__login">
                            <input
                            type="password"
                            name="passwordHash" value={account.passwordHash} onChange={handleChange}
                            id="password"
                            placeholder="Mật Khẩu"
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
                        </div>                   
                        <div className="input__login">
                            <input type="email" placeholder="Email" name="email" value={account.email} onChange={handleChange}/>
                            <span>
                            <i className="fa fa-envelope"></i>
                            </span>
                        </div>
                        <div className="input__login">
                            <input type="phoneNumber" placeholder="PhoneNumber" name="phoneNumber" value={account.phoneNumber} onChange={handleChange}/>
                            <span>
                                {' '}
                                <i className="fa fa-phone"></i>
                            </span>
                        </div>
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
                        <div className="button__login">
                            <button className='btnoflogin' onClick={handleSubmit}>Đăng kí</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                <ToastContainer
                    position="top-center"
                    pauseOnHover={false}
                    autoClose={1500}
                    theme={'dark'}
                />
            </div>
    );
}

export default Register;


