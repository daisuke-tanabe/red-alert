import { signInWithEmailAndPassword } from 'firebase/auth';
import { Value } from '../../provider/AuthProvider';

type SignIn = <T extends Value>(value: T) => Promise<void>;

const signIn: SignIn = async ({ auth, email, password }) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      /* something */
    })
    .catch((error) => {
      /* something */
    });
};

export default signIn;
