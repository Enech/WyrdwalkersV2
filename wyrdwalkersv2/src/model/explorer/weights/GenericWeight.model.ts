export default class GenericPoids {
    public key: string;
    public poids: number;
    public nameVF: string;
    public nameVO: string;

    constructor(_key: string, _vf: string, _vo: string){
        this.key = _key;
        this.poids = -100;
        this.nameVF = _vf;
        this.nameVO = _vo;
    }
}