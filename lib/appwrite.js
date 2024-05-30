import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

import { Alert } from 'react-native';

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.codes.maya",
  projectId: "6655dca7001c186527f4",
  databaseId: "6655dddc000c38cdde5e",
  userCollectionId: "6655ddf5002e801e94c0",
  videoCollectionId: "6655de0d000d6821da11",
  storageId: "6655df0c003187fa9ac8",
  bookmarksCollectionId: '66586a99001714786134'
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
  bookmarksCollectionId
} = appwriteConfig

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform(platform) // Your application ID or bundle ID.
  ;

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(), {
      accountId: newAccount.$id,
      email: email,
      username: username,
      avatar: avatarUrl,
    }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(databaseId, userCollectionId, [Query.equal('accountId', currentAccount.$id)])

    if (!currentUser) throw Error


    return currentUser.documents[0];

  } catch (error) {
    console.log(error);

  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [Query.orderDesc('$createdAt')])
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const getPost = async (postId) => {
  try {
    const post = await databases.getDocument(
      databaseId,
      videoCollectionId,
      postId
    );

    if (!post) throw new Error("Something went wrong");
    return post;
  } catch (error) {
    throw new Error(error);
  }
}

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [Query.orderDesc('$createdAt', Query.limit(7))])
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      databaseId, videoCollectionId, [Query.search('title', query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId, [Query.equal("creator", userId), Query.orderDesc('$createdAt')]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getFilePreview = async (fileId, type) => {
  let fileUrl

  try {
    if (type === 'video') {
      fileUrl = storage.getFileView(storageId, fileId)
    } else if (type === 'image') {
      fileUrl = storage.getFileView(storageId, fileId, 2000, 2000, 'top', 100)
    } else {
      throw new Error('Invalid file Type')
    }

    if (!fileUrl) throw Error;

    return fileUrl;

  } catch (error) {
    throw new Error(error);
  }
}


export const uploadFile = async (file, type) => {

  if (!file) return;
  const asset = {
    name: `${file.type}_${file.fileSize}`,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri
  }

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    )


    const fileUrl = await getFilePreview(uploadedFile.$id, type)
    return fileUrl;

  } catch (error) {
    throw new Error(error)
  }
}

export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      databaseId,
      videoCollectionId,
      ID.unique(), {
      title: form.title,
      thumbnail: thumbnailUrl,
      video: videoUrl,
      prompt: form.prompt,
      creator: form.userId,
    }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);


  }
}



export const getUserBookmarks = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      bookmarksCollectionId, [Query.equal("userId", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}


export const getBookmarksForVideo = async (videoId) => {
  try {
    const bookmarks = await databases.listDocuments(
      databaseId,
      bookmarksCollectionId, [Query.equal('videoId', videoId)]
    );

    return bookmarks.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const getUserBookmarkForVideo = async (videoId, userId) => {
  try {
    const bookmarks = await databases.listDocuments(
      databaseId,
      bookmarksCollectionId, [Query.equal('videoId', videoId), Query.equal('userId', userId)]
    );

    return bookmarks.documents;
  } catch (error) {
    throw new Error(error);
  }
}



export const bookmarkPost = async (typeOfCall, userId, videoId) => {

  // Get the users bookmark for the current video
  const userBookmark = await getUserBookmarkForVideo(videoId, userId);


  // Check if the functions is to add the bookmark or remove it

  if (typeOfCall === 'add' && userBookmark.length === 0) { //If the type is add and the length of the array is 0 (signifying no bookmark)
    try {
      const newBookmarkObject = {
        userId: userId,
        bookmarked_timestamp: Date.now().toString(),
        videoId: videoId,
      };

      const newBookmark = await databases.createDocument(
        databaseId,
        bookmarksCollectionId,
        ID.unique(),
        newBookmarkObject
      );
      return newBookmark;
    } catch (error) {
      throw new Error(error);
    }
  } else if (typeOfCall === 'add' && userBookmark.length === 1) { //If the type is add and the length of the array is 1 (signifying there is a bookmark)
    Alert.alert('You have already bookmarked this post!')
  }

  if (typeOfCall === 'remove' && userBookmark.length === 1) { //If the type is remove and the length of the array is 1 (signifying there is a bookmark)
    try {
      const result = await databases.deleteDocument(
        databaseId,
        bookmarksCollectionId,
        userBookmark[0].$id
      );
    } catch (error) {
      throw new Error(error);
    }

  } else if (typeOfCall === 'remove' && userBookmark.length === 0) { //If the type is remove and the length of the array is 0 (signifying no bookmark)
    Alert.alert('You have not bookmarked this post!')
  }
}