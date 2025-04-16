import {Tabs,Tab, TabContent, Container } from "react-bootstrap";
import ProductCard from "../productSlider";
import latestPro from "../../services/latestProducts";
import specialPro from "../../services/specialProducts";
import bestPro from "../../services/bestProducts";
import offersPro from "../../services/offersProducts";
import { Spinner } from 'react-bootstrap';
import "./style.css";
import React from "react";

function ProductTabs(props) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [key, setKey] = React.useState('month');
  const [slides, setSlides] = React.useState([]);
  const [monthslides, setmonthslides] = React.useState();
  const [yearslides, setyearslides] = React.useState();
  const [weekslides, setweekslides] = React.useState();
  React.useEffect(() => {
    if(key === "week" && weekslides) {
      setSlides(weekslides);
    } else if(key === "year" && yearslides) {
      setSlides(yearslides);
    } else if(key === "month" && monthslides) {
      setSlides(monthslides);
    }
  }, [key,weekslides,monthslides,yearslides]);
  React.useEffect(() => {
    const fetchMonth = async () => {
      const response = await fetch(process.env.REACT_APP_API_URL + `/api/gettopmonth`);
      const data = await response.json();
      console.log(data);
      setmonthslides(data);

    };
    const fetchyear = async () => {
      const response = await fetch(process.env.REACT_APP_API_URL+`/api/gettopyear`);
      const data = await response.json();
      console.log(data);
      setyearslides(data);
    };
    const fetchWeek = async () => {
      const response = await fetch(process.env.REACT_APP_API_URL+`/api/gettopweek`);
      const data = await response.json();
      console.log(data);
      setweekslides(data);
    };
    fetchMonth();
    fetchWeek();
    fetchyear();
  }, []);
  if (!monthslides || !weekslides || !yearslides) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
        <Spinner animation="border" role="status"  style={{marginLeft: '20px'}}>
          <span className="sr-only"></span>
        </Spinner>
      </div>
    );
  }
  return (
    <div className="productTabs">
        <Container>
        {/* <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext> */}
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        id="controlled-tab-example"
        className="mb-3 ms-4 mt-5"
      >
         <Tab eventKey="month" title="每月排行">
        
        </Tab>
        <Tab eventKey="week" title="每週排行">
          
        </Tab>
        <Tab eventKey="year" title="歷史排行">
          
        </Tab>
      </Tabs>
      <ProductCard slides={slides}/>
      </Container>
    </div>
  );
}

export default ProductTabs;
