import { Container, Button, Card } from 'react-bootstrap';
import { IMGS_URL } from '../../../config';
import { Link } from 'react-router-dom';
import styles from './AdSummary.module.scss';

const AdSummary = ({ _id, title, photo, localization, price }) => {
  return (
    <Card key={_id} border='primary' bg='light' className={styles.card}>
      <Card.Img
        variant='top'
        src={`${IMGS_URL}/${photo}`}
        alt='Product'
        className={styles.img}
      ></Card.Img>
      <Card.Title className={styles.title}>{title}</Card.Title>
      <Card.Text className={styles.localization}> {localization}</Card.Text>
      <Card.Text className={styles.price}> {price}$</Card.Text>

      <Link to={'/ads/' + _id}>
        <Button className='mb-2'>View details</Button>
      </Link>
    </Card>
  );
};

export default AdSummary;
