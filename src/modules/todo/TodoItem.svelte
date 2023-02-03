<script lang="ts">
  import type { ITodo } from "./types";

  export let item: ITodo;
  export let onRemove = (id: number) => {};
</script>

<li
  class:done={item.done}
  on:keyup={() => {}}
  on:click={(e) => {
    onRemove(item["id"]);
  }}
>
  {item.id} : {item.memo}
</li>

<style>
  li {
    cursor: pointer;
  }
  .done {
    color: #888;
    text-decoration: line-through;
  }
</style>
