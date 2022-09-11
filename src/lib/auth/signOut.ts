import { signOut as firebaseSignOut, type Auth } from '@firebase/auth';

type SignOut = (value: Auth) => Promise<void>;

const signOut: SignOut = async (auth) => {
  await firebaseSignOut(auth)
    .then(() => {
      /* something */
    })
    .catch((error) => {
      /* something */
    });
};

export default signOut;
