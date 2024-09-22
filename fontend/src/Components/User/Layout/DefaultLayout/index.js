import { useEffect } from 'react';
import Header from "./Header/Header";
import TopNav from "./TopNav/TopNav";
import Banner from "./Banner/Banner";
import CompanyMenu from "./CompanyMenu/CompanyMenu";
import Footer from "./Footer/Footer";

const DefaultLayout = ( {children}) => {
    useEffect(() => {
        if (children.type.name === "HomePage") {
            document.title = 'Trang chủ';
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