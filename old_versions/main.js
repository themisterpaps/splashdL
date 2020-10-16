
const fetch = require('node-fetch')
async function unsplash_fetch_random() {
  const url= new URL("https://api.unsplash.com/collections/2311544/photos");
  url.searchParams.set("client_id","ATudurADXx-6dMz3D-dL8Y4DTAUZ0wumV_lqzkm7hSA");
  url.searchParams.set("per_page", "10");
  // url.searchParams.set("id","11987944")
  // url.searchParams.set("order_by","popular");
  // url.searchParams.set("orientation","landscape")
  // url.searchParams.set("query","beach")
  // const url= new URL("https://api.unsplash.com/photos/random");

const a= await fetch(url);
const b=  await a.json();

b.forEach(element => {
  let title = element.alt_description;
  let blob_URL =element.urls.thumb;
  load_image(blob_URL,title);
//download(title,blob_URL);
});
console.log(b);
}


function load_image(url,title) {
   fetch(url).then(response =>{
    return response.blob();
  }).then(response =>{
     send_to_telegram(response,title);
  });
}

function send_to_telegram(blob,title) {
  var myresult = "";
  var formData = new FormData();
  
  // You get the chat ID from BotFather
  formData.append("chat_id", 1281725584);
  formData.append("caption", title);
  formData.append("photo", blob, "image.jpg");

  // Send HTTP Post request
  // You get the <authentication-token> from BotFather
  var url = "https://api.telegram.org/bot917755688:AAEU2YVG_MT3EnlrYDSRPYuJzLy0WIWTMGY/sendPhoto";
  var method = "POST";
  fetch(url,{
    method:"POST",
    body:formData
  });
}

unsplash_fetch_random();


function send_to_telegram(blob,title) {
  var url = "https://api.telegram.org/bot917755688:AAEU2YVG_MT3EnlrYDSRPYuJzLy0WIWTMGY/sendPhoto";
  var method = "POST";
  
  fetch(url,{
    method:"POST",
    body:blob,
    headers:{
      "Content-Type":"application/json"
    }
  });

}


   