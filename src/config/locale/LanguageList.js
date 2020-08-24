const PeninsulaIberica = [
    { value: 'ES', label: 'Spanish (Español)' },
    { value: 'PT', label: 'Portuguese (Português)' },
    { value: 'GL', label: 'Galician (Galego)' },
    { value: 'CA', label: 'Catalan (Català)' },
    { value: 'EU', label: 'Basque (Euskera)' },
    { value: 'AN', label: 'Aragonese (Aragonés)' },
    { value: 'OC', label: `Occitan (Lenga d'òc)` },
]

const BritishIsles = [
    { value: 'EN', label: 'English' },
    { value: 'KW', label: 'Cornish (Kernewek)' },
    { value: 'GA', label: 'Irish (Gaeilge)' },
    { value: 'GD', label: 'Scottish Gaelic (Gàidhlig)' },
    { value: 'CY', label: 'Welsh (Cymraeg)' },
    { value: 'GV', label: 'Manx (Gaelg)' },
]

const WesternEurope = [
    { value: 'FR', label: 'French (Français)' },
    { value: 'DE', label: 'German (Deutsch)' },
    { value: 'NL', label: 'Dutch (Nederlands)' },
    { value: 'FY', label: 'Western Frisian (Frysk)' },
]

//{ value: 'IT', label: 'Italian (Italiano)' },
//{ value: 'RM', label: 'Romansh (Rumantsch Grischun)' },
//{ value: 'LI', label: 'Limburgan (Limburgs)' },

const CentralEurope = [

]

const Global = [
    { value: 'EN', label: 'English' },
    { value: 'ZH', label: 'Chinese (中文)' },
    { value: 'HI', label: 'Hindi (हिन्दी)' },
    { value: 'ES', label: 'Spanish (Español)' },
    { value: 'FR', label: 'French (Français)' },
    { value: 'AR', label: 'Arabic (العربية)'},
    { value: 'BN', label: 'Bengali (বাংলা)' },
    { value: 'RU', label: 'Russian (русский)' },
    { value: 'PT', label: 'Portuguese (Português)' },
    { value: 'ID', label: 'Indonesian (Bahasa Indonesia)' },
]

//const OldLanguages = []

const languageList = [
    {
        label: "Most Spoken Languages",
        options: Global
    },
    {
        label: "Península Ibérica",
        options: PeninsulaIberica
    },
    {
        label: "British Isles",
        options: BritishIsles
    },
    {
        label: "Western Europe",
        options: WesternEurope
    },
    {
        label: "Central Europe",
        options: CentralEurope
    }
]

export { languageList }