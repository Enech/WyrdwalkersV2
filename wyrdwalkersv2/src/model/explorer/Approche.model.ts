import { SkillWeight } from './weights/SkillWeight.model';

export default class Approche {
    public _id: string;
    public nameVF: string;
    public nameVO: string;
    public logos: number;
    public kosmos: number;
    public eros: number;
    public skillsWeights: SkillWeight;

    constructor() {
        this._id = '';
        this.nameVF = '';
        this.nameVO = '';
        this.logos = -1;
        this.kosmos = -1;
        this.eros = -1;
        this.skillsWeights = new SkillWeight();
    }    
}