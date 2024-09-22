

import './Dashboard.css';
import React, { useEffect, useState } from 'react';
import axiosClient from "../../../Other/axiosClient";
import { jwtDecode } from "jwt-decode";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    DownOutlined,
    ShopOutlined,
    CalendarOutlined,
    PoweroffOutlined,
    CommentOutlined,
    ContainerOutlined,
    LikeOutlined,
    CarOutlined,
    BarChartOutlined,
  } from '@ant-design/icons';
  import { Avatar, Button, Col, Layout, Menu, Row, theme,  Dropdown, message, Space  } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
  const { Header, Sider, Content } = Layout;

  




const DefaultLayoutAdmin = ({children}) => {
  



const naviagate = useNavigate();
  // const { isLoggedIn, username, isAdmin, userId, LastName,FirtName } = useAuth();
  const [AccountName,setAccountName] = useState([]);
  const [LastName, setLastName ] = useState('');
  const [FirtName, setFirtName ] = useState('');

  useEffect(()=> {
    // cập nhật title cho các trang quản lý sản phẩm
    if(children.type.name === "Product"){
      document.title = "Quản lý sản phẩm";}
      if(children.type.name === "ProductAdd"){
        document.title = "Thêm sản phẩm";
      }
      if(children.type.name === "ProductEdit"){
        document.title = "Cập nhật sản phẩm";
      }
      if(children.type.name === "ProductDetailAdd"){
        document.title = "Thêm chi tiết sản phẩm";
      }
      if(children.type.name === "ProductDetailEdit"){
        document.title = "Cập nhật chi tiết sản phẩm";
      }
      if(children.type.name === "SpecificationAddSpecification"){
        document.title = "Thêm thông số lỹ thuật";
      }
      if(children.type.name === "ProductEditSpecifications"){
        document.title = "Cập nhật thông số lỹ thuật";
      }
    // cập nhật title cho các trang quản lý nhà cung cấp
    if(children.type.name === "Supplier"){
      document.title = "Quản lý nhà cung cấp";
      }
        if(children.type.name === "SupplierAdd"){
          document.title = "Thêm nhà cung cấp";
        }
        if(children.type.name === "SupplierEdit"){
          document.title = "Cập nhật thông tin nhà cung cấp";
        }

      // cập nhật title cho các trang quản lý nhà sản xuất
    if(children.type.name === "Manufacturer"){
      document.title = "Quản lý nhà sản xuất";
      }
        if(children.type.name === "ManufacturerAdd"){
          document.title = "Thêm nhà sản xuất";
        }
        if(children.type.name === "ManufacturerEdit"){
          document.title = "Cập nhật thông tin nhà sản xuất";
        }

    // cập nhật title cho các trang quản lý loại sản phẩm
    if(children.type.name === "ProductType"){
    document.title = "Quản lý loại sản phẩm";
    }
      if(children.type.name === "ProductTypeAdd"){
        document.title = "Thêm loại sản phẩm";
      }
      if(children.type.name === "ProductTypeEdit"){
        document.title = "Cập nhật thông tin loại sản phẩm";
      }
    
    // cập nhật title cho các trang quản lý khuyến mãi
    if(children.type.name === "Promotion"){
      document.title = "Danh sách khuyến mãi của sản phẩm";
      }
        if(children.type.name === "PromotionAdd"){
          document.title = "Thêm khuyến mãi";
        }
        if(children.type.name === "PromotionEdit"){
          document.title = "Cập nhật khuyến mãi";
        }
    
      // cập nhật title cho  trang quản lý đánh giá
      if(children.type.name === "Rating"){
        document.title = "Quản lý đánh giá";
        }
      
      // cập nhật title cho các trang quản lý thống kê
    if(children.type.name === "Revenue"){
      document.title = "Danh mục thống kê";
      }
        if(children.type.name === "DailyRevenue"){
          document.title = "Thống kê doanh thu theo ngày";
        }
        if(children.type.name === "MonthRevenue"){
          document.title = "Thống kê doanh thu theo tháng";
        }
         
     // cập nhật title cho các trang quản lý bài viết
     if(children.type.name === "Cmsitem"){
      document.title = "Quản lý bài viết";
      }
        if(children.type.name === "CmsitemAdd"){
          document.title = "Thêm bài viết";
        }
        if(children.type.name === "CmsitemEdit"){
          document.title = "Cập nhật bài viết";
        }
        
     // cập nhật title cho các trang quản lý đơn hàng
     if(children.type.name === "Invoice"){
      document.title = "Quản lý đơn hàng";
      }
        if(children.type.name === "InvoiceAdminEdit"){
          document.title = "Cập nhật thông tin đơn hàng";
        }

    // cập nhật title cho các trang quản lý người dùng
    if(children.type.name === "Account"){
      document.title = "Quản lý tài khoản";
      }
        if(children.type.name === "AccountAdd"){
          document.title = "Thêm tài khoản";
        }
        if(children.type.name === "AccountEdit"){
          document.title = "Cập nhật thông tin tài khoản";
        }
       

  },[children])
  const capitalizeEachWord = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('tokenadmin');
        const response = await axiosClient.get(`/Users`);
        const fetchedAccount = response.data;
        console.log("oke",fetchedAccount);
        if (token) {
          const decodedToken = jwtDecode(token);
          const selectedAcc = fetchedAccount.find(a => a.userName === decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);

  
          // Kiểm tra xem selectedAcc có tồn tại trước khi gọi setUserId
          if (selectedAcc) {
            setLastName(capitalizeEachWord(selectedAcc.lastName));
            setFirtName(capitalizeEachWord(selectedAcc.firstName));
            //console.log(selectedAcc);
            // Update state with additional data
            
          }
        } else {
          setLastName('');
          setFirtName('');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };
  
    fetchData();
  
  }, []);

    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { SubMenu } = Menu;
    const hanldeShowInfo = () => {
      alert('Code tiếp đi nhen!!!')
    };

    const handleLogout = () =>{
     
      localStorage.removeItem('tokenadmin');
      naviagate('/');
      console.log('ok');

      
    };

    const onClick = ({ key }) => {
      switch(key) {
        case '1':
          hanldeShowInfo();
          break;
        case '2': 
        handleLogout();
        break;
        default:
          console.log('error');
      }
    };
    const items = [
      {
        label: 'Thông tin người dùng',
        key: '1',
      },
     
      {
       
        label: 'Đăng xuất',
        key: '2',
        icon: <PoweroffOutlined />
      },
    ];

    console.log("Default Layout", children);
    return (
        <>
        <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <SubMenu key="sub1" icon={<ShopOutlined />} title="Quản lý sản phẩm">
          <Menu.Item key="1" >
            <Link to="/admin">Sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="2"  >
          <Link to="/admin/productType">Loại sản phẩm</Link>
        </Menu.Item>
       
       
        </SubMenu>
        <Menu.Item key="4" icon={<UserOutlined />} >
          <Link to="/admin/account">Quản lý người dùng</Link>
        </Menu.Item>
     
          <Menu.Item key="5" icon={<CalendarOutlined />} >
            <Link to="/admin/cmsitem">Quản lý bài viết</Link>
          </Menu.Item>
        
 
        <Menu.Item key="7" icon={<ContainerOutlined />}>
          <Link to="/admin/invoice">Quản lý đơn hàng</Link>
        </Menu.Item>
       {/* <Menu.Item key="8" icon={<CommentOutlined />}>
          <Link to="">Quản lý bình luận</Link>
        </Menu.Item>*/ }
        <Menu.Item key="9" icon={<LikeOutlined />}>
          <Link to="/admin/rating">Quản lý đánh giá</Link>
        </Menu.Item>
        <SubMenu key="sub3" icon={<CarOutlined />} title="Cung cấp">
          <Menu.Item key="10">
            <Link to="/admin/supplier">Quản nhà cung cấp</Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link to="/admin/manufacturers">Quản lý nhà sản xuất</Link>
          </Menu.Item>
        </SubMenu>
          <Menu.Item icon={<BarChartOutlined />} key="12">
            <Link to="/admin/revenue">Danh mục thống kê</Link>
          </Menu.Item>
         
        
      </Menu>
      </Sider>
        <Layout>
        
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
          <Row >
            <Col md={2}>
            <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              marginTop:17,
            }}
          />
 
            
            
         
            </Col>
            <Col md={16}>
            <img src='/logo.png' alt=''style={{width:'110px',marginTop:'8px' }}/>
            </Col>
            <Col md={6}>
              <div className='btn-avatar'>
              <Dropdown
              menu={{
                items,
                onClick,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                <Avatar size='default'
                icon={<UserOutlined/>}>
            </Avatar> 
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
           
            <span className="admin-text">{LastName} {FirtName}</span>
              </div>
              
            </Col>
        </Row>
  
      
          </Header>
          
          {children}
        
        </Layout>
      </Layout>
        </>
     );
}
 
export default DefaultLayoutAdmin;