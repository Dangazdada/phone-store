import React, { useEffect, useState } from 'react';



import { Layout, Input, Button, Table,theme,Modal, Pagination, Select} from 'antd';
import { LeftOutlined, RetweetOutlined, RightOutlined } from '@ant-design/icons';
import { Link, useNavigate} from 'react-router-dom';
import axiosClient from '../../../Components/Other/axiosClient';
import DeleteModal from '../../../Components/Other/DeleteModal';

const { Content } = Layout;
const { Option } = Select;

const Rating = () => {
    const navigate = useNavigate();
    const { colorBgContainer, borderRadiusLG } = theme.useToken();
    const [Rating, setRating] =useState([]);
    const [selectedRating, setSelectedRating] = useState({});
    const [showDelete, setShowDelete] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); 
    const [Refresh, setRefresh] = useState(true); 


  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, Refresh]);

  const fetchData = () => {
    axiosClient
      .get(`/Ratings/admin`)
      .then(res => {
        setRating(res.data);
      })
      .catch(error => console.error('Error fetching product types:', error));
  };
  
  const handleShowDelete = (id) => {

    setSelectedRating(Rating.find(a => a.id === id));
    setShowDelete(true);
    console.log('select',selectedRating );

    };

    const handleCloseDelete = () => setShowDelete(false);

  const handleDelete = () => {
    
        axiosClient.put(`/Ratings/${selectedRating.id}/DeleteContent`)
        .then(() => {
        // cập nhật lại dữ liệu sao khi xóa
        
        setShowDelete(false);
        })
        .catch(error => {
        console.error('Error deleting product type:', error);
        // Xử lý lỗi nếu cần
        });
    
        setShowDelete(false);
  };

    const handleApproval =(id) =>
    {
        axiosClient.put(`/Ratings/${id}/admin`)
        .then(res => {
            console.log('Success Approval process', res.data);
        })
        .catch(error => {
            console.log('Error Approval process', error.data);
        });
    };

  const columns = [
    {
      title: 'STT',
      render:(text,record, index) =>index +1,
    },
    {
        title: 'Tên người dùng',
        dataIndex: ['user', 'firstName'], // Đường dẫn đến firstName của user
        key: 'firstName',
        render: (firstName, record) => `${firstName} ${record.user.lastName}`,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productDetail',
      key: 'review',
      render: (productDetail) => productDetail.productName

     
    },
    {
      title: 'Nội dung',
      dataIndex: 'review',
      key: 'review',

     
    },
    {
        title: 'Điểm số',
        dataIndex: 'score',
        key: 'score',

       
      },
    {
      title: 'Chức năng',
      dataIndex: 'actions',
      key: 'actions', 
      render: (text, record) => (
        <>
            {
                record.status === false? 
                (<Button type="primary" style={{  marginRight:'5px',marginBottom:'5px', textAlign:'center' }}
                        onClick={() => handleApproval(record.id)}>
                        Duyệt
                </Button>
                ) : null 
             }
             {
                record.review === null || record.review === undefined ?
                 null
                 :(  <Button type='primary' danger   onClick={() => handleShowDelete(record.id)} className='fs16'>
                 Xóa nội dung
                 </Button> 
                 )

             }
          
       
        </>
      ),
    },
  ];
  const handleSearch = () => {
      axiosClient.get(`/Ratings/search?review=${valueSearch}`)
      .then(res=> {setRating(res.data);
      })
      .catch(error =>{
        console.log('Error',error);
      })
  };
  const totalPages = Math.ceil(Rating.length / pageSize); // Tính toán tổng số trang

  const paginatedData = Rating.slice((currentPage - 1) * pageSize, currentPage * pageSize);
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

console.log('Rating', Rating);
    return ( 
        <>
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
                <h1>Quản Lý Đánh Giá</h1>
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
                    placeholder="Nhập nội dung..." 
                    value={valueSearch}
                    onChange={e => setValueSearch(e.target.value)}
                />
                
                <Button type="primary"  onClick={handleSearch} >Tìm</Button>
                </div>
                <div className='refresh'>
                <Button type='primary'   onClick={() => setRefresh(!Refresh)} >{<RetweetOutlined />} Làm mới</Button>
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
            name = {selectedRating.name}
            />
       
         </Content>
        </> );
}
 
export default Rating;