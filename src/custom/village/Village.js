import Person from './Person';

export default class Village {
    constructor(villagers){
        this.initPop = villagers;
    }

    populate(){
        let pop = [];
        this.initPop.forEach((villager) => {
            const v = new Person(villager.type);
            v.age = 15;
            pop.push(v)
        });
        this.pop = pop;
    }

}