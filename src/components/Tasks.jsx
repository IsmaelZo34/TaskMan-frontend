import { useEffect, useState } from "react";
import { getTasks, updateTask, createTask, deleteTask, Logout } from "./api";
import '../style/tasks.css';
import useIsMobile from "../hook/mobilemode";
export default function Tasks(){
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState("");
    const [newTask, setNewTask]= useState("");
    const [importance, setImportance] = useState("moyenne");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const isMobile = useIsMobile();
    const All = isMobile ? <img src="icon/all.png" alt="logout" width="30" title="All"/> : 'TaskMan';
    const logoutText = isMobile ? <img src="icon/logout.png" alt="logout" width="30" title="Déconnexion"/> : 'Déconnexion';
    const AddText = isMobile ? <img src="icon/add.png" alt="add" width="30" title="Nouvelle tâche"/> : '+ Ajouter';
    const ImportantText = isMobile ? <img src="icon/important.png" alt="" width="30" title="Tâches importantes"/> : 'Importantes';
    const DoneText = isMobile ? <img src='icon/check.png' alt="done" width="30" title="Executé"/> : 'Executé';
    const TictacText = isMobile ? <img src='icon/load.png' alt="" width="30" title="En attente"/> : 'En attente';
    const theme = isDarkMode ? <img src='icon/icons8-soleil-emoji-48.png' alt="" width="30" title="Clair"/> : <img src='icon/icons8-lune-et-étoiles-48.png' alt="done" width="30" title="Sombre"/>;
    useEffect(() => {
        loadTasks();
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme === 'dark'){
            setIsDarkMode(true);
            document.body.classList.add('dark-mode');
        }
    }, []);
    const loadTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };
    const toggle = async (task , accomp) => {
        await updateTask(task, !accomp);
        loadTasks();
    };
    const logout = async () => {
        Logout();
        window.location.href = '/';         
    };
    const handleAdd = async () => {
        if(newTask.trim() === "") return;
        await createTask(newTask, importance, description);
        setNewTask("");
        setDescription("");
        setImportance("moyenne");
        setShowModal(false);
        loadTasks();
    };
    const handleDelete = async (id) => {
            if(window.confirm("supprimer cette tâche ?")){
                await deleteTask(id);
                loadTasks();
            }
        
    };
    const filteredTasks = tasks.filter((t) => {
        if (filter === "done") return t.accomplie;
        if (filter === "not_done") return !t.accomplie;
        if(filter === "importance") return t.importance === "haute";
        return true;
    });

    const toogleBtn = async () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        if(newMode){
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }else{
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme','light');
        }
    }
    return(
        <>
            <div className="navbar">
                <span className="logo" onClick={() => setFilter("all")}>{All}</span>
                <div className="filters">
                        <button onClick={() => setFilter("not_done")}>{TictacText}</button>
                        <button onClick={() => setFilter("importance")}>{ImportantText}</button>
                        <button onClick={() => setFilter("done")}>{DoneText}</button>
                </div>
                <div className="actions">
                    <button onClick={() => setShowModal(true)} className="add-btn">{AddText}</button>
                    <button onClick={() => toogleBtn()} className="theme-btn" id='toggle-btn'>{theme}</button>
                    <button onClick={() => logout()} className="logout-btn"> {logoutText} </button>
                </div>
            </div>
        <div className="listetache">
        <ul style={{padding:0 }}>
            {filteredTasks.map((task) =>
            <li key={task.id}
            style={task.accomplie ?{ backgroundColor:"lightgreen" } : isDarkMode ? {
                backgroundColor:'rgba(255, 255, 255, 0.05)',
                borderLeft:`10px solid`+importanceColor(task.importance),
                boxShadow:' 0 2px 6px'+importanceColor(task.importance)
            }
            : {borderLeft:`10px solid`+importanceColor(task.importance),
                boxShadow:' 0 2px 6px'+importanceColor(task.importance)
            }
            }
            className="taskItem">
                <div className="taskItem-header">
                    <h3>{task.titre}</h3>
                    <div className="taskItem-right">
                    <input
                        type="checkbox"
                        onChange={() =>toggle(task.id,task.accomplie)}
                        checked= {task.accomplie}
                        style={{marginRight: "5px", width: "30px", borderRadius: "50%" }}
                    />
                    <button
                        onClick = {()=> handleDelete(task.id)}
                        className="deleteBtn"
                    ><img src='icon/delete.png' alt="del" width="30" title="Del"/></button>
                    </div>
                </div>
                <p>{task.description}</p>
            </li>
            )}
        </ul>
        {showModal && (
            <div className="modalOverlay">
                <div className="modalContent">
                    <h3>Nouvelle tâche</h3>
                    <input type="text"
                    placeholder="Titre"
                    value = {newTask}
                    onChange={(e) =>setNewTask(e.target.value)}
                    />
                    <textarea
                    placeholder="Description"
                    value = {description}
                    onChange={(e) =>setDescription(e.target.value)}
                    />
                    <select value={importance}
                    onChange={(e)=> setImportance(e.target.value)}
                    >
                        <option value="basse">Peu attendre</option>
                        <option value="moyen">Moyenne</option>
                        <option value="haute">Préssez</option>
                    </select>
                    <div>
                        <button onClick={handleAdd} className="addBtn"> Créer</button>
                        <button onClick={() => setShowModal(false)} className="cancelBtn">Annuler</button>
                    </div>
                </div>
            </div>
            )}
            </div>
            <footer className="footer" style={{
            background:'linear-gradient(135deg, #1e1e1e, #0f172a)',
            padding: '1rem',
            textAlign:'center',
            bottom:'0px',
            height:'auto',
            color:'#fff',
            }}>
            <p>&copy; {new Date().getFullYear()} RAVOAJANAHARY Zo Lalaina Ismaël. Tout droit réservés.</p>
            </footer>
        </>
    );
}
const importanceColor = (importance) => {
    switch(importance) {
        case "haute":
            return "#f8c1c4";
        case "moyenne":
            return "#ffdd7a";
        case "basse":
            return "#bcdce6";
    }
}; 