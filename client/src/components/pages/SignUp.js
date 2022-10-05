import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

const SignUp = () => {
  // komunikat "You have been successfully registered. You can now log in...". W przypadku zwrócenia przez serwer błędu, aplikacja powinna taki błąd pokazać.
  return (
    <Form>
      <Button>Sign Up</Button>
    </Form>
  );
};

export default SignUp;
