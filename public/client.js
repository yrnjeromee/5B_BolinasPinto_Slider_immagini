import { createNavigator } from "./navigator.js";
import { createLogin } from "./login.js";
const inputFile = document.getElementById('file');
const upload = document.getElementById("upload");
const home = document.getElementById("home");

const navigator = createNavigator(document.querySelector("#container"));
const login = createLogin();

/*carosello*/
const myCarouselElement = document.querySelector('#myCarousel');
const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  touch: false
});
/***********/

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