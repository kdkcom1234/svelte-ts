<script lang="ts">
  import { gsap } from "gsap";
  import { Draggable } from "gsap/Draggable";
  import { onMount } from "svelte";

  import { debounce, throttle } from "lodash";
  import { element } from "svelte/internal";

  let constainer: HTMLDivElement;
  let stage: HTMLDivElement;
  let deck: HTMLDivElement;
  let main: HTMLDivElement;
  let support: HTMLDivElement;
  let deckItems: HTMLDivElement[] = [null, null, null, null, null];
  let cards: HTMLDivElement[] = [null, null, null, null, null];

  onMount(() => {
    gsap.registerPlugin(Draggable);

    const tilt = throttle((x: number, y: number, elem: Draggable) => {
      // console.log("--tilt");

      // 위로: y이동은 - , x회전은+
      // 아래로: y이동은 +, x회전은 -
      // 오른쪽: x이동은 +, y회전은+
      // 왼쪽: x이동은-, y회전은-
      gsap.to(elem.target, {
        duration: 0.5,
        // delay: 0.5,
        rotateY: `${x}deg`,
        rotateX: `${-y}deg`,
        rotateZ: `${x / 3}deg`,
      });
    }, 10);

    let origin = { x: 0, y: 0 };
    let prev = { x: 0, y: 0 };

    cards.forEach((card, index) => {
      Draggable.create(card, {
        type: "x,y",
        bounds: constainer,
        onPress: function () {
          const elem = this as Draggable;
          // console.log("press", elem.x, elem.y);

          // stage 근처에 있으면 오리진 값 저장하지 않음
          let hit = false;
          [main, support].forEach((pos) => {
            if (elem.hitTest(pos, "50%")) {
              hit = true;
            }
          });

          if (!hit) {
            // 현재 위치 저장
            const rect = elem.target.getBoundingClientRect();
            origin = { x: rect.x, y: rect.y };
            // console.log("origin - ", x, y);
          }

          // 이전값 초기화
          prev = { x: elem.x, y: elem.y };

          gsap.to(elem.target, {
            duration: 0.3,
            scale: 1.15,
            translateZ: 600,
            // rotateY: 45,
            // rotateX: 45,
            // rotateZ: 45,
          });
        },
        onMove: function () {
          const elem = this as Draggable;

          // 현재 위치와 이전 위치의 offset
          const offsetX = elem.x - prev.x;
          const offsetY = elem.y - prev.y;
          // console.log(prev.x, prev.y);
          // console.log(elem.x, elem.y);
          // console.log("offset", "x:", offsetX, "y:", offsetY);

          // 현재 위치 저장
          const { x, y } = elem;
          prev = { x, y };

          // tilt
          tilt(offsetX, offsetY, elem);
        },

        onRelease: function (e: PointerEvent) {
          // console.log(origin);

          const elem = this as Draggable;

          let hit = false;
          [main, support].forEach((pos) => {
            if (elem.hitTest(pos, "50%")) {
              const stage = pos.getBoundingClientRect();
              console.log("hit elem: ", elem.x, elem.y);
              console.log("hit stage: ", stage.x, stage.y);

              // 위치 이동(스테이지와 원래 위치의 간극만큼 이동)
              gsap.to(elem.target, {
                duration: 0.5,
                x: stage.x - origin.x + 8,
                y: stage.y - origin.y + 8,
                rotate: 0,
                translateZ: 0,
                scale: 1,
              });

              hit = true;
              console.log("hit");
              // console.log(stage.x - origin.x + 8, stage.y - origin.y + 8);
            }
          });

          if (!hit) {
            // 위치 초기화(0, 0)
            gsap.to(elem.target, {
              duration: 0.5,
              x: 0,
              y: 0,
              rotate: 0,
              translateZ: 0,
              scale: 1,
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
        <div bind:this={cards[index]} class="card">
          <div class="card-side card-front" />
          {#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as edge}
            <div class="card-side card-edge" />
          {/each}
          <div class="card-side card-back" />
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .container {
    perspective: 500px;
  }

  .stage {
    display: flex;
    margin-bottom: 40px;
    gap: 8px;
    justify-content: center;
  }

  .stage > div {
    width: 378px;
    height: 538px;
    border: 1px solid black;
  }

  .deck {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
  }

  .deck-item {
    width: 378px;
    height: 538px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card {
    width: 362px;
    height: 522px;
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
    position: relative;
    transform-origin: center center;
  }

  .card-side {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 20px;
  }

  .card-front {
    background-image: url(/front.png);
    z-index: 1;
    transform: translateZ(10px);
  }
  .card-edge {
    background-color: goldenrod;
  }

  .card-back {
    background-image: url(/back.png);
    transform: rotateY(180deg);
  }
</style>
