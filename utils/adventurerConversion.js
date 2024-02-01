export const jobConverter = (jobNumber) => {
  return [
    '',
    'WAR',
    'MNK',
    'WHM',
    'BLM',
    'RDM',
    'THF',
    'PLD',
    'DRK',
    'BST',
    'BRD',
    'RNG',
    'SAM',
    'NIN',
    'DRG',
    'SMN',
  ][jobNumber]
}

export const formatAdventurer = (race, face) => {
  const textRace = ['', 'hm', 'hf', 'em', 'ef', 'tm', 'tf', 'mf', 'gm'][race]
  const textFace = Math.floor((face + 2) / 2)
  const textHair = ['a', 'b'][face % 2]
  return `${textRace}${textFace}${textHair}`
}

export const adventurerImage = (model) => {
  return {
    ef1a: 'https://vignette.wikia.nocookie.net/ffxi/images/d/d7/Ef1a.jpg',
    ef2a: 'https://vignette.wikia.nocookie.net/ffxi/images/c/c1/Ef2a.jpg',
    ef3a: 'https://vignette.wikia.nocookie.net/ffxi/images/a/a4/Ef3a.jpg',
    ef4a: 'https://vignette.wikia.nocookie.net/ffxi/images/6/67/Ef4a.jpg',
    ef5a: 'https://vignette.wikia.nocookie.net/ffxi/images/6/62/Ef5a.jpg',
    ef6a: 'https://vignette.wikia.nocookie.net/ffxi/images/f/f9/Ef6a.jpg',
    ef7a: 'https://vignette.wikia.nocookie.net/ffxi/images/c/c6/Ef7a.jpg',
    ef8a: 'https://vignette.wikia.nocookie.net/ffxi/images/6/60/Ef8a.jpg',
    ef1b: 'https://vignette.wikia.nocookie.net/ffxi/images/c/cf/Ef1b.jpg',
    ef2b: 'https://vignette.wikia.nocookie.net/ffxi/images/5/5a/Ef2b.jpg',
    ef3b: 'https://vignette.wikia.nocookie.net/ffxi/images/d/d5/Ef3b.jpg',
    ef4b: 'https://vignette.wikia.nocookie.net/ffxi/images/1/19/Ef4b.jpg',
    ef5b: 'https://vignette.wikia.nocookie.net/ffxi/images/4/45/Ef5b.jpg',
    ef6b: 'https://vignette.wikia.nocookie.net/ffxi/images/a/a2/Ef6b.jpg',
    ef7b: 'https://vignette.wikia.nocookie.net/ffxi/images/2/2d/Ef7b.jpg',
    ef8b: 'https://vignette.wikia.nocookie.net/ffxi/images/9/95/Ef8b.jpg',
    em8b: 'https://vignette.wikia.nocookie.net/ffxi/images/a/a4/Em8b.jpg',
    em7b: 'https://vignette.wikia.nocookie.net/ffxi/images/7/76/Em7b.jpg',
    em6b: 'https://vignette.wikia.nocookie.net/ffxi/images/f/f1/Em6b.jpg',
    em5b: 'https://vignette.wikia.nocookie.net/ffxi/images/3/3f/Em5b.jpg',
    em4b: 'https://vignette.wikia.nocookie.net/ffxi/images/2/2c/Em4b.jpg',
    em3b: 'https://vignette.wikia.nocookie.net/ffxi/images/9/9c/Em3b.jpg',
    em2b: 'https://vignette.wikia.nocookie.net/ffxi/images/4/41/Em2b.jpg',
    em1b: 'https://vignette.wikia.nocookie.net/ffxi/images/a/a7/Em1b.jpg',
    em8a: 'https://vignette.wikia.nocookie.net/ffxi/images/a/a6/Em8a.jpg',
    em7a: 'https://vignette.wikia.nocookie.net/ffxi/images/3/32/Em7a.jpg',
    em6a: 'https://vignette.wikia.nocookie.net/ffxi/images/a/ae/Em6a.jpg',
    em5a: 'https://vignette.wikia.nocookie.net/ffxi/images/1/19/Em5a.jpg',
    em4a: 'https://vignette.wikia.nocookie.net/ffxi/images/a/a4/Em4a.jpg',
    em3a: 'https://vignette.wikia.nocookie.net/ffxi/images/9/90/Em3a.jpg',
    em2a: 'https://vignette.wikia.nocookie.net/ffxi/images/6/63/Em2a.jpg',
    em1a: 'https://vignette.wikia.nocookie.net/ffxi/images/9/98/Em1a.jpg',
    gm1a: 'https://vignette.wikia.nocookie.net/ffxi/images/4/4c/G1a.jpg',
    gm2a: 'https://vignette.wikia.nocookie.net/ffxi/images/6/6a/G2a.jpg',
    gm3a: 'https://vignette.wikia.nocookie.net/ffxi/images/4/4d/G3a.jpg',
    gm4a: 'https://vignette.wikia.nocookie.net/ffxi/images/0/02/G4a.jpg',
    gm5a: 'https://vignette.wikia.nocookie.net/ffxi/images/6/6c/G5a.jpg',
    gm6a: 'https://vignette.wikia.nocookie.net/ffxi/images/d/d7/G6a.jpg',
    gm7a: 'https://vignette.wikia.nocookie.net/ffxi/images/7/71/G7a.jpg',
    gm8a: 'https://vignette.wikia.nocookie.net/ffxi/images/2/22/G8a.jpg',
    gm1b: 'https://vignette.wikia.nocookie.net/ffxi/images/a/af/G1b.jpg',
    gm2b: 'https://vignette.wikia.nocookie.net/ffxi/images/3/30/G2b.jpg',
    gm3b: 'https://vignette.wikia.nocookie.net/ffxi/images/8/8b/G3b.jpg',
    gm4b: 'https://vignette.wikia.nocookie.net/ffxi/images/a/a1/G4b.jpg',
    gm5b: 'https://vignette.wikia.nocookie.net/ffxi/images/2/21/G5b.jpg',
    gm6b: 'https://vignette.wikia.nocookie.net/ffxi/images/b/b6/G6b.jpg',
    gm7b: 'https://vignette.wikia.nocookie.net/ffxi/images/6/6e/G7b.jpg',
    gm8b: 'https://vignette.wikia.nocookie.net/ffxi/images/f/fd/G8b.jpg',
    hf1a: 'https://vignette.wikia.nocookie.net/ffxi/images/1/12/Hf1a.jpg',
    hf2a: 'https://vignette.wikia.nocookie.net/ffxi/images/4/45/Hf2a.jpg',
    hf3a: 'https://vignette.wikia.nocookie.net/ffxi/images/2/25/Hf3a.jpg',
    hf4a: 'https://vignette.wikia.nocookie.net/ffxi/images/1/19/Hf4a.jpg',
    hf5a: 'https://vignette.wikia.nocookie.net/ffxi/images/e/e5/Hf5a.jpg',
    hf6a: 'https://vignette.wikia.nocookie.net/ffxi/images/5/5a/Hf6a.jpg',
    hf7a: 'https://vignette.wikia.nocookie.net/ffxi/images/0/08/Hf7a.jpg',
    hf8a: 'https://vignette.wikia.nocookie.net/ffxi/images/8/89/Hf8a.jpg',
    hf1b: 'https://vignette.wikia.nocookie.net/ffxi/images/3/3c/Hf1b.jpg',
    hf2b: 'https://vignette.wikia.nocookie.net/ffxi/images/3/37/Hf2b.jpg',
    hf3b: 'https://vignette.wikia.nocookie.net/ffxi/images/b/b0/Hf3b.jpg',
    hf4b: 'https://vignette.wikia.nocookie.net/ffxi/images/6/6c/Hf4b.jpg',
    hf5b: 'https://vignette.wikia.nocookie.net/ffxi/images/5/5d/Hf5b.jpg',
    hf6b: 'https://vignette.wikia.nocookie.net/ffxi/images/a/aa/Hf6b.jpg',
    hf7b: 'https://vignette.wikia.nocookie.net/ffxi/images/2/28/Hf7b.jpg',
    hf8b: 'https://vignette.wikia.nocookie.net/ffxi/images/b/bf/Hf8b.jpg',
    hm8b: 'https://vignette.wikia.nocookie.net/ffxi/images/8/84/Hm8b.jpg',
    hm7b: 'https://vignette.wikia.nocookie.net/ffxi/images/4/43/Hm7b.jpg',
    hm6b: 'https://vignette.wikia.nocookie.net/ffxi/images/2/28/Hm6b.jpg',
    hm5b: 'https://vignette.wikia.nocookie.net/ffxi/images/8/86/Hm5b.jpg',
    hm4b: 'https://vignette.wikia.nocookie.net/ffxi/images/4/45/Hm4b.jpg',
    hm3b: 'https://vignette.wikia.nocookie.net/ffxi/images/d/df/Hm3b.jpg',
    hm2b: 'https://vignette.wikia.nocookie.net/ffxi/images/3/33/Hm2b.jpg',
    hm1b: 'https://vignette.wikia.nocookie.net/ffxi/images/f/f5/Hm1b.jpg',
    hm8a: 'https://vignette.wikia.nocookie.net/ffxi/images/d/d0/Hm8a.jpg',
    hm7a: 'https://vignette.wikia.nocookie.net/ffxi/images/0/04/Hm7a.jpg',
    hm6a: 'https://vignette.wikia.nocookie.net/ffxi/images/a/a4/Hm6a.jpg',
    hm5a: 'https://vignette.wikia.nocookie.net/ffxi/images/c/c7/Hm5a.jpg',
    hm4a: 'https://vignette.wikia.nocookie.net/ffxi/images/9/9d/Hm4a.jpg',
    hm3a: 'https://vignette.wikia.nocookie.net/ffxi/images/4/49/Hm3a.jpg',
    hm2a: 'https://vignette.wikia.nocookie.net/ffxi/images/6/61/Hm2a.jpg',
    hm1a: 'https://vignette.wikia.nocookie.net/ffxi/images/b/b3/Hm1a.jpg',
    mf1a: 'https://vignette.wikia.nocookie.net/ffxi/images/d/d1/M1a.jpg',
    mf2a: 'https://vignette.wikia.nocookie.net/ffxi/images/1/19/M2a.jpg',
    mf3a: 'https://vignette.wikia.nocookie.net/ffxi/images/3/37/M3a.jpg',
    mf4a: 'https://vignette.wikia.nocookie.net/ffxi/images/e/e3/M4a.jpg',
    mf5a: 'https://vignette.wikia.nocookie.net/ffxi/images/0/03/M5a.jpg',
    mf6a: 'https://vignette.wikia.nocookie.net/ffxi/images/7/7f/M6a.jpg',
    mf7a: 'https://vignette.wikia.nocookie.net/ffxi/images/c/cc/M7a.jpg',
    mf8a: 'https://vignette.wikia.nocookie.net/ffxi/images/8/82/M8a.jpg',
    mf1b: 'https://vignette.wikia.nocookie.net/ffxi/images/2/24/M1b.jpg',
    mf2b: 'https://vignette.wikia.nocookie.net/ffxi/images/d/d2/M2b.jpg',
    mf3b: 'https://vignette.wikia.nocookie.net/ffxi/images/6/63/M3b.jpg',
    mf4b: 'https://vignette.wikia.nocookie.net/ffxi/images/e/ee/M4b.jpg',
    mf5b: 'https://vignette.wikia.nocookie.net/ffxi/images/c/c9/M5b.jpg',
    mf6b: 'https://vignette.wikia.nocookie.net/ffxi/images/f/ff/M6b.jpg',
    mf7b: 'https://vignette.wikia.nocookie.net/ffxi/images/9/90/M7b.jpg',
    mf8b: 'https://vignette.wikia.nocookie.net/ffxi/images/9/9f/M8b.jpg',
    tf1a: 'https://vignette.wikia.nocookie.net/ffxi/images/a/ab/Tf1a.jpg',
    tf2a: 'https://vignette.wikia.nocookie.net/ffxi/images/b/bf/Tf2a.jpg',
    tf3a: 'https://vignette.wikia.nocookie.net/ffxi/images/6/66/Tf3a.jpg',
    tf4a: 'https://vignette.wikia.nocookie.net/ffxi/images/0/09/Tf4a.jpg',
    tf5a: 'https://vignette.wikia.nocookie.net/ffxi/images/5/5c/Tf5a.jpg',
    tf6a: 'https://vignette.wikia.nocookie.net/ffxi/images/1/1c/Tf6a.jpg',
    tf7a: 'https://vignette.wikia.nocookie.net/ffxi/images/2/2a/Tf7a.jpg',
    tf8a: 'https://vignette.wikia.nocookie.net/ffxi/images/6/69/Tf8a.jpg',
    tf1b: 'https://vignette.wikia.nocookie.net/ffxi/images/a/a0/Tf1b.jpg',
    tf2b: 'https://vignette.wikia.nocookie.net/ffxi/images/d/d0/Tf2b.jpg',
    tf3b: 'https://vignette.wikia.nocookie.net/ffxi/images/f/fe/Tf3b.jpg',
    tf4b: 'https://vignette.wikia.nocookie.net/ffxi/images/1/18/Tf4b.jpg',
    tf5b: 'https://vignette.wikia.nocookie.net/ffxi/images/d/da/Tf5b.jpg',
    tf6b: 'https://vignette.wikia.nocookie.net/ffxi/images/3/38/Tf6b.jpg',
    tf7b: 'https://vignette.wikia.nocookie.net/ffxi/images/5/5f/Tf7b.jpg',
    tf8b: 'https://vignette.wikia.nocookie.net/ffxi/images/3/37/Tf8b.jpg',
    tm8b: 'https://vignette.wikia.nocookie.net/ffxi/images/2/27/Tm8b.jpg',
    tm7b: 'https://vignette.wikia.nocookie.net/ffxi/images/5/55/Tm7b.jpg',
    tm6b: 'https://vignette.wikia.nocookie.net/ffxi/images/7/7d/Tm6b.jpg',
    tm5b: 'https://vignette.wikia.nocookie.net/ffxi/images/4/4b/Tm5b.jpg',
    tm4b: 'https://vignette.wikia.nocookie.net/ffxi/images/5/59/Tm4b.jpg',
    tm3b: 'https://vignette.wikia.nocookie.net/ffxi/images/2/21/Tm3b.jpg',
    tm2b: 'https://vignette.wikia.nocookie.net/ffxi/images/4/48/Tm2b.jpg',
    tm1b: 'https://vignette.wikia.nocookie.net/ffxi/images/f/f5/Tm1b.jpg',
    tm8a: 'https://vignette.wikia.nocookie.net/ffxi/images/b/bb/Tm8a.jpg',
    tm7a: 'https://vignette.wikia.nocookie.net/ffxi/images/3/34/Tm7a.jpg',
    tm6a: 'https://vignette.wikia.nocookie.net/ffxi/images/3/33/Tm6a.jpg',
    tm5a: 'https://vignette.wikia.nocookie.net/ffxi/images/9/97/Tm5a.jpg',
    tm4a: 'https://vignette.wikia.nocookie.net/ffxi/images/c/c6/Tm4a.jpg',
    tm3a: 'https://vignette.wikia.nocookie.net/ffxi/images/d/d9/Tm3a.jpg',
    tm2a: 'https://vignette.wikia.nocookie.net/ffxi/images/f/f0/Tm2a.jpg',
    tm1a: 'https://vignette.wikia.nocookie.net/ffxi/images/d/d8/Tm1a.jpg',
  }[model]
}

