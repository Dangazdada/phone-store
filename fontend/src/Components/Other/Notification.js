import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type }) => {
    const [notifications, setNotifications] = useState([]);

    const handleShowNotification = () => {
      const newNotification = {
        id: Math.random().toString(36).substr(2, 9), // Tạo ID ngẫu nhiên cho thông báo
        message: 'Đây là thông báo',
        type: 'success'
      };
  
      setNotifications([...notifications, newNotification]);
  
      setTimeout(() => {
        setNotifications(notifications.filter(n => n.id !== newNotification.id));
      }, 5000); // Xóa thông báo sau 5 giây
    };
  
    const handleCloseNotification = (id) => {
      setNotifications(notifications.filter(n => n.id !== id));
    };
  return (
    <div className="App">
      <button onClick={handleShowNotification}>Hiển thị thông báo</button>
      <div className="notification-container">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => handleCloseNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Notification;
