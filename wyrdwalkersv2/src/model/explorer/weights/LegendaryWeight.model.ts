import GenericPoids from './GenericWeight.model';

export class LegendaryWeight {
    public druidGreen: GenericPoids;
    public druidTechno: GenericPoids;
    public druidTherianthropy: GenericPoids;
    public druidMythcalling: GenericPoids;
    public druidAugury: GenericPoids;
    public druidFeySummer: GenericPoids;
    public druidFeyWinter: GenericPoids;
    public hemaItztli: GenericPoids;
    public hemaYahuar: GenericPoids;
    public hemaRiastrad: GenericPoids;
    public hemaHaruspicy: GenericPoids;
    public wyrdMystery: GenericPoids;
    public wyrdProphecy: GenericPoids;
    public taiyiNature: GenericPoids;
    public taiyiFlow: GenericPoids;
    public physioStrength: GenericPoids;
    public physioToughness: GenericPoids;
    public physioSpeed: GenericPoids;
    public physioBeauty: GenericPoids;
    public physioUgly: GenericPoids;
    public physioPresence: GenericPoids;
    public physioEaring: GenericPoids;
    public physioTouch: GenericPoids;
    public physioSmell: GenericPoids;
    public physioTaste: GenericPoids;
    public physioSight: GenericPoids;
    public fireDestruction: GenericPoids;
    public fireStrife: GenericPoids;
    public fireInvention: GenericPoids;
    public fireMagma: GenericPoids;
    public fireDrought: GenericPoids;
    public fireLife: GenericPoids;
    public fireRetribution: GenericPoids;
    public fireStellar: GenericPoids;
    public waterProvider: GenericPoids;
    public waterLife: GenericPoids;
    public waterSea: GenericPoids;
    public waterHeal: GenericPoids;
    public lightBrightness: GenericPoids;
    public lightSun: GenericPoids;
    public lightIllumination: GenericPoids;
    public lightGlory: GenericPoids;
    public skyCalm: GenericPoids;
    public skyCataclysm: GenericPoids;
    public skyTempest: GenericPoids;
    public skyRain: GenericPoids;
    public skyLightning: GenericPoids;
    public skyWind: GenericPoids;
    public earthLife: GenericPoids;
    public earthStone: GenericPoids;
    public earthExpanse: GenericPoids;
    public earthNature: GenericPoids;
    public earthCataclysm: GenericPoids;
    public depthsUnderground: GenericPoids;
    public depthsDarkness: GenericPoids;
    public depthsAbyss: GenericPoids;
    public depthsRiches: GenericPoids;
    public depthsDecay: GenericPoids;
    public deathIneluctability: GenericPoids;
    public deathHorror: GenericPoids;
    public deathExtinction: GenericPoids;
    public deathJourney: GenericPoids;
    public deathPeace: GenericPoids;
    public deathCold: GenericPoids;
    public nightVeil: GenericPoids;
    public nightTerror: GenericPoids;
    public nightSleep: GenericPoids;
    public nightShadows: GenericPoids;
    public nightStars: GenericPoids;
    public nightVoid: GenericPoids;
    public nightMoon: GenericPoids;
    public orderLaw: GenericPoids;
    public orderKnowledge: GenericPoids;
    public orderControl: GenericPoids;
    public orderGravity: GenericPoids;
    public orderMusic: GenericPoids;
    public orderSelfless: GenericPoids;
    public soulNecromancy: GenericPoids;
    public soulSoulbinding: GenericPoids;
    public soulShamanism: GenericPoids;
    public soulChwal: GenericPoids;
    public soulHaunting: GenericPoids;
    public enech: GenericPoids;
    public arcanaCarvings: GenericPoids;
    public arcanaHeku: GenericPoids;
    public arcanaAlchemy: GenericPoids;
    public middleWay: GenericPoids;
    public isfet: GenericPoids;
    public kannagara: GenericPoids;
    public nihilism: GenericPoids;

