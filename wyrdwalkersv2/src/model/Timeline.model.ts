import TimelineEvent from './TimelineEvent.model';

export default class Timeline {
    public _id: string;
    public name: string;
    public description: string;
    public firstEvent: TimelineEvent;
    public events: TimelineEvent[];

    constructor() {
        this._id = '';
        this.name = '';
        this.description = '';
        this.firstEvent = new TimelineEvent();
        this.events = new Array<TimelineEvent>();
    }
}