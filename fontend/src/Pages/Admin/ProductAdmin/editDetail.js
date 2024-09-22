import { Layout, Form, Input, Button, theme, Collapse, Select  } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient, { baseURL } from '../../../Components/Other/axiosClient';
import { useEffect, useState } from 'react';

import NotificationModal from '../../../Components/Other/NotificationModal';
import ErrorModal from '../../../Components/Other/ErrorModal';
import { number } from 'prop-types';
import Product from './Product';

const { Panel } = Collapse;
const { Content } = Layout;
const { Option } = Select;

const ProductDetailEdit = () => {
    var {id} = useParams();
    const [form] = Form.useForm();
    const { colorBgContainer, borderRadiusLG } = theme.useToken();
  const [addSuccess, setAddSuccess] = useState(false);
  const [HiddenSpecificationBtn, setHiddenSpecificationBtn] = useState(true);
    const [defaultMemory, setDefaultMemory] = useState('Chọn dung lượng bộ nhớ');
    const [defaultColor, setDefaultColor] = useState('Chọn màu');
    const [hiddenChangeMainImage, setHiddenChangeMainImage] = useState(true);
    const [status, setStatus] = useState(false);
    const [ShowModal, setShowModal] = useState(false);
    const [ShowModalE, setShowModalE] = useState(false);
    const [Notificationstr, setNotificationstr] = useState('');
    const [Errorstr, setErrorstr] = useState('');
    const [ProductId, setProductId]  = useState(0);
    const [Color, setColor] = useState([]);
    const [Memory,setMemory] = useState([]);
  
    const [ProductDetail , setProductDetail] =useState({});
      const navigate = useNavigate();
      useEffect(() => {
        axiosClient.get(`/ProductDetails/${id}`)
        .then(res => {
            const productDetaildata  = res.data;
            setProductDetail(res.data)
            form.setFieldsValue({
                UnitPrice: productDetaildata.unitPrice,
                PurchasePrice : productDetaildata.purchasePrice,
                MemoryandStorageId: productDetaildata.memoryandStorageId,
                ColorId: productDetaildata.colorId,
                Quantity: productDetaildata.quantity
            });

        });
        

        axiosClient.get(`/Colors`)
        .then(res => {
          setColor(res.data)
        });
    
        axiosClient.get('/MemoryandStorages')
        .then(res => { setMemory(res.data)});
        console.log('productDetail', ProductDetail);
    
      } , [id, form]);
      const handleCloseNotification = () => {
        setShowModal(false)
        navigate('/admin');
      };
      const handleCloseErrorModal = () => setShowModalE(false);

      const onFinish = (values) => {
        console.log('Received values:', values);
        // Xử lý logic khi người dùng gửi form
      };
      const handleChangeDetail = (name, value) => {
    
        // Kiểm tra xem trường hiện tại có phải là một trong các trường cần kiểm tra không
    if (['UnitPrice', 'PurchasePrice', 'Quantity'].includes(name)) {
      // Chuyển đổi giá trị thành số nguyên
      const intValue = parseInt(value, 10);
  
      // Kiểm tra xem giá trị có phải là số nguyên dương hay không
      if (!isNaN(intValue) && intValue > 0) {
        setProductDetail(prevProduct => ({
          ...prevProduct,
          [name]: intValue
        }));
      } else {
        // Xóa giá trị không hợp lệ
        setProductDetail(prevProduct => ({
          ...prevProduct,
          [name]: ''
        }));
      }
    } else {
      // Đối với các trường khác, chỉ cần cập nhật giá trị
      setProductDetail(prevProduct => ({
        ...prevProduct,
        [name]: value
      }));
    }
    };
    const [imageDetail, setimageDetail] = useState(null);
    const handleFileChange = (e) => {
     
        const file = e.target.files[0];
        if (file) {
            setimageDetail(file);
        }
        setHiddenChangeMainImage(false)
      };
      const handleClick = () => {
        document.getElementById('file-input').click();
      };
   
      const handelSubmitDetail = () =>{
        if (ProductDetail.colorId === 0  || !ProductDetail.memoryandStorageId === 0  || ProductDetail.unitPrice === 0 ||
          ProductDetail.unitPrice === undefined ||  ProductDetail.unitPrice === null|| ProductDetail.purchasePrice === 0  
          ||  ProductDetail.purchasePrice === undefined ||  ProductDetail.purchasePrice === null|| ProductDetail.quantity === 0
        || ProductDetail.quantity === undefined || ProductDetail.quantity === null ) {
          setErrorstr('Vui lòng nhập đầy đủ thông tin')
          setShowModalE(true)
          setStatus(false);
         } 
         else
        
          {
            const ProductDetailData  =  new FormData()
            ProductDetailData.append("Id",id);
            ProductDetailData.append("ProductId",ProductDetail.productId);
            ProductDetailData.append("ColorId",ProductDetail.colorId);
            ProductDetailData.append("MemoryandStorageId",ProductDetail.memoryandStorageId);
            ProductDetailData.append("UnitPrice",ProductDetail.unitPrice);
            ProductDetailData.append("PurchasePrice",ProductDetail.purchasePrice);
            ProductDetailData.append("Quantity",ProductDetail.quantity);
          if(imageDetail)
          {
            ProductDetailData.append("FileImageByColor",imageDetail);
          }
           
        
         
            axiosClient.put(`/ProductDetails/${id}`,ProductDetailData,{
              headers: {
                 
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          })
          .then(response => {
            
        
            setNotificationstr('cập nhật chi tiết sản phẩm thành công!') 
            setShowModal(true);
            setStatus(true);
           
          setimageDetail(null);
          setAddSuccess(true);
          form.resetFields();
        
        
        
        })
        .catch(error => {
            setNotificationstr('cập nhật chi tiết sản phẩm thất bại!') 
            setShowModal(true);
            setStatus(false);
            console.log(error.response.data);
        });
        ProductDetailData.forEach((value,key) => {
          console.log(`${key}: ${value}`);
        })
          }
     
      }
console.log('productDetaildata', ProductDetail);

    return (
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
          <h1 >Cập Nhật Chi Tiết Sản Phẩm Mới</h1>
        </div>
        <nav>
          <ul style={{display:'flex'}}>
            <li className="fs16" style={{marginRight:'10px'}}>
              <Link to="/admin" className="home-link">
                Quay lại
              </Link>
            </li>
          </ul>
        </nav>
     
       <div>
          
          <div className='display'>
          <div className='left-side-add'>
          <Form
          name="ProductDetailAdd"
          onFinish={onFinish}
          form={form}
          layout="vertical"
          initialValues={{
           
          }}
          style={{ marginTop:20 ,fontWeight:700, fontSize:'16px'}}
        >
      
          <Form.Item
            label="Giá bán"
            name="UnitPrice"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhà cung cấp!' },{
              type: number,
              min:1,
              message:'Số lượng phải là số nguyên dương'
  
            }]}
          >
            <Input type='number' value={ProductDetail.unitPrice} className='input-add'  onChange={(e) => handleChangeDetail('unitPrice',e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
          </Form.Item>
    
          <Form.Item
          label="Giá nhập"
          name="PurchasePrice"
          rules={[{ required: true, message: 'Vui lòng nhập email của nhà cung cấp!' }]}
        >
          <Input type='number' value={ProductDetail.purchasePrice} className='input-add' onChange={(e) => handleChangeDetail('purchasePrice' ,e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
        </Form.Item>
    
        <Form.Item
            label="Số lượng"
            name="Quantity"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ của cung cấp!' }, {
              type: number,
              min:1,
              message:'Số lượng phải là số nguyên dương'
  
            }]}
        >
            <Input  type='number' value={ProductDetail.quantity} className='input-add'  onChange={(e) => handleChangeDetail( 'quantity',e.target.value )}/> {/* Sử dụng onChange để cập nhật state */}
      </Form.Item>
    
      
        
      <Form.Item
            label="Màu"
            name="ColorId"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của cung cấp!' }]}
        >
        <Select
        id='select-color'
        defaultValue= {ProductDetail.colorId}
        style={{
          width: '100%',
          height: 40
        }}
        onChange={(value) => handleChangeDetail( 'colorId', value)}
      >
    
        {Color.map(item => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
      </Form.Item>
      <Form.Item
      label="Bộ nhớ"
      name="MemoryandStorageId"
      rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của cung cấp!' }]}
      
    >
    <Select
    id='select-memory'
    defaultValue={ProductDetail.memoryandStorageId}
    style={{
      width: '100%',
      height: 40
    }}
    onChange={(value) =>{
      handleChangeDetail( 'memoryandStorageId', value )
      if(addSuccess)
        {
          value = '';
          setAddSuccess(false);
        }
    } }
    >
    <Option value={null}>Chọn dung lượng bộ nhớ</Option>
    { Memory.map(item => (
      <Option key={item.id} value={item.id}>
        {item.ram} - {item.storagecapacity}
      </Option>
    ))}
    </Select>
    </Form.Item>
    
    
    
  
    <br/>
          <Form.Item>
            <div style={{ textAlign: 'center' }}>
              <Button type="primary" className='btn-add' onClick={handelSubmitDetail}>
                Cập nhật 
              </Button>
            </div>
          </Form.Item>
        </Form>
     
          </div>
          <div className='right-side-add'>
          <p><strong>Ảnh đại diện của sản phẩm</strong></p>
          <br/>
          <div className="image-container">
          <input 
            type="file" 
            id="file-input" 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
          />
          {imageDetail ? (
            <img 
              src={URL.createObjectURL(imageDetail)} 
              alt="Uploaded" 
              style={{ width: '250px' }} 
            />
          ) : (
            <img 
              src={`${baseURL}/Image/${ProductDetail.mainUrl}`} 
              alt="Product" 
              style={{ width: '250px' }} 
            />
          )}
          <button 
            className="change-button" 
            onClick={handleClick}
          >
            Thay đổi
          </button>
        </div>
        <div>
   
        <div>
      
       
    
       
    </div>
    </div>
    
         </div>
         </div>
 
       </div>
       <NotificationModal
       visible = {ShowModal}
        handleCancel = {handleCloseNotification}
        notificationstr = {Notificationstr}
        status = {status}
     />
     <ErrorModal
     visible = {ShowModalE}
        handleCancel = {handleCloseErrorModal}
        notificationstr = {Errorstr}
        status = {status}
     />
     
      </Content>   
     );
}
 
export default ProductDetailEdit;