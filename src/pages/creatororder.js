import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Form, Modal, Pagination, Spinner, FormControl, Col, Row } from 'react-bootstrap';
import { TruncateWords } from '../components/tool/tool';
import { Link } from 'react-router-dom';
import './style.css'; // Import the CSS file
import { connect } from "react-redux";
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {logout} from "../redux/reducers/user-actions";
import 'bootstrap-icons/font/bootstrap-icons.css';
function CreatorOrder({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSongs, setTotalSongs] = useState(0);
  const [reload, setReload] = useState(0);
  const [songsPerPage] = useState(30);
  const [keyword, setKeyword] = useState('');
  const [searchword, setSearchword] = useState('');
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loadingoffsale, setLoadingoffsale] = useState(false);
  useEffect(() => {
    const fetchPages = async () => {
      const authToken = localStorage.getItem('authToken'); // Assuming the authToken is stored in localStorage
      const response = await fetch(process.env.REACT_APP_API_URL + `/api/creator/getorderlistcount?keyword=${searchword}`, {
        headers: {
          'Authorization': `${authToken}`
        }
      });
      if (response.status === 401) {
        
        return
      }else{
        const data = await response.json();
      setTotalSongs(data.num);
      }
    };
    fetchPages();
  }, [searchword]);
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    console.log('Search button clicked');
    setSearchword(keyword);
  }
  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      const authToken = localStorage.getItem('authToken'); // Assuming the authToken is stored in localStorage
      const response = await fetch(process.env.REACT_APP_API_URL + `/api/creator/getorderlist?page=${currentPage}&limit=${songsPerPage}&keyword=${searchword}`, {
        headers: {
          'Authorization': `${authToken}`
        }
      });
      if (response.status === 401) {
        window.alert("請重新登入");
        dispatch(logout());
        navigate('/login').then(() => {
          window.location.reload();
        }
        );
        return
      }else{
        const data = await response.json();
        setSongs(data);
        setLoading(false);
      }
    };
    fetchSongs();
  }, [currentPage, searchword, reload]);
  const handlechange = (e) => {
    setKeyword(e.target.value);
  }
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(totalSongs / songsPerPage);

  return (
    <Container className={`my-3 ${loading ? 'loading-cursor' : ''}`} style={{ minHeight: '80vh' }}>
       <Button variant="outline-secondary" onClick={() => {navigate('/dashboard')}}><i class="bi bi-arrow-return-left"></i>返回管理介面</Button>
      <h1>顧客訂單紀錄</h1>
      <Form className="d-flex align-items-center" style={{ width: '100%' }}>
        <FormControl
            type="text"
            placeholder="歌名搜尋"
            onChange={handlechange}
            value={keyword}
            className="mr-sm-2"
            style={{ width: '20vw', marginRight: '2vw' }}
        />
        <Button variant="outline-success" type="submit" onClick={handleSearchSubmit}>搜尋</Button>
        {
          searchword !== '' ?
            <Button variant="outline-danger" type="submit" style={{ marginLeft: '2vw' }} onClick={() => { setSearchword(''); setKeyword('') }}>清除</Button>
            : ''
        }
      </Form>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <Spinner animation="border" role="status">
          </Spinner>
        </div>
      ) : (
        <>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>訂單編號</th>
                <th>買家</th>
                <th>歌曲名稱</th>
                <th>數量</th>
                <th>總金額</th>
                <th>時間</th>
                <th>狀態</th>
                <th>付款方式</th>
              </tr>
            </thead>
            <tbody>
              {songs.map(song => (
                <tr key={song.order_id}>
                  <td>
                  {"TW" + song.order_id.toString().padStart(6, '0')}
                  </td>
                  <td>{song.costumer_name}</td>
                  <td><Link to={`/product/${song.item_id}`}>
                      {TruncateWords(song.item_name, 50)}
                    </Link></td>
                  <td>{song.count}</td>
                  <td>{song.amount}</td>
                  <td>{song.time}</td>
                  <td>
                    {song.status==="1" && "尚未付款"}
                    {song.status==="2" && "已付款"}
                    {song.status==="3" && "已出貨"}
                    {song.status==="4" && "已完成"}
                    {song.status==="5" && "已取消"}
                    </td>
                  <td>{song.payment_method}</td>
                </tr>
              ))}
            </tbody>
          </Table>
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
          </Pagination>
        </>
      )}
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};
export default connect(mapStateToProps)(CreatorOrder);