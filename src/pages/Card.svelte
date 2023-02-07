<script lang="ts">
  import { gsap } from "gsap";
  import { Draggable } from "gsap/Draggable";

  import { onMount } from "svelte";

  let constainer: HTMLDivElement;
  let stage: HTMLDivElement;
  let deck: HTMLDivElement;
  let main: HTMLDivElement;
  let support: HTMLDivElement;
  let cards: HTMLDivElement[] = [null, null, null, null, null];

  onMount(() => {
    gsap.registerPlugin(Draggable);

    cards.forEach((card, index) => {
      Draggable.create(card, {
        type: "x,y",
        bounds: constainer,
        onRelease: function (e: PointerEvent) {
          const elem = this as Draggable;
          console.log(elem.x, elem.y);
          let hit = false;
          [main, support].concat(cards).forEach((pos) => {
            if (elem.hitTest(pos, "50%")) {
              elem.applyBounds(pos);
              hit = true;
            }
          });

          if (!hit) {
            // 위치 초기화
            gsap.to(elem.target, {
              duration: 0.5,
              x: 0,
              y: 0,
            });
          }
        },
      })[0];
    });
  });
</script>

<div bind:this={constainer} class="container">
  <div bind:this={stage} class="stage">
    <div bind:this={main}>main</div>
    <div bind:this={support}>support</div>
  </div>
  <div bind:this={deck} class="deck">
    {#each cards as card}
      <div bind:this={card} class="card">card</div>
    {/each}
  </div>
</div>

<style>
  .stage {
    display: flex;
    margin-bottom: 4px;
    gap: 4px;
    justify-content: center;
  }

  .stage > div {
    width: 150px;
    height: 250px;
    border: 1px solid black;
  }

  .deck {
    display: flex;
    gap: 4px;
    justify-content: center;
  }

  .card {
    width: 150px;
    height: 250px;
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
