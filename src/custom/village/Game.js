import { VILLAGERS } from './Config';
import Village from './Village';

export default class Game {
    constructor(){
        this.year = 0;
        this.village = new Village(VILLAGERS)
    }

    tick(){
        // YEAR
        console.log('tick', this);
        // this.year+=1;
        // this.village.pop.forEach((villager) => {
        //     villager.age += 1;
        // });
        // return this;
    }

}