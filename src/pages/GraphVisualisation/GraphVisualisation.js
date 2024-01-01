import { Button, Col, DatePicker, Menu, Row, Switch } from "antd";
import React, { useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import axios from "axios";
import { Graph } from "react-d3-graph";
import { useLocation } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Prediction from "./Prediction/Prediction";
import Sider from "antd/es/layout/Sider";
import dayjs from "dayjs";
import ChatBoot from "../../components/ChatBotComponent/ChatBotComponent";
import classes from "./GraphVisualisation.module.css"
const GraphVisualisation = () => {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [legendData, setLegendData] = useState([
    { label: "Pdf", color: "#B3A492" },
    { label: "Image", color: "#DADDB1" },
    { label: "CSV", color: "#A7D397" },
    // {label:"Vidéo",color:"#BEADFA"},
    { label: "Patient", color: "lightblue" },
    // Add more legend items as needed
  ]);
  const [collapsed, setCollapsed] = useState(false);
  const [listTypes, setListTypes] = useState([]);
  const [predictPatient, setPredictPatient] = useState(false);
  // const [selectedItem, setSelectedItem] = useState("1");
  const [display, setDisplay] = useState(false);
  const [filtrate, setFiltrate] = useState(false);
  const [dateDebut, setDateDebut] = useState();
  const [dateFin, setDateFin] = useState();
  const classify_document = (filename) => {
    const file_extension = filename
      ? filename.split(".").pop().toLowerCase()
      : "";
    if (file_extension === "pdf") {
      return "#B3A492";
    } else if (["jpg", "jpeg", "png", "gif", "bmp"].includes(file_extension)) {
      return "#DADDB1";
    } else if (["xlsx", "xls", "csv"].includes(file_extension)) {
      return "#A7D397";
    } else if (["mp4", "avi", "mkv"].includes(file_extension)) {
      return "#BEADFA";
    } else {
      return "purple";
    }
  };
  const params = useLocation();

  const { email } = params.state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/graph?patient_email=${email}`);
        const transformedData = transformGraphData(response.data);
        setGraphData(transformedData);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchData();
  }, []);

  const onClickNode = (node) => {
    axios
      .get(`/get_node_info/${node}`)
      .then((res) => {
        //  if(res.data?.labels[0]==="Filtrate"){
        //   axios.get(`/document_types_graph?patient_email=${email}`).then((res)=>{
        //     const transformedData = transformGraphData(res.data);
        //       // console.log(res.data);
        //       setGraphData(transformedData);
        //   })
        //  }

        if (res.data?.labels[0] === "Patient") {
          setPredictPatient(true);
        }

        if(res.data.labels[0] === "Document"){
          fetch(res.data.properties.filepath)
        .then((response) => response.blob())
        .then((blob) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        })
        // console.log("lkj",res.data);
        }

      })
      .catch((e) => {
        console.log(e);
      });
  };
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    // getItem("Images", "1"),
    // getItem("Pdf", "2"),
    // getItem("Csv", "3"),
  ];

  const getGraphByType = () => {
    axios
      .get(
        `/document_types_graph?patient_email=${email}&document_types=${listTypes}`
      )
      .then((res) => {
        const transformedData = transformGraphData(res.data);
        // console.log(res.data);
        setGraphData(transformedData);
      });
  };

  const transformGraphData = (apiResponse) => {
    console.log(apiResponse.nodes);

    const addedFiltrateNodes = new Set(); // Track Filtrate nodes that have been added

    const nodes = apiResponse.nodes.map((node) => ({
      id: node.id,
      label: node.label || "Unknown",
      group: "patient",
      color:
        node.group === "patient"
          ? "lightblue"
          : node.group === "filtrate" 
          ? "green" : node.group === "display" ? "#b00d49"
          : classify_document(node.label),
      symbolType:
        node.group === "filtrate" || node.group === "display" ? "diamond" : "",
      size: node.group === "filtrate" || node.group === "display" ? 700 : 3000,
      labelText:
        node.group === "patient"
          ? `${node.info.nom} ${node.info.prenom}`
          : node.group === "filtrate"
          ? "Filtrate"
          : node.group === "display"
          ? "Display"
          : node.info.name,
      info: node.info,
    }));

    const links = apiResponse?.edges
      ?.map((edge) => {
        if (edge.label === "HAS_FILTRATE" && addedFiltrateNodes.has(edge.to)) {
          return null; // Skip adding edge for duplicate Filtrate nodes
        }

        if (edge.label === "HAS_FILTRATE") {
          addedFiltrateNodes.add(edge.to); // Add Filtrate node to the set
        }
        if (edge.label === "HAS_DISPLAY" && addedFiltrateNodes.has(edge.to)) {
          return null; // Skip adding edge for duplicate Filtrate nodes
        }

        if (edge.label === "HAS_DISPLAY") {
          addedFiltrateNodes.add(edge.to); // Add Filtrate node to the set
        }

        return {
          id: `${edge.from}-${edge.to}`,
          source: edge?.from,
          target: edge?.to,
          value: 1,
          label: edge.label,
        };
      })
      .filter((edge) => edge !== null); // Remove null entries (skipped edges)

    return { nodes, links };
  };

  const graphConfig = {
    // nodeHighlightBehavior: true,
    directed: true,
    renderLabel: true,

    maxZoom: 12,
    minZoom: 0.05,
    initialZoom: 1.3,

    node: {
      color: "lightblue",
      size: 500,
      highlightStrokeColor: "blue",
      renderLabel: true,
      labelProperty: "labelText",
      labelPosition: "center",
      wordWrap: true,
      onClick: onClickNode,
    },
    d3: {
      alphaTarget: 0.05,
      gravity: -250,
      linkLength: 120,
      linkStrength: 2,
      disableLinkForce: false,
    },
    link: {
      highlightColor: "lightblue",
      renderLabel: true, // Display link labels
      fontSize: 5, // Adjust font size of labels
      markerWidth: 6, // Adjust arrow size
      selfLinkDirection: "TOP_RIGHT",
    },
  };

  const handleSwitchChange = (type, checked) => {
    if (checked && !listTypes.includes(type)) {
      setListTypes([...listTypes, type]);
    } else if (!checked) {
      setListTypes(listTypes.filter((item) => item !== type));
    }
  };

  const getGraphByDate = () => {
    axios
      .get(
        `/documents_by_date_range?patient_email=${email}&start_date=${dateDebut}&end_date=${dateFin}`
      )
      .then((res) => {
        const transformedData = transformGraphData(res.data);
        setGraphData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching documents by date range:", error);
      });
  };

  return (
    <div>
      <Prediction
        predictPatient={predictPatient}
        setPredictPatient={setPredictPatient}
      />

      <ChatBoot />

      <Header />

      <div style={{ display: "flex", flexDirection: "row" }} className={classes.container}>
        {/* Graph Section */}
        {/* <Row style={{ display: "flex", justifyContent: "center" }}>
          <h1>Graph Visualizer</h1>
        </Row> */}
       
        <Row>
          <div
            style={{
              height: "50vh",
              width: "70vw",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Graph
              id="graph-id"
              data={graphData}
              config={graphConfig}
              style={{ height: "80vh" }}
              onClickNode={onClickNode}
            />
          </div>
        </Row>

        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "85vh",
            alignItems:"center",
            backgroundColor:"white",
            // boxShadow:" -4px 0px 3px 0px rgba(100, 100, 111, 0.2)"

          }}
        >
          {/* {!filtrate && !display && ( */}
            <Col
              style={{
                marginTop: "2rem",
                // marginRight: "2rem",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Button
                style={{ border: "#2d6c8c 1px solid", color: "#2d6c8c" }}
                onClick={() =>{ setFiltrate(true)
                  setDisplay(false)}
                }
              >
                Synthèse basique
              </Button>
              <Button
                style={{
                  // marginBlock: "1rem",
                  border: "#2d6c8c 1px solid",
                  color: "#2d6c8c",
                }}
                onClick={() =>{ setDisplay(true)
                  setFiltrate(false)
                }}
              >
                Synthèse avancé
              </Button>
              <Button style={{ border: "#2d6c8c 1px solid", color: "#2d6c8c" }} onClick={()=>{
                axios.post(`/topic/multiple`,{
                  email:email,
                  algo: 'CSV'
                }).then((res)=>{ 
                  console.log(res.data);
                  const transformedData = transformGraphData(res.data);
                  setGraphData(transformedData);})
              }}>
                Synthèse basée sur le contenu
              </Button>
            </Col>
           
          {filtrate && (
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                alignItems:"center"
              }}
            >
              <h4>Choisir les types de documents</h4>
              <Row
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBlock: "2rem",
                }}
              >
                <Col>
                  <span style={{marginRight:"1rem"}}>Images</span>
                  <Switch
                    style={{ width: "20%" }}
                    onChange={(e) => handleSwitchChange("Image", e)}
                    checked={listTypes.includes("Image")}
                  />
                </Col>
                <Col style={{marginBlock:"1rem"}}>
                  {" "}
                  <span style={{marginRight:"2rem"}}>PDF</span>
                  <Switch
                    style={{ width: "20%" }}
                    onChange={(e) => handleSwitchChange("PDF", e)}
                    checked={listTypes.includes("PDF")}
                  />
                </Col>
                <Col>
                  {" "}
                  <span style={{marginRight:"2rem"}}>CSV</span>
                  <Switch
                    style={{ width: "20%" }}
                    onChange={(e) => handleSwitchChange("CSV", e)}
                    checked={listTypes.includes("CSV")}
                  />
                </Col>
              </Row>
              <Button style={{marginRight:"1rem"}} onClick={()=>setFiltrate(false)}>Retour</Button>
              <Button onClick={getGraphByType}>Synthétiser</Button>

            </Sider>
          )}
          {display && (
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              <h4 style={{textAlign:"center"}}>Choisir une date de début et une date de fin</h4>
              <Row
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBlock: "2rem",
                  textAlign:"center",
                  marginLeft:"1rem"
                }}
              >
                <span>Date de début</span>
                <DatePicker
                  style={{ marginBlock: "1rem" }}
                  onChange={(e) => setDateDebut(dayjs(e).format("YYYY-MM-DD"))}
                />
                <span>Date de fin</span>
                <DatePicker
                  style={{ marginBlock: "1rem" }}
                  onChange={(e) => setDateFin(dayjs(e).format("YYYY-MM-DD"))}
                />
              </Row>
              <Button style={{marginInline:"0.5rem"}} onClick={()=>setDisplay(false)}>Retour</Button>
              <Button onClick={getGraphByDate}>Synthétiser</Button>
            </Sider>
          )}

          <Col style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
            <h3 style={{ marginLeft: "1rem" }}>Légende explicative de DEP</h3>
            <ul style={{display:"flex",flexDirection:"row"}}>
              {legendData.map((item, index) => (
                <li key={index} style={{ display: "flex" }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: "20px", // Adjust the width as needed
                      height: "20px", // Adjust the height as needed
                      marginLeft: "1rem", // Add spacing between color square and label
                      color: item.color,
                      backgroundColor: item.color,
                    }}
                  >
                    &#9632;
                  </span>{" "}
                  {item.label}
                </li>
              ))}
            </ul>
          </Col>
        </Row>

        {/* List Section */}
      </div>
    </div>
  );
};

export default GraphVisualisation;
