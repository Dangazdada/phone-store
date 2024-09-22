import React from 'react';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Button } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';

const ExportToExcel = ({ data, fileName, sheetName }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { [sheetName]: ws }, SheetNames: [sheetName] }; // Đặt tên cho sheet từ prop 'sheetName'
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataFile = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(dataFile, `${fileName}${fileExtension}`); // Đặt tên cho file từ prop 'fileName'
  };

  return <Button type='primary' className='btn-export'  onClick={exportToExcel}>Xuất tệp<FileExcelOutlined /></Button>;
};

export default ExportToExcel;
