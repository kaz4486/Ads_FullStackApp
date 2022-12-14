import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAddRequest } from '../../../redux/adsRedux';
import AdForm from '../../common/AdForm/AdForm';

const CreateAdForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (ad) => {
    dispatch(createAddRequest(ad));
    setTimeout(() => {
      return navigate('/');
    }, 500);
  };
  return <AdForm action={handleSubmit} actionText='Create Ad' />;
};

export default CreateAdForm;
