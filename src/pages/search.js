import React from 'react';
import { Container, Form, FormControl, Button, ListGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ProductCardElement from '../components/productSlider/utility';

const SearchPage = () => {
    const navigate = useNavigate(); 
    const [keyword, setKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noaswer, setNoaswer] = useState(false); 
    const [currentSuggestion, setCurrentSuggestion] = useState(0);
    
    const searchSuggestions = [
        "周杰倫 稻香",
        "五月天 星空 簡譜",
        "周杰倫 告白氣球",
        "周興哲 怎麼了 ",
        "告五人 又到天黑"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSuggestion((prev) => (prev + 1) % searchSuggestions.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

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
            if(data===null){
                setSearchResult([]);
                setNoaswer(true); 
            }else{
                setSearchResult(data);
            }
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
            <Container className="d-flex flex-column justify-content-center align-items-center" style={{marginBottom: '30vh'}}>
                <h1 className="mb-4" style={{marginBottom: '20px'}}>搜尋關鍵字</h1>
                <Form className="d-flex justify-content-center align-items-center">
                    <FormControl 
                        type="text" 
                        placeholder="歌名、作者．．．" 
                        onChange={handlechange} 
                        value={keyword}
                        className="mr-sm-2" 
                        style={{width: '30vw'}} 
                    />
                    <Button variant="outline-success" type="submit" style={{marginLeft: '20px'}} onClick={handleSubmit}>搜尋</Button>
                    {loading && <Spinner animation="border" role="status" style={{marginLeft: '20px'}}>
                        <span className="sr-only"></span>
                    </Spinner>}
                </Form>
                <div className="d-flex justify-content-center mt-3">
                    <div 
                        className="search-suggestion-box" 
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            minWidth: '200px',
                            textAlign: 'center',
                            animation: 'fadeInOut 2s ease-in-out infinite'
                        }}
                    >
                        <span style={{ color: '#000' }}>
                            試試搜尋：{searchSuggestions[currentSuggestion]}
                        </span>
                    </div>
                </div>
                <style>
                {`
                    @keyframes fadeInOut {
                        0% { opacity: 0; transform: translateY(10px); }
                        20% { opacity: 1; transform: translateY(0); }
                        80% { opacity: 1; transform: translateY(0); }
                        100% { opacity: 0; transform: translateY(-10px); }
                    }
                    .search-suggestion-box {
                        animation: fadeInOut 2s ease-in-out infinite;
                    }
                `}
            </style>
                {noaswer && <h3 className="mb-4" style={{marginBottom: '20px'}}>無結果</h3>}
            </Container> :
            <div>
                <h1>搜尋結果"{keyword}"</h1>
                <div className="row" style={{minWidth: '60vw'}}>
                    {searchResult.map((slide, index) => (
                        <div className="col-md-3 mb-4" key={index}>
                        <Container>
                            <ProductCardElement slidePro={slide} />
                        </Container>
                        </div>
                    ))}
                    </div>
            </div>
                
            }
        </Container>
    );
};

export default SearchPage;