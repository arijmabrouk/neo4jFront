import React, { useContext, useEffect } from "react";
import InputComponent from "../../../components/InputComponent/InputComponent";
import { Col, Form, Row, notification } from "antd";
import GlobalContext from "../../../context/GlobalContext";
import classes from "./UpdateProfile.module.css";
import axios from "axios";

const UpdateProfile = () => {
  const { form, setPatientInfo, patientInfo } = useContext(GlobalContext);

  useEffect(()=>{
     form.setFieldsValue({
      ...JSON.parse(sessionStorage.getItem("patientInfo")),
 
     })
     console.log(form.getFieldsValue);
  },[])


  const updateProfile = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };
    axios
      .put(
        `http://127.0.0.1:5000/users/update`,

        {
          email: form.getFieldsValue()["email"],
          nom: form.getFieldsValue()["nom"],
          prenom: form.getFieldsValue()["prenom"],
          age: form.getFieldsValue()["age"],
          adresse: form.getFieldsValue()["adresse"],
          telephone: form.getFieldsValue()["téléphone"],
          sexe: form.getFieldsValue()["civilité"] === "Mme" ? "female" : "male",
        },
        config
      )
      .then((response) => {
        let patientInfo = {
          email: response.data.email,
          nom: response.data.nom,
          prenom: response.data.prenom,
          age: response.data.age,
          adresse: response.data.adresse,
          téléphone: response.data.telephone,
          civilité: response.data.sexe === "female" ? "Mme" : "Mr",
        };
        sessionStorage.setItem("patientInfo", JSON.stringify(patientInfo));
        setPatientInfo(patientInfo);

        notification.success({
          message: "Profile mis à jour avec succés",
        });

        // window.location.reload()
      });
  };

  return (
    <Form
      className={classes.container}
      layout="vertical"
      form={form}
      onFinish={updateProfile}
    >
      <Col
        style={{ marginBlock: "5rem", fontSize: "1.5rem", fontWeight: "600" }}
      >
        <span>Modifier profile</span>
      </Col>
      <Row gutter={24}>
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
          // addonAfter={<PhoneOutlined style={{ color: "black" }} />}
          inputType="phone"
          collg={12}
          colMd={12}
          colxs={24}
          defaultValue={"+33"}
        />
        {/* <InputComponent
          name="Ancien password"
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
        /> */}
      </Row>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <button className={classes.loginBtn} type="submit">
          Modifier
        </button>
      </Row>
    </Form>
  );
};

export default UpdateProfile;
