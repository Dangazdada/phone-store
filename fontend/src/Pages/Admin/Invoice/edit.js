import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button,theme, Select, Table, InputNumber } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient, { baseURL } from '../../../Components/Other/axiosClient';
import DeleteModal from '../../../Components/Other/DeleteModal';
import MessageModal from '../../../Components/Other/MessageModal';
import NotificationModal from '../../../Components/Other/NotificationModal';

const { Content } = Layout;
const { Option } = Select;

const InvoiceAdminEdit = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { colorBgContainer, borderRadiusLG } = theme.useToken();
  const [hiddenAddnImageBtn, sethiddenAddnImageBtn] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [InvoiceDetail, setInvoiceDetail] = useState([]);
  const [productData, setProductData] = useState([]);
  const [SelectedProductData, setSelectedProductData] = useState({});
  const [Invoice, setInvoice] = useState({});
  const [PaymentMethod, setPaymentMethod] = useState([]);
  const [OrderStatus, setOrderStatus] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // State to check if data is loaded
  const [Total, setTotal] = useState(0);
  const [SubTotal, setSubTotal] = useState(0);
  const [ShowModal, setShowModal] = useState(false);
  const [ShowMessageModal, setShowMessageModal] = useState(false);
  const [Notificationstr, setNotificationstr] = useState('');
  const [status, setStatus] = useState(false);
  const [Checkorder, setCheckorder] = useState(0);
  const navigate = useNavigate();

  const formattedSubTotal = SubTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) ;
  const formattedTotal = Total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) ;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoiceDetailRes = await axiosClient.get(`/InvoiceDetails/${id}/GetByInvoiceId`);
        setInvoiceDetail(invoiceDetailRes.data);
        setTotal(invoiceDetailRes.data[0].invoice.total);
        setSubTotal(invoiceDetailRes.data[0].invoice.subTotal);

        const updatedProducts = invoiceDetailRes.data.map(item => ({
          id: item.invoiceDetail.id,
          key: item.invoiceDetail.productDetailId,
          image: item.productDetail.productImage,
          name: `${item.productDetail.productName} ${item.productDetail.productStorage.ram} ${item.productDetail.productStorage.storagecapacity}`,
          color: item.productDetail.productColor,
          quantity: item.invoiceDetail.quantity,
          price: item.productDetail.price,
          promotions : item.productDetail.promotions,
          payment: item.invoice.payment,
        }));
        setProductData(updatedProducts);

        const invoiceRes = await axiosClient.get(`Invoices/${id}`);
        const invoiceData = invoiceRes.data;
        setCheckorder(invoiceData.orderStatusId);
        setInvoice(invoiceData);

        const orderStatusRes = await axiosClient.get(`/OrderStatus`);
        setOrderStatus(orderStatusRes.data);

        const paymentMethodRes = await axiosClient.get(`/Pays`);
        setPaymentMethod(paymentMethodRes.data);

        // Set form values after data is fetched
        form.setFieldsValue({
          shippingAddress: invoiceData.shippingAddress,
          shippingPhone: invoiceData.shippingPhone,
          paymentMethod: invoiceData.payId,
          orderStatus: invoiceData.orderStatusId,
        });

        setDataLoaded(true); // Set dataLoaded to true after data is fetched
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id, form]);
  const handleCloseMessageModal = () => setShowMessageModal(false);
  const handleCloseNotification = () => setShowModal(false);
  const handleShowDelete = (id) => {
    if(productData.length <= 1)
      {
        setNotificationstr("Bạn không thể xóa hết sản phẩm của hóa đơn!")
        setShowMessageModal(true);
      }
      else{
        setSelectedProductData(productData.find(a => a.id === id));
        setShowDelete(true);
      }
    
    console.log('select',SelectedProductData );
}
const handleCloseDelete = () => setShowDelete(false);

  const handleDelete = () => {
    const updatedProductData = productData.filter(item => item.id !== SelectedProductData.id);
      setProductData(updatedProductData);
      setTotal(caculateTotal(updatedProductData));
      setShowDelete(false);
    axiosClient.delete(`/InvoiceDetails/${SelectedProductData.id}`)
    .then(() => {
      const updatedProductData = productData.filter(item => item.id !== SelectedProductData.id);
      setProductData(updatedProductData);
      setTotal(caculateTotal(updatedProductData));
      setShowDelete(false);
    })
    .catch(error => {
      console.error('Error deleting product type:', error);
      // Xử lý lỗi nếu cần
    });
  
    setShowDelete(false);
}

  const handleChange = (name, value) => {
    console.log(`Field: ${name}, Value: ${value}`);
    setInvoice(prev => ({ ...prev, [name]: value }));
    form.setFieldsValue({ [name]: value });
  };

  const handleQuantityChange = (key, newQuantity) => {
    if (newQuantity < 1 || !Number.isInteger(newQuantity) || newQuantity > 99) {
      setNotificationstr("Số lượng sản phẩm phải là số và từ 1 đến 99!")
      setShowMessageModal(true);
      
     
    }
    const updatedProducts = productData.map((product) => {
      if (product.key === key) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setProductData(updatedProducts);

      setTotal(caculateTotal(updatedProducts));
      setSubTotal(caculateSubTotal(updatedProducts));
  };
  //hàm tính tiền khuyến mãi 
  const applyPromotion = (price ,quantity, promotion, paymentMethod) => {
    let finalPrice = price * quantity;
    promotion.map(item => {
      if(item.promotiontype === "giamgiaphantram")
        {
        finalPrice -= finalPrice * (item.value / 100);
      }
      else if(item.promotiontype === "giamgiatien" && paymentMethod === "VN Pay")
        {
          finalPrice -= item.value;
        }
    });
    return finalPrice;

  }
  // hàm tính tổng tiền cho từng hóa đơn
  const caculateTotal = (productData) => {
    let total = 0;
    productData.map(item => {
      const finalPrice = applyPromotion(item.price, item.quantity,item.promotions, item.payment);
      total += finalPrice;
    })
    return total;
  }
  const caculateSubTotal = (productData) =>{
    let subtotal = 0;
    productData.map(item => {
      let finalPrice = item.price * item.quantity;
      subtotal += finalPrice;
    })
    return subtotal;
  };

  const productColumns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: imageurl => <img src={`${baseURL}/Image/${imageurl}`} alt="Product" style={{ width: '100px' }} />,
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
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <InputNumber
          min={1}
          value={quantity}
          parser={value => value.replace(/\D/g, '')} // Loại bỏ các ký tự không phải số
          onChange={(value) => handleQuantityChange(record.key, value)}
        />
      ),
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
      )
    },
    {
      title: 'Chức năng',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <Button type='primary' danger   onClick={() => handleShowDelete(record.id)} className='fs16'>
      Xóa
      </Button>
       
      ),
    },
  ];

  const handleEditInvoice = () => {
    const invoice = {
      ShippingAddress: Invoice.shippingAddress,
      ShippingPhone:Invoice.shippingPhone,
      OrderStatusId: Invoice.orderStatusId,
      PayId: Invoice.payId
    };
    axiosClient.put(`/Invoices/${id}`, invoice)
    .then((res) => {
      console.log('Create success data', res.data);
      setStatus(true);
    })
    .catch(error => {
      
      alert(error.data);
    })
    if( Invoice.orderStatusId === 5)
      {
        productData.forEach( item => {
          const  quantity = item.quantity;
          const productDetailId = item.key;
         
          axiosClient.put(`/ProductDetails/Quantity/Admin/${productDetailId}`, quantity)
          .then(() => {
      
            setNotificationstr('sửa thông tin đơn hàng thành công!') 
            setShowModal(true);
            setStatus(true);
          })
          .catch(error => {
            setNotificationstr('sửa thông tin đơn hàng thất bại!') 
            setShowModal(true);
            setStatus(false);
            alert(error.data);
          })

        })
      }
    console.log('datasubmit', invoice);
    
  };
 
  const handleEditInvoiceDetail =() => {
    const invoicedetail = productData.map (item => ({
      InvocieDetailId:item.id,
      Quantity: item.quantity,
      Total: Total,
      SubTotal: SubTotal,
    }));
    axiosClient.put(`/Invoices/${id}/Update`, invoicedetail)
    .then(res => {
      setNotificationstr('sửa thông tin đơn hàng thành công!') 
      setShowModal(true);
      setStatus(true);
    })
    .catch(error => {
      setNotificationstr('sửa thông tin đơn hàng thất bại!') 
      setShowModal(true);
      setStatus(false);
      alert(error.data);
    })
    console.log('req data', invoicedetail);
    
  };
    

  
