import { NAMES }  from './Config';

export default class Person {
    constructor(type){
        this.type = type
        this.name = this.getName()
        this.age = 0
    }

    getName(){
        const list = NAMES.filter((namelist) => namelist.type === this.type)[0];
        const name = list.names[Math.floor(Math.random()*list.names.length)];
        return name;
    }

    hasChild(){
        return this.age>15 && this.age<50;
    }

    giveBirth(){
        let baby = new Person(this.type);
        return baby;
    }

    willDie(){
        const random = Math.random();
        return (
            (this.age<=15 && random > 0.8) ||
            (this.age>15 && this.age<=40 && random > 0.98) ||
            (this.age>40 && this.age<=50 && random > 0.85) ||
            (this.age>50 && this.age<=60 && random > 0.55) ||
            (this.age>60 && random > 0.55)
        )
    }
}