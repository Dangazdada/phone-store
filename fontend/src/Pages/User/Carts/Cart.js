import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import React, { useEffect, useState } from 'react';
import axiosClient, { baseURL } from "../../../Components/Other/axiosClient";
import { Button } from 'antd';


import QuantitySelector from './QuantitySelector'; 
import DeleteModal from "../../../Components/Other/DeleteModal";
import { useAuth  } from "../../../Components/Other/auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cart = () => {
    const { isLoggedIn, userId } = useAuth();
    const [carts, setCarts] =useState([]);
    const [lengthCart, setLengthCart] = useState(0);
    const [OrderTotal , setOrderTotal] = useState(0);
    const [selectedCart, setSelectedCart] = useState({});
    const [showDelete, setShowDelete] = useState(false);
    const [loadData, setLoadData] = useState(false); 
    const [QuantitySelectorSuccess , setQuantitySelectorSuccess] = useState(false);
    const [OrderTotalprom , setOrderTotalprom] = useState(0);
    console.log('idcheck',userId);
    
    const navigate = useNavigate();
    useEffect(() => {
        axiosClient.get(`/Carts/user?id=${userId}`)
        .then(res => {
            const data = res.data.filter(data => data.userId === userId);
            setCarts(data);
            // Lấy số lượng phần tử của res.data
        const count = data.length;
        setLengthCart(count);
        setOrderTotal(calculateTotal(data));
        setLoadData(false);
        })
        .catch(error => {
            console.log(error.data);
        });
    },[userId,lengthCart]);
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

    const updateQuantity = (productDetailId, newQuantity) => {
        if (newQuantity === 0) {
            const cart = carts.find(a => a.productDetailId === productDetailId);
            setSelectedCart(cart);
            setShowDelete(true);
            if (showDelete === false && newQuantity === 0) {
                newQuantity = 1;
            }
        }

        const updatedCarts = carts.map(item => {
            if (item.productDetailId === productDetailId) {
                if (newQuantity > 5) {
                    toast.error('Số lượng đạt tối đa!');
                    return item;
                } else {
                    const cart = {
                        Quantity: newQuantity
                    };
                    axiosClient.put(`/Carts/${item.id}`, cart)
                        .then(response => {
                            console.log('Increase success!');
                            setQuantitySelectorSuccess(true);
                            // Cập nhật carts và orderTotal sau khi cập nhật thành công
                            const updatedCart = { ...item, quantity: newQuantity };
                            const updatedCarts = carts.map(c => (c.productDetailId === productDetailId ? updatedCart : c));
                            setCarts(updatedCarts);
                            setOrderTotal(calculateTotal(updatedCarts));
                        })
                        .catch(error => {
                            console.error('Error updating cart:', error);
                            setQuantitySelectorSuccess(false);
                        });
                    return item;
                }
            }
            return item;
        });
        setCarts(updatedCarts); // Cập nhật carts sau khi map
        setOrderTotal(calculateTotal(updatedCarts)); // Cập nhật orderTotal sau khi map
    };
    
    const handleShowDelete = (id) => {
        const cart = carts.find(a => a.id === id);
        setSelectedCart(cart);
        setShowDelete(true);
        console.log('select',selectedCart );
    }
    const handleCloseDelete = () => setShowDelete(false);

