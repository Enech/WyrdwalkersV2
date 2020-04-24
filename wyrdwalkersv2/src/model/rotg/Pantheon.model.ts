export default class Pantheon {
    public name: string;
    public nameVO: string;
    public leaderName: string;
    public description: string;
    public descriptionVO: string;
    public objective: number;
    public picture: string;

    constructor() {
        this.name = "";
        this.nameVO = "";
        this.leaderName = "";
        this.description = "";
        this.descriptionVO = "";
        this.objective = -1;
        this.picture = "";
    }
}