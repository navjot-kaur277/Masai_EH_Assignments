let todos = [
    {id : 1, task:"Learn Express v5" , completed : false}
];

export const TodoModel = {
    getALl : () => todos,
    getById : (id) => todos.find(todo=>todo.id === parseInt(id)),

    create : (task) => {
        const newTodo = {id: Date.now(), task , completed:false};
        todos.push(newTodo);
        return newTodo;
    },

    delete : (id) => {
        const index = todos.findIndex(t=> t.id===parseInt(id));
        if (index === -1) return false;
        todos.splice(index,1);
        return true;
    }
};