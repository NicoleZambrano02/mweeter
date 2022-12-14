import { OAuthProvider, signInWithPopup } from "firebase/auth";
import { authentication } from "./index";
import { useRouter } from "next/router";
import React from "react";
import Routes from "../../utils/Routes";
import { getUserById, setUsers } from "../data/users";
import Image from "next/image";

const provider = new OAuthProvider("microsoft.com");

const LoginWithMicrosoft = () => {
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(authentication, provider);
      await OAuthProvider.credentialFromResult(result);
      const userLogged = result.user;
      const userRegistered = await getUserById(userLogged.uid);
      if (!userRegistered) {
        const fullName = userLogged.displayName?.split(" ");
        const userDataToSend = {
          firstName: fullName![0],
          lastName: fullName![1],
          email: userLogged.email,
          photoURL: userLogged?.photoURL ? userLogged?.photoURL : null,
        };
        await setUsers(userLogged.uid, userDataToSend);
      }
      await router.push(Routes.INDEX);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <button
      className="border-1 border-gray4 rounded-6 text-center items-center text-gray3 py-buttonPY w-auto text-14 flex flex-row gap-2"
      onClick={handleLogin}
    >
      <Image src="/logos/microsoft.png" width={20} height={20} />
      Sign In with Microsoft
    </button>
  );
};
export default LoginWithMicrosoft;
