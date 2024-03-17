import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { datas } from '../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, Modal, TextField } from '@mui/material';

function Home() {
  const [allDocs, setAllDocs] = useState([]);
  const [docTitle, setDocTitle] = useState('');
  const [reload, setReaload] = useState('');
  const [show, setShow] = useState(false);

  const docsCollectionRef = collection(datas, 'documents');

  const getAllDocs = async () => {
    const docsData = await getDocs(docsCollectionRef);
    const data = docsData.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    setAllDocs(data);
  };

  const postData = async () => {
    await addDoc(docsCollectionRef, {
      title: docTitle,
      discription: ''
    });
    setReaload(docTitle);
  };

  const deleleDocs = async id => {
    const oneDoc = doc(datas, 'documents', id);
    await deleteDoc(oneDoc);
    setReaload(id);
  };

  useEffect(() => {
    getAllDocs();
  }, [reload]);

  const handleClose = () => setShow(false);

  const handleAdd = () => {
    postData();
    alert(`${docTitle} created successfully`);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const handleEdit = data => {
    navigate('/view', { state: data });
  };

  const handleChange = e => {
    setDocTitle(e.target.value);
  };

  return (
    <div className='pap'>
      <div className='container'>
        <div style={{marginTop:"70px"}} className='d-flex flex-column justify-content-center align-items-center mb-5'>
          <h1  className='text-center fw-bolder mt-2'>Document App</h1>
          <Button style={{marginTop:"20px"}} onClick={handleShow} variant='contained' color='info'>
            Create A document
          </Button>
        </div>
        <div className='row'>
          {allDocs?.length > 0 ? (
            allDocs.map(item => (
              <div key={item.id} className='col-lg-4 mb-4'>
                <div style={{ height: '170px',backgroundColor:"whitesmoke" }} className='border 30px'>
                  <div className='d-flex justify-content-between px-3 py-2'>
                    <h4 className='mb-0'>{item.title}</h4>
                    <div className='d-flex justify-content-center align-items-center'>
                      <BorderColorIcon style={{marginRight:"10px"}} onClick={() => handleEdit(item)} />
                      <DeleteForeverIcon onClick={() => deleleDocs(item.id)} />
                    </div>
                  </div>
                  <p style={{ textAlign: 'justify' }} className='px-3'>
                    {item.discription.replace(/<[^>]+>/g, '')}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
        <Modal style={{width:"300px",paddingTop:"150px",textAlign:"center",margin:"auto"}} open={show} onClose={handleClose}>
          <div className='paper'>
            <div className='d-flex flex-column'>
              <TextField
                id='floatingInputTitle'
                label='Add Title'
                type='text'
                variant='outlined'
                placeholder='Add Title To Document'
                onChange={e => handleChange(e)
                }
              />
              <Button style={{marginTop:"15px"}} variant='contained' onClick={handleAdd}>
             Submit
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
