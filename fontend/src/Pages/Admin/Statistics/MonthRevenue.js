import { DatePicker , Button, Table, Modal} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient, { baseURL } from "../../../Components/Other/axiosClient";
import { DoubleLeftOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";
import ExportToExcel from "../Tools/ExportToExcel";

const MonthRevenue = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); 
    const [currentPageD, setCurrentPageD] = useState(1);
    const [pageSizeD, setPageSizeD] = useState(5); 

    const [Revenue, setRevenue] = useState([]);
    const [RevenueDetail, setRevenueDetail] = useState([]);
    const [InvoiceDetail , setInvoiceDetail] = useState({});

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dateorder, setDateorder] =useState(null);

    const [RevenueData, setRevenueData] = useState([]);
    const [RevenueDetailData, setRevenueDetailData] = useState([]);

    const formattedCreatedAt = InvoiceDetail.length > 0 ? new Date(InvoiceDetail[0].invoice.issuedDate).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }) : '';
    const formattedDeliveryTime  = InvoiceDetail.length > 0 ? InvoiceDetail[0].invoice.deliveryTime === null? "Chưa giao hàng" : new Date(InvoiceDetail[0].invoice.deliveryTime).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }) : '';
    const formattedSubTotal = InvoiceDetail.length > 0 ? InvoiceDetail[0].invoice.subTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '';
    const formattedTotal = InvoiceDetail.length > 0 ? InvoiceDetail[0].invoice.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '';


  const columns = [
    {
      title: 'STT',
      render:(text,record, index) =>index +1,
    },
    {
      title: 'Tháng',
     
      key: 'orderDate',
      render :(text, record) =>(
        `${record.month}/${record.year}` 
       )
    },
    {
      title: 'Doanh thu',
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
      render: (totalRevenue) => (
        totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
      )
     
    },
   
    {
      title: 'Chức năng',
      dataIndex: 'actions',
      key: 'actions', 
      render: (text, record) => (
        <>
       
        <Button type="primary" onClick={() => handleShowDetail(record.month, record.year )} style={{  textAlign:'center' }}
        >
       Chi tiết
      </Button>

      
       
        </>
       
      ),
    },
  ];
  const totalPages = Math.ceil(Revenue.length / pageSize); // Tính toán tổng số trang

  const paginatedData = Revenue.slice((currentPage - 1) * pageSize, currentPage * pageSize);
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
  
  const columnsDetail = [
    {
      title: 'STT',
      render:(text,record, index) =>index +1,
    },
    {
      title: 'Khách hàng',
    
      key: 'customer',
      render :(text, record) =>(
        `${record.lastName} ${record.firstName}`
       )
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'issuedDate',
      key: 'issuedDate',
      render :(issuedDate) =>(
        new Date(issuedDate).toLocaleDateString() 
       )
    },
    {
      title: 'Doanh thu',
      dataIndex: 'total',
      key: 'total',
      render: (total) => (
        total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
      )
     
    },
    {
      title: 'Chức năng',
      dataIndex: 'actions',
      key: 'actions', 
      render: (text, record) => (
        <>
       
        <Button type="primary" onClick={() => handleShowInvoiceDetail(record.id)} style={{  textAlign:'center' }}
        >
       Xem đơn hàng
      </Button>

      
       
        </>
       
      ),
    },
  ];
  const totalPagesD= Math.ceil(RevenueDetail.length / pageSizeD); // Tính toán tổng số trang

  const paginatedDataD = RevenueDetail.slice((currentPageD - 1) * pageSize, currentPageD * pageSizeD);
  const handlePageChangeD = (page, pageSize) => {
    setCurrentPageD(page);
  };
  const handleNextPageD = () => {
    if (currentPageD < totalPagesD) {
      setCurrentPageD(currentPageD + 1);
    }
  };
  const handlePrevPageD = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
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
const handleCancel = () => {
  setIsModalVisible(false);
};

