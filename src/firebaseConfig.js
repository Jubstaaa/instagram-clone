import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  deleteUser,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { toast } from "react-hot-toast";
import { userHandle } from "utils";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  collection,
  getDocs,
  orderBy,
  query,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "twitter-clone-d11ce",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const user = auth.currentUser;
export const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userData = await getDoc(doc(db, "users", user.uid));
    let data = {
      uid: user.uid,
      fullName: user.displayName,
      email: user.email,
      ...userData.data(),
    };
    userHandle(data);
  } else {
    userHandle(false);
  }
});

export const updateRedux = async (user) => {
  const userData = await getDoc(doc(db, "users", user.uid || user));
  let data = {
    uid: user.uid,
    fullName: user.displayName,
    email: user.email,
    ...userData.data(),
  };
  userHandle(data);
};

export const login = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    toast.error(err.code);
  }
};

export const register = async ({ email, password, fullName, username }) => {
  try {
    const user = await getDoc(doc(db, "usernames", username));
    if (user.exists()) {
      toast.error("Username already used");
    } else {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response.user) {
        await setDoc(doc(db, "users", response.user.uid), {
          uid: response.user.uid,
          email: email,
          displayName: fullName,
          photoURL: "",
          website: "",
          bio: "",
          username: username.toLowerCase(),
          followers: [],
          following: [],
          posts: [],
        });
        await setDoc(doc(db, "usernames", username.toLowerCase()), {
          uid: response.user.uid,
        });
        await setDoc(doc(db, "emails", email), {
          uid: response.user.uid,
        });
        await updateProfile(auth.currentUser, {
          displayName: fullName,
        });
        return response.user;
      }
    }
  } catch (err) {
    toast.error(err.code);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    toast.error(err.code);
  }
};

export const getUserInfo = async (uname) => {
  const username = await getDoc(doc(db, "usernames", uname));
  if (username.exists()) {
    return (await getDoc(doc(db, "users", username.data().uid))).data();
  } else {
    throw new Error("Kullanıcı bulunamadı!");
  }
};

export const getFriendInfo = async (uid) => {
  return (await getDoc(doc(db, "users", uid))).data();
};

export const getUsers = async () => {
  const users = [];
  const usersRef = await getDocs(query(collection(db, "users")));
  usersRef.forEach((doc) => {
    users.push(doc.data());
  });
  return users;
};

export const removeUser = async (userData) => {
  deleteUser(user)
    .then(async () => {
      toast.success("Your account has been deleted!");
      await deleteDoc(doc(db, "emails", user.email));
      await deleteDoc(doc(db, "usernames", userData.username));
      await deleteDoc(doc(db, "users", user.uid));
    })
    .catch((error) => {
      console.log(error);
      toast.error(
        "Your login period has expired for account deletion, log in again"
      );
    });
};

export const removePhoto = async (user) => {
  await updateDoc(doc(db, "users", user.uid), {
    photoURL: "",
  });
  updateProfile(auth.currentUser, {
    photoURL: "",
  })
    .then(() => {
      toast.success("Profile picture removed");
      updateRedux(user);
    })
    .catch((error) => {
      toast.error("Profile photo could not be removed");
    });
};

export const updatePhoto = (user, file) => {
  const loading = toast.loading("Profile picture is updating");
  const storage = getStorage(app);
  const storageRef = ref(
    storage,
    `gs://instagram-clone-f9b98.appspot.com/${user.uid}`
  );
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      toast.error(error.code);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        await updateDoc(doc(db, "users", user.uid), {
          photoURL: downloadURL,
        });
        updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        })
          .then(() => {
            toast.success("Profile picture updated", {
              id: loading,
            });
            updateRedux(user);
          })
          .catch((error) => {
            toast.success("Profile photo could not be updated", {
              id: loading,
            });
          });
      });
    }
  );
};

export const updateEditProfile = async (
  { displayName, email, username, website, bio },
  userData
) => {
  const loading = toast.loading("Profile updating");
  updateEmail(auth.currentUser, email)
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName,
      })
        .then(async () => {
          await updateDoc(doc(db, "users", userData.uid), {
            displayName,
            email,
            username: username.toLowerCase(),
            website,
            bio,
          });
          await deleteDoc(doc(db, "emails", userData.email));
          await deleteDoc(doc(db, "usernames", userData.username));
          await setDoc(doc(db, "usernames", username.toLowerCase()), {
            uid: userData.uid,
          });
          await setDoc(doc(db, "emails", email), {
            uid: userData.uid,
          });
          toast.success("Profile updated", {
            id: loading,
          });
          updateRedux(userData);
        })
        .catch((error) => {
          toast.success("Profile could not be updated", {
            id: loading,
          });
        });
    })
    .catch((error) => {
      toast.error(error.code);
    });
};

export const changePassword = async (password) => {
  updatePassword(auth.currentUser, password)
    .then(() => {
      toast.success("Your password has been changed");
    })
    .catch((error) => {
      toast.error(error.code);
      console.log();
    });
};

export const forgotPassword = async (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      toast.success("Password reset email sent!");
    })
    .catch((error) => {
      toast.error("User not found");
    });
};

export const follow = async (authUser, userData) => {
  try {
    await updateDoc(doc(db, "users", authUser.uid), {
      following: arrayUnion({
        uid: userData.uid,
      }),
    });
    await updateDoc(doc(db, "users", userData.uid), {
      followers: arrayUnion({
        uid: authUser.uid,
      }),
    });
    updateRedux(authUser);
  } catch (e) {
    toast.error(e.code);
  }
};

export const unfollow = async (authUser, userData) => {
  try {
    await updateDoc(doc(db, "users", authUser.uid), {
      following: arrayRemove({
        uid: userData.uid,
      }),
    });
    await updateDoc(doc(db, "users", userData.uid), {
      followers: arrayRemove({
        uid: authUser.uid,
      }),
    });
    updateRedux(authUser);
  } catch (e) {
    toast.error(e.code);
  }
};

export const unfollower = async (authUser, user) => {
  try {
    await updateDoc(doc(db, "users", user.uid), {
      following: arrayRemove({
        uid: authUser.uid,
      }),
    });
    await updateDoc(doc(db, "users", authUser.uid), {
      followers: arrayRemove({
        uid: user.uid,
      }),
    });
    updateRedux(authUser);
  } catch (e) {
    toast.error(e.code);
  }
};
