import React from 'react';
import { Modal } from 'antd';
const ModalViewImg = ({ visible, imageUrl, handleCancel }) => {
    return (  <Modal
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        centered={true}
        width={800}
      >
        <img
          src={imageUrl}
          alt="Hình ảnh"
          style={{ width: '100%', height: 'auto' }}
        />
      </Modal> );
}
 
export default ModalViewImg;