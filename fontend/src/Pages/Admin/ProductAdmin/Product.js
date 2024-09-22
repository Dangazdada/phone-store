import React, { useEffect, useState } from 'react';



import { Layout, Input, Button, Table,theme,Modal, Pagination} from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, LeftOutlined, PlusCircleOutlined, PlusOutlined, RetweetOutlined, RightOutlined } from '@ant-design/icons';
import { Link, useNavigate} from 'react-router-dom';
import axiosClient, { baseURL } from '../../../Components/Other/axiosClient';
import ModalViewImg from '../../../Components/Other/ModalViewImg';
import DeleteModal from '../../../Components/Other/DeleteModal';

const { Content } = Layout;

const Product = () => {
  const { colorBgContainer, borderRadiusLG } = theme.useToken();

  const [Product, setProduct] =useState([]);
  const [ProductDetail, setProductDetail] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState({});
  const [showDeleteDetail, setshowDeleteDetail] = useState(false);

  const [showView, setShowView] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [imgUrl, setImgUrrl] = useState('');

  const [selectedColor, setSelectedColor] = useState(null); // State cho màu được chọn
  const [selectedMemoryRam, setSelectedMemoryRam] = useState(null);

  const [valueSearch, setValueSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    producttype: '',
    supplier: '',
    color: '',
    manufacture: '',
    price: '',

  });
  const [uniqueMemoryAndRam, setUniqueMemoryAndRam] = useState([]);
  const [uniqueColor, setUniqueColor] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); 
  const [pageSizeDetail, setPageSizeDetail] = useState(5); 
  const [currentPageDetail, setCurrentPageDetail] = useState(1);
  const [ProductId, setProductId] =useState(0);
  const [Refresh, setRefresh] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [Refresh]);

  const fetchData = () => {
    axiosClient
      .get(`/Products`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(error => console.error('Error fetching product :', error));
     console.log('data', Product);
  };
  
  const handleShowDelete = (id) => {
    setSelectedProduct(Product.find(a => a.id === id));
    setShowDelete(true);
    console.log('select',selectedProduct );
    console.log('showdelete', showDelete);
};
const handleShowDeleteDetail  = (id) => {
  setSelectedProductDetail(ProductDetail.find(a => a.id === id));
    setshowDeleteDetail(true);
    console.log('select',selectedProductDetail );
    console.log('showdelete', showDelete);
}
  const handleCloseDelete = () => setShowDelete(false);
  const handleCloseDeleteDetail = () => setshowDeleteDetail(false);

  const handleDelete = () => {
    
    axiosClient.delete(`/Products/${selectedProduct.id}`)
    .then(() => {
      // cập nhật lại dữ liệu sao khi xóa
      const updatedProduct = Product.filter(item => item.id !== selectedProduct.id);
      setProduct(updatedProduct);
      setShowDelete(false);
    })
    .catch(error => {
      console.error('Error deleting product :', error);
      // Xử lý lỗi nếu cần
    });
  
    setShowDelete(false);
};
const handleDeleteDetail = () => {
    
  axiosClient.delete(`/ProductDetails/${selectedProductDetail.id}`)
  .then(() => {
    // cập nhật lại dữ liệu sao khi xóa
    const updatedProduct = ProductDetail.filter(item => item.id !== selectedProductDetail.id);
    setProductDetail(updatedProduct);
    setshowDeleteDetail(false);
  })
  .catch(error => {
    console.error('Error deleting product :', error);
    // Xử lý lỗi nếu cần
  });

  setShowDelete(false);
};


const handleEdit =(id) =>
{
  navigate(`/admin/product/edit/${id}`);
}
const handleEditDetail =(id) =>
  {
    navigate(`/admin/productdetail/edit/${id}`);
  }
 
  const handleSearch = () => {

   
      axiosClient.get(`Products/search?Name=${valueSearch}`)
      .then(res=> {setProduct(res.data);
      })
      .catch(error =>{
        console.log('Error',error);
      })
  };
  const handleInputChange = (field, value) => {
    if (value.trim() === '' || value === undefined) {
      value = '';
    }
    

      switch (field) {
        case 'price':
          // Kiểm tra giá trị nhập vào là số nguyên dương
          if (!(/^\d+$/.test(value)) || parseInt(value) <= 0) {
            return;
          }
          break;
        case 'name':
          // Kiểm tra giá trị nhập vào không chứa ký tự đặc biệt
          if (/[^a-zA-Z0-9\s]/.test(value)) {
            return;
          }
          break;
        // Thêm các trường hợp kiểm tra khác tương tự ở đây
        default:
          break;
      }
      setSearchCriteria(prevCriteria => ({
        ...prevCriteria,
        [field]: value
      }));
    

    
  };
 const handleAdvenceSearch = () => {
  const searchCriteriaData  = {
    Name: searchCriteria.name  === "" ? null : searchCriteria.name ,
    producttype: searchCriteria.producttype === "" ? null: searchCriteria.producttype ,
    supplier:searchCriteria.supplier === "" ? null : searchCriteria.supplier ,
    manufacture: searchCriteria.manufacture === "" ? null : searchCriteria.manufacture,
  };
  

  const searchvalueParams = Object.keys(searchCriteriaData) .map ( key => `${key}=${encodeURIComponent(searchCriteriaData[key])}`)
  .join('&');
  axiosClient.get(`/Products/searchs?${searchvalueParams}`)
  .then(res=> {setProduct(res.data)
    console.log('data res search', res.data);
  });
  console.log('productsearch', searchCriteriaData);
  setModalVisible(false)
  };
  const handleView = (id) =>
    {
     axiosClient.get(`/ProductDetails/Product/${id}`)
     .then(res => {setProductDetail(res.data);
      const uniqueR =  getUniqueMemoryAndRam(res.data);
      const uniqueC = getUniqueColor(res.data);
      setUniqueMemoryAndRam(uniqueR); 
      setUniqueColor(uniqueC);
     })
     .then(() => {

      setShowView(true); // Hiển thị modal
      setProductId(id)
      console.log('dataDetail', ProductDetail); 
      
     })
    
      
     
     .catch(error =>{
      console.log('Error',error);
     
    })

   

    }
  const handleImageClick = (imgUrrl) =>{
    setShowImg(true);
    setImgUrrl(imgUrrl)
   }
    const handleCloseModalImg = () =>{
      setShowImg(false);
    }

    const handleReset = () => {
      setSearchCriteria({
        name: '',
        producttype: '',
        supplier: '',
        color: '',
        manufacture: '',
        price: '',

      });
    };
    const getUniqueColor = (data) =>{
      const uniqueCombinations = new Set();
      data.forEach(item => {
        uniqueCombinations.add(JSON.stringify({ color: item.colorName }));
    });
    return Array.from(uniqueCombinations).map(item => JSON.parse(item));
    }

    const getUniqueMemoryAndRam = (data) => {
      const uniqueCombinations = new Set();
  
      data.forEach(item => {
          uniqueCombinations.add(JSON.stringify({ memoryCapacity: item.memoryCapacity, ram: item.ram }));
      });
  
      return Array.from(uniqueCombinations).map(item => JSON.parse(item));
  };
  
    const totalPages = Math.ceil(Product.length / pageSize); // Tính toán tổng số trang
  
    const paginatedData = Product.slice((currentPage - 1) * pageSize, currentPage * pageSize);
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
    const handleCancel = () => {
      setShowView(false);
      setCurrentPageDetail(1)
    };
const columns = [
      {
        title: 'STT',
        render:(text,record, index) =>index +1,
      },
      {
        title: 'Hình ảnh',
        dataIndex: 'imageurl',
        key: 'imageurl',
        render:imageurl => <img src={ `${baseURL}/Image/${imageurl}` } alt="Product" style={{ width: '50px' }}
        onClick={() => handleImageClick( `${baseURL}/Image/${imageurl}`)} />,
      },
      {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Loại',
        dataIndex: 'producttype',
        key: 'producttype',
      },
      {
        title: 'Nhà sản xuất',
        dataIndex: 'manufacturer',
        key: 'manufacturer',
      },
      {
        title: 'Nhà cung cấp',
        dataIndex: 'supplier',
        key: 'supplier',
      },
      {
        title: 'Chức năng',
        dataIndex: 'actions',
        key: 'actions', 
        render: (text, record) => (
          <>
          <Button type="primary" style={{ color: '#fff', marginRight:'5px' }}
          onClick={() => handleView(record.id)}>
          <EyeOutlined />Xem chi tiết
       </Button>
         
          <Button type="default" style={{ backgroundColor: 'gold', borderColor: 'gold', color: '#fff', marginRight:'5px' }}
          onClick={() => handleEdit(record.id)}>
           <EditOutlined /> Sửa
        </Button>
  
        <Button type='default' danger  style={{backgroundColor:'#ff4d4f',color: '#fff', marginTop:'5px'}}  onClick={() => handleShowDelete(record.id)} className='fs16'>
        <DeleteOutlined /> Xóa
        </Button>
         
          </>
         
        ),
      },
    ];
  
    const totalPagesDetail = Math.ceil(ProductDetail.length / pageSizeDetail); // Tính toán tổng số trang
  
    const paginatedDataDetail = ProductDetail.slice((currentPageDetail - 1) * pageSizeDetail, currentPageDetail * pageSizeDetail);
    const handlePageChangeDetail = (page, pageSizeDetail) => {
      setCurrentPageDetail(page);
    };
    const handleNextPageDetail = () => {
      if (currentPageDetail < totalPagesDetail) {
        setCurrentPageDetail(currentPageDetail + 1);
      }
    };
  
    const handlePrevPageDetail = () => {
      if (currentPageDetail > 1) {
        setCurrentPageDetail(currentPageDetail - 1);
      }
    };
    
    const productdetails = [
      {
        title: 'STT',
        render:(text,record, index) =>index +1,
      },
      {
        title: 'Hình ảnh',
        dataIndex: 'productDetailImgUrl',
        key: 'productDetailImgUrl',
        render:productDetailImgUrl => <img src={ `${baseURL}/Image/${productDetailImgUrl}` } alt="Product" style={{ width: '50px' }}
        onClick={() => handleImageClick( `${baseURL}/Image/${productDetailImgUrl}`)} />,
      },
      {
        title: 'RAM',
        dataIndex: 'ram',
        key: 'ram',
      },
      {
        title: 'Dung lượng',
        dataIndex: 'memoryCapacity',
        key: 'memoryCapacity',

       
      },
      {
        title: 'Màu',
        dataIndex: 'colorName',
        key: 'colorName',
       
      },
      {
        title: 'Giá',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
        render: (unitPrice) => (
          unitPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        )
      },
      {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity  ',
       
      },
      {
        title: 'Chức năng',
        dataIndex: 'actions',
        key: 'actions', 
        render: (text, record) => (
          <>
         
         
          <Button type="default" style={{ backgroundColor: 'gold', borderColor: 'gold', color: '#fff', marginRight:'5px' }}
          onClick={() => handleEditDetail(record.id)}>
           <EditOutlined /> Cập nhật
        </Button>
  
        <Button type='default' danger  style={{backgroundColor:'#ff4d4f',color: '#fff'}}  onClick={() => handleShowDeleteDetail(record.id)} className='fs16'>
        <DeleteOutlined /> Xóa
        </Button>
         
          </>
         
        ),
      },
    ];

  

    // Hàm xử lý khi click vào nút màu
  const handleClickColor = (color) => {
    setSelectedColor(color);
    setSelectedMemoryRam(null); // Đặt cặp memory và RAM được chọn về null để xóa bộ lọc trước
  };

  // Hàm xử lý khi click vào nút memory và RAM
  const handleClickMemoryRam = (memoryCapacity, ram) => {
    setSelectedMemoryRam({ memoryCapacity, ram });
    setSelectedColor(null); // Đặt màu được chọn về null để xóa bộ lọc trước
  };

   // Lọc dữ liệu dựa trên màu hoặc cặp memory và RAM được chọn
   const filteredData = ProductDetail.filter(item => {
    if (selectedColor) {
      return item.colorName === selectedColor.color;
    }
    if (selectedMemoryRam) {
      return item.memoryCapacity === selectedMemoryRam.memoryCapacity && item.ram === selectedMemoryRam.ram;
    }
    return true; // Nếu không có bộ lọc được chọn, hiển thị toàn bộ dữ liệu
  });



  console.log('productdata', Product);
  console.log('filteredData', filteredData);


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
        <h1>Quản Lý Sản Phẩm</h1>
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
          placeholder="Nhập tên sản phẩm ..." 
          value={valueSearch}
          onChange={e => setValueSearch(e.target.value)}/>
          
          <Button type="primary"  onClick={handleSearch}  style={{marginRight:'10px'}}>Tìm</Button>

        
        </div>
        <div className='refresh'>
        <Button type='primary'   onClick={() => setRefresh(!Refresh)} >{<RetweetOutlined />} Làm mới</Button>
        </div>
        <div className="add-button " >
        <Link to='/admin/product/add'>
          <Button className='fs16' type="primary"><PlusOutlined />Thêm mới</Button>
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
   
 {/*<Modal
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
<label htmlFor="name">Tên điện thoại</label>
  <Input
    placeholder="Tên điện thoại"
    value={searchCriteria.name}
    onChange={e => handleInputChange('name', e.target.value)}
    allowClear
    className='input-advencesearch'
  />
<br />
<label htmlFor="producttype">Loại điện thoại</label>
  <Input
    placeholder="Loại điện thoại"
    value={searchCriteria.producttype}
    onChange={e => handleInputChange('producttype', e.target.value)}
    allowClear
    className='input-advencesearch'
  />
  
 <br/>
 
  <label htmlFor="supplier">Nhà cung cấp</label>
  <Input
    placeholder="Nhà cung cấp"
    value={searchCriteria.supplier}
    onChange={e => handleInputChange('supplier', e.target.value)}
    allowClear
    className='input-advencesearch'
  />
  <br/>
 
  <label htmlFor="manufacture">Nhà sản xuất</label>
  <Input
    placeholder="Nhà sản xuất"
    value={searchCriteria.manufacture}
    onChange={e => handleInputChange('manufacture', e.target.value)}
    allowClear
    className='input-advencesearch'
  />
  <br/>
  
 
</Modal>*/}
<Modal
title="Thông tin sản phẩm"
visible={showView}
onCancel={handleCancel}
footer={null}
width={1000}
>
<div>
<div className="left-side-add">
  <p>Danh mục màu</p>
  {uniqueColor.map(item => (
    <button 
      className={`custom-button ${selectedColor === item ? 'active' : ''}`} 
      key={item.color} 
      onClick={() => handleClickColor(item)}
    >
      <strong>{item.color}</strong>
    </button>
  ))}
</div>
<div className='right-side-add'>
  <p>Danh mục bộ nhớ và RAM</p>
  {uniqueMemoryAndRam.map(item => (
    <button 
      className={`custom-button ${selectedMemoryRam && selectedMemoryRam.memoryCapacity === item.memoryCapacity && selectedMemoryRam.ram === item.ram ? 'active' : ''}`} 
      key={`${item.ram}-${item.memoryCapacity}`} 
      onClick={() => handleClickMemoryRam(item.memoryCapacity, item.ram)}
    >
      <strong>{`${item.ram} - ${item.memoryCapacity}`}</strong>
    </button>
  ))}
</div>
</div>
    
<div style={{display:'flex', justifyContent:'flex-end'}}>
<Link to= {`/admin/productdetail/add/${ProductId}`}>
  <Button type='primary'><PlusOutlined /> Thêm mới</Button>
</Link>

</div>
  <div>
  <Table dataSource={paginatedDataDetail} columns={productdetails}  pagination={false}/>
  <div className='pagination' style={{ textAlign: 'center', marginTop: '16px' }}>
  <Button onClick={handlePrevPageDetail} disabled={currentPageDetail === 1} icon={<LeftOutlined />} />
    {Array.from({ length: totalPagesDetail }, (_, index) => (
      <Button className={`btn-pagination ${currentPageDetail === index+1  ? 'current-page' :''}`} key={index + 1} onClick={() => handlePageChangeDetail(index + 1)}>
        {index + 1}
      
      </Button>
    ))}
    <Button onClick={handleNextPageDetail} disabled={currentPageDetail === totalPagesDetail} icon={<RightOutlined />} />
  </div>
  </div>
</Modal>
<DeleteModal
visible = {showDelete}
handleCancel = {handleCloseDelete}
handleDelete = {handleDelete}

/>
<DeleteModal
visible = {showDeleteDetail}
handleCancel = {handleCloseDeleteDetail}
handleDelete = {handleDeleteDetail}

/>

<ModalViewImg
visible = {showImg}
imageUrl = {imgUrl}
handleCancel = {handleCloseModalImg}
/>
  </Content>

  </>

  );
};

export default Product;
