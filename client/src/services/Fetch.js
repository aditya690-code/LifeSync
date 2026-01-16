import axios from "axios";

let baseUrl = 'http://localhost:8000';

const dashboardData = async () => {
    try {
        const response = await axios.post(`${baseUrl}/noteslength`);
        return response.data; 
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error; 
    }
};

export default dashboardData;




// const fetchEntries = async () => {
//   const res = await fetch(
//     `/api/diary?limit=${limit}&skip=${skip}`
//   );
//   const data = await res.json();

//   setEntries(prev => [...prev, ...data.entries]);
//   setHasMore(data.hasMore);
//   setSkip(prev => prev + limit);
// };


//     //get user token
//     const user = JSON.parse(localStorage.getItem("todoapp"));

//     //default auth header
//     axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`;

//     //CRETE TODO
// const createTodo = (data) => {
//     return axios.post("/todo/create", data);
// };
//     //GET ALL TODO
//     const getAllTodo = (id) => {
//     return axios.post(`/todo/getAll/${id}`);
//     };

//     //UPDATE TODO
//     const updateTodo = (id, data) => {
//     return axios.patch("/todo/update/" + id, data);
//     };

//     //DLEETE TODO
//     const deleteTodo = (id) => {
//     return axios.delete("/todo/delete/" + id);
//     };

//     const TodoServices = { createTodo, getAllTodo, updateTodo, deleteTodo };
//     export default TodoServices;
