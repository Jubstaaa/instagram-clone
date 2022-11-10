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
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(app);
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
          photoURL: "/img/no-avatar.jpeg",
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

export const getPostInfo = async (uname, postId) => {
  const username = await getDoc(doc(db, "usernames", uname));
  if (username.exists()) {
    const posts = (await getDoc(doc(db, "users", username.data().uid))).data()
      .posts;
    return posts.find((post) => post.uid === postId);
  } else {
    throw new Error("Kullanıcı bulunamadı!");
  }
};

export const getComments = async (uname, postId) => {
  const username = await getDoc(doc(db, "usernames", uname));
  if (username.exists()) {
    const posts = (await getDoc(doc(db, "users", username.data().uid))).data()
      .posts;
    const post = posts.find((post) => post.uid === postId);
    return post.comments;
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
    photoURL: "/img/no-avatar.jpeg",
  });
  updateProfile(auth.currentUser, {
    photoURL: "/img/no-avatar.jpeg",
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
  if (!file) {
    return;
  } else if (!file.type.includes("image/jp")) {
    return toast.error("Unsupported file type", { id: loading });
  } else {
    console.log(file);
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
  }
};

export const uploadPhoto = (file, setFile, setDisable) => {
  setDisable(true);
  const loading = toast.loading("File is uploading");
  if (!file) {
    return;
  } else if (!file.type.includes("image") && !file.type.includes("video")) {
    setDisable(false);

    return toast.error("Unsupported file type", { id: loading });
  } else if (file.size > 2097152) {
    setDisable(false);
    return toast.error("File is too big!", { id: loading });
  } else {
    const storageRef = ref(
      storage,
      `gs://instagram-clone-f9b98.appspot.com/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        toast.error(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFile({ type: file.type, url: downloadURL });
          toast.success("File is uploaded", {
            id: loading,
          });
          setDisable(false);
        });
      }
    );
  }
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

export const addPost = async ({ title, alt, location, file, user }) => {
  const loading = toast.loading("Post is uploading");
  try {
    await updateDoc(doc(db, "users", user.uid), {
      posts: arrayUnion({
        title,
        alt,
        location,
        uid: uuidv4(),
        file,
        date: new Date().getTime(),
        comments: [],
        likes: [],
      }),
    });
    toast.success("Post shared", { id: loading });
    updateRedux(user);
  } catch (e) {
    toast.error(e);
  }
};

export const deletePost = async (userData, post, authUser) => {
  delete post.user;

  const loading = toast.loading();

  try {
    await updateDoc(doc(db, "users", userData.uid), {
      posts: arrayRemove({
        ...post,
      }),
    });
    toast.success("Post deleted", { id: loading });
    updateRedux(authUser);
  } catch (e) {
    toast.error(e);
  }
};

export const editPost = async ({ title, alt, location, file, user, post }) => {
  delete post.user;

  const loading = toast.loading();
  try {
    await updateDoc(doc(db, "users", user.uid), {
      posts: arrayRemove({
        ...post,
      }),
    });
    await updateDoc(doc(db, "users", user.uid), {
      posts: arrayUnion({
        title,
        alt,
        location,
        uid: post.uid,
        file: post.file,
        date: post.date,
        comments: post.comments,
        likes: post.likes,
      }),
    });
    toast.success("Post Updated", { id: loading });
    updateRedux(user);
  } catch (e) {
    toast.error(e);
  }
};

export const addComment = async (comment, user, post, authUser) => {
  delete post.user;
  const loading = toast.loading("Comment is uploading");
  try {
    await updateDoc(doc(db, "users", user.uid), {
      posts: arrayRemove({
        ...post,
      }),
    });
    await updateDoc(doc(db, "users", user.uid), {
      posts: arrayUnion({
        ...post,
        comments: [
          ...post?.comments,
          {
            comment,
            date: new Date().getTime(),
            uid: uuidv4(),
            userUid: authUser.uid,
          },
        ],
      }),
    });
    toast.success("Comment posted", { id: loading });
    updateRedux(authUser);
  } catch (e) {
    toast.error(e);
  }
};

export const deleteComment = async (user, post, commentId, authUser) => {
  delete post.user;
  try {
    await updateDoc(doc(db, "users", user.uid), {
      posts: arrayRemove({
        ...post,
      }),
    });

    await updateDoc(doc(db, "users", user.uid), {
      posts: arrayUnion({
        ...post,
        comments: [
          ...post.comments.filter((comment) => comment.uid !== commentId),
        ],
      }),
    });

    updateRedux(authUser);
  } catch (e) {
    toast.error(e);
    console.log(e);
  }
};

export const addLikes = async (user, post, authUser) => {
  delete post.user;
  try {
    await updateDoc(doc(db, "users", user.uid), {
      posts: arrayRemove({
        ...post,
      }),
    });
    await updateDoc(doc(db, "users", user.uid), {
      posts: arrayUnion({
        ...post,
        likes: [
          ...post?.likes,
          {
            uid: authUser.uid,
          },
        ],
      }),
    });
    updateRedux(authUser);
  } catch (e) {
    toast.error(e);
  }
};

export const removeLikes = async (user, post, authUser) => {
  delete post.user;
  try {
    await updateDoc(doc(db, "users", user.uid), {
      posts: arrayRemove({
        ...post,
      }),
    });

    await updateDoc(doc(db, "users", user.uid), {
      posts: arrayUnion({
        ...post,
        likes: [...post.likes.filter((like) => like.uid !== authUser.uid)],
      }),
    });
    updateRedux(authUser);
  } catch (e) {
    toast.error(e);
  }
};

export const getFeed = async (following, myPosts) => {
  const posts = [...myPosts];

  for (let i = 0; i < following.length; i++) {
    const userData = await getFriendInfo(following[i].uid);
    userData.posts.map((post) => {
      posts.push({ ...post, user: userData });
    });
  }
  return posts;
};
