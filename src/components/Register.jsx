import { useState} from "react";
import { register } from "./api";
import '../style/style.css'; 
export default function Register({ onRegister, goToLogin}){
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le chargement de la page par default
        setError(null); // à chaque tentative on met l'erreur à null
        
        try{
            await register(email , password, password);
            onRegister();  
        } catch (err){
            setError("Une erreur est survenue lors de votre inscription");
        }

    };

    return(
        <>
        <div className="login-container">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="name"
                placeholder="Votre Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                />
            </div>
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
            <button type = "submit">S'inscrire</button>
        </form>
        <p>
            Déja un compte ?{" "}
            <button onClick={goToLogin}
            style={{border: "none", background:"none", color: "blue", cursor: "pointer"}}>
                Connexion
            </button>
        </p>
        </div>
        </>
    );
}