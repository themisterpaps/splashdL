const fetch = require('node-fetch');
const download = require('image-downloader');
const fs = require('fs'), request = require('request');


const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

 function create_dir(name) {
    fs.mkdir("./"+name, function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log("New directory successfully created.")
  }
})

  } 

var downloads = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};



async function unsplash_fetch_random(collection_nr) {
  const folder = "images/"+collection_nr;
  if (!collection_nr) {
    collection_nr="2311544"
  }
  const url= new URL(`https://api.unsplash.com/collections/${collection_nr}/photos`);
  url.searchParams.set("client_id","ATudurADXx-6dMz3D-dL8Y4DTAUZ0wumV_lqzkm7hSA");
  url.searchParams.set("per_page", "30");
  // url.searchParams.set("id","11987944")
  // url.searchParams.set("order_by","popular");
  // url.searchParams.set("orientation","landscape")
  // url.searchParams.set("query","beach")
  // const url= new URL("https://api.unsplash.com/photos/random");


const post_data= await fetch(url);
const posts_array=  await post_data.json();
create_dir(folder);

posts_array.forEach(element => {
  let title = element.alt_description;
  let blob_URL = ""+element.urls.full;
console.log(title);
downloads(blob_URL, `${folder}/${title}`+".jpeg", function(){
  console.log('done');
});
});
console.log(posts_array);
}


readline.question('What is the collection number?', nr => {
  console.log(`Hey there ${nr}!`);
  unsplash_fetch_random(nr);
  readline.close();
});



