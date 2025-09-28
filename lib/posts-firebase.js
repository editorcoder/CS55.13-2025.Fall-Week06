/*
editorcoder
2025-09-27
SRJC CS55.13 Fall 2025
Week 6: Assignment 7: Database Basics  
posts-firebase.js
*/

import { db } from "./firebase"; // load Firestore db
import { // Import Firestore functions for database operations
  collection, // Function to reference a collection in Firestore
  getDocs, // Function to get all documents from a collection
  query, // Function to create a query for filtering documents
  where, // Function to add where conditions to a query
  documentId, // Function to reference document ID in queries
} from "firebase/firestore";

// return all post data, as key/value pairs for each post object, sorted by post object title alphabetically
export async function getSortedPostsData() {
  const postsCollection = collection(db, "posts"); // get posts collection data from Firestore db
  const postsCollectionDocs = await getDocs(postsCollection); // get all docs from posts collection
  const jsonObj = postsCollectionDocs.docs.map((doc) => ({ // Map over all documents in the collection
    id: doc.id, // Get the document ID
    ...doc.data(), // Spread all document data into the object
  }));

  jsonObj.sort(function (a, b) { // Sort the array of post objects by object date value
    return b.date.localeCompare(a.date); // Compare dates using localeCompare for proper sorting
  });

  return jsonObj.map((item) => { // Map over sorted posts to format them - for use with getStaticProps()
    return { // Return formatted post object
      id: item.id.toString(), // Convert ID to string
      title: item.title, // Include title property
      date: item.date, // Include date property
      contentHTML: item.contentHTML, // Include contentHTML property
      imageName: item.imageName, // Include imageName property
    };
  });
  
}

// return ids for all objects in posts data in params array
export async function getAllPostIds() {
  const postsCollection = collection(db, "posts"); // get posts collection data from Firestore db
  const postsCollectionDocs = await getDocs(postsCollection); // get all docs from posts collection
  const jsonObj = postsCollectionDocs.docs.map((doc) => ({ id: doc.id })); // store all IDs from docs from posts collection

  return jsonObj.map((item) => { // Map over all post objects to format them - for use with getStaticPaths()
    return { // Return object with params property
      params: { // Create params object for Next.js dynamic routing
        id: item.id.toString(), // Convert ID to string and assign to id property
      },
    };
  });

}

// return post data for each id passed
export async function getPostData(idRequested) {

  const postsCollection = collection(db, "posts"); // get posts collection data from Firestore db
  const searchPosts = query( // Create a query to search for specific post
    postsCollection, // Search in the posts collection
    where(documentId(), "==", idRequested) // Filter where document ID equals the requested ID
  );

  const specificDoc = await getDocs(searchPosts); // Execute the query to get matching documents

  const jsonObj = specificDoc.docs.map((doc) => ({
    // Map over the query results
    id: doc.id, // Get the document ID
    ...doc.data(), // Spread all document data into the object
  }));

  if (jsonObj.length === 0) { // Check if no documents were found
    return {
      // if not return "not found"...
      id: idRequested, // Use the requested ID
      title: "Not found", // Set title to "Not found"
      date: "", // Set empty date
      contentHtml: "Not found", // Set content to "Not found"
    };
  } else {
    // If document was found...
    return jsonObj[0]; // Return the first (and should be only) document
  }

}
