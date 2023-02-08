<script lang="ts">
  import { gsap } from "gsap";
  import { Draggable } from "gsap/Draggable";

  import { onMount } from "svelte";

  let constainer: HTMLDivElement;
  let stage: HTMLDivElement;
  let deck: HTMLDivElement;
  let main: HTMLDivElement;
  let support: HTMLDivElement;
  let deckItems: HTMLDivElement[] = [null, null, null, null, null];
  let cards: HTMLDivElement[] = [null, null, null, null, null];

  onMount(() => {
    gsap.registerPlugin(Draggable);

    let origin = { x: 0, y: 0 };
    cards.forEach((card, index) => {
      Draggable.create(card, {
        type: "x,y",
        bounds: constainer,
        onPress: function () {
          const elem = this as Draggable;
          const { x, y } = elem.target.getBoundingClientRect();
          origin = { x, y };
          console.log("origin - ", x, y);
        },
        onRelease: function (e: PointerEvent) {
          const elem = this as Draggable;

          let hit = false;
          [main, support].forEach((pos) => {
            if (elem.hitTest(pos, "50%")) {
              const stage = pos.getBoundingClientRect();
              console.log("stage - ", stage.x, stage.y);
              console.log("moved - ", elem.x, elem.y);

              // 위치 이동
              gsap.to(elem.target, {
                duration: 0.5,
                x: stage.x - origin.x + 8,
                y: stage.y - origin.y + 8,
              });

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
    {#each deckItems as deckItem, index}
      <div bind:this={deckItem} class="deck-item">
        <div bind:this={cards[index]} class="card">card {index + 1}</div>
      </div>
    {/each}
  </div>
</div>

<style>
  .stage {
    display: flex;
    margin-bottom: 40px;
    gap: 8px;
    justify-content: center;
  }

  .stage > div {
    width: 150px;
    height: 250px;
    border: 1px solid black;
  }

  .deck {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
  }

  .deck-item {
    width: 150px;
    height: 250px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card {
    width: 134px;
    height: 234px;
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
