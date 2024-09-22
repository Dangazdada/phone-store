//Layouts 
import { LayoutOnlyHeader, LayoutOnlyHeaderFooter } from "../Components/User/Layout/Index";
//layouts admin
import { DefaultLayoutAdmin, LayoutNull } from "../Components/Admin/LayoutAdmin";
//page admin
import AccessStatistics from "../Pages/Admin/Statistics/AccessStatistics";
import Account from "../Pages/Admin/Account/index";
import AccountAdd from "../Pages/Admin/Account/add";
import AccountEdit from "../Pages/Admin/Account/edit";

import Cmsitem from "../Pages/Admin/Cmsitem/index";
import CmsitemAdd from "../Pages/Admin/Cmsitem/add";
import CmsitemEdit from "../Pages/Admin/Cmsitem/edit";

import DailyRevenue from "../Pages/Admin/Statistics/DailyRevenue";
import MothRevenue from "../Pages/Admin/Statistics/MonthRevenue";
import YearRevenue from "../Pages/Admin/Statistics/YearRevenue";

import Manufacturer from "../Pages/Admin/Manufacturer/index";
import ManufacturerAdd from "../Pages/Admin/Manufacturer/add";
import ManufacturerEdit from "../Pages/Admin/Manufacturer/edit";

import InvoiceAdmin from "../Pages/Admin/Invoice/index";
import InvoiceAdminEdit from "../Pages/Admin/Invoice/edit";

import Revenue from "../Pages/Admin/Statistics/index";
import Rating from "../Pages/Admin/Rating/Rating";
import ProductStatistics from "../Pages/Admin/Statistics/ProductStatistics";

import ProductAdmin from "../Pages/Admin/ProductAdmin/Product";
import ProductAdd from "../Pages/Admin/ProductAdmin/add";
import ProductEdit from "../Pages/Admin/ProductAdmin/edit";

import ProductDetailAdd from "../Pages/Admin/ProductAdmin/addDetail";
import ProductDetailEdit from "../Pages/Admin/ProductAdmin/editDetail";

import ProductAddSpecification from "../Pages/Admin/ProductAdmin/addSpecifications";
import ProductEditSpecifications from "../Pages/Admin/ProductAdmin/editSpecifications";


import ProductTye from "../Pages/Admin/ProductType/index";
import ProductTyeAdd from "../Pages/Admin/ProductType/add";
import ProductTyeEdit from "../Pages/Admin/ProductType/edit";

import Promotion from "../Pages/Admin/Promotion/index";
import PromotionAdd from "../Pages/Admin/Promotion/add";
import PromotionEdit from "../Pages/Admin/Promotion/edit";


import Supplier from "../Pages/Admin/Supplier/index";
import SupplierAdd from "../Pages/Admin/Supplier/add";
import SupplierEdit from "../Pages/Admin/Supplier/edit";
import LoginAdmin from  "../Pages/Admin/Login/Login";




