import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Col, message, notification, Row, Upload } from "antd";
import classes from "./UploadDocuments.module.css";
import axios from "axios";
const UploadDocuments = () => {
  const { Dragger } = Upload;

  const [files, setFiles] = useState([]);

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const uploadFiles = () => {
    files.fileList.map((file) => {
      let f = new FormData();
      f.append("document_file", file.originFileObj);
      f.append(
        "email",
        JSON.parse(sessionStorage.getItem("patientInfo")).email
      );
      f.append("document_name", file.name);

      axios
        .post("http://127.0.0.1:5000/add_document", f, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
           notification.success({
            message:`Document ${file.name} ajouté avec succés.`
           })
        });
    });
  };

  //   const props = {
  //     name: 'file',
  //     multiple: true,
  //     // action: 'https://run.mocky.io',
  //     onChange(info) {
  //       const { status } = info.file;
  //       if (status !== 'uploading') {
  //         console.log(info.file, info.fileList);
  //       }
  //       if (status === 'done') {
  //         message.success(`${info.file.name} ajouté avec succès.`);
  //       } else if (status === 'error') {
  //         message.error(`${info.file.name} file upload failed.`);
  //       }
  //     },
  //     onDrop(e) {
  //       console.log('Dropped files', e.dataTransfer.files);
  //     },
  //   };

  return (
    <Row
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Col style={{ marginTop: "7rem", fontSize: "1.5rem", fontWeight: "600" }}>
        <span>Ajouter documents</span>
      </Col>
      <Dragger
        onChange={(e) => {
          const fileType = e.file.type;
          const acceptedTypes = ["image/png", "image/jpeg", "application/pdf, .csv"];

          if (!acceptedTypes.includes(fileType)) {
            notification.error({
              message: "Erreur",
              duration: 4,
              closable: true,
              description: "Type Fichier non valide.",
            });
            return false; // Prevent the file from being uploaded
          } else {
            //   handleChange1(e, type);
            setFiles(e);
          }
        }}
        customRequest={dummyRequest}
        accept="image/png, image/jpeg, application/pdf"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Cliquez ici ou bien drag-and-drop vos documents.
        </p>
      </Dragger>
      <Button onClick={uploadFiles} className={classes.btnAdd}>
        Ajouter Document(s)
      </Button>
    </Row>
  );
};

export default UploadDocuments;
