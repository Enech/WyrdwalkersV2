export default class AttackResult {
    public taken: boolean;
    public name: string;
    public nameVO: string;
    public nbPlayers: number;
    public infiltrated: boolean;

    constructor(){
        this.taken = false;
        this.name = '';
        this.nameVO = '';
        this.nbPlayers = 0;
        this.infiltrated = false;
    }
}