import TimelineEvent from './TimelineEvent.model';
import TimelineTeam from './TimelineTeam.model';

export default class Timeline {
    public _id: string;
    public name: string;
    public description: string;
    public descriptionVO: string;
    public firstEvent: TimelineEvent;
    public events: TimelineEvent[];
    public availableTeams: TimelineTeam[];

    constructor() {
        this._id = '';
        this.name = '';
        this.description = '';
        this.descriptionVO = '';
        this.firstEvent = new TimelineEvent();
        this.events = new Array<TimelineEvent>();
        this.availableTeams = [
            {
                faction: "dieux",
                team: "Aesir"
            },
            {
                faction: "titans",
                team: "Aether"
            },
            {
                faction: "dieux",
                team: "Amatsukami"
            },
            {
                faction: "titans",
                team: "Amaunet"
            },
            {
                faction: "dieux",
                team: "Bureaucratie Céleste"
            },
            {
                faction: "society",
                team: "Cabale"
            },
            {
                faction: "society",
                team: "Cercle de Merlin"
            },
            {
                faction: "dieux",
                team: "Deva"
            },
            {
                faction: "otherworld",
                team: "El Dorado"
            },
            {
                faction: "otherworld",
                team: "Fairie"
            },
            {
                faction: "otherworld",
                team: "Forêt Noire"
            },
            {
                faction: "society",
                team: "Illuminati"
            },
            {
                faction: "dieux",
                team: "K'Asunel"
            },
            {
                faction: "titans",
                team: "Kosmos"
            },
            {
                faction: "otherworld",
                team: "Mer de Jade"
            },
            {
                faction: "titans",
                team: "Muspelheim"
            },
            {
                faction: "dieux",
                team: "Neter"
            },
            {
                faction: "dieux",
                team: "Nga Tama a Rangi"
            },
            {
                faction: "titans",
                team: "Nyx"
            },
            {
                faction: "titans",
                team: "Océanus"
            },
            {
                faction: "society",
                team: "Ordre du Poing de Jade"
            },
            {
                faction: "dieux",
                team: "Orisha"
            },
            {
                faction: "titans",
                team: "Patala"
            },
            {
                faction: "otherworld",
                team: "Shambhala"
            },
            {
                faction: "titans",
                team: "Sheol"
            },
            {
                faction: "dieux",
                team: "Teotl"
            },
            {
                faction: "titans",
                team: "Terra"
            },
            {
                faction: "dieux",
                team: "Théoï"
            },
            {
                faction: "dieux",
                team: "Tuatha Dé Danann"
            },
            {
                faction: "otherworld",
                team: "Utopia"
            }
        ];
    }
}