import React, { useEffect } from "react";
import { Container, Pagination, Button, Form, FormControl } from "react-bootstrap";
import ProductCardElement from "../components/productSlider/utility";
import { useState } from "react";
import { Spinner } from 'react-bootstrap';

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [slides, setSlides] = useState([]);
  const limit = 24;
  const [isLoading, setIsLoading] = useState(true);
  const paginate = async (pageNumber) => {
    setCurrentPage(pageNumber);
    setIsLoading(true);
    const response = await fetch(process.env.REACT_APP_API_URL + `/api/getallproducts?page=${pageNumber}&limit=${limit}`);
    const data = await response.json();
    setSlides(data.list);
    setTotalPages(Math.ceil(data.total / limit));
  };
  useEffect(() => {
    paginate(currentPage);
  }, []);
  useEffect(() => {
    if (slides !== undefined && slides.length > 0) {
      setIsLoading(false);
    }else{
      setIsLoading(true);
    }
  }, [slides]);

  return (
    <div>
      <Container>
      <h2 className="text-left mb-4 ms-4 mt-2">所有商品</h2>
        <div className="row">
            {isLoading ? (
                <div className="col-12 mx-auto text-center" style={{marginTop: '25vh', marginBottom: '35vh'}}>
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <>
                {slides.map((slide, index) => (
                    <div className="col-md-3 mb-4" key={index}>
                        <Container>
                            <ProductCardElement slidePro={slide} />
                        </Container>
                    </div>
                ))}
                <Pagination>
                        <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                        {currentPage > 2 && <Pagination.Item onClick={() => paginate(currentPage - 2)}>{currentPage - 2}</Pagination.Item>}
                        {currentPage > 1 && <Pagination.Item onClick={() => paginate(currentPage - 1)}>{currentPage - 1}</Pagination.Item>}
                        <Pagination.Item active>{currentPage}</Pagination.Item>
                        {currentPage < totalPages && <Pagination.Item onClick={() => paginate(currentPage + 1)}>{currentPage + 1}</Pagination.Item>}
                        {currentPage < totalPages - 1 && <Pagination.Item onClick={() => paginate(currentPage + 2)}>{currentPage + 2}</Pagination.Item>}
                        <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                        <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
                        <Form className="d-flex align-items-center"  onSubmit={(e) => {
                        e.preventDefault();
                        const pageNumber = parseInt(e.target.pageInput.value, 10);
                        if (pageNumber >= 1 && pageNumber <= totalPages) {
                            paginate(pageNumber);
                        } else {
                            window.alert(`請輸入 1 到 ${totalPages} 之間的頁碼`);
                        }
                        }}>
                        <FormControl
            
                            type="number"
                            name="pageInput"
                            placeholder="輸入頁碼"
                            min="1"
                            max={totalPages}
                            className="ml-2"
                            style={{ width: '100px' }}
                        />
                        <Button className="ml-2" variant="outline-primary" type="submit">跳轉</Button>
                        </Form>
                    </Pagination>
                </>
            )}
        </div>
      </Container>

    </div>
  );
}

export default Products;