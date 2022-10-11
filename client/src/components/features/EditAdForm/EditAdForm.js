import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { editAdRequest, getAdById } from '../../../redux/adsRedux';
import AdForm from '../../common/AdForm/AdForm';

const EditAdForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log('dupa', id);
  const ad = useSelector((state) => getAdById(state, id));
  console.log(ad);

  const handleSubmit = (ad) => {
    console.log(ad);

    dispatch(editAdRequest({ ...ad }, id));
    navigate('/');
  };
  if (!ad) {
    return <p>Problem</p>;
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
      _id={ad._id}
    />
  );
};

export default EditAdForm;
