// The list of countries is extracted from the Wikipedia article "List of countries and dependent territories by Internet country code top-level domain".
const TLDs = [
    [
        {
            'Name': 'ac',
            'Entity': 'Ascension Island (United Kingdom)'
        },
        {
            'Name': 'ad',
            'Entity': 'Andorra'
        },
        {
            'Name': 'ae',
            'Entity': 'United Arab Emirates'
        },
        {
            'Name': 'af',
            'Entity': 'Afghanistan'
        },
        {
            'Name': 'ag',
            'Entity': 'Antigua and Barbuda'
        },
        {
            'Name': 'ai',
            'Entity': 'Anguilla (United Kingdom)'
        },
        {
            'Name': 'al',
            'Entity': 'Albania'
        },
        {
            'Name': 'am',
            'Entity': 'Armenia'
        },
        {
            'Name': 'ao',
            'Entity': 'Angola'
        },
        {
            'Name': 'aq',
            'Entity': 'Antarctica'
        },
        {
            'Name': 'ar',
            'Entity': 'Argentina'
        },
        {
            'Name': 'as',
            'Entity': 'American Samoa (United States)'
        },
        {
            'Name': 'at',
            'Entity': 'Austria'
        },
        {
            'Name': 'au',
            'Entity': 'Australia'
        },
        {
            'Name': 'aw',
            'Entity': 'Aruba (Kingdom of the Netherlands)'
        },
        {
            'Name': 'ax',
            'Entity': 'Åland (Finland)'
        },
        {
            'Name': 'az',
            'Entity': 'Azerbaijan'
        },
        {
            'Name': 'ba',
            'Entity': 'Bosnia and Herzegovina'
        },
        {
            'Name': 'bb',
            'Entity': 'Barbados'
        },
        {
            'Name': 'bd',
            'Entity': 'Bangladesh'
        },
        {
            'Name': 'be',
            'Entity': 'Belgium'
        },
        {
            'Name': 'bf',
            'Entity': 'Burkina Faso'
        },
        {
            'Name': 'bg',
            'Entity': 'Bulgaria'
        },
        {
            'Name': 'bh',
            'Entity': 'Bahrain'
        },
        {
            'Name': 'bi',
            'Entity': 'Burundi'
        },
        {
            'Name': 'bj',
            'Entity': 'Benin'
        },
        {
            'Name': 'bm',
            'Entity': 'Bermuda (United Kingdom)'
        },
        {
            'Name': 'bn',
            'Entity': 'Brunei'
        },
        {
            'Name': 'bo',
            'Entity': 'Bolivia'
        },
        {
            'Name': 'bq',
            'Entity': 'Caribbean Netherlands ( Bonaire'
        },
        {
            'Name': 'br',
            'Entity': 'Brazil'
        },
        {
            'Name': 'bs',
            'Entity': 'Bahamas'
        },
        {
            'Name': 'bt',
            'Entity': 'Bhutan'
        },
        {
            'Name': 'bw',
            'Entity': 'Botswana'
        },
        {
            'Name': 'by',
            'Entity': 'Belarus'
        },
        {
            'Name': 'bz',
            'Entity': 'Belize'
        },
        {
            'Name': 'ca',
            'Entity': 'Canada'
        },
        {
            'Name': 'cc',
            'Entity': 'Cocos (Keeling) Islands'
        },
        {
            'Name': 'cd',
            'Entity': 'Democratic Republic of the Congo'
        },
        {
            'Name': 'cf',
            'Entity': 'Central African Republic'
        },
        {
            'Name': 'cg',
            'Entity': 'Republic of the Congo'
        },
        {
            'Name': 'ch',
            'Entity': 'Switzerland'
        },
        {
            'Name': 'ci',
            'Entity': 'Ivory Coast'
        },
        {
            'Name': 'ck',
            'Entity': 'Cook Islands'
        },
        {
            'Name': 'cl',
            'Entity': 'Chile'
        },
        {
            'Name': 'cm',
            'Entity': 'Cameroon'
        },
        {
            'Name': 'cn',
            'Entity': "People's Republic of China"
        },
        {
            'Name': 'co',
            'Entity': 'Colombia'
        },
        {
            'Name': 'cr',
            'Entity': 'Costa Rica'
        },
        {
            'Name': 'cu',
            'Entity': 'Cuba'
        },
        {
            'Name': 'cv',
            'Entity': 'Cape Verde'
        },
        {
            'Name': 'cw',
            'Entity': 'Curaçao (Kingdom of the Netherlands)'
        },
        {
            'Name': 'cx',
            'Entity': 'Christmas Island'
        },
        {
            'Name': 'cy',
            'Entity': 'Cyprus'
        },
        {
            'Name': 'cz',
            'Entity': 'Czech Republic'
        },
        {
            'Name': 'de',
            'Entity': 'Germany'
        },
        {
            'Name': 'dj',
            'Entity': 'Djibouti'
        },
        {
            'Name': 'dk',
            'Entity': 'Denmark'
        },
        {
            'Name': 'dm',
            'Entity': 'Dominica'
        },
        {
            'Name': 'do',
            'Entity': 'Dominican Republic'
        },
        {
            'Name': 'dz',
            'Entity': 'Algeria'
        },
        {
            'Name': 'ec',
            'Entity': 'Ecuador'
        },
        {
            'Name': 'ee',
            'Entity': 'Estonia'
        },
        {
            'Name': 'eg',
            'Entity': 'Egypt'
        },
        {
            'Name': 'eh',
            'Entity': 'Western Sahara'
        },
        {
            'Name': 'er',
            'Entity': 'Eritrea'
        },
        {
            'Name': 'es',
            'Entity': 'Spain'
        },
        {
            'Name': 'et',
            'Entity': 'Ethiopia'
        },
        {
            'Name': 'fi',
            'Entity': 'Finland'
        },
        {
            'Name': 'fj',
            'Entity': 'Fiji'
        },
        {
            'Name': 'fk',
            'Entity': 'Falkland Islands (United Kingdom)'
        },
        {
            'Name': 'fm',
            'Entity': 'Federated States of Micronesia'
        },
        {
            'Name': 'fo',
            'Entity': 'Faroe Islands (Kingdom of Denmark)'
        },
        {
            'Name': 'fr',
            'Entity': 'France'
        },
        {
            'Name': 'ga',
            'Entity': 'Gabon'
        },
        {
            'Name': 'gd',
            'Entity': 'Grenada'
        },
        {
            'Name': 'ge',
            'Entity': 'Georgia'
        },
        {
            'Name': 'gf',
            'Entity': 'French Guiana (France)'
        },
        {
            'Name': 'gg',
            'Entity': 'Guernsey'
        },
        {
            'Name': 'gh',
            'Entity': 'Ghana'
        },
        {
            'Name': 'gi',
            'Entity': 'Gibraltar (United Kingdom)'
        },
        {
            'Name': 'gl',
            'Entity': 'Greenland (Kingdom of Denmark)'
        },
        {
            'Name': 'gm',
            'Entity': 'The Gambia'
        },
        {
            'Name': 'gn',
            'Entity': 'Guinea'
        },
        {
            'Name': 'gp',
            'Entity': 'Guadeloupe (France)'
        },
        {
            'Name': 'gq',
            'Entity': 'Equatorial Guinea'
        },
        {
            'Name': 'gr',
            'Entity': 'Greece'
        },
        {
            'Name': 'gs',
            'Entity': 'South Georgia and the South Sandwich Islands (United Kingdom)'
        },
        {
            'Name': 'gt',
            'Entity': 'Guatemala'
        },
        {
            'Name': 'gu',
            'Entity': 'Guam (United States)'
        },
        {
            'Name': 'gw',
            'Entity': 'Guinea-Bissau'
        },
        {
            'Name': 'gy',
            'Entity': 'Guyana'
        },
        {
            'Name': 'hk',
            'Entity': 'Hong Kong'
        },
        {
            'Name': 'hm',
            'Entity': 'Heard Island and McDonald Islands'
        },
        {
            'Name': 'hn',
            'Entity': 'Honduras'
        },
        {
            'Name': 'hr',
            'Entity': 'Croatia'
        },
        {
            'Name': 'ht',
            'Entity': 'Haiti'
        },
        {
            'Name': 'hu',
            'Entity': 'Hungary'
        },
        {
            'Name': 'id',
            'Entity': 'Indonesia'
        },
        {
            'Name': 'ie',
            'Entity': 'Ireland'
        },
        {
            'Name': 'il',
            'Entity': 'Israel'
        },
        {
            'Name': 'im',
            'Entity': 'Isle of Man'
        },
        {
            'Name': 'in',
            'Entity': 'India'
        },
        {
            'Name': 'io',
            'Entity': 'British Indian Ocean Territory (United Kingdom)'
        },
        {
            'Name': 'iq',
            'Entity': 'Iraq'
        },
        {
            'Name': 'ir',
            'Entity': 'Iran'
        },
        {
            'Name': 'is',
            'Entity': 'Iceland'
        },
        {
            'Name': 'it',
            'Entity': 'Italy'
        },
        {
            'Name': 'je',
            'Entity': 'Jersey'
        },
        {
            'Name': 'jm',
            'Entity': 'Jamaica'
        },
        {
            'Name': 'jo',
            'Entity': 'Jordan'
        },
        {
            'Name': 'jp',
            'Entity': 'Japan'
        },
        {
            'Name': 'ke',
            'Entity': 'Kenya'
        },
        {
            'Name': 'kg',
            'Entity': 'Kyrgyzstan'
        },
        {
            'Name': 'kh',
            'Entity': 'Cambodia'
        },
        {
            'Name': 'ki',
            'Entity': 'Kiribati'
        },
        {
            'Name': 'km',
            'Entity': 'Comoros'
        },
        {
            'Name': 'kn',
            'Entity': 'Saint Kitts and Nevis'
        },
        {
            'Name': 'kp',
            'Entity': 'North Korea'
        },
        {
            'Name': 'kr',
            'Entity': 'South Korea'
        },
        {
            'Name': 'kw',
            'Entity': 'Kuwait'
        },
        {
            'Name': 'ky',
            'Entity': 'Cayman Islands (United Kingdom)'
        },
        {
            'Name': 'kz',
            'Entity': 'Kazakhstan'
        },
        {
            'Name': 'la',
            'Entity': 'Laos'
        },
        {
            'Name': 'lb',
            'Entity': 'Lebanon'
        },
        {
            'Name': 'lc',
            'Entity': 'Saint Lucia'
        },
        {
            'Name': 'li',
            'Entity': 'Liechtenstein'
        },
        {
            'Name': 'lk',
            'Entity': 'Sri Lanka'
        },
        {
            'Name': 'lr',
            'Entity': 'Liberia'
        },
        {
            'Name': 'ls',
            'Entity': 'Lesotho'
        },
        {
            'Name': 'lt',
            'Entity': 'Lithuania'
        },
        {
            'Name': 'lu',
            'Entity': 'Luxembourg'
        },
        {
            'Name': 'lv',
            'Entity': 'Latvia'
        },
        {
            'Name': 'ly',
            'Entity': 'Libya'
        },
        {
            'Name': 'ma',
            'Entity': 'Morocco'
        },
        {
            'Name': 'mc',
            'Entity': 'Monaco'
        },
        {
            'Name': 'md',
            'Entity': 'Moldova'
        },
        {
            'Name': 'me',
            'Entity': 'Montenegro'
        },
        {
            'Name': 'mg',
            'Entity': 'Madagascar'
        },
        {
            'Name': 'mh',
            'Entity': 'Marshall Islands'
        },
        {
            'Name': 'mk',
            'Entity': 'North Macedonia'
        },
        {
            'Name': 'ml',
            'Entity': 'Mali'
        },
        {
            'Name': 'mm',
            'Entity': 'Myanmar'
        },
        {
            'Name': 'mn',
            'Entity': 'Mongolia'
        },
        {
            'Name': 'mo',
            'Entity': 'Macau'
        },
        {
            'Name': 'mp',
            'Entity': 'Northern Mariana Islands (United States)'
        },
        {
            'Name': 'mq',
            'Entity': 'Martinique (France)'
        },
        {
            'Name': 'mr',
            'Entity': 'Mauritania'
        },
        {
            'Name': 'ms',
            'Entity': 'Montserrat (United Kingdom)'
        },
        {
            'Name': 'mt',
            'Entity': 'Malta'
        },
        {
            'Name': 'mu',
            'Entity': 'Mauritius'
        },
        {
            'Name': 'mv',
            'Entity': 'Maldives'
        },
        {
            'Name': 'mw',
            'Entity': 'Malawi'
        },
        {
            'Name': 'mx',
            'Entity': 'Mexico'
        },
        {
            'Name': 'my',
            'Entity': 'Malaysia'
        },
        {
            'Name': 'mz',
            'Entity': 'Mozambique'
        },
        {
            'Name': 'na',
            'Entity': 'Namibia'
        },
        {
            'Name': 'nc',
            'Entity': 'New Caledonia (France)'
        },
        {
            'Name': 'ne',
            'Entity': 'Niger'
        },
        {
            'Name': 'nf',
            'Entity': 'Norfolk Island'
        },
        {
            'Name': 'ng',
            'Entity': 'Nigeria'
        },
        {
            'Name': 'ni',
            'Entity': 'Nicaragua'
        },
        {
            'Name': 'nl',
            'Entity': 'Netherlands'
        },
        {
            'Name': 'no',
            'Entity': 'Norway'
        },
        {
            'Name': 'np',
            'Entity': 'Nepal'
        },
        {
            'Name': 'nr',
            'Entity': 'Nauru'
        },
        {
            'Name': 'nu',
            'Entity': 'Niue'
        },
        {
            'Name': 'nz',
            'Entity': 'New Zealand'
        },
        {
            'Name': 'om',
            'Entity': 'Oman'
        },
        {
            'Name': 'pa',
            'Entity': 'Panama'
        },
        {
            'Name': 'pe',
            'Entity': 'Peru'
        },
        {
            'Name': 'pf',
            'Entity': 'French Polynesia (France)'
        },
        {
            'Name': 'pg',
            'Entity': 'Papua New Guinea'
        },
        {
            'Name': 'ph',
            'Entity': 'Philippines'
        },
        {
            'Name': 'pk',
            'Entity': 'Pakistan'
        },
        {
            'Name': 'pl',
            'Entity': 'Poland'
        },
        {
            'Name': 'pm',
            'Entity': 'Saint-Pierre and Miquelon (France)'
        },
        {
            'Name': 'pn',
            'Entity': 'Pitcairn Islands (United Kingdom)'
        },
        {
            'Name': 'pr',
            'Entity': 'Puerto Rico (United States)'
        },
        {
            'Name': 'ps',
            'Entity': 'Palestine[53]'
        },
        {
            'Name': 'pt',
            'Entity': 'Portugal'
        },
        {
            'Name': 'pw',
            'Entity': 'Palau'
        },
        {
            'Name': 'py',
            'Entity': 'Paraguay'
        },
        {
            'Name': 'qa',
            'Entity': 'Qatar'
        },
        {
            'Name': 're',
            'Entity': 'Réunion (France)'
        },
        {
            'Name': 'ro',
            'Entity': 'Romania'
        },
        {
            'Name': 'rs',
            'Entity': 'Serbia'
        },
        {
            'Name': 'ru',
            'Entity': 'Russia'
        },
        {
            'Name': 'rw',
            'Entity': 'Rwanda'
        },
        {
            'Name': 'sa',
            'Entity': 'Saudi Arabia'
        },
        {
            'Name': 'sb',
            'Entity': 'Solomon Islands'
        },
        {
            'Name': 'sc',
            'Entity': 'Seychelles'
        },
        {
            'Name': 'sd',
            'Entity': 'Sudan'
        },
        {
            'Name': 'se',
            'Entity': 'Sweden'
        },
        {
            'Name': 'sg',
            'Entity': 'Singapore'
        },
        {
            'Name': 'sh',
            'Entity': 'Saint Helena'
        },
        {
            'Name': 'si',
            'Entity': 'Slovenia'
        },
        {
            'Name': 'sk',
            'Entity': 'Slovakia'
        },
        {
            'Name': 'sl',
            'Entity': 'Sierra Leone'
        },
        {
            'Name': 'sm',
            'Entity': 'San Marino'
        },
        {
            'Name': 'sn',
            'Entity': 'Senegal'
        },
        {
            'Name': 'so',
            'Entity': 'Somalia'
        },
        {
            'Name': 'sr',
            'Entity': 'Suriname'
        },
        {
            'Name': 'ss',
            'Entity': 'South Sudan'
        },
        {
            'Name': 'st',
            'Entity': 'São Tomé and Príncipe'
        },
        {
            'Name': 'su',
            'Entity': 'Soviet Union'
        },
        {
            'Name': 'sv',
            'Entity': 'El Salvador'
        },
        {
            'Name': 'sx',
            'Entity': 'Sint Maarten (Kingdom of the Netherlands)'
        },
        {
            'Name': 'sy',
            'Entity': 'Syria'
        },
        {
            'Name': 'sz',
            'Entity': 'Eswatini'
        },
        {
            'Name': 'tc',
            'Entity': 'Turks and Caicos Islands (United Kingdom)'
        },
        {
            'Name': 'td',
            'Entity': 'Chad'
        },
        {
            'Name': 'tf',
            'Entity': 'French Southern and Antarctic Lands'
        },
        {
            'Name': 'tg',
            'Entity': 'Togo'
        },
        {
            'Name': 'th',
            'Entity': 'Thailand'
        },
        {
            'Name': 'tj',
            'Entity': 'Tajikistan'
        },
        {
            'Name': 'tk',
            'Entity': 'Tokelau'
        },
        {
            'Name': 'tl',
            'Entity': 'East Timor'
        },
        {
            'Name': 'tm',
            'Entity': 'Turkmenistan'
        },
        {
            'Name': 'tn',
            'Entity': 'Tunisia'
        },
        {
            'Name': 'to',
            'Entity': 'Tonga'
        },
        {
            'Name': 'tr',
            'Entity': 'Turkey'
        },
        {
            'Name': 'tt',
            'Entity': 'Trinidad and Tobago'
        },
        {
            'Name': 'tv',
            'Entity': 'Tuvalu'
        },
        {
            'Name': 'tw',
            'Entity': 'Taiwan'
        },
        {
            'Name': 'tz',
            'Entity': 'Tanzania'
        },
        {
            'Name': 'ua',
            'Entity': 'Ukraine'
        },
        {
            'Name': 'ug',
            'Entity': 'Uganda'
        },
        {
            'Name': 'uk',
            'Entity': 'United Kingdom'
        },
        {
            'Name': 'us',
            'Entity': 'United States of America'
        },
        {
            'Name': 'uy',
            'Entity': 'Uruguay'
        },
        {
            'Name': 'uz',
            'Entity': 'Uzbekistan'
        },
        {
            'Name': 'va',
            'Entity': 'Vatican City'
        },
        {
            'Name': 'vc',
            'Entity': 'Saint Vincent and the Grenadines'
        },
        {
            'Name': 've',
            'Entity': 'Venezuela'
        },
        {
            'Name': 'vg',
            'Entity': 'British Virgin Islands (United Kingdom)'
        },
        {
            'Name': 'vi',
            'Entity': 'United States Virgin Islands (United States)'
        },
        {
            'Name': 'vn',
            'Entity': 'Vietnam'
        },
        {
            'Name': 'vu',
            'Entity': 'Vanuatu'
        },
        {
            'Name': 'wf',
            'Entity': 'Wallis and Futuna'
        },
        {
            'Name': 'ws',
            'Entity': 'Samoa'
        },
        {
            'Name': 'ye',
            'Entity': 'Yemen'
        },
        {
            'Name': 'yt',
            'Entity': 'Mayotte'
        },
        {
            'Name': 'za',
            'Entity': 'South Africa'
        },
        {
            'Name': 'zm',
            'Entity': 'Zambia'
        },
        {
            'Name': 'zw',
            'Entity': 'Zimbabwe'
        }
    ]
];

export const getTLDs = () => {
    return [...TLDs];
};
