import React, { useState, useEffect } from 'react';
import Logoutgg from '../../../../../Pages/User/Login/logoutgg';
import { useAuth } from '../../../../Other/auth';
import {useNavigate,useLocation } from 'react-router-dom';
import "./header.css";
import Banner from '../Banner/Banner';
import CompanyMenu from '../CompanyMenu/CompanyMenu';


const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoggedIn,LastName,FirtName, username, isAdmin, userId} = useAuth();
    const [Phoneall, setPhoneall] = useState(false);
    const [SearchPhoneall, setSearchPhoneall] = useState(false);
    const [NameSearch, setNameSearch] = useState('');
    const [menuResult, setMenuResult] = useState(false);
    
    const handleSearch = () => {
        if (Phoneall === true) {
        setPhoneall(!Phoneall);
        }
        setSearchPhoneall(true);
        if (localStorage.getItem('duongdanao') !== null){
            setSearchPhoneall(true);
            localStorage.removeItem('duongdanao');
        }
        navigate('/')
    }

    const handlePhoneAllClick = () => {
        setPhoneall(true);
        setNameSearch('');
        if (Phoneall === true) {
        setPhoneall(!Phoneall);
        setSearchPhoneall(false);
        }
        if (localStorage.getItem('duongdanao') !== null){
            setPhoneall(true);
            localStorage.removeItem('duongdanao');
        }
        navigate('/');
    };
    if(Phoneall === true){
        location.pathname = '/tat-ca-dien-thoai';
    }
    else if(NameSearch.trim() !== '' && SearchPhoneall === true) {
        location.pathname = `/ProductDetails/SearchByName?name=${NameSearch}`;
    }
    else{
        location.pathname = '';
    }
    const handleMenuResultChange = (result) => {
        setMenuResult(result);
    };
    if(menuResult){
        setNameSearch('');
        setMenuResult(false);
    }
    console.log('Phoneall clicked',Phoneall);
    console.log('Phoneall okedata',location.pathname);
    return ( 
        <>
            
                <div className="header group">
                    <div className="logo">
                        <a href="/">
                            <img src="/img/logo.png" alt="Trang chủ Smartphone Store" title="Trang chủ Smartphone Store" />
                        </a>
                    </div>
                    <div className="content">
                            <div className="tools-phone">
                                <div className="PhoneAll">
                                    <a href="#" onClick={(event) => {
                                event.preventDefault(); handlePhoneAllClick()}}>
                                        <i className="fa fa-mobile"></i>
                                        <span>&nbsp;Điện Thoại</span>
                                    </a>
                                </div>
                            </div>
                        <div className="search-header">
                            <form className="input-search" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                                <div className="autocomplete">
                                    <input id="search-box" value={NameSearch} onChange={(e) => setNameSearch(e.target.value)} type="text" placeholder="Nhập từ khóa tìm kiếm..." />
                                    <button type="submit">
                                        <i className="fa fa-search"></i>
                                        Tìm kiếm
                                    </button>
                                </div>
                            </form>
                        </div>
                            <div className="tools-member">
                                <div className="member">
                                {isLoggedIn ? (
                                    <>
                                    <div className="user-profile">
                                    <i className="fa fa-user"></i>
                                        <span>{LastName+" "+FirtName}</span>
                                    </div>
                                    <div className="menuMember">
                                                            {/* Các menu tài khoản nếu đăng nhập thành công */}
                                                            <a href="/member"  >Trang Cá Nhân</a>
                                                            <a href="/OrderManagement"  >Quản lý đơn hàng</a>
                                                            <a href={`/Favourites`} >Điện thoại yêu thích</a>
                                                            <Logoutgg/>
                                        </div>
                                    </>
                                    ) : (
                                        <>
                                        <a href="/Login"><i className="fa fa-user"></i>Tài khoản</a>
                                        <div className="menuMember">
                                            <a href="/Login/Register">Đăng ký</a>
                                            <a href="/Login">Đăng nhập</a>
                                        </div>
                                        </>
                                    )}
                            </div>
                            

                            <div className="cart">
                                <a href="/Cart">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>Giỏ hàng</span>
                                    <span className="cart-number"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <Banner/>
                <CompanyMenu onMenuResultChange={handleMenuResultChange}/>                       
        </>
     );
}
 
export default Header;