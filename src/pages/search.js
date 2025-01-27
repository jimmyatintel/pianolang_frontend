import React from 'react';
import { Container, Form, FormControl, Button, ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useEffect } from 'react';
import { Link } from "react-router-dom";

const SearchPage = () => {
    const navigate = useNavigate(); 
    const [keyword, setKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false); 
    const handlechange = (e) => {
        setKeyword(e.target.value);
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('Search button clicked');
        setLoading(true);
        if (keyword === ''){
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(process.env.REACT_APP_API_URL +`/api/search?keyword=${encodeURIComponent(keyword)}`, {
              method: 'GET',});
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSearchResult(data);
            setLoading(false); 
            // Handle successful login (e.g., store token, redirect user)
          } catch (error) {
            console.error('There was a problem with the search request:', error);
            setLoading(false); 
            navigate('/');
            // Handle login error
          }
    }
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
            { searchResult.length === 0? 
            <Container  className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="mb-4" style={{marginBottom: '20px'}}>搜尋關鍵字
                </h1>
                <Form className="d-flex justify-content-center align-items-center" style={{marginBottom: '30vh'}}>
                    <FormControl 
                        type="text" 
                        placeholder="歌名、作者．．．" 
                        onChange={handlechange} 
                        value={keyword}
                        className="mr-sm-2" 
                        style={{width: '30vw'}} 
                    />
                    <Button variant="outline-success" type="submit" style={{marginLeft: '20px'}} onClick={handleSubmit}>搜尋</Button>
                    {loading && <Spinner animation="border" role="status"  style={{marginLeft: '20px'}}>
                        <span className="sr-only"></span>
                    </Spinner>
                    }
                </Form>
            </Container> :
            <div>
                <h1>搜尋結果"{keyword}"</h1>
                <ListGroup as="ul">
                    {searchResult.map((item) => (
                        <ListGroup.Item as="li" key={item.id}>
                            <Link to={`/product/${item.id}`}>
                                <h3>{item.song_name}</h3>
                            </Link>
                            <p>{item.author}</p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
                
            }
        </Container>
    );
};

export default SearchPage;