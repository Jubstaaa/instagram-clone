import Yup from "./validate";
import "yup-phone";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .test({
      message: "Already Exist",
      test: async (str) => {
        const user = await getDoc(doc(db, "emails", str));
        if (user.exists()) {
          return false;
        } else {
          return true;
        }
      },
    }),
  fullName: Yup.string().required(),
  username: Yup.mixed()
    .required()
    .test({
      message: "Username is not invalid",
      test: (str) => /^[a-z0-9\.\_]+$/i.test(str),
    })
    .test({
      message: "Already Exist",
      test: async (str) => {
        const user = await getDoc(doc(db, "usernames", str.toLowerCase()));
        if (user.exists()) {
          return false;
        } else {
          return true;
        }
      },
    }),
  password: Yup.string().required(),
});
