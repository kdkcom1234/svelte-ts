<script lang="ts">
  import TodoItem from "./TodoItem.svelte";
  import type { ITodo } from "./types";

  let todos: ITodo[] = [];
  let newTodo: ITodo = { id: 0, memo: "", done: false };

  const handleAdd = () => {
    newTodo.id = todos[0] ? todos[0].id + 1 : 1;
    todos = [{ ...newTodo }, ...todos];
    newTodo.memo = "";
  };

  const handleRemove = (id: number) => {
    todos = todos.filter((todo) => todo.id !== id);
  };
</script>

<h3>Todo List</h3>
<div>
  <input bind:value={newTodo.memo} />
  <button on:click={handleAdd}>Add</button>
</div>
<ul>
  {#each todos as todo (todo["id"])}
    <TodoItem item={todo} onRemove={handleRemove} />
  {/each}
</ul>
