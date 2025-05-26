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
    const isMobile = useIsMobile();
    const logoutText = isMobile ? <img src="icon/logout.png" alt="logout" width="30" title="Déconnexion"/> : 'Déconnexion';
    const AllText = isMobile ? <img src="icon/all.png" alt="all" width="30" title="Tout"/> : 'Tout';
    const AddText = isMobile ? <img src="icon/add.png" alt="add" width="30" title="Nouvelle tâche"/> : '+ Ajouter';
    const ImportantText = isMobile ? <img src="icon/important.png" alt="" width="30" title="Tâches importantes"/> : 'Tâches importantes';
    const DoneText = isMobile ? <img src='icon/check.png' alt="done" width="30" title="Executé"/> : 'Executé';
    const TictacText = isMobile ? <img src='icon/load.png' alt="" width="30" title="En attente"/> : 'En attente';
    useEffect(() => {
        loadTasks();
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
            await deleteTask(id);
            loadTasks();
        
    };
    const filteredTasks = tasks.filter((t) => {
        if (filter === "done") return t.accomplie;
        if (filter === "not_done") return !t.accomplie;
        if(filter === "importance") return t.importance === "haute";
        return true;
    });
    return(
        <>
            <header>
            <div className="navbar">
                <button onClick={() => setFilter("all")}> {AllText} </button>
                <button onClick={() => setFilter("not_done")}>{TictacText}</button>
                <button onClick={() => setFilter("done")}>{DoneText}</button>
                <button onClick={() => setFilter("importance")}>{ImportantText}</button>
                <button onClick={() => setShowModal(true)} className="addBtn">{AddText}</button>
                <button onClick={() => logout()}> {logoutText} </button>
            </div>
            </header>
            <div className="listetache">
        <ul style={{padding:0 }}>
            {filteredTasks.map((task) =>
            <li key={task.id}
            style={{ backgroundColor: task.accomplie ? "lightgreen" : importanceColor(task.importance),
            }}
            className="taskItem">
                <tr>
                    <td style={{width:"300px"}}><h3>{task.titre}</h3></td>
                    <td style={{width:"50px"}}><input
                        type="checkbox"
                        onChange={() =>toggle(task.id,task.accomplie)}
                        checked= {task.accomplie}
                        style={{marginRight: "5px", width: "30px", borderRadius: "50%" }}
                    /></td>
                </tr>
                <p>{task.description}</p>
                <button
                    onClick = {()=> handleDelete(task.id)}
                    className="deleteBtn"
                >Supprimer</button>
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
            <footer style={{
            background:'linear-gradient(135deg, #1e1e1e, #0f172a)',
            padding: '1rem',
            textAlign:'center',
            bottom:'0px',
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
            return "#fff3cd";
        case "basse":
            return "#bcdce6";
    }
}; 