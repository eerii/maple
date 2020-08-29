const PeninsulaIberica = {
    countries: ['ES', 'PT', 'AD'],
    languages: [
        {value: 'ES', label: 'Spanish (Español)'},
        {value: 'PT', label: 'Portuguese (Português)'},
        {value: 'GL', label: 'Galician (Galego)'},
        {value: 'CA', label: 'Catalan (Català)'},
        {value: 'EU', label: 'Basque (Euskera)'},
        {value: 'AN', label: 'Aragonese (Aragonés)'},
        {value: 'OC', label: `Occitan (Lenga d'òc)`},
    ]
}

const BritishIsles = {
    countries: ['IE', 'GB'],
    languages: [
        {value: 'EN', label: 'English'},
        {value: 'KW', label: 'Cornish (Kernewek)'},
        {value: 'GA', label: 'Irish (Gaeilge)'},
        {value: 'GD', label: 'Scottish Gaelic (Gàidhlig)'},
        {value: 'CY', label: 'Welsh (Cymraeg)'},
        {value: 'GV', label: 'Manx (Gaelg)'},
    ]
}

const WesternEurope = {
    countries: ['FR', 'NL', 'BE'],
    languages: [
        { value: 'FR', label: 'French (Français)' },
        { value: 'DE', label: 'German (Deutsch)' },
        { value: 'NL', label: 'Dutch (Nederlands)' },
        { value: 'FY', label: 'Western Frisian (Frysk)' },
    ]
}

const Mediterranean = {
    countries: ['IT', 'GR', 'CY', 'MT', 'SM', 'VA'],
    languages: [
        { value: 'IT', label: 'Italian (Italiano)' },
        { value: 'EL', label: 'Greek (ελληνικά)' },
        { value: 'TR', label: 'Turkish (Türkçe)' },
        { value: 'FR', label: 'French (Français)' },
        { value: 'DE', label: 'German (Deutsch)' },
        { value: 'SL', label: 'Slovenian (Slovenski Jezik)' },
        { value: 'SQ', label: 'Albanian (Shqip)' },
        { value: 'MT', label: 'Maltese (Malti)' },
    ]
}

const NorthernEurope = {
    countries: ['IS', 'NO', 'SE', 'FI', 'DK'],
    languages: [
        { value: 'IS', label: 'Icelandic (Íslenska)' },
        { value: 'NO', label: 'Norwegian (Norsk)' },
        { value: 'NN', label: 'Norwegian Nynorsk (Norsk Nynorsk)' },
        { value: 'NB', label: 'Norwegian Bokmål (Norsk Bokmål)' },
        { value: 'SV', label: 'Swedish (Svenska)' },
        { value: 'FI', label: 'Finnish (Suomi)' },
        { value: 'SE', label: 'Northern Sami (Davvisámegiella)' },
        { value: 'DA', label: 'Danish (Danks)' },
        { value: 'FO', label: 'Faroese (Føroyskt)' },
        { value: 'KL', label: 'Greenlandic (Kalaallisut)' },
    ]
}

const CentralEurope = {
    countries: ['CH', 'LU', 'DE', 'CZ', 'PL', 'SK', 'AT', 'SI', 'HR', 'HU', 'EE', 'LV', 'LT'],
    languages: [
        { value: 'FR', label: 'French (Français)' },
        { value: 'DE', label: 'German (Deutsch)' },
        { value: 'IT', label: 'Italian (Italiano)' },
        { value: 'RM', label: 'Romansh (Rumantsch Grischun)' },
        { value: 'LB', label: 'Luxembourgish (Lëtzebuergesch)' },
        { value: 'FY', label: 'Frisian (Frysk)' },
        { value: 'CS', label: 'Czech (Čeština)' },
        { value: 'SK', label: 'Slovak (Slovenčina)' },
        { value: 'PL', label: 'Polish (Język Polski)' },
        { value: 'HR', label: 'Croatian (Hrvatski Jezik)' },
        { value: 'HU', label: 'Hungarian (Magyarul)' },
        { value: 'SL', label: 'Slovenian (Slovenski Jezik)' },
        { value: 'ET', label: 'Estonian (Eesti)' },
        { value: 'LV', label: 'Latvian (Latviešu Valoda)' },
        { value: 'LT', label: 'Lithuanian (Lietuvių Kalba)' },
    ]
}

const EasternEurope = {
    countries: ['BY', 'UA', 'RU'],
    languages: [
        { value: 'RU', label: 'Russian (Pусский)' },
        { value: 'BE', label: 'Belarusian (беларуская мова)' },
        { value: 'UK', label: 'Ukrainian (Українська)' },
        { value: 'BA', label: 'Bashkir (башҡорт теле)' },
        { value: 'CE', label: 'Chechen (нохчийн мотт)' },
        { value: 'CV', label: 'Chuvash (чӑваш чӗлхи)' },
        { value: 'OS', label: 'Ossetian (ирон æвзаг)' },
        { value: 'TT', label: 'Tatar (татар теле)' },
        { value: 'DA', label: 'Danish (Danks)' },
    ]
}

//Moldova, Romania, Bosnia Herzegovina, Serbia, Bulgaria, Montenegro, Kosovo, Macedonia del Norte, Albania

const Global = {
    countries: [],
    languages: [
        {value: 'EN', label: 'English'},
        {value: 'ZH', label: 'Chinese (中文)'},
        {value: 'HI', label: 'Hindi (हिन्दी)'},
        {value: 'ES', label: 'Spanish (Español)'},
        {value: 'FR', label: 'French (Français)'},
        {value: 'AR', label: 'Arabic (العربية)'},
        {value: 'BN', label: 'Bengali (বাংলা)'},
        {value: 'RU', label: 'Russian (русский)'},
        {value: 'PT', label: 'Portuguese (Português)'},
        {value: 'ID', label: 'Indonesian (Bahasa Indonesia)'},
    ]
}

//const OldLanguages = []

const languageList = [
    {
        label: "Most Spoken Languages",
        options: Global.languages
    },
    {
        label: "Península Ibérica",
        options: PeninsulaIberica.languages
    },
    {
        label: "British Isles",
        options: BritishIsles.languages
    },
    {
        label: "Western Europe",
        options: WesternEurope.languages
    },
    {
        label: "Central Europe",
        options: CentralEurope.languages
    }
]

export { languageList }