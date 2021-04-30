// Autenticacion
const auth = firebase.auth();

// SignIn

const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");

const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");

const userDetails = document.getElementById("userDetails");

const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged((user) => {
  if (user) {
    //User logged
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userDetails.innerHTML = `<h3 class="font-weight-bold">¡Bienvenido ${user.displayName}!<h3> <p class="font-weight-light">Tu ID es: ${user.uid}</p>`;
  } else {
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    userDetails.innerHTML = "";
  }
});

// BD
const db = firebase.firestore();
const agregarLibro = document.getElementById("agregarLibro");
const listaLibros = document.getElementById("booksList");

let librosRef;
let unsubscribe;

auth.onAuthStateChanged((user) => {
  if (user) {
    librosRef = db.collection("things");

    const { serverTimeStamp } = firebase.firestore.FieldValue;

    let libro = {
      IdUsuario: user.uid,
      Titulo: "Prueba",
      Autor: "Prueba",
      FechaPublicacion: "FFF",
      FechaCreacion: serverTimeStamp(),
    };

    agregarLibro.onclick = () => {
      librosRef.add(libro);
    };

    console.log(libro);
  }
});
