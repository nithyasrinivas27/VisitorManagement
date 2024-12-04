import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jwtDecode } from 'jwt-decode';  // Use named import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons';
const ApprovedVisitorsExcel = () => {
  const [visitors, setVisitors] = useState([]);
  const token = localStorage.getItem('token');
  let user = jwtDecode(token);  
  useEffect(() => {
    // Fetch approved visitors
    if (user.role!=="Manager") {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/approved-visitors`).then((response) => {
        setVisitors(response.data);
      });
    }else{
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/visitors/approved-visitors/${user.id}`).then((response) => {
        setVisitors(response.data);
      });
    }
  }, []);

  const downloadExcel = () => {
    console.log(visitors)
    const worksheet = XLSX.utils.json_to_sheet(visitors.map(visitor => ({
      Name: visitor?.name,
      Address: visitor?.address,
      Email: visitor?.email,
      Purpose: visitor?.purpose,
      ProofId: visitor?.proofId,
      Employee: visitor?.employeeId?.name,
      Status: visitor?.status
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Approved Visitors');

    // Generate buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    // Save to file
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'approved_visitors.xlsx');
  };

  return (
    <div>
      <button onClick={downloadExcel} className="add-visitor-btn"><FontAwesomeIcon icon={faDownload} /> Download Approved Visitors</button>
    </div>
  );
};

export default ApprovedVisitorsExcel;
