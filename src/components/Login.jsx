import { useState} from "react";
import { login } from "./api";
import '../style/style.css'; 
export default function Login({ onLogin, goToRegister}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le chargement de la page par default
        setError(null); // à chaque tentative on met l'erreur à null
        
        try{
            await login(email , password); 
            onLogin();  // appeler la fonction pour aller vers une autre page apres la validation
        } catch (err){
            setError("Mot de passe incorrect");
        }

    };

    return(
        <>
        <div className="login-container">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="email"
                placeholder="Votre Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                />
            </div>
            <div>
                <input type="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            {error && <p style={{color : "red"}}>{error}</p>}
            <button type = "submit">Connexion</button>
        </form>
        <p>
            Pas encore inscrit ?{" "}
            <button onClick={goToRegister}
            style={{border: "none", background:"none", color: "blue", cursor: "pointer"}}>
                S'inscrire
            </button>
        </p>
        </div>
        </>
    );
}