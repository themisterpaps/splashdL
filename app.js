
/* 
Node Dependecies */
const fetch = require("node-fetch");
const fs = require("fs");
const  request = require("request");
const readline = require("readline").createInterface({ input: process.stdin, output: process.stdout});
require("dotenv").config();

/* 
Constants*/
const folder_name_Regexp = new RegExp("^([a-zA-Z0-9][^*/><?|:&]*)$");
const collection_default_page = 1;
const unsplash_token = process.env.UNSPLASH_TOKEN;
/*
Variables */
let photos_couter=0;
let photos_total=0;

/*
Utitlity function*/

/*
Function to download and wirte Images*/
var downloads = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
   // console.log("content-type:", res.headers["content-type"]);
   // console.log("content-length:", res.headers["content-length"]);

    request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  });
};
/*
Function to download and wirte Images*/
function validateFileName(filename) {
    if (filename && folder_name_Regexp.test(filename)) {
      filename.substr(0, 150);
    } else {
      filename = Math.random().toString(16).slice(2, 34) + Math.random().toString(16).slice(2, 18) ;
    }
    return filename
}


/*
Function to get The user input*/
function getUserInput(message,callback) {
	 readline.question(message,(input) =>{
		console.log("Output: ", input);
		readline.close();
		callback(input);
		return
	});
}

/*
Function to get The user input*/
async function collection_fetch(collection_id) {
  let folder_name = "images/";
  let collection_data;
  let collection_total_photos;
  let collection_photos;

  if (!collection_id || isNaN(collection_id)) {
   // getUserInput("Please Enter a Valid input");
   console.log(">> invalid user input");
   return  
  }

  collection_data = await fetch_data(`http://127.0.0.1:8080/json/app.json`);
  //collection_data =  await fetch_data(`https://api.unsplash.com/collections/${collection_id}`);

  collection_total_photos = parseInt(collection_data.total_photos);
  collection_photos_url= new URL(collection_data.links.photos);

  folder_name+=collection_data.id+" - "+ validateFileName(collection_data.title);
  create_folder(folder_name);
/*
Fech fotos*/

 if (collection_total_photos>30) {
		let collection_images_pages = parseInt(collection_total_photos / 30);
    	collection_images_pages = collection_images_pages <= 1 ? 2 : collection_images_pages;
    	// getUserInput("Hey there",)
    	 for (let i = 1; i <= collection_images_pages; i++) {
    	 	 photos_array = await fetch_data(`http://127.0.0.1:8080/images/image.json`, 1);
    	 	 //photos_array = await fetch_data(collection_photos_url, i);
      		 photos_save(photos_array, folder_name);
    	 }

     	console.log(collection_images_pages);
 }else{
 	 photos_array = await fetch_data(`http://127.0.0.1:8080/images/image.json`, 1);
 	 //photos_array = await fetch_data(collection_photos_url, 1);
     photos_save(photos_array, folder_name);
 }

  console.log("Total Of Photos to Download "+collection_total_photos);

 
}


async function fetch_data(uri, page_nr = 1) {
  let url = new URL(uri);
  url.searchParams.set(
    "client_id",
    unsplash_token
  );
  url.searchParams.set("per_page", "30");
  url.searchParams.set("page", page_nr);

  const post_data = await fetch(url);
  const posts = await post_data.json();
  return posts;
}

function photos_save(images_array, folder) {

	//Loop to all Photos
	 
  	images_array.forEach((element, index, array) => {
    let title = element.alt_description;
    title = validateFileName(title);
    let blob_URL = "" + element.urls.raw;
     

    //Write Every single Photo
    downloads(blob_URL, `${folder}/${title}` + ".jpeg", function () {
      
     	console.log("///////////////////////////////////");
   	 	console.log(">> Photo Number: "+ (++photos_couter));
    	console.log(">> Title: "+ title);
    	console.log(">>> Location: " +element.user.location)
    	console.log(">>>> Photo By "+element.user.name);
    	console.log(">>>>>> Downloaded \n");

    	
    });
  });
}


function create_folder(name) {
  fs.mkdir("./" + name, function (err) {
    if (err) {
      return;
    } else {
      console.log("New directory successfully created.");
    }
  });
}

/*Tests*/
console.log(" (This app don't prive a good user input validation!!)", unsplash_token);
 getUserInput("\n >>> Hey, what is the number of the collection? ",collection_fetch)


 


 
