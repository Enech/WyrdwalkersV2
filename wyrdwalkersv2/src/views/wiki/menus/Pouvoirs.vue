<template>
  <div class="pa-3">
    <v-card class="pa-3" id="app-content-custom">
      <v-card-title class="headline">Domaines de magie généraux</v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="(item,index) in generals" :key="index">
          <v-expansion-panel-header expand-icon="mdi-menu-down">{{item.title}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-html="item.description"></div>
            <v-divider class="mt-3 mb-3"></v-divider>
            <template v-if="item.specs.length == 1">
              Exemples d'effets
              <ul class="drop-list">
                <li>{{item.specs[0].Effect1}}</li>
                <li>{{item.specs[0].Effect2}}</li>
              </ul>
              <v-divider class="mt-3 mb-3"></v-divider>Exemples de prouesses
              <ul class="drop-list">
                <li>
                  <u>Niveau 1:</u>&nbsp;
                  <span v-html="FormatStunt(item.specs[0].Stunt1)"></span>
                </li>
                <li>
                  <u>Niveau 2:</u>&nbsp;
                  <span v-html="FormatStunt(item.specs[0].Stunt2)"></span>
                </li>
              </ul>
            </template>
            <v-expansion-panels v-if="item.specs.length > 1" accordion>
              <v-expansion-panel v-for="(spec, indexSpec) in item.specs" :key="indexSpec">
                <v-expansion-panel-header expand-icon="mdi-menu-down">{{spec.Specialty}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div v-html="spec.SpecDescription"></div>
                  <v-divider class="mt-3 mb-3"></v-divider>Exemples d'effets
                  <ul class="drop-list">
                    <li>{{spec.Effect1}}</li>
                    <li>{{spec.Effect2}}</li>
                  </ul>
                  <v-divider class="mt-3 mb-3"></v-divider>Exemples de prouesses
                  <ul class="drop-list">
                    <li>
                      <u>Niveau 1:</u>&nbsp;
                      <span v-html="FormatStunt(spec.Stunt1)"></span>
                    </li>
                    <li>
                      <u>Niveau 2:</u>&nbsp;
                      <span v-html="FormatStunt(spec.Stunt2)"></span>
                    </li>
                  </ul>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <v-card class="mt-3 pa-3">
      <v-card-title class="headline">Domaines de magie éveillés</v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="(item,index) in enlights" :key="index">
          <v-expansion-panel-header expand-icon="mdi-menu-down">{{item.title}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            {{item.description}}
            <v-divider></v-divider>
            <template v-if="item.specs.length == 1">
              Exemples d'effets
              <ul class="drop-list">
                <li>{{item.specs[0].Effect1}}</li>
                <li>{{item.specs[0].Effect2}}</li>
              </ul>
              <v-divider></v-divider>Exemples de prouesses
              <ul class="drop-list">
                <li>
                  <u>Niveau 1:</u>&nbsp;
                  <span v-html="FormatStunt(item.specs[0].Stunt1)"></span>
                </li>
                <li>
                  <u>Niveau 2:</u>&nbsp;
                  <span v-html="FormatStunt(item.specs[0].Stunt2)"></span>
                </li>
              </ul>
            </template>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";

export default Vue.extend({
  name: "Abilities",
  created: function() {
    var processResult = this.ProcessPowers(this.powersList);
    Object.assign(this.generals, processResult.general);
    Object.assign(this.enlights, processResult.enlight);
  },
  methods: {
    ProcessPowers: function(sourceArray: any[]) {
      var domainsTab = [];
      var generalPowers = [];
      var enlightPowers = [];

      for (var i = 0; i < sourceArray.length; i++) {
        var power = sourceArray[i];

        if (power.EnlightenedAbility == true) {
          domainsTab.push(power.Domain);
          enlightPowers.push({
            title: power.Domain,
            description: power.DomainDescription,
            specs: [power]
          });
        } else {
          if (domainsTab.indexOf(power.Domain) > -1) {
            var domainObjectIndex = this.GetDomainObjectFromName(
              generalPowers,
              power.Domain
            );

            if (domainObjectIndex > -1) {
              generalPowers[domainObjectIndex].specs.push(power);
            }
          } else {
            domainsTab.push(power.Domain);
            generalPowers.push({
              title: power.Domain,
              description: power.DomainDescription,
              specs: [power]
            });
          }
        }
      }

      return {
        general: generalPowers,
        enlight: enlightPowers
      };
    },
    GetDomainObjectFromName: function(sourceArray: any[], name: string) {
      var result = -1;
      for (var i = 0; i < sourceArray.length; i++) {
        var item = sourceArray[i];

        if (item.title == name) {
          result = i;
        }
      }
      return result;
    },
    FormatStunt: function(stuntText: string) {
      var stuntTab = stuntText.split(":");
      var result = "<b>" + stuntTab[0] + "</b>&nbsp;:&nbsp;" + stuntTab[1];

      return result;
    }
  },
  data: () => ({
    generals: [],
    enlights: [],
    powersList: [
      {
        Domain: "Druidisme",
        Specialty: "Druidisme Vert",
        DomainDescription:
          "Le druidisme est l’art d’entrer en communication, voire en communion, avec les kamis de manière générale.",
        SpecDescription:
          "Permet de contacter les kamis de la nature et de leur demander d’effectuer des actions. Faire pousser des lianes, guérir un allié, etc.",
        Effect1: "Invoquez un Homme-Arbre pour vous aider au combat.",
        Effect2: "Ligotez un ennemi dans des racines.",
        Stunt1:
          "Ami des Arbres: Le Godborn peut parler au Kami de toutes les formes de vie de type plantes. Plus âgée est la forme de vie, plus son Kami sera intelligent et éduqué.",
        Stunt2:
          "Roi de la Forêt: Gagnez +1 à tous les Talents Sociaux lorsque vous êtes dans une région forestière.",
        EnlightenedAbility: false
      },
      {
        Domain: "Druidisme",
        Specialty: "Technodruidisme",
        DomainDescription:
          "Le druidisme est l’art d’entrer en communication, voire en communion, avec les kamis de manière générale.",
        SpecDescription:
          "Permet d’entrer en contact avec les kamis des objets liés à la technologie et leur demander d’effectuer des actions. Manipuler les courants électriques, pénétrer dans un système informatique, etc.",
        Effect1: "Manipulez les courants électriques.",
        Effect2: "Prenez le contrôle à distance d'un système informatique.",
        Stunt1:
          'Pigeon Mécanique: Pour un Point de Destin, vous gagnez l\'aspect "Pigeon Mécanique" pour une Scène.',
        Stunt2: "Bio-Implants: Gagnez +1 de Physique une fois par Scène",
        EnlightenedAbility: false
      },
      {
        Domain: "Druidisme",
        Specialty: "Thériantropie",
        DomainDescription:
          "Le druidisme est l’art d’entrer en communication, voire en communion, avec les kamis de manière générale.",
        SpecDescription:
          "Choisissez un animal quand vous choisissez cette capacité légendaire. Permet de fusionner temporairement son corps avec le kami d’un animal en particulier.",
        Effect1:
          "Faites-vous pousser des griffes de tigre pour frapper un adversaire.",
        Effect2:
          "Faites appel à l'astuce du rat pour échapper à vos poursuivants.",
        Stunt1:
          "Peau de Caméléon: Vous pouvez relancer vos jets de Furtivité lorsqu'il vous vous déplacez très lentement",
        Stunt2:
          "Le Charisme du Lion: Vous gagnez +1 en Présence lorsque vous vous comportez en leader.",
        EnlightenedAbility: false
      },
      {
        Domain: "Druidisme",
        Specialty: "Mythcalling",
        DomainDescription:
          "Le druidisme est l’art d’entrer en communication, voire en communion, avec les kamis de manière générale.",
        SpecDescription:
          "Choisissez une race de Mythborn ou une espèce animale que vous pourrez invoquer depuis le Wyrd. Ce pouvoir est susceptible d’échouer (à la discrétion du MJ) si l’environnement se prête particulièrement peu à l’espère choisie.",
        Effect1: "Invoquez un essaim d'abeilles.",
        Effect2: "Donnez plus de puissance à votre animal de compagnie.",
        Stunt1:
          'Garde du corps Elfe: Vous possédez l\'Aspect "Compagnon Elfe".',
        Stunt2:
          "Ami des Feys: Vous avez +2 en Rapport avec les Mythborns de Fairie.",
        EnlightenedAbility: false
      },
      {
        Domain: "Druidisme",
        Specialty: "Augure",
        DomainDescription:
          "Le druidisme est l’art d’entrer en communication, voire en communion, avec les kamis de manière générale.",
        SpecDescription:
          "Permet de lire l’avenir, le présent ou le passé en percevant les mouvements de la nature (un vol d’oiseau, le bruissement du vent dans les arbres, etc.)",
        Effect1:
          "Prévoyez le futur en analysant la trajectoire de vol des oiseaux.",
        Effect2: "Identifiez l'histoire d'une forêt.",
        Stunt1:
          "Hedwige: Vous possédez un oiseau de compagnie vous connectant à la Nature. Vous pouvez ignorer un de vos dés lors d’un jet de Savoir lié à la Nature",
        Stunt2:
          "Une Tempête Approche: Vous avez +1 en Perception pour voir un danger physique arriver.",
        EnlightenedAbility: false
      },
      {
        Domain: "Druidisme",
        Specialty: "Sorcellerie Fey - Eté",
        DomainDescription:
          "Le druidisme est l’art d’entrer en communication, voire en communion, avec les kamis de manière générale.",
        SpecDescription:
          "Permet de contrôler le pouvoir de l’été (le soleil, la chaleur, les émotions joyeuses, etc.)",
        Effect1: "Invoquez un rayon de chaleur brûlant",
        Effect2: "Une aura de joie émane de vous",
        Stunt1:
          'Faveur de Titania: Une fois par session, créez l\'Aspect "Chaleur Oppressante" pour une Scène.',
        Stunt2:
          "Summer Sunshine: Vous rayonnez comme l’été. Vous pouvez relancer les dés de votre choix une fois lorsque vous cherchez à détruire un aspect lié au froid ou une émotion “négative” comme la tristesse",
        EnlightenedAbility: false
      },
      {
        Domain: "Druidisme",
        Specialty: "Sorcellerie Fey - Hiver",
        DomainDescription:
          "Le druidisme est l’art d’entrer en communication, voire en communion, avec les kamis de manière générale.",
        SpecDescription:
          "Permet de contrôler le pouvoir de l’hiver (le blizzard, les émotions sombres, etc.)",
        Effect1: "Vous accentuez les émotions de désespoir ou de tristesse",
        Effect2: "Vous pouvez créer un aspect “Brouillard Epais”",
        Stunt1:
          "Fey de la Cour de l'Hiver: Vous êtes immunisé au froid non légendaire.",
        Stunt2:
          "Pas de l’hiver : Vous pouvez marchez sur l’eau ou la lave, qui gèle sous vos pied. Vous pouvez patinez au lieu de courir, gagnant +1 à votre athlétisme pour déterminer votre vitesse.",
        EnlightenedAbility: false
      },
      {
        Domain: "Hématurgie",
        Specialty: "Itztli",
        DomainDescription:
          "Les pouvoirs de l’Hématurgie permettent d’extraire la Légende contenue dans le sang d’un sacrifice humain ou animal. Bien que source de Légende, un sacrifice animal sera moins puissant qu’un sacrifice humain sauf s’il s’agit d’un animal mythique type dragon ou licorne.",
        SpecDescription:
          "Permet d’extraire la Légende provenant du sacrifice d’un autre être que soi. C’est la forme la plus agressive d’Hématurgie.",
        Effect1: "Désacralisez un lieu sacré.",
        Effect2: "Vous pouvez créer un aspect “Gorgé d’Ichor”",
        Stunt1:
          "Offrande de Sang: Si vous sacrifiez quelqu'un capable de saigner, vous gagnez un Point de Destin (Une fois par Scène maximum).",
        Stunt2:
          "Pluie de sang : Tuer une cible ayant du sang ou de l’ichor créer l’aspect “Brouillard cramoisi” avec une invocation gratuite autour de vous jusqu’au début du prochain tour.",
        EnlightenedAbility: false
      },
      {
        Domain: "Hématurgie",
        Specialty: "Yahuar",
        DomainDescription:
          "Les pouvoirs de l’Hématurgie permettent d’extraire la Légende contenue dans le sang d’un sacrifice humain ou animal. Bien que source de Légende, un sacrifice animal sera moins puissant qu’un sacrifice humain sauf s’il s’agit d’un animal mythique type dragon ou licorne.",
        SpecDescription:
          "Permet d’extraire la Légende provenant d’un sacrifice de sang personnel. Cette forme d’Hématurgie n’est pas agressive mais produit des résultats plus puissants que l’Itztli.",
        Effect1: "Stabiliser les blessures d’un allié",
        Effect2: "Invoquez un bouclier d'os pour protéger vos alliés",
        Stunt1:
          "Sacrifice Personnel: Lorsqu'un allié subit une Conséquence Physique, vous pouvez dépenser un Point de Destin pour subir une Conséquence Physique de même intensité ou un niveau plus bas à sa place.",
        Stunt2:
          "Le Pouvoir du Sang: Vous pouvez subir une Conséquence Physique à la place du coût d'un Point de Destin",
        EnlightenedAbility: false
      },
      {
        Domain: "Hématurgie",
        Specialty: "Riastrad",
        DomainDescription:
          "Les pouvoirs de l’Hématurgie permettent d’extraire la Légende contenue dans le sang d’un sacrifice humain ou animal. Bien que source de Légende, un sacrifice animal sera moins puissant qu’un sacrifice humain sauf s’il s’agit d’un animal mythique type dragon ou licorne.",
        SpecDescription:
          "Permet de modifier en profondeur la chair et les os d’un corps (prendre une apparence difforme, projeter des os depuis ses membres, déformer un membre, etc.). Si la cible n’est pas le lanceur, cette capacité ne peut être utilisée que par contact physique.",
        Effect1: "Faites-vous pousser des ailes.",
        Effect2: "Faites repousser votre bras.",
        Stunt1:
          "Manipulation du visage : Vous pouvez prendre une demie-heure pour changer la forme de vos traits faciaux, incluant la couleur de vos cheveux et leur longueur, vous donnant ainsi +2 en Furtivité lorsque quelqu'un essaie de vous reconnaître.",
        Stunt2:
          "Doigts Pistolets : Vous pouvez faire mine de faire un pistolet avec vos doigts, vous infligez 1 dégât physique et attaque avec Tir à +3 tandis qu’une phalange de votre index part à grande vitesse.",
        EnlightenedAbility: false
      },
      {
        Domain: "Hématurgie",
        Specialty: "Haruspices",
        DomainDescription:
          "Les pouvoirs de l’Hématurgie permettent d’extraire la Légende contenue dans le sang d’un sacrifice humain ou animal. Bien que source de Légende, un sacrifice animal sera moins puissant qu’un sacrifice humain sauf s’il s’agit d’un animal mythique type dragon ou licorne.",
        SpecDescription:
          "Permet de lire l’avenir, le présent ou le passé en examinant les entrailles d’un animal (ou d’un humain).",
        Effect1: "Voyez le futur à travers les entrailles d'un animal.",
        Effect2:
          "Analysez une tâche de sang pour découvrir la cause de la mort",
        Stunt1:
          "Fifi a Disparu !: Vous êtes toujours en mesure de trouver un petit animal à sacrifier pour utiliser Haruspices",
        Stunt2:
          "Du Sang dans les Yeux: Vous pouvez sentir le sang dans vos ennemis. Vous pouvez utiliser Haruspices pour vos jets d'initiative.",
        EnlightenedAbility: false
      },
      {
        Domain: "Vision du Wyrd",
        Specialty: "Mystère",
        DomainDescription:
          "La Vision du Wyrd est la magie des voyants et des médiums. Elle permet de plonger son regard dans la Toile du Destin pour y examiner ce qui est, ce qui a été et ce qui sera. Contrairement aux Augures et aux Haruspices qui lisent ces informations par l’intermédiaire de l’expression de la Toile du Destin sur le Monde, la Vision du Wyrd permet d’observer directement ces informations dans le Wyrd. Les informations récoltées sont bien souvent plus précises mais viennent au prix de liens du Destin plus grands.",
        SpecDescription:
          "Permet de scruter le Wyrd pour chercher des informations présentes ou passées.",
        Effect1: "Détectez les Liens du Destin entre deux individus.",
        Effect2:
          "Vous avez une brève vision d’une scène du passé de l’endroit où vous vous trouvez",
        Stunt1:
          "Détecteur de Lignes Ley: Vous pouvez détecter les lignes ley et les nexus de Légende avec un jet de Savoir.",
        Stunt2:
          "Détecteur de Nature: Vous pouvez détecter si un individu est un Titanspawn, un Godborn ou un Mythborn avec un jet de Savoir.",
        EnlightenedAbility: false
      },
      {
        Domain: "Vision du Wyrd",
        Specialty: "Prophétie",
        DomainDescription:
          "La Vision du Wyrd est la magie des voyants et des médiums. Elle permet de plonger son regard dans la Toile du Destin pour y examiner ce qui est, ce qui a été et ce qui sera. Contrairement aux Augures et aux Haruspices qui lisent ces informations par l’intermédiaire de l’expression de la Toile du Destin sur le Monde, la Vision du Wyrd permet d’observer directement ces informations dans le Wyrd. Les informations récoltées sont bien souvent plus précises mais viennent au prix de liens du Destin plus grands.",
        SpecDescription:
          "Permet de scruter le Wyrd pour chercher des informations futures.",
        Effect1: "Sentez venir une attaque ou une embuscade.",
        Effect2: "Vous avez une entrevue de votre futur proche",
        Stunt1:
          "Brouilleur Mystique : Les tentatives d’autrui pour voir votre avenir sont faites à -2.",
        Stunt2:
          "Une fois par campagne, pour un Point de Destin, posez une question au MJ. Le MJ ne peut pas mentir ni refuser de répondre.",
        EnlightenedAbility: false
      },
      {
        Domain: "Taiyi",
        Specialty: "Nature",
        DomainDescription:
          "Le Taiyi est une forme agressive de Vision du Wyrd où le voyant ne se contente pas d’observer la Toile du Destin mais essaie activement d’en changer les liens. Cette magie est d’une grande efficacité mais le prix à payer est proportionnel à l’intervention du voyant sur le Destin, car ce dernier obtient toujours ce qu’il cherche d’une manière ou d’une autre.",
        SpecDescription:
          "Cette forme du Taiyi permet au lanceur de changer la nature d’un lien du Destin et par là-même la nature des choses. Un mur de béton peut devenir du carton et les plus grands rituels de Taiyi - Nature peuvent transformer une nymphe en simple humaine.",
        Effect1:
          "Soumettez un mythborn à votre volonté, changez la nature d'un Titanspawn en un autre Titanspawn, un Godborn ou un Mythborn.",
        Effect2: "Vous pouvez détruire et recréer un aspect non figé",
        Stunt1:
          "Modeler le destin : Vous pouvez, sans invoquer d’aspect, utiliser un point de Destin pour relancer un jet légendaire une fois par session",
        Stunt2:
          "Briser la mort : Vous avez +2 au jet de défense contre toutes les utilisations de Invocation-Mort et Magie des Âmes",
        EnlightenedAbility: false
      },
      {
        Domain: "Taiyi",
        Specialty: "Flot",
        DomainDescription:
          "Le Taiyi est une forme agressive de Vision du Wyrd où le voyant ne se contente pas d’observer la Toile du Destin mais essaie activement d’en changer les liens. Cette magie est d’une grande efficacité mais le prix à payer est proportionnel à l’intervention du voyant sur le Destin, car ce dernier obtient toujours ce qu’il cherche d’une manière ou d’une autre.",
        SpecDescription:
          "Cette forme du Taiyi permet au lanceur de rediriger les liens du Destin à sa guise. Moins agressive que le Taiyi - Nature, la redirection des flots permet de changer les cibles des sorts ou bien d’éviter tout simplement d’être pris dans un évènement.",
        Effect1: "Vous pouvez diriger une âme vers un autre Enfer",
        Effect2: "Vous pouvez dévier une attaque légendaire",
        Stunt1:
          "Yin et Yang: Lorsque vous êtes la cible d'une Capacité Légendaire d'un autre, vous gagnez +1 à votre prochaine utilisation d'une Capacité Légendaire.",
        Stunt2:
          "Retour à l’envoyeur : vous pouvez faire qu’un jet de défense Réussi avec Taiyi Flot inflige des dégâts comme une attaque",
        EnlightenedAbility: false
      },
      {
        Domain: "Physiologie Epique",
        Specialty: "Force",
        DomainDescription:
          "La Physiologie Epique est une magie personnelle, c’est-à-dire qu’elle ne peut pas servir à améliorer les caractéristiques d’une autre personne. Cette magie permet de puiser dans la Légende pour décupler les capacités de son propre corps.",
        SpecDescription: "Permet de faire usage d’une force herculéenne.",
        Effect1: "Soulevez une voiture",
        Effect2: "Frapper à travers l'acier.",
        Stunt1:
          "Casseur : +1 aux jets d’attaques physiques contre les objets inanimés",
        Stunt2:
          "Brute épaisse : Vous pouvez utiliser Physique pour attaque au corps-à-corps",
        EnlightenedAbility: false
      },
      {
        Domain: "Physiologie Epique",
        Specialty: "Constitution",
        DomainDescription:
          "La Physiologie Epique est une magie personnelle, c’est-à-dire qu’elle ne peut pas servir à améliorer les caractéristiques d’une autre personne. Cette magie permet de puiser dans la Légende pour décupler les capacités de son propre corps.",
        SpecDescription:
          "Permet de faire preuve d’une endurance presque invincible pouvant venir à bout des coups les plus puissants ou des poisons les plus efficaces.",
        Effect1: "Encaissez un coup.",
        Effect2: "Courez pendant des heures sans vous arrêter.",
        Stunt1:
          "Poumons d'Acier: Après vous être préparé pour une action et dépensé un Point de Destin, vous n'avez plus besoin de respirer pour les 5 prochaines minutes.",
        Stunt2:
          "Eponge à Balles: Vous gagnez un emplacement de Conséquence Physique Légère supplémentaire.",
        EnlightenedAbility: false
      },
      {
        Domain: "Physiologie Epique",
        Specialty: "Vitesse",
        DomainDescription:
          "La Physiologie Epique est une magie personnelle, c’est-à-dire qu’elle ne peut pas servir à améliorer les caractéristiques d’une autre personne. Cette magie permet de puiser dans la Légende pour décupler les capacités de son propre corps.",
        SpecDescription: "Permet de se déplacer à une vitesse surnaturelle.",
        Effect1: "Vous pouvez créer un aspect “Vibration désorientante”",
        Effect2: "Vous courez et frappez vite !",
        Stunt1:
          "Réflexes Eclairs: Vous avez un bonus de +2 pour vos jets d'initiative ou de défense contre une attaque surprise.",
        Stunt2:
          "Double attaque : Lorsque vous faites +4 à votre jet normal sur une attaque, vous pouvez relancer une attaque identique sur la même cible",
        EnlightenedAbility: false
      },
      {
        Domain: "Physiologie Epique",
        Specialty: "Beauté",
        DomainDescription:
          "La Physiologie Epique est une magie personnelle, c’est-à-dire qu’elle ne peut pas servir à améliorer les caractéristiques d’une autre personne. Cette magie permet de puiser dans la Légende pour décupler les capacités de son propre corps.",
        SpecDescription:
          "Permet de revêtir une apparence littéralement envoûtante de beauté.",
        Effect1:
          "Vous pouvez dissimuler vos blessures, votre saleté, votre fatigue",
        Effect2: "Vous pouvez créer un aspect “Sourire ravageur”",
        Stunt1:
          "Beauté Fey: Gagnez +1 en Présence lorsqu'une belle apparence est déterminante.",
        Stunt2:
          "La Bonne Première Impression : +1 à vos jets de rapport lors d’une première rencontre",
        EnlightenedAbility: false
      },
      {
        Domain: "Physiologie Epique",
        Specialty: "Laideur",
        DomainDescription:
          "La Physiologie Epique est une magie personnelle, c’est-à-dire qu’elle ne peut pas servir à améliorer les caractéristiques d’une autre personne. Cette magie permet de puiser dans la Légende pour décupler les capacités de son propre corps.",
        SpecDescription:
          "Permet de revêtir une apparence absolument hideuse faisant fuir les personnes proches ou provoquant un atroce dégoût.",
        Effect1: "Rendez quelqu'un fou de terreur avec votre laideur.",
        Effect2: "Vous pouvez créer un aspect “Sourire horrifiant”",
        Stunt1:
          "Mâchoire des Enfers: Votre bouche et votre menton ont la forme d'une mâchoire terrifiante. Tout jet de Présence avec cette mâchoire révélée vous donne un bonus de +1 mais vous donne aussi l'Aspect \"Mâchoire des Enfers\".",
        Stunt2: "Présence Inconfortable : +1 à vos jets contre la Manipulation",
        EnlightenedAbility: false
      },
      {
        Domain: "Physiologie Epique",
        Specialty: "Présence",
        DomainDescription:
          "La Physiologie Epique est une magie personnelle, c’est-à-dire qu’elle ne peut pas servir à améliorer les caractéristiques d’une autre personne. Cette magie permet de puiser dans la Légende pour décupler les capacités de son propre corps.",
        SpecDescription:
          "Permet de faire preuve d’un charisme pur et surnaturel",
        Effect1: "Donnez des discours vibrants",
        Effect2: "Vous donnez des ordres comme un général expérimenté",
        Stunt1:
          "Grand Orateur: Lorsque vous vous adressez à un groupe, vous gagnez +1 à vos jets.",
        Stunt2:
          "Musicien de génie : +2 à vos jets normaux d’ingénierie et de présence lorsque vous pouvez utiliser un type d’instrument",
        EnlightenedAbility: false
      },
      {
        Domain: "Physiologie Epique",
        Specialty: "Ouïe",
        DomainDescription:
          "La Physiologie Epique est une magie personnelle, c’est-à-dire qu’elle ne peut pas servir à améliorer les caractéristiques d’une autre personne. Cette magie permet de puiser dans la Légende pour décupler les capacités de son propre corps.",
        SpecDescription:
          "Permet d’entendre des sons inaudibles au commun des mortels",
        Effect1: "Vous pouvez créer un aspect “Combat à l’Ouïe”",
        Effect2: "Vous entendez loin et distinctement",
        Stunt1:
          "Ouïe Elfique: Gagnez +1 à vos jets de Perception en utilisant votre ouïe.",
        Stunt2:
          "Murmures persistants: Vous pouvez repérer une voix que vous avez déjà entendu à 10km si le son peut voyager jusqu’à vous.",
        EnlightenedAbility: false
      },
      {
        Domain: "Physiologie Epique",
        Specialty: "Toucher",
        DomainDescription:
          "La Physiologie Epique est une magie personnelle, c’est-à-dire qu’elle ne peut pas servir à améliorer les caractéristiques d’une autre personne. Cette magie permet de puiser dans la Légende pour décupler les capacités de son propre corps.",
        SpecDescription: "Permet d’obtenir une sensibilité accrue au toucher",
        Effect1: "Vous pouvez créer un aspect “Ne ressens pas la douleur”",
        Effect2:
          "Vous repérer les traces de chaleur laissées pas un corps sur le sol",
        Stunt1:
          "Frisson instinctif : Vous avez +1 à vos jets de rapport pour savoir si quelqu’un est hostile ou non envers vous.",
        Stunt2:
          "Doigts de fée : +2 aux jets de Furtivité pour subtiliser un objet sur quelqu’un",
        EnlightenedAbility: false
      },
      {
        Domain: "Physiologie Epique",
        Specialty: "Odorat",
        DomainDescription:
          "La Physiologie Epique est une magie personnelle, c’est-à-dire qu’elle ne peut pas servir à améliorer les caractéristiques d’une autre personne. Cette magie permet de puiser dans la Légende pour décupler les capacités de son propre corps.",
        SpecDescription:
          "Permet de sentir des odeurs indétectables par les humains ordinaires",
        Effect1: "Obtenez l'odorat d'un fin limier",
        Effect2: "Vous pouvez créer un aspect “Trace olfactive”",
        Stunt1: "Sentir la peur : Vous savez toujours si quelqu’un a peur",
        Stunt2:
          "Traqueur : Vous reconnaissez et situez le parfum de quelqu’un si vous l’avez déjà rencontré s’il est à moins d’1km autour de vous et que son odeur peut parvenir jusqu’à vous.",
        EnlightenedAbility: false
      },
      {
        Domain: "Physiologie Epique",
        Specialty: "Goût",
        DomainDescription:
          "La Physiologie Epique est une magie personnelle, c’est-à-dire qu’elle ne peut pas servir à améliorer les caractéristiques d’une autre personne. Cette magie permet de puiser dans la Légende pour décupler les capacités de son propre corps.",
        SpecDescription: "Permet de détecter des saveurs même dans les airs",
        Effect1: "Vous pouvez créer un aspect “Langue détectrice de poison”",
        Effect2: "Vous pouvez reconnaître des arômes très diffus",
        Stunt1:
          "Buveur de sang : Vous pouvez, en goûtant le sang de quelqu’un, savoir ce qu’il a mangé et consommé dans les dernières 24h",
        Stunt2:
          "Saveur passée : En mangeant un aliment, une fois par session, vous pouvez avoir une vision de sa provenance et de son histoire jusqu’à votre palais.",
        EnlightenedAbility: false
      },
      {
        Domain: "Physiologie Epique",
        Specialty: "Vue",
        DomainDescription:
          "La Physiologie Epique est une magie personnelle, c’est-à-dire qu’elle ne peut pas servir à améliorer les caractéristiques d’une autre personne. Cette magie permet de puiser dans la Légende pour décupler les capacités de son propre corps.",
        SpecDescription:
          "Permet de discerner des détails visuels invisibles aux humains normaux.",
        Effect1: "Voyez les ennemis venir dans le noir total.",
        Effect2: "Vous pouvez créer un aspect “Vision Infrarouge”",
        Stunt1:
          "Oeil d'Aigle: Gagnez +1 à vos jets de Perception en utilisant votre vue.",
        Stunt2:
          "Elémentaire mon cher Watson: Vous avez un bonus de +2 à vos jets sociaux lorsque vous essayez de percevoir les émotions ou les intentions de quelqu’un.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Feu",
        Specialty: "Destruction",
        DomainDescription:
          "Les invocations du Feu permettent de puiser et de créer de la Légende liée au concept du Feu et de la Chaleur en général. Le lanceur se liera dans une certaine mesure à un Titan de Muspelheim, le Royaume Titanique du Feu, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet au lanceur d’invoquer toutes sortes de construction de flammes destructrices, commes des boules de feu, des murs de feu, des flèches de feu, etc.<br>Le Titan associé à ce concept est Surtr.",
        Effect1:
          "Invoquez des murs de feu, des boules de feu et toutes sortes d'énergies violentes et destructrices.",
        Effect2: "Vous pouvez créer un aspect “Couronne de flamme”",
        Stunt1:
          "Pyromanie: Vous avez un bonus de +2 pour utiliser Invocation : Feu - Destruction sur de la matière non-vivante.",
        Stunt2:
          "Oblitération : Lorsque vous tuez une cible avec Invocation : Feu - Destruction, vous pouvez réduire le corps de cible en cendres",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Feu",
        Specialty: "Discorde",
        DomainDescription:
          "Les invocations du Feu permettent de puiser et de créer de la Légende liée au concept du Feu et de la Chaleur en général. Le lanceur se liera dans une certaine mesure à un Titan de Muspelheim, le Royaume Titanique du Feu, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet au lanceur de disperser les étincelles de la discorde dans un groupe, afin d’attiser les passions et embraser les conflits.<br>Le Titan associé à ce concept est Eris.",
        Effect1: "Vous pouvez créer un aspect “Jalousie brûlante”",
        Effect2: "Vous faites doutez une cible de ses plus vieilles alliances",
        Stunt1:
          "Chaos comme seconde nature : Vous avez +1 à vos jets de Manipulation lorsque vous cherchez à créer de la discorde ou du chaos sans gain identifiable pour vous",
        Stunt2:
          "A la plus belle : +2 à vos jets sociaux lorsqu’il s’agit de mettre d’autres personnes en compétition autour d’un même objectif, une fois par session",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Feu",
        Specialty: "Invention",
        DomainDescription:
          "Les invocations du Feu permettent de puiser et de créer de la Légende liée au concept du Feu et de la Chaleur en général. Le lanceur se liera dans une certaine mesure à un Titan de Muspelheim, le Royaume Titanique du Feu, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet au lanceur de faire preuve d’une imagination bouillonnante et créatrice, usant du feu de la forge pour créer toutes sortes d’objets.<br>Le Titan associé à ce concept est Prométhée.",
        Effect1: "Vous comprenez comment un mécanisme, un procédé fonctionne",
        Effect2: "Créez des golems géants, invoquez une voiture.",
        Stunt1:
          "Forgeron des dieux : +2 à vos jet d’ingénierie lorsque vous fabriquez un objet manuellement",
        Stunt2:
          "Génie de la nouveauté : Vous avez +1 pour créer des Aspects radicalement originaux et que vous n’avez jamais créé auparavant.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Feu",
        Specialty: "Magma",
        DomainDescription:
          "Les invocations du Feu permettent de puiser et de créer de la Légende liée au concept du Feu et de la Chaleur en général. Le lanceur se liera dans une certaine mesure à un Titan de Muspelheim, le Royaume Titanique du Feu, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet au lanceur de puiser dans la puissance des volcans, que ce soit leur feu destructeur ou bien leurs richesses minérales et fertiles.<br>Le Titan associé à ce concept est Kagutsuchi.",
        Effect1:
          "Créez et contrôlez les flots de magma, faites entrer les volcans en éruption.",
        Effect2: "Vous pouvez créer un aspect “Sol bouillonnant”",
        Stunt1:
          "Puissance Tellurique: Lorsque vos pieds (et/ou chaussures) sont en contact direct avec un sol naturel ou des rochers, vous avez +1 en Volonté et en Physique.",
        Stunt2:
          "Richesse du sol : Un jet de Feu-Magma à +4 aux dés ou plus produit l’aspect “Joyaux anciens” avec une utilisation pouvant améliorer votre compétence de Ressource.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Feu",
        Specialty: "Sécheresse",
        DomainDescription:
          "Les invocations du Feu permettent de puiser et de créer de la Légende liée au concept du Feu et de la Chaleur en général. Le lanceur se liera dans une certaine mesure à un Titan de Muspelheim, le Royaume Titanique du Feu, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet au lanceur de puiser dans la chaleur la plus sèche et la plus dépourvue de vie pour semer le chaos et la destruction.<br>Le Titan associé à ce concept est Vrtra.",
        Effect1:
          "Faites évaporer l'eau et le sang, transformer vos ennemis en cendres.",
        Effect2: "Vous pouvez créer un aspect “Desséché”",
        Stunt1:
          "La force de la Soif : Si vous avez sur vous un aspect lié à la Soif (comme une conséquence physique), vos utilisations de Feu-Sécheresse ont +1",
        Stunt2:
          "Craquelure : Vos attaques de Feu-Sécheresse coche une case de stress supplémentaire au choix de la cible",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Feu",
        Specialty: "Vie",
        DomainDescription:
          "Les invocations du Feu permettent de puiser et de créer de la Légende liée au concept du Feu et de la Chaleur en général. Le lanceur se liera dans une certaine mesure à un Titan de Muspelheim, le Royaume Titanique du Feu, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans la chaleur de la vie afin de créer et/ou manipuler des émotions fortes ou des sentiments. C’est le concept de la danse, de l’amour passionnel, de la fête, de l’adrénaline et de la volonté de vivre pleinement.<br>Le Titan associé à ce concept est Xiuhtecuhtli.",
        Effect1: "Vous dissipez la fatigue accumulé par une activité intense",
        Effect2: "Vous pouvez créer un aspect “Optimisme débordant”",
        Stunt1:
          "La Danse de la Vie: Une fois par session, vous pouvez utiliser Feu comme Vie pour ramener à la vie un être non-Légendaire",
        Stunt2:
          "Âme de phénix : Lorsque vous mourrez, un grand oeuf apparaît. S’il est immergé dans le feu pendant 24h sans être détruit, vous renaissez sans souvenir des dernières 48h",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Feu",
        Specialty: "Châtiment Divin",
        DomainDescription:
          "Les invocations du Feu permettent de puiser et de créer de la Légende liée au concept du Feu et de la Chaleur en général. Le lanceur se liera dans une certaine mesure à un Titan de Muspelheim, le Royaume Titanique du Feu, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans le feu divin répurgateur, bannissant les impies se voulant les égaux des dieux. C’est le concept de la toute puissance divine, du rappel aux mortels de la place qui est la leur mais aussi de la foi inquisitrice.<br>Le Titan associé à ce concept est Némésis.",
        Effect1: "Vous invoquez un pilier de flamme",
        Effect2: "Vous créez l’aspect “Hache du bourreau”",
        Stunt1:
          "Exécution : Si vous exécutez une sentence de mort décidée par un être plus puissant que vous, vous gagnez un Point de Destin",
        Stunt2:
          "Maintien de l’Ordre divin : Vous avez +1 à vos jets d’attaque contre les Sociétés Secrètes",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Feu",
        Specialty: "Feu Stellaire",
        DomainDescription:
          "Les invocations du Feu permettent de puiser et de créer de la Légende liée au concept du Feu et de la Chaleur en général. Le lanceur se liera dans une certaine mesure à un Titan de Muspelheim, le Royaume Titanique du Feu, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans le feu des étoiles, inspirant à la grandeur et au grand pouvoir de destruction s’il touchait le Monde. C’est le concept des comètes, des météores, des éruptions stellaires et des aurores boréales.<br>Les Titans associés à ce concept sont les Auahitūroa et les Ngā Mānawa",
        Effect1: "Vous créez l’Aspect “Formes dans l’Aurore”",
        Effect2: "Vous faites tomber une comète sur un ennemi",
        Stunt1:
          "Atterrissage de super-héros : Si vous tombez de plus de dix fois votre hauteur, vous pouvez créez un météore à l’impact et ignorer les dégât subi (l’impact est par contre visible).",
        Stunt2:
          "Big balls of Fire : Lorsque vous chevauchez une moto, vous pouvez faire gratuitement des jets de Feu-Stellaire pour ce qui concerne la conduite",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Eau",
        Specialty: "Pourvoyeuse",
        DomainDescription:
          "Les invocations d’Eau permettent de puiser et de créer de la Légende liée au concept des Océans, des Fleuves et de l’Eau en général. Le lanceur se liera dans une certaine mesure à un Titan d’Océanus, le Royaume Titanique de l’Eau, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet au lanceur de puiser dans les richesses de la mer, que ce soit pour y trouver de la nourriture, des poissons ou autres mystères se cachant sous la surface.<br>Le Titan associé à ce concept est Sedna.",
        Effect1: "Vous produisez de la nourriture",
        Effect2: "Invoquez des créatures marines amicales.",
        Stunt1: "Ventre Plein : Vous n'avez jamais faim.",
        Stunt2:
          "Maison du Crustacé : Une fois par nuit, vous pouvez créer un grand coquillage comme abri pour une dizaine de personne qui durera jusqu’au matin",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Eau",
        Specialty: "Vie",
        DomainDescription:
          "Les invocations d’Eau permettent de puiser et de créer de la Légende liée au concept des Océans, des Fleuves et de l’Eau en général. Le lanceur se liera dans une certaine mesure à un Titan d’Océanus, le Royaume Titanique de l’Eau, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet au lanceur de puiser dans la vie océanique afin d’invoquer des créatures marines ou bien certaines de leurs caractéristiques.<br>Le Titan associé à ce concept est Tiamat.",
        Effect1: "Invoquez des monstres marins incontrôlables",
        Effect2: "Vous invoquez un requin capable de nager dans l’air",
        Stunt1:
          "Promesse de vie : Si vous êtes complètement immergé ou trempé, vous avez une case de stress à 2 supplémentaire",
        Stunt2:
          "L'Alpha : Vous avez +2 à vos jet de Présence contre n'importe quel animal ou Titanspawn.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Eau",
        Specialty: "Mer Déchaînée",
        DomainDescription:
          "Les invocations d’Eau permettent de puiser et de créer de la Légende liée au concept des Océans, des Fleuves et de l’Eau en général. Le lanceur se liera dans une certaine mesure à un Titan d’Océanus, le Royaume Titanique de l’Eau, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet au lanceur de puiser dans la furie destructrice des eaux déchainées afin d’invoquer d’immenses tsunamis et autres tourbillons.<br>Le Titan associé à ce concept est Yam.",
        Effect1: "nvoquez un tsunami, faites jaillir des geysers d'eau.",
        Effect2: "Vous pouvez créer un aspect “Mer agitée”",
        Stunt1:
          "Rage des Titans: Lorsque vous êtes profondément en colère, vous gagnez +1 à vos jets Légendaires.",
        Stunt2:
          "Grande Marée : Vous obtenez +1 à votre résultat de jets de Mer Déchainée pour chaque autre utilisation de Mer Déchainée utilisée durant la scène.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Eau",
        Specialty: "Soin",
        DomainDescription:
          "Les invocations d’Eau permettent de puiser et de créer de la Légende liée au concept des Océans, des Fleuves et de l’Eau en général. Le lanceur se liera dans une certaine mesure à un Titan d’Océanus, le Royaume Titanique de l’Eau, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans le pouvoir guérisseur de l’eau. C’est le domaine de la régénération du corps et de l’esprit, de l’apaisement spirituel, du calme et de la sérénité.<br>Le Titan associé à ce concept est Akkorokamui.",
        Effect1: "Vous soignez une conséquence physique",
        Effect2: "Vous créez un aspect “Eau purifiante”",
        Stunt1:
          "Bain régénérant : Si vous immergez vous ou une autre créature dans l’eau, son état de santé ne peut se détériorer tant que vous vous concentrer et maintenez le contact physique.",
        Stunt2:
          "Pansement d’eau pure : Une fois par session, une cible que vous pouvez voir ne peut avoir les Aspects lié à une conséquence utilisés contre elle jusqu’à la fin de la scène.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Lumière",
        Specialty: "Brillance",
        DomainDescription:
          "Les invocations de Lumière permettent de puiser et de créer de la Légende liée au concept de la Lumière sous toutes ses formes. Le lanceur se liera dans une certaine mesure à un Titan d’Aether, le Royaume Titanique de la Lumière, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet au lanceur de puiser dans la brillance lumineuse pure et de l’éblouissement, qu’il soit physique ou bien charismatique.<br>Le Titan associé à ce concept est Aten.",
        Effect1: "Aveuglez vos ennemis, subjuguez une audience",
        Effect2: "Vous brûlez les yeux de vos adversaires",
        Stunt1:
          "En pleine lumière : Tant que vous êtes très bien éclairé, vous avez +1 à vos jet de Présence",
        Stunt2:
          "Corps pur : Vous pouvez méditer 6 heures et faire disparaître toute maladie ou poison de votre corps.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Lumière",
        Specialty: "Soleil",
        DomainDescription:
          "Les invocations de Lumière permettent de puiser et de créer de la Légende liée au concept de la Lumière sous toutes ses formes. Le lanceur se liera dans une certaine mesure à un Titan d’Aether, le Royaume Titanique de la Lumière, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet au lanceur de puiser dans la lumière duale du soleil, que ce soit pour son aspect vital ou destructeur.<br>Le Titan associé à ce concept est Hélios.",
        Effect1: "Illuminez un chemin, envoyez des rayons de flammes",
        Effect2: "Vous pouvez créer un aspect “Chariot Solaire”",
        Stunt1:
          "Photosynthèse: Après un bain de soleil d'une heure, vous vous soignez d'une Conséquence Physique Légère.",
        Stunt2:
          "Fils de Phlégon : Un des descendant de ceux qui tire le char d’Hélios vous accompagne. Vous avez l’Aspect “Fils de Phlegon” avez une utilisation gratuite par session.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Lumière",
        Specialty: "Illumination",
        DomainDescription:
          "Les invocations de Lumière permettent de puiser et de créer de la Légende liée au concept de la Lumière sous toutes ses formes. Le lanceur se liera dans une certaine mesure à un Titan d’Aether, le Royaume Titanique de la Lumière, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet au lanceur de puiser dans la lumière des idées et de créer des épiphanies soudaines, des “Eurêka !”.<br>Le Titan associé à ce concept est Zhulong.",
        Effect1: "Vous faites des liens inédit entre des idées, des concepts",
        Effect2: "Vous pouvez créer un aspect “Théorie Brillante”",
        Stunt1:
          "Idée Lumineuse : Vous avez +1 lors de vos jets de Savoir pour résoudre des puzzles ou Enigme",
        Stunt2:
          "Discussions Philosophiques : Vous pouvez utiliser Savoir pour les jets sociaux avec des érudits ou théoriciens",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Lumière",
        Specialty: "Gloire",
        DomainDescription:
          "Les invocations de Lumière permettent de puiser et de créer de la Légende liée au concept de la Lumière sous toutes ses formes. Le lanceur se liera dans une certaine mesure à un Titan d’Aether, le Royaume Titanique de la Lumière, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet au lanceur de puiser dans la lumière de la gloire et de briller de par son charisme considéré comme divin.<br>Le Titan associé à ce concept est Hypérion.",
        Effect1: "Vous pouvez créer un aspect “Ailes Glorieuses”",
        Effect2: "Vous pouvez faire s’agenouiller un ennemi devant vous",
        Stunt1:
          "Gloire de la Bataille : Lorsque vous infligez une conséquence, vous pouvez regagner votre plus faible case de stress cochée",
        Stunt2:
          "Gloire voyageuse : Vous avez +1 en Ressource lorsqu’il s’agit de savoir si d’autres ont entendu parler de vos exploits",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Ciel",
        Specialty: "Calme",
        DomainDescription:
          "Les invocations du Ciel permettent de puiser et de créer de la Légende liée au concept de l’Air et du Ciel en général. Le lanceur se liera dans une certaine mesure à un Titan d’Amaunet, le Royaume Titanique du Ciel et de l’Air, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet au lanceur de puiser dans le calme des hauteurs célestes, là où s’élève l’esprit et la conscience loin au-dessus des tribulations du monde.<br>Le Titan associé à ce concept est Ouranos.",
        Effect1: "Calmez les autres, arrêtez une balle sur sa trajectoire.",
        Effect2: "Vous pouvez créer un aspect “Apaisé”",
        Stunt1:
          "Mur de sérénité : Une fois par session, vous pouvez gagner +1 pour un jet de défense à des dégât mentaux",
        Stunt2:
          "L’esprit placide du Ritualiste : Lorsque vous utilisez Ciel-Calme comme capacité canalisée d’Arcana, vous pouvez doubler la longueur du rituel pour le faire monter d’un niveau supplémentaire.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Ciel",
        Specialty: "Cataclysme",
        DomainDescription:
          "Les invocations du Ciel permettent de puiser et de créer de la Légende liée au concept de l’Air et du Ciel en général. Le lanceur se liera dans une certaine mesure à un Titan d’Amaunet, le Royaume Titanique du Ciel et de l’Air, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet au lanceur de puiser dans la pure destruction qui émane des cieux afin de créer des évènements cataclysmiques comme des pluies de météores, des tempêtes d’éclairs et des tornades hors de contrôle. Il est impossible d’être précis avec cette spécialité d’Invocation Ciel.<br>Le Titan associé à ce concept est Typhon.",
        Effect1:
          "Détruisez vos ennemis avec des ouragans, invoquez des tornades.",
        Effect2: "Vous abattez un météore sur un ennemi",
        Stunt1:
          "C'est Très Efficace !: Utiliser Ciel-Destruction contre des ennemis volants vous donne un bonus de +3.",
        Stunt2:
          "Violence non contenue : Lorsque l’on vous inflige une conséquence physique, une déflagration explose autour de vous. Toute créature proche (y compris vous) doit cocher une case de stress à 2 ou plus.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Ciel",
        Specialty: "Tempête",
        DomainDescription:
          "Les invocations du Ciel permettent de puiser et de créer de la Légende liée au concept de l’Air et du Ciel en général. Le lanceur se liera dans une certaine mesure à un Titan d’Amaunet, le Royaume Titanique du Ciel et de l’Air, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans la force des vents pour en invoquer la puissance à des fins destructrices ou tout simplement pour s’envoler.<br>Le Titan associé à ce concept est Huracan.",
        Effect1: "Volez, créez des tempêtes",
        Effect2: "Vous pouvez créer un aspect “Vent violents”",
        Stunt1:
          "Voix Tonnante : Vous pouvez vous faire entendre à plusieurs centaines de mètres sans effort",
        Stunt2:
          "Brûlure de circuit : En touchant un objet électrique (ou magique utilisant Invocation-Ciel), vous pouvez faire un jet d’Ingénierie en prenant en compte vos niveaux de légendes pour le rendre irréparable.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Ciel",
        Specialty: "Pluie",
        DomainDescription:
          "Les invocations du Ciel permettent de puiser et de créer de la Légende liée au concept de l’Air et du Ciel en général. Le lanceur se liera dans une certaine mesure à un Titan d’Amaunet, le Royaume Titanique du Ciel et de l’Air, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans l’apaisement apporté par la pluie sereine ou bien la destruction causée par les pluies diluviennes.<br>Le Titan associé à ce concept est Tlaloc.",
        Effect1:
          "Vous vous transformez temporairement en pluie pour vous infiltrer dans une zone en dessous de vous",
        Effect2: "Créez une bruine légère ou une mousson",
        Stunt1:
          "Pluie Apaisante: S'il pleut pendant une Scène, tous les personnages de la Scène ont +1 en Rapport.",
        Stunt2:
          "Inondation : A proximité d’un fleuve, vous pouvez ajouter +2 lors d’une utilisation d’invocation de Ciel-Pluie pour créer un aspect “Inondation”",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Ciel",
        Specialty: "Eclairs",
        DomainDescription:
          "Les invocations du Ciel permettent de puiser et de créer de la Légende liée au concept de l’Air et du Ciel en général. Le lanceur se liera dans une certaine mesure à un Titan d’Amaunet, le Royaume Titanique du Ciel et de l’Air, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans la puissance des éclairs, que ce soit pour leur aspect destructeur, leur vitesse ou encore la fascination et l’intimidation qu’ils provoquent.<br>Le Titan associé à ce concept est Raiju.",
        Effect1: "Vous créez l’aspect “Couvert d'Éclair”",
        Effect2: "Vous faites tomber un éclair sur un ennemi distant",
        Stunt1:
          "Pas de foudre : Vous pouvez relancer un jet d’Athlétisme lors d’une course et accepter le second résultat.",
        Stunt2:
          "Grâce Electrique : Vous pouvez attaquez à main nue avec Athlétisme",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Ciel",
        Specialty: "Vent",
        DomainDescription:
          "Les invocations du Ciel permettent de puiser et de créer de la Légende liée au concept de l’Air et du Ciel en général. Le lanceur se liera dans une certaine mesure à un Titan d’Amaunet, le Royaume Titanique du Ciel et de l’Air, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans les aspects multiples du vent. C’est le domaine de la liberté des cieux, de la puissance incontrôlable des bourrasques et du calme des brises légères.<br>Le Titan associé à ce concept est Pazuzu.",
        Effect1: "Vous créez l’aspect “Mur de vent”",
        Effect2: "Vous faites souffler un vent pour pousser un navire",
        Stunt1:
          "Chevaucheur des Vents: Par vent fort, vous pouvez voler sans restrictions",
        Stunt2:
          "Ami d’Eole : En vous focalisant 10 minutes, vous pouvez rediriger une tempête non-légendaire ou la calmer",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Terre",
        Specialty: "Vie",
        DomainDescription:
          "Les invocations de la Terre permettent de puiser et de créer de la Légende liée au concept de la Terre et de la Nature en général. Le lanceur se liera dans une certaine mesure à un Titan de Terra, le Royaume Titanique de la Terre, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans la puissance de la vie sur le Monde et ainsi d’invoquer des monstres de toutes tailles et formes ou encore d’en créer de nouvelles.<br>Le Titan associé à ce concept est Gaïa.",
        Effect1: "Invoquez des monstres et autres animaux féroces.",
        Effect2: "Rendez une terre ou une personne fertile",
        Stunt1:
          'Croissance Incontrôlable: Jetez un dF au début de chaque session. Sur un résultat de "+", vous gagnez +1 de Physique jusqu\'à la fin de la session. Sur un "-", vous gagnez +1 de Volonté à la place.',
        Stunt2:
          "Resurgence : Vous gagnez une case de stress physique supplémentaire égal à votre Rapport",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Terre",
        Specialty: "Roche",
        DomainDescription:
          "Les invocations de la Terre permettent de puiser et de créer de la Légende liée au concept de la Terre et de la Nature en général. Le lanceur se liera dans une certaine mesure à un Titan de Terra, le Royaume Titanique de la Terre, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans la stabilité et la permanence de la roche et des montagnes, pour manipuler la terre, créer des abris ou chercher à s’élever vers les cieux.<br>Le Titan associé à ce concept est Ouréa.",
        Effect1:
          "Invoquez des rochers, creusez des cavernes à flanc de montagne, effondrez un immeuble.",
        Effect2: "Créez l’aspect “Mur de pierre”",
        Stunt1:
          "Peau de Pierre: Vous avez +1 en Physique contre les attaques physiques.",
        Stunt2:
          "Passe-Muraille : En vous concentrant 5 minutes sur un mur de pierre d’un niveau de légende inférieur ou égal au votre, vous pouvez créez un passage temporaire pour vous et vos alliés.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Terre",
        Specialty: "Etendue",
        DomainDescription:
          "Les invocations de la Terre permettent de puiser et de créer de la Légende liée au concept de la Terre et de la Nature en général. Le lanceur se liera dans une certaine mesure à un Titan de Terra, le Royaume Titanique de la Terre, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans les étendues du monde inexploré afin de perdre des personnes dans un labyrinthe de paysages ou encore inciter les gens à ne pas voyager - parce-que “voyager, c’est dangereux”.<br>Le Titan associé à ce concept est Kur",
        Effect1:
          "Faites des intrus se perdre en forêt, infectez vos ennemis avec des maladies exotiques.",
        Effect2: "Créez l’aspect “Forêt désorientante”",
        Stunt1:
          "Le Vagabond: Vous n'êtes jamais perdu à moins que vous ne le décidiez ou qu’un effet magique cherche délibéremment à vous perdre.",
        Stunt2:
          "Immensité accueillante : Lorsque vous pouvez voir la moitié de l’horizon, vous récupérez de vos blessures quatre fois plus vite",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Terre",
        Specialty: "Nature",
        DomainDescription:
          "Les invocations de la Terre permettent de puiser et de créer de la Légende liée au concept de la Terre et de la Nature en général. Le lanceur se liera dans une certaine mesure à un Titan de Terra, le Royaume Titanique de la Terre, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans la diversité de la Nature du monde. Ses effets sont très proches du Druidisme Vert, mais au lieu de se lier à un kami naturel, le lanceur se lie au Titan.<br>Le Titan associé à ce concept est L’Homme Vert.",
        Effect1:
          "Faites apparaître de l'eau guérisseuse, maîtriser les plantes.",
        Effect2: "Créer l’aspect “Jardin irréel” au milieu d’un désert",
        Stunt1:
          "Harmonie Naturelle: Vous avez +2 pour tenter de briser tout sort existant et contrôlant des individus",
        Stunt2:
          "Connecté au grand tout : Vous avez +2 au jet de rapport avec les mythborn et les titans de Terra",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Terre",
        Specialty: "Cataclysme",
        DomainDescription:
          "Les invocations de la Terre permettent de puiser et de créer de la Légende liée au concept de la Terre et de la Nature en général. Le lanceur se liera dans une certaine mesure à un Titan de Terra, le Royaume Titanique de la Terre, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans la furie destructrice de la terre pour créer toutes sortes de dévastations de masse tels des tremblements de terre, des éboulements et autres avalanches. Il est impossible d’être délicat en utilisant cette spécialité.<br>Le Titan associé à ce concept est Typhon.",
        Effect1: "Réduire une maison en ruine",
        Effect2: "Créer l’aspect “Faille sismique”",
        Stunt1:
          "Démolisseur : Vous gagnez +2 à vos jets de physique pour détruire ou endommager des objets inanimés",
        Stunt2:
          "Emissaire de la désolation : Détruire un édifice habité récemment vous fait gagner une utilisation de Terre-Cataclysme",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Profondeurs",
        Specialty: "Cavernes",
        DomainDescription:
          "Les invocations des Profondeurs permettent de puiser et de créer de la Légende liée au concept du Monde souterrain et des Profondeurs en général. Le lanceur se liera dans une certaine mesure à un Titan de Patala, le Royaume Titanique des Profondeurs, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans les mystères et les dangers des cavernes oubliées les plus profondes pour en invoquer les créatures ou encore perdre un opposant.<br>Le Titan associé à ce concept est Erlik.",
        Effect1: "Piégez un ennemi sous terre, construisez un abri souterrain.",
        Effect2: "Créez l’Aspect “Tunnel vers la sortie”",
        Stunt1: "Nyctalope: Vous voyez dans le noir non légendaire",
        Stunt2:
          "Creuseur : Vous pouvez vous déplacer sous terre à la moitié de votre vitesse de marche en laissant simplement de la terre retournée derrière vous",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Profondeurs",
        Specialty: "Obscurité",
        DomainDescription:
          "Les invocations des Profondeurs permettent de puiser et de créer de la Légende liée au concept du Monde souterrain et des Profondeurs en général. Le lanceur se liera dans une certaine mesure à un Titan de Patala, le Royaume Titanique des Profondeurs, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans l’obscurité des souterrains et la peur qu’elle inspire pour en invoquer les créatures ou se déplacer dans les ombres.<br>Le Titan associé à ce concept est Erébus.",
        Effect1: "Cachez-vous dans les ombres, retirez les lumières",
        Effect2: "Créez l’aspect “Obscurité suffocante”",
        Stunt1:
          "Cécité soudaine : Une fois par session, vous pouvez faire un jet de Perception contre celui d’une cible. En cas de réussite, il gagne l’aspect “Aveugle” jusqu’au début de votre prochain tour.",
        Stunt2:
          "Peter Pan: Votre ombre se déplace séparément de vous tant que vous la voyez. Vous pouvez utiliser Profondeurs - Ombres une fois supplémentaire par session depuis celle ci.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Profondeurs",
        Specialty: "Abysses",
        DomainDescription:
          "Les invocations des Profondeurs permettent de puiser et de créer de la Légende liée au concept du Monde souterrain et des Profondeurs en général. Le lanceur se liera dans une certaine mesure à un Titan de Patala, le Royaume Titanique des Profondeurs, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans la présence écrasante et implacable des abysses pour broyer les esprits ou invoquer des créatures terrifiantes.<br>Le Titan associé à ce concept est Abzu.",
        Effect1: "Invoquez des créatures des Abysses cauchemardesques.",
        Effect2: "Créez l’Aspect “Regard Abyssal”",
        Stunt1:
          "Coeur des profondeurs : Vous avec +2 à vos jets de volonté pour résister à une attaque faisant subir une émotion",
        Stunt2:
          "Pression Etouffante : Pour chaque minute que vous discutez sans vous interrompre avec une cible, vous pouvez lui imposer -1 à ses jets de Manipulation et de Présence par minute jusqu’à votre niveau de Légende. Cet effet disparaît quand la personne vous arrêtez de converser.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Profondeurs",
        Specialty: "Richesses",
        DomainDescription:
          "Les invocations des Profondeurs permettent de puiser et de créer de la Légende liée au concept du Monde souterrain et des Profondeurs en général. Le lanceur se liera dans une certaine mesure à un Titan de Patala, le Royaume Titanique des Profondeurs, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans la richesse et la diversité du monde souterrain pour en extraire les ressources précieuses et les métaux et les transformer en armes, véhicules et autres constructions.<br>Le Titan associé à ce concept est Dis Pater.",
        Effect1:
          "Invoquez des piles de matériaux rares, invoquez des golems pour aller combattre pour vous.",
        Effect2: "Créez l’aspect “Epée jaillie de la terre”",
        Stunt1:
          "Toucher de Midas: Vous avez un bonus de +2 à votre Ressource si vous usez d’une utilisation de Profondeurs - Richesses",
        Stunt2:
          "Maître du métal : Vous lancez 3 DF supplémentaire pour vos jets d’Ingénierie concernant le métal et pouvez ignorer 3 des 7 dés pour votre résultat.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Profondeurs",
        Specialty: "Décomposition",
        DomainDescription:
          "Les invocations des Profondeurs permettent de puiser et de créer de la Légende liée au concept du Monde souterrain et des Profondeurs en général. Le lanceur se liera dans une certaine mesure à un Titan de Patala, le Royaume Titanique des Profondeurs, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans l’aspect glauque des profondeurs. C’est le domaine de la pourriture, des champignons et de la terre qui absorbe la vie.<br>Le Titan associé à ce concept est Crom Cruach.",
        Effect1:
          "Faites pourrir vos ennemis de l'intérieur, invoquez des maladies temporaires",
        Effect2: "Vous créez l’aspect “Ver dévoreurs de cadavre”",
        Stunt1:
          "Porteur de Peste: Si vous infligez une Conséquence Physique, elle augmente d'un degré de sévérité chaque jour si laissée sans soin.",
        Stunt2:
          "Sang Corrosif : Si vous subissez une Conséquence Physique susceptible de vous faire saigner, vos jets de Combat en attaque ont +2.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Mort",
        Specialty: "Inéluctabilité",
        DomainDescription:
          "Les invocations de la Mort permettent de puiser et de créer de la Légende liée au concept de la Mort en général. Le lanceur se liera dans une certaine mesure à un Titan de Sheol, le Royaume Titanique de la Mort, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans la caractère inévitable de la Mort et ainsi de provoquer les fins les plus abruptes, que ce soit pour des individus ou des organisations.<br>Le Titan associé à ce concept est La Grande Faucheuse.",
        Effect1: "Faites faner les champs, affaiblissez un être de Légende.",
        Effect2: "Créez l’aspect “L’accident bête”",
        Stunt1:
          "La venue soudaine de la mort : Vos jets d’attaque à +4 valent pour +5.",
        Stunt2:
          "Le Doigt de la Mort: Pour un Point de Destin, vous pouvez instantanément tuer un être ayant deux niveaux de légende ou plus en dessous de vous, si vous établissez un contact physique avec lui.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Mort",
        Specialty: "Horreur",
        DomainDescription:
          "Les invocations de la Mort permettent de puiser et de créer de la Légende liée au concept de la Mort en général. Le lanceur se liera dans une certaine mesure à un Titan de Sheol, le Royaume Titanique de la Mort, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans les horreurs qu’inspire la Mort et dans la peur viscérale qu’ont de mourir tous les êtres vivants.<br>Le Titan associé à ce concept est Nirrti.",
        Effect1:
          "Rendez les âmes folles, envoyez des visions d'horreur à quelqu'un.",
        Effect2: "Créez l’Aspect “Catatonie”",
        Stunt1:
          "Visage de l’horreur : Une fois par session, vous pouvez gagner +2 en Présence lors d’un jet d’Intimidation",
        Stunt2:
          'Regarde-le mourir: Quand vous tuez un individu conscient, ses alliés doivent faire un jet de Volonté à difficulté +4 ou gagner l\'Aspect "Horrifié".',
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Mort",
        Specialty: "Exctinction",
        DomainDescription:
          "Les invocations de la Mort permettent de puiser et de créer de la Légende liée au concept de la Mort en général. Le lanceur se liera dans une certaine mesure à un Titan de Sheol, le Royaume Titanique de la Mort, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans le carnage sanguinaire de la Mort pour provoquer les morts les plus barbares et les plus violentes qu’il soit. Particulièrement efficace sur les groupes d’ennemis.<br>Le Titan associé à ce concept est Camazotz.",
        Effect1:
          "Envahissez l'esprit de quelqu'un, emplissez le de haine, durcissez les émotions de quelqu'un pour le pousser au meurtre.",
        Effect2: "Créez l’aspect “Folie Meurtrière”",
        Stunt1:
          "Pas Exigeant : Une fois par session, consommer un corps humain pour réduire la sévérité d'une Conséquence d'un niveau.",
        Stunt2:
          "Beauté dans le Carnage : Si vous êtes la cause directe de la mort de 5 cibles sentiente dans une même scène, vous gagnez un Point de Destin (limité à une fois par Scène)",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Mort",
        Specialty: "Voyage",
        DomainDescription:
          "Les invocations de la Mort permettent de puiser et de créer de la Légende liée au concept de la Mort en général. Le lanceur se liera dans une certaine mesure à un Titan de Sheol, le Royaume Titanique de la Mort, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans le dernier voyage que représente la Mort et ainsi pouvoir se déplacer à travers les murs ou attirer des âmes vers soi. C’est le pouvoir de prédilection des psychopompes.<br>Le Titan associé à ce concept est Styx.",
        Effect1:
          "Guidez les âmes vers les Enfers, voyagez librement dans les Royaumes liés à la Mort",
        Effect2: "Créez l’aspect sur vous “Forme Fantômatique”",
        Stunt1: "Psychopompe: Vous pouvez voir toutes les âmes autour de vous.",
        Stunt2:
          "NANI?! : Vous pouvez vous téléporter derrière un adversaire une fois par combat, créant l’Aspect “Surpris” sur lui puis faire votre tour normalement.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Mort",
        Specialty: "Paix",
        DomainDescription:
          "Les invocations de la Mort permettent de puiser et de créer de la Légende liée au concept de la Mort en général. Le lanceur se liera dans une certaine mesure à un Titan de Sheol, le Royaume Titanique de la Mort, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans le dernier repos, la paix et la délivrance apportée par la Mort afin d’apaiser les souffrances d’un être vivant.<br>Le Titan associé à ce concept est Thanatos.",
        Effect1:
          "Aidez les âmes à trouver les Enfers, apaisez un individu sur le point de mourir.",
        Effect2: "Créez l’aspect “Dernières Confessions”",
        Stunt1:
          "Euthanasie: Vous pouvez tuer instantanément tout individu en pleine possession de ses facultés qui le désire pour un Point de Destin.",
        Stunt2:
          "Apaisé par la mort : +2 à vos jets de rapport avec les Âmes, les dieux des Enfers et les titans de Sheol.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Mort",
        Specialty: "Froid",
        DomainDescription:
          "Les invocations de la Mort permettent de puiser et de créer de la Légende liée au concept de la Mort en général. Le lanceur se liera dans une certaine mesure à un Titan de Sheol, le Royaume Titanique de la Mort, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans l’angoisse de l’absence de chaleur d’un corps sans vie. C’est le domaine du figé, de l’inconnu et de l’absence totale d’animation de la mort.<br>Le Titan associé à ce concept est Itztlacoliuhqui.",
        Effect1: "Vous créez un aspect “Aura de froid”",
        Effect2: "Vous condensez l’eau ambiante en un pic de froid",
        Stunt1:
          "Froid mordant : Si un Aspect de situation lié au froid existe, vous pouvez relancer le D4 lors de vos utilisations de Mort-Froid et accepter le second résultat",
        Stunt2:
          "Bouclier de Hel : En dépensant une utilisation de Mort-Froid, vous gagnez un Aspect “Bouclier de Hel” sur vous avec trois utilisations gratuites",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Nuit",
        Specialty: "Voile",
        DomainDescription:
          "Les invocations de la Nuit permettent de puiser et de créer de la Légende liée au concept de la Nuit et de l'Obscurité en général. Le lanceur se liera dans une certaine mesure à un Titan de Nyx, le Royaume Titanique de la Nuit, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans le voile nocturne tombant sur le monde à la fin du jour afin d’user de dissimulation.<br>Le Titan associé à ce concept est Nott.",
        Effect1: "Cachez-vous et/ou vos alliés, protégez-vous d'une attaque.",
        Effect2: "Vous créez l’Aspect “Visages dissimulés”",
        Stunt1:
          'Sombre Voile: Une fois par Scène, vous pouvez utiliser Savoir pour créer l\'Aspect "Voilé" sur un allié. Il gagne +1 en Furtivité pour le reste de la Scène.',
        Stunt2:
          "Cape d’invisibilité : Une fois par session, vous pouvez créez l’Aspect “Invisible” sur vous. Il disparaît si vous vous déplacez.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Nuit",
        Specialty: "Terreur",
        DomainDescription:
          "Les invocations de la Nuit permettent de puiser et de créer de la Légende liée au concept de la Nuit et de l'Obscurité en général. Le lanceur se liera dans une certaine mesure à un Titan de Nyx, le Royaume Titanique de la Nuit, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans la terreur qu’inspire l’obscurité totale, la peur du noir et de tous les monstres qui s’y cachent.<br>Le Titan associé à ce concept est Fenrir.",
        Effect1:
          "Terrifiez vos cibles, grandissez dans des proportions monstrueuses",
        Effect2: "Créez l’Aspect “Paranoïa” sur une cible",
        Stunt1:
          "Une Faim de Loup: Lorsque vous créez un Aspect lié à la Peur, vous gagnez +1 en Combat contre ceux qui en sont affectés.",
        Stunt2:
          "Vague psychique : Vous pouvez utilisez Volonté pour effectuer des attaques en combat avec dégâts mentaux",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Nuit",
        Specialty: "Sommeil",
        DomainDescription:
          "Les invocations de la Nuit permettent de puiser et de créer de la Légende liée au concept de la Nuit et de l'Obscurité en général. Le lanceur se liera dans une certaine mesure à un Titan de Nyx, le Royaume Titanique de la Nuit, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans l’abandon du corps et l’envol de l’esprit provoqué par le sommeil lorsque la nuit survient. Cette magie est particulièrement utilisée pour communiquer à travers les rêves.<br>Le Titan associé à ce concept est Hypnos.",
        Effect1:
          "Vous créez un rêve commun pour les personnes dormant avec vous",
        Effect2: "Vous créez un aspect “Message dans les rêves”",
        Stunt1:
          "Bras de Morphée : Une fois par session lorsqu’une cible que vous voyez dort plus de huit heure, elle peut diminuer d’un cran la sévérité d’une conséquence mentale.",
        Stunt2:
          "Regardez ce pendule : A votre tour, vous pouvez tenter un jet de Manipulation contre un jet de volonté à +4 de la cible. En cas de réussite, vous créez immédiatement l’aspect “Endormi” avec 2 utilisations gratuites.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Nuit",
        Specialty: "Ombres",
        DomainDescription:
          "Les invocations de la Nuit permettent de puiser et de créer de la Légende liée au concept de la Nuit et de l'Obscurité en général. Le lanceur se liera dans une certaine mesure à un Titan de Nyx, le Royaume Titanique de la Nuit, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans l’absence totale de lumière et d’ordre. C’est la magie des ombres, des assassins et des agents du chaos.<br>Le Titan associés à ce concept est Apophis.",
        Effect1: "Retirez toute lumière, cachez le soleil.",
        Effect2: "Créez l’Aspect “Lame d’Ombre”",
        Stunt1:
          "Ombre parmi les Ombres : Une utilisation gratuite d’un aspect lié à l’obscurité ne compte pas dans le nombre d’utilisation gratuite utilisable en une action.",
        Stunt2:
          "Game Over: Lorsque vous faites subir une Conséquence Mentale Sévère à une cible, vous pouvez choisir de briser son moral. Elle mourra instantanément de désespoir.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Nuit",
        Specialty: "Etoiles",
        DomainDescription:
          "Les invocations de la Nuit permettent de puiser et de créer de la Légende liée au concept de la Nuit et de l'Obscurité en général. Le lanceur se liera dans une certaine mesure à un Titan de Nyx, le Royaume Titanique de la Nuit, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans l’éthéralité des étoiles et de retranscrire leur puissance comme une source de fascination ou de destruction.<br>Le Titan associé à ce concept est Nut.",
        Effect1:
          "Prédisez le futur, guidez ceux qui en ont besoin, faites pleuvoir des météores.",
        Effect2: "Créez l’aspect “Repérage aux étoiles”",
        Stunt1:
          "Signe du Zodiaque: Choisissez un signe du zodiaque. Vous gagnez +1 en Volonté lorsque ce signe est dominant (lancez un 2 d4 en début de session, si vous obtenez au moins un 4, il est dominant)",
        Stunt2:
          "Etoile Filante : La nuit, vous pouvez effectuez des bonds prodigieux et rapide : vous pouvez triplez votre Athlétisme en ligne droite si vous parcourez plus de 500 mètres.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Nuit",
        Specialty: "Néant",
        DomainDescription:
          "Les invocations de la Nuit permettent de puiser et de créer de la Légende liée au concept de la Nuit et de l'Obscurité en général. Le lanceur se liera dans une certaine mesure à un Titan de Nyx, le Royaume Titanique de la Nuit, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans le vide absolu de la nuit et du noir. C’est le domaine de ce qui rôde par-delà l’horizon et de tout ce qui n’a aucune forme physique.<br>Le Titan associé à ce concept est Mikaboshi.",
        Effect1: "Privez vos ennemis de leurs sens, faites-les disparaitre.",
        Effect2: "Créez un Aspect “Faille tranchante”",
        Stunt1:
          "Le Mal Invisible: Vous doublez votre avantage lié à votre différence de niveau lors de jet de Furtivité.",
        Stunt2:
          "Annulation : En dépensant deux utilisation de Nuit-Néant, vous pouvez annuler l’utilisation d’une invocation que vous pouvez voir de niveau de légende inférieur ou égal au vôtre.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Nuit",
        Specialty: "Lune",
        DomainDescription:
          "Les invocations de la Nuit permettent de puiser et de créer de la Légende liée au concept de la Nuit et de l'Obscurité en général. Le lanceur se liera dans une certaine mesure à un Titan de Nyx, le Royaume Titanique de la Nuit, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans la dualité de la lune. C’est le domaine du mystique, de la révélation mais aussi des secrets, de l’apaisement spirituel mais aussi de l’aliénation mentale.<br>Le Titan associé à ce concept est Séléné.",
        Effect1:
          "Rendez les autres fous, rendez un secret plus difficile à divulger",
        Effect2: "Créez l’aspect “Fascination”",
        Stunt1:
          "Maitre des Miroirs: Vous gagnez +1 en Manipulation lorsque vous vous reflétez dans un miroir.",
        Stunt2:
          "Phase de la Lune : A chaque crépuscule, vous pouvez décider de perdre 2 utilisations d’une capacité légendaire pour gagner 2 dans une autre.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Ordre",
        Specialty: "Loi",
        DomainDescription:
          "Les invocations de l’Ordre permettent de puiser et de créer de la Légende liée au concept de l’Ordre en général. Le lanceur se liera dans une certaine mesure à un Titan de Kosmos, le Royaume Titanique de l’Ordre, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans la puissance apportée par les lois, qu’elles soient cosmiques ou personnelles. Cette magie permet d’imposer son système de valeurs aux autres et de le transformer en commandements à suivre.<br>Le Titan associé à ce concept est Thémis.",
        Effect1:
          "Forcez les autres à suivre vos propres règles, faites avouer les coupables.",
        Effect2: "Vous créez un aspect “Accord Mutuel”",
        Stunt1:
          "Appétit pour l’Administratif : Vous avez +2 à vos jets de Savoir pour tout ce qui concerne l’administration, les procédures et la paperasserie",
        Stunt2:
          "La Loi c'est Moi: Définissez un principe moral. Vous avez +2 en Présence pour convaincre les autres de le suivre.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Ordre",
        Specialty: "Savoir",
        DomainDescription:
          "Les invocations de l’Ordre permettent de puiser et de créer de la Légende liée au concept de l’Ordre en général. Le lanceur se liera dans une certaine mesure à un Titan de Kosmos, le Royaume Titanique de l’Ordre, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans le savoir académique universel et d’en tirer les informations recherchées.<br>Le Titan associé à ce concept est Coeus.",
        Effect1: "Apprenez des savoirs anciens, enseignez-le aux autres.",
        Effect2: "Vous créez l’Aspect “Expert en Numismatique”",
        Stunt1:
          "L'Expert: Choisissez un sujet ultra-spécifique (tel que \"Les habitudes de nichée du lapin d'Amérique du Nord\"). Vous n'échouez jamais un jet de Savoir sur ce sujet.",
        Stunt2:
          "Je sais ! J’ai saisi le concept… : Vous vous souvenez parfaitement de toute discussion que vous avez eu avec un être de légende",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Ordre",
        Specialty: "Contrôle",
        DomainDescription:
          "Les invocations de l’Ordre permettent de puiser et de créer de la Légende liée au concept de l’Ordre en général. Le lanceur se liera dans une certaine mesure à un Titan de Kosmos, le Royaume Titanique de l’Ordre, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans la puissance inhérente au contrôle de l’autre. Contrôle des émotions, des mouvements, des pensées, des souvenirs etc. La puissance de cette magie est contrebalancée par les liens du Destin accrus qu’elle génère.<br>Le Titan associé à ce concept est Kronus.",
        Effect1:
          "Forcez les autres à obéir à vos ordres, prenez le contrôle d'un rituel.",
        Effect2: "Créez l’aspect “Au doigt et à l’oeil”",
        Stunt1:
          "Ploie devant Moi: Vous avez +2 en Présence face aux êtres non-Légendaires.",
        Stunt2:
          "Leader tyrannique : Vous avez +2 à vos jet de Présence pour donner des ordres directifs à des subalternes.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Ordre",
        Specialty: "Gravité",
        DomainDescription:
          "Les invocations de l’Ordre permettent de puiser et de créer de la Légende liée au concept de l’Ordre en général. Le lanceur se liera dans une certaine mesure à un Titan de Kosmos, le Royaume Titanique de l’Ordre, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans le poids des choses et donc de manipuler la gravité autour de soi. Cette magie permet de créer un simulacre de télékinésie.<br>Le Titan associé à ce concept est Atlas.",
        Effect1: "Ecrasez une ennemi ou envoyez-le flotter au loin.",
        Effect2: "Créez l’aspect “Zone de gravité faible”",
        Stunt1:
          "Trou Noir: Une fois par session, tout ce qui se situe à moins de 3 mètres de vous pèse le double pendant dix minutes",
        Stunt2:
          "Poids des mots : Vous avez +2 en Rapport lorsque vous cherchez à convaincre de l’importance d’une situation ou de votre honnêteté.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Ordre",
        Specialty: "Musique",
        DomainDescription:
          "Les invocations de l’Ordre permettent de puiser et de créer de la Légende liée au concept de l’Ordre en général. Le lanceur se liera dans une certaine mesure à un Titan de Kosmos, le Royaume Titanique de l’Ordre, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans l’harmonie provenant des symétries sonores et de leurs prédictibilités. C’est le domaine du travail en équipe, de l’oubli de son individualité et de l’acceptation de son appartenance à un grand tout, à une grande partition universelle.<br>Le Titan associé à ce concept est Euterpe.",
        Effect1: "Vous envoyez une musique hypnotique sur un adversaire",
        Effect2: "Vous créez l’aspect “Symétrie sonore”",
        Stunt1:
          "Question de tempo : Lorsque vous infliger du stress avec une attaque mentale, vous gagnez +1 à votre prochaine attaque contre la même cible",
        Stunt2:
          "Mélodie Structurante : Lorsque vous invoquez Ordre-Musique, vous gagnez +1 en Présence jusqu’à la fin de la scène.",
        EnlightenedAbility: false
      },
      {
        Domain: "Invocation : Ordre",
        Specialty: "Abnégation",
        DomainDescription:
          "Les invocations de l’Ordre permettent de puiser et de créer de la Légende liée au concept de l’Ordre en général. Le lanceur se liera dans une certaine mesure à un Titan de Kosmos, le Royaume Titanique de l’Ordre, dépendant du concept principal de l’invocation utilisée.",
        SpecDescription:
          "Ce concept permet de puiser dans l’absence totale d’individualité et le désir de satisfaire autrui. C’est le domaine du sacrifice et de l’appartenance à une chaîne dont tous les maillons sont remplaçables et sont prêt à disparaître pour permettre à la chaîne de persister.<br>Le Titan associé à ce concept est Idun.",
        Effect1: "Vous absorbez la conséquence d’une cible",
        Effect2: "Vous créez l’aspect “Insignifiant”",
        Stunt1:
          "Catalyseur : Lorsque vous faites -4 à un jet normal, une cible autre que vous de votre choix a +1 à son prochain jet.",
        Stunt2:
          "L’idée est à l’épreuve des balles : Lorsque vous utilisez un aspect personnel figé en défense à une attaque, cette utilisation est à +4 au lieu de +2",
        EnlightenedAbility: false
      },
      {
        Domain: "Magie des âmes",
        Specialty: "Nécromancie",
        DomainDescription:
          "La magie des âmes regroupe des spécialisations permettant de manipuler les âmes de gré ou de force. Certaines spécialisations sont largement mal perçues par la communauté divine - comme la Nécromancie qui vole des âmes aux dieux - alors que d’autres sont considérées comme nécessaires.",
        SpecDescription:
          "Une des magies les plus décriées puisqu’elle permet au lanceur de violer le repos d’une âme pour la placer sous son contrôle, esclave pour l’éternité...ou en tout cas le reste de la vie du nécromancien.",
        Effect1: "Relevez les morts",
        Effect2: "Consommer des âmes pour gagner en puissance.",
        Stunt1: "Croque-Mort: Vous pouvez voir et interagir avec les âmes.",
        Stunt2:
          "Voleur de cadavre: Lorsqu'une créature avec une âme meurt près de vous, vous pouvez prendre le contrôle de son corps pour le reste de la Scène en réussissant un jet de Volonté contre son âme (Maximum une fois par Scène).",
        EnlightenedAbility: false
      },
      {
        Domain: "Magie des âmes",
        Specialty: "Soulbinding",
        DomainDescription:
          "La magie des âmes regroupe des spécialisations permettant de manipuler les âmes de gré ou de force. Certaines spécialisations sont largement mal perçues par la communauté divine - comme la Nécromancie qui vole des âmes aux dieux - alors que d’autres sont considérées comme nécessaires.",
        SpecDescription:
          "Cette magie permet d’enfermer des âmes dans des objets pour les rendre plus puissants. C’est la magie utilisée par les liches pour créer des phylactères.",
        Effect1:
          "Infusez vos créations avec des âmes pour augmenter leur puissance.",
        Effect2: "Exploitez la puissance d'objets infusés par des âmes.",
        Stunt1:
          "Infuseur d'âme: Si vous possédez des âmes, vous pouvez créer l'Aspect \"Infusion d'âmes\" sur un objet que vous avez créé, pour un Point de Destin.",
        Stunt2:
          "Protophylactère : Lorsque vous mourrez, vous pouvez dépenser 2 utilisations de Magie des Âmes - Soulbinding. Votre âme revient dans un objet ayant une signification importante pour vous au bout de 666 heures",
        EnlightenedAbility: false
      },
      {
        Domain: "Magie des âmes",
        Specialty: "Shamanisme",
        DomainDescription:
          "La magie des âmes regroupe des spécialisations permettant de manipuler les âmes de gré ou de force. Certaines spécialisations sont largement mal perçues par la communauté divine - comme la Nécromancie qui vole des âmes aux dieux - alors que d’autres sont considérées comme nécessaires.",
        SpecDescription:
          "Cette magie permet d’entrer en communion avec les âmes pour leur demander aide et conseils.",
        Effect1: "Obtenez les conseils d'un ancien et sage esprit.",
        Effect2: "Puisez dans le pouvoir d'un lieu sacré et ancien.",
        Stunt1:
          "Intervention Ancestrale: Votre allié spirituel pour vous protéger d'une intrusion mentale. Une fois par session, vous gagnez +2 à votre jet de Défense contre une attaque mentale.",
        Stunt2:
          "La Sagesse de l'âge: Une fois par session, vous pouvez relancer un jet de Savoir gratuitement.",
        EnlightenedAbility: false
      },
      {
        Domain: "Magie des âmes",
        Specialty: "Chwal",
        DomainDescription:
          "La magie des âmes regroupe des spécialisations permettant de manipuler les âmes de gré ou de force. Certaines spécialisations sont largement mal perçues par la communauté divine - comme la Nécromancie qui vole des âmes aux dieux - alors que d’autres sont considérées comme nécessaires.",
        SpecDescription:
          "Cette magie permet de temporairement fusionner son âme avec une autre afin de prendre le contrôle de son corps. Elle est très utilisée par les dieux Loa lors des transes vaudous pour communiquer avec leurs croyants.",
        Effect1: "Contrôlez les actions d'un individu.",
        Effect2: "Arrêtez le mouvement d'un ennemi",
        Stunt1:
          "C'est lui Monsieur l’Agent !: Vous pouvez utiliser Chwal avec un bonus de +2 pour distraire quelqu'un.",
        Stunt2:
          "Ton Bras est Mien: Si vous faites une Réussite avec Style sur votre jet de Chwal contre la Volonté d'un individu, vous pouvez remplacer votre talent de Combat par le sien.",
        EnlightenedAbility: false
      },
      {
        Domain: "Magie des âmes",
        Specialty: "Envoûtement",
        DomainDescription:
          "La magie des âmes regroupe des spécialisations permettant de manipuler les âmes de gré ou de force. Certaines spécialisations sont largement mal perçues par la communauté divine - comme la Nécromancie qui vole des âmes aux dieux - alors que d’autres sont considérées comme nécessaires.",
        SpecDescription:
          "Cette magie est une forme plus douce de Chwal, où la fusion des âmes est moins prononcée et permet de percevoir les mêmes choses que sa cible (voir par ses yeux, entendre par ses oreilles, etc.). Elle a une plus longue portée.",
        Effect1: "Voyez à travers les yeux d'une cible.",
        Effect2: "Marquez et trouvez des gens.",
        Stunt1:
          "Vos yeux sont Miens: Vous pouvez créer l'Aspect \"Vos yeux sont miens\" sur une cible. Tant que cet aspect est actif, vous pouvez voir à travers ses yeux où qu'elle soit.",
        Stunt2:
          "Fondu dans la Foule: dans une foule, vous pouvez utiliser Chwal pour un jet de Perception avec un bonus de +3.",
        EnlightenedAbility: false
      },
      {
        Domain: "Enech",
        Specialty: "Enech",
        DomainDescription:
          "L’Enech est la magie des Voeux grâce à laquelle le personnage va se lier à une version idéale de lui-même à travers le Destin, un lien qui le récompensera tant qu’il suivra son Voeu mais qui pourra avoir des conséquences désastreuses dès que le personnage déviera ne serait-ce qu’un peu du chemin qu’il s’est tracé. Son but ultime est donc de devenir cette version idéale de lui-même. Posséder un Enech est définitif, il est impossible de s’en débarrasser. <br>Le joueur choisit un voeu dont il formule le concept à sa guise (voeu d’aventure, voeu de gloire, voeu de protection des faibles, de domination des mythborns etc.). Ce voeu est ensuite considéré en jeu comme un aspect figé (voir les Liens du Wyrd). Ainsi, un joueur acceptant la contrainte sur son voeu gagne 2 points de Destin mais s’il refuse il perd 2 points de Destin",
        SpecDescription: "",
        Effect1: "Gagnez l'Aspect d'Enech \"Protection des Innocents\"",
        Effect2: "Gagnez l'Aspect d'Enech “Foi de Zélote”",
        Stunt1:
          "Le Bouclier des Faibles: Lorsque vous acceptez une compulsion de “Protection des Innocents”, vous gagnez +1 en Physique pour le reste de la Scène.",
        Stunt2:
          "La Foi ne peut être Enchainée: Lorsque vous acceptez une contrainte de “Foi de Zélote”, votre prochaine attaque a un bonus de +2 en plus du gain des 2 points de Destin",
        EnlightenedAbility: false
      },
      {
        Domain: "Arcana",
        Specialty: "Inscriptions",
        DomainDescription:
          "Le domaine de l’Arcana réunit les magies ritualistiques. Leurs effets sont divers et variés mais toutes suivent le même fonctionnement général.<br>Lorsqu’il est au calme, un personnage maîtrisant une seule spécialité d’Arcana peut user d’une ou plusieurs utilisations de cette spécialité ainsi que d’une autre capacité active (appelée capacité canalisée) pour déclencher un rituel. Selon le nombre d’utilisation dépensées, le rituel devient de niveau 1, 2, 3, 4 ou 5 et prends une heure, six heures, une journée, une semaine, un mois (pour 1, 2, 3, 4 ou 5 utilisations).<br><i>Par exemple, un personnage peut réaliser un rituel de niveau 2 en combinant 2 utilisation de Feu - Destruction (capacité canalisée) et 2 utilisations d’Arcana-Rune. Celui-ci demandera 6 heures pour être canalisé.</i><br>L’Arcana est une extension de la légende du personnage et ne peut pas s’utiliser sans limite. Un personnage ne peut avoir d’actif qu’un nombre d’effets arcaniques égal à son niveau de légende. Par exemple, au niveau 2, un personnage ne peut être sous l’effet que d’un rituel d’Heku tout en ayant une Rune active. Il est possible de désactiver un des effets lorsqu’un autre est produit : le rituel se dissipe, la potion perd de sa puissance, la rune disparaît etc. Un rituel désactivé l’est de manière permanente.",
        SpecDescription:
          "Le personnage grave une inscription imbue de pouvoir sur un objet solide ou dessine une forme complexe sur un support fixe et créé un aspect sur cet objet lié à la capacité canalisée. Cet aspect normalement peut être invoqué normalement. De plus, le personnage peut décider d’invoquer cet aspect gratuitement. Ce faisant, il doit effectuer un jet de 4DF: si le résultat est supérieur ou égal au niveau du rituel, l’aspect disparaît.",
        Effect1:
          "Vous créez un tatouage en forme de dragon lié à Druidisme - Thériantropie (Dragon)",
        Effect2:
          "Vous mettez une rune Ordre - Loi sur une porte pour que seul ceux qui connaisse le mot secret puisse la déverrouiller",
        Stunt1:
          "Ecriture rapide : Une fois par session, un rituel d’Arcana - Inscriptions prends moitié moins de temps",
        Stunt2:
          "Rune Stable d’Invocation : Lorsque vous canalisez Druidisme - Mythcalling, vous pouvez relancer un dé lancé lorsque vous utilisez l’aspect gratuitement pour déterminer si l’aspect disparaît ou non.",
        EnlightenedAbility: false
      },
      {
        Domain: "Arcana",
        Specialty: "Heku",
        DomainDescription:
          "Le domaine de l’Arcana réunit les magies ritualistiques. Leurs effets sont divers et variés mais toutes suivent le même fonctionnement général.<br>Lorsqu’il est au calme, un personnage maîtrisant une seule spécialité d’Arcana peut user d’une ou plusieurs utilisations de cette spécialité ainsi que d’une autre capacité active (appelée capacité canalisée) pour déclencher un rituel. Selon le nombre d’utilisation dépensées, le rituel devient de niveau 1, 2, 3, 4 ou 5 et prends une heure, six heures, une journée, une semaine, un mois (pour 1, 2, 3, 4 ou 5 utilisations).<br><i>Par exemple, un personnage peut réaliser un rituel de niveau 2 en combinant 2 utilisation de Feu - Destruction (capacité canalisée) et 2 utilisations d’Arcana-Rune. Celui-ci demandera 6 heures pour être canalisé.</i><br>L’Arcana est une extension de la légende du personnage et ne peut pas s’utiliser sans limite. Un personnage ne peut avoir d’actif qu’un nombre d’effets arcaniques égal à son niveau de légende. Par exemple, au niveau 2, un personnage ne peut être sous l’effet que d’un rituel d’Heku tout en ayant une Rune active. Il est possible de désactiver un des effets lorsqu’un autre est produit : le rituel se dissipe, la potion perd de sa puissance, la rune disparaît etc. Un rituel désactivé l’est de manière permanente.",
        SpecDescription:
          "Le personnage psalmodie d’anciennes paroles de puissance qui l’associent à un domaine particulier. Il gagne immédiatement trois fois le niveau de rituel en utilisations de la capacité canalisée (il est possible de dépasser sa limite d’utilisations de la capacité canalisée de cette manière). Ces utilisations supplémentaires disparaissent après une période de temps égale à celle passée sur la canalisation du rituel.",
        Effect1:
          "Vous récitez une ancienne prière pour vous emplir de l’énergie de Shéol",
        Effect2:
          "Vous psalmodiez une prière à Hélios et laissez Lumière - Soleil vous traverser",
        Stunt1:
          "Prière Intérieure : Vous pouvez réaliser un rituel d’Arcana - Heku par session tout en faisant une activité simple (comme conduire, marcher, faire la conversation)",
        Stunt2:
          "Flamme contenue : Si vous canalisez Feu-Destruction avec Arcana-Heku, vous gagnez une utilisation de Feu-Destruction supplémentaire",
        EnlightenedAbility: false
      },
      {
        Domain: "Arcana",
        Specialty: "Alchimie",
        DomainDescription:
          "Le domaine de l’Arcana réunit les magies ritualistiques. Leurs effets sont divers et variés mais toutes suivent le même fonctionnement général.<br>Lorsqu’il est au calme, un personnage maîtrisant une seule spécialité d’Arcana peut user d’une ou plusieurs utilisations de cette spécialité ainsi que d’une autre capacité active (appelée capacité canalisée) pour déclencher un rituel. Selon le nombre d’utilisation dépensées, le rituel devient de niveau 1, 2, 3, 4 ou 5 et prends une heure, six heures, une journée, une semaine, un mois (pour 1, 2, 3, 4 ou 5 utilisations).<br><i>Par exemple, un personnage peut réaliser un rituel de niveau 2 en combinant 2 utilisation de Feu - Destruction (capacité canalisée) et 2 utilisations d’Arcana-Rune. Celui-ci demandera 6 heures pour être canalisé.</i><br>L’Arcana est une extension de la légende du personnage et ne peut pas s’utiliser sans limite. Un personnage ne peut avoir d’actif qu’un nombre d’effets arcaniques égal à son niveau de légende. Par exemple, au niveau 2, un personnage ne peut être sous l’effet que d’un rituel d’Heku tout en ayant une Rune active. Il est possible de désactiver un des effets lorsqu’un autre est produit : le rituel se dissipe, la potion perd de sa puissance, la rune disparaît etc. Un rituel désactivé l’est de manière permanente.",
        SpecDescription:
          "Le personnage créé une potion contenant l’essence de la capacité canalisée. Ingérer la potion génère un bonus ou un malus à une compétence en lien avec la capacité canalisée égal au niveau du rituel pendant une durée égale au niveau du rituel en heure. La compétence subissant le bonus ou le malus est à la discrétion du MJ selon les ingrédients utilisés.",
        Effect1: "Vous créez une potion de puissance herculéenne",
        Effect2: "Vous créez un baume de guérison des plaies",
        Stunt1:
          "Dénicheur : Vous pouvez, une fois par session, faire un jet de perception à une difficulté 6 dans une zone propice, sur une réussite vous trouvez un ingrédient",
        Stunt2:
          "Mini-Labo : En prenant une heure, vous pouvez à tout endroit trouver de quoi réaliser un rituel d’Arcana-Alchimie",
        EnlightenedAbility: false
      },
      {
        Domain: "La Voie du Milieu",
        Specialty: "La Voie du Milieu",
        DomainDescription:
          "Créée par Gautama Bouddha, cette magie permet d’extirper le soi de la Toile du Destin. Les liens du Destin avec tout autre entité sont reniés et le pratiquant de la Voie du Milieu peut ainsi ignorer les effets de la Légende sur lui. Cette magie est particulièrement utilisée pas l’Ordre du Poing de Jade",
        SpecDescription: "",
        Effect1:
          "Distancez-vous de la Réalité pour résister aux utilisations de Capacités Légendaires.",
        Effect2:
          "Projetez-vous dans votre Moi idéal pour augmenter vos capacités mentales",
        Stunt1:
          "L'Oeil de la Tempête: Vous n'obtenez des Liens du Destin que sur un 6 ou 7 dans un jet Légendaire.",
        Stunt2:
          "Pote à Bouddha: Une fois par Scène, vous pouvez créer l'aspect \"Méditation\". Cela vous rend vulnérable aux attaques, mais l'invoquer (y compris sans invocation gratuite) vous donne un bonus de +3 au lieu de +2.",
        EnlightenedAbility: true
      },
      {
        Domain: "Isfet",
        Specialty: "Isfet",
        DomainDescription:
          "Considérée comme la magie du vice et du mensonge par les dieux égyptiens, l’Isfet est une magie cherchant à prendre la Légende à contrepied en proposant un chemin pavé d’émotions et de pulsions à assouvir. L’Isfet fonctionne comme l’Enech en terme de gameplay. Toutefois, ce n’est pas un voeu que le personnage choisira, mais plus un vice (Menteur compulsif, Avarice décuplée, etc.). Cette magie est particulièrement utilisée par les Illuminati.",
        SpecDescription: "",
        Effect1: "Gagnez l'Aspect d'Isfet “Menteur Compulsif”",
        Effect2: "Gagnez l'Aspect d'Isfet “L'Avarice c'est Bon”",
        Stunt1:
          "Oh le Vilain Menteur : Lorsque vous acceptez une contrainte sur “Menteur Compulsif”, vous gagnez +4 à votre prochain jet d'attaque.",
        Stunt2:
          "Faites pleuvoir l'Oseille : Lorsque vous acceptez une contrainte sur “L'Avarice c'est Bon, vous gagnez +3 en Ressources pour le reste de la scéne.",
        EnlightenedAbility: true
      },
      {
        Domain: "Kannagara no Michi",
        Specialty: "Kannagara no Michi",
        DomainDescription:
          "Créée par Merlin, cette magie permet de réguler la Légende. C’est la magie du Concordat de Stonehenge empêchant les dieux de poser le pied sur le Monde. Grâce à elle, un adepte du Kannagara peut amplifier la Légende d’un pouvoir ou tout simplement l’annuler. Cette magie est particulièrement utilisée par le Cercle de Merlin et les Mythborns.",
        SpecDescription: "",
        Effect1:
          "Obtenez l'Aspect “Kami des Rivières”, vous permettant d'utiliser Eau - Vie grtuitement dans le D4 (Requiert Invocation: Eau - Vie)",
        Effect2:
          "Obtenez l'Aspect “Kami des Montagnes”, vous permettant d'utiliser Terre - Montagne gratuitement dans le D4 (Requiert Invocation: Terre - Montagne)",
        Stunt1: "Un avec les Kamis: Vous pouvez parler avec tous les Kamis",
        Stunt2:
          "Lié à la Nature: Vous réduisez le score de Liens du Destin que vous obtenez de 1.",
        EnlightenedAbility: true
      },
      {
        Domain: "Nihilisme",
        Specialty: "Nihilisme",
        DomainDescription:
          "Cette magie permet de renier l’existence de la Légende et du Destin en bloc. Elle permet de transformer le plus puissant des demi-dieux en un simple mortel incapable d’user de la Légende. Cette magie est particulièrement utilisée par la Cabale.",
        SpecDescription: "",
        Effect1:
          "Reniez l'existence de la Légende pour affaiblir les êtres Légendaires",
        Effect2:
          "Reposez-vous sur la raison pour vous défendre contre les attaques de Légende",
        Stunt1:
          "Etre ou ne pas Etre: Lorsque vous mettez à bas un Titanspawn mineur ou un mythborn, vous pouvez invoquer Nihilisme pour retirer leur existence de la réalité. Tous leurs Liens du Destin sont détruits.",
        Stunt2:
          "Tant que ça Saigne…: Lorsque vous infligez une Conséquence à un être de Légende, l'invocation gratuite de la Conséquence donne un bonus de +4.",
        EnlightenedAbility: true
      }
    ]
  }),
  metaInfo: {
    title: "Capacités légendaires",
    link: [
      {rel: "canonical", href: "https://wyrdwalkers.com/wiki/legendary-abilities"}
    ],
    meta:[
      {name: "description", content: "Le système de magie Wyrdwalkers"},
      {name: "keywords", content: "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons,wiki,magic,legend,légende,magie,pouvoirs,powers"},
      {name: "author", content: "Thomas Gely"},
      {property: "og:url", content: "https://wyrdwalkers.com/wiki/legendary-abilities"},
      {property: "og:type", content: "website"},
      {property: "og:description", content: "Les demi-dieux modèlent la réalité selon leur volonté. Découvrez leurs pouvoirs !"},
      {property: "og:image", content: "https://i.imgur.com/xSW0VL0.png"}
    ]
  }
});
</script>