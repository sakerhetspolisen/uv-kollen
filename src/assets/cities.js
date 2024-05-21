const cities = [
  "abbekås",
  "abborrberget",
  "alberga",
  "alby",
  "alfta",
  "algutsrum",
  "alingsås",
  "allerum",
  "almunge",
  "alsike",
  "alstad",
  "alsterbro",
  "alster",
  "alstermo",
  "alunda",
  "alvesta",
  "alvhem",
  "alvik",
  "alvik",
  "ambjörnarp",
  "ammenäs",
  "anderslöv",
  "anderstorp",
  "aneby",
  "angelstad",
  "angered",
  "ankarsrum",
  "ankarsvik",
  "anneberg",
  "annelöv",
  "antnäs",
  "aplared",
  "arboga",
  "arbrå",
  "ardala",
  "arentorp",
  "arild",
  "arjeplog",
  "arkelstorp",
  "arninge",
  "arnö",
  "arrie",
  "arvidsjaur",
  "arvidsvik",
  "arvika",
  "askeby",
  "askersby",
  "askersund",
  "asmundtorp",
  "aspeboda",
  "asperö",
  "aspås",
  "avan",
  "avesta",
  "axvall",
  "backaryd",
  "backa",
  "backe",
  "baggetorp",
  "baldersnäs",
  "ballingslöv",
  "balsby",
  "bammarboda",
  "bankekind",
  "bankeryd",
  "bara",
  "barkarö",
  "barsebäck",
  "barsebäckshamn",
  "baskemölla",
  "bastuträsk",
  "beddingestrand",
  "bengtsfors",
  "bengtsheden",
  "bensbyn",
  "bergagård",
  "berga",
  "berga",
  "bergby",
  "bergeforsen",
  "berg",
  "berghem",
  "bergkvara",
  "berg",
  "bergnäset",
  "bergshammar",
  "bergshamra",
  "bergsjö",
  "bergströmshusen",
  "bergsviken",
  "bergsäng",
  "bergvik",
  "berg",
  "bestorp",
  "betsede",
  "bettna",
  "bie",
  "billdal",
  "billeberga",
  "billinge",
  "billingsfors",
  "billsta",
  "birka",
  "bjurholm",
  "bjursås",
  "bjuv",
  "bjärlöv",
  "bjärnum",
  "bjärred",
  "bjärsjölagård",
  "bjästa",
  "björbo",
  "björboholm",
  "björke",
  "björketorp",
  "björklinge",
  "björkskatan",
  "björkvik",
  "björköby",
  "björkö",
  "björna",
  "björneborg",
  "björnlunda",
  "björnås",
  "björnänge",
  "björsäter",
  "blackstalund",
  "bleket",
  "blentarp",
  "blidsberg",
  "blidö",
  "blombacka",
  "blomstermåla",
  "blåsmark",
  "blötberget",
  "bockara",
  "bodafors",
  "boda",
  "boden",
  "boliden",
  "bollebygd",
  "bollnäs",
  "bollstabruk",
  "bonäs",
  "borensberg",
  "borggård",
  "borgholm",
  "borgstena",
  "borlänge",
  "borrby",
  "bor",
  "borås",
  "bosnäs",
  "botsmark",
  "bottnaryd",
  "bovallstrand",
  "boxholm",
  "brantevik",
  "brastad",
  "braås",
  "bredared",
  "bredaryd",
  "bredbyn",
  "bredsand",
  "bredviken",
  "broaryd",
  "broby",
  "brokind",
  "bromölla",
  "brottby",
  "bro",
  "brunna",
  "brunnsberg",
  "brunn",
  "bruzaholm",
  "brålanda",
  "bräcke",
  "bräkne-hoby",
  "brändön",
  "brännland",
  "brännö",
  "brösarp",
  "bua",
  "buerås",
  "bullmark",
  "bunkeflostrand",
  "bureå",
  "burgsvik",
  "burlövsegnahem",
  "burseryd",
  "burträsk",
  "buskhyttan",
  "butbro",
  "bygdeå",
  "bygdsiljum",
  "byske",
  "bålsta",
  "bårslöv",
  "båstad",
  "båtskärsnäs",
  "bäckaskog",
  "bäckebo",
  "bäckefors",
  "bäckhammar",
  "bälgviken",
  "bälinge",
  "bälinge",
  "bärby",
  "bäsna",
  "böle",
  "bönan",
  "charlottenberg",
  "dala-floda",
  "dalarö",
  "dalby",
  "dalsjöfors",
  "dalslånged",
  "dalsrostock",
  "dalstorp",
  "dalum",
  "danholn",
  "danmark",
  "dannemora",
  "dannike",
  "degeberga",
  "degerfors",
  "degerhamn",
  "deje",
  "delsbo",
  "dingle",
  "dingtuna",
  "diseröd",
  "diö",
  "djupekås",
  "djura",
  "djurås",
  "djurön",
  "djurö",
  "docksta",
  "domsten",
  "donsö",
  "dorotea",
  "drag",
  "drottningholm",
  "drottningskär",
  "drängsmark",
  "dunö",
  "duvesjön",
  "dvärsätt",
  "dyvelsten",
  "dösjebro",
  "edaglasbruk",
  "edane",
  "ed",
  "edeby",
  "edsbro",
  "edsbruk",
  "edsbyn",
  "edsta",
  "edsvalla",
  "eggby",
  "ekeby-almby",
  "ekeby",
  "ekeby",
  "ekeby",
  "ekedalen",
  "ekenässjön",
  "ekerö",
  "ekerösommarstad",
  "eket",
  "ekshärad",
  "eksjö",
  "ekskogen",
  "eksund",
  "ekängen",
  "eldsberga",
  "ellös",
  "emmaboda",
  "emmaljunga",
  "emsfors",
  "emtunga",
  "enbacka",
  "eneryda",
  "enhagen-ekbacken",
  "enköping",
  "enstaberga",
  "enviken",
  "enånger",
  "eriksmåla",
  "eringsboda",
  "ersmark",
  "ersmark",
  "ersnäs",
  "eskilstuna",
  "eslöv",
  "evertsberg",
  "everöd",
  "fagerhult",
  "fagerhult",
  "fagerhult",
  "fagersanna",
  "fagersta",
  "fagerås",
  "falerum",
  "falkenberg",
  "falköping",
  "falla",
  "falun",
  "fanbyn",
  "farhult",
  "fegen",
  "fellingsbro",
  "fengersfors",
  "figeholm",
  "filipstad",
  "filsbäck",
  "finja",
  "finkarby",
  "finnerödja",
  "finspång",
  "finsta",
  "fiskebäckskil",
  "fisksätra",
  "fjugesta",
  "fjälkinge",
  "fjällbacka",
  "fjärdhundra",
  "fjäråskyrkby",
  "fjäråsstation",
  "flen",
  "fleninge",
  "flerohopp",
  "fliseryd",
  "floby",
  "flurkmark",
  "flygsfors",
  "flyinge",
  "flädie",
  "folkärna",
  "fornåsa",
  "fors",
  "forsbacka",
  "forserum",
  "forshaga",
  "forsheda",
  "forssjö",
  "forsvik",
  "fotö",
  "fredriksbergvästra",
  "fredriksbergöstra",
  "fredriksdal",
  "fredriksfors",
  "freluga",
  "fridlevstad",
  "friggesund",
  "frillesås",
  "frinnaryd",
  "fristad",
  "fritsla",
  "främmestad",
  "frändefors",
  "fränsta",
  "frödinge",
  "frösakull",
  "frövi",
  "funbo",
  "funäsdalen",
  "furuby",
  "furudal",
  "furulund",
  "furusjö",
  "furuvik",
  "fågelfors",
  "fågelmara",
  "fågelsta",
  "fågelvikshöjden",
  "fåker",
  "fårbo",
  "fårösund",
  "färgelanda",
  "färila",
  "färjestaden",
  "färlöv",
  "föllinge",
  "förslöv",
  "gagnef",
  "gamleby",
  "gammelgården",
  "gantofta",
  "garpenberg",
  "garphyttan",
  "gemla",
  "genarp",
  "genevad",
  "gessievillastad",
  "gesunda",
  "getinge",
  "getterön",
  "gideå",
  "gimo",
  "gislaved",
  "gissebo",
  "gistad",
  "gladökvarn",
  "glanshammar",
  "glava",
  "glemmingebro",
  "glimåkra",
  "glommen",
  "glommersträsk",
  "glumslöv",
  "glömminge",
  "gnarp",
  "gnesta",
  "gnosjö",
  "gonäs",
  "gottne",
  "granby",
  "granö",
  "graversfors",
  "grebbestad",
  "grebo",
  "grevie",
  "grillby",
  "grimslöv",
  "grimstorp",
  "grimsås",
  "gripenberg",
  "grisslehamn",
  "gropen",
  "grums",
  "grundsund",
  "grycksbo",
  "grytgöl",
  "grythyttan",
  "gryt",
  "gråbo",
  "gräddö",
  "gräfsnäs",
  "grängesberg",
  "grängesbergvästra",
  "gränna",
  "gränum",
  "grästorp",
  "grödby",
  "gualöv",
  "gubbo",
  "gudhem",
  "gullbrandstorp",
  "gullbranna",
  "gulleråsen",
  "gullringen",
  "gullspång",
  "gunnarskog",
  "gunnebo",
  "gunsta",
  "gusselby",
  "gustavsberg",
  "gusum",
  "gyttorp",
  "gånghester",
  "gårdby",
  "gårdskär",
  "gårdstånga",
  "gåvsta",
  "gäddede",
  "gällivare",
  "gällstad",
  "gällö",
  "gängletorp",
  "gärdsköpinge",
  "gärsnäs",
  "gävle",
  "göta",
  "göteborg",
  "götene",
  "götlunda",
  "habo",
  "hackås",
  "haga",
  "hagby",
  "hagfors",
  "hagge",
  "hagryd-dala",
  "hakkas",
  "hallabro",
  "hallaheberg",
  "hallen",
  "hallsberg",
  "hallstahammar",
  "hallstavik",
  "halltorp",
  "halmstad",
  "halvarsgårdarna",
  "hamburgsund",
  "hammar",
  "hammarby",
  "hammar",
  "hammarslund",
  "hammarstrand",
  "hammenhög",
  "hammerdal",
  "hampetorp",
  "hanaskog",
  "haparanda",
  "harads",
  "hara",
  "harbo",
  "hargshamn",
  "harkie",
  "harlösa",
  "harmånger",
  "harplinge",
  "hassela",
  "hasselfors",
  "hasslarp",
  "hasslö",
  "hasslöv",
  "havdhem",
  "haverdal",
  "heberg",
  "heby",
  "hedared",
  "hede",
  "hedekas",
  "hedemora",
  "hedenäset",
  "hedeskoga",
  "hedesunda",
  "hedkärra",
  "hedlunda",
  "helgered",
  "helsingborg",
  "hemavan",
  "hemmingsmark",
  "hemse",
  "hemsjö",
  "henån",
  "herrljunga",
  "herrskog",
  "herräng",
  "herstadberg",
  "hestra",
  "hestra",
  "hillared",
  "hillerstorp",
  "hillstaochse",
  "himle",
  "hindås",
  "hishult",
  "hissjö",
  "hissmofors",
  "hittarp",
  "hjo",
  "hjorted",
  "hjortkvarn",
  "hjortnäs",
  "hjortsberga",
  "hjälmared",
  "hjälm",
  "hjältevad",
  "hjärnarp",
  "hjärsås",
  "hjärtum",
  "hjärup",
  "hofors",
  "hofterup",
  "hogstad",
  "hogstorp",
  "hok",
  "holmeja",
  "holm",
  "holmsjö",
  "holmsund",
  "holsbybrunn",
  "holsljunga",
  "horda",
  "horla",
  "horndal",
  "horn",
  "horred",
  "hortlax",
  "hoting",
  "hova",
  "hoverberg",
  "hovid",
  "hovmantorp",
  "hovsta",
  "huaröd",
  "hudiksvall",
  "hultafors",
  "hult",
  "hultsfred",
  "hulu",
  "hummelsta",
  "hunnebostrand",
  "hunnestad",
  "hurva",
  "husum",
  "hybo",
  "hyllinge",
  "hyltebruk",
  "hyssna",
  "håbo-tibblekyrkby",
  "håga",
  "håksberg",
  "hållsta",
  "hånger",
  "häggenås",
  "häljarp",
  "hällaryd",
  "hällberga",
  "hällbybrunn",
  "hällefors",
  "hälleforsnäs",
  "hällekis",
  "hällestad",
  "hällesåker",
  "hällevadsholm",
  "hällevik",
  "hällingsjö",
  "hällnäs",
  "hälsö",
  "häradsbygden",
  "härad",
  "härnösand",
  "härryda",
  "härslöv",
  "hässleholm",
  "hästhagen",
  "hästholmen",
  "hästveda",
  "hästängen",
  "höganäs",
  "högboda",
  "höggeröd",
  "högsby",
  "högsjö",
  "högsäter",
  "hökerum",
  "hökåsen",
  "hököpinge",
  "höllviken",
  "hölö",
  "hönö",
  "hörby",
  "hörja",
  "hörnefors",
  "hörvik",
  "höviksnäs",
  "höör",
  "idkerberget",
  "idre",
  "igelfors",
  "igelstorp",
  "iggesund",
  "ilsbo",
  "immeln",
  "indal",
  "ingared",
  "ingatorp",
  "ingelstad",
  "ingelsträde",
  "innertavle",
  "insjön",
  "inskogen",
  "irsta",
  "johannesudd",
  "johannishus",
  "johansfors",
  "jokkmokk",
  "jonsered",
  "jonslund",
  "jonstorp",
  "jordbro",
  "jukkasjärvi",
  "jung",
  "junosuando",
  "junsele",
  "juoksengi",
  "jäderfors",
  "jälla",
  "jämjö",
  "jämshög",
  "jämtön",
  "järavallen",
  "järbo",
  "järlåsa",
  "järna",
  "järna",
  "järnforsen",
  "järpen",
  "järpås",
  "järvsö",
  "jättendal",
  "jävre",
  "jönköping",
  "jönåker",
  "jörlanda",
  "jörn",
  "jössefors",
  "kalix",
  "kalkudden",
  "kallax",
  "kallfors",
  "kallinge",
  "kalmar",
  "kalvsund",
  "kangos",
  "karby",
  "karesuando",
  "karlholmsbruk",
  "karlsborg",
  "karlshamn",
  "karlskoga",
  "karlskrona",
  "karlstad",
  "karlsvik",
  "karungi",
  "karupssommarby",
  "kastlösa",
  "katrinedal",
  "katrineholm",
  "kattarp",
  "kaxholmen",
  "kebal",
  "kilafors",
  "kil",
  "killeberg",
  "kil",
  "kilsmo",
  "kimstad",
  "kinna",
  "kinnared",
  "kinnarp",
  "kinnarumma",
  "kiruna",
  "kisa",
  "kivik",
  "kjulaås",
  "klagstorp",
  "klevshult",
  "klingstaochallsta",
  "klintehamn",
  "klippan",
  "klippansbruk",
  "klockestrand",
  "klockrike",
  "klutmark",
  "klågerup",
  "klädesholmen",
  "kläppa",
  "klässbol",
  "klövedal",
  "klöverträsk",
  "klövsjö",
  "knislinge",
  "knivsta",
  "knutby",
  "knäred",
  "kode",
  "kolbäck",
  "kolsva",
  "konga",
  "kopparberg",
  "kopparmora",
  "kopparnäs",
  "koppom",
  "korpilombolo",
  "korsberga",
  "korsberga",
  "korsträsk",
  "kortebo",
  "koskullskulle",
  "kosta",
  "kovikshamn",
  "kovland",
  "kramfors",
  "krika",
  "kristdala",
  "kristianstad",
  "kristinehamn",
  "kristvallabrunn",
  "krokek",
  "krokom",
  "krylbo",
  "krägga",
  "kränge",
  "kullersta",
  "kulltorp",
  "kullö",
  "kumla",
  "kungsbacka",
  "kungsberga",
  "kungsgården",
  "kungshamn",
  "kungshult",
  "kungsängen",
  "kungsäter",
  "kungsör",
  "kungälv",
  "kurland",
  "kurveröd",
  "kusmark",
  "kuttainen",
  "kvarsebo",
  "kvegerö",
  "kvibille",
  "kvicksund",
  "kvidinge",
  "kvillsfors",
  "kvissleby",
  "kvänum",
  "kvärlöv",
  "kyrkesund",
  "kyrkheddinge",
  "kyrkhult",
  "kyrksten",
  "kågeröd",
  "kåge",
  "kåhög",
  "kållekärr",
  "kånna",
  "kårsta",
  "kälarne",
  "källby",
  "källhagen",
  "källö-knippla",
  "kärda",
  "kärna",
  "kärsta",
  "kättilsmåla",
  "kättilstorp",
  "kävlinge",
  "köinge",
  "köpingebro",
  "köping",
  "köpmanholmen",
  "lagan",
  "laggarberg",
  "laholm",
  "lammhult",
  "landeryd",
  "landfjärden",
  "landsbro",
  "landskrona",
  "landvetter",
  "lanesundochöverby",
  "lanna",
  "larv",
  "latorpsbruk",
  "laxvik",
  "laxå",
  "lekeryd",
  "leksand",
  "lenhovda",
  "lerbäckshult",
  "lerdala",
  "lerum",
  "lesjöfors",
  "lessebo",
  "liatorp",
  "lidatorpochklövsta",
  "liden",
  "lidhult",
  "lidingö",
  "lidköping",
  "lidköpingnorra",
  "lillaedet",
  "lillaedetvästra",
  "lillaharrie",
  "lillastenby",
  "lillatjärby",
  "lillhaga",
  "lillhärdal",
  "lillkyrka",
  "lillpite",
  "limedsforsen",
  "limmared",
  "linderöd",
  "lindesberg",
  "lindholmen",
  "lindsdal",
  "lindö",
  "lingbo",
  "linghed",
  "linghem",
  "linköping",
  "linneryd",
  "listerby",
  "lit",
  "ljunga",
  "ljungbyhed",
  "ljungbyholm",
  "ljungby",
  "ljungsarp",
  "ljungsbro",
  "ljungskile",
  "ljusdal",
  "ljusfallshammar",
  "ljusne",
  "ljusterönolsjö",
  "loftahammar",
  "lomma",
  "los",
  "lotorp",
  "lottefors",
  "lucksta",
  "luddingsbo",
  "ludvika",
  "lugnetochskälsmara",
  "lugnvik",
  "lugnås",
  "luleå",
  "lundby",
  "lunde",
  "lund",
  "lundsbrunn",
  "lunnarp",
  "lunne",
  "lurudden",
  "lycksele",
  "lycksta",
  "lyrestad",
  "lysekil",
  "lysvik",
  "långared",
  "långasjö",
  "långsele",
  "långshyttan",
  "långviksmon",
  "långvik",
  "långås",
  "läby",
  "läckeby",
  "länghem",
  "länna",
  "läppe",
  "lärbro",
  "löberöd",
  "löddeköpinge",
  "löderup",
  "lödöse",
  "lögdeå",
  "lönsboda",
  "lörby",
  "löttorp",
  "löwenströmskalasarettet",
  "lövestad",
  "lövstalöt",
  "lövånger",
  "madängsholm",
  "magra",
  "mala",
  "malmbergetvästra",
  "malmbergetöstra",
  "malmbäck",
  "malmen",
  "malmköping",
  "malmslätt",
  "malmö",
  "malmön",
  "malung",
  "malungsfors",
  "malå",
  "mantorp",
  "marbäck",
  "margretetorp",
  "mariannelund",
  "marieby",
  "mariefred",
  "marieholm",
  "marielund",
  "mariestad",
  "markaryd",
  "marmaskogen",
  "marma",
  "marmorbyn",
  "marstrand",
  "matfors",
  "medle",
  "medåker",
  "mehedeby",
  "mellansel",
  "mellbystrand",
  "mellerud",
  "mellösa",
  "merlänna",
  "mjällby",
  "mjällom",
  "mjöbäck",
  "mjöhult",
  "mjölby",
  "mjönäs",
  "mockfjärd",
  "mogata",
  "moheda",
  "mohed",
  "moholm",
  "moliden",
  "molkom",
  "mollösund",
  "mora",
  "morgongåva",
  "morup",
  "motala",
  "mullhyttan",
  "mullsjö",
  "munga",
  "munka-ljungby",
  "munkedal",
  "munkfors",
  "munktorp",
  "muskö",
  "myckle",
  "myggenäs",
  "myresjö",
  "myrviken",
  "målilla",
  "målsta",
  "månkarbo",
  "måttsund",
  "märsta",
  "möklinta",
  "mölle",
  "mölltorp",
  "mölnbo",
  "mölnlycke",
  "mönsterås",
  "mörarp",
  "mörbylånga",
  "mörlunda",
  "mörrum",
  "mörsil",
  "nacka",
  "nedansjö",
  "nedregärdsjö",
  "nibble",
  "nikkala",
  "nissafors",
  "nitta",
  "njutånger",
  "nolvik",
  "nora",
  "norberg",
  "nordanö",
  "nordingrå",
  "nordkroken",
  "nordmaling",
  "nordöstragöteborg",
  "norje",
  "norrabro",
  "norralagnö",
  "norramsberg",
  "norramuskö",
  "norrariksten",
  "norrarörum",
  "norravindö",
  "norravisby",
  "norrfjärden",
  "norr-hede",
  "norrhult-klavreström",
  "norrköping",
  "norrmjöle",
  "norrsundet",
  "norrtälje",
  "norsbron",
  "norsholm",
  "norsjö",
  "nossebro",
  "nusnäs",
  "nyalångenäs",
  "nyborg",
  "nybro",
  "nybrostrand",
  "nyehusen",
  "nye",
  "nygård",
  "nyhammar",
  "nykil",
  "nykroppa",
  "nykvarn",
  "nykyrka",
  "nyköping",
  "nyland",
  "nymölla",
  "nynäshamn",
  "nysättra",
  "nås",
  "nälden",
  "näsbruk",
  "nässjö",
  "näsum",
  "näsviken",
  "näsviken",
  "näsåker",
  "nättraby",
  "nävekvarn",
  "nävragöl",
  "nöbbele",
  "nödinge-nol",
  "obbola",
  "ockelbo",
  "odensbacken",
  "odensberg",
  "oknö",
  "oleby",
  "olofstorp",
  "olofström",
  "olsfors",
  "olshammar",
  "onsala",
  "onslunda",
  "ormaryd",
  "ornäs",
  "orrefors",
  "orrhammar",
  "orrviken",
  "orsa",
  "osbyholm",
  "osby",
  "oskarshamn",
  "oskarström",
  "ostvik",
  "otterbäcken",
  "oxelösund",
  "oxie",
  "pajala",
  "parksidan",
  "pauliström",
  "persberg",
  "pershagen",
  "perstorp",
  "persön",
  "pilgrimstad",
  "piperskärr",
  "piteå",
  "porjus",
  "prästängen",
  "pukavik",
  "påarp",
  "pålsboda",
  "påläng",
  "påryd",
  "påskallavik",
  "rabbalshede",
  "ramdala",
  "ramnäs",
  "ramsberg",
  "ramsele",
  "ramstalund",
  "ramvik",
  "ransta",
  "rappestad",
  "reftele",
  "rejmyre",
  "rengsjö",
  "repbäcken",
  "resarö",
  "revingeby",
  "riala",
  "riddarhyttan",
  "rimbo",
  "rimforsa",
  "rindö",
  "ringarum",
  "rinkabyholm",
  "rinkaby",
  "risby",
  "rishammar",
  "risögrund",
  "robertsfors",
  "robertsholm",
  "rockhammar",
  "rockneby",
  "roknäs",
  "rolfs",
  "rolfstorp",
  "romakloster",
  "romme",
  "ronnebyhamn",
  "ronneby",
  "rosenfors",
  "rosenlund",
  "rosersberg",
  "rossön",
  "rosvik",
  "roteberg",
  "rottneros",
  "rottne",
  "rot",
  "ruda",
  "rud",
  "rundvik",
  "runemo",
  "runtuna",
  "rusksele",
  "rutvik",
  "rya",
  "rydaholm",
  "ryd",
  "rydal",
  "rydboholm",
  "rydbo",
  "rydebäck",
  "ryd",
  "rydsgård",
  "rydsnäs",
  "ryd",
  "rydöbruk",
  "ryssby",
  "råby",
  "råda",
  "råneå",
  "rångedala",
  "rånnaväg",
  "rånäs",
  "råtorp",
  "rälla",
  "ränneslöv",
  "rätan",
  "rättarboda",
  "rättvik",
  "rävemåla",
  "rävlanda",
  "röbäck",
  "rödaholme",
  "rödeby",
  "rödån",
  "röke",
  "rönneshytta",
  "rönnäng",
  "rörvik",
  "rörö",
  "röstånga",
  "sala",
  "salbohed",
  "saleby",
  "saltsjöbaden",
  "sandared",
  "sandarne",
  "sandhem",
  "sandhult",
  "sandskogen",
  "sandslån",
  "sandviken",
  "sandviken",
  "sangis",
  "sanktolof",
  "saxdalen",
  "saxnäs",
  "saxtorpsskogen",
  "segersta",
  "segersäng",
  "segmon",
  "selja",
  "selånger",
  "sennan",
  "seskarö",
  "sexdrega",
  "sibbhult",
  "sibble",
  "sibo",
  "sidensjö",
  "sifferbo",
  "sigtuna",
  "siljansnäs",
  "silverdalen",
  "simlångsdalen",
  "simonstorp",
  "simrishamn",
  "sjuhalla",
  "sjulsmark",
  "sjunnen",
  "sjunnerup",
  "sjuntorp",
  "själsö",
  "sjöbo",
  "sjögestad",
  "sjörröd",
  "sjösa",
  "sjöskogenochstrand",
  "sjötorp",
  "sjövik",
  "skanörmedfalsterbo",
  "skara",
  "skarpö",
  "skattkärr",
  "skattungbyn",
  "skavkullaochskillingenäs",
  "skebobruk",
  "skebokvarn",
  "skedala",
  "skedaudde",
  "skede",
  "skedvikyrkby",
  "skee",
  "skegrie",
  "skelleftehamn",
  "skellefteå",
  "skepplanda",
  "skeppshult",
  "skeppsvik",
  "skiftinge",
  "skillingaryd",
  "skillinge",
  "skinnskatteberg",
  "skivarp",
  "skoby",
  "skoghall",
  "skogsby",
  "skottorp",
  "skrea",
  "skruv",
  "skultorp",
  "skultuna",
  "skumparp",
  "skurup",
  "skutskär",
  "skyttorp",
  "skålö",
  "skånes-fagerhult",
  "skåne-tranås",
  "skåpafors",
  "skåre",
  "skällinge",
  "skänninge",
  "skärblacka",
  "skärhamn",
  "skärplinge",
  "skärstad",
  "sköldinge",
  "sköllersta",
  "skölsta",
  "skörby",
  "skövde",
  "slaka",
  "slite",
  "slitenorra",
  "slottsbron",
  "slottsskogen",
  "slätthult",
  "slöinge",
  "smedby",
  "smedjebacken",
  "smedseröd",
  "smedstorp",
  "smygehamn",
  "smålandsstenar",
  "smögen",
  "snogeröd",
  "snöveltorp",
  "solberga",
  "solberga",
  "solberga",
  "sollebrunn",
  "sollefteånorra",
  "sollefteå",
  "sollerön",
  "solvarbo",
  "sommen",
  "sonstorp",
  "sorsele",
  "sorunda",
  "sparreholm",
  "spekeröd",
  "spillersboda",
  "spjutsbygd",
  "spjutstorp",
  "spångsholm",
  "spånlöt",
  "staffanstorp",
  "stallarholmen",
  "stare",
  "stava",
  "stavreviken",
  "stavsjö",
  "stavsnäs",
  "stehag",
  "stenared",
  "stenhamra",
  "steninge",
  "steningehöjden",
  "stenis",
  "stensele",
  "stensjön",
  "stenstorp",
  "stenungsund",
  "stenungsön",
  "stenåsen",
  "sticklingeudde",
  "stigen",
  "stigtomta",
  "stilleryd",
  "stjärnhov",
  "stoby",
  "stockamöllan",
  "stocka",
  "stockaryd",
  "stockholm",
  "stockvik",
  "storabugärde",
  "storadyrön",
  "storaherrestad",
  "storahöga",
  "storalevene",
  "storamellby",
  "storamellösa",
  "storarör",
  "storavika",
  "storebro",
  "storfors",
  "storuman",
  "storvik",
  "storvreta",
  "storå",
  "striberg",
  "strålsnäs",
  "strångsjö",
  "stråssa",
  "strängnäs",
  "strömma",
  "strömsbruk",
  "strömsholm",
  "strömsnäsbruk",
  "strömstad",
  "strömsund",
  "strövelstorp",
  "stugun",
  "sturefors",
  "sturkö",
  "styrsö",
  "stånga",
  "stångby",
  "ställdalen",
  "stöcke",
  "stöcksjö",
  "stöde",
  "stöllet",
  "stöpen",
  "sulvik",
  "sundborn",
  "sundby",
  "sundbyholm",
  "sundom",
  "sundsvall",
  "sund",
  "sunnansjö",
  "sunnemo",
  "sunne",
  "surahammar",
  "surte",
  "svalsta",
  "svalöv",
  "svanberga",
  "svanesund",
  "svanskog/svaneholm",
  "svappavaara",
  "svartbyn",
  "svartehallen",
  "svarte",
  "svartudden",
  "svartå",
  "svedala",
  "sveg",
  "svenljunga",
  "svensbyn",
  "svenshögen",
  "svenstavik",
  "svenstorp",
  "svinninge",
  "svängsta",
  "svärdsjö",
  "svärtinge",
  "sya",
  "sysslebäck",
  "sågmyra",
  "säffle",
  "sälen",
  "sälgsjön",
  "särna",
  "säter",
  "sätila",
  "sätinge",
  "sätrabrunn",
  "sättra",
  "sävar",
  "sävast",
  "säve",
  "sävja",
  "sävsjö",
  "söderby",
  "söderby-karl",
  "söderbärke",
  "söderfors",
  "söderhamn",
  "söderköping",
  "söderskogen",
  "södersvik",
  "södertälje",
  "söderåkra",
  "södrabredåker",
  "södrasandby",
  "södrasunderbyn",
  "södravi",
  "sölvesborg",
  "sörforsa",
  "sörfors",
  "sörmjöle",
  "sörstafors",
  "sörvik",
  "söråker",
  "sösdala",
  "sövde",
  "sövestad",
  "taberg",
  "tallboda",
  "tallvik",
  "tallåsen",
  "tandsbyn",
  "tanumshede",
  "tavelsjö",
  "teckomatorp",
  "tenhult",
  "tibro",
  "tidaholm",
  "tidan",
  "tidö-lindö",
  "tierp",
  "tillberga",
  "timmele",
  "timmernabben",
  "timmersdala",
  "timrå",
  "tingsryd",
  "tingstäde",
  "tjautjas",
  "tjuvkil",
  "tjällmo",
  "tjörnarp",
  "tobo",
  "tofta",
  "tofta",
  "toftbyn",
  "tollarp",
  "tollered",
  "tomelilla",
  "tomtebo",
  "torbjörntorp",
  "torekov",
  "torestorp",
  "torhamn",
  "tormestorp",
  "tornahällestad",
  "torpa",
  "torpsbruk",
  "torpshammar",
  "torreby",
  "torsby",
  "torshälla",
  "torsåker",
  "torsång",
  "torsås",
  "tortuna",
  "torup",
  "totebo",
  "tranemo",
  "tranholmen",
  "transtrand",
  "tranås",
  "traryd",
  "trekanten",
  "trelleborg",
  "trollhättan",
  "trosa",
  "trångsviken",
  "tråvad",
  "trädet",
  "trödje",
  "trönninge",
  "trönningenäs",
  "trönö",
  "tumba",
  "tumbo",
  "tumlehed",
  "tuna",
  "tuna",
  "tuna",
  "tunnerstad",
  "tuolluvaara",
  "tureholm",
  "tving",
  "tvååker",
  "tvärskog",
  "tvärålund",
  "tye",
  "tygelsjö",
  "tynningö",
  "tyringe",
  "tystberga",
  "tågarp",
  "tångaberg",
  "tångaochrögle",
  "tånnö",
  "täfteå",
  "täljö",
  "tällberg",
  "tärnaby",
  "tärnsjö",
  "tävelsås",
  "töcksfors",
  "töllsjö",
  "töreboda",
  "töre",
  "törestorp",
  "tösse",
  "ubbhultnorra",
  "ucklum",
  "uddebo",
  "uddeholm",
  "udden",
  "uddevalla",
  "uddheden",
  "ullared",
  "ullervad",
  "ullånger",
  "ulricehamn",
  "ulrika",
  "ultuna",
  "ulvkälla",
  "ulvåker",
  "umeå",
  "undenäs",
  "undersåker",
  "unnaryd",
  "upphärad",
  "upplanda",
  "uppsala",
  "urshult",
  "ursviken",
  "utby",
  "utvälinge",
  "vad",
  "vadstena",
  "vaggeryd",
  "vagnhärad",
  "valbo",
  "valdemarsvik",
  "valinge",
  "valje",
  "valla",
  "vallargärdet",
  "vallberga",
  "vallda",
  "vallentuna",
  "vallkärra",
  "vallsta",
  "vallvik",
  "vallåkra",
  "valskog",
  "vankiva",
  "vannsätter",
  "vansbro",
  "vansökyrkby",
  "vaplan",
  "vara",
  "varberg",
  "varekil",
  "vargön",
  "varnhem",
  "vartofta",
  "vassmolösa",
  "vattholma",
  "vattjom",
  "vattnäs",
  "vattubrinken",
  "vaxholm",
  "veberöd",
  "veddige",
  "vedevåg",
  "vedum",
  "vegby",
  "veinge",
  "velanda",
  "vellinge",
  "vemdalen",
  "vena",
  "venjan",
  "vessigebro",
  "vetlanda",
  "vibble",
  "vickleby",
  "vidja",
  "vidsel",
  "vidöåsen",
  "viforsenochtunbyn",
  "vika",
  "vikarbyn",
  "viken",
  "vikingstad",
  "vikmanshyttan",
  "vik",
  "viksjöfors",
  "vilhelmina",
  "villshärad",
  "vilshult",
  "vimmerby",
  "vinberg",
  "vinbergskyrkby",
  "vindeln",
  "vindön",
  "vingåker",
  "vinninga",
  "vinnö",
  "vinslöv",
  "vintrie",
  "vintrosa",
  "vinäs",
  "virsbo",
  "virserum",
  "visby",
  "viskafors",
  "vislanda",
  "vissefjärda",
  "vistträsk",
  "vi",
  "vitaby",
  "vittangi",
  "vittaryd",
  "vittinge",
  "vittjärv",
  "vittsjö",
  "vittskövle",
  "vollsjö",
  "vrena",
  "vretstorp",
  "vrigstad",
  "vrångö",
  "vuollerim",
  "vålberg",
  "våmhus",
  "vånga",
  "vårdsätra",
  "vårgårda",
  "vårsta",
  "våxtorp",
  "väckelsång",
  "väderstad",
  "väggarp",
  "väländan",
  "vänersborg",
  "väne-åsaka",
  "vänge",
  "vännäsby",
  "vännäs",
  "väring",
  "värmlandsbro",
  "värnamo",
  "värsås",
  "väröbacka",
  "väse",
  "väskinde",
  "västanvik",
  "västanvik",
  "västerberg",
  "västerby",
  "västerfärnebo",
  "västerhaninge",
  "västerhejde",
  "västerljung",
  "västerlösa",
  "västermyckeläng",
  "västervik",
  "västerås",
  "västrabispgården",
  "västrahagen",
  "västrahusby",
  "västraingelstad",
  "västrakaraby",
  "västrakarup",
  "västratommarp",
  "västraämtervik",
  "växjö",
  "yngsjö",
  "ysane",
  "ysby",
  "ystad",
  "ytterhogdal",
  "ytternäsochvreta",
  "yttersjö",
  "zinkgruvan",
  "åbyggeby",
  "åby",
  "åbytorp",
  "åby",
  "åhus",
  "åkarp",
  "åkersberga",
  "åkersstyckebruk",
  "ålberga",
  "åled",
  "åminne",
  "åmmeberg",
  "åmotfors",
  "åmot",
  "åmunnen",
  "åmynnet",
  "åmål",
  "ånge",
  "ånäset",
  "åre",
  "årjäng",
  "årnäs",
  "årstad",
  "årstahavsbad",
  "årsunda",
  "åryd",
  "åryd",
  "åsa",
  "åsarna",
  "åsarp",
  "åsbro",
  "åsby",
  "åseda",
  "åsele",
  "åsensbruk",
  "åshammar",
  "ås",
  "åsljunga",
  "åstorp",
  "åtvidaberg",
  "älandsbro",
  "älgarås",
  "älghult",
  "älgö",
  "älmhult",
  "älmsta",
  "älvdalen",
  "älvkarleby",
  "älvkarleö",
  "älvnäs",
  "älvsala",
  "älvsbyn",
  "älvsered",
  "älvängen",
  "änge",
  "ängelholmsstrand",
  "ängelholm",
  "äng",
  "ängsmon",
  "ängsvik",
  "äppelbo",
  "ärla",
  "äsköping",
  "äspered",
  "äsperöd",
  "ätran",
  "öbolandet",
  "öbonäs",
  "öckerö",
  "ödeborg",
  "ödeshög",
  "ödsmålochåsebyberg",
  "ödsmål",
  "ödåkra",
  "öggestorp",
  "öjersjö",
  "ölmbrotorp",
  "ölme",
  "ölmstad",
  "ölsta",
  "önneköp",
  "önnestad",
  "örbyhus",
  "örebro",
  "öregrund",
  "örkelljunga",
  "örnsköldsvik",
  "örserum",
  "örsjö",
  "örslösa",
  "örsundsbro",
  "örsundsbronorra",
  "örtagården",
  "örtofta",
  "örviken",
  "ösmo",
  "össjö",
  "östadkulle",
  "östansjö",
  "österbybruk",
  "österbymo",
  "österfärnebo",
  "österslöv",
  "österstad",
  "östersund",
  "östervåla",
  "östhammar",
  "östrabispgården",
  "östrafrölunda",
  "östragrevie",
  "östrahusby",
  "östrakallfors",
  "östrakarup",
  "östraljungby",
  "östraryd",
  "östrasönnarslöv",
  "östratommarp",
  "östravemmerlöv",
  "överboda",
  "överhärde",
  "överkalix",
  "överlida",
  "övertorneå",
  "övertänger",
  "överum",
  "öxabäck",
  "öxeryd",
];

export default cities;
