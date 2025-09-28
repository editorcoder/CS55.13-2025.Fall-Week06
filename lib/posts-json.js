/*
editorcoder
2025-09-23
SRJC CS55.13 Fall 2025
Week 5: Assignment 6: Final Basic Full-Stack App 
posts-json.js
*/

import fs from "fs"; // import Node.js file system module
import path from "path"; // import Node.js path module

let convertedJSONData; // holder for converted JSON data

// retrieve and convert JSON data
export function getAndConvertJSONData() {
  if (convertedJSONData) return convertedJSONData; // check if JSON data was already retrieved
  const postsDirectory = path.join(process.cwd(), "data/posts.json"); // Store absolute path to posts JSON data
  const jsonString = fs.readFileSync(postsDirectory, "utf8"); // read JSON file contents as string
  convertedJSONData = JSON.parse(jsonString); // convert string to array
  return convertedJSONData; // return converted JSON data
}

// return all post data, as key/value pairs for each post object, sorted by post object title alphabetically
export function getSortedPostsData() {
  const jsonObj = getAndConvertJSONData(); // set temp object to converted JSON data
  jsonObj.sort(function (a, b) { // sort array items by object date value
    return a.date.localeCompare(b.date);
  });

  return jsonObj.map((item) => {
    // extract all properties of each object into new array of objects with renamed keys - for use with getStaticProps()
    return {
      // return new array
      id: item.id.toString(),
      title: item.title,
      date: item.date,
      contentHtml: item.contentHtml,
      imageName: item.imageName,
    };
  });
}

// return ids for all objects in posts data in params array
export function getAllPostIds() {
  const jsonObj = getAndConvertJSONData(); // set temp object to converted JSON data
  return jsonObj.map((item) => {
    // extract id property of each object into new array of params -- for use with getStaticPaths()
    return {
      params: {
        id: item.id.toString(),
      },
    };
  });
}

// return post data for each id passed
export async function getPostData(idRequested) {
  const jsonObj = getAndConvertJSONData(); // set temp object to converted JSON data
  // define return object
  const returnData = jsonObj.filter((obj) => {
    return obj.id.toString() === idRequested;
  });

  // error handling: check if id requested has a match in post data
  if (returnData.length === 0) {
    // if not return "not found" response
    return {
      id: id,
      title: "Not found",
      date: "",
      contentHtml: "Not found",
    };
  } else {
    return returnData[0];
  }

}
