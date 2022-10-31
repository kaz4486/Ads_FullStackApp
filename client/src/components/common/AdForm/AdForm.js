import { useState } from 'react';
import { Form, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import removeTags from '../../../utils/removeTags';

const AdForm = ({ action, actionText, ...props }) => {
  const [contentError, setContentError] = useState(false);

  const [title, setTitle] = useState(props.title || '');
  const [content, setContent] = useState(props.content || '');
  const [localization, setLocalization] = useState(props.localization || '');
  const [price, setPrice] = useState(props.price || '');
  const [photo, setPhoto] = useState(props.photo || null);

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const publicationDate = today.toLocaleDateString(); // "6/14/2020"

  const handleSubmit = (e) => {
    if (removeTags(content).length < 20 || removeTags(content).length > 100) {
      setContentError(true);
    } else {
      setContentError(false);
      const fd = new FormData();
      fd.append('title', title);
      fd.append('content', content);
      fd.append('localization', localization);
      fd.append('price', price);
      fd.append('photo', photo);
      fd.append('publicationDate', publicationDate);
      action(fd);
      // for (const pair of fd.entries()) {
      //   console.log(pair[0] + '-' + pair[1]);
      // }
    }
  };

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  return (
    <Form onSubmit={validate(handleSubmit)}>
      <Form.Group controlId='formTitle'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          {...register('title', {
            required: true,
            minLength: 10,
            maxLength: 50,
          })}
          type='text'
          placeholder='type your title...'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && (
          <small className='d-block form-text text-danger mt-2'>
            This field is required, minimum 10 signs, max 50 signs
          </small>
        )}
      </Form.Group>
      <Form.Group controlId='formContent'>
        <Form.Label>Content</Form.Label>
        <ReactQuill
          type='text'
          placeholder='describe your product here...'
          value={content}
          onChange={setContent}
        />
        {contentError && (
          <small className='d-block form-text text-danger mt-2'>
            This field is required, minimum 20 signs, max 100 signs
          </small>
        )}
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
          <Form.Control
            type='file'
            onChange={(e) => setPhoto(e.target.files[0])}
          ></Form.Control>
        </Form.Group>
      </Col>
      <Button variant='primary' type='submit' className='mt-2'>
        {actionText}
      </Button>
    </Form>
  );
};

export default AdForm;
