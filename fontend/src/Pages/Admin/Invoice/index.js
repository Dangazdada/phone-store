import React, { useEffect, useState } from 'react';



import { Layout, Input, Button, Table,theme,Modal,  Select} from 'antd';
import { LeftOutlined, RetweetOutlined, RightOutlined } from '@ant-design/icons';
import {  useNavigate} from 'react-router-dom';
import axiosClient, { baseURL } from '../../../Components/Other/axiosClient';


const { Content } = Layout;
const { Option } = Select;

const Invoice = () => {
  const { colorBgContainer, borderRadiusLG } = theme.useToken();
  const navigate = useNavigate();

  const [Invoice, setInvoice] =useState([]);
  const [InvoiceDetail , setInvoiceDetail] = useState({});
  const [orderStatusId, setOrderStatusId] = useState(0);

  const [valueSearch, setValueSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); 

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Refresh, setRefresh] = useState(true);


  const formattedCreatedAt = InvoiceDetail.length > 0 ? new Date(InvoiceDetail[0].invoice.issuedDate).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }) : '';
  const formattedDeliveryTime  = InvoiceDetail.length > 0 ? InvoiceDetail[0].invoice.deliveryTime === null? "Chưa giao hàng" : new Date(InvoiceDetail[0].invoice.deliveryTime).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }) : '';
  const formattedSubTotal = InvoiceDetail.length > 0 ? InvoiceDetail[0].invoice.subTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '';
  const formattedTotal = InvoiceDetail.length > 0 ? InvoiceDetail[0].invoice.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '';
 
  useEffect(() => {
    fetchData();
  }, [ pageSize, Refresh]);

  const fetchData = () => {
    axiosClient
      .get(`/Invoices`)
      .then(res => {
        setInvoice(res.data);
      })
      .catch(error => console.error('Error fetching product types:', error));
  };
  useEffect(() => {
    FilterOrderStatus();
   
  },[orderStatusId] )

 

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //Lấy dữ liệu lọc theo trạng thái đơn hàng
  const FilterOrderStatus = () => {
    if(orderStatusId === 0){
      axiosClient
      .get(`/Invoices`)
      .then(res => {
        setInvoice(res.data);
        setCurrentPage(1);
      })
      .catch(error => console.error('Error fetching product types:', error));

    }
    else{
      axiosClient.get(`Invoices/FilterByStatus?oderStatus=${orderStatusId}`)
      .then (res => {
        setInvoice(res.data);
        setCurrentPage(1);
      })
      .catch(error => {
        console.log('Error', error);
      })
    }
  }
  const columns = [
    {
      title: 'STT',
      render:(text,record, index) =>index +1,
    },
    {
      title: 'Mã đơn hàng',
      dataIndex: 'payCode',
      key: 'payCode',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'issuedDate',
      key: 'issuedDate',
      render: (issuedDate)  => ( new Date(issuedDate).toLocaleDateString())
     
    },
    {
      title: 'Ngày giao hàng',
      dataIndex: 'deliveryTime',
      key: 'deliveryTime',
      render :(deliveryTime) =>(
       deliveryTime ? new Date(deliveryTime).toLocaleDateString() : 'Chờ giao'
      )
     
     
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      render: (total) => (
        total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'orderStatusId',
      key: 'orderStatusId',
      render: (orderStatusId) => {
        let statusText;
        switch(orderStatusId)
        {
          case  1:
            
              statusText = 'Chờ xác nhận';
          break;
          
          case 2:
            statusText = 'Chờ lấy hàng';
            break;
          case 3:
              statusText = 'Đang giao hàng';
              break;
          case  4:
              statusText = 'Đã giao'
              break;
          case  5:
              statusText = 'Đã hủy';
              break;
          case  6:
              statusText = 'Hoàn thành';
              break;
          default:
            statusText = 'Trạng thái không xách định';


        }
        return statusText;
      }
    },
    
    
    {
      title: 'Chức năng',
      dataIndex: 'actions',
      key: 'actions', 
      render: (text, record) => (
        <>
       {record.orderStatusId === 4 || record.orderStatusId === 5 ? null :
        <Button type="default" style={{ backgroundColor: 'gold', borderColor: 'gold', color: '#fff', marginRight:'5px', textAlign:'center' }}
         onClick={() => handleEdit(record.id)}>
        Sửa
      </Button>
      }

      <Button type='primary' style={{marginRight:'5px'}} onClick={() => handleShowInvoice(record.id)} className='fs16'>
      Chi tiết
      </Button>
     
      {record.orderStatusId === 1 && (
        <Button
          type="primary"
          onClick={() => handleConfirm(record.id)} 
          className="fs16"
        >
         Xác nhận
        </Button>
      )}
        </>
       
      ),
    },
  ];
   // Chuyển đổi dữ liệu sản phẩm
   const products =InvoiceDetail.length > 0?  InvoiceDetail.map((item, index) => ({
    key: index,
    image:item.productDetail.productImage ,
    name: `${item.productDetail.productName}  ${ item.productDetail.productStorage.ram}  ${ item.productDetail.productStorage.storagecapacity}`,
    color: item.productDetail.productColor,
    quantity : item.invoiceDetail.quantity,
    promotions: item.productDetail.promotions,
    price :item.productDetail.price,
  })) : '';

  const productColumns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render:imageurl => <img src={ `${baseURL}/Image/${imageurl}` } alt="Product" style={{ width: '100px' }}
         />,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Màu sắc',
      dataIndex: 'color',
      key: 'color',
    },
   
    {
      title: 'Khuyến mãi',
      dataIndex: 'promotions',
      key: 'promotions',
      render: (promotions) => (
        <ul>
          {promotions.map((promo, index) => (
            <li key={index}>{promo.description}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
      )
     
    },
  ];

const handleEdit =(id) =>
{
  navigate(`/admin/invoice/edit/${id}`);
}

const handleConfirm = (id) => {
  const invoice ={
    OrderStatusId: 2
  };
  axiosClient.put(`/Invoices/${id}/ChangeOrderStatus`, invoice)
  .then(() => {
    console.log('xác nhận thành công');
    FilterOrderStatus();
  })
}
  
  const handleSearch = () => {

   
      axiosClient.get(`Invoices/Search?payCode=${valueSearch}`)
      .then(res=> {setInvoice(res.data);
      })
      .catch(error =>{
        console.log('Error',error);
      })
  };
  const handleShowInvoice = (id) => {
    axiosClient.get(`/InvoiceDetails/${id}/GetByInvoiceId`)
    .then(res => {
      setInvoiceDetail(res.data);
      setIsModalVisible(true);
    })
    
  }



  const totalPages = Math.ceil(Invoice.length / pageSize); // Tính toán tổng số trang

  const paginatedData = Invoice.slice((currentPage - 1) * pageSize, currentPage * pageSize);
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
  const handleRefresh = () => {
    setRefresh(!Refresh);
    setOrderStatusId(0);
  }
  
    console.log('orderStatus', orderStatusId);
    console.log('invoice',Invoice);
    console.log('InvoiceDetail', InvoiceDetail);

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
        <h1>Quản Lý Đơn Hàng</h1>
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
          placeholder="Nhập mã đơn hàng ..." 
          value={valueSearch}
          onChange={e => setValueSearch(e.target.value)}/>
          
          <Button type="primary"  onClick={handleSearch}  style={{marginRight:'10px'}}>Tìm</Button>

         
        </div>
        <div className='refresh'>
        <Button type='primary'   onClick={() => handleRefresh()} >{<RetweetOutlined />} Làm mới</Button>
        </div>
        <div className="add-button " >

        <Select
            value={orderStatusId}

            className='fs16'
            style={{ width: 200 }}
             onChange={setOrderStatusId}
            // onClick={filterByOrderStatus}
        >

        <Option value={0}>Tất cả</Option>
        <Option value={1}>Chờ xác nhận</Option>
        <Option value={2}>Đang lấy hàng</Option>
        <Option value={3}>Chờ giao hàng</Option>
        <Option value={4}>Đã giao</Option>
        <Option value={5}>Đã hủy</Option>
    </Select>
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
    title="Chi Tiết Đơn Hàng"
    visible={isModalVisible}

    onCancel={handleCancel}
    width={800}
    style={{overflow:'auto'}}
    footer={null} 
  >
  {
    InvoiceDetail.length > 0 ?<> 
    <br/>
    <h3>Mã đơn hàng :   {InvoiceDetail[0].invoice.payCode}</h3>

    <br/>
   
    <h3>Thông tin giao hàng</h3>
    <Table
      columns={[
        {
          title: '',
          dataIndex: 'label',
          key: 'label',
        },
        {
          title: '',
          dataIndex: 'value',
          key: 'value',
        },
        
      ]}
      dataSource={[
        {
          key: '1',
          label: 'Người nhận',
          value:  `${InvoiceDetail[0].invoice.userName.lastName} ${InvoiceDetail[0].invoice.userName.firstName}`,
          className:"fs16"
        },
        {
          key: '2',
          label: 'Địa chỉ giao hàng',
          value:  `${InvoiceDetail[0].invoice.shippingAddress}`,
        },
        {
          key: '3',
          label: 'Thời gian tạo hóa đơn',
          value:  formattedCreatedAt,
           className:"fs16"
        },
        {
          key: '4',
          label: 'Thời gian giao',
          value:  formattedDeliveryTime,
           className:"fs16"
        },
        {
          key: '5',
          label: 'Phương thức thanh toán',
          value:   `${InvoiceDetail[0].invoice.payment}`,
           className:"fs16"
        },
        {
          key: '6',
          label: 'Trạng thái đơn hàng',
          value:   `${InvoiceDetail[0].invoice.orderStatus}`,
           className:"fs16"
        },
      ]}
      pagination={false}
      showHeader={false}
    />
    <br/>

    <h3 className='fs16'>Thông tin sản phẩm</h3>
   
    <Table columns={productColumns} dataSource={products} pagination={false} />
    <br/>
    <hr style={{ borderTop: '1px solid #9e9e9e' }}/>
    <div style={{ padding: '10px',  textAlign: 'right'}}>
    <h3 className='fs16' style={{color:'red', marginBottom:'5px'}}>Tổng tiền hàng : {formattedSubTotal} </h3>
    <h3 className='fs16' style={{color:'red'}}>Tổng tiền thanh toán : {formattedTotal} </h3>
    </div>
    

    </> : <>
    <h3>Thông tin giao hàng</h3>

    <br/> 
    <h3>Thông tin  sản phẩm</h3>
    <Table columns={productColumns} dataSource={products} pagination={false} />

    <h3 className='fs16' style={{color:'red'}}>Tổng tiền hàng : {formattedSubTotal} </h3>
    <br/>
    <h3 className='fs16' style={{color:'red'}}>Tổng tiền thanh toán : {formattedTotal} </h3>
     </>
  }
    
  </Modal>
   
  </Content>
  

  );
};

export default Invoice;
