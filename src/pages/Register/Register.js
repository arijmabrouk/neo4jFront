import { Col, Form, Row, notification } from "antd";
import React, { useContext } from "react";
import InputComponent from "../../components/InputComponent/InputComponent";
import classes from "./Register.module.css";
import { PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Doctor, Patient } from "../../components/Icons/Icons";
import GlobalContext from "../../context/GlobalContext";
import axios from "axios";

const Register = () => {
  const {form}=useContext(GlobalContext)
    const navigate=useNavigate()
    const handleClick =()=>{
        navigate("/login")
    }
    const radioValues = [
      {
        name: "Patient",
        card: true,
        cardImage: <Patient />,
      },
      // {
      //   name: "Docteur",
      //   card: true,
      //   cardImage: <Doctor />,
      // },
      
      // Add more items as needed
    ];

    const RegisterFunction=()=>{
      axios
      .post(
        `http://127.0.0.1:5000/add_patient`,

        {
          email: form.getFieldsValue()["email"],
          nom: form.getFieldsValue()["nom"],
          prenom: form.getFieldsValue()["prenom"],
          age: form.getFieldsValue()["age"],
          adresse: form.getFieldsValue()["adresse"],
          telephone: form.getFieldsValue()["téléphone"],
          sexe: form.getFieldsValue()["civilité"] === "Mme" ? "female" : "male",
          password:form.getFieldsValue()["password"]
        },
        
      ).then(()=>{
        notification.success({
          message:"Patient ajouté avec succées"
        })
        navigate("/login")
      })
    }

  return (
    <>
    <Header />
    <Form className={classes.container} layout="vertical" onFinish={RegisterFunction} form={form}>
      <Col
        style={{ marginBlock: "5rem", fontSize: "1.5rem", fontWeight: "600" }}
      >
        <span>Register</span>
      </Col>
      <Row gutter={24} className={classes.rowFormulaire}>
      <InputComponent
        inputType="radio"
        name="typeLogin"
        radioValues={radioValues}
        collg={24}
      />
        <InputComponent
          name="civilite"
          messageRemplissage="Veuillez remplir ce champ."
          label="Civilité"
          inputType="select"
          required="true"
          options={[
            {
              value: "Mme",
              label: "Mme.",
            },
            {
              value: "M",
              label: "M.",
            },
          ]}
          collg={12}
          colMd={12}
          colxs={24}
          className={classes.label}
        />
        <InputComponent
          name="nom"
          required={true}
          messageRemplissage="Veuillez remplir ce champ."
          pattern={
            new RegExp("^(?!\\s)(?!.*\\s\\s)[\\p{L}_\\s'-]*(?<!\\s)$", "u")
          }
          messageVerification="Veuillez vérifier ce champ."
          label="Nom"
          size="large"
          inputType="input"
          className={classes.label}
          collg={12}
          colMd={12}
          colxs={24}
        />
        <InputComponent
          name="prenom"
          required={true}
          messageRemplissage="Veuillez remplir ce champ."
          pattern={
            new RegExp("^(?!\\s)(?!.*\\s\\s)[\\p{L}_\\s'-]*(?<!\\s)$", "u")
          }
          messageVerification="Veuillez vérifier ce champ."
          label="Prénom"
          size="large"
          className={classes.label}
          inputType="input"
          collg={12}
          colMd={12}
          colxs={24}
        />

        <InputComponent
          name="age"
          required={true}
          messageRemplissage="Veuillez remplir ce champ."
          label="Âge"
          size="large"
          className={classes.label}
          inputType="input"
          collg={12}
          colMd={12}
          colxs={24}
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
          collg={12}
          colMd={12}
          colxs={24}
        />
         <InputComponent
          name="adresse"
          required={true}
          messageRemplissage="Veuillez remplir ce champ."
          label="Adresse"
          size="large"
          className={classes.label}
          inputType="input"
          collg={12}
          colMd={12}
          colxs={24}
        />
         <InputComponent
          name="téléphone"
          namePrefix="prefixTel"
          required={true}
          pattern={new RegExp(/^0?[67]\d{8}$/)}
          messageRemplissage="Veuillez remplir ce champ."
          messageVerification="Veuillez vérifier ce champ."
          label="Numéro de téléphone"
          size="large"
          className={classes.label}
          addonAfter={<PhoneOutlined style={{ color: "black" }} />}
          inputType="phone"
          collg={12}
          colMd={12}
          colxs={24}
          defaultValue={"+33"}
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
          collg={12}
          colMd={12}
          colxs={24}
          defaultValue={"+33"}
        />
      <span className={classes.haveAccount}>Vous-avez déjà un compte? <span className={classes.login} onClick={handleClick}>LogIn</span></span>

      </Row>

      <button className={classes.loginBtn}>Register</button>


    </Form>
    </>
  );
};

export default Register;
