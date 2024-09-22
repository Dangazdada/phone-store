  import React from 'react';
  import { Button, Modal } from 'antd';
  const DeleteModal = ({visible, handleCancel, handleDelete, name}) => {
   
      return (  <Modal
          visible={visible} 
          onCancel={handleCancel} 
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Hủy bỏ
            </Button>,
            <Button key="delete" type="primary" danger onClick={handleDelete}>
              Đồng ý
            </Button>,
          ]}
        >
          <h3>Xác nhận xóa</h3>
          <p>Bạn có chắc muốn xóa  <strong>{name}</strong> không?</p>
        </Modal> );
  }
  
  export default DeleteModal;