//page user
import Cart from "../Pages/User/Carts/Cart";
import Home from "../Pages/User/Homepage/HomePage";
import Order from "../Pages/User/OrderPage/OrderPage";
import Orther from "../Pages/User/Orther/index";
import Register from "../Pages/User/Login/Register";
import Login from "../Pages/User/Login/Login";
import Tintuc from "../Pages/User/Tintuc/Tintuc";
import Gioithieu from "../Pages/User/Gioithieu/Goithieu";
import Baohanh from "../Pages/User/Trungtambaohanh/Baohanh";
import Lienhe from "../Pages/User/Lienhe/Lienhe";
import Phonedetail from "../Pages/User/Phonedetail/Phonedetail";
import Member from "../Pages/User/member/Account";
import Pay from "../Pages/User/Pay/Pay";
import Favourites from "../Pages/User/Favourite/Favourites";
import OrderManagement from "../Pages/User/OrderManagement/oderManagement";





 export const routes  = [
    {path:'/',page: Home},

    {path:'/Phonedetail/:id',page: Phonedetail, layout:LayoutOnlyHeaderFooter},
    
    { path:'/Login',page: Login, layout:LayoutOnlyHeader },

    { path:'/Login/Register',page: Register, layout:LayoutOnlyHeader },

    { path:'/member',page : Member,  layout:LayoutOnlyHeaderFooter },
    
    { path:'/Favourites', page : Favourites, layout:LayoutOnlyHeaderFooter},

    { path:'/OrderManagement', page : OrderManagement, layout:LayoutOnlyHeaderFooter},

    { path:'/tin-tuc',page: Tintuc, layout:LayoutOnlyHeaderFooter },

    { path:'/gioi-thieu',page: Gioithieu, layout:LayoutOnlyHeaderFooter },

    { path:'/trung-tam-bao-hanh',page: Baohanh, layout:LayoutOnlyHeaderFooter },

    { path:'/lien-he',page: Lienhe, layout:LayoutOnlyHeaderFooter },

    { path:'/cart', page: Cart, layout:LayoutOnlyHeader },

    { path:'/order', page: Order, layout:LayoutOnlyHeader },

    { path:'/pay', page: Pay, layout:LayoutOnlyHeader },










    

    {path:'/admin', page:ProductAdmin, layout:DefaultLayoutAdmin },

    {path:'/admin/account',page:Account , layout:DefaultLayoutAdmin},

    {path:'/admin/account/add',page:AccountAdd , layout:DefaultLayoutAdmin},

    {path:'/admin/account/edit/:id',page:AccountEdit , layout:DefaultLayoutAdmin},

    {path:'/admin/accessstatistics',page:AccessStatistics , layout:DefaultLayoutAdmin},

    {path:'/admin/cmsitem',page:Cmsitem , layout:DefaultLayoutAdmin},

    {path:'/admin/cmsitem/add',page:CmsitemAdd , layout:DefaultLayoutAdmin},

    {path:'/admin/cmsitem/edit/:id',page:CmsitemEdit , layout:DefaultLayoutAdmin},

    {path:'/admin/dailyrevenue',page:DailyRevenue , layout:DefaultLayoutAdmin},

    {path:'/admin/mothrevenue',page:MothRevenue , layout:DefaultLayoutAdmin},

    {path:'/admin/yearrevenue',page:YearRevenue , layout:DefaultLayoutAdmin},

    {path:'/admin/manufacturers',page:Manufacturer , layout:DefaultLayoutAdmin},   

    {path:'/admin/manufacturers/add',page:ManufacturerAdd , layout:DefaultLayoutAdmin},

    {path:'/admin/manufacturers/edit/:id',page:ManufacturerEdit , layout:DefaultLayoutAdmin},

    {path:'/admin/invoice',page:InvoiceAdmin , layout:DefaultLayoutAdmin},   

    {path:'/admin/invoice/edit/:id',page:InvoiceAdminEdit , layout:DefaultLayoutAdmin},

    {path:'/admin/revenue',page:Revenue , layout:DefaultLayoutAdmin},

    {path:'/admin/rating',page:Rating , layout:DefaultLayoutAdmin},

    {path:'/admin/productstatistics',page:ProductStatistics , layout:DefaultLayoutAdmin},

    {path:'/admin/product/add', page:ProductAdd, layout:DefaultLayoutAdmin },

    {path:'/admin/productdetail/add/:id', page:ProductDetailAdd, layout:DefaultLayoutAdmin },

    {path:'/admin/productdetail/edit/:id', page:ProductDetailEdit, layout:DefaultLayoutAdmin },

    {path:'/admin/product/addspecification/:id', page:ProductAddSpecification, layout:DefaultLayoutAdmin },

    {path:'/admin/product/edit/:id', page:ProductEdit, layout:DefaultLayoutAdmin },

    {path:'/admin/product/editspecification/:id', page:ProductEditSpecifications, layout:DefaultLayoutAdmin },

    {path:'/admin/producttype',page:ProductTye , layout:DefaultLayoutAdmin},   

    {path:'/admin/producttype/add',page:ProductTyeAdd , layout:DefaultLayoutAdmin},

    {path:'/admin/producttype/edit/:id',page:ProductTyeEdit , layout:DefaultLayoutAdmin},

    {path:'/admin/promotion/:id',page:Promotion , layout:DefaultLayoutAdmin},

    {path:'/admin/promotion/add/:id',page:PromotionAdd , layout:DefaultLayoutAdmin},

    {path:'/admin/promotion/edit/:id',page:PromotionEdit , layout:DefaultLayoutAdmin},
    
    {path:'/admin/supplier',page:Supplier , layout:DefaultLayoutAdmin},   

    {path:'/admin/supplier/add',page:SupplierAdd , layout:DefaultLayoutAdmin},

    {path:'/admin/supplier/edit/:id',page:SupplierEdit , layout:DefaultLayoutAdmin},

    {path:'/admin/login', page:LoginAdmin, layout:LayoutNull },


    

]