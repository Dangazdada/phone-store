import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Pay.css";
import React, { useEffect, useState } from 'react';
import axiosClient, { baseURL } from "../../../Components/Other/axiosClient";
import { Button, Input, Form, Select, Radio} from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useAuth  } from "../../../Components/Other/auth";


const { Option } = Select;

const Pay = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {FirtName,LastName} = useAuth();
  const { isLoggedIn, userId } = useAuth();

  const [carts, setCarts] =useState([]);
  
  const [lengthCart, setLengthCart] = useState(0);
  const [OrderTotal , setOrderTotal] = useState(0);
  const location = useLocation();

    // thông tin giao hàng
  const [fullName, setFullName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [Email, setEmail] = useState(null);
  const [address, setAddress] =useState(null);

  const [shippingFee] = useState(0);
  const [TotalPay, setTotalPay] = useState(0)
  const [value, setValue] = useState(3);

  const [selectedMethod, setSelectedMethod] = useState(3); 


  // const handleMethodChange = (event) => {
  //   setSelectedMethod(event.target.value);
  // };
  useEffect(() => {
        
    axiosClient.get(`/Carts/user?id=${userId}`)
    .then(res => {
        const data = res.data.filter(data => data.userId === userId);
 
      setCarts(data);
      //const data = res.data;
      // Lấy số lượng phần tử của res.data
      const count = data.length;
      setLengthCart(count);
      setTotalPay(caculateTotal(data));
      setOrderTotal(calculateSubTotal(data));
      const infodata = localStorage.getItem('infoShippingData');
      const storeInfo  = JSON.parse(infodata);

      if(storeInfo !== null)
      {
        setFullName(storeInfo.fullname);
        setPhoneNumber(storeInfo.phonenumber);
        setEmail(storeInfo.email);
        setAddress(storeInfo.address);
      }
      
      })
    .catch(error => {
        console.log(error.data);
    });
     

  },[lengthCart, userId, value]);


    useEffect(() => {
      // Lấy các tham số từ query parameters từ vnPay trả về
      const searchParams = new URLSearchParams(location.search);
      const vnp_Amount = searchParams.get('vnp_Amount');
      const vnp_BankCode = searchParams.get('vnp_BankCode');
      
      const vnp_ResponseCode = searchParams.get('vnp_ResponseCode'); // mã trạng thái giao dịch 00 là thành công
      const valueItem = localStorage.getItem('valueitem');
      
      if(valueItem !== null )
      {
        const parsedValue = parseInt(valueItem, 10);
        setValue(parsedValue);
        localStorage.removeItem('valueitem');
      }
    
      // trường hợp thanh toán thanh công
      if(vnp_ResponseCode === '00')
        {
          const storeInfotString = localStorage.getItem("infoShippingData");
          const storeInfo =  JSON.parse(storeInfotString) ;

          const userId = localStorage.getItem("userid");

            
          axiosClient.get(`/Carts/user?id=${userId}`)
          .then(res => {
            const carts = res.data.filter(data => data.userId === userId);
            var  TotalPay  =caculateTotal(carts);
            var  OrderTotal = calculateSubTotal(carts) 
            if( storeInfo !== null &&  userId !== null &&  carts !== null)
            {
              const invocie = {

                UserId: userId,
                ShippingAddress: storeInfo.address,
                ShippingPhone:storeInfo.phonenumber,
                Total:TotalPay,
                SubTotal: OrderTotal,
                PayId  : 2,
                IssuedDate: new Date(),
              };
              let CheckQuantity = false;
              let CheckQuantityname = '';
              carts.map(item => {
                const Quantitysum = item.quantitydetail - item.quantity;
                if ( Quantitysum < 0){
                  CheckQuantity = true;
                  CheckQuantityname = `${item.productName} ${item.ram}/${item.rom}-${item.productColor}`;
                }
              });

              CheckQuantity === true ?
              toast.error(`${CheckQuantityname} đã hết hàng!`)
              :
              axiosClient.post('/invoices',invocie )
              .then(res => {
                console.log('res data', res.data);
                let invocieId = res.data.id;

                carts.map ( item => {
                  const invoiceDetail = {
                    InvoiceId : invocieId,
                    ProductDetailId: item.productDetailId,
                    Quantity: item.quantity,
                    UnitPrice: item.unitPrice
                  };

                  axiosClient.post('/invoiceDetails',invoiceDetail )
                  .then(res => {
                    console.log('create invocie successfull', res.data);
                  })

                  .catch(error => {
                    console.log('create invocie failed', error.data);
                  });

                  carts.map(item => {
                    const Quantitysum = item.quantitydetail - item.quantity
                      axiosClient.put(`/ProductDetails/Quantity/${item.productDetailId}`, Quantitysum)
                  });

                });
                
                axiosClient.delete(`/Carts/user/${userId}`)
                .then(() => toast.success('Bạn đã mua thành công!')
                  ,setTimeout(() =>{
                    navigate('/');
                  },3000)
                )
                .catch(error => {
                  toast.error('Bạn mua không thành công!');
                  setTimeout(() => {
                    navigate('/Cart');
                  },3000)
                });
                
              })
              .catch(error => {
                console.log('error create invoice', error.data);
              });

          }
          });

        }
      else 
      if ((vnp_ResponseCode !== null &&  vnp_ResponseCode  !== undefined)  && vnp_ResponseCode !== "00" )
      {
        toast.error('thanh toán thất bại')
      }
    
    }, [location.search]);

    const onChange = (e) => {
  
      setValue(e.target.value);
    };
  


  const isPromotionValid = (dateEnd) => {
    const currentDate = new Date();
    const endDate = new Date(dateEnd);
    return currentDate <= endDate;
};
    //hàm tính tiền khuyến mãi 
  const applyPromotion = (price ,quantity, promotion) => {
    let finalPrice = price * quantity ;
    let subPrice = 0;
    // console.log(promotion);
    promotion.map(item => {
      if(item.prmotiontype === "giamgiaphantram" && isPromotionValid(item.dateEnd))
        {
        
        finalPrice -= finalPrice * (item.value / 100);
        
      }
    if(item.prmotiontype === "giamgiatien"  && value === 2 )
        {
          
         
          subPrice = item.value * quantity;
          
        }
    });
    let final = finalPrice - subPrice;
    return final;

  };
    // hàm tính tổng tiền cho từng hóa đơn
  const caculateTotal = (productData) => {
    let total = 0;
    productData.map(item => {
      const finalPrice = applyPromotion(item.unitPrice, item.quantity,item.promotions);
      total += finalPrice;
      
    })
    return total;
  };
 
// tính tổng tiền hàng
    const calculateSubTotal = (carts) => {
        let total = 0;
        if(carts.length > 0)
            {
                carts.forEach(item => {
                    total += item.quantity * item.unitPrice;
                });
            }
        
        return total;
    };
    // chuyển trang về giỏ hàng
    const hanldeEditCart =() => {
      navigate('/cart')
    };
    // chuyển trang về đặt hàng
    const hanldeEditInfo =() => {
      navigate('/order')
    };

    // xử lý thanh toán
    const hanldePay = () => {
      const storeInfotString = localStorage.getItem("infoShippingData");
      const storeInfo  = JSON.parse(storeInfotString);
      
      console.log('infodata', storeInfo);
      // trường hợp thanh toán bằng vn pay
      if(value === 2) 
        {
          // tạo các dữ liệu để lưu trong localStorage để khi quay lại trang có thể lấy được ngay
          localStorage.setItem('valueitem', value);
          localStorage.setItem('cartitem', carts);
          localStorage.setItem('userid', userId);

          const  dataRequest = {
          FullName: `${LastName} ${FirtName}`,
          Desciption: "0123",
          Amount:TotalPay,
          CreateDate: new Date()
          }
          // tạo yêu cầu tạo đường dẫn thanh toán
            axiosClient.post('/VnPay/create-payment-url', 
              dataRequest
          )
          .then(res => {
            window.location.href = res.data.paymentUrl;
            console.log('data', res.data.paymentUrl);
          })
          .catch(error => {
            console.log('err', error.data);
          })
        
          
        }
        // thanh toán bằng tiền mặt
        else
        {
          const invocie = {

            UserId: userId,
            ShippingAddress: address,
            ShippingPhone:phoneNumber,
            Total:TotalPay,
            SubTotal: OrderTotal,
            PayId  : value,
            IssuedDate: new Date(),
          };
          let CheckQuantity = false;
          let CheckQuantityname = '';

          // kiểm tra số lượng sản phẩm
          carts.map(item => {
            const Quantitysum = item.quantitydetail - item.quantity;
            if ( Quantitysum < 0){
              CheckQuantity = true;
              CheckQuantityname = `${item.productName} ${item.ram}/${item.rom}-${item.productColor}`;
            }
          });

          CheckQuantity === true ?
          toast.error(`${CheckQuantityname} đã hết hàng!`)
          :
          // tạo đơn hàng sau 
          axiosClient.post('/invoices',invocie )
          .then(res => {
            console.log('res data', res.data);
            let invocieId = res.data.id;

            carts.map ( item => {
              const invoiceDetail = {
                InvoiceId : invocieId,
                ProductDetailId: item.productDetailId,
                Quantity: item.quantity,
                UnitPrice: item.unitPrice
              };

              axiosClient.post('/invoiceDetails',invoiceDetail )
              .then(res => {
                console.log('create invocie successfull', res.data);
              })
              .catch(error => {
                console.log('create invocie failed', error.data);
              });
              // trừ số lượng sản phẩm sau khi tạo thành công đơn hàng
              carts.map(item => {
                  const Quantitysum = item.quantitydetail - item.quantity
                  axiosClient.put(`/ProductDetails/Quantity/${item.productDetailId}`, Quantitysum)
              });
            });
            
            // xóa các sản phẩm khỏi giỏ hàng khi tạo thành công đơn hàng
            axiosClient.delete(`/Carts/user/${userId}`)
            .then(() => toast.success('Bạn đã mua thành công!')
              ,setTimeout(() =>{
                navigate('/');
              },1500))

            .catch(error => {
              toast.error('Bạn mua không thành công!');
              setTimeout(() => {
                navigate('/Cart');
              },1500)
              
            });
            
          })
          .catch(error => {
            console.log('error create invoice', error.data);
          });
        }

   
    };
 

    console.log('value', value);
    console.log('login', isLoggedIn);
    console.log('carts', carts);


    return ( 
        <>
        <Link to='/'>
            <p class="mt-2 text-sm font-medium text-ddv">&lt; Tiếp tục mua hàng</p>
        </Link>
        <div className="content-wrapper_pay">
            <div className="pay_container">
            <div className="title_pay">
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
            <p className="title_pay_item">Giỏ hàng ({lengthCart} sản phẩm)</p>
           
            </div>
           
            {
                carts.length> 0  && carts !== null && carts !== undefined ? 
                <table>
                <button 
                className="edit_pay_btn"
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
                            <p className="pay_product_name">{ `${item.productName} ${item.ram}/${item.rom}-${item.productColor}`}</p>
                            <div style={{display:'flex'}}>
                                <p className="style_unitprice_total_pay">{item.unitPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                <p  className="quantity_pay" >SL: {item.quantity}</p>
                            </div>
                        </td>
                      </tr>
                  )
                }
                
            
              </table> : <span>Giỏ hàng trống</span>
            }
      </div >
            
           
        
        <div className="additional_content_pay">
        <div className="title_pay">
          <svg width="19" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 0C4.331 0 .125 4.235.125 9.443c0 7.399 8.494 15.038 8.855 15.36a.78.78 0 0 0 1.04 0c.361-.322 8.855-7.961 8.855-15.36C18.875 4.235 14.669 0 9.5 0Zm0 14.583a5.214 5.214 0 0 1-5.208-5.208A5.214 5.214 0 0 1 9.5 4.167a5.214 5.214 0 0 1 5.208 5.208A5.214 5.214 0 0 1 9.5 14.583Z" fill="#BE1E2D"></path>
          </svg>
          <p className="title_pay_content"> Địa chỉ giao hàng</p>
        </div>
        <div className = "edit_address_block_pay" >

          <div   className = "edit_address_tile_pay" >
            <div className="d-flex">
              <p className = "edit_address_content" >Tên  người nhận: </p>
              <p style={{marginBottom:"5px", paddingLeft:'5px'}}> {fullName}</p>
          </div>
          
          <div className="d-flex">
          <p className = "edit_address_content_pay" >Địa chỉ người nhận:</p>
          <p style={{marginBottom:"5px",paddingLeft:'5px'}}>{address}</p>
          </div>

          <div className="d-flex">
            <p className = "edit_address_content" >Số điện thoại:</p>
            <p style={{ paddingLeft:'5px'}}>{phoneNumber}</p>
          </div>

          <button
          className="edit_address_btn_pay"
            onClick={hanldeEditInfo}
            
          >
            Sửa
          </button>
          </div>
        </div>
      

      
        </div>

       <div className="infomation_container_pay">
        <div className="title_pay">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" fill="none">
        <path fill="#BE1E2D" d="M25 7.959V6.641a2.734 2.734 0 0 0-2.734-2.735H2.734A2.734 2.734 0 0 0 0 6.641v1.318c0 .135.11.244.244.244h24.512c.135 0 .244-.11.244-.244ZM0 10.01v8.35a2.734 2.734 0 0 0 2.734 2.734h19.532A2.734 2.734 0 0 0 25 18.359v-8.35a.244.244 0 0 0-.244-.243H.244A.244.244 0 0 0 0 10.01Zm6.25 6.396c0 .432-.35.782-.781.782h-.782a.781.781 0 0 1-.78-.782v-.781c0-.431.35-.781.78-.781h.782c.431 0 .781.35.781.781v.781Z"></path>
      </svg>
        <p className="title_pay_item">Phương thức thanh toán</p>
        </div>
         <div className="payment-methods"  >
         <Radio.Group onChange={onChange} value={value}>
         <Radio value={3}>
          <svg style={{paddingRight: '7px'}}
            xmlns="http://www.w3.org/2000/svg" width="25" height="19" fill="none">
            <path fill="#6FABE6" d="M.521 8.458h3.125v8.854H.521V8.458Z"></path>
            <path fill="#82BCF4" d="M3.646 8.458c0 8.203-.052 7.813 0 7.813a2.083 2.083 0 0 1-2.083-2.084V8.458h2.083Z"></path>
            <path fill="#F6CCAF" d="M24.48 12.625a1.563 1.563 0 0 1-.85 1.39c-9.181 4.693-8.989 4.86-11.04 4.86-1.49 0-2.084-.432-6.25-2.323-.766-.354-1.298-.281-2.694-.281V9.5c4.964-.62 3.38-.87 11.084 2.75a1.562 1.562 0 0 1 .25 2.676l7.224-3.693a1.563 1.563 0 0 1 2.276 1.391Z"></path>
            <path fill="#FFDEC7" d="M24.385 12.104c-.276.807-.166.568-9.14 5.156a5.319 5.319 0 0 1-2.656.573c-1.49 0-2.084-.432-6.25-2.323a3.03 3.03 0 0 0-1.13-.28.521.521 0 0 1-.521-.522V9.37c3.734-.464 2.677-.578 10.041 2.88a1.562 1.562 0 0 1 .61 2.307c-.235.37-.72.557.104.13 7.234-3.692 6.77-3.473 6.953-3.53a1.563 1.563 0 0 1 1.99.947Z"></path>
            <path fill="#DF8761" d="M22.396.125c0 12.203.088 10.969-.193 11.11l-7.224 3.692a1.564 1.564 0 0 0-.25-2.677C8.75 9.443 8.734 9.365 7.813 9.208V.125h14.583Z"></path>
            <path fill="#F29B75" d="M22.397.125v9.953c-.463.084-.443.115-5.828 2.87a2.606 2.606 0 0 0-1.396-1.64C7.58 7.74 9.965 8.848 9.48 8.634a1.042 1.042 0 0 1-.625-.953V.125h13.542Z"></path>
            <path fill="#FC6" d="M17.188.125V3.25l-2.083-1.042L13.02 3.25V.125h4.167Z"></path>
            <path fill="#FFDE76" d="M17.188.125v2.083l-2.084-1.041-1.041.52V.125h3.124Z"></path>
            <path fill="#CC734C" d="M20.313 10.02H18.23a.521.521 0 0 1 0-1.04h2.083a.52.52 0 1 1 0 1.04Z"></path>
            <path fill="#EDB996" d="m13.174 15.547-4.11-1.932a.521.521 0 0 1 .448-.938l4.11 1.933c.88.41 1.192-.579 1.718-.053-.234.37-.719.558.104.13.407.792-1.245 1.355-2.27.86Z"></path>
           </svg>  Thanh toán bằng tiền mặt</Radio>
         <Radio value={2}>
         <img
         src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
         style={{ width: '20px', paddingRight:'7px' }} // Điều chỉnh kích thước ảnh
         alt="vnPay"
       />  Thanh toán bằng VN PAY
         </Radio>
      
       </Radio.Group>
        
         </div>
       
      
       </div>

        <div className="additional_content_pay">

        <div className="title_pay">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none">
            <path fill="#BE1E2D" d="M16.943 8.887c-4.442 0-8.056 3.614-8.056 8.056C8.887 21.386 12.5 25 16.943 25 21.386 25 25 21.386 25 16.943c0-4.442-3.614-8.056-8.057-8.056Zm0 7.324a2.2 2.2 0 0 1 2.198 2.197c0 .954-.614 1.76-1.465 2.063v1.6H16.21v-1.6a2.194 2.194 0 0 1-1.465-2.063h1.465a.733.733 0 1 0 .732-.732 2.2 2.2 0 0 1-2.197-2.197c0-.954.614-1.76 1.465-2.063v-1.6h1.465v1.6a2.194 2.194 0 0 1 1.465 2.063h-1.465a.733.733 0 1 0-.733.732ZM8.154 8.887c4.518 0 8.057-1.93 8.057-4.395C16.21 2.028 12.67 0 8.154 0S0 2.028 0 4.492s3.637 4.395 8.154 4.395ZM0 16.482v1.194c0 2.464 3.637 4.394 8.154 4.394.257 0 .505-.023.757-.036a9.461 9.461 0 0 1-1.227-2.911c-3.267-.09-6.104-1.094-7.684-2.64ZM7.457 17.639c-.017-.23-.035-.461-.035-.696 0-.763.1-1.502.27-2.214-3.27-.089-6.11-1.093-7.692-2.641v1.193c0 2.334 3.284 4.167 7.457 4.357ZM8.154 13.281h.003a9.553 9.553 0 0 1 2.057-3.067c-.662.083-1.345.138-2.06.138-3.477 0-6.497-1.037-8.154-2.659v1.194c0 2.464 3.637 4.394 8.154 4.394Z"></path>
          </svg>
          <p className="title_pay_content"> Thanh toán</p>
        </div>

        <div className="flex">
          <p className="j_c_start fs-14-l20">Tiền hàng:</p>
          <p className="j_c_end style_price_pay">{OrderTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </p>
        </div>

        <div className="flex mt-2">
          <p className="j_c_start fs-14-l20">Phí vận chuyển:</p>
          <p className="j_c_end style_price_pay">{shippingFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </p>
        </div>

        <div className="flex mt-2 mb-2">
          <p className="j_c_start fs-14-l20">Khuyến mãi:</p>
          <p className="j_c_end style_price_pay">-{(OrderTotal - TotalPay).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </p>
        </div>

        <hr className="mt-2"/>

        <div className="flex mt-2  ">
          <p className="j_c_start fs-14-l20">Tổng cộng:</p>
          <p className="j_c_end style_unitprice_total_pay">{TotalPay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </p>
        </div>
        
        <Button className="btn_pay" onClick={hanldePay}>
          Thanh toán
        </Button>

       < div/>
      

       
    </div>
        </div>
    
           <ToastContainer
            position="top-center"
            pauseOnHover={false}
            closeOnClick={true}
            autoClose={2500}
            theme={'dark'}
            />
        </> 
        
        );
}

export default Pay;