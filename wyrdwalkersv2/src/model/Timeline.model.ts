import TimelineEvent from './TimelineEvent.model';

export default class Timeline {
    public _id: string;
    public name: string;
    public description: string;
    public firstEvent: TimelineEvent;
    public events: TimelineEvent[];
    public availableTeams: string[];

    constructor() {
        this._id = '';
        this.name = '';
        this.description = '';
        this.firstEvent = new TimelineEvent();
        this.events = new Array<TimelineEvent>();
        this.availableTeams = [
            'Aesir',
            'Amatsukami',
            'Bureaucratie Céleste',
            'Deva',
            "K'Asunel",
            'Neter',
            'Nga Tama a Rangi',
            'Orisha',
            'Teotl',
            'Théoï',
            'Tuatha Dé Danann',
            'Aether',
            'Amaunet',
            'Kosmos',
            'Muspelheim',
            'Nyx',
            'Océanus',
            'Patala',
            'Sheol',
            'Terra',
            'Forêt Noire',
            'Mer de Jade',
            'Fairie',
            'Shambhala',
            'Utopia',
            'El Dorado',
            'Illuminati',
            'Cercle de merlin',
            'Cabale',
            'Ordre du Poing de Jade'
        ];
    }
}