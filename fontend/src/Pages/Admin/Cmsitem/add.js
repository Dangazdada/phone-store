import {  Input, Layout, Table, theme } from 'antd';
import TextEditor from './TextEditor';
import { useEffect, useState } from "react";
import { Form, Button } from 'antd';
import axiosClient from '../../../Components/Other/axiosClient';
import NotificationModal from '../../../Components/Other/NotificationModal';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const {  Content } = Layout;
const CmsitemAdd = () => {
    var { id } = useParams();
  const [form] = Form.useForm();
  const [formData, setformData] = useState({});
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const [ShowModal, setShowModal] = useState(false);
  const [Notificationstr, setNotificationstr] = useState('');
  const [status, setStatus] = useState(false);
  const [postId, setPostId] = useState(0);
  const [articleTitle, setArticleTitle] = useState('');
  const [productid, setProductId]= useState(0);
  const [post, setPost] = useState({});

 

 
  const handleCloseNotification = () => setShowModal(false);

  const handleSubmit = () => {
    const posts = {
        Id: postId,
        ProductId: productid,
        Title: articleTitle,
        Content: text
    }
    console.log('resdata', posts);

    axiosClient.post(`/Posts`, posts)
    .then(res => {
      setNotificationstr('thêm bài viết thành công!') 
      setShowModal(true);
      setStatus(true);
    
    })
    .catch(error => {
      setNotificationstr('thêm bài viết thất bại!') 
      setShowModal(true);
      setStatus(false);
      console.log(error.response.data);
    
  });
  };
  console.log('data', formData);
  console.log('conten', text);
  console.log('title', articleTitle);
  console.log('productid', productid);
  console.log('postob', post);

  // if (error.length > 0) {
  //   return (
  //     <div className="App">
  //       <h2 className="alert alert-danger my-3">Có lỗi xảy ra</h2>
  //     </div>
  //   );
  // }
  

  // if (result)
  //   return (
  //     <div className="App">
  //       {/* <h2>Xin chào {result.text} </h2> */}
  //       <div
  //         className="editor"
  //         dangerouslySetInnerHTML={{ __html: result.text }}
  //       />
  //     </div>
  //   );

  return (<>
    <div>
    <div className="logo">
      <h1>Thêm Bài Viết</h1>
    </div>
    <nav>
      <ul>
        <li className='fs16'>
          <a href="/admin/cmsitem" className="home-link">
            Quay lại
          </a>
        </li>
      </ul>
    </nav>
    </div>
<br/>
    <div className="App" style={{textAlign:"center", alignItems:"center", alignContent:"center"}}>
    <Form layout="vertical" form={form} onFinish={handleSubmit}
    initialValues={{
        productCode: post.productId,
        articleTitle: post.title
    }}
    >
 
    
    <Form.Item style={{width:'400px'}}
      name="productCode"
      label="Mã sản phẩm"
      rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm' }]}
    >
      <Input placeholder="Nhập mã sản phẩm" onChange={(e)=>{setProductId(e.target.value)}} />
    </Form.Item>
    
    <Form.Item
    tyle={{width:'400px'}}
      name="articleTitle"
      label="Tên bài viết"
      rules={[{ required: true, message: 'Vui lòng nhập tên bài viết' }]}
    >
      <Input  placeholder="Nhập tên bài viết" onChange={(e) => {setArticleTitle(e.target.value)}} />
    </Form.Item>

    <Form.Item  style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
      <TextEditor initData={post.content} setData={setText}   />
    </Form.Item>
    
    <Form.Item>
      <Button type="primary" onClick={handleSubmit}>
       Thêm bài viết
      </Button>
    </Form.Item>
  </Form>

 {/* <div dangerouslySetInnerHTML={{ __html: text }}></div>*/}

    </div>
    <NotificationModal
    visible = {ShowModal}
     handleCancel = {handleCloseNotification}
     notificationstr = {Notificationstr}
     status = {status}
  />

    {/*<div>

    <div className="App">
    // {/* <h2>Xin chào {result.text} </h2> */}
  {/*  <div
      className="editor"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  </div>
    </div>*/}
    <ToastContainer
     position="top-center"
     pauseOnHover={false}
     autoClose={1500}
     theme={'dark'}
   />
    </>
    
  );
}
 
export default CmsitemAdd;