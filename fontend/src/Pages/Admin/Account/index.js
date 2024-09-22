import React, { useEffect, useState } from 'react';



import { Layout, Input, Button, Table,theme,Modal, Pagination} from 'antd';
import { LeftOutlined, RetweetOutlined, RightOutlined } from '@ant-design/icons';
import { Link, useNavigate} from 'react-router-dom';
import axiosClient from '../../../Components/Other/axiosClient';
import DeleteModal from '../../../Components/Other/DeleteModal';

const { Content } = Layout;

const Account = () => {
  const { colorBgContainer, borderRadiusLG } = theme.useToken();
  const [Users, setUsers] =useState([]);
  const [selectedUsers, setSelectedUsers] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [Refresh,setRefresh] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    address: '',
    email: '',
    phoneNumber: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); 

  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize,Refresh]);

  const fetchData = () => {
    axiosClient
      .get(`/Users/getUser`)
      .then(res => {
        setUsers(res.data);
      })
      .catch(error => console.error('Error fetching product types:', error));
  };
  
  const handleShowDelete = (id) => {
    setSelectedUsers(Users.find(a => a.id === id));
    setShowDelete(true);
    console.log('select',selectedUsers );
}
const handleCloseDelete = () => setShowDelete(false);

  const handleDelete = () => {
    
    axiosClient.delete(`/Users/${selectedUsers.id}`)
    .then(() => {
      // cập nhật lại dữ liệu sao khi xóa
      const updatedUser = Users.filter(item => item.id !== selectedUsers.id);
      setUsers(updatedUser);
      setShowDelete(false);
    })
    .catch(error => {
      console.error('Error deleting product type:', error);
      // Xử lý lỗi nếu cần
    });
  
    setShowDelete(false);
}
const handleEdit =(id) =>
{
  navigate(`/admin/account/edit/${id}`);
}
  const columns = [
    {
      title: 'STT',
      render:(text,record, index) =>index +1,
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      className: 'address-column'
     
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      className: 'phone-column'
     
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      className: 'email-column'
     
    },
    
    
    {
      title: 'Chức năng',
      dataIndex: 'actions',
      key: 'actions', 
      render: (text, record) => (
        <>
       
        <Button type="default" style={{ backgroundColor: 'gold', borderColor: 'gold', color: '#fff', marginRight:'5px', textAlign:'center' }}
         onClick={() => handleEdit(record.id)}>
        Cập nhật
      </Button>

    
        </>
       
      ),
    },
  ];
  const handleSearch = () => {

   
      axiosClient.get(`/Users/search?userName=${valueSearch}`)
      .then(res=> {setUsers(res.data);
      })
      .catch(error =>{
        console.log('Error',error);
      })
  };
  const hanldeRefresh = () => {
    setRefresh(!Refresh);
  }
  

 

  const totalPages = Math.ceil(Users.length / pageSize); // Tính toán tổng số trang

  const paginatedData = Users.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
    console.log('users', Users);

  return (
   
   

    <Content
    style={{
      margin: '24px 16px',
      padding: 24,
      minHeight: 280,
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
    }}
  >
    <div>
      <div className="logo">
        <h1>Quản Lý Người Dùng</h1>
      </div>
      <nav>
        <ul>
          <li className='fs16'>
            <a href="/admin" className="home-link">
              Trang chủ
            </a>
          </li>
        </ul>
      </nav>
      </div>
    <section className="content">
      <div className="bottom-actions">
        <div className="search">
          <Input 
          placeholder="Tên đăng nhập ... " 
          value={valueSearch}
          onChange={e => setValueSearch(e.target.value)}/>
          
          <Button type="primary"  onClick={handleSearch}  style={{marginRight:'10px'}}>Tìm</Button>

          
        </div>
        <div className='refresh'>
        <Button type='primary'   onClick={hanldeRefresh} >{<RetweetOutlined />} Làm mới</Button>
        </div>
        <div className="add-button " >
        <Link to='/admin/account/add'>
          <Button className='fs16' type="primary">Thêm mới</Button>
        </Link>
        
        </div>
      </div>

      <Table dataSource={paginatedData} columns={columns}  pagination={false}/>
      <div className='pagination' style={{ textAlign: 'center', marginTop: '16px' }}>
        <Button onClick={handlePrevPage} disabled={currentPage === 1} icon={<LeftOutlined />} />
          {Array.from({ length: totalPages }, (_, index) => (
            <Button className={`btn-pagination ${currentPage === index+1  ? 'current-page' :''}`} key={index + 1} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            
            </Button>
          ))}
          <Button onClick={handleNextPage} disabled={currentPage === totalPages} icon={<RightOutlined />} />
        </div>
    </section>
    
  

<DeleteModal
visible = {showDelete}
handleCancel = {handleCloseDelete}
handleDelete = {handleDelete}
name = {selectedUsers.name}
/>
   
  </Content>
  

  );
};

export default Account;
