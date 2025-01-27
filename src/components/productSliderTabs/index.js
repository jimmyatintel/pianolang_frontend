import {Tabs,Tab, TabContent, Container } from "react-bootstrap";
import ProductCard from "../productSlider";
import latestPro from "../../services/latestProducts";
import specialPro from "../../services/specialProducts";
import bestPro from "../../services/bestProducts";
import offersPro from "../../services/offersProducts";
import "./style.css";
import React from "react";

function ProductTabs(props) {

  const [key, setKey] = React.useState('month');
  const [slides, setSlides] = React.useState([]);
  const [monthslides, setmonthslides] = React.useState(null);
  const [dayslides, setdayslides] = React.useState(null);
  const [weekslides, setweekslides] = React.useState(null);
  React.useEffect(() => {
    if(key === "week") {
      setSlides(weekslides);
    } else if(key === "day") {
      setSlides(dayslides);
    } else if(key === "month") {
      setSlides(monthslides);
    } else {
      setSlides(monthslides);
    }
  }, [key,weekslides,monthslides,dayslides]);
  React.useEffect(() => {
    const fetchMonth = async () => {
      const response = await fetch(process.env.REACT_APP_API_URL + `/api/gettopmonth`);
      const data = await response.json();
      console.log(data);
      setmonthslides(data);
    };
    const fetchDay = async () => {
      const response = await fetch(process.env.REACT_APP_API_URL+`/api/gettopday`);
      const data = await response.json();
      console.log(data);
      setdayslides(data);
    };
    const fetchWeek = async () => {
      const response = await fetch(process.env.REACT_APP_API_URL+`/api/gettopweek`);
      const data = await response.json();
      console.log(data);
      setweekslides(data);
    };
    fetchMonth();
    fetchWeek();
    fetchDay();
  }, []);
  if (!monthslides || !weekslides || !dayslides) {
    return <div>Loading...</div>;
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
        className="mb-3 ms-4"
      >
         <Tab eventKey="month" title="每月排行">
        
        </Tab>
        <Tab eventKey="week" title="每週排行">
          
        </Tab>
        <Tab eventKey="day" title="每日排行">
          
        </Tab>
      </Tabs>
      <ProductCard slides={slides}/>
      </Container>
    </div>
  );
}

export default ProductTabs;
