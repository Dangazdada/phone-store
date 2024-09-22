    import { Link, useNavigate } from "react-router-dom";
    import "./Order.css";
    import React, { useEffect, useState } from 'react';
    import axiosClient, { baseURL } from "../../../Components/Other/axiosClient";
    import { Button,  Input, Form, Select } from 'antd';
    import { toast, ToastContainer } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
  
   
    import { useAuth  } from "../../../Components/Other/auth";
   
    import data from "./data.json";

    const { Option } = Select;
  
    const OrderPage = () => {
      const [form] = Form.useForm();
      const navigate = useNavigate();

        const {  userId } = useAuth();
        const [carts, setCarts] =useState([]);
        const [user, setUser] =useState({});

        const [lengthCart, setLengthCart] = useState(0);
        const [OrderTotal , setOrderTotal] = useState(0);
        const [OrderTotalprom , setOrderTotalprom] = useState(0);
  
        

        const [provinces] = useState(data);
        const [districts, setDistricts] = useState([]);
        const [wards, setWards] = useState([]);

        const [selectedProvince, setSelectedProvince] = useState(null);
        const [selectedDistrict, setSelectedDistrict] = useState(null);
        const [selectedWard, setSelectedWard] = useState(null);
        
        const [showAddress, setShowAddress] = useState(false);
        // thông tin giao hàng
        const [fullName, setFullName] = useState(null);
        const [phoneNumber, setPhoneNumber] = useState(null);
        const [Email, setEmail] = useState(null);
        const [address, setAddress] =useState(null);
        const [addressEx, setAddressEx] = useState(null);

        useEffect(() => {
            
            axiosClient.get(`/Carts/user?id=${userId}`)
            .then(res => {
              const data = res.data.filter(data => data.userId === userId);
              setCarts(data);
                // Lấy số lượng phần tử của res.data
            const count = data.length;
            setLengthCart(count);
            setOrderTotal(calculateTotal(data));
           
            })
            .catch(error => {
                console.log(error.data);
            });
            axiosClient.get(`/Users/${userId}`)
            .then(res => {
                setUser(res.data);
                const userData = res.data;
                form.setFieldsValue({
                  fullname: `${userData.lastName} ${userData.firstName}` ,
                  phone: userData.phoneNumber,
                  email: userData.email,
                });
                setFullName(`${userData.lastName} ${userData.firstName}`);
                setPhoneNumber(userData.phoneNumber);
                setEmail(userData.email);
                setAddress(userData.address)
                if(userData.address === null)
                {
                  setShowAddress(true);
                }
            })
            .catch(error => {
                console.log(error.data);
            });
            
           
        },[ userId, lengthCart]);
       
        
        const calculateTotal = (carts) => {
            let total = 0;
            if(carts.length > 0)
                {
                    carts.forEach(item => {
                        total += item.quantity * item.unitPrice;
                    });
                }
            
            return total;
        };
        
        const hanldeEditCart =() => {
          navigate('/cart')
        }

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
        

     
    const handleOrder = () => {
      if(lengthCart !== 0){
        let CheckQuantity = false;
        let CheckQuantityname = '';
        carts.map(item => {
          const Quantitysum = item.quantitydetail - item.quantity;
          if ( Quantitysum < 0){
            CheckQuantity = true;
            CheckQuantityname = `${item.productName} ${item.ram}/${item.rom}-${item.productColor}`;
          }
        })
        if(CheckQuantity === true) {
        toast.error(`${CheckQuantityname} đã hết hàng!`);
        }else {
        const jsonCarts = JSON.stringify(carts);
        localStorage.setItem('cartsData', jsonCarts);
        console.log('data',jsonCarts);
        // Lấy dữ liệu từ localStorage ra 
        const storeCartString = localStorage.getItem("cartsData");
        const storeCart  = JSON.parse(storeCartString);
        console.log('dataget', storeCart);
        if(showAddress === true)
          {
            if(selectedProvince === null ||  selectedDistrict === null || selectedWard === null || addressEx === null 
              || addressEx === '' || addressEx === undefined || fullName == null || fullName === '' || fullName === undefined 
              || phoneNumber === null  || phoneNumber === ''|| phoneNumber === undefined || Email === null  || Email === ''
              || Email === undefined )
              {
                console.log('name', fullName);
                alert('Vui lòng nhập đầy đủ thông tin giao hàng')
              }
              else
              {
                const infoShipping = {
                  fullname: fullName,
                  phonenumber: phoneNumber,
                  email: Email,
                  address: ` ${addressEx}, ${selectedWard.FullName}, ${selectedDistrict.FullName} ${selectedProvince.FullName}`
                }
               
                const jsonInfoShipping = JSON.stringify(infoShipping)
                localStorage.setItem('infoShippingData',jsonInfoShipping)
                console.log('datainfo', jsonInfoShipping);
                navigate('/pay');
              }
          }
          else 
          {
            if( fullName == null || fullName === '' || fullName === undefined || address == null || address === '' || address === undefined
              || phoneNumber === null  || phoneNumber === ''|| phoneNumber === undefined || phoneNumber.length <10 || Email === null  || Email === ''
              || Email === undefined )
              {
                console.log('name', fullName);
                alert('Vui lòng nhập đầy đủ thông tin giao hàng')
              }
              else
              {
                const infoShipping = {
                  fullname: fullName,
                  phonenumber: phoneNumber,
                  email: Email,
                  address: address
                };

                const jsonInfoShipping = JSON.stringify(infoShipping);
                localStorage.setItem('infoShippingData', jsonInfoShipping);
                console.log('datainfo', jsonInfoShipping);
                navigate('/pay');
                
              }
          }
        }
      }
      else{
        toast.error('Không có sản phẩm nào trong đặt hàng');
        setTimeout(() =>{
            navigate('/');
        },1500)
      }
    }
 
    const isPromotionValid = (dateEnd) => {
      const currentDate = new Date();
      const endDate = new Date(dateEnd);
      return currentDate <= endDate;
  };
  const Getgiamgiatien = (cart) => {
      let totalDiscount = 0;
      cart.forEach((cartItem) => {
          const validPromotion = cartItem.promotions.find((item) => (
              item.prmotiontype === "giamgiaphantram" && isPromotionValid(item.dateEnd)
          ));
  
          if (validPromotion) {
              const discountedPrice = handleXulygiaphantram(validPromotion.value, cartItem.unitPrice);
              totalDiscount += discountedPrice * cartItem.quantity;
          }
  
      });
      if (totalDiscount !== OrderTotalprom) {
          setOrderTotalprom(totalDiscount);
      }
  
      return (
          totalDiscount ? 
          <div className="flex">
              <p className="j_c_start total_text_cart">Giảm giá:</p>
              <p className="j_c_end total_cart" style={{color:'#bbb'}}>- {totalDiscount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </p>
          </div>
          : null
      );
  };
  
  const handleXulygiaphantram = (value, giatien) => {
      const tientrikhau = giatien * (value / 100);
      return tientrikhau;
  }

  console.log('userId', userId);
  console.log('cart', carts);

        return ( 
            <>
            <Link to='/'>
                <p className="mt-2 text-sm font-medium text-ddv">&lt; Tiếp tục mua hàng</p>
            </Link>
            <div className="content-wrapper_order">
                <div className="order-container">
                <div className="title_order">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none">
                <g clip-path="url(#cart_svg__a)">
                    <path fill="#BE1E2D" d="M22.896 1.334v5.238c0 .23-.186.416-.416.416h-1.517a.417.417 0 0 1-.416-.416v-.707a2.113 2.113 0 0 0-2.113-2.113h-1.17a.42.42 0 0 1-.413-.36 2.107 2.107 0 0 0-2.085-1.798h-.552a.418.418 0 0 1-.406-.51c.157-.703.65-1.03 1.227-1.03h6.581c.707 0 1.28.573 1.28 1.28Zm-6.975 1.83a1.27 1.27 0 0 0-1.155-.736h-4.532a1.28 1.28 0 0 0-1.28 1.28v2.864c0 .23.187.416.417.416h2.595c.23 0 .417-.186.417-.416v-.707c0-1.167.946-2.113 2.113-2.113h1.045a.416.416 0 0 0 .38-.588Zm2.513 1.421h-3.938a1.28 1.28 0 0 0-1.28 1.28v.707c0 .23.187.416.417.416h5.664c.23 0 .416-.186.416-.416v-.707a1.28 1.28 0 0 0-1.28-1.28ZM7.618 19.767h13.25c.792 0 1.476-.537 1.663-1.307l2.457-10.123a.417.417 0 0 0-.405-.515H6.901l-.1-.774a1.715 1.715 0 0 0-1.697-1.492h-3.42C.756 5.556 0 6.312 0 7.24c0 .93.756 1.685 1.684 1.685h1.474c.92 0 1.667-.748 1.667-1.667V6.39h.28c.44 0 .814.33.87.766l1.52 11.782a2.227 2.227 0 0 0-2.1 2.22c0 1.227.997 2.224 2.223 2.224h.356a1.984 1.984 0 0 0 1.937 1.565c.949 0 1.744-.672 1.936-1.565h6.916a1.984 1.984 0 0 0 1.936 1.565 1.983 1.983 0 0 0 1.981-1.981 1.983 1.983 0 0 0-1.98-1.981c-.95 0-1.745.671-1.937 1.564h-6.916a1.984 1.984 0 0 0-1.936-1.564c-.95 0-1.745.671-1.937 1.564h-.356c-.767 0-1.39-.624-1.39-1.39 0-.767.623-1.39 1.39-1.39Z"></path>
                </g>
                <defs>
                <clipPath id="cart_svg__a">
                <path fill="#fff" d="M0 0h25v25H0z"></path>
                    </clipPath>
                </defs>
                </svg>
                <p className="title_order_item">Giỏ hàng ({lengthCart} sản phẩm)</p>
                </div>
               
                {
                    carts.length> 0  && carts !== null && carts !== undefined ? 
                    <table>
                      <button 
                className="edit_order_btn"
                type="primary"
                 onClick={hanldeEditCart}
                  
                >
                  Sửa
                </button>
                {
                    carts.map(item =>
                        <tr >
                        <td style={{width: '10%', paddingRight:'10px'}}> <img src={`${baseURL}/Image/${item.image}`} alt="" style={{width:'60px'}}/></td>
                        <td>
                            <p className="order_table_item_name">{ `${item.productName} ${item.ram}/${item.rom}-${item.productColor}`}</p>
                            <div style={{display:'flex'}}>
                                <p className="style_unitprice_total_order">{item.unitPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                <p  className="quantity_order" >SL: {item.quantity}</p>

                            </div>
                        </td>

                    </tr>
                
                

                    )
                }
                    
                
            </table> : <span>Giỏ hàng trống</span>
                }
                
                
        
                </div>
                <div className="additional-content_order">
                <div className="title_pay">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none">
                    <path fill="#BE1E2D" d="M16.943 8.887c-4.442 0-8.056 3.614-8.056 8.056C8.887 21.386 12.5 25 16.943 25 21.386 25 25 21.386 25 16.943c0-4.442-3.614-8.056-8.057-8.056Zm0 7.324a2.2 2.2 0 0 1 2.198 2.197c0 .954-.614 1.76-1.465 2.063v1.6H16.21v-1.6a2.194 2.194 0 0 1-1.465-2.063h1.465a.733.733 0 1 0 .732-.732 2.2 2.2 0 0 1-2.197-2.197c0-.954.614-1.76 1.465-2.063v-1.6h1.465v1.6a2.194 2.194 0 0 1 1.465 2.063h-1.465a.733.733 0 1 0-.733.732ZM8.154 8.887c4.518 0 8.057-1.93 8.057-4.395C16.21 2.028 12.67 0 8.154 0S0 2.028 0 4.492s3.637 4.395 8.154 4.395ZM0 16.482v1.194c0 2.464 3.637 4.394 8.154 4.394.257 0 .505-.023.757-.036a9.461 9.461 0 0 1-1.227-2.911c-3.267-.09-6.104-1.094-7.684-2.64ZM7.457 17.639c-.017-.23-.035-.461-.035-.696 0-.763.1-1.502.27-2.214-3.27-.089-6.11-1.093-7.692-2.641v1.193c0 2.334 3.284 4.167 7.457 4.357ZM8.154 13.281h.003a9.553 9.553 0 0 1 2.057-3.067c-.662.083-1.345.138-2.06.138-3.477 0-6.497-1.037-8.154-2.659v1.194c0 2.464 3.637 4.394 8.154 4.394Z"></path>
                </svg>
                <p className="title_order_content"> Tạm tính</p>
                </div>
                <hr className="line_ngang_order"/>
                {Getgiamgiatien(carts)}
                <div className="flex">
                    <p className="j_c_start total_text_order">Tổng cộng:</p>
                    <p className="j_c_end style_unitprice_total_order">{(OrderTotal-OrderTotalprom).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </p>
                </div>
                <Button className="btn_order" onClick={handleOrder}>
                Thanh toán
                </Button>
                </div>
            </div>
            <div className="infomation_container_order">
            <p className="title_order_item">Thông tin giao hàng</p>

            <Form layout="vertical"
            form={form}>
            <Form.Item 
            value={`${user.lastName} ${user.firstName}`}
            name="fullname"
            label="Họ và tên người nhận"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên người nhận!' }]}
            onChange={(e) => setFullName(e.target.value)}
            

            
            >
              <Input  placeholder="Nhập họ và tên người nhận" />
            </Form.Item>
            <Form.Item 
            value={user.phoneNumber}
            name="phone"
            label="Số điện thoại người nhận"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại người nhận!' },
              { pattern: /^\d{10,11}$/, message: 'Số điện thoại không hợp lệ!' },
            ]}
            onChange={(e) => {setPhoneNumber(e.target.value)}}
           
            >
              <Input placeholder="Nhập số điện thoại người nhận"  />
            </Form.Item>
            <Form.Item 
            value={user.email}
            name="email"
            label="Email người nhận"
            rules={[
              { required: true, message: 'Vui lòng nhập email người nhận!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
            onChange={(e) => {setEmail(e.target.value)}}
            >
              <Input placeholder="Nhập email người nhận" />
            </Form.Item>
            {
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
    <p className = "edit_address_content_order" >Địa chỉ người nhận:</p>
    <p>{user.address}</p>
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
            
          
          </Form>
            </div>
        
            
            <ToastContainer
            position="top-center"
            pauseOnHover={false}
            closeOnClick={true}
            autoClose={1500}
            theme={'dark'}
            />
        
            </> );
    }
    
    export default OrderPage;