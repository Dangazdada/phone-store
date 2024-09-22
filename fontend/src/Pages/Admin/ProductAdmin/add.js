// import '/src/Pages/Admin/index.css';
import { Layout, Form, Input, Button, Checkbox, theme, Image, Upload, message, Collapse, Select  } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../../Components/Other/axiosClient';
import { useEffect, useState } from 'react';
import { PlusOutlined, EyeOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import NotificationModal from '../../../Components/Other/NotificationModal';
import ErrorModal from '../../../Components/Other/ErrorModal';
import { number } from 'prop-types';


const { Panel } = Collapse;
const { Content } = Layout;
const { Option } = Select;


const ProductAdd = () => {
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
  const [ProductType, setProductType] = useState([]);
  const [Color, setColor] = useState([]);
  const [Manufacher, setManufacher] = useState([]);
  const [Supplier, setSupplier] = useState([]);
  const [Memory,setMemory] = useState([]);
  const [Product, setProduct] = useState({
    SKU : '',
    name: '' ,
    Description: '',
    ColorId: 0,
    ProductTypeId: 0,
    SupplierId: 0,
    ManufacturerId: 0,
  });
  const [ProductDetail , setProductDetail] =useState({
    ColorId: 0,
    MemoryandStorageId: 0,
    UnitPrice: 0,
    PurchasePrice: 0,
    Quantity: 1,

  });
  
  const [errors, setErrors] = useState({}); // State to store errors for each field

  const navigate = useNavigate();
  useEffect(() => {
    axiosClient.get(`/Colors`)
    .then(res => {
      setColor(res.data)
    });
    axiosClient.get('/Manufacturers')
    .then(res => {
      setManufacher(res.data);
    });
    axiosClient.get('/Suppliers')
    .then(res => { setSupplier(res.data)});

    axiosClient.get('/ProductTypes')
    .then(res => { setProductType(res.data)});

    axiosClient.get('/MemoryandStorages')
    .then(res => { setMemory(res.data)});

  } , []);
  const handleCloseNotification = () => setShowModal(false);
  const handleCloseErrorModal = () => setShowModalE(false);


  const onFinish = (values) => {
    console.log('Received values:', values);
    // Xử lý logic khi người dùng gửi form
  };
  const handleChange = (name, value) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
    setErrors({ ...errors, [name]: undefined });
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

  
  const [image, setImage] = useState(null);
  const [imageDetail, setimageDetail] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  const handleFileChangeDetail = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimageDetail(file);
    }
  };

  const [images, setImages] = useState([]);

  const handleFilesChange = (e) => {
    const fileList = e.target.files;
    const newImages = [...images];
    for (let i = 0; i < fileList.length; i++) {
      newImages.push(fileList[i]);
    }
    setImages(newImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
 
  const validateNumber = (rule, value) => {
    if (!value || isNaN(value)) {
      return Promise.reject('Giá trị phải là số!');
    }
    return Promise.resolve();
  };
  
  const handelSubmit = () =>{
    

    // Validation logic using if-else statement
     // Validate all fields
     const newErrors = {};
     if (!Product.name || !Product.SKU || !Product.Description || Product.ProductTypeId === 0 
      || Product.ManufacturerId === 0 || Product.SupplierId === 0 ) {
      setErrorstr('Vui lòng nhập đầy đủ thông tin')
      setShowModalE(true)
      setStatus(false);
     }
     else 
     if(!image)
      {
        setErrorstr('Vui lòng chọn ảnh đại diện cho sản phẩm')
        setShowModalE(true)
        setStatus(false);
      }else
      if(images.length <= 0)
        {
          setErrorstr('Vui lòng chọn ảnh mô tả cho sản phẩm')
          setShowModalE(true)
          setStatus(false);
        }
    
     
 else{
  const ProductData  =  new FormData()
  

    ProductData.append("SKU",Product.SKU);
    ProductData.append("Name",Product.name);
    ProductData.append("Description",Product.Description);
    ProductData.append("ProductTypeId",Product.ProductTypeId);
    ProductData.append("ColorId",Product.ColorId);
    ProductData.append("ManufacturerId",Product.ManufacturerId);
    ProductData.append("SupplierId",Product.SupplierId);
    ProductData.append("ImageMain",image);
   for ( let i = 0; i< images.length;i++)
    {
      ProductData.append(`ImageFiles`, images[i])
    }
    ProductData.append("Status", true);


 
    axiosClient.post(`/Products`,ProductData,{
      headers: {
         
          'Content-Type': 'application/x-www-form-urlencoded'
      }
  })
  .then(response => {
    

    setProductId( response.data.id); 
    setNotificationstr('thêm sản phẩm thành công!') 
    setShowModal(true);
    setStatus(true);
    setShowDetail(false);
    setHiddenSpecificationBtn(false)

})
.catch(error => {
    setNotificationstr('thêm sản phẩm thất bại!') 
    setShowModal(true);
    setStatus(false);
    console.log(error.response.data);
    setShowDetail(true);
});
ProductData.forEach((value,key) => {
  console.log(`${key}: ${value}`);
})

 }
    

  }

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
        ProductDetailData.append("Id",ProductId);
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
        <h1 >Thêm Sản Phẩm Mới</h1>
      </div>
      <nav>
        <ul style={{display:'flex'}}>
          <li className="fs16" style={{marginRight:'10px'}}>
            <Link to="/admin" className="home-link">
              Quay lại
            </Link>
          </li>
          <li className="fs16"  style={{marginRight:'10px'}} >
            <Link to= {`/admin/product/addspecification/${ProductId}`} disabled = {HiddenSpecificationBtn} className="home-link">
              Thêm thông số kỹ thuật
            </Link>
          </li>
          <li className="fs16"  >
          <Link to= {`/admin/promotion/add/${ProductId}`}  disabled = {HiddenSpecificationBtn} className="home-link">
            Thêm khuyến mãi
          </Link>
        </li>
        </ul>
      </nav>
     <div className='display'>
      <div className='left-side-add'>
      <Form
      name="productTypeForm"
      onFinish={handelSubmit}
      layout="vertical"
      initialValues={{
       
      }}
     
      style={{ marginTop:20 ,fontWeight:700, fontSize:'16px'}}

    >
    <Collapse > 
      <Panel header="Thông tin sản phẩm " key="1" className='title-panel' >
    
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên nhà cung cấp!' }]}
          validateStatus={errors.name ? 'error' : undefined} // Use validateStatus for visual feedback
          help={errors.name} // Display error message
          
        >
          <Input value={Product.name}  placeholder='Tên sản phẩm' onChange={(e) => handleChange('name',e.target.value)} /> 
        </Form.Item>

        <Form.Item
        label="Mã sản phẩm"
        name="SKU"
        rules={[{ required: true, message: 'Vui lòng mã sản phẩm!' }]}
      >
        <Input value={Product.SKU} placeholder='Mã sản phẩm'  onChange={(e) => handleChange('SKU' ,e.target.value)} /> 
      </Form.Item>

      <Form.Item
          label="Mô tả"
          name="Description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
      >
          <Input value={Product.Description} placeholder='Mô tả'  onChange={(e) => handleChange( 'Description',e.target.value )}/> 
    </Form.Item>

    <Form.Item
          label="Loại điện thoại "
          name="ProductTypeId"
          rules={[{ required: true, message: 'Vui lòng chọn loại điện thoại!' }]}
      >
      <Select
            defaultValue='Chọn loại điện thoại'
            style={{
              width: '100%',
              height: 40
            }}
            onChange={(value) => handleChange(  'ProductTypeId', value)}
          >
            {ProductType.map(item => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>

    </Form.Item>
    
    <Form.Item
    label="Nhà sản xuất"
    name="ManufacturerId"
    rules={[{ required: true, message: 'Vui lòng chọn nhà sản xuất!' }]}
  >
  <Select
  defaultValue='Chọn nhà sản xuất'
  style={{
    width: '100%',
    height: 40
  }}
  onChange={(value) => handleChange( 'ManufacturerId', value )}
  >
  {Manufacher.map(item => (
    <Option key={item.id} value={item.id}>
      {item.name}
    </Option>
  ))}
  </Select>
  </Form.Item>

  <Form.Item
    label="Nhà cung cấp"
    name="SupplierId"
    rules={[{ required: true, message: 'Vui lòng chọn cung cấp!' }]}
  >
  <Select
  defaultValue='Chọn nhà cung cấp'
  style={{
    width: '100%',
    height: 40
  }}
  onChange={(value) => handleChange( 'SupplierId', value )}
  >
  {Supplier.map(item => (
    <Option key={item.id} value={item.id}>
      {item.name}
    </Option>
  ))}
  </Select>
  </Form.Item>

  </Panel>
  </Collapse>
  <br/>
        <Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" className='btn-add' onClick={handelSubmit}>
              Thêm mới sản phẩm 
            </Button>
          </div>
        </Form.Item>
    </Form>
 
      </div>
      <div className='right-side-add'>
      <p><strong>Chọn ảnh đại diện cho sản phẩm</strong></p>
      <div>
      <input type="file" onChange={handleFileChange} />
      {image && <img src={URL.createObjectURL(image)} alt="Uploaded" style={{width:'250px'}} />}
    </div>
    <div>
  
    <p><strong>Chọn ảnh khác cho sản phẩm cho sản phẩm</strong></p>

    <div>
  <input type="file" onChange={handleFilesChange} multiple />
  <p>Số lượng ảnh đã chọn: {images.length}</p>
  <div className="image-grid">
    {images.map((image, index) => (
      <div key={index} className="image-container">
        <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
        <button className="delete-button" onClick={() => handleRemoveImage(index)}>
          Remove
        </button>
      </div>
    ))}
  </div>
</div>
</div>
</div>

     </div>
     <div>
        <Collapse>
        <Panel header="Thông tin chiêt tiết sản phẩm " key="2" className='title-panel' disabled={showDetail}>
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


};

export default ProductAdd;


  