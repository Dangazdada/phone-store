// import '/src/Pages/Admin/index.css';
import { Layout, Form, Input, Button, Checkbox, theme, Image, Upload, message, InputNumber, Select  } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient, { baseURL } from '../../../Components/Other/axiosClient';
import { useEffect, useState } from 'react';
import { PlusOutlined, EyeOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { GrNewWindow } from 'react-icons/gr';
import NotificationModal from '../../../Components/Other/NotificationModal';
import { toast, ToastContainer } from 'react-toastify';



const { Content } = Layout;
const { Option } = Select;


const ProductEdit = () => {
    var {id} = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { colorBgContainer, borderRadiusLG } = theme.useToken();

    const [ShowModal, setShowModal] = useState(false);
    const [Notificationstr, setNotificationstr] = useState('');
    const [status, setStatus] = useState(false);
    const [hiddenAddnImageBtn, sethiddenAddnImageBtn] = useState(true);
    const [hidenChangeInfoBtn, sethidenChangeInfoBtn] = useState(true);
    const [hiddenChangeMainImage, setHiddenChangeMainImage] = useState(true);
    const [Product, setProduct] = useState({});
    const [Manufacher, setManufacher] = useState([]);
    const [Supplier, setSupplier] = useState([]);
    const [ProductType, setProductType] = useState([]);
    const [Specification, setSpecification] = useState({});
    const [temporaryImages, setTemporaryImages] = useState({}); // list urls file temporary
    const [imagechangeds ,setImagechangeds] = useState([]) // list files changed
    const [images, setImages] = useState([]); // list new files
    const [updateImages, setUpdateImages] = useState([]);
    const [iddelete, setIddelete] = useState([]);
  
//   const [img, setimg] = useState();
  


  useEffect(() => {
    axiosClient.get('/Manufacturers')
    .then(res => {
      setManufacher(res.data);
    });
    axiosClient.get('/Suppliers')
    .then(res => { setSupplier(res.data)});
    axiosClient.get('/Specifications')
    .then(res => {
      if (res.status === 200) {
        const data = res.data;
        console.log('data sPE', data);
        if (Array.isArray(data)) {
          const specification = data.find(a => a.productId == id);
          setSpecification(specification);
          console.log('specification data:', data);
          console.log('id', id);
          console.log('productid',data[0].productId);
        } else {
          console.error('Unexpected response data format:', data);
        }
      } else {
        console.error('Unexpected response status:', res.status);
      }
    })
    .catch(error => {
      console.error('Error fetching specifications:', error);
    });
    axiosClient.get('/ProductTypes')
    .then(res => { setProductType(res.data)});
    axiosClient.get(`/Products/${id}`)
      .then(res => {
        const productData = res.data[0];
        setProduct(productData);
        // set data for form
        form.setFieldsValue({
          name: productData.name,
          sku: productData.sku,
          description: productData.description,
          price: productData.price,
          productTypeId: productData.productTypeId,
          ColorId: productData.colorId,
          manufacturerId: productData.manufacturerId,
          supplierId: productData.supplierId
        });
      })
      
  }, [id, form, images]);



const handleCloseNotification = () => setShowModal(false);


  const handleChange = (name, value) => {
    sethidenChangeInfoBtn(false);
    setProduct(prev => ({ ...prev, [name]: value }));
  };


  
  const [image, setImage] = useState(null); // new main file

  const handleFileChange = (e) => {
     
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
    setHiddenChangeMainImage(false)
  };

  const handleFilesChange = (e) => {
    sethiddenAddnImageBtn(false);
    const fileList = e.target.files;
    const newImages = [...images];
    for (let i = 0; i < fileList.length; i++) {
      newImages.push(fileList[i]);
    }
    setImages(newImages);
  };

  const handleChangeImage = (index) => {
    document.getElementById(`file-input-${index}`).click();
  };

  const handleClick = () => {
    document.getElementById('file-input').click();
  };

  const handleFileChange1 = (index, event, idimg , url) => {
    if (!event || !event.target || !event.target.files) {
      console.error('Event hoặc event.target không tồn tại');
      return;
    }
    const file = event.target.files[0];
    if (file) {
      setTemporaryImages(prev => ({
        ...prev,
        [index]: URL.createObjectURL(file)
      }));
      // Lưu ảnh đã thay đổi vào imagechangeds
    setImagechangeds(prev => {
      const updated = [...prev];
      const existingIndex = updated.findIndex(item => item.index === index);
      if (existingIndex !== -1) {
        // Thay thế ảnh cũ
        updated[existingIndex] = { index, file };
      } else {
        // Thêm ảnh mới
        updated.push({ index, file });
      }
      return updated;
    });
    handleUpdateImagesChange(idimg, file.name)
    }
    
  };


  const handleDelete = (id, index) => {
    const selectedImg = Product.images.find(a => a.imageId === id);
      if (!selectedImg) return;
      setTemporaryImages(prev => {
        const updated = { ...prev };
        delete updated[index];
        return updated;
      });

      // cập nhật lại dữ liệu sao khi xóa
      const updatedProduct = Product.images.filter(item => item.imageId !== id);
      setProduct(
        prevProduct => ({
          ...prevProduct, images: updatedProduct
        })
      );
      setImagechangeds(prev => prev.filter(item => item.index !== index));
      setIddelete( [...iddelete, id] );
      
      console.log('id', id);
  };

  const handleRemoveImage = (index, id) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  const handleUpdateImagesChange = (id, path) => {
    // Kiểm tra xem đối tượng đã tồn tại trong danh sách hay chưa
    const existingIndex = updateImages.findIndex(image => image.id === id);
    if (existingIndex !== -1) {
      // Nếu đã tồn tại, cập nhật đối tượng
      const updatedImages = [...updateImages];
      updatedImages[existingIndex] = { id, path };
      setUpdateImages(updatedImages);
    } else {
      // Nếu chưa tồn tại, thêm đối tượng mới vào danh sách
      setUpdateImages(prevImages => [...prevImages, { id, path }]);
    }
    
  };
  const handleSubmitMainImage = () =>{
      const ImageData = new FormData()
      ImageData.append("ImageMain", image)
      axiosClient.put(`/Products/${id}/ChangMainImage`,ImageData, {
        headers: {
         
          'Content-Type': 'application/x-www-form-urlencoded'
      }
      })
      .then(() => {
        setHiddenChangeMainImage(true);
        toast.success('Cập nhật ảnh đại diện thành công')

  })
      console.log('mainfile' );
      ImageData.forEach((value, key)=>
      {
        console.log(`${key}: ${value}`);
      })
      console.log('image', image);
  };
  const handleUpdateImageChange = () =>{
    const UpdateData = new FormData()
    UpdateData.append("id", id);
    if(iddelete)
      {
        iddelete.forEach((id)=> {
          UpdateData.append("deleteId", id);
        });
      }
      if (updateImages) {
        // Chuyển đổi danh sách thành JSON chuỗi
        UpdateData.append("UpdateImagesJson", JSON.stringify(updateImages));
    }
      if(imagechangeds)
        {
          for(let i = 0; i < imagechangeds.length; i++)
            {
              UpdateData.append("ImageFilesChange", imagechangeds[i].file)
            }
        }
     
    axiosClient.put(`/Products/${id}/ChangListImage`,UpdateData, {
      headers: {
       
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    })
    .then((res) => {
      toast.success('Cập nhật ảnh mô tả thành công');
      console.log('Update image success', res.data);
    })
    .catch((error) => {
      console.log('Update image failed', error.data);
      toast.error('Cập nhật ảnh mô tả thất bại');

    })

    setIddelete([])
    setUpdateImages([])
    setImagechangeds([])
    console.log('mainfile' );
    UpdateData.forEach((value, key)=>
    {
      console.log(`${key}: ${value}`);
    })
    console.log('image', image);
};

  const handelAddImages = () =>{
    const ImageDataAdd  =  new FormData()
    ImageDataAdd.append("id",id)
    ImageDataAdd.append("name", (Product.name));
    if(images) {
      console.log(images); // Kiểm tra giá trị của images
      for(let i = 0; i < images.length; i++) {
       
        ImageDataAdd.append("ImageFilesAddChange", images[i]);
      }
    } else {
      console.log("images is undefined or null");
    }
    

 
    axiosClient.put(`/Products/${id}/AddImages`,ImageDataAdd,  {
      headers: {
       
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    })
  .then(response => {
   setImages(null)
   toast.success('Cập nhật ảnh thành công');
  
})
.catch(error => {
    console.log(error.response.data);
   
    toast.error('Cập nhật ảnh phẩm thất bại')

});
ImageDataAdd.forEach((value,key) => {
   console.log(`${key}: ${value}`);
 })
  }
  const handelSubmit = () => {
    
    axiosClient.put(`/Products/${id}`,Product ,  {
      headers: {
       
        'Content-Type': 'application/json'
    }
    })
    .then(() => {
      sethidenChangeInfoBtn(true);
      toast.success('Cập nhật thông tin sản phẩm thành công');
    }
  )
    .catch(error => {console.log(error.response.data);
      toast.error('Cập nhật thông tin sản phẩm thất bại');

    });

  }
  console.log('product', Product);
  console.log('specification', Specification);

//  console.log('manufer', Manufacher);
// console.log('producttype', ProductType);
// console.log('supplier', Supplier);

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
        <h1 >Cập Nhật Thông Tin Sản Phẩm</h1>
      </div>
      <nav>
        <ul style={{display:'flex'}}>
          <li className="fs16">
            <Link to="/admin" className="home-link">
              Quay lại
            </Link>
          </li>

          <li className="fs16" style={{marginLeft:'20px'}} >
          
          { Specification ? 
            (<Link to={`/admin/product/editspecification/${id}`} className="home-link" >
              Cập nhật thông số kỹ thuật
            </Link>) 
            : 
            (<Link to={`/admin/product/addspecification/${id}`} className="home-link" >
            Thêm thông số kỹ thuật
          </Link>)
          }
            
          </li>

          <li className="fs16" style={{marginLeft:'20px'}} >
            <Link to={`/admin/promotion/${id}`} className="home-link" >
              Cập nhật khuyến mãi
            </Link>
          </li>

        </ul>
      </nav>

       <div className='display'>
      <div className='left-side-add'>
      <Form
        form={form}
        name="productTypeForm"
        onFinish={handelSubmit}
        layout="vertical"
        initialValues={{
          name: Product.name,
          SKU: Product.sku,
          Description: Product.description,
          Price: Product.price,
          ProductTypeId: Product.producttype,
          ColorId: Product.color,
          manufacturerId: Product.manufacturer,
          supplierId: Product.supplier  
        }}
        style={{ marginTop:20 ,fontWeight:700, fontSize:'16px'}}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên nhà cung cấp!' }]}
        >
          <Input value={Product.name} className='input-add' onChange={(e) => {handleChange("name",e.target.value)}} /> {/* Sử dụng onChange để cập nhật state */}
        </Form.Item>

        <Form.Item
        label="Mã sản phẩm"
        name="sku"
        rules={[{ required: true, message: 'Vui lòng nhập email của nhà cung cấp!' }]}
      >
        <Input value={Product.sku} className='input-add' onChange={(e) => {handleChange("sku",e.target.value)}} /> {/* Sử dụng onChange để cập nhật state */}
        </Form.Item>

        <Form.Item
            label="Mô tả"
            name="description"
          
        >
            <Input value={Product.description} className='input-add'  onChange={(e) => {handleChange("description",e.target.value)}} /> {/* Sử dụng onChange để cập nhật state */}
        </Form.Item>

        <Form.Item
              label="Loại sản phẩm"
              name="productTypeId"
          >
          <Select
        
          defaultValue=''
          style={{
            width: '100%',
            height: 40
          }}
          onChange={(value) => handleChange( 'productTypeId', value)}
        > {ProductType.map(item => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
        </Form.Item>
  
        <Form.Item
      label="Nhà sản xuất"
      name="manufacturerId"
    
      
      
    >
    <Select
      
    defaultValue=''
    style={{
      width: '100%',
      height: 40
    }}
    onChange={(value) => handleChange( 'manufacturerId', value)}
    > {Manufacher.map(item => (
    <Option key={item.id} value={item.id}>
      {item.name}
    </Option>
    ))}
    </Select>
        </Form.Item>

        <Form.Item
          label="Nhà cung cấp"
          name="supplierId"
        
        >
        <Select
              id='select-color'
              defaultValue=''
              style={{
                width: '100%',
                height: 40
              }}
              onChange={(value) => handleChange( 'supplierId', value)}
            > {Supplier.map(item => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>


        <Form.Item>
        <div style={{ textAlign: 'center' }}>
        <Button type="primary" className='btn-edit' disabled={hidenChangeInfoBtn} htmlType="submit">
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

              {image ? (
                <img 
                  src={URL.createObjectURL(image)} 
                  alt="Uploaded" 
                  style={{ width: '200px' }} 
                />
              ) : (
                <img 
                  src={`${baseURL}/Image/${Product.imgUrlMain}`} 
                  alt="Product" 
                  style={{ width: '200px' }} 
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
    <div style={{ textAlign: 'center' }}>
          <Button type="primary" disabled = { hiddenChangeMainImage} className='btn-edit-main-image' onClick={handleSubmitMainImage}>
            Cập nhật ảnh đại diện 
          </Button>
        </div>
  
    <p><strong>Danh sách ảnh của sản phẩm</strong></p>
    <br/>

    <div>
 
  
  <div className="image-grid">
  {Product.images && Product.images.map((image, index) => (
    <div key={index} className="image-container">
      <img 
        src={temporaryImages[index] ? temporaryImages[index] : `${baseURL}/Image/${image.imageUrl}`} 
        alt={`Image ${index}`} 
        style={{width:'150px'}}
      />
      <button 
        className="change-button" 
        onClick={() => handleChangeImage(index)}
      >
        Thay đổi
      </button>
      <button 
        className="delete-button" 
        onClick={() => handleDelete(image.imageId, index)}
      >
        Xóa
      </button>
      <input 
        type="file" 
        id={`file-input-${index}`} 
        style={{ display: 'none' }} 
        onChange={(event) => handleFileChange1(index, event,image.imageId, image.imageUrl )}
      />
    </div>
    
  ))}
  
</div>
<div style={{ textAlign: 'center' }}>
          <Button type="primary"  disabled = {updateImages.length > 0 || iddelete.length > 0 ? false : true  }className='btn-edit-main-image' onClick={handleUpdateImageChange}>
            Cập nhật danh sách ảnh
          </Button>
        </div>
<p><strong>Thêm ảnh mới</strong></p> 
<br/>

<input type="file" onChange={handleFilesChange} multiple />
  <p>Số lượng ảnh đã chọn: {images ? images.length : 0}</p>
  <br/>
  <div className="image-grid">
    {images ? images.map((image, index) => (
      <div key={index} className="image-container">
        <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
        <button className="delete-button" onClick={() => handleRemoveImage(index)}>
          Remove
        </button>
      </div>
    )) : ''}
    </div>
    <div style={{ textAlign: 'center' }}>
          <Button type="primary"   disabled= { hiddenAddnImageBtn} className='btn-edit-main-image' onClick={handelAddImages}>
            Thêm ảnh
          </Button>
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

     <ToastContainer
     position="top-center"
     pauseOnHover={false}
     autoClose={1500}
     theme={'dark'}
   />
    </Content>
  );
};

export default ProductEdit;


  