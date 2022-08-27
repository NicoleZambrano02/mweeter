import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authentication } from "./index";
import { useRouter } from "next/router";
import Routes from "../../utils/Routes";
import Image from "next/image";
import { setUsers } from "../data/users";
const provider = new GoogleAuthProvider();

const LoginWithGoogleUser = () => {
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(authentication, provider);
      await GoogleAuthProvider.credentialFromResult(result);
      const userLogged = result.user;
      const fullName = userLogged.displayName?.split(" ");
      const userDataToSend = {
        firstName: fullName![0],
        lastName: fullName![1],
        email: userLogged.email,
        photoURL: userLogged?.photoURL ? userLogged?.photoURL : null,
        emailVerified: userLogged?.emailVerified,
      };
      await setUsers(userLogged.uid, userDataToSend);
      console.log("user", userLogged);
      await router.push(Routes.INDEX);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <button
      className="border-1 border-gray4 rounded-6 text-center items-center text-gray3 py-buttonPY px-10 w-auto text-14 flex flex-row"
      onClick={handleLogin}
    >
      <Image src="/logos/google.png" width={20} height={20} />
      Sign In with Google
    </button>
  );
};
export default LoginWithGoogleUser;
