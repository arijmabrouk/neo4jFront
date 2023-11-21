import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UserCard from './UserCard/UserCard'
import { Col, Row } from 'antd'



const PatientList = () => {
    const [listUsers,setListUsers]=useState([])
    const [Loader,setLoader]=useState(true)
    useEffect(()=>{

        
        axios.get("http://127.0.0.1:5000/patients").then((res)=>{
            setListUsers(res.data)
            setLoader(false)
        })
    },[])
  return (
    <div style={{display:"flex",flexDirection:"column"}}>
     <Col
        style={{ marginTop: "5rem", fontSize: "1.5rem", fontWeight: "600" }}
      >
        <span>Liste des patients</span>
      </Col>
      
    <Row style={{marginTop:"5rem",display:"flex",justifyContent:"space-between",flexDirection:"row"}}>
        {
            listUsers.map((user,index)=>(
                <UserCard 
                user={user}
                index={index}
                 />
            ))
        }
    </Row>
    </div>
  )
}

export default PatientList