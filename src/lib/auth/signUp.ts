import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Value } from '../../provider/AuthProvider';

type SignUp = <T extends Value>(value: T) => Promise<void>;

const signUp: SignUp = async ({ auth, email, password }) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      /* something */
    })
    .catch((error) => {
      /* something */
    });
};

export default signUp;
