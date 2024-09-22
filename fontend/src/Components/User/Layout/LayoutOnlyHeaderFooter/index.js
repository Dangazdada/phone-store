import { useEffect } from 'react';
import Header from "./Header/Header";
import TopNav from "./TopNav/TopNav";
import Footer from "./Footer/Footer";


const DefaultLayout = ( {children}) => {
    console.log("Default Layout", children);
    useEffect(() => {
        if (children.type.name === "Phonedetail") {
            document.title = 'Phonedetail';
        }
        if (children.type.name === "Member"){
            document.title = 'Trang cá nhân';
        }
        if (children.type.name === "Favourites"){
            document.title = 'Điện thoại yêu thích';
        }
        if (children.type.name === "OrderManagement"){
            document.title = 'Quản lý đơn hàng';
        }
        if (children.type.name === "Tintuc"){
            document.title = 'Tin tức';
        }
        if (children.type.name === "Gioithieu"){
            document.title = 'Giới thiệu';
        }
        if (children.type.name === "Baohanh"){
            document.title = 'Trung tâm bảo hành';
        }
        if (children.type.name === "Lienhe"){
            document.title = 'Liên hệ';
        }
    }, [children]);
    return ( 
        <div>
            <TopNav/>
            <section>
            <Header/>
                <div className="container">
                    <div className="contentcus">{children}</div>
                </div>
            <Footer/>
            </section>
        </div> 
        );
}
 
export default DefaultLayout;