import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "./style.css";

const ComposerList = () => {
  const [composers, setComposers] = useState([]);

  useEffect(() => {
    const fetchComposers = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL+'/api/getcomposerlist');
        const data = await response.json();
        setComposers(data);
      } catch (error) {
        console.error('Error fetching composers:', error);
      }
    };
    fetchComposers();
  }, []); 
  
  return (
    <Container className="py-5 composer-page">
      <h2 className="text-center mb-5">作曲家分類</h2>
      <Row className="justify-content-center">
        {composers.map((composer, index) => (
          <Col key={index} xs={6} md={3} lg={2} className="text-center mb-3">
            <div className="composer-card">
              <div className="composer-image-wrapper">
                <img 
                  src={composer.s3_link}
                  alt={composer.composer}
                  className="composer-image"
                />
              </div>
              <h5 className="mt-2 mb-1">{composer.composer}({composer.count})</h5>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ComposerList;
