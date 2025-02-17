import { createNavigator } from "./navigator.js";
import { createLogin } from "./login.js";
import { createMiddleware } from "./Middleware.js";
const middleware = createMiddleware();

const navigator = createNavigator(document.querySelector("#container"));
const login = createLogin();

const gestioneSPA = async (middleware) => {
    const inputFile = document.getElementById('file');
    const pulsanteUpload = document.getElementById("upload");  
    const tabella = document.getElementById("tabella");
    const carosello = document.getElementById("carosello");  
    const renderTabella = (list) => {
        const template = `
        <tr>
            <td><img src="$URL"style="width: 80%; height: 80%;" /></td>
            <td><button id="$ID" type="button" class="delete btn btn-button" style="background-color:red">ELIMINA</button></td>
        </tr>`;
        tabella.innerHTML = list.map((element) => {
            let row = template.replace("$ID", element.id);
            row = row.replace("$URL", element.name);
            row = row.replace("$URL", element.name);
            return row;
        }).join("\n");
        const bottoneElimina = document.querySelectorAll(".delete");
        bottoneElimina.forEach((button) => {
            button.onclick = () => {
                middleware.delete(button.id)
            .then(
                () => middleware.load()
            ).then((list) => {
                renderTabella(list);
                renderCarosello(list);
            });
            }
        });
    }
    const renderCarosello = (list) => {
        let html = '';
        for (let i = 0; i < list.length; i++) {
            const foto = list[i];
            let active = '';
            if (i === 0) {
                active = ' active';
            }
            html += '<div id="' + foto.id + '" class="carousel-item' + active + '">'+
            '<img src="' + foto.name + '" style="width: 1000px; height: 600px;" alt="Immagine ' + foto.id + '" />'+
            '</div>';
        }
        carosello.innerHTML = html;
    };
    pulsanteUpload.onclick = async () => {
        if (!inputFile.files || inputFile.files.length === 0) {
            alert("Per favore seleziona un file prima di caricare.");
            return;
        }
        await middleware.upload(inputFile);
        const list = await middleware.load();
        renderCarosello(list);
        renderTabella(list);
        inputFile.value=""
    }
    middleware.load().then((list) => {
        renderTabella(list);
        renderCarosello(list);
    });
}

gestioneSPA(middleware);