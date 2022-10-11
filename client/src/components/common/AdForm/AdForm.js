import { useState } from 'react';
import { Form, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import ImageUploader from 'react-images-upload';

const AdForm = ({ action, actionText, ...props }) => {
  //get user Id albo przekaż tu i photo na dole
  const [title, setTitle] = useState(props.title || '');
  const [content, setContent] = useState(props.content || '');
  // const [publicationDate, setPublicationDate] = useState(props.publicationDate || '')
  const [localization, setLocalization] = useState(props.localization || '');
  const [price, setPrice] = useState(props.price || '');
  // const [sellerInfo, setSellerInfo] = useState(props.sellerInfo || '')
  const [photo, setPhoto] = useState(props.photo || null);
  const user = useSelector(getUser);

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const publicationDate = today.toLocaleDateString(); // "6/14/2020"
  const handleSubmit = (e) => {
    console.log('ssasdsds------------------');
    e.preventDefault();

    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    fd.append('localization', localization);
    fd.append('price', price);
    fd.append('photo', photo);
    fd.append('sellerInfo:', 111);
    fd.append('publicationDate', publicationDate);

    action(fd, props._id);
    for (const pair of fd.entries()) {
      console.log(pair[0] + '-' + pair[1]);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='formTitle'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type='text'
          placeholder='type your title...'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId='formContent'>
        <Form.Label>Content</Form.Label>
        <ReactQuill
          type='text'
          placeholder='describe your product here...'
          value={content}
          onChange={setContent}
        />
      </Form.Group>
      <Form.Group controlId='formLocalization'>
        <Form.Label>Localization</Form.Label>
        <Form.Control
          type='text'
          placeholder='enter localization'
          value={localization}
          onChange={(e) => setLocalization(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId='formPrice'>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type='text'
          placeholder='set price here...'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>
      <Col xs='12' md='6' className='order-1 order-md-2'>
        <Form.Group controlId='formAvatar'>
          <Form.Label>Avatar:</Form.Label>
          <ImageUploader
            withIcon={true}
            buttonText='Choose image'
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            withPreview={true}
            onChange={(e) => setPhoto(e.target.files[0])}
            singleImage={true}
            // className={photo.file ? 'hide' : 'animated fadeInUp'}
          />
        </Form.Group>
      </Col>
      <Button variant='primary' type='submit' className='mt-2'>
        {actionText}
      </Button>
    </Form>
  );
};

export default AdForm;
