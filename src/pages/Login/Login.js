import { Button, Col, Form, Row } from "antd";
import React, { useContext } from "react";
import InputComponent from "../../components/InputComponent/InputComponent";
import classes from "./Login.module.css";
import GlobalContext from "../../context/GlobalContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Patient,Doctor } from "../../components/Icons/Icons";

 
const Login = () => {

  const { form } = useContext(GlobalContext);
  const navigate = useNavigate();
  const radioValues = [
    {
      name: "Patient",
      card: true,
      cardImage: <Patient />,
    },
    {
      name: "Docteur",
      card: true,
      cardImage: <Doctor />,
    },
    
    // Add more items as needed
  ];


 

  const LoginFunction = () => {
    console.log(form.getFieldsValue());
    axios
      .post(`http://127.0.0.1:5000/login`, {
        email: form.getFieldsValue()["email"],
        password: form.getFieldsValue()["password"],
        role: form.getFieldsValue()['typeLogin']==="Patient"? "PATIENT":"User",
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.access_token);
        if(form.getFieldsValue()['typeLogin']==="Patient"){
            let patientInfo={
                email:form.getFieldsValue()["email"],
                nom:response.data.name,
                prenom:response.data.prenom,
                age:response.data.age,
                adresse:response.data.adresse,
                téléphone:response.data.telephone,
                sexe:response.data.sexe
            }

            form.setFieldsValue({
                ...form.getFieldsValue(),
                civilite:response.data.sexe==="female"?"Mme":"Mr",
                nom:response.data.name,
                prenom:response.data.prenom,
                age:response.data.age,
                adresse:response.data.adresse,
                téléphone:response.data.telephone,
                email:form.getFieldsValue()["email"]
            })

            sessionStorage.setItem("patientInfo",JSON.stringify(patientInfo))
            navigate("/PatientDashboard")
        }
        else{

            navigate("/DoctorDashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form
      className={classes.container}
      layout="vertical"
      form={form}
      onFinish={LoginFunction}
    >
      <Col
        style={{ marginBlock: "5rem", fontSize: "1.5rem", fontWeight: "600" }}
      >
        <span>Bienvenue</span>
      </Col>

     

      <Row gutter={24} className={classes.rowFormulaire}>
      <InputComponent
        inputType="radio"
        name="typeLogin"
        radioValues={radioValues}
        defaultValue="Voiture personnelle"
        form={form}
      />
        <InputComponent
          name="email"
          required={true}
          messageRemplissage="Veuillez remplir ce champ."
          pattern={new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)}
          label="Adresse e-mail "
          size="large"
          className={classes.label}
          type="email"
          messageVerification="Veuillez vérifier ce champ."
          inputType="input"
          collg={24}
          colMd={24}
          colxs={24}
        />

        <InputComponent
          name="password"
          required={true}
          messageRemplissage="Veuillez remplir ce champ."
          messageVerification="Veuillez vérifier ce champ."
          label="Mot de passe"
          size="large"
          className={classes.label}
          inputType="input"
          type="password"
          collg={24}
          colMd={24}
          colxs={24}
          defaultValue={"+33"}
        />
    <span className={classes.haveAccount}>Vous n'avez pas un compte? <span className={classes.login} onClick={()=>navigate('/Register')}>Register</span></span>
      </Row>


      <button className={classes.loginBtn}>Login</button>
    </Form>
  );
};

export default Login;
