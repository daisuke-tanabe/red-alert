import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  Auth,
} from 'firebase/auth';

type Value = {
  auth: Auth;
  email: string;
  password: string;
};
type SignIn = (value: Value) => Promise<void>;
type SignOut = (auth: Auth) => Promise<void>;
type SignUp = (value: Value) => Promise<void>;

const signIn: SignIn = async ({ auth, email, password }) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(`SUCCESS: signInWithEmailAndPassword ${userCredential}`);
    })
    .catch((error) => {
      console.log(`ERROR: signInWithEmailAndPassword ${error}`);
    });
};

const signOut: SignOut = async (auth) => {
  await firebaseSignOut(auth)
    .then(() => {
      /* void */
    })
    .catch((error) => {
      console.log(`ERROR: firebaseSignOut ${error}`);
    });
};

const signUp: SignUp = async ({ auth, email, password }) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(`SUCCESS: createUserWithEmailAndPassword ${userCredential}`);
    })
    .catch((error) => {
      console.log(`ERROR: createUserWithEmailAndPassword ${error}`);
    });
};

export { signIn, signOut, signUp };
