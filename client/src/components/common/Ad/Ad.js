import { Alert, Progress } from 'reactstrap';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  getAdById,
  getRequest,
  removeAdRequest,
} from '../../../redux/adsRedux';
import { IMGS_URL } from '../../../configs/config';
import styles from './Ad.module.scss';
import { loadAdsRequest } from '../../../redux/adsRedux';
import { getUser } from '../../../redux/usersRedux';
import clsx from 'clsx';

const Ad = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const ad = useSelector((state) => getAdById(state, id));
  const user = useSelector((state) => getUser(state));
  const request = useSelector(getRequest);

  const [show, setShow] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (ad?.sellerInfo.login === user?.login) {
      setShowButtons(true);
    }
  }, [ad, user]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClickRemove = () => {
    handleClose();
    dispatch(removeAdRequest(ad._id));
    setTimeout(() => {
      return navigate('/');
    }, 1000);
  };

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  // ad long version
  //all details
  //user details
  // jeśli jest zalogowany i to jego post - buttony Edit(przekierowuje do edycji) i Delete(przekierowuje na str. główną)
  if (request.pending) return <Progress animated color='primary' value={50} />;
  if (request.error) return <Alert color='warning'>{request.error}</Alert>;
  if (!request.success)
    return <Alert color='info'>Something went wrong...</Alert>;
  if (!ad) return <Navigate to='/' />;
  if (request.success)
    return (
      <Container>
        <Row>
          <Col>
            <article>
              <h2 className={styles.title}>{ad.title}</h2>
              <Row>
                <Col lg={6} className='align-self-center'>
                  <div className={styles.section_left}>
                    <img
                      src={`${IMGS_URL}/${ad.photo}`}
                      alt='Product'
                      className={styles.img}
                    />
                  </div>
                </Col>
                <Col lg={6} className='align-self-center'>
                  <div className={styles.section_right}>
                    <p>
                      Localization: <span>{ad.localization}</span>
                    </p>
                    <p>
                      Price: <span>{ad.price}$ </span>
                    </p>
                    <p dangerouslySetInnerHTML={{ __html: ad.content }} />
                    <p>
                      Opublikowano: <span>{ad.publicationDate}</span>
                    </p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} lg={6}>
                  <section className={styles.user}>
                    <Col md={3}>
                      <div className={styles.avatar_frame}>
                        <img
                          src={`${IMGS_URL}/${ad.sellerInfo.avatar}`}
                          alt='Product'
                          className={styles.avatar}
                        />
                      </div>
                    </Col>
                    <Col md={3} className={clsx('align-self-center', 'ml-1')}>
                      <p className='mb-0'>
                        User: <span>{ad.sellerInfo.login}</span>
                      </p>
                      <p className='mb-0'>
                        phone number: <span>{ad.sellerInfo.phoneNumber}</span>
                      </p>
                    </Col>
                  </section>
                </Col>

                {showButtons && (
                  <Col
                    md={6}
                    className={clsx(
                      'd-flex',
                      'justify-content-center',
                      'align-items-center'
                    )}
                  >
                    <Row>
                      <Col>
                        <Link to={`/ads/edit/${ad._id}`} className='mx-2'>
                          <Button variant='secondary'>Edit</Button>
                        </Link>
                      </Col>
                      <Col>
                        <Button variant='danger' onClick={handleShow}>
                          Delete
                        </Button>
                      </Col>
                    </Row>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        This operation will completely remove this ad from the
                        app. Are you sure you want to do that?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button variant='danger' onClick={handleClickRemove}>
                          Remove
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                )}
              </Row>
            </article>
          </Col>
        </Row>
      </Container>
    );
};

export default Ad;