export const zones = {
  0: 'unknown ',
  1: 'Phanauet Channel ',
  2: 'Carpenters Landing ',
  3: 'Manaclipper ',
  4: 'Bibiki Bay ',
  5: 'Uleguerand Range ',
  6: 'Bearclaw Pinnacle ',
  7: 'Attohwa Chasm ',
  8: 'Boneyard Gully ',
  9: 'PsoXja ',
  10: 'The Shrouded Maw ',
  11: 'Oldton Movalpolos ',
  12: 'Newton Movalpolos ',
  13: 'Mine Shaft 2716 ',
  14: 'Hall of Transference ',
  15: 'Abyssea-Konschtat ',
  16: 'Promyvion-Holla ',
  17: 'Spire of Holla ',
  18: 'Promyvion-Dem ',
  19: 'Spire of Dem ',
  20: 'Promyvion-Mea ',
  21: 'Spire of Mea ',
  22: 'Promyvion-Vahzl ',
  23: 'Spire of Vahzl ',
  24: 'Lufaise Meadows ',
  25: 'Misareaux Coast ',
  26: 'Tavnazian Safehold ',
  27: 'Phomiuna Aqueducts ',
  28: 'Sacrarium ',
  29: 'Riverne-Site B01 ',
  30: 'Riverne-Site A01 ',
  31: 'Monarch Linn ',
  32: 'Sealions Den ',
  33: 'AlTaieu ',
  34: 'Grand Palace of HuXzoi ',
  35: 'The Garden of RuHmet ',
  36: 'Empyreal Paradox ',
  37: 'Temenos ',
  38: 'Apollyon ',
  39: 'Dynamis-Valkurm ',
  40: 'Dynamis-Buburimu ',
  41: 'Dynamis-Qufim ',
  42: 'Dynamis-Tavnazia ',
  43: 'Diorama Abdhaljs-Ghelsba ',
  44: 'Abdhaljs Isle-Purgonorgo ',
  45: 'Abyssea-Tahrongi ',
  46: 'Open sea route to Al Zahbi ',
  47: 'Open sea route to Mhaura ',
  48: 'Al Zahbi ',
  49: 49,
  50: 'Aht Urhgan Whitegate ',
  51: 'Wajaom Woodlands ',
  52: 'Bhaflau Thickets ',
  53: 'Nashmau ',
  54: 'Arrapago Reef ',
  55: 'Ilrusi Atoll ',
  56: 'Periqia ',
  57: 'Talacca Cove ',
  58: 'Silver Sea route to Nashmau ',
  59: 'Silver Sea route to Al Zahbi ',
  60: 'The Ashu Talif ',
  61: 'Mount Zhayolm ',
  62: 'Halvung ',
  63: 'Lebros Cavern ',
  64: 'Navukgo Execution Chamber ',
  65: 'Mamook ',
  66: 'Mamool Ja Training Grounds ',
  67: 'Jade Sepulcher ',
  68: 'Aydeewa Subterrane ',
  69: 'Leujaoam Sanctum ',
  70: 'Chocobo Circuit ',
  71: 'The Colosseum ',
  72: 'Alzadaal Undersea Ruins ',
  73: 'Zhayolm Remnants ',
  74: 'Arrapago Remnants ',
  75: 'Bhaflau Remnants ',
  76: 'Silver Sea Remnants ',
  77: 'Nyzul Isle ',
  78: 'Hazhalm Testing Grounds ',
  79: 'Caedarva Mire ',
  80: 'Southern San dOria [S] ',
  81: 'East Ronfaure [S] ',
  82: 'Jugner Forest [S] ',
  83: 'Vunkerl Inlet [S] ',
  84: 'Batallia Downs [S] ',
  85: 'La Vaule [S] ',
  86: 'Everbloom Hollow ',
  87: 'Bastok Markets [S] ',
  88: 'North Gustaberg [S] ',
  89: 'Grauberg [S] ',
  90: 'Pashhow Marshlands [S] ',
  91: 'Rolanberry Fields [S] ',
  92: 'Beadeaux [S] ',
  93: 'Ruhotz Silvermines ',
  94: 'Windurst Waters [S] ',
  95: 'West Sarutabaruta [S] ',
  96: 'Fort Karugo-Narugo [S] ',
  97: 'Meriphataud Mountains [S] ',
  98: 'Sauromugue Champaign [S] ',
  99: 'Castle Oztroja [S] ',
  100: 'West Ronfaure ',
  101: 'East Ronfaure ',
  102: 'La Theine Plateau ',
  103: 'Valkurm Dunes ',
  104: 'Jugner Forest ',
  105: 'Batallia Downs ',
  106: 'North Gustaberg ',
  107: 'South Gustaberg ',
  108: 'Konschtat Highlands ',
  109: 'Pashhow Marshlands ',
  110: 'Rolanberry Fields ',
  111: 'Beaucedine Glacier ',
  112: 'Xarcabard ',
  113: 'Cape Teriggan ',
  114: 'Eastern Altepa Desert ',
  115: 'West Sarutabaruta ',
  116: 'East Sarutabaruta ',
  117: 'Tahrongi Canyon ',
  118: 'Buburimu Peninsula ',
  119: 'Meriphataud Mountains ',
  120: 'Sauromugue Champaign ',
  121: 'The Sanctuary of ZiTah ',
  122: 'RoMaeve ',
  123: 'Yuhtunga Jungle ',
  124: 'Yhoator Jungle ',
  125: 'Western Altepa Desert ',
  126: 'Qufim Island ',
  127: 'Behemoths Dominion ',
  128: 'Valley of Sorrows ',
  129: 'Ghoyus Reverie ',
  130: 'RuAun Gardens ',
  131: 'Mordion Gaol ',
  132: 'Abyssea-La Theine ',
  133: 133,
  134: 'Dynamis-Beaucedine ',
  135: 'Dynamis-Xarcabard ',
  136: 'Beaucedine Glacier [S] ',
  137: 'Xarcabard [S] ',
  138: 'Castle Zvahl Baileys [S] ',
  139: 'Horlais Peak ',
  140: 'Ghelsba Outpost ',
  141: 'Fort Ghelsba ',
  142: 'Yughott Grotto ',
  143: 'Palborough Mines ',
  144: 'Waughroon Shrine ',
  145: 'Giddeus ',
  146: 'Balgas Dais ',
  147: 'Beadeaux ',
  148: 'Qulun Dome ',
  149: 'Davoi ',
  150: 'Monastic Cavern ',
  151: 'Castle Oztroja ',
  152: 'Altar Room ',
  153: 'The Boyahda Tree ',
  154: 'Dragons Aery ',
  155: 'Castle Zvahl Keep [S] ',
  156: 'Throne Room [S] ',
  157: 'Middle Delkfutts Tower ',
  158: 'Upper Delkfutts Tower ',
  159: 'Temple of Uggalepih ',
  160: 'Den of Rancor ',
  161: 'Castle Zvahl Baileys ',
  162: 'Castle Zvahl Keep ',
  163: 'Sacrificial Chamber ',
  164: 'Garlaige Citadel [S] ',
  165: 'Throne Room ',
  166: 'Ranguemont Pass ',
  167: 'Bostaunieux Oubliette ',
  168: 'Chamber of Oracles ',
  169: 'Toraimarai Canal ',
  170: 'Full Moon Fountain ',
  171: 'Crawlers Nest [S] ',
  172: 'Zeruhn Mines ',
  173: 'Korroloka Tunnel ',
  174: 'Kuftal Tunnel ',
  175: 'The Eldieme Necropolis [S] ',
  176: 'Sea Serpent Grotto ',
  177: 'VeLugannon Palace ',
  178: 'The Shrine of RuAvitau ',
  179: 'Stellar Fulcrum ',
  180: 'LaLoff Amphitheater ',
  181: 'The Celestial Nexus ',
  182: 'Walk of Echoes ',
  183: 'Maquette Abdhaljs-Legion ',
  184: 'Lower Delkfutts Tower ',
  185: 'Dynamis-San dOria ',
  186: 'Dynamis-Bastok ',
  187: 'Dynamis-Windurst ',
  188: 'Dynamis-Jeuno ',
  189: 'Residential Area ',
  190: 'King Ranperres Tomb ',
  191: 'Dangruf Wadi ',
  192: 'Inner Horutoto Ruins ',
  193: 'Ordelles Caves ',
  194: 'Outer Horutoto Ruins ',
  195: 'The Eldieme Necropolis ',
  196: 'Gusgen Mines ',
  197: 'Crawlers Nest ',
  198: 'Maze of Shakhrami ',
  199: 'Residential Area ',
  200: 'Garlaige Citadel ',
  201: 'Cloister of Gales ',
  202: 'Cloister of Storms ',
  203: 'Cloister of Frost ',
  204: 'FeiYin ',
  205: 'Ifrits Cauldron ',
  206: 'QuBia Arena ',
  207: 'Cloister of Flames ',
  208: 'Quicksand Caves ',
  209: 'Cloister of Tremors ',
  210: 'GM Home ',
  211: 'Cloister of Tides ',
  212: 'Gustav Tunnel ',
  213: 'Labyrinth of Onzozo ',
  214: 'Residential Area ',
  215: 'Abyssea-Attohwa ',
  216: 'Abyssea-Misareaux ',
  217: 'Abyssea-Vunkerl ',
  218: 'Abyssea-Altepa ',
  219: 'Residential Area ',
  220: 'Ship bound for Selbina ',
  221: 'Ship bound for Mhaura ',
  222: 'Provenance ',
  223: 'San dOria-Jeuno Airship ',
  224: 'Bastok-Jeuno Airship ',
  225: 'Windurst-Jeuno Airship ',
  226: 'Kazham-Jeuno Airship ',
  227: 'Ship bound for Selbina Pirates ',
  228: 'Ship bound for Mhaura Pirates ',
  229: 229,
  230: 'Southern San dOria ',
  231: 'Northern San dOria ',
  232: 'Port San dOria ',
  233: 'Chateau dOraguille ',
  234: 'Bastok Mines ',
  235: 'Bastok Markets ',
  236: 'Port Bastok ',
  237: 'Metalworks ',
  238: 'Windurst Waters ',
  239: 'Windurst Walls ',
  240: 'Port Windurst ',
  241: 'Windurst Woods ',
  242: 'Heavens Tower ',
  243: 'RuLude Gardens ',
  244: 'Upper Jeuno ',
  245: 'Lower Jeuno ',
  246: 'Port Jeuno ',
  247: 'Rabao ',
  248: 'Selbina ',
  249: 'Mhaura ',
  250: 'Kazham ',
  251: 'Hall of the Gods ',
  252: 'Norg ',
  253: 'Abyssea-Uleguerand ',
  254: 'Abyssea-Grauberg ',
  255: 'Abyssea-Empyreal Paradox ',
  256: 'Western Adoulin ',
  257: 'Eastern Adoulin ',
  258: 'Rala Waterways ',
  259: 'Rala Waterways U ',
  260: 'Yahse Hunting Grounds ',
  261: 'Ceizak Battlegrounds ',
  262: 'Foret de Hennetiel ',
  263: 'Yorcia Weald ',
  264: 'Yorcia Weald U ',
  265: 'Morimar Basalt Fields ',
  266: 'Marjami Ravine ',
  267: 'Kamihr Drifts ',
  268: 'Sih Gates ',
  269: 'Moh Gates ',
  270: 'Cirdas Caverns ',
  271: 'Cirdas Caverns U ',
  272: 'Dho Gates ',
  273: 'Woh Gates ',
  274: 'Outer RaKaznar ',
  275: 'Outer RaKaznar U ',
  276: 'RaKaznar Inner Court ',
  277: 'RaKaznar Turris ',
  278: 278,
  279: 279,
  280: 'Mog Garden ',
  281: 'Leafallia ',
  282: 'Mount Kamihr ',
  283: 'Silver Knife ',
  284: 'Celennia Memorial Library ',
  285: 'Feretory ',
  286: 286,
  287: 287,
  288: 'Escha ZiTah ',
  289: 'Escha RuAun ',
  290: 'Desuetia Empyreal Paradox ',
  291: 'Reisenjima ',
  292: 'Reisenjima Henge ',
  293: 'Reisenjima Sanctorium ',
  294: 'Dynamis-San dOria [D] ',
  295: 'Dynamis-Bastok [D] ',
  296: 'Dynamis-Windurst [D] ',
  297: 'Dynamis-Jeuno [D] ',
}
