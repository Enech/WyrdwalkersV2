import { SkillWeight } from './weights/SkillWeight.model';
import { LegendaryWeight } from './weights/LegendaryWeight.model';

export default class Personality {
    public _id: string;
    public nameVF: string;
    public name: string;
    public logos: number;
    public kosmos: number;
    public eros: number;
    public skillsWeights: SkillWeight;
    public legendaryWeights: LegendaryWeight;

    constructor() {
        this._id = '';
        this.nameVF = '';
        this.name = '';
        this.logos = -1;
        this.kosmos = -1;
        this.eros = -1;
        this.skillsWeights = new SkillWeight();
        this.legendaryWeights = new LegendaryWeight();
    } 
}