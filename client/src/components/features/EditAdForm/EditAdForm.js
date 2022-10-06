import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { editAddRequest, getAdById } from '../../../redux/adsRedux';
import AdForm from '../../common/AdForm/AdForm';

const EditAdForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const ad = useSelector((state) => getAdById(state, id));

  const handleSubmit = (ad) => {
    dispatch(editAddRequest(...ad, id));
    navigate('/');
  };
  if (!ad) {
    return <Navigate to='/' />;
  }

  return (
    <AdForm
      action={handleSubmit}
      actionText='Edit Ad'
      title={ad.title}
      content={ad.content}
      publicationDate={ad.publicationDate}
      photo={ad.photo}
      price={ad.price}
      localization={ad.localization}
    />
  );
};

export default EditAdForm;
