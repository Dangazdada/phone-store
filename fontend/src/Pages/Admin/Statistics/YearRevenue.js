import React, { useState } from 'react';
import Notification  from "../../../Components/Other/Notification";
const YearRevenue = () => {
    const [showNotification, setShowNotification] = useState(false);

    const handleShowNotification = () => {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000); // Hiển thị trong 5 giây
    };
  
    return (
      <div className="App">
        <button onClick={handleShowNotification}>Hiển thị thông báo</button>
        {showNotification && (
          <Notification message="Đây là thông báo" type="success" />
        )}
      </div>
    );
}
 
export default YearRevenue;