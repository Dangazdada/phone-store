import { Button, Modal } from "antd";
import { useEffect } from "react";

const MessageModal = ({ visible, handleCancel, notificationstr }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        handleCancel(); // Đóng modal sau 5 giây
      }, 5000);

      return () => clearTimeout(timer); // Xóa timer khi component unmount
    }
  }, [visible, handleCancel]);

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      style={{ fontSize: 14, width: "100%" }}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          OK
        </Button>,
      ]}
    >
      <h3 style={{ color: "red" }}>Thông báo</h3>
      <h5 style={{ fontSize: "14px", color: "red" }}>{notificationstr}</h5>
    </Modal>
  );
};

export default MessageModal;
