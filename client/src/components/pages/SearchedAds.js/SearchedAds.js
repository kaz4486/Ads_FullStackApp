import { useEffect } from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  getAds,
  getRequest,
  loadSearchedAdsRequest,
} from '../../../redux/adsRedux';
import AdSummary from '../../common/AdSummary/AdSummary';

const SearchedAds = () => {
  const { searchPhrase } = useParams();
  const dispatch = useDispatch();

  const ads = useSelector(getAds);
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(loadSearchedAdsRequest(searchPhrase));
  }, [dispatch, searchPhrase]);

  if (request.pending)
    return <Spinner animation='border' color='primary' className='mt-3' />;
  if (request.error)
    return (
      <Alert color='warning' className='mt-3'>
        {request.error}
      </Alert>
    );
  if (!request.success)
    return (
      <Alert color='info' className='mt-3'>
        No results match your search criteria
      </Alert>
    );
  if (request.success)
    return (
      <Container>
        <h1>Searched Ads</h1>
        <section>
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

export default SearchedAds;
