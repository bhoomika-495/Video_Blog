import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { fireStoreDb } from "../firebase-config";

export const getAllFeeds = async () => {
  const feeds = await getDocs(
    query(collection(fireStoreDb, "videos"), orderBy("id", "desc"))
  );
  return feeds.docs.map((doc) => doc.data());
};

export const categoryFeeds = async (categoryId) => {
  const feeds = await getDocs(
    query(
      collection(fireStoreDb, "videos"),
      where("category", "==", categoryId),
      orderBy("id", "desc")
    )
  );
  return feeds.docs.map((doc) => doc.data());
};

export const recommendedFeed = async (categoryId, videoId) => {
  const feeds = await getDocs(
    query(
      collection(fireStoreDb, "videos"),
      where("category", "==", categoryId)
    )
  );
  // Filter out current video and sort on client side
  const filteredFeeds = feeds.docs
    .map((doc) => doc.data())
    .filter((video) => video.id !== videoId)
    .sort((a, b) => parseInt(b.id) - parseInt(a.id)); // Sort by ID descending
  return filteredFeeds;
};

export const getSpecificVideo = async (videoId) => {
  const videoRef = doc(fireStoreDb, "videos", videoId);
  const videoSnap = await getDoc(videoRef);
  if (videoSnap.exists()) {
    return videoSnap.data();
  } else {
    return "No such document";
  }
};

export const getUserInfo = async (userId) => {
  const userRef = doc(fireStoreDb, "users", userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    return "No such Document";
  }
};

export const userCreatedVideos = async (userId) => {
  const feeds = await getDocs(
    query(
      collection(fireStoreDb, "videos"),
      where("userId", "==", userId),
      orderBy("id", "desc")
    )
  );
  return feeds.docs.map((doc) => doc.data());
};

export const deleteVideo = async (videoId) => {
  await deleteDoc(doc(fireStoreDb, "videos", videoId));
};
