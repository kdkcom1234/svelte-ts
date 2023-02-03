<script lang="ts">
  import type { ITodo } from "./types";

  // 속성으로 내보내기
  // 내부에서 상태로도 쓸 수 있다.
  export let item: ITodo;
  export let onRemove: (id: number) => void;
</script>

<li
  class:done={item.done}
  on:keyup={() => {}}
  on:click={(e) => {
    onRemove(item.id);
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
