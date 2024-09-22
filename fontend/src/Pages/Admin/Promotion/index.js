
import React, { useEffect, useState } from 'react';
import { Layout, Input, Button, Table,theme,Modal, Pagination} from 'antd';
import { LeftOutlined, PlusOutlined, RetweetOutlined, RightOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams} from 'react-router-dom';
import axiosClient from '../../../Components/Other/axiosClient';
import DeleteModal from '../../../Components/Other/DeleteModal';
import { render } from '@testing-library/react';

const { Content } = Layout;

const Promotion = () => {
    
    const {id} =useParams();

    const { colorBgContainer, borderRadiusLG } = theme.useToken();
    const [Promotions, setPromotions] =useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState({});
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
        .get(`/Promotions/${id}/byproduct`)
        .then(res => {
            
          setPromotions(res.data);
        })
        .catch(error => console.error('Error fetching product types:', error));
    };
    
    const handleShowDelete = (id) => {
      setSelectedPromotion(Promotions.find(a => a.promotionId === id));
      setShowDelete(true);
      console.log('select',selectedPromotion );
  }
  const handleCloseDelete = () => setShowDelete(false);
  
    const handleDelete = () => {
      
      axiosClient.delete(`/Promotions/${selectedPromotion.promotionId}`)
      .then(() => {
        // cập nhật lại dữ liệu sao khi xóa
        const updatedPromotions = Promotions.filter(item => item.promotionId !== selectedPromotion.promotionId);
        setPromotions(updatedPromotions);
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
    navigate(`/admin/promotion/edit/${id}`);
  }
    const columns = [
      {
        title: 'STT',
        render:(text,record, index) =>index +1,
      },
      {
        title: 'Loại khuyến mãi',
        dataIndex: 'promotionType',
        key: 'promotionType',
        render: (promotionType) => (
            promotionType === 'giamgiaphantram' ? 'Giảm theo phần trăm' : 'Giảm theo giá trị'
          )
      },
      {
        title: 'Mô tả',
        dataIndex: 'desciption',
        key: 'desciption',
        className: 'description-column'
       
      },
      {
        title: 'Giá trị khuyến mãi',
        dataIndex: 'value',
        key: 'value', 
        render: (value, record) => (
            record.promotionType === 'giamgiaphantram' ? `${value}%` : value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
          )
      },
      {
        title: 'Ngày bắt đầu',
        dataIndex: 'startDate',
        key: 'startDate',
        render : (startDate) =>(startDate ? new Date(startDate).toLocaleDateString(): 'Chưa có dữ liệu')
       
      },
      {
        title: 'MNgày kết thúc',
        dataIndex: 'endDate',
        key: 'endDate',
        render:  (endDate) => ( endDate ? new Date(endDate).toLocaleDateString() :'Chưa có dữ liệu')
       
      },
      {
        title: 'Chức năng',
        dataIndex: 'actions',
        key: 'actions', 
        render: (text, record) => (
          <>
         
          <Button type="default" style={{ backgroundColor: 'gold', borderColor: 'gold', color: '#fff', marginRight:'5px', textAlign:'center' }}
           onClick={() => handleEdit(record.promotionId)}>
          Sửa
        </Button>
  
        <Button type='primary' danger   onClick={() => handleShowDelete(record.promotionId)} className='fs16'>
        Xóa
        </Button>
         
          </>
         
        ),
      },
    ];
   
    const totalPages = Math.ceil(Promotions.length / pageSize); // Tính toán tổng số trang
  
    const paginatedData = Promotions.slice((currentPage - 1) * pageSize, currentPage * pageSize);
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
    
console.log('Promotions', Promotions);
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
        <h1>Quản Lý Khuyến Mãi Của Sản Phẩm</h1>
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

        <div className='refresh'  style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <Button type='primary'   onClick={() => window.location.reload()} >{<RetweetOutlined />} Làm mới</Button>
        </div>

        <div className="add-button " >
            <Link to={`/admin/promotion/add/${id}`}>
                <Button className='fs16' type="primary"> <PlusOutlined />Thêm mới</Button>
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
        name = {Promotions.name}
    />
   
    </Content>
    );
}
 
export default Promotion;