import React, { useEffect, useState } from 'react';
import "./Statistics.css";
import RevenueChart from './RevenueChart';
import axiosClient from '../../../Components/Other/axiosClient';
import { Modal } from 'bootstrap';
import { Link } from 'react-router-dom';

const currentYear = new Date().getFullYear();
const Revenue = () => {
 
  const [data, setData] = useState([]);
  const [statType, setStatType] = useState('revenue_monthly');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countToday, setCountToday] =useState(0);
  const [countThisMonth, setCountThisMonth] =useState(0);
  const [countAll, setCountAll] =useState(0);


 
      useEffect( () => {
        // get invocie by month
        axiosClient.get(`/Invoices/monthly?startDate=${currentYear}-01-01&endDate=${currentYear}-12-31`)
        .then(res => {
          setData(res.data);
        })
        .catch(error => console.log('error get invoice by month', error.data) );
        //count access today
        axiosClient.get('/PageViews/today')
        .then(res => {
          setCountToday(res.data);
        })
        .catch(error => console.log('error count access today', error.data) );

        //count access this month
        axiosClient.get('/PageViews/thismonth')
        .then(res => {
          setCountThisMonth(res.data);
        })
        .catch(error => console.log('error count access this month', error.data) );

         //count access all
         axiosClient.get('/PageViews/countAll')
         .then(res => {
           setCountAll(res.data);
         })
         .catch(error => console.log('error count access all', error.data) );
          },[]);
          const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleRevenueTypeChange = (type) => {
    setStatType(type);
    closeModal();
  };

  const fillMissingMonths = (data) => {
    const currentYear = new Date().getFullYear();
    const monthsWithData = data.map(item => item.month);
    const filledData = [];
  
    for (let month = 1; month <= 12; month++) {
      if (monthsWithData.includes(month)) {
        const existingData = data.find(item => item.month === month);
        filledData.push(existingData);
      } else {
        filledData.push({
          year: currentYear,
          month: month,
          totalRevenue: 0  // hoặc giá trị mặc định khác nếu cần
        });
      }
    }
  
    return filledData;
  }
  
  // Áp dụng hàm fillMissingMonths cho dữ liệu thu nhập hàng tháng
  const filledData = fillMissingMonths(data);
  
  // Chuẩn bị dữ liệu để sử dụng trong biểu đồ hoặc công việc khác
  const revenueData = {
    labels: filledData.map(item => `${item.month} / ${item.year}`),
    values: filledData.map(item => item.totalRevenue),
  };
    
      console.log('data', data);  
      console.log('currentYear', currentYear);
      return  (
        <>
        <div className="logo">
        <h1 >Danh Mục Thống Kê</h1>
      </div>
        

      <div  style={{ marginBottom: '20px' , display:'flex' , justifyContent: 'center'}}>

        <button onClick={openModal} style={buttonStyle}>
          Thống kê doanh thu
        </button>
        
      </div>

      <div className='chartBlock'>
        <h3>Biểu đồ Doanh Thu Năm {currentYear} (VNĐ)</h3>
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center',  }}>
          <RevenueChart data={revenueData}  />
        </div>
      </div>

      <div  className = "tableBlock">
        <h3 style={{marginBottom:'10px'}}>Thống kê lượt truy cập </h3>
        <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '50%' }}>
        <thead>
          <tr>
            <th className='tableLabel' >Hôm nay</th>
            <th className='tableLabel'>Tháng này</th>
            <th className='tableLabel'>Tổng lượt truy cập</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='tableContent' >{countToday}</td>
            <td className='tableContent'>{countThisMonth}</td>
            <td className='tableContent'>{countAll}</td>
          </tr>
        </tbody>
      </table>
      </div>

      {isModalOpen && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>Chọn loại thống kê doanh thu</h2>
            <Link to='/admin/dailyrevenue'>

            <button  style={buttonStyle}>Doanh thu theo ngày</button>
            </Link>

            <Link to='/admin/mothrevenue'>
            <button  style={buttonStyle}>Doanh thu theo tháng</button>
            </Link> 

           {/* <Link to=''>
            <button  style={buttonStyle}>Doanh thu theo năm</button>
            </Link>
            */}

            <button onClick={closeModal} style={buttonStyle}>Đóng</button>
          </div>
        </div>
      )}

        </>
      );
}
const buttonStyle = {
   padding: '7px 15px',
  fontSize: '13px',
  margin: '5px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  outline: 'none',
  transition: 'background-color 0.3s ease',
};

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 5px 15px rgba(0,0,0,.5)',
};
export default Revenue;