const handleExportnthMoly = () => {
  // Đặt tên file và sheet theo nhu cầu của bạn
  var sheetName = '';
  if (startDate  && endDate ) {
    var startDateFormatted = startDate
    var endDateFormatted = endDate
    sheetName = `${startDateFormatted} - ${endDateFormatted}`;
  }

  const fileName = 'Doanh thu theo tháng';
  

  return <ExportToExcel data={RevenueData} fileName={fileName} sheetName={sheetName} />;
};
const handleExportMonth = () => {
  // Đặt tên file và sheet theo nhu cầu của bạn
  var sheetName = dateorder;
  const fileName = 'Doanh thu theo ngày';
  

  return <ExportToExcel data={RevenueDetailData} fileName={fileName} sheetName={sheetName} />;
};
  

  const handleStartDateChange = (date, dateString) => {
    if (date) {
        const formattedDate = date.format('YYYY-MM-DD');
        setStartDate(formattedDate);
        console.log(formattedDate); // Hoặc thực hiện bất kỳ hành động nào với dữ liệu này
      } else {
        setStartDate(null);
      }
  };

  const handleEndDateChange = (date, dateString) => {
    if (date) {
        const formattedDate = date.format('YYYY-MM-DD');
        setEndDate(formattedDate);
        console.log(formattedDate); // Hoặc thực hiện bất kỳ hành động nào với dữ liệu này
      } else {
        setEndDate(null);
      }
  };
  const handleShowDetail =( month, year) => {
    axiosClient.get(`/Invoices/getinvoicebymonthly?month=${month}&year=${year}`)
   .then( res => {
    const  data = res.data.map(item => (
      {
          'Tên khách hàng': `${item.lastName} ${item.firstName}`,
          'Ngày đặt': item.issuedDate,
          'Doanh thu': item.total
      }));

    setRevenueDetail(res.data);
    setRevenueDetailData(data);
    setDateorder(`${month}-${year}`);
    console.log('invocie', res.data);
   })
  }
  const handleShowInvoiceDetail = (id) => {
    axiosClient.get(`/InvoiceDetails/${id}/GetByInvoiceId`)
   .then( res => {
    setInvoiceDetail(res.data);
    setIsModalVisible(true);
    console.log('invocie', res.data);
   })
  }
  const handleSubmit = () => {
    if(startDate === null && endDate === null ||startDate === null  || endDate === null)
        {
          toast.error('Bạn phải chọn đầy đủ 2 mốc ngày');
          
        }
        else{
   axiosClient.get(`/Invoices/monthly?startDate=${startDate}&endDate=${endDate}`)
   .then( res => {
    const  data = res.data.map(item => (
      {
          'Tháng': `${item.month}/${item.year}`,
          'Doanh thu': item.totalRevenue
      }));
      
    setRevenue(res.data);
    setRevenueData(data);
    console.log('response', res.data);
   })
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
}
    // Example: You can fetch data from API using startDate and endDate
  };
  
    return ( <>
        <div className="logo">
        <h1>Thống Kê Doanh Thu Theo Tháng</h1>
      </div>
      <nav>
        <ul>
          <li className="fs16">
            <Link to="/admin/revenue" className="home-link">
            <DoubleLeftOutlined /> Quay lại
            </Link>
          </li>
        </ul>
      </nav>

      <div style={{ margin: '20px' }}>
      <label htmlFor="start-date">Ngày bắt đầu:</label>
      <DatePicker
        onChange={handleStartDateChange}
        style={{ marginLeft: '10px', marginRight: '20px' , height:'40px'}}
      />

      <label htmlFor="end-date">Ngày kết thúc:</label>
      <DatePicker
        onChange={handleEndDateChange}
        style={{ marginLeft: '10px', marginRight: '20px', height:'40px' }}
      />
      <Button type="primary" onClick={handleSubmit}>
      Tìm
    </Button>
    </div>
      { Revenue.length > 0  ?
       
      ( <>   <div style={{display:'flex'}}>
        <h3>Doanh thu theo tháng</h3>
        <div style={{marginLeft:'auto', marginBottom:'5px'}}>
          {RevenueData.length >0 ? handleExportnthMoly() :null}
        </div>
      </div>
        <Table  dataSource={paginatedData} columns={columns}  pagination={false}/>
      <div className='pagination' style={{ textAlign: 'center', marginTop: '-5px' }}>
          <Button onClick={handlePrevPage} disabled={currentPage === 1} icon={<LeftOutlined />} />
            {Array.from({ length: totalPages }, (_, index) => (
              <Button className={`btn-pagination ${currentPage === index+1  ? 'current-page' :''}`} key={index + 1} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              
              </Button>
            ))}
            <Button onClick={handleNextPage} disabled={currentPage === totalPages} icon={<RightOutlined />} />
          </div>  </>) : ''
      }

      { RevenueDetail.length > 0 && dateorder !== null   ?
       
        ( <>  <div style={{display:'flex'}}>
          <h3>Danh sách đơn hàng tháng {dateorder}</h3>
          <div style={{marginLeft:'auto', marginBottom:'5px'}}>
          {handleExportMonth()}
          </div>
        </div>
         
          <Table  dataSource={paginatedDataD} columns={columnsDetail}  pagination={false}/>
        <div className='pagination' style={{ textAlign: 'center', marginTop: '-5px' }}>
            <Button onClick={handlePrevPageD} disabled={currentPageD === 1} icon={<LeftOutlined />} />
              {Array.from({ length: totalPagesD }, (_, index) => (
                <Button className={`btn-pagination ${currentPageD === index+1  ? 'current-page' :''}`} key={index + 1} onClick={() => handlePageChangeD(index + 1)}>
                  {index + 1}
                
                </Button>
              ))}
              <Button onClick={handleNextPageD} disabled={currentPageD === totalPagesD} icon={<RightOutlined />} />
            </div>  </>) : ''
        }

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
  <ToastContainer
  position="top-center"
  pauseOnHover={false}
  autoClose={1500}
  theme={'dark'}
/>
    
        </> );
}
 
export default MonthRevenue;