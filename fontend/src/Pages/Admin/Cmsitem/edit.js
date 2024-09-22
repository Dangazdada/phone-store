import {  Input, Layout, Table, theme } from 'antd';
import TextEditor from './TextEditor';
import { useEffect, useState } from "react";
import { Form, Button } from 'antd';
import axiosClient from '../../../Components/Other/axiosClient';
import NotificationModal from '../../../Components/Other/NotificationModal';
import { useParams } from 'react-router-dom';

const {  Content } = Layout;
const CmsitemEdit = () => {
    var { id } = useParams();
  const [form] = Form.useForm();
  const { colorBgContainer, borderRadiusLG } = theme.useToken();

  const [formData, setformData] = useState({});
  const [text, setText] = useState("");

  const [ShowModal, setShowModal] = useState(false);
  const [Notificationstr, setNotificationstr] = useState('');
  const [status, setStatus] = useState(false);
  const [postId, setPostId] = useState(0);
  const [articleTitle, setArticleTitle] = useState('');
  const [productid, setProductId]= useState(0);
  const [post, setPost] = useState({});

  useEffect(() => {
    axiosClient.get(`/Posts/${id}`)
    .then(res => {
        setPost(res.data);

        form.setFieldsValue({
            productCode: res.data.productId,
            articleTitle: res.data.title,
          });
          setText(res.data.content);
          setProductId(res.data.productId);
          setArticleTitle( res.data.title);
          setPostId(res.data.id);
    });
  }, []);

 
  const handleCloseNotification = () => setShowModal(false);

  const handleSubmit = (e) => {
    const posts = {
        Id: postId,
      ProductId: productid,
      Title: articleTitle,
      Content: text
    }

    axiosClient.put(`/Posts/${postId}`, posts)
    .then(res => {
      setNotificationstr('sửa bài viết thành công!') 
      setShowModal(true);
      setStatus(true);
    
    })
    .catch(error => {
      setNotificationstr('sửa bài viết thất bại!') 
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
              <h1>Cập Nhật Bài Viết</h1>
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
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
        </div>
        <div>
       
        </div>
        <NotificationModal
        visible = {ShowModal}
         handleCancel = {handleCloseNotification}
         notificationstr = {Notificationstr}
         status = {status}
      />

    </Content>

  

    {/*<div>

    <div className="App">
    // {/* <h2>Xin chào {result.text} </h2> */}
  {/*  <div
      className="editor"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  </div>
    </div>*/}
    </>
    
  );
}
 
export default CmsitemEdit;