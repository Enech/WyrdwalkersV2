import GenericPoids from './GenericWeight.model';

export class SkillWeight {
    public athletics: GenericPoids;
    public rapport: GenericPoids;
    public engineering: GenericPoids;
    public combat: GenericPoids;
    public lore: GenericPoids;
    public notice: GenericPoids;
    public physique: GenericPoids;
    public presence: GenericPoids;
    public manipulation: GenericPoids;
    public resources: GenericPoids;
    public marksmanship: GenericPoids;
    public stealth: GenericPoids;
    public will: GenericPoids;

    constructor(){
        this.athletics = new GenericPoids("athletics","Athlétisme","Athletics");
        this.rapport = new GenericPoids("rapport","Rapport","Rapport");
        this.engineering = new GenericPoids("engineering","Ingénierie","Engineering");
        this.combat = new GenericPoids("combat","Combat","Combat");
        this.lore = new GenericPoids("lore","Savoir","Lore");
        this.notice = new GenericPoids("notice","Perception","Notice");
        this.physique = new GenericPoids("physique","Physique","Physique");
        this.presence = new GenericPoids("presence","Présence","Presence");
        this.manipulation = new GenericPoids("manipulation","Manipulation","Manipulation");
        this.marksmanship = new GenericPoids("marksmanship","Tir","Marksmanship");
        this.resources = new GenericPoids("resources","Ressources","Resources");
        this.stealth = new GenericPoids("stealth","Furtivité","Stealth");
        this.will = new GenericPoids("will","Volonté","Will");
    }
}