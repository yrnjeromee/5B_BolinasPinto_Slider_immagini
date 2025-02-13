import { createNavigator } from "./navigator.js";
import { createPubSub } from "./pubsub.js";
const fs = require('fs');
const credenziali = JSON.parse(fs.readFileSync('Login-admin.json'));
const navigator = createNavigator(document.querySelector("#container"));
const inputFile = document.getElementById('file');
const upload = document.getElementById("upload");
const admin = document.getElementById("submit");
const username = document.getElementById("username");
const password = document.getElementById("password");

/*carosello*/
const myCarouselElement = document.querySelector('#myCarousel');
const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  touch: false
});
/***********/

const login = () =>{
    if (credenziali.username === username && credenziali.password === password){
        console.log("Accesso Riuscito");
        pubsub.publish("loginSuccess");
    }else{
        console.log("Accesso Fallito");
    }
}

const createMiddleware = () => {
    return{
        load: async () =>{
            const response = await fetch("/images");
            const json = await response.json();
            return json;
        },
        delete: async (id) =>{
            const response = await fetch("/delete/" + id, {
                method: "DELETE",
            });
            const json = await response.json();
            return json;
        },
        upload: async(inputFile) => {
            const formData = new FormData();
            formData.append("file", inputFile.files[0]);
            const body = formData;
            const fetchOptions = {
                method: 'post',
                body: body
            };
            try{
                const res = await fetch ("/upload", fetchOptions);
                const data = await res.json();
                console.log(data);
            }catch (e){
                console.log(e);
            }
        }
    }
}