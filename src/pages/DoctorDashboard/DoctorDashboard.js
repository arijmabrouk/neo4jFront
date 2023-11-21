import React, { useContext, useState } from "react";
import {
  LogoutOutlined,
  PieChartOutlined,
  PLusCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Layout, Menu, Row, theme } from "antd";
// import Header from "../../components/Header/Header";
import GlobalContext from "../../context/GlobalContext";
// import UpdateProfile from "./UpdateProfile/UpdateProfile";
// import UploadDocuments from "./UploadDocuments/UploadDocuments";
import { useNavigate } from "react-router-dom";
import PatientList from "./PatientList/PatientList";
import AddPatient from "./AddPatient/AddPatient";
const DoctorDashboard = () => {
  const { Content, Footer, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState('1');
  const {patientInfo}=useContext(GlobalContext)
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [

    getItem("Liste des patients", "1", <UserOutlined />),
    getItem("Ajouter patient", "2", <UserOutlined />),
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
          <Avatar style={{ backgroundColor: '#0EBE7F',marginBottom:"0.5rem" }} icon={<UserOutlined />} />
           Doctor
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
            {selectedItem==="1" && <PatientList/>}
           {selectedItem==="2" &&  <AddPatient />}
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

export default DoctorDashboard;
