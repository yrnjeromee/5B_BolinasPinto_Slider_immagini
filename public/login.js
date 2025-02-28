let myToken="";
fetch("./Login-admin.json").then(r => r.json()).then(conf => {
    myToken = conf.token;
});

export const createLogin = () =>{
    const inputUsername = document.getElementById("username");
    const inputPassword = document.getElementById("password");
    const submit = document.getElementById("submit");

    const login = (username, password) => {
        return new Promise((resolve, reject) => {
          fetch("http://ws.cipiaceinfo.it/credential/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "key": myToken,
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          })
            .then((r) => r.json())
            .then((r) => {
              resolve(r.result);
            })
            .catch((error) => {
              reject(error);
            });
        });
      };

      submit.onclick = () =>{
        const closeButton = document.querySelector('.btn-close');
        login(inputUsername.value, inputPassword.value).then((result) => {
            if(result){
              inputUsername.value = '';
              inputPassword.value = '';
              closeButton.click();
              document.getElementById("home").classList.add("hidden");
              document.getElementById("admin").classList.remove("hidden");
            }else{
              alert("Credenziali errati!");
            }
        }).catch((error) =>{
            console.log("Errore durante il login:", error);
        })
      }
}