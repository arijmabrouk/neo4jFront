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
         <img  src={logo} className={classes.loaderLogo}/>
         </Col>
         <Col>
         <h1>Doctor Online</h1>
         </Col>
         <Col>
         <Button className={classes.getStartedBtn} onClick={handleClick}>Get Started</Button>
         </Col>
    </Row>
  )
}

export default Home