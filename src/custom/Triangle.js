import { getColor } from '../custom/entropy/Config';

export default class Triangle {
    constructor(points){
        this.points = points;
        this.color = getColor();
    }
}