const fs = require("fs");
let name= "SC7-0";
const op1= "SC7-00";
const op2=  "SC7-0";
let categoria="calçoes"
const linhas=45

create_folder(categoria)
for (let i =1 ; i < linhas; i++) {
   name= i<10 ? op1:op2;
   create_folder(categoria+"/"+name+i)    
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
