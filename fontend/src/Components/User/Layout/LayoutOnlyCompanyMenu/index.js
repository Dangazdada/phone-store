import Header from "./Header/Header";
import TopNav from "./TopNav/TopNav";
import CompanyMenu from "./CompanyMenu/CompanyMenu";
import Footer from "./Footer/Footer";

const DefaultLayout = ( {children}) => {
    return ( 
        <div>
            <TopNav/>
            <section>
            <Header/>
            <CompanyMenu/>
                <div className="container">
                    <div className="contentcus">{children}</div>
                </div>
            <Footer/>
            </section>
        </div> 
        );
}
 
export default DefaultLayout;