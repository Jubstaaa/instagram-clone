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
  where,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import {
  getDatabase,
  ref as refrtdb,
  set,
  child,
  get,
  push,
  update,
  onValue,
  onDisconnect,
} from "firebase/database";

import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
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
const rtdb = getDatabase(app);

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
    set(refrtdb(rtdb, "status/" + user.uid), {
      status: "online",
    });

    const objRef = refrtdb(rtdb, `status/${user.uid}`);
    onDisconnect(objRef).remove();
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
          saved: [],
          notifications: [],
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
    return post?.comments;
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
  const user = auth.currentUser;
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
    await updateDoc(doc(db, "users", userData.uid), {
      notifications: arrayUnion({
        uid: authUser.uid,
        type: "follow",
        unread: true,
        date: new Date().getTime(),
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
  post = await getPostInfo(userData.username, post.uid);
  if (post) {
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
  } else {
    toast.error("Post is no longer available", { id: loading });
  }
};

export const editPost = async ({ title, alt, location, file, user, post }) => {
  delete post.user;

  const loading = toast.loading();
  post = await getPostInfo(user.username, post.uid);
  if (post) {
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
  } else {
    toast.error("Post is no longer available", { id: loading });
  }
};

export const addComment = async (comment, user, post, authUser) => {
  delete post.user;
  const loading = toast.loading("Comment is uploading");
  post = await getPostInfo(user.username, post.uid);
  if (post) {
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

      if (authUser.uid !== user.uid) {
        await updateDoc(doc(db, "users", user.uid), {
          notifications: arrayUnion({
            uid: authUser.uid,
            type: "comment",
            file: post.file,
            postUid: post.uid,
            comment,
            unread: true,
            date: new Date().getTime(),
          }),
        });
      }
      toast.success("Comment posted", { id: loading });
      updateRedux(authUser);
    } catch (e) {
      toast.error(e);
    }
  } else {
    toast.error("Post is no longer available", { id: loading });
  }
};

export const deleteComment = async (user, post, commentId, authUser) => {
  delete post.user;
  post = await getPostInfo(user.username, post.uid);
  if (post) {
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
            ...post?.comments?.filter((comment) => comment.uid !== commentId),
          ],
        }),
      });

      updateRedux(authUser);
    } catch (e) {
      toast.error(e);
      console.log(e);
    }
  } else {
    toast.error("Post is no longer available");
  }
};

export const addLikes = async (user, post, authUser) => {
  delete post.user;
  post = await getPostInfo(user.username, post.uid);
  if (post) {
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
      if (authUser.uid !== user.uid) {
        await updateDoc(doc(db, "users", user.uid), {
          notifications: arrayUnion({
            uid: authUser.uid,
            type: "like",
            file: post.file,
            postUid: post.uid,
            unread: true,
            date: new Date().getTime(),
          }),
        });
      }

      updateRedux(authUser);
    } catch (e) {
      toast.error(e);
    }
  } else {
    toast.error("Post is no longer available");
  }
};

export const removeLikes = async (user, post, authUser) => {
  delete post.user;
  post = await getPostInfo(user.username, post.uid);
  if (post) {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        posts: arrayRemove({
          ...post,
        }),
      });

      await updateDoc(doc(db, "users", user.uid), {
        posts: arrayUnion({
          ...post,
          likes: [...post?.likes?.filter((like) => like.uid !== authUser.uid)],
        }),
      });
      updateRedux(authUser);
    } catch (e) {
      toast.error(e);
    }
  } else {
    toast.error("Post is no longer available");
  }
};

export const getFeed = async (following, myPosts) => {
  const posts = [...myPosts];
  for (let i = 0; i < following.length; i++) {
    const userData = await getFriendInfo(following[i].uid);
    userData?.posts?.map((post) => {
      posts.push({ ...post, user: userData });
    });
  }
  return posts;
};

