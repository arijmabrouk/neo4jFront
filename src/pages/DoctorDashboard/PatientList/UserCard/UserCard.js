import { Button, Col, Row } from 'antd'
import React, { useState } from 'react'
import classes from "./UserCard.module.css"
import patient from "../../../../assets/patinett.svg"
import { useNavigate } from 'react-router-dom'
import ModalAddDocument from '../ModalAddDocument/ModalAddDocument'
const UserCard = (props) => {
    const navigate=useNavigate()
    const {user,index}=props
    const [isModalOpen,setIsModalOpen]=useState(false)
    const addDocumentToPatient=()=>{

        setIsModalOpen(true)

    }
  return (
    <>
    <ModalAddDocument isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} user={user} />
    <Col xs={7} index={index} className={classes.card}>
        <img src={patient} style={{height:"5rem",marginBottom:"2rem"}} />
        {user?.email}
        <Row style={{display:"flex",flexDirection:"column"}}>
        <Button className={classes.btnAccess} onClick={()=>{
            navigate('/graph',{
                state: {
                  email: user?.email,
                },
              })
        }}>
            Accéder
        </Button>
        <Button className={classes.btnAccess} onClick={addDocumentToPatient}>
            Ajouter un document
        </Button>
        </Row>

    </Col></>
  )
}

export default UserCard