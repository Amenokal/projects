<template>
  <div class="container">
    <h1>YEAR : {{game.year}}</h1>
    <br/>
    <ul>
      <li v-for="villager of game.pop" :key="villager.id">
        <p><strong>{{villager.name}}</strong></p>
        <p>Type: {{villager.type}}</p>
        <p>Age: {{villager.age}}</p>
      </li>
    </ul>
    <canvas id="cvs2" :height="CVS.y" :width="CVS.x" @click="colorize"></canvas>
  </div>
</template>

<script>

// import { ref } from 'vue';
import Game  from "../custom/village/Game";
import Voronoi  from "../custom/village/Voronoi";
import { CVS, TILES } from "../custom/village/Config";

export default {
  setup() {
    
    const voronoi = new Voronoi(TILES, CVS);
    const init = ()=>voronoi.init();
    const colorize = (e)=>voronoi.colorize(e);

    let game = new Game();


    function vilgInit(){
      game.village.populate();
    }
    console.log(game);

    function run(){
      game.tick();
    }

    return {
      CVS,
      game,
      vilgInit,
      init, colorize, run
    };
  },
  mounted() {
    this.init();
    this.vilgInit();
    this.run()
    this.run()
    this.run()
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#cvs2 {
  display: none;
  border: 1px solid black;
}
ul {
  display: flex;
  padding: 0;
}
li {
  list-style: none;
  margin: .5em;
}
</style>
