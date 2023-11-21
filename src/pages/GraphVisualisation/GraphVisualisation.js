import { Col,  Row } from "antd";
import React, { useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import axios from "axios";
import { Graph } from "react-d3-graph";
import { useLocation } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

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
  const classify_document = (filename) => {
    const file_extension = filename
      ? filename.split(".").pop().toLowerCase()
      : "";
    console.log(file_extension);
    if (file_extension === "pdf") {
      return "#B3A492";
    } else if (["jpg", "jpeg", "png", "gif", "bmp"].includes(file_extension)) {
      return "#DADDB1";
    } else if (["xlsx", "xls"].includes(file_extension)) {
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

  const transformGraphData = (apiResponse) => {
    const nodes = apiResponse.nodes.map((node) => ({
      id: parseInt(node.id), // Assuming 'id' is the property that contains the node ID
      label: node.label || "Unknown", // Adjust 'name' based on your actual data structure
      group: "patient", // Adjust 'group' based on your actual data structure
      color:
        node.group === "patient"
          ? "lightblue"
          : node.group === "filtrate"
          ? "green"
          : classify_document(node.label),
      symbolType: node.group === "filtrate" ? "diamond" : "",
      size: node.group === "filtrate" ? "500" : "3000",
      labelText:
        node.group === "patient"
          ? node.info.nom + " " + node.info.prenom
          : node.info.name,
    }));

    const links = apiResponse?.edges?.map((edge) => ({
      // id:edge.from,
      source: parseInt(edge?.from), // Assuming 'id' is the property that contains the patient ID
      target: parseInt(edge?.to), // Assuming 'id' is the property that contains the document ID
      value: 1,
      label: edge.label,
    }));

    return { nodes: nodes, links: links };
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

  return (
    <>
      <Header />

      <Row style={{ display: "flex", justifyContent: "center" }}>
        <h1>Graph Visualizer</h1>
      </Row>
      {/* <ArrowLeftOutlined style={{backgroundColor:"green",marginLeft:"10rem"}}/> */}

      <div
        style={{
          height: "100%",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Row>
          <ul>
            {legendData.map((item, index) => (
              <li key={index} style={{ display: "flex" }}>
                <Col>
                  <span
                    style={{
                      display: "inline-block",
                      width: "20px", // Adjust the width as needed
                      height: "20px", // Adjust the height as needed
                      marginBottom: "1rem", // Add spacing between color square and label
                      color: item.color,
                      backgroundColor: item.color,
                    }}
                  >
                    &#9632;
                  </span>{" "}
                </Col>
                <Col style={{ marginLeft: "1rem" }}> {item.label}</Col>
              </li>
            ))}
          </ul>
        </Row>
        <Graph
          id="graph-id"
          data={graphData}
          config={graphConfig}
          style={{ height: "100vh" }}
        />
      </div>
    </>
  );
};

export default GraphVisualisation;
