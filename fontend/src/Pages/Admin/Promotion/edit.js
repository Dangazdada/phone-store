import { Layout, Form, Input, Button, theme, DatePicker, Select } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../Components/Other/axiosClient';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';

const { Content } = Layout;

const PromotionEdit = () => {

    const {id} = useParams();
    const [form] = Form.useForm();
    const { colorBgContainer, borderRadiusLG } = theme.useToken();
    const navigate = useNavigate();

    const [Promotion, setPromotion] = useState({});
  
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [PromotionType, setPromotionType] = useState(null);
    const [PercentageValue, setPercentageValue] = useState(0);
    const [PromotionValue, setPromotionValue] = useState(0);
    const [Description, setDescription] = useState(null);
    const [ProductId, setProductId] = useState(0);


    useEffect(() => {
        fetchData();
      }, []);
      const fetchData = () => {
        axiosClient
          .get(`/Promotions/${id}`)
          .then(res => { 
            setProductId(res.data.productId);
            setPromotion(res.data);
            setPromotionType(res.data.promotiontype);
            setDescription(res.data.description);
            //Nếu giảm giá theo phần trăm thì gán cho biến giảm giá phần trăm
            if(res.data.promotiontype === 'giamgiaphantram')
            {
                setPercentageValue(res.data.value);
            }
            //Nếu giảm giá theo giá trị thì gán cho biến số tiền
            if(res.data.promotiontype === 'giamgiatien')
            {
                setPromotionValue(res.data.value);
            }
            setStartDate(res.data.dateStart);
            setEndDate(res.data.dateEnd);
            form.setFieldsValue({
                PromotionType: res.data.promotiontype, 
                DiscountValue: res.data.value, 
                DiscountPercentage: res.data.value, 
                Description: res.data.description, 
              });

          })
          .catch(error => console.error('Error fetching product types:', error));
      };  

    const onFinish = (values) => {
      console.log('Received values:', values);
      // Xử lý logic khi người dùng gửi form
    };
    // const handleChange = (name, value) => {
    // //   setProductType(prev => ({ ...prev, [name]: value }));
    // };

    const handleStartDateChange = (date, dateString) => {
        if (date) {
            const formattedDate = date.format('YYYY-MM-DD');
            setStartDate(formattedDate);
            console.log(formattedDate); // Hoặc thực hiện bất kỳ hành động nào với dữ liệu này
          } else {
            setStartDate(null);
          }
      };
    
      const handleEndDateChange = (date, dateString) => {
        if (date) {
            const formattedDate = date.format('YYYY-MM-DD');
            setEndDate(formattedDate);
            console.log(formattedDate); // Hoặc thực hiện bất kỳ hành động nào với dữ liệu này
          } else {
            setEndDate(null);
          }
      };
      
  
    
    const handelSubmit = () =>{
        if(PromotionType === null || PromotionType === undefined)
        {
            toast.error('Vui lòng nhập đầy đủ thông tin khuyến mãi');
        }
        else
        {
            if(PromotionType === 'giamgiaphantram')
                {
            
                    if(PercentageValue <= 0 ||  PercentageValue >= 100 || Description === null || Description === undefined || startDate === null
                        || startDate === undefined || endDate === null || endDate === undefined)
                    {
                        if(PercentageValue <= 0 ||  PercentageValue >= 65)
                        {
                            toast.error('Giá trị khuyến mãi chỉ từ 1%-65% ');
                        }
                        toast.error('Vui lòng nhập đầy đủ thông tin khuyến mãi');
                        
                    }
                    else
                    {
                        const promotion = {
                            Description: Description,
                            Value: PercentageValue,
                            Promotiontype: PromotionType,
                            DateStart: startDate,
                            DateEnd: endDate,
                        };
                        axiosClient.put(`/Promotions/${id}`, promotion)
                        .then(res => {
                            console.log('Create promotion success');
                            toast.success('Thêm khuyến mãi thành công!');

                            setTimeout(() => {
                            navigate(`/admin/promotion/${ProductId}`)
                            },1500);
                        })
                        .catch(error => {
                            console.log('Create promotion fail');
                            toast.error('Thêm khuyến mãi thất bại!')

                        })
                    }
                    }
                    
                if(PromotionType === 'giamgiatien')
                {
                    if(PromotionValue <= 10000 ||  PromotionValue >= 50000000 || Description === null || Description === undefined || startDate === null
                        || startDate === undefined || endDate === null || endDate === undefined)
                    {
                        if(PromotionValue <= 10000 ||  PromotionValue >= 50000000)
                            {
                                toast.error('Giá trị khuyến mãi chỉ từ 10k-50 triệu ');
                            }
                        toast.error('Vui lòng nhập đầy đủ thông tin khuyến mãi');
                
                    }
                    else
                    {
                        const promotion = {
                            Description: Description,
                            Value: PromotionValue,
                            Promotiontype: PromotionType,
                            DateStart: startDate,
                            DateEnd: endDate,
                        };

                        axiosClient.put(`/Promotions/${id}`, promotion)
                        .then(res => {
                            console.log('Create promotion success');
                            toast.success('Thêm khuyến mãi thành công!');
                            setTimeout(() => {
                            navigate(`/admin/promotion/${ProductId}`)
                            },1500);
                        })
                        .catch(error => {
                            console.log('Create promotion fail');
                            toast.error('Thêm khuyến mãi thất bại!')

                        })
                    }
        
                }
        }
    }
    console.log('promotion', Promotion);
    console.log('p type', PromotionType);
    console.log('p start Date', startDate);
    console.log('p end date', endDate);
    console.log('p value pecent', PercentageValue);
    console.log('p Value', PromotionValue);
    console.log('p des', Description);
    console.log('ProductId', id);
    return ( 
        <>
        <Content
        style={{
          margin: '24px auto',
          width:'100%',
          padding: 24,
          minHeight: 400,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        
        }}
      >
        <div className="logo">
          <h1>Cập Nhật Khuyến Mãi</h1>
        </div>
        <nav>
          <ul>
            <li className="fs16">
              <Link to={`/admin/promotion/${ProductId}`} className="home-link">
                Quay lại
              </Link>
            </li>
          </ul>
        </nav>
        <Form
        form={form}
        name="productTypeForm"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
            PromotionType: Promotion.promotionType, 
            DiscountValue: Promotion.value, 
            DiscountPercentage: Promotion.value, 
            Description: Promotion.description, 
          }}
        style={{ marginTop:20 ,fontWeight:700, fontSize:'16px'}}
  
      >
        <div style={{ margin: '20px' }}>
        <label htmlFor="start-date">Ngày bắt đầu:</label>
        <DatePicker
            onChange={handleStartDateChange}
            style={{ marginLeft: '10px', marginRight: '20px' , height:'40px'}}
            value={startDate ? moment(endDate, 'YYYY-MM-DD') : null}
        />

        <label htmlFor="end-date">Ngày kết thúc:</label>
        <DatePicker
            onChange={handleEndDateChange}
            value={endDate ? moment(endDate, 'YYYY-MM-DD') : null}
            style={{ marginLeft: '10px', marginRight: '20px', height:'40px' }}
        />
    
        </div>
        <Form.Item
          label="Loại khuyến mãi"
          name="PromotionType"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
        >
            <Select
            value={PromotionType}
            className='input-add'
            onChange={(value) =>  setPromotionType(value)} 

        >
            <Select.Option value="giamgiatien">Khuyến mãi giá trị</Select.Option>
            <Select.Option value="giamgiaphantram">Khuyến mãi phần trăm</Select.Option>
            </Select>
        </Form.Item>
        {PromotionType === 'giamgiatien' && (
            <Form.Item
              label="Giá trị khuyến mãi"
              name="DiscountValue"
              rules={[
                { required: true,  message: 'Vui lòng nhập giá trị khuyến mãi!' },
                
                ]}
                
            >
              <Input 
                type='number'
                value={PromotionValue}
                className='input-add' 
                onChange={(e) => setPromotionValue(e.target.value)} 
                placeholder="Nhập giá trị khuyến mãi"
              />
            </Form.Item>
          )}
          
          {PromotionType === 'giamgiaphantram' && (
            <Form.Item
              label="Phần trăm khuyến mãi"
              name="DiscountPercentage"
              rules={[{ required: true, message: 'Vui lòng nhập phần trăm khuyến mãi!' },
                {max:60, message:'Giá trị khuyến mãi tối đa là 60%'}
              ]}
            >
              <Input 
              type='number'
                value={PercentageValue} 
                className='input-add' 
                onChange={(e) => setPercentageValue(e.target.value)} 
                placeholder="Nhập phần trăm khuyến mãi"
              />
            </Form.Item>
          )}
          
          {!PromotionType && null}
     
      
      <Form.Item
      label="Mô tả"
      name="Description"
      rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
    >
      <Input value={Description} className='input-add' onChange={(e) => setDescription(e.target.value)} /> 
    </Form.Item>
        <Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" className='btn-add' onClick={handelSubmit}>
              Cập nhật
            </Button>
          </div>
        </Form.Item>
      </Form>
        </Content>

        <ToastContainer
          position="top-center"
          pauseOnHover={false}
          autoClose={1500}
          theme={'dark'}
        />
        </>);
}
 
export default PromotionEdit;