    constructor(){
        this.druidGreen = new GenericPoids('druidGreen', 'Druidisme - Druidisme Vert', 'Druidism - Green Druid');
        this.druidTechno = new GenericPoids('druidTechno', 'Druidisme - Technodruidisme', 'Druidism - Technodruidism');
        this.druidTherianthropy = new GenericPoids('druidTherianthropy', 'Druidisme - Thériantropie', 'Druidism - Therianthropy');
        this.druidMythcalling = new GenericPoids('druidMythcalling', 'Druidisme - Mythcalling', 'Druidism - Mythcalling');
        this.druidAugury = new GenericPoids('druidAugury', 'Druidisme - Augure', 'Druidism - Augury');
        this.druidFeySummer = new GenericPoids('druidFeySummer', 'Druidisme - Sorcellerie Fey (Eté)', 'Druidism - Fey Sorcery (Summer)');
        this.druidFeyWinter = new GenericPoids('druidFeyWinter', 'Druidisme - Sorcellerie Fey (Hiver)', 'Druidism - Fey Sorcery (Winter)');
        this.hemaItztli = new GenericPoids('hemaItztli', 'Hématurgie - Itztli', 'Hematurgy - Itztli');
        this.hemaYahuar = new GenericPoids('hemaYahuar', 'Hématurgie - Yahuar', 'Hematurgy - Yahuar');
        this.hemaRiastrad = new GenericPoids('hemaRiastrad', 'Hématurgie - Riastrad', 'Hematurgy - Riastrad');
        this.hemaHaruspicy = new GenericPoids('hemaHaruspicy', 'Hématurgie - Haruspicines', 'Hematurgy - Haruspicy');
        this.wyrdMystery = new GenericPoids('wyrdMystery', 'Vision du Wyrd - Mystère', 'Wyrdseeing - Mystery');
        this.wyrdProphecy = new GenericPoids('wyrdProphecy', 'Vision du Wyrd - Prophétie', 'Vision du Wyrd - Prophecy');
        this.taiyiNature = new GenericPoids('taiyiNature', 'Taiyi - Nature', 'Taiyi - Nature');
        this.taiyiFlow = new GenericPoids('taiyiFlow', 'Taiyi - Flot', 'Taiyi - Flow');
        this.physioStrength = new GenericPoids('physioStrength', 'Physiologie Epique - Force', 'Epic Physiology - Strength');
        this.physioToughness = new GenericPoids('physioToughness', 'Physiologie Epique - Constitution', 'Epic Physiology - Toughness');
        this.physioSpeed = new GenericPoids('physioSpeed', 'Physiologie Epique - Vitesse', 'Epic Physiology - Speed');
        this.physioBeauty = new GenericPoids('physioBeauty', 'Physiologie Epique - Beauté', 'Epic Physiology - Beauty');
        this.physioUgly = new GenericPoids('physioUgly', 'Physiologie Epique - Laideur', 'Epic Physiology - Ugliness');
        this.physioPresence = new GenericPoids('physioPresence', 'Physiologie Epique - Présence', 'Epic Physiology - Presence');
        this.physioEaring = new GenericPoids('physioEaring', 'Physiologie Epique - Ouïe', 'Epic Physiology - Earing');
        this.physioSmell = new GenericPoids('physioSmell', 'Physiologie Epique - Odorat', 'Epic Physiology - Smell');
        this.physioTouch = new GenericPoids('physioTouch', 'Physiologie Epique - Toucher', 'Epic Physiology - Touch');
        this.physioTaste = new GenericPoids('physioTaste', 'Physiologie Epique - Goût', 'Epic Physiology - Taste');
        this.physioSight = new GenericPoids('physioSight', 'Physiologie Epique - Vue', 'Epic Physiology - Sight');
        this.fireDestruction = new GenericPoids('fireDestruction', 'Invocation : Feu - Destruction', 'Invokation : Fire - Destruction');
        this.fireStrife = new GenericPoids('fireStrife', 'Invocation : Feu - Discorde', 'Invokation : Fire - Strife');
        this.fireInvention = new GenericPoids('fireInvention', 'Invocation : Feu - Invention', 'Invokation : Fire - Invention');
        this.fireMagma = new GenericPoids('fireMagma', 'Invocation : Feu - Magma', 'Invokation : Fire - Magma');
        this.fireDrought = new GenericPoids('fireDrought', 'Invocation : Feu - Sécheresse', 'Invokation : Fire - Drought');
        this.fireLife = new GenericPoids('fireLife', 'Invocation : Feu - Vie', 'Invokation : Fire - Life');
        this.fireRetribution = new GenericPoids('fireRetribution', 'Invocation : Feu - Rétribution Divine', 'Invokation : Fire - Divine Retribution');
        this.fireStellar = new GenericPoids('fireStellar', 'Invocation : Feu - Feu Stellaire', 'Invokation : Fire - Stellar Fire');
        this.waterProvider = new GenericPoids('waterProvider', 'Invocation : Eau - Pourvoyeuse', 'Invokation : Water - Provider');
        this.waterLife = new GenericPoids('waterLife', 'Invocation : Eau - Vie', 'Invokation : Water - Life');
        this.waterSea = new GenericPoids('waterSea', 'Invocation : Eau - Mer Déchainée', 'Invokation : Water - Enraged Sea');
        this.waterHeal = new GenericPoids('waterHeal', 'Invocation : Eau - Soin', 'Invokation : Water - Healing');
        this.lightBrightness = new GenericPoids('lightBrightness', 'Invocation : Lumière - Brillance', 'Invokation : Light - Brightness');
        this.lightSun = new GenericPoids('lightSun', 'Invocation : Lumière - Soleil', 'Invokation : Light - Sun');
        this.lightIllumination = new GenericPoids('lightIllumination', 'Invocation : Lumière - Illumination', 'Invokation : Light - Illumination');
        this.lightGlory = new GenericPoids('lightGlory', 'Invocation : Lumière - Gloire', 'Invokation : Light - Glory');
        this.skyCalm = new GenericPoids('skyCalm', 'Invocation : Ciel - Calme', 'Invokation : Sky - Calm');
        this.skyCataclysm = new GenericPoids('skyCataclysm', 'Invocation : Ciel - Cataclysme', 'Invokation : Sky - Cataclysm');
        this.skyTempest = new GenericPoids('skyTempest', 'Invocation : Ciel - Tempête', 'Invokation : Sky - Tempest');
        this.skyRain = new GenericPoids('skyRain', 'Invocation : Ciel - Pluie', 'Invokation : Sky - Rain');
        this.skyLightning = new GenericPoids('skyLightning', 'Invocation : Ciel - Foudre', 'Invokation : Sky - Lightning');
        this.skyWind = new GenericPoids('skyWind', 'Invocation : Ciel - Vent', 'Invokation : Sky - Wind');
        this.earthLife = new GenericPoids('earthLife', 'Invocation : Terre - Vie', 'Invokation : Earth - Life');
        this.earthStone = new GenericPoids('earthStone', 'Invocation : Terre - Roche', 'Invokation : Earth - Stone');
        this.earthExpanse = new GenericPoids('earthExpanse', 'Invocation : Terre - Etendue', 'Invokation : Earth - Expanse');
        this.earthNature = new GenericPoids('earthNature', 'Invocation : Terre - Nature', 'Invokation : Earth - Nature');
        this.earthCataclysm = new GenericPoids('earthCataclysm', 'Invocation : Terre - Cataclysme', 'Invokation : Earth - Cataclysm');
        this.depthsUnderground = new GenericPoids('depthsUnderground', 'Invocation : Profondeur - Cavernes', 'Invokation : Depths - Underground');
        this.depthsDarkness = new GenericPoids('depthsDarkness', 'Invocation : Profondeur - Obscurité', 'Invokation : Depths - Darkness');
        this.depthsAbyss = new GenericPoids('depthsAbyss', 'Invocation : Profondeur - Abysses', 'Invokation : Depths - Abyss');
        this.depthsRiches = new GenericPoids('depthsRiches', 'Invocation : Profondeur - Richesses', 'Invokation : Depths - Riches');
        this.depthsDecay = new GenericPoids('depthsDecay', 'Invocation : Profondeur - Décomposition', 'Invokation : Depths - Decay');
        this.deathIneluctability = new GenericPoids('deathIneluctability', 'Invocation : Mort - Inéluctabilité', 'Invokation : Death - Inevitability');
        this.deathHorror = new GenericPoids('deathHorror', 'Invocation : Mort - Horreur', 'Invokation : Death - Horror');
        this.deathExtinction = new GenericPoids('deathExtinction', 'Invocation : Mort - Extinction', 'Invokation : Death - Extinction');
        this.deathJourney = new GenericPoids('deathJourney', 'Invocation : Mort - Voyage', 'Invokation : Death - Journey');
        this.deathPeace = new GenericPoids('deathPeace', 'Invocation : Mort - Paix', 'Invokation : Death - Peace');
        this.deathCold = new GenericPoids('deathCold', 'Invocation : Mort - Froid', 'Invokation : Death - Cold');
        this.nightVeil = new GenericPoids('nightVeil', 'Invocation : Nuit - Voile', 'Invokation : Night - Veil');
        this.nightTerror = new GenericPoids('nightTerror', 'Invocation : Nuit - Terreur', 'Invokation : Night - Terror');
        this.nightSleep = new GenericPoids('nightSleep', 'Invocation : Nuit - Sommeil', 'Invokation : Night - Sleep');
        this.nightShadows = new GenericPoids('nightShadows', 'Invocation : Nuit - Ombres', 'Invokation : Night - Shadows');
        this.nightStars = new GenericPoids('nightStars', 'Invocation : Nuit - Etoiles', 'Invokation : Night - Stars');
        this.nightVoid = new GenericPoids('nightVoid', 'Invocation : Nuit - Néant', 'Invokation : Night - Void');
        this.nightMoon = new GenericPoids('nightMoon', 'Invocation : Nuit - Lune', 'Invokation : Night - Moon');
        this.orderLaw = new GenericPoids('orderLaw', 'Invocation : Ordre - Loi', 'Invokation : Order - Law');
        this.orderKnowledge = new GenericPoids('orderKnowledge', 'Invocation : Ordre - Savoir', 'Invokation : Order - Savoir');
        this.orderControl = new GenericPoids('orderControl', 'Invocation : Ordre - Contrôle', 'Invokation : Order - Control');
        this.orderGravity = new GenericPoids('orderGravity', 'Invocation : Ordre - Gravité', 'Invokation : Order - Gravity');
        this.orderMusic = new GenericPoids('orderMusic', 'Invocation : Ordre - Musique', 'Invokation : Order - Music');
        this.orderSelfless = new GenericPoids('orderSelfless', 'Invocation : Ordre - Abnégation', 'Invokation : Order - Selflessness');
        this.soulNecromancy = new GenericPoids('soulNecromancy', 'Invocation : Magie des âmes - Nécromancie', 'Spiritwalking - Necromancy');
        this.soulSoulbinding = new GenericPoids('soulSoulbinding', 'Invocation : Magie des âmes - Soulbinding', 'Spiritwalking - Soulbinding');
        this.soulShamanism = new GenericPoids('soulShamanism', 'Invocation : Magie des âmes - Shamanisme', 'Spiritwalking - Shamanism');
        this.soulChwal = new GenericPoids('soulChwal', 'Invocation : Magie des âmes - Chwal', 'Spiritwalking - Chwal');
        this.soulHaunting = new GenericPoids('soulHaunting', 'Invocation : Magie des âmes - Envoûtement', 'Spiritwalking - Haunting');
        this.enech = new GenericPoids('enech', 'Enech', 'Enech');
        this.arcanaCarvings = new GenericPoids('arcanaCarvings', 'Arcana - Inscriptions', 'Arcana - Carvings');
        this.arcanaHeku = new GenericPoids('arcanaHeku', 'Arcana - Heku', 'Arcana - Heku');
        this.arcanaAlchemy = new GenericPoids('arcanaAlchemy', 'Arcana - Alchimie', 'Arcana - Alchemy');
        this.middleWay = new GenericPoids('middleWay', 'La Voie du Milieu', 'The Middle Way');
        this.isfet = new GenericPoids('isfet', 'Isfet', 'Isfet');
        this.kannagara = new GenericPoids('kannagara', 'Kannagara no Michi', 'Kannagara no Michi');
        this.nihilism = new GenericPoids('nihilism', 'Nihilisme', 'Nihilism');
    }
}