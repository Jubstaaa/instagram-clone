import Yup from "./validate";

export const EditSchema = Yup.object().shape({
  displayName: Yup.string(),
  username: Yup.string(),
  website: Yup.string(),
  bio: Yup.string(),
  email: Yup.string().email(),
});
