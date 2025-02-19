
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";



import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  updateProfile,
  signOut // Agregar esta línea,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";


import { 
  getFirestore, 
  setDoc, 
  doc, 
  getDoc, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";


import { getStorage } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-storage.js";

// Firebase configuration 
export const firebaseConfig = {
  apiKey: "AIzaSyBMg2j0zkvQ78WOcO3TXfWqeoceUCJnz9s",
  authDomain: "trasciende-f1fa0.firebaseapp.com",
  projectId: "trasciende-f1fa0",
  storageBucket: "trasciende-f1fa0.firebasestorage.app",
  messagingSenderId: "765493050593",
  appId: "1:765493050593:web:c2f7c1ea982b6ee660cba0",
  measurementId: "G-NVRERHJ3MB"
};



// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export function logout() {
  return signOut(auth);
}


/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @param {string} fullName 
 * @param {string} role 
 * @returns {Promise} 
 */


export function registerUser(email, password, fullName, role) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Registro exitoso. ¡Bienvenido!");
  
        
        return updateProfile(user, {
          displayName: fullName,
        }).then(() => {
          console.log("Nombre actualizado exitosamente");
          
          return setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: fullName,
            role: role,
            timestamp: serverTimestamp(),
          }).then(() => user); 
        });
      })
      .then((user) => {
        console.log("Usuario agregado a Firestore");
        
        return getUserRole(user.uid).then((userRole) => {
          redirectToDashboard(userRole);
          return user;
        });
      })
      .catch((error) => {
        console.error("Error al registrar:", error.code, error.message);
        alert("Error al registrar: " + error.message);
        throw error;
      });
  }
  


/**
 * 
 * @param {string} uid 
 * @returns {Promise<string>} 
 */
export function getUserRole(uid) {
  return getDoc(doc(db, "users", uid))
    .then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        return data.role;
      } else {
        throw new Error("No se encontró el usuario en Firestore.");
      }
    });
}

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise}
 */
export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Inicio de sesión exitoso. ¡Bienvenido!");
      const user = userCredential.user;
      
      return getUserRole(user.uid).then((role) => {
        redirectToDashboard(role);
      });
    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error.code, error.message);
      alert("Error al iniciar sesión: " + error.message);
      throw error;
    });
}

/**
 * Inicia sesión con Google y redirige según el rol.
 * @returns {Promise}
 */
export function loginWithGoogle() {
    return signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Inicio de sesión con Google exitoso. ¡Bienvenido!", result.user);
        const userRef = doc(db, "users", result.user.uid);
        return getDoc(userRef)
          .then((docSnap) => {
            if (!docSnap.exists()) {
              
              return setDoc(userRef, {
                uid: result.user.uid,
                displayName: result.user.displayName,
                role: "estudiante", 
                timestamp: serverTimestamp(),
              }).then(() => "estudiante");
            } else {
              return docSnap.data().role;
            }
          })
          .then((role) => {
            redirectToDashboard(role);
            return result;
          });
      })
      .catch((error) => {
        console.error("Error al iniciar sesión con Google:", error.code, error.message);
        alert("Error al iniciar sesión con Google: " + error.message);
        throw error;
      });
}
  

/**
 * Redirige al usuario a la página de dashboard correspondiente según su rol.
 * @param {string} role 
 */
function redirectToDashboard(role) {
    console.log("Redirigiendo con rol:", role);
    switch (role) {
      case "estudiante":
        window.location.href = "../html/rol-estudiante.html";
        break;
      case "staff":
        window.location.href = "../html/rol-staff.html";
        break;
      case "profesor":
        window.location.href = "../html/rol-profesor.html";
        break;
      case "padres":
        window.location.href = "../html/rol-padres.html";
        break;
      default:
        console.error("Rol desconocido:", role);
        break;
    }
}
  


