<<<<<<< HEAD
const API_URL = "http://taskman-backend-production.up.railway.app/api";
=======
const API_URL = "https://taskman.railway.app/api";
>>>>>>> ccbe7018be4bb214b62cfbe72e9c640f15e61318
let token = null;
export function setToken(t){
    token = t;
}
export async function login(email, password){
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        }, 
            body: JSON.stringify({email, password}),
        });

    if(!res.ok) throw new Error("Connection échoué");
    const data = await res.json();
    setToken(data.token);
    return data;
}
export async function register(email, password, password_confirmation){
    await fetch(`${API_URL}/register`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        }, 
            body: JSON.stringify({email, password, password_confirmation}),
        });
}
export async function getTasks(filterDone = null){
    let url = `${API_URL}/tasks`;
    if(filterDone !== null) url += `?accomplie=${filterDone}`;

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    if(!res.ok) throw new Error("Tâches inaccessibles");
    return res.json();
}

export async function updateTask(id, accomplie){
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`}, 
            body: JSON.stringify({accomplie}),
        });
    console.log(res);
}
export const createTask = async (titre, importance, description) =>{
    const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`}, 
            body: JSON.stringify({titre, importance, description}),
        });
    console.log(res);
}
export async function deleteTask(id){
    await fetch(`${API_URL}/tasks/${id}`, {
        method: "delete",
        headers:{
            Authorization: `Bearer ${token}`}, 
        });
}
export async function Logout(){
            await fetch(`${API_URL}/logout`, {
                method: "POST",
                headers:{
                    Authorization: `Bearer ${token}`},
                });
            localStorage.removeItem(token);
}