export const createMessage = async (user, authUser) => {
  const uid = uuidv4();
  set(refrtdb(rtdb, `${uid}/users`), {
    uid: user.uid,
    uid2: authUser.uid,
  });

  try {
    await updateDoc(doc(db, "users", authUser.uid), {
      messages: arrayUnion({
        uid,
        receiver: user.uid,
      }),
    });
    await updateDoc(doc(db, "users", user.uid), {
      messages: arrayUnion({
        uid,
        receiver: authUser.uid,
      }),
    });
    updateRedux(authUser);
    return uid;
  } catch (e) {
    toast.error(e.code);
  }
};

export const checkSenderUser = (conversationId, authUser, setSender) => {
  const dbRef = refrtdb(getDatabase());
  get(child(dbRef, `${conversationId}/users`))
    .then(async (snapshot) => {
      if (snapshot.exists()) {
        setSender(
          await getFriendInfo(
            snapshot.val().uid === authUser.uid
              ? snapshot.val().uid
              : snapshot.val().uid2 === authUser.uid && snapshot.val().uid2
          )
        );
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const checkReceiverUser = (conversationId, authUser, setReceiver) => {
  const dbRef = refrtdb(getDatabase());
  get(child(dbRef, `${conversationId}/users`))
    .then(async (snapshot) => {
      if (snapshot.exists()) {
        setReceiver(
          await getFriendInfo(
            snapshot.val().uid === authUser.uid
              ? snapshot.val().uid2
              : snapshot.val().uid
          )
        );
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const sendMessage = async (
  authUser,
  message,
  conversationId,
  receiver
) => {
  const msg = {
    author: authUser.uid,
    message,
    date: new Date().getTime(),
    unread: true,
  };
  const msgKey = push(child(refrtdb(rtdb), conversationId)).key;

  const updates = {};
  updates[`/${conversationId}/` + msgKey] = msg;

  return update(refrtdb(rtdb), updates);
};

export const sendPost = async (authUser, post, userData, conversationId) => {
  const msg = {
    author: authUser.uid,
    message: "Sent you a post",
    post,
    date: new Date().getTime(),
    unread: true,
  };
  const msgKey = push(child(refrtdb(rtdb), conversationId)).key;

  const updates = {};
  updates[`/${conversationId}/` + msgKey] = msg;
  toast.success("Send");

  return update(refrtdb(rtdb), updates);
};

export const sendPhoto = async (file, authUser, conversationId) => {
  const msg = {
    author: authUser.uid,
    message: "Sent you a photo",
    image: "",
    date: new Date().getTime(),
    unread: true,
  };

  const loading = toast.loading("File is uploading");
  if (!file) {
    return;
  } else if (!file.type.includes("image")) {
    return toast.error("Unsupported file type", { id: loading });
  } else if (file.size > 2097152) {
    return toast.error("File is too big!", { id: loading });
  } else {
    try {
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
            msg.image = downloadURL;
            toast.success("File is uploaded", {
              id: loading,
            });
            const msgKey = push(child(refrtdb(rtdb), conversationId)).key;

            const updates = {};
            updates[`/${conversationId}/` + msgKey] = msg;

            return update(refrtdb(rtdb), updates);
          });
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
};

export const getMessages = (conversationId, setMessages) => {
  if (conversationId) {
    const messagesRef = refrtdb(rtdb, conversationId);
    onValue(messagesRef, (snapshot) => {
      let messages = [];

      snapshot.forEach((message) => {
        messages.push({
          id: message.key,
          ...message.val(),
        });
      });
      messages.pop();
      setMessages(messages);
    });
  }
};

export const getLastMessage = async (conversationId) => {
  const messagesRef = refrtdb(rtdb, conversationId);
  const snapshot = await get(messagesRef);

  return Object.values(snapshot.val())[
    Object.values(snapshot.val()).length - 2
  ];
};

export const getChatList = async (user) => {
  return (await getDoc(doc(db, "users", user.uid))).data().messages;
};

export const checkChatExist = async (authUser, user, navigate = null) => {
  let conversationId = null;

  const checkExist = await authUser?.messages?.find(
    (message) => message.receiver === user.uid
  );
  if (checkExist) {
    conversationId = checkExist.uid;
  } else {
    conversationId = await createMessage(user, authUser);
  }
  navigate && navigate(`/direct/${conversationId}`);
  return conversationId;
};

export const getStatus = (user, setUser) => {
  const messagesRef = refrtdb(rtdb, `status/${user.uid}`);
  onValue(messagesRef, (snapshot) => {
    setUser({ ...user, status: snapshot?.val()?.status });
  });
};

export const seenMessage = (message, conversationId) => {
  if (message?.id && message?.unread === true) {
    update(refrtdb(rtdb, `${conversationId}/${message.id}`), {
      unread: false,
      unreadDate: new Date().getTime(),
    })
      .then()
      .catch((err) => console.log(err));
  }
};

export const seenNotification = async (notification, authUser) => {
  try {
    await updateDoc(doc(db, "users", authUser.uid), {
      notifications: arrayRemove({
        ...notification,
      }),
    });

    await updateDoc(doc(db, "users", authUser.uid), {
      notifications: arrayUnion({
        ...notification,
        unread: false,
      }),
    });

    updateRedux(authUser);
  } catch (e) {
    toast.error(e);
    console.log(e);
  }
};

export const checkUnreadedMessages = async (user) => {
  const notifications = [];
  const messages = await getChatList(user);
  await Promise.all(
    messages?.map(async (messages) => {
      notifications.push(await getLastMessage(messages.uid));
    })
  );
  return notifications;
};

export const checkDeletedUsers = async (user) => {
  const username = await getDoc(doc(db, "usernames", user.username));
  if (username.exists()) {
    const followers = (
      await getDoc(doc(db, "users", username.data().uid))
    ).data().followers;
    const followings = (
      await getDoc(doc(db, "users", username.data().uid))
    ).data().following;
    const messages = (
      await getDoc(doc(db, "users", username.data().uid))
    ).data().messages;
    const users = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      users.push({ uid: doc.id });
    });
    const results = followers?.filter(
      ({ uid: id1 }) => !users.some(({ uid: id2 }) => id2 === id1)
    );
    const results1 = followings?.filter(
      ({ uid: id1 }) => !users.some(({ uid: id2 }) => id2 === id1)
    );
    const results2 = messages?.filter(
      ({ receiver: id1 }) => !users.some(({ uid: id2 }) => id2 === id1)
    );
    results?.map(async (item) => {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          followers: arrayRemove({
            uid: item.uid,
          }),
        });
      } catch (e) {
        toast.error(e.code);
      }
    });
    results1?.map(async (item) => {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          following: arrayRemove({
            uid: item.uid,
          }),
        });
        updateRedux(user);
      } catch (e) {
        toast.error(e.code);
      }
    });
    results2?.map(async (item) => {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          messages: arrayRemove({
            uid: item.uid,
            receiver: item.receiver,
          }),
        });
        updateRedux(user);
      } catch (e) {
        toast.error(e.code);
      }
    });
  } else {
    throw new Error("Kullanıcı bulunamadı!");
  }
};

export const savePost = async (user, userUid, postUid) => {
  try {
    await updateDoc(doc(db, "users", user.uid), {
      saved: arrayUnion({
        postUid,
        userUid,
      }),
    });
    updateRedux(user);
  } catch (e) {
    toast.error(e);
  }
};

export const unsavePost = async (user, userUid, postUid) => {
  try {
    await updateDoc(doc(db, "users", user.uid), {
      saved: arrayRemove({
        postUid,
        userUid,
      }),
    });
    updateRedux(user);
  } catch (e) {
    toast.error(e);
  }
};

export const getUserDetails = async (uid) => {
  const stateQuery = query(collection(db, "users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(stateQuery);
  let result = "";
  querySnapshot.forEach((doc) => {
    result = doc.data();
  });
  return result;
};
