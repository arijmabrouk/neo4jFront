import React, { useContext, useState } from "react";
import {
  LogoutOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Layout, Menu, Row, theme } from "antd";
import Header from "../../components/Header/Header";
import GlobalContext from "../../context/GlobalContext";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import UploadDocuments from "./UploadDocuments/UploadDocuments";
import { useNavigate } from "react-router-dom";
const PateintDashboard = () => {
  const { Content, Footer, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState('1');
  const {patientInfo,form}=useContext(GlobalContext)
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [

    getItem("Documents", "1", <FileOutlined />),
    getItem("Profile", "2", <UserOutlined />),
    getItem("Se déconnecter", "3", <LogoutOutlined />),

    // getItem("User", "sub1", <UserOutlined />, [
    //   getItem("Tom", "3"),
    //   getItem("Bill", "4"),
    //   getItem("Alex", "5"),
    // ]),
    // getItem("Team", "sub2", <TeamOutlined />, [
    //   getItem("Team 1", "6"),
    //   getItem("Team 2", "8"),
    // ]),
    // getItem("Files", "9", <FileOutlined />),
  ];
  const navigate=useNavigate()
  const Logout=()=>{
    navigate("/login")
    localStorage.clear()
    sessionStorage.clear()
  }
  let user=JSON.parse(sessionStorage.getItem("patientInfo"))
  return (
    <>
      {/* <Header /> */}
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          
        >
          <div className="demo-logo-vertical" />

          <Row style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",marginBlock:"2rem"}}>
          <Avatar style={{ backgroundColor: '#2d6c8c',marginBottom:"0.5rem" }} icon={<UserOutlined />} />
           {user.nom + " "+ user.prenom}
          </Row>

          <Menu
            // theme="dark"
            defaultSelectedKeys={selectedItem}
            onSelect={(key)=>setSelectedItem(key.key)}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          {/* <Header
        style={{
          padding: 0,
          background: "black",
        }}
      /> */}
          <Content
            style={{
              margin: "0 16px",
              display:"flex",
              justifyContent:"center"
            }}
          >
            {selectedItem==="1" && <UploadDocuments/>}
           {selectedItem==="2" &&  <UpdateProfile />}
           {selectedItem==="3" && Logout()}
          
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default PateintDashboard;
