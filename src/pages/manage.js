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
function ManageSongs({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSongs, setTotalSongs] = useState(0);
  const [reload, setReload] = useState(0);
  const [songsPerPage] = useState(30);
  const [noaswer, setNoaswer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [searchword, setSearchword] = useState('');
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loadingoffsale, setLoadingoffsale] = useState(false);
  const [currentmp3name, setCurrentmp3name] = useState('');
  const [showProblem, setShowProblem] = useState(false);
  const [newSong, setNewSong] = useState({
    song_name: '',
    author: '',
    composer: '',
    lyricist: '',
    price: '',
    description: '',
    youtube_link: '',
    youtube_link2: '',
    mp3_file: "",
    pdf_file: "",
    pdf_file_name: "",
  });
  const [currentSong, setcurrentSong] = useState({
    song_id: '',
    song_name: '',
    author: '',
    composer: '',
    lyricist: '',
    price: '',
    description: '',
    youtube_link: '',
    youtube_link2: '',
    mp3_file: "",
    pdf_file: "",
  });
  const [currentStatus, setCurrentStatus] = useState({});
  useEffect(() => {
    const fetchPages = async () => {
      const authToken = localStorage.getItem('authToken'); // Assuming the authToken is stored in localStorage
      const response = await fetch(process.env.REACT_APP_API_URL + `/api/creator/getlistpage?keyword=${searchword}`, {
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
    setCurrentPage(1);
  }
  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      const authToken = localStorage.getItem('authToken'); // Assuming the authToken is stored in localStorage
      let response;
      if (showProblem) {
        response = await fetch(process.env.REACT_APP_API_URL + `/api/creator/getproblemsonglist?page=${currentPage}&prepage=${songsPerPage}`, {
          headers: {
            'Authorization': `${authToken}`
          }
        });
      }else{
        response = await fetch(process.env.REACT_APP_API_URL + `/api/creator/getlist?page=${currentPage}&prepage=${songsPerPage}&keyword=${searchword}`, {
          headers: {
            'Authorization': `${authToken}`
          }
        });
      }
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
        setSongs(data.list);
        if(showProblem){
          setTotalSongs(data.total);
        }
        setLoading(false);
      }
    };
    fetchSongs();
  }, [currentPage, searchword, reload]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewSong({
      song_name: '',
      author: '',
      composer: '',
      lyricist: '',
      price: '',
      description: '',
      youtube_link: '',
      youtube_link2: '',
      mp3_file: "",
      pdf_file: "",
      pdf_file_name: "",
    });
  };
  const handleShowModal2 = (e) => {
    setShowModal2(true)
    const fetchInfo = async (songId) => {
      setLoading2(true);
      const response = await fetch(process.env.REACT_APP_API_URL + '/api/getsonginfo?id=' + songId);
      const data = await response.json();
      console.log(data);
      setcurrentSong(prevState => ({
        ...prevState,
        song_id: data.id,
        song_name: data.song_name,
        author: data.author,
        composer: data.composer,
        lyricist: data.lyricist,
        price: data.price,
        description: data.description,
        youtube_link: data.youtube_link,
        youtube_link2: data.youtube_link2,
        pdf_file_name: data.pdf_name,
      }));
      const mp3name = data.pdf_name.slice(0, -4);
      let newmp3name = mp3name.replace(/\(.*?\)/g, "").trim();
      if (mp3name.includes("(原調)")) {
        newmp3name = newmp3name+"(原調).mp3";;
      }else {
        newmp3name = newmp3name+".mp3";
      }
      setCurrentmp3name(newmp3name);
      const response2 = await fetch(process.env.REACT_APP_API_URL + '/api/getsongstatus?id=' + songId);
      const data2 = await response2.json();
      setCurrentStatus(data2);
      setLoading2(false);
    };
    fetchInfo(e.target.name);

  };

  const handleCloseModal2 = () => {

    setShowModal2(false);
    setcurrentSong({
      song_id: '',
      song_name: '',
      author: '',
      composer: '',
      lyricist: '',
      price: '',
      description: '',
      youtube_link: '',
      youtube_link2: '',
      mp3_file: "",
      pdf_file: "",
      pdf_file_name: "",
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSong({ ...newSong, [name]: name === 'price' ? parseInt(value, 10) : value });
  };
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setcurrentSong({ ...currentSong, [name]: name === 'price' ? parseInt(value, 10) : value });
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'mp3_file' && files[0].type !== 'audio/mpeg') {
      window.alert('請上傳 MP3 檔案');
      return;
    } else {
      setNewSong({ ...newSong, [name]: files[0] });
    }
    if (name === 'pdf_file' && files[0].type !== 'application/pdf') {
      window.alert('請上傳 PDF 檔案');
      return;
    } else {
      setNewSong({ ...newSong, [name]: files[0] });
    }
  };
  const handleFileChange2 = (e) => {
    const { name, files } = e.target;
    if (name === 'mp3_file' && files[0].type !== 'audio/mpeg') {
      window.alert('請上傳 MP3 檔案');
      return;
    } else {
      setcurrentSong({ ...currentSong, [name]: files[0] });
    }
    if (name === 'pdf_file' && files[0].type !== 'application/pdf') {
      window.alert('請上傳 PDF 檔案');
      return;
    } else {
      setcurrentSong({ ...currentSong, [name]: files[0] });
    }
  };

  const handleSubmit = async (e) => {
    setLoading3(true);
    e.preventDefault();
    const keepprocess = window.confirm('確定要上傳嗎？');
    const havepdf = newSong.pdf_file ? true : false;
    if (havepdf === false) {
      window.alert('請上傳PDF檔案');
      setLoading3(false);
      return;
    }
    if (keepprocess && havepdf) {
      const authToken = localStorage.getItem('authToken'); // Assuming the authToken is stored in localStorage
      const formData = {
        song_name: newSong.song_name,
        author: newSong.author,
        composer: newSong.composer,
        lyricist: newSong.lyricist,
        price: newSong.price,
        description: newSong.description,
        mp3: newSong.mp3_file ? `${newSong.pdf_file.name.slice(0, -4)}.mp3` : null,
        pdf_name: newSong.pdf_file ? newSong.pdf_file.name : null,
        youtube_link: newSong.youtube_link,
        youtube_link2: newSong.youtube_link2,
      };
      try {
        if (newSong.mp3_file!=="") {
          const mp3File = newSong.mp3_file;
          const mp3FileName = `${newSong.pdf_file.name.slice(0, -4)}.mp3`;
          const modifiedMp3File = new File([mp3File], mp3FileName, { type: mp3File.type });
          const formData2 = new FormData();
          await new Promise((resolve) => {
            formData2.append('file', modifiedMp3File);
            resolve();
          }
          );
          const response = await fetch(process.env.REACT_APP_API_URL + '/api/creator/uploadfile', {
            method: 'POST',
            headers: {
              'Authorization': `${authToken}`
            },
            body: formData2
          });
          if (!response.ok) {
            console.log('Upload mp3 failed');
            Window.alert('上傳失敗');
            return;
          }
        }
        if (newSong.pdf_file!=="") {
          const pdf = newSong.pdf_file;
          const modifiedpdf = new File([pdf], pdf.name, { type: pdf.type });
          const formData2 = new FormData();
          await new Promise((resolve) => {
            formData2.append('file', modifiedpdf);
            resolve();
          });
          const response = await fetch(process.env.REACT_APP_API_URL + '/api/creator/uploadfile', {
            method: 'POST',
            headers: {
              'Authorization': `${authToken}`
            },
            body: formData2
          });
          if (!response.ok) {
            console.log('Upload pdf failed');
            Window.alert('上傳失敗');
            return;
          }
        }
        const response = await fetch(process.env.REACT_APP_API_URL + '/api/creator/addnewsong', {
          method: 'POST',
          headers: {
            'Authorization': `${authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          window.alert('上傳成功');
          setReload(reload + 1);
          handleCloseModal();
        } else if (response.status === 400) {
          console.log(formData);
          const errorData = await response.json();
          console.log('Upload failed with 400 error:', errorData);
          window.alert('上傳失敗: ' + errorData.message);
        } else {
          console.log('Upload failed with status:', response.status);
          window.alert('上傳失敗: ' + response.statusText);
        }
      } catch (error) {
        console.error('Error during submission:', error);
        window.alert('上傳失敗: ' + error.message);
      } finally {
          setLoading3(false);
          setNewSong({
            song_name: '',
            author: '',
            composer: '',
            lyricist: '',
            price: '',
            description: '',
            youtube_link: '',
            youtube_link2: '',
            mp3_file: null,
            pdf_file: null,
          });
      }
    }
  };
  const handleSubmit2 = async (e) => {
    setLoading4(true);
    e.preventDefault();
    console.log('Update button clicked');
    if (currentStatus.pdf_status === false && currentSong.pdf_file === "") {
      window.alert('請上傳PDF檔案');
      setLoading4(false);
      return;
    }
    const authToken = localStorage.getItem('authToken'); // Assuming the authToken is stored in localStorage
    const formData = {
      id: currentSong.song_id,
      song_name: currentSong.song_name,
      author: currentSong.author,
      composer: currentSong.composer,
      lyricist: currentSong.lyricist,
      price: currentSong.price,
      description: currentSong.description,
      mp3: currentSong.mp3_file ? `${currentSong.pdf_file_name.slice(0, -4)}.mp3` : null,
      pdf_name: currentSong.pdf_file ? currentSong.pdf_file.name : null,
      youtube_link: currentSong.youtube_link,
      youtube_link2: currentSong.youtube_link2,
    };
    try {
      if (currentSong.mp3_file!=="") {
        console.log('MP3 file exists');
        console.log(currentSong.mp3_file);
        const mp3File = currentSong.mp3_file;
        const mp3FileName = `${currentSong.pdf_file_name.slice(0, -4)}.mp3`;
        const modifiedMp3File = new File([mp3File], mp3FileName, { type: mp3File.type });
        const formData2 = new FormData();
        await new Promise((resolve) => {
          formData2.append('file', modifiedMp3File);
          resolve();
        }
        );
        const response = await fetch(process.env.REACT_APP_API_URL + '/api/creator/uploadfile', {
          method: 'POST',
          headers: {
            'Authorization': `${authToken}`
          },
          body: formData2
        });
        if (!response.ok) {
          console.log('Upload mp3 failed');
          window.alert('上傳失敗');
          return;
        }
      }
      if (currentSong.pdf_file!=="") {
        console.log('PDF file exists');
        console.log(currentSong.pdf_file);
        const pdf = currentSong.pdf_file;
        const modifiedpdf = new File([pdf], pdf.name, { type: pdf.type });
        const formData2 = new FormData();
        await new Promise((resolve) => {
          formData2.append('file', modifiedpdf);
          resolve();
        }
        );
        const response = await fetch(process.env.REACT_APP_API_URL + '/api/creator/uploadfile', {
          method: 'POST',
          headers: {
            'Authorization': `${authToken}`
          },
          body: formData2
        });
        if (!response.ok) {
          console.log('Upload pdf failed');
          window.alert('上傳失敗');
          return;
        }
      }
      const response = await fetch(process.env.REACT_APP_API_URL + '/api/creator/updatesong', {
        method: 'POST',
        headers: {
          'Authorization': `${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        window.alert('上傳成功');
        setReload(reload + 1);
        handleCloseModal();
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.log('Upload failed with 400 error:', errorData);
        window.alert('上傳失敗: ' + errorData.message);
      } else {
        console.log('Upload failed with status:', response.status);
        window.alert('上傳失敗: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error during submission:', error);
      window.alert('上傳失敗: ' + error.message);
    }
    finally {
      setLoading4(false);
      setcurrentSong({
        song_name: '',
        author: '',
        composer: '',
        lyricist: '',
        price: '',
        description: '',
        youtube_link: '',
        youtube_link2: '',
        mp3_file: null,
        pdf_file: null,
      });
    }
  };
  const handleoffsale = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!window.confirm('確定要下架這首歌曲嗎？')) {
      return;
    }
    setLoadingoffsale(true);
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/creator/offsale?id=' + currentSong.song_id, {
      method: 'GET',
      headers: {
        'Authorization': `${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      window.alert('下架成功');
      handleCloseModal2();
      setLoadingoffsale(false);
    } else {
      window.alert('下架失敗，請聯絡管理員');
      setLoadingoffsale(false);
    }
  }
  const handlechange = (e) => {
    setKeyword(e.target.value);
  }
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleShowProblem = () => {
    setLoading(true);
    setShowProblem(!showProblem);
    setKeyword('');
    setSearchword('');
    setCurrentPage(1);
    setReload(reload + 1);
  }
  const totalPages = Math.ceil(totalSongs / songsPerPage);

  return (
    <Container className={`my-3 ${loading ? 'loading-cursor' : ''}`} style={{ minHeight: '80vh' }}>
      <Button variant="outline-secondary" size="sm" onClick={() => {navigate('/dashboard')}}><i className="bi bi-arrow-return-left"></i>返回管理介面</Button>
      <h1 className="mt-2">管理歌曲</h1>
      <Form className="d-flex align-items-center" style={{ width: '100%' }}>
        <Button variant="primary" onClick={handleShowModal} style={{ marginRight: '5vw' }}>
          上傳新歌曲
        </Button>
        <FormControl
          type="text"
          placeholder="歌名搜尋"
          onChange={handlechange}
          value={keyword}
          className="mr-sm-2"
          style={{ width: '20vw', marginRight: '2vw' }}
          disabled={showProblem}
        />
        <Button variant="outline-success" type="submit" onClick={handleSearchSubmit} disabled={showProblem}>搜尋</Button>
        {
          searchword !== '' ?
            <Button variant="outline-danger" type="submit" style={{ marginLeft: '2vw' }} onClick={() => { setSearchword(''); setKeyword('') }}>清除</Button>
            : ''
        }
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          label="僅顯示有問題歌曲"
          onChange={handleShowProblem}
          checked={showProblem}
          style={{ marginLeft: '2vw' }}
        />
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
                <th>歌曲名稱</th>
                <th>試聽檔</th>
                <th>封面</th>
                <th>檔案</th>
                <th>價格</th>
                <th>已售數量</th>
                <th>調整</th>
              </tr>
            </thead>
            <tbody>

              {songs.length === 0 ? <tr><td colSpan="7" className="text-center">尚無歌曲</td></tr> : songs.map(song => (
                <tr key={song.song_id}>
                  <td>
                    <Link to={`/product/${song.song_id}`}>
                      {TruncateWords(song.song_name, 50)}
                    </Link>
                  </td>
                  <td>{song.mp3_status === true ? "✅" : "❌"}</td>
                  <td>{song.cover_status === true ? "✅" : "❌"}</td>
                  <td>{song.pdf_status === true ? "✅" : "❌"}</td>
                  <td>{song.price}</td>
                  <td>{song.amount}</td>
                  <td>
                    <Button variant="primary" type="submit" name={song.song_id} onClick={handleShowModal2}>
                      調整
                    </Button>
                  </td>
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

      <Modal show={showModal} onHide={handleCloseModal} size="lg" style={{ margin: 'auto' }}>
        <Modal.Header closeButton>
          <Modal.Title>上傳新歌曲</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
          <Row>
          <Col md="6">
            <Form.Group controlId="songName">
              <Form.Label>歌曲名稱</Form.Label>
              <Form.Control
                type="text"
                name="song_name"
                value={newSong.song_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="author">
              <Form.Label>作者</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={user ? user.username : ''}
                onChange={handleInputChange}
                required
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="composer">
              <Form.Label>作曲</Form.Label>
              <Form.Control
                type="text"
                name="composer"
                value={newSong.composer}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="lyricist">
              <Form.Label>作詞</Form.Label>
              <Form.Control
                type="text"
                name="lyricist"
                value={newSong.lyricist}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="youtube_link">
              <Form.Label>Youtube 連結</Form.Label>
              <Form.Control
                type="text"
                name="youtube_link"
                value={newSong.youtube_link}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="youtube_link2">
              <Form.Label>Youtube 連結2</Form.Label>
              <Form.Control
                type="text"
                name="youtube_link2"
                value={newSong.youtube_link2}
                onChange={handleInputChange}
              />
            </Form.Group>
            </Col>
            <Col md="6">
            <Form.Group controlId="price">
              <Form.Label>價格</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={newSong.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="mp3File">
              <Form.Label>試聽 MP3</Form.Label>
              <Form.Control
                type="file"
                name="mp3_file"
                onChange={handleFileChange}
              />
            </Form.Group>
            <Form.Group controlId="pdfFile">
              <Form.Label>PDF檔案 </Form.Label>
              <Form.Control
                type="file"
                name="pdf_file"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
            </Col>
            </Row>
            <Form.Group controlId="description">
              <Form.Label>描述</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={newSong.description}
                onChange={handleInputChange}
                required
                style={{ minHeight: '150px' }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>1. 歌曲名稱和檔案名稱請勿和以前的重複</Form.Label>
            </Form.Group>
            <Form.Group><Form.Label>2. ＩＤ會自動分配</Form.Label></Form.Group>
            <Form.Group><Form.Label>3. 封面圖片會連動試用圖區</Form.Label></Form.Group>
            <Button variant="primary" type="submit" className='mt-3'>
              {loading3 ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : '上傳'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showModal2} onHide={handleCloseModal2} size="lg" style={{ margin: 'auto' }}>
        <Modal.Header closeButton >
          <Modal.Title>調整歌曲</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading2 ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
              <Spinner animation="border" role="status">
              </Spinner>
            </div>
          ) : (
            <Form >
              <Row>
              <Col md="6">
              <Form.Group controlId="songName">
                <Form.Label>歌曲名稱 ID: {currentSong.song_id}</Form.Label>
                <Form.Control
                  type="text"
                  name="song_name"
                  value={currentSong.song_name}
                  onChange={handleInputChange2}
                  required
                />
              </Form.Group>
              <Form.Group controlId="author">
                <Form.Label>作者</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  readOnly
                  value={currentSong.author}
                  required
                />
              </Form.Group>
              <Form.Group controlId="composer">
                <Form.Label>作曲</Form.Label>
                <Form.Control
                  type="text"
                  name="composer"
                  value={currentSong.composer}
                  onChange={handleInputChange2}
                  required
                />
              </Form.Group>
              <Form.Group controlId="lyricist">
                <Form.Label>作詞</Form.Label>
                <Form.Control
                  type="text"
                  name="lyricist"
                  value={currentSong.lyricist}
                  onChange={handleInputChange2}
                  required
                />
              </Form.Group>
              <Form.Group controlId="youtube_link">
                <Form.Label>Youtube 連結1</Form.Label>
                <Form.Control
                  type="text"
                  name="youtube_link"
                  value={currentSong.youtube_link}
                  onChange={handleInputChange2}
                  required
                />
              </Form.Group>
              <Form.Group controlId="youtube_link2">
                <Form.Label>Youtube 連結2</Form.Label>
                <Form.Control
                  type="text"
                  name="youtube_link2"
                  value={currentSong.youtube_link2}
                  onChange={handleInputChange2}
                />
              </Form.Group>
              </Col>
              <Col md="6">
              <Form.Group controlId="price">
                <Form.Label>價格</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={currentSong.price}
                  onChange={handleInputChange2}
                  required
                />
              </Form.Group>
              <Form.Group controlId="mp3File">
                <Form.Label>試聽 MP3</Form.Label>
                <Form.Control
                  type="file"
                  name="mp3_file"
                  onChange={handleFileChange2}
                />
              </Form.Group>
              {
                currentStatus.mp3_status === true ? <Form.Text className="text-danger">{currentStatus.rule === 0 ? currentmp3name : currentSong.pdf_file_name.slice(0, -4)+".mp3"}</Form.Text> : ''
              }
              <Form.Group controlId="pdf_file">
                <Form.Label>PDF檔案 </Form.Label>
                <Form.Control
                  type="file"
                  name="pdf_file"
                  disabled={currentStatus.pdf_status === true}
                  onChange={handleFileChange2}
                />
                {
                  currentStatus.pdf_status === true ? <Form.Text className="text-danger">{currentSong.pdf_file_name}</Form.Text> : ''
                }

              </Form.Group>
              </Col>
              </Row>
              <Form.Group controlId="description">
                <Form.Label>描述</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={currentSong.description}
                  onChange={handleInputChange2}
                  required
                  style={{ minHeight: '150px' }}
                />
              </Form.Group>
              <Form.Group controlId="notice">
                <Form.Label><h4>注意事項：</h4></Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label>1. 若不需更改檔案，請留空 已上傳的PDF檔案無法更改，如需異動請聯絡管理員</Form.Label>
              </Form.Group>
              <Form.Group><Form.Label>2. 上傳新的檔案會覆蓋掉舊的</Form.Label></Form.Group>
              <Form.Group><Form.Label>3. 如果需要反應問題請回報給管理員上面顯示的ＩＤ</Form.Label></Form.Group>
              <Button variant="primary" type="submit" className='mt-3 mr-3' onClick={handleSubmit2}>
                {loading4 ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : '送出'}
              </Button>
              <Button variant="primary" type="cancel" className='mt-3 ml-4' onClick={handleoffsale}>
                {loadingoffsale ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : '下架'}
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};
export default connect(mapStateToProps)(ManageSongs);