console.log('inoice', Invoice);
console.log('pay', PaymentMethod);
console.log('orderStatus'. OrderStatus);
console.log('invoiceDetail', InvoiceDetail);
console.log('total', Total);
console.log('subTotal',SubTotal);
console.log('productData', productData);

  return (
    <>
      <Content
      style={{
       
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        Width: 800, 
      }}
      >
        <div className="logo">
          <h1>Cập Nhật Thông Tin Đơn Hàng</h1>
        </div>
        <nav>
          <ul>
            <li className="fs16">
              <Link to="/admin/invoice" className="home-link">
                Quay lại
              </Link>
            </li>
          </ul>
        </nav>
        <br />

        <h2 className='fs16'>Thông tin đơn hàng</h2>

        {dataLoaded ? (
          <Form
            form={form}
            name="productTypeForm"
            layout="vertical"
            style={{ marginTop: 20, fontWeight: 700, fontSize: '16px' }}
          >
            <Form.Item
              label="Địa chỉ giao hàng"
              name="shippingAddress"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ giao hàng!' }]}
            >
              <Input value={Invoice.shippingAddress} className='input-add' onChange={(e) => handleChange('shippingAddress', e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Số điện thoại người nhận"
              name="shippingPhone"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại người nhận!' }]}
            >
              <Input value={Invoice.shippingPhone} className='input-add' onChange={(e) => handleChange('shippingPhone', e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Phương thức thanh toán"
              name="paymentMethod"
              rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
            >
              <Select
                value={Invoice.payId}
                className='select-add'
                onChange={(value) => handleChange('payId', value)}
              >
                {PaymentMethod.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.payType}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Trạng thái đơn hàng"
              name="orderStatus"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái đơn hàng!' }]}
            >
              <Select
                value={Invoice.orderStatusId}
                className='select-add'
                onChange={(value) => handleChange('orderStatusId', value)}
              >
                {OrderStatus.map(status => (
                  Checkorder === 3 ? 
                    Checkorder <= status.id && status.id < 5 && 
                    <Option key={status.id} value={status.id}>{status.name}</Option>
                  : 
                    <Option key={status.id} value={status.id}>{status.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <div style={{ textAlign: 'center' }}>
                <Button type="primary" className='btn-add' onClick={handleEditInvoice}>
                  Cập nhật
                </Button>
              </div>
            </Form.Item>
          </Form>
        ) : (
          <p>Loading...</p>
        )}

        {Checkorder < 3 &&
        <>
        <h3 className='fs16'>Thông tin sản phẩm</h3>

        <Table columns={productColumns} dataSource={productData} pagination={false} />
        <br/>
        <div style={{ padding: '10px',  textAlign: 'right'}}>
        <h3 className='fs16' style={{color:'red', marginBottom:'5px'}}>Tổng tiền hàng : {formattedSubTotal} </h3>
        <h3 className='fs16' style={{color:'red'}}>Tổng tiền thanh toán : {formattedTotal} </h3>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Button type="primary" className='btn-add' onClick={handleEditInvoiceDetail}>
            Cập nhật
          </Button>
        </div>
        </>
        }
        <DeleteModal
visible = {showDelete}
handleCancel = {handleCloseDelete}
handleDelete = {handleDelete}
name = {SelectedProductData.name}
/>

<NotificationModal
visible = {ShowModal}
 handleCancel = {handleCloseNotification}
 notificationstr = {Notificationstr}
 status = {status}
/>

<MessageModal
     visible = {ShowMessageModal}
      handleCancel = {handleCloseMessageModal}
      notificationstr = {Notificationstr}
   />
      </Content>
    </>
  );
};

export default InvoiceAdminEdit;
