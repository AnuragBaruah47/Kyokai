import { client, ID } from "./Appwrite";
import { Databases, Account } from "appwrite";

export const db = new Databases(client);
export const account = new Account(client);

export const signUp = async (data) => {
  try {
    await account.create(ID.unique(), data.email, data.password, data.userName);

    const session = await account.createEmailPasswordSession(
      data.email,
      data.password,
    );
    console.log("session done");
    if (session) {
      const user = await account.get();
      console.log(user);
      await db.createDocument("697c9282002782873b5d", "users", user.$id, {
        email: user.email,
        userName: user.name,
      });
      return user;
    }
  } catch (error) {
    console.error("error", error.message, error);
    throw error;
  }
};

export const logIn = async (data) => {
  try {
    await account.createEmailPasswordSession(data.email, data.password);
    const user = await account.get();

    return user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    const result = await account.deleteSessions("current");
    console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};

export const setBookMark = async (data, status) => {
  const getSession = await account.get()
  if(!getSession){
    console.log("Log In First");
    
  }else{
 try {
    db.createDocument("697c9282002782873b5d", "bookmarks", data.mal_id, {
      animeName: data.title_english ?? title_japanese,
      animeDescription: data.synopsis ?? "Unavailable",
      animeImageUrl: data.images.webp.large_image_url,
      status: status,
    });
  } catch (error) {
    console.log("Cant Set BookMark");
  }
  }
 
};

export const getAllBookmarks = async () => {
  try {
    const allBookmarks = await db.listDocuments(
      "697c9282002782873b5d",
      "bookmarks",
    );
    if (allBookmarks) {
      return allBookmarks;
    }
  } catch (error) {
    console.log("cant get all the bookmarks");
  }
};

export const deleteBookmarks = async (id) => {
  try {
    await db.deleteDocument("697c9282002782873b5d", "bookmarks", id);
    console.log("deleted");
  } catch (error) {
    console.log("cant delete");
  }
};
