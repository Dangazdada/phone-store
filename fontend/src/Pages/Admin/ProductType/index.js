import React, { useEffect, useState } from 'react';



import { Layout, Input, Button, Table,theme,Modal, Pagination} from 'antd';
import { LeftOutlined, RetweetOutlined, RightOutlined } from '@ant-design/icons';
import { Link, useNavigate} from 'react-router-dom';
import axiosClient from '../../../Components/Other/axiosClient';
import DeleteModal from '../../../Components/Other/DeleteModal';

const { Content } = Layout;

const ProductType = () => {
  const { colorBgContainer, borderRadiusLG } = theme.useToken();
  const [productType, setProductType] =useState([]);
  const [selectedProductType, setSelectedProductType] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); 
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const fetchData = () => {
    axiosClient
      .get(`/ProductTypes`)
      .then(res => {
        setProductType(res.data);
      })
      .catch(error => console.error('Error fetching product types:', error));
  };
  
  const handleShowDelete = (id) => {
    setSelectedProductType(productType.find(a => a.id === id));
    setShowDelete(true);
    console.log('select',selectedProductType );
}
const handleCloseDelete = () => setShowDelete(false);

  const handleDelete = () => {
    
    axiosClient.delete(`/ProductTypes/${selectedProductType.id}`)
    .then(() => {
      // cập nhật lại dữ liệu sao khi xóa
      const updatedProductType = productType.filter(item => item.id !== selectedProductType.id);
      setProductType(updatedProductType);
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
  navigate(`/admin/producttype/edit/${id}`);
}
  const columns = [
    {
      title: 'STT',
      render:(text,record, index) =>index +1,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      className: 'description-column'
     
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

   
      axiosClient.get(`ProductTypes/search?Name=${valueSearch}`)
      .then(res=> {setProductType(res.data);
      })
      .catch(error =>{
        console.log('Error',error);
      })
  };
  const totalPages = Math.ceil(productType.length / pageSize); // Tính toán tổng số trang

  const paginatedData = productType.slice((currentPage - 1) * pageSize, currentPage * pageSize);
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
        <h1>Quản lý loại sản phẩm</h1>
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
          placeholder="Nhập tên loại..." 
          value={valueSearch}
          onChange={e => setValueSearch(e.target.value)}/>
          
          <Button type="primary"  onClick={handleSearch} >Tìm</Button>
        </div>
        <div className='refresh'>
        <Button type='primary'   onClick={() => window.location.reload()} >{<RetweetOutlined />} Làm mới</Button>
        </div>
        <div className="add-button " >
        <Link to='/admin/producttype/add'>
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
name = {selectedProductType.name}
/>
   
    </Content>
  

  );
};

export default ProductType;
