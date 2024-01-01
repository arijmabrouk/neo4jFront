import { Button, Col, Row } from 'antd'
import React from 'react'
import classes from "./Home.module.css"
import logo from "../../assets/Logo.png"
import { useNavigate } from 'react-router-dom'

const Home = () => {
const navigate=useNavigate()
    const handleClick=()=>{
        navigate('/login')
    }
  return (
    <Row className={classes.homeSplashScreen}>
         <Col>
         <img  src={logo} />
         </Col>
        
         <Col>
         <Button className={classes.getStartedBtn} onClick={handleClick}>Commencer</Button>
         </Col>
    </Row>
  )
}

export default Home