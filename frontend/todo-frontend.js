async function getAllTodo(){

    const response = await axios.get("http://localhost:9000/");
    const todos = response.data;

    const todoList = document.querySelector('#todo-list');

    if(todos.length === 0){
        todoList.innerHTML = '<div class="empty-state">No todos yet. Add one above!</div>';
        return;
    }

    let list = "";
    todos.forEach(todo => {
        //! what the fuck is list += ....
        list += 
        `
        <div class="todo-item">
            <span class="todo-text">${todo.title}</span>
            <button class="delete-btn" onclick="deleteTodo('${todo.id}')">Delete!</button>
        </div>
        `
    })

    todoList.innerHTML = list;
}

document.addEventListener('DOMContentLoaded', getAllTodo); // this is needed if script tag is above html body tag
// if this is not used then then js will be loaded before HTML is loaded on browser, and the code wont work
// this allows the brower to first run the //! HTML code and then JS code  

async function addTodo(){

    const input = document.querySelector('#todo-input');
    const title = input.value.trim();

    if(title.length === 0){
        alert("Please enter a todo!")
        return;
    }

    const id = parseInt(Date.now().toString() + (Math.random() * 1000)) // removes duplicacy in ID

    try{

        const response = await axios.post("http://localhost:9000/addTodo", {
            title,
            id
        });

        input.value = "";
        getAllTodo()
       
    } catch (error){
        console.log(`ERROR in addTodo: ${error}`);
    }
    return;

}

async function deleteTodo(id){

    try{
        const response = await axios.delete(`http://localhost:9000/deleteTodo/${id}`)
        getAllTodo();
    } catch(error){
        console.log(`ERROR in delete todo: ${error}`);        
    }
}
