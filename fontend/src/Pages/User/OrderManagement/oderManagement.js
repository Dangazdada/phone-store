import React, { useEffect, useState } from 'react';
import { useAuth } from "../../../Components/Other/auth";
import axiosClient, {baseURL} from '../../../Components/Other/axiosClient';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './orderManagement.css';
import { Modal, Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import moment from "moment";
import Star_Rating from '../Star_Rating/Star_Rating';

const OrderManagement = () => {
  const { userId } = useAuth();
  const [orderStatus, setOrderStatus] = useState([]);
  const [orderId, setOrderId] = useState(1);
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice]  =useState({});
  const [selectinvoicesID, setSelectinvoicesID] = useState(null);
  const [selecteddanhgia, setSelecteddanhgia]  =useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [rating,setRating] = useState([]);

  useEffect(() =>{
    const fetch =   (currentOrderID,currentUserId) =>{
         axiosClient.get(`/Invoices/Status`, {
            params: {
                id : currentOrderID,
                username: currentUserId
            }
          })
             .then(res =>setInvoices(res.data));
    };
    fetch(orderId, userId)
  },[orderId,userId]);

  useEffect(() =>{
    axiosClient.get(`/OrderStatus`)
        .then(res =>setOrderStatus(res.data));
    axiosClient.get(`/Ratings`)
        .then(res =>setRating(res.data));
  },[]);

  const handleSelectChange =  async (e) => {
    const orderID = e;
    const updateOrderId = async () =>{
     setOrderId(orderID);
    }
     await updateOrderId();
     
     const fetchData = (currentOrderID) => {
         // Gọi hàm lấy dữ liệu sử dụng giá trị orderID đã được đặt
         axiosClient.get(`/Invoices/Status`, {
           params: {
             id: currentOrderID,
             username: userId,
           },
         })
         .then(res => setInvoices(res.data));
       };
       fetchData(orderID);
  };

  const formatDate = (date) => {
    return moment(date).format('HH:mm  DD/MM/YYYY' );
  };

  const handleShowDelete = (id) => {
    setSelectedInvoice(invoices.find(a => a.invoiceId === id));
    setShowDelete(true);
  }
  const handleCloseDelete = () => setShowDelete(false);

  const handleCancelOrder = () => {
    selectedInvoice.products.map(product =>{
      const Quantitysum = product.productdetailquantity + product.quantity;
      axiosClient.put(`/ProductDetails/Quantity/${product.productDetailId}`, Quantitysum)
    })
    axiosClient.delete(`/Invoices/${selectedInvoice.invoiceId}`)
    let list = invoices;
    list.splice(invoices.findIndex(a => a.invoiceId === selectedInvoice.invoiceId), 1);
    setInvoices(list);
    setShowDelete(false);
  }

  const convertToSlug = (text) => {
    return text.toLowerCase().replace(/\s+/g, '-');
  };

  console.log('order', orderStatus);
  console.log('Invoice', invoices);

  return (
    <>
      <div className="body_orderStatus">
            <div className="title_orderStatus">
                <h2>QUẢN LÝ ĐƠN HÀNG CỦA BẠN</h2>
            </div>
            <div className="order-status-buttons__order">
            {orderStatus.map((type) => (
              <button
                key={type.id}
                className={`order-status-button__order ${orderId === type.id ? 'selected' : ''}`}
                onClick={() => handleSelectChange(type.id)}
              >
                {type.name}
              </button>
            ))}
          </div>
          {invoices.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
          .map((voices, index) => (
            <div key={index} className="invoice-container">
              <p className="purchase-date_invoice">Thời gian mua: {formatDate(voices.orderDate)} <b style={{color:'red'}}>{voices.orderStatusId === 1 ? '(Chờ xác nhận)' : voices.orderStatusId === 2 ? '(Chờ lấy hàng)' : voices.orderStatusId === 3 ? '(Chờ giao hàng)': voices.orderStatusId === 4 ? '(Đã giao)' : voices.orderStatusId === 5 ? '(Đã hủy)' : null}</b></p>
              <div className="invoicedetail-container">
                {voices.products && voices.products.map((detail, index) => (
                  <>
                  <a key={index} className="product-details_invoice" href={`/Phonedetail/${convertToSlug(detail.productName)}`}>
                      <div className='Anh_invoice_detail'>
                        <img src={`${baseURL}/Image/${detail.image}`} alt={detail.image} />
                      </div>
                      <h4 className="product-name_invoicedetail">{detail.productName} {detail.ram} {detail.rom}</h4>
                      <p className="product-price_invoicedetail">Giá: { Number(detail.unitPrice || 0).toLocaleString('vi-VN')}₫</p>
                      <p className="product-quantity_invoicedetail">Số lượng: {detail.quantity}</p>
                      {selecteddanhgia && selecteddanhgia === detail.productDetailId && selectinvoicesID === detail.invoiceiddetail ? 
                      rating.some((r) => (
                        r.invoiceDetail && r.invoiceDetail.invoiceId === voices.invoiceId &&
                        orderId === 4 && (r.productDetailId === detail.productDetailId) 
                      )) ? null : orderId === 4 && <button className='huyDanhgia_productdetauil_invoice' onClick={e => { e.preventDefault(); setSelecteddanhgia(null);setSelectinvoicesID(null) }}>Hủy đánh giá</button> :
                      rating.some((r) => (
                        r.invoiceDetail && r.invoiceDetail.invoiceId === voices.invoiceId &&
                        orderId === 4 && (r.productDetailId === detail.productDetailId)
                      )) ? null : orderId === 4 && <button className='Danhgia_productdetauil_invoice' onClick={e => { e.preventDefault(); setSelecteddanhgia(detail.productDetailId);setSelectinvoicesID(detail.invoiceiddetail) }}>Đánh giá</button>
                      }
                  </a>
                  {orderId === 4 && selecteddanhgia === detail.productDetailId && selectinvoicesID === detail.invoiceiddetail && rating.length === 0 ? (
                    <Star_Rating 
                    productId={detail.productDetailId} 
                    idInvoiDetail={detail.invoiceiddetail} 
                    isRating={null} />
                  ) : (
                    rating.some((r) => (
                      r.invoiceDetail && r.invoiceDetail.invoiceId === voices.invoiceId &&
                      orderId === 4 && (r.productDetailId === detail.productDetailId)
                    )) ? null : (
                      orderId === 4 && selectinvoicesID === detail.invoiceiddetail && selecteddanhgia === detail.productDetailId &&
                      <Star_Rating
                      productId={detail.productDetailId} 
                      idInvoiDetail={detail.invoiceiddetail} 
                      isRating={null} />
                    )
                    )}
                  </>
                ))}
              </div>
              <div className="Setkhungmau_address">
                <h3 className="address-amount_invoice">Địa chỉ:</h3>
                <p>{voices.shippingAddress}</p>
                <h3 className="phone-amount_invoice">Thông tin liên hệ:</h3>
                <p>{voices.shippingPhone}</p>
              </div>
              <div className="Setkhungmau_tongtien">
                <h3 className="total-amount_invoice">Tổng tiền(đã bao gồm khuyến mãi): {(Number(voices.totalPrice) || 0).toLocaleString('vi-VN')} ₫</h3>
              </div>
              {orderId !== 1 ? null : ( <div className='set_Nuthuy_sanphaminvoice'><button className='Nuthuy_sanphaminvoice' onClick={() => handleShowDelete(voices.invoiceId)}><h2>Hủy đơn hàng</h2></button></div>)}
            </div>
          ))}
      </div>

      <Modal
            title="Xác nhận hủy"
            open={showDelete}
            onCancel={handleCloseDelete}
            centered
            footer={[
              <Button key="cancel" onClick={handleCloseDelete} icon={<CloseOutlined />}>
                  không
              </Button>,
              <Button key="submit" type="primary" danger onClick={handleCancelOrder} icon={<CheckOutlined />}>
                  Đồng ý
              </Button>,
          ]}
        >
            <p>Bạn có chắc muốn hủy đơn hàng này? <span style={{ fontWeight: "bold" }}></span>?</p>
        </Modal>

      <ToastContainer
        position="top-center"
        pauseOnHover={false}
        autoClose={1500}
        theme={'dark'}
      />
    </>
  );
}

export default OrderManagement;
