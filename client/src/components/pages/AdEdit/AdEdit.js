import { Alert } from 'react-bootstrap';
import EditAdForm from '../../features/EditAdForm/EditAdForm';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';

const AdEdit = () => {
  const user = useSelector((state) => getUser(state));

  if (!user)
    return (
      <Alert color='warning' className='mt-2'>
        You are not authorized, First Log In
      </Alert>
    );
  if (user) {
    return (
      <div>
        <h1>Edit Ad</h1>
        <EditAdForm />
      </div>
    );
  }
};

export default AdEdit;
