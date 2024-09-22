import { Layout } from 'antd';
import React, { useEffect } from 'react';
const LayoutNull = ({children}) => {

    useEffect(() => {
        if(children.type.name === "Login")
        {
            document.title = "Đăng nhập admin"
        }

    },[children])

    return ( <>
        <Layout>
            {children}
        </Layout>
        </> );
}
 
export default LayoutNull;