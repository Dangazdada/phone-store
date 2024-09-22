import { Layout, Form, Input, Button,  theme, Collapse  } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../Components/Other/axiosClient';
import { useEffect, useState } from 'react';
import NotificationModal from '../../../Components/Other/NotificationModal';
import { toast, ToastContainer } from 'react-toastify';

const { Panel } = Collapse;
const { Content } = Layout;
const ProductEditSpecifications = () => {
    const { colorBgContainer, borderRadiusLG } = theme.useToken();
    const [form] = Form.useForm();
    var { id } = useParams();
    const [status, setStatus] = useState(false);
    const [ShowModal, setShowModal] = useState(false);
    const [Notificationstr, setNotificationstr] = useState('');
    const [Specification, setSpecification] = useState({
     
    });
    const [SpecificationData, setSpecificationData] = useState({});
    
    useEffect(() => {
        axiosClient.get(`Specifications/${id}`)
        .then(res => {
            const Specificationdata = res.data;
            setSpecification(res.data)
           
            form.setFieldsValue({
                Screentechnology: Specificationdata.screen.screentechnology,
                Resolution: Specificationdata.screen.resolution,
                Widescreen: Specificationdata.screen.widescreen,
                Maximumbrightness: Specificationdata.screen.maximumbrightness,
                Touchglasssurface: Specificationdata.screen.touchglasssurface,
                Operatingsystem: Specificationdata.operatingSystemAndCPU.operatingsystem,
                Processorchip: Specificationdata.operatingSystemAndCPU.processorchip,
                CPUspeed: Specificationdata.operatingSystemAndCPU.cpUspeed,
                Graphicschip: Specificationdata.operatingSystemAndCPU.graphicschip,
                Mobilenetwork: Specificationdata.connect.mobilenetwork,
                SIM: Specificationdata.connect.sim,
                WIFI: Specificationdata.connect.wifi,
                Bluetooth: Specificationdata.connect.bluetooth,
                ConnectionChargingPort: Specificationdata.connect.connectionChargingPort,
                HeadPhoneJack: Specificationdata.connect.headPhoneJack,
                OtherConnections: Specificationdata.connect.otherConnections,
                Advancedsecurity: Specificationdata.utility.advancedsecurity,
                Specialfeatures: Specificationdata.utility.specialfeatures,
                Wateranddustresistant: Specificationdata.utility.wateranddustresistant,
                Record: Specificationdata.utility.record,
                Watchamovie: Specificationdata.utility.watchamovie,
                Listeningtomusic: Specificationdata.utility.listeningtomusic,
                Design: Specificationdata.generalInformation.design,
                Material: Specificationdata.generalInformation.material,
                Sizevolume: Specificationdata.generalInformation.sizevolume,
                Launchtime: Specificationdata.generalInformation.launchtime,
                Thefirm: Specificationdata.generalInformation.thefirm,
                Batterycapacity: Specificationdata.batteryandCharger.batterycapacity,
                Batterytype: Specificationdata.batteryandCharger.batterytype,
                Maximumchargingsupport: Specificationdata.batteryandCharger.maximumchargingsupport,
                Batterytechnology: Specificationdata.batteryandCharger.batterytechnology,
                RAM: Specificationdata.ram,
                Storagecapacity: Specificationdata.storagecapacity,
                Remainingcapacityisapproximately: Specificationdata.remainingcapacityisapproximately,
                Phonebook: Specificationdata.phonebook,
                ResolutionFC: Specificationdata.frontCamera.resolution,
                FeatureFC: Specificationdata.frontCamera.feature,
                ResolutionRC: Specificationdata.rearcamera.resolution,
                Film: Specificationdata.rearcamera.film,
                Flashlight: Specificationdata.rearcamera.flashlight,
                FeatureRC: Specificationdata.rearcamera.feature,
    
            })
            setSpecificationData({
              Screentechnology: Specificationdata.screen.screentechnology,
                Resolution: Specificationdata.screen.resolution,
                Widescreen: Specificationdata.screen.widescreen,
                Maximumbrightness: Specificationdata.screen.maximumbrightness,
                Touchglasssurface: Specificationdata.screen.touchglasssurface,
                Operatingsystem: Specificationdata.operatingSystemAndCPU.operatingsystem,
                Processorchip: Specificationdata.operatingSystemAndCPU.processorchip,
                CPUspeed: Specificationdata.operatingSystemAndCPU.cpUspeed,
                Graphicschip: Specificationdata.operatingSystemAndCPU.graphicschip,
                Mobilenetwork: Specificationdata.connect.mobilenetwork,
                SIM: Specificationdata.connect.sim,
                WIFI: Specificationdata.connect.wifi,
                Bluetooth: Specificationdata.connect.bluetooth,
                ConnectionChargingPort: Specificationdata.connect.connectionChargingPort,
                HeadPhoneJack: Specificationdata.connect.headPhoneJack,
                OtherConnections: Specificationdata.connect.otherConnections,
                Advancedsecurity: Specificationdata.utility.advancedsecurity,
                Specialfeatures: Specificationdata.utility.specialfeatures,
                Wateranddustresistant: Specificationdata.utility.wateranddustresistant,
                Record: Specificationdata.utility.record,
                Watchamovie: Specificationdata.utility.watchamovie,
                Listeningtomusic: Specificationdata.utility.listeningtomusic,
                Design: Specificationdata.generalInformation.design,
                Material: Specificationdata.generalInformation.material,
                Sizevolume: Specificationdata.generalInformation.sizevolume,
                Launchtime: Specificationdata.generalInformation.launchtime,
                Thefirm: Specificationdata.generalInformation.thefirm,
                Batterycapacity: Specificationdata.batteryandCharger.batterycapacity,
                Batterytype: Specificationdata.batteryandCharger.batterytype,
                Maximumchargingsupport: Specificationdata.batteryandCharger.maximumchargingsupport,
                Batterytechnology: Specificationdata.batteryandCharger.batterytechnology,
                RAM: Specificationdata.ram,
                Storagecapacity: Specificationdata.storagecapacity,
                Remainingcapacityisapproximately: Specificationdata.remainingcapacityisapproximately,
                Phonebook: Specificationdata.phonebook,
                ResolutionFC: Specificationdata.frontCamera.resolution,
                FeatureFC: Specificationdata.frontCamera.feature,
                ResolutionRC: Specificationdata.rearcamera.resolution,
                Film: Specificationdata.rearcamera.film,
                Flashlight: Specificationdata.rearcamera.flashlight,
                FeatureRC: Specificationdata.rearcamera.feature,
            })
           
            console.log('specificationdata',Specificationdata);
        })

    } ,[id])
  
  
    const navigate = useNavigate();
  
    const onFinish = (values) => {
      console.log('Received values:', values);
      // Xử lý logic khi người dùng gửi form
    };
    const handleInputChange = (name, value) => {
      setSpecificationData(prev => ({ ...prev, [name]: value }));
    };
    const handleCloseNotification = () =>{
       setShowModal(false)};
    //    navigate('/admin')
    const handelSubmit = () =>{
      if(SpecificationData.Screentechnology === null || SpecificationData.Screentechnology === "" || SpecificationData.Resolution === null
        || SpecificationData.Resolution === "" ||  SpecificationData.Widescreen === null ||  SpecificationData.Widescreen === ""
        || SpecificationData.Maximumbrightness === null || SpecificationData.Maximumbrightness === "" || SpecificationData.Touchglasssurface === null 
        || SpecificationData.Touchglasssurface === "" || SpecificationData.Operatingsystem === null || SpecificationData.Operatingsystem === ""
        || SpecificationData.Processorchip === null || SpecificationData.Processorchip === "" || SpecificationData.CPUspeed === null || SpecificationData.CPUspeed === ""
        || SpecificationData.Graphicschip === null || SpecificationData.Graphicschip === "" || SpecificationData.Mobilenetwork === null || SpecificationData.Mobilenetwork === ""
        || SpecificationData.SIM === null || SpecificationData.SIM === "" || SpecificationData.WIFI === null || SpecificationData.WIFI === "" 
        || SpecificationData.Bluetooth === null || SpecificationData.Bluetooth === "" || SpecificationData.ConnectionChargingPort === null || SpecificationData.ConnectionChargingPort === ""
        || SpecificationData.HeadPhoneJack === null || SpecificationData.HeadPhoneJack === "" || SpecificationData.OtherConnections === null || SpecificationData.OtherConnections === ""
        || SpecificationData.Advancedsecurity === null || SpecificationData.Advancedsecurity === "" || SpecificationData.Specialfeatures === null || SpecificationData.Specialfeatures === ""
        || SpecificationData.Wateranddustresistant === null || SpecificationData.Wateranddustresistant === "" || SpecificationData.Record === null || SpecificationData.Record === "" 
        || SpecificationData.Watchamovie === null || SpecificationData.Watchamovie === "" || SpecificationData.Listeningtomusic === null || SpecificationData.Listeningtomusic === ""
        || SpecificationData.Design === null || SpecificationData.Design === "" || SpecificationData.Material  === null || SpecificationData.Material === ""
        || SpecificationData.Sizevolume === null || SpecificationData.Sizevolume === "" || SpecificationData.Launchtime === null || SpecificationData.Launchtime === "" 
        || SpecificationData.Thefirm === null || SpecificationData.Thefirm === "" || SpecificationData.Batterycapacity === null || SpecificationData.Batterycapacity === 0 || SpecificationData.Batterycapacity === ""
        || SpecificationData.Batterytype === null || SpecificationData.Batterytype === "" || SpecificationData.Maximumchargingsupport === null || SpecificationData.Maximumchargingsupport === ""
        || SpecificationData.Batterytechnology === null || SpecificationData.Batterytechnology === "" || SpecificationData.ResolutionFC === null || SpecificationData.ResolutionFC === ""
        || SpecificationData.FeatureFC === null || SpecificationData.FeatureFC === "" || SpecificationData.ResolutionRC === null || SpecificationData.ResolutionRC === ""
        || SpecificationData.Film === null || SpecificationData.Film === "" || SpecificationData.Flashlight === null || SpecificationData.Flashlight === ""
        || SpecificationData.FeatureRC === null || SpecificationData.FeatureRC === "")
        {
            toast.error('Vui lòng nhập đầy đủ thông số kỹ thuật');
        }
        else
        {
          const SpecificationDataSM  =  
          {
            id: Specification.id,
            prodcutid: Specification.productId,
            ScreenId: Specification.screen.id,
            Screentechnology: SpecificationData.Screentechnology,
            Resolution: SpecificationData.Resolution,
            Widescreen: SpecificationData.Widescreen,
            Maximumbrightness: SpecificationData.Maximumbrightness,
            Touchglasssurface: SpecificationData.Touchglasssurface,
            OperatingSystemandCPUId: Specification.operatingSystemAndCPU.id,
            Operatingsystem: SpecificationData.Operatingsystem,
            Processorchip: SpecificationData.Processorchip,
            CPUspeed: SpecificationData.CPUspeed,
            Graphicschip:SpecificationData.Graphicschip,
            ConnectId: Specification.connect.id,
            Mobilenetwork: SpecificationData.Mobilenetwork,
            SIM: SpecificationData.SIM,
            WIFI: SpecificationData.WIFI,
            Bluetooth: SpecificationData.Bluetooth,
            ConnectionChargingPort: SpecificationData.ConnectionChargingPort,
            HeadPhoneJack: SpecificationData.HeadPhoneJack,
            OtherConnections: SpecificationData.OtherConnections,
            UtilityId: Specification.utility.id,
            Advancedsecurity: SpecificationData.Advancedsecurity,
            Specialfeatures: SpecificationData.Specialfeatures,
            Wateranddustresistant: SpecificationData.Wateranddustresistant,
            Record: SpecificationData.Record,
            Watchamovie: SpecificationData.Watchamovie,
            Listeningtomusic: SpecificationData.Listeningtomusic,
            GeneralinformationId:Specification.generalInformation.id,
            Design: SpecificationData.Design,
            Material: SpecificationData.Material,
            Sizevolume: SpecificationData.Sizevolume,
            Launchtime: SpecificationData.Launchtime,
            Thefirm: SpecificationData.Thefirm,
            BatteryandChargerId: Specification.batteryandCharger.id,
            Batterycapacity:SpecificationData.Batterycapacity,
            Batterytype: SpecificationData.Batterytype,
            Maximumchargingsupport: SpecificationData.Maximumchargingsupport,
            Batterytechnology: SpecificationData.Batterytechnology,
            FrontcameraId:Specification.frontCamera.id,
            ResolutionFC: SpecificationData.ResolutionFC,
            FeatureFC: SpecificationData.FeatureFC,
            RearcameraId:Specification.rearcamera.id,
            ResolutionRC: SpecificationData.ResolutionRC,
            Film: SpecificationData.Film,
            Flashlight: SpecificationData.Flashlight,
            FeatureRC: SpecificationData.FeatureRC,
          }
    
          axiosClient.put(`/Specifications/${id}`,SpecificationDataSM)
            .then(() => {
              setNotificationstr('cập nhật thông số kỹ thuật thành công!');
              setShowModal(true); 
              setStatus(true);
            
            })
            .catch(error => {
              setNotificationstr('cập nhật thông số kỹ thuật thất bại!');
              setShowModal(true);
              setStatus(false);
              console.log(error.response.data);
            });
            console.log('data',SpecificationDataSM);
        }
     
      
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
          <h1 >Cập Nhật Thông Số Kỹ Thuật </h1>
        </div>
        <nav>
          <ul>
            <li className="fs16">
              <Link to={`/admin/product/edit/${id}`} className="home-link">
                Quay lại
              </Link>
            </li>
          </ul>
        </nav>
        <Form
        form={form}
        name="SpecificationTypeForm"
        onFinish={handelSubmit}
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
            <Input value={SpecificationData.Design} className='input-add' onChange={(e) => handleInputChange('Design', e.target.value)} />
          </Form.Item>
  
          <Form.Item
            label="Chất liệu"
            name="Material"
            rules={[{ required: true, message: 'Vui lòng nhập chất liệu tạo nên sản phẩm!' }]}
          >
            <Input value={SpecificationData.Material} className='input-add' onChange={(e) => handleInputChange('Material', e.target.value)} />
          </Form.Item>
  
          <Form.Item
            label="ích thước & Khối lượng"
            name="Sizevolume"
            rules={[{ required: true, message: 'Vui lòng nhập kích thước và không lượng của sản phẩm!' }]}
          >
            <Input value={SpecificationData.Sizevolume} className='input-add' onChange={(e) => handleInputChange('Sizevolume', e.target.value)} />
          </Form.Item>
  
          <Form.Item
            label="Thời điểm ra mắt"
            name="Launchtime"
            rules={[{ required: true, message: 'Vui lòng nhập thời điểm ra mắt của sản phẩm!' }]}
          >
            <Input value={SpecificationData.Launchtime} className='input-add' onChange={(e) => handleInputChange('Launchtime', e.target.value)} />
          </Form.Item>
  
          <Form.Item
          label="Hãng"
          name="Thefirm"
          rules={[{ required: true, message: 'Vui lòng nhập tên hãng sản xuất!' }]}
        >
          <Input value={SpecificationData.Thefirm} className='input-add' onChange={(e) => handleInputChange('Thefirm', e.target.value)} />
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
            <Input value={SpecificationData.Screentechnology}  className='input-add' onChange={(e) => handleInputChange('Screentechnology', e.target.value)} />
          </Form.Item>
  
          <Form.Item
            label="Độ phân giải màn hình"
            name="Resolution"
            rules={[{ required: true, message: 'Vui lòng nhập công nghệ màn hình! VD: OLED' }]}
          >
            <Input value={SpecificationData.Resolution} className='input-add' onChange={(e) => handleInputChange('Resolution', e.target.value)} />
          </Form.Item>
  
          <Form.Item
            label="Màn hình rộng"
            name="Widescreen"
            rules={[{ required: true, message: 'Vui lòng nhập thông tin kích thước màn hình! VD: 6.1" - Tần số quét 60 Hz' }]}
          >
            <Input value={SpecificationData.Widescreen} className='input-add' onChange={(e) => handleInputChange('Widescreen', e.target.value)} />
          </Form.Item>
  
          <Form.Item
            label="Độ sáng tối đa"
            name="Maximumbrightness"
            rules={[{ required: true, message: 'Vui lòng nhập độ sáng tối đa màn hình! VD: 2000 nits' }]}
          >
            <Input value={SpecificationData.Maximumbrightness} className='input-add' onChange={(e) => handleInputChange('Maximumbrightness', e.target.value)} />
          </Form.Item>
  
          <Form.Item
          label="Mặt kính cảm ứng"
          name="Touchglasssurface"
          rules={[{ required: true, message: 'Vui lòng nhập mặt kính cảm ứng của màn hình! VD: Kính cường lực Ceramic Shield' }]}
        >
          <Input value={SpecificationData.Touchglasssurface} className='input-add' onChange={(e) => handleInputChange('Touchglasssurface', e.target.value)} />
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
            <Input value={SpecificationData.ResolutionFC} className='input-add' onChange={(e) => handleInputChange('ResolutionFC', e.target.value)} />
          </Form.Item>
  
          <Form.Item
            label="Tính năng"
            name="FeatureFC"
            rules={[{ required: true, message: 'Vui lòng nhập dộ tính n của camera trước! VD: Smart HDR 5, Trôi nhanh thời gian' }]}
          >
            <Input value={SpecificationData.FeatureFC} className='input-add' onChange={(e) => handleInputChange('FeatureFC', e.target.value)} />
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
          <Input value={SpecificationData.ResolutionRC} className='input-add' onChange={(e) => handleInputChange('ResolutionRC', e.target.value)} />
        </Form.Item>
  
        <Form.Item
        label="Tính năng"
        name="FeatureRC"
        rules={[{ required: true, message: 'Vui lòng nhập tính năng của camera sau!' }]}
      >
      
        <Input value={SpecificationData.FeatureRC} className='input-add' onChange={(e) => handleInputChange('FeatureRC', e.target.value)} />
      </Form.Item>
  
      <Form.Item
      label="Chế độ quay phim"
      name="Film"
      rules={[{ required: true, message: 'Vui lòng nhập tính năng  quay phim của camera sau!VD: HD 720p@30fps' }]}
    >
    
      <Input value={SpecificationData.Film} className='input-add' onChange={(e) => handleInputChange('Film', e.target.value)} />
    </Form.Item>
  
    <Form.Item
      label="Đèn Flash"
      name="Flashlight"
      rules={[{ required: true, message: 'Vui lòng nhập thông tin đèn flash của camera sau!VD: Có' }]}
    >
    
      <Input value={SpecificationData.Flashlight} className='input-add' onChange={(e) => handleInputChange('Flashlight', e.target.value)} />
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
   
     <Input value={SpecificationData.Operatingsystem} className='input-add' onChange={(e) => handleInputChange('Operatingsystem', e.target.value)} />
   </Form.Item>
  
   <Form.Item
     label="Chip xử lý (CPU)"
     name="Processorchip"
     rules={[{ required: true, message: 'Vui lòng nhập thông tin chip xử lý của điện thoại!VD: Apple A17 Pro 6 nhân' }]}
   >
   
     <Input value={SpecificationData.Processorchip} className='input-add' onChange={(e) => handleInputChange('Processorchip', e.target.value)} />
   </Form.Item>
  
   <Form.Item
     label="Tốc độ CPU"
     name="CPUspeed"
     rules={[{ required: true, message: 'Vui lòng nhập thông tin tốc độ CPU của điện thoại!VD: 3.78 GHz' }]}
   >
   
     <Input value={SpecificationData.CPUspeed} className='input-add' onChange={(e) => handleInputChange('CPUspeed', e.target.value)} />
   </Form.Item>
  
   <Form.Item
     label="Chip đồ họa (GPU)"
     name="Graphicschip"
     rules={[{ required: true, message: 'Vui lòng nhập thông tin Chip đồ họa (GPU) của điện thoại!VD: Apple GPU 6 nhân' }]}
   >
   
     <Input value={SpecificationData.Graphicschip} className='input-add' onChange={(e) => handleInputChange('Graphicschip', e.target.value)} />
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
       
         <Input value={SpecificationData.Mobilenetwork} className='input-add' onChange={(e) => handleInputChange('Mobilenetwork', e.target.value)} />
       </Form.Item>
   
       <Form.Item
         label="SIM"
         name="SIM"
         rules={[{ required: true, message: 'Vui lòng nhập thông tin SIM của điện thoại! VD: 1 Nano SIM & 1 eSIM' }]}
       >
       
         <Input value={SpecificationData.SIM} className='input-add' onChange={(e) => handleInputChange('SIM', e.target.value)} />
       </Form.Item>
   
       <Form.Item
         label="WIFI"
         name="WIFI"
         rules={[{ required: true, message: 'Vui lòng nhập thông tin WIFI của điện thoại! VD: Wi-Fi MIMO' }]}
       >
       
         <Input value={SpecificationData.WIFI} className='input-add' onChange={(e) => handleInputChange('WIFI', e.target.value)} />
       </Form.Item>
   
       <Form.Item
         label="Bluetooth"
         name="Bluetooth"
         rules={[{ required: true, message: 'Vui lòng nhập thông tin Bluetooth của điện thoại! VD: v5.3' }]}
       >
       
         <Input value={SpecificationData.Bluetooth} className='input-add' onChange={(e) => handleInputChange('Bluetooth', e.target.value)} />
       </Form.Item>
  
       <Form.Item
         label="Cổng kết nối/sạc"
         name="ConnectionChargingPort"
         rules={[{ required: true, message: 'Vui lòng nhập thông tin cổng kết nối/sạc của điện thoại! VD: Type-C' }]}
       >
       
         <Input value={SpecificationData.ConnectionChargingPort} className='input-add' onChange={(e) => handleInputChange('ConnectionChargingPort', e.target.value)} />
       </Form.Item>
  
       
       <Form.Item
         label="Jack tai nghe"
         name="HeadPhoneJack"
         rules={[{ required: true, message: 'Vui lòng nhập thông tin jack tai nghe của điện thoại! VD: Type-C' }]}
       >
       
         <Input value={SpecificationData.HeadPhoneJack} className='input-add' onChange={(e) => handleInputChange('HeadPhoneJack', e.target.value)} />
       </Form.Item>
  
       
       <Form.Item
         label="Kết nối khác"
         name="OtherConnections"
         rules={[{ required: true, message: 'Vui lòng nhập thông tin kết nối khác của điện thoại! VD: OTGNFC' }]}
       >
       
         <Input value={SpecificationData.OtherConnections} className='input-add' onChange={(e) => handleInputChange('OtherConnections', e.target.value)} />
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
      
        <Input value={SpecificationData.Advancedsecurity} className='input-add' onChange={(e) => handleInputChange('Advancedsecurity', e.target.value)} />
      </Form.Item>
  
      <Form.Item
        label="Tính năng đặc biệt"
        name="Specialfeatures"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin tính năng đặc biệt của điện thoại! VD: Cử chỉ thông minh' }]}
      >
      
        <Input value={SpecificationData.Specialfeatures} className='input-add' onChange={(e) => handleInputChange('Specialfeatures', e.target.value)} />
      </Form.Item>
  
      <Form.Item
        label="Kháng nước, bụi"
        name="Wateranddustresistant"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin kháng nước, bụi của điện thoại! VD:   IP65' }]}
      >
      
        <Input value={SpecificationData.Wateranddustresistant} className='input-add' onChange={(e) => handleInputChange('Wateranddustresistant', e.target.value)} />
      </Form.Item>
  
      <Form.Item
        label="Ghi âm"
        name="Record"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin ghi âm của điện thoại! VD: Ghi âm mặc định, Ghi âm cuộc gọi' }]}
      >
      
        <Input value={SpecificationData.Record} className='input-add' onChange={(e) => handleInputChange('Record', e.target.value)} />
      </Form.Item>
  
      <Form.Item
        label="Xem phim"
        name="Watchamovie"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin xem phim của điện thoại! VD:MP4, AVI' }]}
      >
      
        <Input value={SpecificationData.Watchamovie} className='input-add' onChange={(e) => handleInputChange('Watchamovie', e.target.value)} />
      </Form.Item>
  
      
      <Form.Item
        label="Nghe nhạc"
        name="Listeningtomusic"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin nghe nhạc của điện thoại! VD: OGG, MP3' }]}
      >
      
        <Input value={SpecificationData.Listeningtomusic} className='input-add' onChange={(e) => handleInputChange('Listeningtomusic', e.target.value)} />
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
       
         <Input value={SpecificationData.Batterycapacity} className='input-add' onChange={(e) => handleInputChange('Batterycapacity', e.target.value)} />
       </Form.Item>
   
       <Form.Item
         label="Loại pin"
         name="Batterytype"
         rules={[{ required: true, message: 'Vui lòng nhập thông tin loại pin của điện thoại! VD: Li-Po' }]}
       >
       
         <Input value={SpecificationData.Batterytype} className='input-add' onChange={(e) => handleInputChange('Batterytype', e.target.value)} />
       </Form.Item>
   
       <Form.Item
         label="Hỗ trợ sạc tối đa"
         name="Maximumchargingsupport"
         rules={[{ required: true, message: 'Vui lòng nhập thông tin hỗ trợ sạc tối đa của điện thoại! VD:67 W' }]}
       >
       
         <Input value={SpecificationData.Maximumchargingsupport} className='input-add' onChange={(e) => handleInputChange('Maximumchargingsupport', e.target.value)} />
       </Form.Item>
   
       <Form.Item
         label="Công nghệ pin"
         name="Batterytechnology"
         rules={[{ required: true, message: 'Vui lòng nhập thông tin công nghệ pin của điện thoại! VD: Tiết kiệm pin' }]}
       >
       
         <Input value={SpecificationData.Batterytechnology} className='input-add' onChange={(e) => handleInputChange('Batterytechnology', e.target.value)} />
       </Form.Item>
   
       </Panel>
       </Collapse>
  
        </div>
          </div>
  
  
        <Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" className='btn-add' htmlType="submit" onClick={handelSubmit}>
              Cập nhật
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
      
      <ToastContainer
        position="top-center"
        pauseOnHover={false}
        autoClose={1500}
        theme={'dark'}
      />
      </Content>

      
     );
}
 
export default ProductEditSpecifications;