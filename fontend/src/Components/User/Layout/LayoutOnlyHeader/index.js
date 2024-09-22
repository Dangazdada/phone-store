import { useEffect } from 'react';
import Header from "./Header/Header";
import TopNav from "./TopNav/TopNav";


const DefaultLayout = ( {children}) => {
    useEffect(() => {
        if (children.type.name === "DangNhap") {
            document.title = 'Đăng nhập';
        }
        if (children.type.name === "Register") {
            document.title = 'Đăng ký';
        }
        if (children.type.name === "Cart") {
            document.title = 'Giỏ hàng';
        }
        if (children.type.name === "OrderPage") {
            document.title = 'OrderPage';
        }
        if (children.type.name === "Pay") {
            document.title = 'Thanh toán';
        }
    }, [children]);
    console.log("Default Layout", children);
    return ( 
        <div>
            <TopNav/>
            <section>
            <Header/>
                <div className="container">
                    <div className="contentcus">{children}</div>
                </div>
                
            </section>
        </div> 
        );
}
 
export default DefaultLayout;