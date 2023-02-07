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
        onPress: function () {
          // const target = this as Draggable;
          // if (!originPos[index]) {
          //   originPos[index] = { x: 0, y: 0 };
          // }
          // originPos[index].x = target.x;
          // originPos[index].y = target.y;
          // console.log(target.x + " " + target.y);
          // console.log(originPos[index]);
        },
        onRelease: function (e: PointerEvent) {
          console.log(e);

          const target = this as Draggable;
          gsap.to(target.target, {
            duration: 1,
            x: 0,
            y: 0,
          });
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
