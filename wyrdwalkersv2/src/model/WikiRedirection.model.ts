export default class WikiRedirection {
    public _id: string;
    public originVO: string;
    public originVF: string;
    public destinationVF: string;
    public destinationVO: string;

    constructor() {
        this._id = "";
        this.originVF = "";
        this.originVO = "";
        this.destinationVF = "";
        this.destinationVO = "";
    }
}