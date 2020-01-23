export default class TimelineEvent{
    public month: string;
    public year: string;
    public content: string;
    public contentVO: string;
    public title: string;
    public titleVO: string;

    constructor(){
        this.month = '';
        this.year = '';
        this.content = '';
        this.contentVO = '';
        this.title = '';
        this.titleVO = '';
    }
}