const handleDelete = () => {
    
    axiosClient.delete(`/Carts/${selectedCart.id}`)
    .then(() => {
    // cập nhật lại dữ liệu sao khi xóa
    const updatedProductType = carts.filter(item => item.id !== selectedCart.id);
    setCarts(updatedProductType);
    setLengthCart(updatedProductType.length)
    setShowDelete(false);
    setLoadData(true);
    })
    .catch(error => {
    console.error('Error deleting product type:', error);
    // Xử lý lỗi nếu cần
    });

    setShowDelete(false);
};
const handleOrder = () => {
    if(lengthCart !== 0){
        const jsonCarts = JSON.stringify(carts);
        localStorage.setItem('cartsData', jsonCarts);
        console.log('data',jsonCarts);
        // Lấy dữ liệu từ localStorage ra 
        const storeCartString = localStorage.getItem("cartsData");
        const storeCart  = JSON.parse(storeCartString);
        console.log('dataget', storeCart);
        navigate('/order')
    }
    else{
        toast.error('Không có sản phẩm nào trong giỏ hàng');
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

console.log('carts', carts);
    return ( 
        <>
        <Link to='/'>
            <p className="mt-2 text-sm font-medium text-ddv">&lt; Tiếp tục mua hàng</p>
        </Link>
        <div className="content-wrapper_cart">
            <div className="container_cart">
            <div className="title_cart">
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
            <p className="title_cart_item">Giỏ hàng ({lengthCart} sản phẩm)</p>
            </div>
            <div className="table_cart" >
                <p className="table_text_lable_cart" style={{width: '40%'}}>Tên sản phẩm</p>
                <p className="table_text_lable_cart" style={{width: '20%'}} >Đơn giá</p>
                <p className="table_text_lable_cart" style={{width: '15%'}}>Số lượng </p>
                <p className="table_text_lable_cart"style={{width: '15%'}}>Thành tiền</p>
                <p className="table_text_lable_cart" style={{width: '10%', textAlign:"end"}}>Thao tác</p>
            </div>
            <hr/>
            <br/>
            {
                carts.length> 0  && carts !== null && carts !== undefined ? 
                <table className="table_space_cart">
            {
                carts.map(item =>
                    <tr >
                    <td style={{width: '10%'}}> <img src={`${baseURL}/Image/${item.image}`} alt="" style={{width:'60px'}}/></td>
                    <td className="table_item_name_cart" style={{width: '30%'}}><p>{`${item.productName}  ${item.ram}/${item.rom}-${item.productColor}`}</p></td>
                    <td className="table_item_unitprice_cart" style={{width: '20%'}}>
                    <p>{item.unitPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    </td>
                    <QuantitySelector
                    key={OrderTotal}
                    quantity={item.quantity}
                    onUpdateQuantity={newQuantity => updateQuantity(item.productDetailId, newQuantity)}
                />
                    <td className="table_item_total_cart" style={{width: '15%'}}>
                        <p>{(item.quantity * item.unitPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    </td>
                    <td className="table_item_delete_cart"style={{width: '10%', textAlign:"end"}}>
                    <Button className="btn_delete_cart" onClick={() => handleShowDelete(item.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none">
                    <rect width="25" height="25" x="0.5" y="0.5" fill="#fff" stroke="#808A94" rx="1.5"></rect>
                    <path fill="#808A94" d="M16.678 19.457h-6.74a.669.669 0 0 1-.667-.624l-.579-8.598a.669.669 0 0 1 .668-.713h7.896a.67.67 0 0 1 .668.713l-.578 8.598a.67.67 0 0 1-.668.625Zm1.906-11.19H8.116c-.01 0-.016-.006-.016-.015V6.42c0-.01.006-.016.016-.016h10.468c.01 0 .016.006.016.016V8.25c0 .01-.007.018-.016.018Z"></path>
                    <path fill="#808A94" d="M16.136 7.305H10.54c-.01 0-.016-.006-.016-.016V5.21c0-.01.007-.017.016-.017h5.595c.009 0 .015.007.015.016V7.29a.016.016 0 0 1-.015.016Z"></path>
                </svg>
                    </Button>
                    
                    </td>

                </tr>
            
            

                )
            }
                
            
        </table> : <span>Giỏ hàng trống</span>
            }
            
            
    
            </div>
            <div className="additional-content_cart">
            <div className="title_order">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none">
                <path fill="#BE1E2D" d="M16.943 8.887c-4.442 0-8.056 3.614-8.056 8.056C8.887 21.386 12.5 25 16.943 25 21.386 25 25 21.386 25 16.943c0-4.442-3.614-8.056-8.057-8.056Zm0 7.324a2.2 2.2 0 0 1 2.198 2.197c0 .954-.614 1.76-1.465 2.063v1.6H16.21v-1.6a2.194 2.194 0 0 1-1.465-2.063h1.465a.733.733 0 1 0 .732-.732 2.2 2.2 0 0 1-2.197-2.197c0-.954.614-1.76 1.465-2.063v-1.6h1.465v1.6a2.194 2.194 0 0 1 1.465 2.063h-1.465a.733.733 0 1 0-.733.732ZM8.154 8.887c4.518 0 8.057-1.93 8.057-4.395C16.21 2.028 12.67 0 8.154 0S0 2.028 0 4.492s3.637 4.395 8.154 4.395ZM0 16.482v1.194c0 2.464 3.637 4.394 8.154 4.394.257 0 .505-.023.757-.036a9.461 9.461 0 0 1-1.227-2.911c-3.267-.09-6.104-1.094-7.684-2.64ZM7.457 17.639c-.017-.23-.035-.461-.035-.696 0-.763.1-1.502.27-2.214-3.27-.089-6.11-1.093-7.692-2.641v1.193c0 2.334 3.284 4.167 7.457 4.357ZM8.154 13.281h.003a9.553 9.553 0 0 1 2.057-3.067c-.662.083-1.345.138-2.06.138-3.477 0-6.497-1.037-8.154-2.659v1.194c0 2.464 3.637 4.394 8.154 4.394Z"></path>
            </svg>
            <p className="title_content_cart"> Tạm tính</p>
            </div>
            <hr className="line_ngang_cart"/>
            {Getgiamgiatien(carts)}
            <div className="flex">
                <p className="j_c_start total_text_cart">Tổng cộng:</p>
                <p className="j_c_end total_cart">{(OrderTotal-OrderTotalprom).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </p>
            </div>
            <Button className="btn_order_cart" onClick={handleOrder}>Đặt hàng{` (${lengthCart})`}</Button>
            </div>
        </div>
    
        
        <DeleteModal
        visible = {showDelete}
        handleCancel = {handleCloseDelete}
        handleDelete = {handleDelete}
        name ={`${selectedCart.productName} ${selectedCart.ram}/${selectedCart.rom}-${selectedCart.productColor} khỏi giỏ hàng`}
        />
        
        <ToastContainer
        position="top-center"
        pauseOnHover={false}
        closeOnClick={true}
        autoClose={1500}
        theme={'dark'}
        />
    
        </> );
}

export default Cart;