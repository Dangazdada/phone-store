
import { useAuth  } from "./Components/Other/auth";
import { Fragment, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DefaultLayout from './Components/User/Layout/DefaultLayout';
import { LayoutOnlyHeader } from "./Components/User/Layout/Index";
import {routes} from "./Routes/index";
import Product from './Pages/Admin/ProductAdmin/Product';
import LoginAdmin from  "../src/Pages/Admin/Login/Login";
import { jwtDecode } from "jwt-decode";




function App() {
  
  
  let checktoken = false;
    const token = localStorage.getItem('tokenadmin');
    if (token) {
      const decodedToken = jwtDecode(token);
      checktoken = (decodedToken && decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin');
    }
    console.log(checktoken);



  return (

      <Router>

      <Routes>
         
      {routes.map((route, index) => {
       
       
        
           
            const Page = route.page;
            let Layout = DefaultLayout;
             if(route.layout)
            {
              Layout = route.layout
            }
            else if(route.layout === null)
            {
              Layout = Fragment
            }
            if (route.path.startsWith('/admin') && checktoken !== true && route.path !== "/admin/login") {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<Navigate to="/admin/login" />}
                />
              );
            }
           
            return (
              <Route
                key={index}
                path={route.path}
                element={
                    <Layout>
                      <Page />
                    </Layout>
                }
                 
                
              />
            );


       
      })}
       
      </Routes>
      </Router>

  );
}


export default App;