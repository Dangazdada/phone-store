import { Layout, Form, Input, Button, Checkbox, theme, Image, Upload, message, Collapse, Select  } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../Components/Other/axiosClient';
import { useEffect, useState } from 'react';
import { PlusOutlined, EyeOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import NotificationModal from '../../../Components/Other/NotificationModal';
import ErrorModal from '../../../Components/Other/ErrorModal';
import { number } from 'prop-types';

const { Panel } = Collapse;
const { Content } = Layout;
const { Option } = Select;

const ProductDetailAdd = () => {
    var {id} = useParams();
    const [form] = Form.useForm();
    const { colorBgContainer, borderRadiusLG } = theme.useToken();
  const [addSuccess, setAddSuccess] = useState(false);
  const [HiddenSpecificationBtn, setHiddenSpecificationBtn] = useState(true);
    const [defaultMemory, setDefaultMemory] = useState('Chọn dung lượng bộ nhớ');
    const [defaultColor, setDefaultColor] = useState('Chọn màu');
   const [showDetail, setShowDetail] = useState(true);
    const [status, setStatus] = useState(false);
    const [ShowModal, setShowModal] = useState(false);
    const [ShowModalE, setShowModalE] = useState(false);
    const [Notificationstr, setNotificationstr] = useState('');
    const [Errorstr, setErrorstr] = useState('');
    const [ProductId, setProductId]  = useState(0);
    const [Color, setColor] = useState([]);
    const [Manufacher, setManufacher] = useState([]);
    const [Supplier, setSupplier] = useState([]);
    const [Memory,setMemory] = useState([]);
  
    const [ProductDetail , setProductDetail] =useState({
        ColorId: 0,
        MemoryandStorageId: 0,
        UnitPrice: 0,
        PurchasePrice: 0,
        Quantity: 1,
    
      });
      const navigate = useNavigate();
      useEffect(() => {
        axiosClient.get(`/Colors`)
        .then(res => {
          setColor(res.data)
        });
    
        axiosClient.get('/MemoryandStorages')
        .then(res => { setMemory(res.data)});
    
      } , []);
      const handleCloseNotification = () => setShowModal(false);
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
    const handleFileChangeDetail = (e) => {
        const file = e.target.files[0];
        if (file) {
          setimageDetail(file);
        }
      };
      const handelSubmitDetail = () =>{
        if (ProductDetail.ColorId === 0 || !ProductDetail.MemoryandStorageId === 0  || ProductDetail.UnitPrice === 0 
          || ProductDetail.PurchasePrice === 0 || ProductDetail.Quantity === 0 ) {
          setErrorstr('Vui lòng nhập đầy đủ thông tin')
          setShowModalE(true)
          setStatus(false);
         } else
         if(!imageDetail)
          {
            setErrorstr('Vui lòng chọn ảnh đại diện cho sản phẩm')
            setShowModalE(true)
            setStatus(false);
          }
          else
          {
            const ProductDetailData  =  new FormData()
            ProductDetailData.append("Id",id);
            ProductDetailData.append("ColorId",ProductDetail.ColorId);
            ProductDetailData.append("MemoryandStorageId",ProductDetail.MemoryandStorageId);
            ProductDetailData.append("UnitPrice",ProductDetail.UnitPrice);
            ProductDetailData.append("PurchasePrice",ProductDetail.PurchasePrice);
            ProductDetailData.append("Quantity",ProductDetail.Quantity);
          
            ProductDetailData.append("FileImageByColor",imageDetail);
           
        
         
            axiosClient.post(`/ProductDetails`,ProductDetailData,{
              headers: {
                 
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          })
          .then(response => {
            
        
            setNotificationstr('thêm chi tiết sản phẩm thành công!') 
            setShowModal(true);
            setStatus(true);
            setProductDetail({ ColorId: 0,
              MemoryandStorageId: 0,
              UnitPrice: 0,
              PurchasePrice: 0,
              Quantity: 1,
          });
          setimageDetail(null);
          setAddSuccess(true);
          form.resetFields();
        
        
        
        })
        .catch(error => {
            setNotificationstr('thêm chi tiết sản phẩm thất bại!') 
            setShowModal(true);
            setStatus(false);
            console.log(error.response.data);
        });
        ProductDetailData.forEach((value,key) => {
          console.log(`${key}: ${value}`);
        })
          }
     
      }
    console.log('productdetail', ProductDetail);    

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
          <h1 >Thêm Chi Tiết Sản Phẩm Mới</h1>
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
          <Collapse>
          <Panel header="Thông tin chiêt tiết sản phẩm " key="1 " className='title-panel' >
          <div className='display'>
          <div className='left-side-add'>
          <Form
          name="ProductDetailAdd"
          onFinish={onFinish}
          form={form}
          layout="vertical"
          initialValues={{
           
          }}
          style={{ marginTop: 20 }}
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
            <Input type='number' value={ProductDetail.UnitPrice}  onChange={(e) => handleChangeDetail('UnitPrice',e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
          </Form.Item>
    
          <Form.Item
          label="Giá nhập"
          name="PurchasePrice"
          rules={[{ required: true, message: 'Vui lòng nhập email của nhà cung cấp!' }]}
        >
          <Input type='number' value={ProductDetail.PurchasePrice} className='input-add' onChange={(e) => handleChangeDetail('PurchasePrice' ,e.target.value)} /> {/* Sử dụng onChange để cập nhật state */}
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
            <Input  type='number' value={ProductDetail.Quantity} className='input-add'  onChange={(e) => handleChangeDetail( 'Quantity',e.target.value )}/> {/* Sử dụng onChange để cập nhật state */}
      </Form.Item>
    
      
        
      <Form.Item
            label="Màu"
            name="ColorId"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của cung cấp!' }]}
        >
        <Select
        id='select-color'
        defaultValue= {defaultColor}
        style={{
          width: '100%',
          height: 40
        }}
        onChange={(value) => handleChangeDetail( 'ColorId', value)}
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
    defaultValue={defaultMemory}
    style={{
      width: '100%',
      height: 40
    }}
    onChange={(value) =>{
      handleChangeDetail( 'MemoryandStorageId', value )
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
                Thêm CT sản phẩm
              </Button>
            </div>
          </Form.Item>
        </Form>
     
          </div>
          <div className='right-side-add'>
          <p><strong>Chọn ảnh đại diện cho sản phẩm</strong></p>
          <div>
          <input type="file" onChange={handleFileChangeDetail} />
          {imageDetail && <img src={URL.createObjectURL(imageDetail)} alt="Uploaded" style={{width:'250px'}} />}
        </div>
        <div>
      
       
    
       
    </div>
    </div>
    
         </div>
          </Panel>
          </Collapse>
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
 
export default ProductDetailAdd;