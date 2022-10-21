import { Alert, Progress } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getAds, getRequest, loadAdsRequest } from '../../../redux/adsRedux';
import { useEffect, useState } from 'react';
import AdSummary from '../../common/AdSummary/AdSummary';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import clsx from 'clsx';
import styles from './Ads.module.scss';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const Ads = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAds);
  const request = useSelector(getRequest);
  const navigate = useNavigate();

  const [searchPhrase, setSearchPhrase] = useState('');

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/ads/search/${searchPhrase}`);
  };

  if (request.pending) return <Progress animated color='primary' value={50} />;
  if (request.error) return <Alert color='warning'>{request.error}</Alert>;
  if (!request.success || !ads.length)
    return <Alert color='info'>No Ads</Alert>;
  if (request.success)
    return (
      <Container>
        <Form onSubmit={handleSearchSubmit}>
          <Row
            className={clsx(
              'd-flex, align-content-center, justify-content-center my-3'
            )}
          >
            <Col xs='6' md='3' className={styles.icon_col}>
              <FontAwesomeIcon icon={faSearch} />
            </Col>
            <Col xs='6' md='3' className={styles.inputSearch}>
              <Form.Control
                type='text'
                value={searchPhrase}
                placeholder='type to search...'
                onChange={(e) => setSearchPhrase(e.target.value)}
              ></Form.Control>
            </Col>
            <Col xs='12' md='3' className={styles.buttonSearch}>
              <Button type='submit'>Search</Button>
            </Col>
          </Row>
        </Form>
        <section className={clsx('justify-content-between')}>
          <Row>
            {ads.map((ad) => (
              <Col
                key={ad._id}
                xs={12}
                sm={6}
                lg={4}
                className='justify-content-center mb-2'
              >
                <AdSummary key={ad._id} {...ad} />
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    );
};

export default Ads;
