import React, { useEffect, useState } from 'react';



import { Layout, Input, Button, Table,theme,Modal, Pagination} from 'antd';
import { LeftOutlined, RetweetOutlined, RightOutlined } from '@ant-design/icons';
import { Link, useNavigate} from 'react-router-dom';
import axiosClient from '../../../Components/Other/axiosClient';
import DeleteModal from '../../../Components/Other/DeleteModal';
import ExportToExcel from '../Tools/ExportToExcel';

const { Content } = Layout;

const Manufacturer = () => {
  const { colorBgContainer, borderRadiusLG } = theme.useToken();
  const [Manufacturer, setManufacturer] =useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [Refresh, setRefresh] = useState(false);
  const [ManufacturerData, setManufacturerData] = useState({});

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
  }, [currentPage, pageSize, Refresh]);

  const fetchData = () => {
    axiosClient
      .get(`/Manufacturers`)
      .then(res => {
        setManufacturer(res.data);
        const data = res.data.map(item =>({
          'Tên nhà sản xuất':item.name,
          'Số điện thoại': item.phone,
          'Email': item.email,
          'Địa chỉ': item.address
        }));
        setManufacturerData(data);
      })
      .catch(error => console.error('Error fetching product types:', error));
  };
  const handleExport = () => {
    // Đặt tên file và sheet theo nhu cầu của bạn
    const fileName = 'my_data';
    const sheetName = 'Danh sách nhà sản xuất';

    return <ExportToExcel data={ManufacturerData} fileName={fileName} sheetName={sheetName} />;
  };

  
  const handleShowDelete = (id) => {
    setSelectedManufacturer(Manufacturer.find(a => a.id === id));
    setShowDelete(true);
    console.log('select',selectedManufacturer );
}
const handleCloseDelete = () => setShowDelete(false);

  const handleDelete = () => {
    
    axiosClient.delete(`/Manufacturers/${selectedManufacturer.id}`)
    .then(() => {
      // cập nhật lại dữ liệu sao khi xóa
      const updatedProductType = Manufacturer.filter(item => item.id !== selectedManufacturer.id);
      setManufacturer(updatedProductType);
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
  navigate(`/admin/manufacturers/edit/${id}`);
}
  const columns = [
    {
      title: 'STT',
      render:(text,record, index) =>index +1,
    },
    {
      title: 'Tên nhà sản xuất',
      dataIndex: 'name',
      key: 'name',
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
        Sửa
      </Button>

      <Button type='primary' danger   onClick={() => handleShowDelete(record.id)} className='fs16'>
      Xóa
      </Button>
       
        </>
       
      ),
    },
  ];
  const handleSearch = () => {

   
      axiosClient.get(`Manufacturers/search?Name=${valueSearch}`)
      .then(res=> {setManufacturer(res.data);
      })
      .catch(error =>{
        console.log('Error',error);
      })
  };
  const handleInputChange = (field, value) => {
    setSearchCriteria(prevCriteria => ({
      ...prevCriteria,
      [field]: value
    }));
  };
 const handleAdvenceSearch = () => {
  const searchCriteriaData  = {
    Name:searchCriteria.name,
    address: searchCriteria.address,
    email:searchCriteria.email,
    phoneNumber: searchCriteria.phoneNumber
  }
  const searchvalueParams = Object.keys(searchCriteriaData) .map ( key => `${key}=${encodeURIComponent(searchCriteriaData[key])}`)
  .join('&');
  axiosClient.get(`/Manufacturers/searchs?${searchvalueParams}`)
  .then(res=> {setManufacturer(res.data)});
  console.log('â', searchCriteriaData);
  setModalVisible(false)
  };
  
  

  const handleReset = () => {
    setSearchCriteria({
      name: '',
      address: '',
      email: '',
      phoneNumber: ''
    });
  };

  const totalPages = Math.ceil(Manufacturer.length / pageSize); // Tính toán tổng số trang

  const paginatedData = Manufacturer.slice((currentPage - 1) * pageSize, currentPage * pageSize);
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
        <h1>Quản Lý Nhà Sản Xuất</h1>
      </div>
      <nav>
        <ul style={{display:'flex'}}>
          <li className='fs16'>
            <a href="/admin" className="home-link">
              Trang chủ
            </a>
          </li>
          <li className='fs16' style={{marginLeft:'auto', marginRight:'10px'}}>
          {handleExport()}
          </li>
        </ul>
      </nav>
      </div>
    <section className="content">
      <div className="bottom-actions">
        <div className="search">
          <Input 
          placeholder="Nhập tên loại..." 
          value={valueSearch}
          onChange={e => setValueSearch(e.target.value)}/>
          
          <Button type="primary"  onClick={handleSearch}  style={{marginRight:'10px'}}>Tìm</Button>

          <Button type="primary" onClick={() => setModalVisible(true)}>Tìm kiếm nâng cao</Button>
        </div>
        <div className='refresh'>
        <Button type='primary'   onClick={() => setRefresh(!Refresh)} >{<RetweetOutlined />} Làm mới</Button>
        </div>
        <div className="add-button " >
        <Link to='/admin/manufacturers/add'>
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
    
  <Modal
  title="Tìm kiếm nâng cao"
  visible={modalVisible}
  onCancel={() => setModalVisible(false)}
  footer={[
    <Button key="reset" onClick={handleReset}>
      Reset
    </Button>,
    <Button key="back" onClick={() => setModalVisible(false)}>
      Đóng
    </Button>,
    <Button key="submit" type="primary" onClick={handleAdvenceSearch}>
      Tìm
    </Button>,
  ]}
>
<label htmlFor="name">Tên nhà sản xuất</label>
  <Input
    placeholder="Tên nhà sản xuất"
    value={searchCriteria.name}
    onChange={e => handleInputChange('name', e.target.value)}
    allowClear
    className='input-advencesearch'
  />
<br />
<label htmlFor="address">Địa chỉ</label>
  <Input
    placeholder="Tên địa chỉ"
    value={searchCriteria.address}
    onChange={e => handleInputChange('address', e.target.value)}
    allowClear
    className='input-advencesearch'
  />
  
 <br/>
 
  <label htmlFor="email">Email</label>
  <Input
    placeholder="Email"
    value={searchCriteria.email}
    onChange={e => handleInputChange('email', e.target.value)}
    allowClear
    className='input-advencesearch'
  />
  <br/>
  <label htmlFor="phoneNumber">Số điện thoại</label>
  <Input
    placeholder="Số điện thoại"
    value={searchCriteria.phoneNumber}
    onChange={e => handleInputChange('phoneNumber', e.target.value)}
    allowClear
    className='input-advencesearch'
  />
 
</Modal>

<DeleteModal
visible = {showDelete}
handleCancel = {handleCloseDelete}
handleDelete = {handleDelete}
name = {selectedManufacturer.name}
/>
   
  </Content>
  

  );
};

export default Manufacturer;
