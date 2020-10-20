/*

  Node Packeges
  (just use npm install or yarn add on cmd/bash to get all in order)

*/
require("dotenv").config();
const fetch = require("node-fetch");
const fs = require("fs");
const request = require("request");
// const download = require("image-downloader");
// const { title } = require("process");
// const { Console } = require("console");
const CLIENT_ID = "ATudurADXx-6dMz3D-dL8Y4DTAUZ0wumV_lqzkm7hSA";
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

/*
  Program Variables

*/

const regExp_URL = new RegExp("^([a-zA-Z0-9][^*/><?|:&]*)$");
const COLLECTION_DEFAULT_PAGE = 1;
const COLLECTION_DEFAULT_PHOTOS_PAGE = 30;
let couter = 0;

function create_dir(name) {
  fs.mkdir("./" + name, function (err) {
    if (err) {
      return;
    } else {
      console.log("New directory successfully created.");
    }
  });
}

var downloads = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);

    request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  });
};

async function fetch_data(uri, page_nr = 1) {
  let url = new URL(uri);
  url.searchParams.set("client_id", CLIENT_ID);
  url.searchParams.set("per_page", COLLECTION_DEFAULT_PHOTOS_PAGE);
  url.searchParams.set("page", page_nr);
  // url.searchParams.set("id","11987944")
  // url.searchParams.set("order_by","popular");
  // url.searchParams.set("orientation","landscape")
  // url.searchParams.set("query","beach")
  // const url= new URL("https://api.unsplash.com/photos/random");

  const post_data = await fetch(url);
  const posts = await post_data.json();
  return posts;
}

async function unsplash_fetch_random(collection_nr) {
  let folder = "images/" + collection_nr + " - ";
  if (!collection_nr) {
    collection_nr = "2311544";
  }
  const photos_url = `https://api.unsplash.com/collections/${collection_nr}/photos`;

  // let collection = await photos_url(`https://api.unsplash.com/collections/${collection_nr}`);
  // collection_images_nr = collection.total_photos;

  posts_array = await fetch_data(photos_url);

  collection_data = await fetch_data(
    `https://api.unsplash.com/collections/${collection_nr}`
  );
folder = folder + collection_data.title;
  collection_images_nr = parseInt(collection_data.total_photos);
  console.log(collection_images_nr);

  if (collection_images_nr <= COLLECTION_DEFAULT_PHOTOS_PAGE) {
    posts_array = await fetch_data(photos_url, COLLECTION_DEFAULT_PAGE);
    images_write(posts_array, folder);
  } else {
    let collection_images_pages = parseInt(
      collection_images_nr / COLLECTION_DEFAULT_PHOTOS_PAGE
    );

    readline.question(`How many pages do you want? 1 -> (${collection_images_pages}) \n`, nr => {

       if (nr && nr >= 1 && nr <= collection_images_pages) {
        collection_images_pages = parseInt(nr);
       }
      readline.close();
    });
    

  
    console.log(collection_images_pages);
    collection_images_pages =
      collection_images_pages == COLLECTION_DEFAULT_PAGE
        ? 2
        : collection_images_pages;
    console.error(collection_images_pages);
    create_dir(folder);

    for (let i = 1; i <= collection_images_pages; i++) {
      console.log(
        "//////////////////// " + i + "  ///////////////////"
      );
      console.log(
        ">>>>>>>>>>>>> Loading Page " +
          i +
          " of " +
          collection_images_pages +
          " <<<<<<<<<<<<<<<<<"
      );

      posts_array = await fetch_data(photos_url, i);
      images_write(posts_array, folder);
    }
  }
}

readline.question("What is the collection number? ", (nr) => {
  console.log(`Downloading Collection >>>>> ${nr} <<<<<<!`);
  couter = 0;
  unsplash_fetch_random(nr);
  readline.close();
});

function images_write(images_array, folder) {
  images_array.forEach((element, index, array) => {
    let title = element.alt_description;
    if (title && regExp_URL.test(title)) {
      title.substr(0, 150);
    } else {
      title = Math.random().toString(16).slice(2, 35);
    }
    let blob_URL = "" + element.urls.raw;
    console.log(title);
    downloads(blob_URL, `${folder}/${title}` + ".jpeg", function () {
      console.warn(">>" + ++couter + " Downloaded");
      console.log(">><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    });
  });
}
