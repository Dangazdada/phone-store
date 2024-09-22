  import { Layout, Form, Input, Button,  theme, Collapse  } from 'antd';
  import { Link, useNavigate, useParams } from 'react-router-dom';
  import axiosClient from '../../../Components/Other/axiosClient';
  import { useState } from 'react';
  import NotificationModal from '../../../Components/Other/NotificationModal';

  const { Panel } = Collapse;
  const { Content } = Layout;

const SpecificationAddSpecification = () => {
    const { colorBgContainer, borderRadiusLG } = theme.useToken();
   
    var { id } = useParams();
    const [status, setStatus] = useState(false);
    const [ShowModal, setShowModal] = useState(false);
    const [Notificationstr, setNotificationstr] = useState('');
    const [Specification, setSpecification] = useState({
      Screentechnology: '',
      Resolution: '' ,
      Widescreen: '' ,
      Maximumbrightness: '',
      Touchglasssurface: '',
      Operatingsystem: '',
      Processorchip: '',
      CPUspeed: '',
      Graphicschip: '',
      Mobilenetwork: '',
      SIM: '',
      WIFI: '',
      Bluetooth: '',
      ConnectionChargingPort: '',
      HeadPhoneJack: '',
      OtherConnections: '',
      Advancedsecurity: '',
      Specialfeatures: '',
      Wateranddustresistant: '',
      Record: '',
      Watchamovie: '',
      Listeningtomusic: '',
      Design: '',
      Material: '',
      Sizevolume: '',
      Launchtime: '',
      Thefirm: '',
      Batterycapacity: 0,
      Batterytype: '',
      Maximumchargingsupport: '',
      Batterytechnology: '',
      RAM: '',
      Storagecapacity: '',
      Remainingcapacityisapproximately: '',
      Phonebook: '',
      ResolutionFC: '',
      FeatureFC: '',
      ResolutionRC: '',
      Film: '',
      Flashlight: '',
      FeatureRC: '',
    });
  
  
    const navigate = useNavigate();
  
    const onFinish = (values) => {
      console.log('Received values:', values);
      // Xử lý logic khi người dùng gửi form
    };
    const handleInputChange = (name, value) => {
      setSpecification(prev => ({ ...prev, [name]: value }));
    };
    const handleCloseNotification = () =>{
       setShowModal(false);
       navigate('/admin')
    }
    const handelSubmit = () =>{
      const SpecificationData  =  
      {
        prodcutid: id,
        Screentechnology: Specification.Screentechnology,
        Resolution: Specification.Resolution ,
        Widescreen: Specification.Widescreen  ,
        Maximumbrightness: Specification.Maximumbrightness,
        Touchglasssurface: Specification.Touchglasssurface,
        Operatingsystem: Specification.Operatingsystem,
        Processorchip: Specification.Processorchip,
        CPUspeed: Specification.CPUspeed,
        Graphicschip:Specification.Graphicschip,
        Mobilenetwork: Specification.Mobilenetwork,
        SIM: Specification.SIM,
        WIFI: Specification.WIFI,
        Bluetooth: Specification.Bluetooth,
        ConnectionChargingPort: Specification.ConnectionChargingPort,
        HeadPhoneJack: Specification.HeadPhoneJack,
        OtherConnections: Specification.OtherConnections,
        Advancedsecurity: Specification.Advancedsecurity,
        Specialfeatures: Specification.Specialfeatures,
        Wateranddustresistant: Specification.Wateranddustresistant,
        Record: Specification.Record,
        Watchamovie: Specification.Watchamovie,
        Listeningtomusic: Specification.Listeningtomusic,
        Design: Specification.Design,
        Material: Specification.Material,
        Sizevolume: Specification.Sizevolume,
        Launchtime: Specification.Launchtime,
        Thefirm: Specification.Thefirm,
        Batterycapacity:Specification.Batterycapacity,
        Batterytype: Specification.Batterytype,
        Maximumchargingsupport: Specification.Maximumchargingsupport,
        Batterytechnology: Specification.Batterytechnology,
        RAM: Specification.RAM,
        Storagecapacity: Specification.Storagecapacity,
        Remainingcapacityisapproximately: Specification.Remainingcapacityisapproximately,
        Phonebook: Specification.Phonebook,
        ResolutionFC: Specification.ResolutionFC,
        FeatureFC: Specification.FeatureFC,
        ResolutionRC: Specification.ResolutionRC,
        Film: Specification.Film,
        Flashlight: Specification.Flashlight,
        FeatureRC: Specification.FeatureRC,
      }

      const SpecificationParams = Object.keys(SpecificationData) .map ( key => `${key}=${encodeURIComponent(SpecificationData[key])}`)
      .join('&');
    
    axiosClient.post(`/Specifications?${SpecificationParams}`)
      .then(() => {
        setNotificationstr('Thêm thông số kỹ thuật thành công!');
        setShowModal(true); 
        setStatus(true);
       
      })
      .catch(error => {
        setNotificationstr('Thêm thông số kỹ thuật thất bại!');
        setShowModal(true);
        setStatus(false);
        console.log(error.response.data);
      });
      console.log('data',SpecificationData);
      
    }
  
    console.log('id', id);


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
        <h1 >Thêm Thông Số Kỹ Thuật </h1>
      </div>
      <nav>
        <ul>
          <li className="fs16">
            <Link to="/admin" className="home-link">
              Trang chủ
            </Link>
          </li>
        </ul>
      </nav>
      <Form
      name="SpecificationTypeForm"
      onFinish={onFinish}
      layout="vertical"
      initialValues={Specification}
      style={{ marginTop:20 ,fontWeight:700, fontSize:'16px'}}
    >
      
      <div className='display'>
        <div className='left-side-add'>
        {/* Thông tin chung */}
        <Collapse>
        <Panel header="Thông tin chung " key="1" className='title-panel'>
        <Form.Item
          label="Thiết kế của sản phẩm"
          name="Design"
          rules={[{ required: true, message: 'Vui lòng nhập thông tin thiết kế của sản phẩm!' }]}
        >
          <Input value={Specification.Design} className='input-add' onChange={(e) => handleInputChange('Design', e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Chất liệu"
          name="Material"
          rules={[{ required: true, message: 'Vui lòng nhập chất liệu tạo nên sản phẩm!' }]}
        >
          <Input value={Specification.Material} className='input-add' onChange={(e) => handleInputChange('Material', e.target.value)} />
        </Form.Item>

        <Form.Item
          label="ích thước & Khối lượng"
          name="Sizevolume"
          rules={[{ required: true, message: 'Vui lòng nhập kích thước và không lượng của sản phẩm!' }]}
        >
          <Input value={Specification.Sizevolume} className='input-add' onChange={(e) => handleInputChange('Sizevolume', e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Thời điểm ra mắt"
          name="Launchtime"
          rules={[{ required: true, message: 'Vui lòng nhập thời điểm ra mắt của sản phẩm!' }]}
        >
          <Input value={Specification.Launchtime} className='input-add' onChange={(e) => handleInputChange('Launchtime', e.target.value)} />
        </Form.Item>

        <Form.Item
        label="Hãng"
        name="Thefirm"
        rules={[{ required: true, message: 'Vui lòng nhập tên hãng sản xuất!' }]}
      >
        <Input value={Specification.Thefirm} className='input-add' onChange={(e) => handleInputChange('Thefirm', e.target.value)} />
      </Form.Item>
      </Panel>
      </Collapse>
      <br/>

      {/* Thông tin màn hình */}
      <Collapse>
      <Panel header="Thông tin màn hình" key="2" className='title-panel'>
      
        <Form.Item
          label="Công nghệ màn hình"
          name="Screentechnology"
          rules={[{ required: true, message: 'Vui lòng nhập công nghệ màn hình! VD: OLED' }]}
        >
          <Input value={Specification.Screentechnology} className='input-add' onChange={(e) => handleInputChange('Screentechnology', e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Độ phân giải màn hình"
          name="Resolution"
          rules={[{ required: true, message: 'Vui lòng nhập công nghệ màn hình! VD: OLED' }]}
        >
          <Input value={Specification.Resolution} className='input-add' onChange={(e) => handleInputChange('Resolution', e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Màn hình rộng"
          name="Widescreen"
          rules={[{ required: true, message: 'Vui lòng nhập thông tin kích thước màn hình! VD: 6.1" - Tần số quét 60 Hz' }]}
        >
          <Input value={Specification.Widescreen} className='input-add' onChange={(e) => handleInputChange('Widescreen', e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Độ sáng tối đa"
          name="Maximumbrightness"
          rules={[{ required: true, message: 'Vui lòng nhập độ sáng tối đa màn hình! VD: 2000 nits' }]}
        >
          <Input value={Specification.Maximumbrightness} className='input-add' onChange={(e) => handleInputChange('Maximumbrightness', e.target.value)} />
        </Form.Item>

        <Form.Item
        label="Mặt kính cảm ứng"
        name="Touchglasssurface"
        rules={[{ required: true, message: 'Vui lòng nhập mặt kính cảm ứng của màn hình! VD: Kính cường lực Ceramic Shield' }]}
      >
        <Input value={Specification.Touchglasssurface} className='input-add' onChange={(e) => handleInputChange('Touchglasssurface', e.target.value)} />
      </Form.Item>
      </Panel>
      </Collapse>
      <br/>

     

      {/* Thông tin camera trước */}  
      <Collapse>
      <Panel header="Thông tin camera trước" key="4" className='title-panel'>
        <Form.Item
          label="Độ phân giải"
          name="ResolutionFC"
          rules={[{ required: true, message: 'Vui lòng nhập dộ phân giải của camera trước! VD:12 MP ' }]}
        >
          <Input value={Specification.ResolutionFC} className='input-add' onChange={(e) => handleInputChange('ResolutionFC', e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Tính năng"
          name="FeatureFC"
          rules={[{ required: true, message: 'Vui lòng nhập dộ tính n của camera trước! VD: Smart HDR 5, Trôi nhanh thời gian' }]}
        >
          <Input value={Specification.FeatureFC} className='input-add' onChange={(e) => handleInputChange('FeatureFC', e.target.value)} />
        </Form.Item>
        </Panel>
        </Collapse>
        <br/>
        
      {/* Thông tin camera sau */}
      <Collapse>
      <Panel header="Thông tin camera sau" key="5" className='title-panel'>
      <Form.Item
        label="Độ phân giải"
        name="ResolutionRC"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin độ phân giải của camera sau! VD: Chính 200 MP & Phụ 8 MP, 2 MP' }]}
      >
        <Input value={Specification.ResolutionRC} className='input-add' onChange={(e) => handleInputChange('ResolutionRC', e.target.value)} />
      </Form.Item>

      <Form.Item
      label="Tính năng"
      name="FeatureRC"
      rules={[{ required: true, message: 'Vui lòng nhập tính năng của camera sau!' }]}
    >
    
      <Input value={Specification.FeatureRC} className='input-add' onChange={(e) => handleInputChange('FeatureRC', e.target.value)} />
    </Form.Item>

    <Form.Item
    label="Chế độ quay phim"
    name="Film"
    rules={[{ required: true, message: 'Vui lòng nhập tính năng  quay phim của camera sau!VD: HD 720p@30fps' }]}
  >
  
    <Input value={Specification.Film} className='input-add' onChange={(e) => handleInputChange('Film', e.target.value)} />
  </Form.Item>

  <Form.Item
    label="Đèn Flash"
    name="Flashlight"
    rules={[{ required: true, message: 'Vui lòng nhập thông tin đèn flash của camera sau!VD: Có' }]}
  >
  
    <Input value={Specification.Flashlight} className='input-add' onChange={(e) => handleInputChange('Flashlight', e.target.value)} />
  </Form.Item>
  </Panel>
  </Collapse>
  <br/>

    </div>

    
 

    <div className='right-side-add'>


    {/* Thông tin hệ điều hành  và CPU */}
    <Collapse>
    <Panel header="Thông tin hệ điều hành  và CPU" key="6" className='title-panel'>
      
   <Form.Item
   label="Hệ điều hành"
   name="Operatingsystem"
   rules={[{ required: true, message: 'Vui lòng nhập thông tin hệ điều hành của điện thoại!VD: iOS 17' }]}
 >
 
   <Input value={Specification.Operatingsystem} className='input-add' onChange={(e) => handleInputChange('Operatingsystem', e.target.value)} />
 </Form.Item>

 <Form.Item
   label="Chip xử lý (CPU)"
   name="Processorchip"
   rules={[{ required: true, message: 'Vui lòng nhập thông tin chip xử lý của điện thoại!VD: Apple A17 Pro 6 nhân' }]}
 >
 
   <Input value={Specification.Processorchip} className='input-add' onChange={(e) => handleInputChange('Processorchip', e.target.value)} />
 </Form.Item>

 <Form.Item
   label="Tốc độ CPU"
   name="CPUspeed"
   rules={[{ required: true, message: 'Vui lòng nhập thông tin tốc độ CPU của điện thoại!VD: 3.78 GHz' }]}
 >
 
   <Input value={Specification.CPUspeed} className='input-add' onChange={(e) => handleInputChange('CPUspeed', e.target.value)} />
 </Form.Item>

 <Form.Item
   label="Chip đồ họa (GPU)"
   name="Graphicschip"
   rules={[{ required: true, message: 'Vui lòng nhập thông tin Chip đồ họa (GPU) của điện thoại!VD: Apple GPU 6 nhân' }]}
 >
 
   <Input value={Specification.Graphicschip} className='input-add' onChange={(e) => handleInputChange('Graphicschip', e.target.value)} />
 </Form.Item>
 </Panel>
 </Collapse>
      <br/>
     

       {/* Thông tin kết nối */}
       <Collapse>
    <Panel header="Thông tin kết nối" key="7" className='title-panel'>
      
       <Form.Item
       label="Mạng di động"
       name="Mobilenetwork"
       rules={[{ required: true, message: 'Vui lòng nhập thông tin mạng di động của điện thoại! VD: Hỗ trợ 5G' }]}
     >
     
       <Input value={Specification.Mobilenetwork} className='input-add' onChange={(e) => handleInputChange('Mobilenetwork', e.target.value)} />
     </Form.Item>
 
     <Form.Item
       label="SIM"
       name="SIM"
       rules={[{ required: true, message: 'Vui lòng nhập thông tin SIM của điện thoại! VD: 1 Nano SIM & 1 eSIM' }]}
     >
     
       <Input value={Specification.SIM} className='input-add' onChange={(e) => handleInputChange('SIM', e.target.value)} />
     </Form.Item>
 
     <Form.Item
       label="WIFI"
       name="WIFI"
       rules={[{ required: true, message: 'Vui lòng nhập thông tin WIFI của điện thoại! VD: Wi-Fi MIMO' }]}
     >
     
       <Input value={Specification.WIFI} className='input-add' onChange={(e) => handleInputChange('WIFI', e.target.value)} />
     </Form.Item>
 
     <Form.Item
       label="Bluetooth"
       name="Bluetooth"
       rules={[{ required: true, message: 'Vui lòng nhập thông tin Bluetooth của điện thoại! VD: v5.3' }]}
     >
     
       <Input value={Specification.Bluetooth} className='input-add' onChange={(e) => handleInputChange('Bluetooth', e.target.value)} />
     </Form.Item>

     <Form.Item
       label="Cổng kết nối/sạc"
       name="ConnectionChargingPort"
       rules={[{ required: true, message: 'Vui lòng nhập thông tin cổng kết nối/sạc của điện thoại! VD: Type-C' }]}
     >
     
       <Input value={Specification.ConnectionChargingPort} className='input-add' onChange={(e) => handleInputChange('ConnectionChargingPort', e.target.value)} />
     </Form.Item>

     
     <Form.Item
       label="Jack tai nghe"
       name="HeadPhoneJack"
       rules={[{ required: true, message: 'Vui lòng nhập thông tin jack tai nghe của điện thoại! VD: Type-C' }]}
     >
     
       <Input value={Specification.HeadPhoneJack} className='input-add' onChange={(e) => handleInputChange('HeadPhoneJack', e.target.value)} />
     </Form.Item>

     
     <Form.Item
       label="Kết nối khác"
       name="OtherConnections"
       rules={[{ required: true, message: 'Vui lòng nhập thông tin kết nối khác của điện thoại! VD: OTGNFC' }]}
     >
     
       <Input value={Specification.OtherConnections} className='input-add' onChange={(e) => handleInputChange('OtherConnections', e.target.value)} />
     </Form.Item>
     </Panel>
     </Collapse>
     <br/>

      {/* Thông tin tiện ích */}
      <Collapse>
    <Panel header="Thông tin tiện ích" key="8" className='title-panel'>
      
      <Form.Item
      label="Bảo mật nâng cao"
      name="Advancedsecurity"
      rules={[{ required: true, message: 'Vui lòng nhập thông tin bảo mật nâng cao của điện thoại! VD: Mở khoá khuôn mặt' }]}
    >
    
      <Input value={Specification.Advancedsecurity} className='input-add' onChange={(e) => handleInputChange('Advancedsecurity', e.target.value)} />
    </Form.Item>

    <Form.Item
      label="Tính năng đặc biệt"
      name="Specialfeatures"
      rules={[{ required: true, message: 'Vui lòng nhập thông tin tính năng đặc biệt của điện thoại! VD: Cử chỉ thông minh' }]}
    >
    
      <Input value={Specification.Specialfeatures} className='input-add' onChange={(e) => handleInputChange('Specialfeatures', e.target.value)} />
    </Form.Item>

    <Form.Item
      label="Kháng nước, bụi"
      name="Wateranddustresistant"
      rules={[{ required: true, message: 'Vui lòng nhập thông tin kháng nước, bụi của điện thoại! VD:   IP65' }]}
    >
    
      <Input value={Specification.Wateranddustresistant} className='input-add' onChange={(e) => handleInputChange('Wateranddustresistant', e.target.value)} />
    </Form.Item>

    <Form.Item
      label="Ghi âm"
      name="Record"
      rules={[{ required: true, message: 'Vui lòng nhập thông tin ghi âm của điện thoại! VD: Ghi âm mặc định, Ghi âm cuộc gọi' }]}
    >
    
      <Input value={Specification.Record} className='input-add' onChange={(e) => handleInputChange('Record', e.target.value)} />
    </Form.Item>

    <Form.Item
      label="Xem phim"
      name="Watchamovie"
      rules={[{ required: true, message: 'Vui lòng nhập thông tin xem phim của điện thoại! VD:MP4, AVI' }]}
    >
    
      <Input value={Specification.Watchamovie} className='input-add' onChange={(e) => handleInputChange('Watchamovie', e.target.value)} />
    </Form.Item>

    
    <Form.Item
      label="Nghe nhạc"
      name="Listeningtomusic"
      rules={[{ required: true, message: 'Vui lòng nhập thông tin nghe nhạc của điện thoại! VD: OGG, MP3' }]}
    >
    
      <Input value={Specification.Listeningtomusic} className='input-add' onChange={(e) => handleInputChange('Listeningtomusic', e.target.value)} />
    </Form.Item>
</Panel>
</Collapse>
<br/>

       {/* Thông tin Pin & Sạc */}
       <Collapse>
       <Panel header="Thông tin Pin & Sạc" key="9" className='title-panel'>
      
       <h3>Thông tin Pin & Sạc</h3>
       <Form.Item
       label="Dung lượng pin"
       name="Batterycapacity"
       rules={[{ required: true, message: 'Vui lòng nhập thông tin dung lượng pin của điện thoại! VD: 5000 ' }]}
     >
     
       <Input value={Specification.Batterycapacity} className='input-add' onChange={(e) => handleInputChange('Batterycapacity', e.target.value)} />
     </Form.Item>
 
     <Form.Item
       label="Loại pin"
       name="Batterytype"
       rules={[{ required: true, message: 'Vui lòng nhập thông tin loại pin của điện thoại! VD: Li-Po' }]}
     >
     
       <Input value={Specification.Batterytype} className='input-add' onChange={(e) => handleInputChange('Batterytype', e.target.value)} />
     </Form.Item>
 
     <Form.Item
       label="Hỗ trợ sạc tối đa"
       name="Maximumchargingsupport"
       rules={[{ required: true, message: 'Vui lòng nhập thông tin hỗ trợ sạc tối đa của điện thoại! VD:67 W' }]}
     >
     
       <Input value={Specification.Maximumchargingsupport} className='input-add' onChange={(e) => handleInputChange('Maximumchargingsupport', e.target.value)} />
     </Form.Item>
 
     <Form.Item
       label="Công nghệ pin"
       name="Batterytechnology"
       rules={[{ required: true, message: 'Vui lòng nhập thông tin công nghệ pin của điện thoại! VD: Tiết kiệm pin' }]}
     >
     
       <Input value={Specification.Batterytechnology} className='input-add' onChange={(e) => handleInputChange('Batterytechnology', e.target.value)} />
     </Form.Item>
 
     </Panel>
     </Collapse>

      </div>
        </div>


      <Form.Item>
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" className='btn-add' htmlType="submit" onClick={handelSubmit}>
            Thêm mới
          </Button>
        </div>
      </Form.Item>
    </Form>

    <NotificationModal
    visible = {ShowModal}
     handleCancel = {handleCloseNotification}
     notificationstr = {Notificationstr}
     status = {status}
  />
    
    </Content>
    );
}
 
export default SpecificationAddSpecification;