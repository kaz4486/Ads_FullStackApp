import { Alert, Progress } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getAds, getRequest, loadAdsRequest } from '../../../redux/adsRedux';
import { useEffect } from 'react';
import AdSummary from '../../common/AdSummary/AdSummary';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import clsx from 'clsx';
import styles from './Ads.module.scss';

const Ads = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAds);
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);
  // co to dokładnie znaczy?

  if (request.pending) return <Progress animated color='primary' value={50} />;
  if (request.error) return <Alert color='warning'>{request.error}</Alert>;
  if (!request.success || !ads.length)
    return <Alert color='info'>No Ads</Alert>;
  if (request.success)
    return (
      <Container>
        <section className={clsx('justify-content-between')}>
          <Row>
            {ads.map((ad) => (
              <Col
                key={ad._id}
                xs={12}
                sm={6}
                lg={4}
                className='justify-content-center'
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
