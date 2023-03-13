import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { editAdRequest, getAdById } from '../../../redux/adsRedux';
import AdForm from '../../common/AdForm/AdForm';
import { Progress } from 'reactstrap';

const EditAdForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const ad = useSelector((state) => getAdById(state, id));

  const handleSubmit = (ad) => {
    dispatch(editAdRequest(ad, id));
    setTimeout(() => {
      return navigate('/');
    }, 1000);
  };
  if (!ad) {
    return <Progress animated color='primary' value={50} />;
  }

  // if (request.pending) return <Progress animated color='primary' value={50} />;
  // if (request.error) return <Alert color='warning'>{request.error}</Alert>;

  return (
    <AdForm
      action={handleSubmit}
      actionText='Edit Ad'
      title={ad.title}git 
      content={ad.content}
      publicationDate={ad.publicationDate}
      photo={ad.photo}
      price={ad.price}
      localization={ad.localization}
      _id={ad._id}
    />
  );
};

export default EditAdForm;
