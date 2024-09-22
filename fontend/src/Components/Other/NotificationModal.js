import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";


const NotificationModal = ({visible, handleCancel, notificationstr, status}) => {
    return ( <Modal
        visible={visible} 
        onCancel={handleCancel} 
        style={{fontSize:14, width: "100%"}}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            OK
          </Button>,
          
        ]}
      >
            <h3>Thông báo</h3>
            {
                status  ? (<h5 style={{fontSize:'14px'}}> <CheckCircleOutlined style={{color:"green"}}/>   Bạn đã {notificationstr} </h5> 
            ): ( <h5 style={{fontSize:'14px'}}> <InfoCircleOutlined style={{color:"red"}} />  Bạn đã {notificationstr} </h5>)
            }
       
     
      </Modal> );
}
 
export default NotificationModal;