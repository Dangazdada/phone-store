import React from 'react';
import ExportToExcel from './ExportToExcel'; // Đặt đúng đường dẫn đến component ExportToExcel

const App = () => {
  const data = [
    { id: 1, name: 'Alice', age: 24 },
    { id: 2, name: 'Bob', age: 28 },
    { id: 3, name: 'Charlie', age: 22 }
  ];

  const handleExport = () => {
    // Đặt tên file và sheet theo nhu cầu của bạn
    const fileName = 'my_data';
    const sheetName = 'My Sheet';

    return <ExportToExcel data={data} fileName={fileName} sheetName={sheetName} />;
  };

  return (
    <div>
      <h1>Export Data to Excel</h1>
      {handleExport()}
    </div>
  );
};

export default App;
