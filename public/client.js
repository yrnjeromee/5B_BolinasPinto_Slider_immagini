import { createNavigator } from "./navigator.js";
import { createLogin } from "./login.js";
import { createMiddleware } from "./Middleware.js";
const middleware = createMiddleware();
const inputFile = document.getElementById('file');
const upload = document.getElementById("upload");

const navigator = createNavigator(document.querySelector("#container"));
const login = createLogin();

upload.onclick = async () =>{
    if (inputFile.files.length === 0){
        console.log("Seleziona un file prima di caricare!");
    }else{
        await middleware.upload(inputFile);
    }
}

/*carosello*/
const myCarouselElement = document.querySelector('#myCarousel');
const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  touch: false
});
/***********/