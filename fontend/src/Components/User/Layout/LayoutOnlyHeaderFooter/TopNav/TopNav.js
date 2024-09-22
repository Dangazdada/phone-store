import React, { useState } from "react";
import "./topnav.css";

const TopNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="top-nav">
            <div className="social-top-nav">
                <a className="fa fa-facebook"></a>
                <a className="fa fa-twitter"></a>
                <a className="fa fa-google"></a>
                <a className="fa fa-youtube-play"></a>
            </div> {/* End Social Topnav */}

            <button className="hamburger" onClick={handleMenuToggle}>
                <i className="fa fa-bars"></i>
            </button>

            <ul className={`top-nav-quicklink ${isMenuOpen ? 'show' : ''}`}>
                <li><a href="/"><i className="fa fa-home"></i> Trang chủ</a></li>
                <li><a href="/tin-tuc"><i className="fa fa-newspaper-o"></i> Tin tức</a></li>
                <li><a href="/gioi-thieu"><i className="fa fa-info-circle"></i> Giới thiệu</a></li>
                <li><a href="/trung-tam-bao-hanh"><i className="fa fa-wrench"></i> Bảo hành</a></li>
                <li><a href="/lien-he"><i className="fa fa-phone"></i> Liên hệ</a></li>
            </ul> {/* End Quick link */}
        </div>
    );
}

export default TopNav;
