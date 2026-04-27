// ==UserScript==
// @name         Flowr - Community Renders
// @namespace    npm/vite-plugin-monkey
// @version      0.2.1
// @author       Guest, Jad, Mythicbee, NGL880 (artists), PigeonBar (coder)
// @description  A free, publicly available project for showcasing community-made renders.
// @icon         https://www.google.com/s2/favicons?sz=64&domain=flowr.fun
// @downloadURL  https://github.com/PigeonBar/flowr-community-renders/raw/refs/heads/main/dist/community-renders.user.js
// @updateURL    https://github.com/PigeonBar/flowr-community-renders/raw/refs/heads/main/dist/community-renders.user.js
// @match        https://flowr.fun/
// @grant        unsafeWindow
// ==/UserScript==

(function () {
  'use strict';

  class SelectRendersManager {
    /**
     * A saved record of the renders selected by the player.
     */
    savedSelections;
    constructor() {
      this.savedSelections = JSON.parse(
        localStorage.getItem("communityRenderSelections") ?? "{}"
      );
    }
    /**
     * Retrieves the render selected by the player, or "Base game" if the player
     * has not made a selection.
     */
    get(enemyType) {
      return this.savedSelections[enemyType] ?? "Base game";
    }
    /**
     * Saves a new selection to local storage, and also deletes the associated
     * `cachedImages` if the selected render has changed.
     * @param enemyType The {@linkcode EnemyType} being written to.
     * @param option The {@linkcode ArtistName} to write.
     */
    set(enemyType, option) {
      if (option !== this.get(enemyType)) {
        cachedImages.enemies[enemyType] = void 0;
        this.savedSelections[enemyType] = option;
        localStorage.setItem(
          "communityRenderSelections",
          JSON.stringify(this.savedSelections)
        );
      }
    }
  }
  const rendersManager = new SelectRendersManager();
  function isNil(arg) {
    return arg === void 0 || arg === null;
  }
  function getAllBiomeEnemiesMap() {
    return {
      garden: [
        ...biomeEnemyMap.garden,
        ...rareBiomeEnemyMap.garden,
        ...secretBiomeEnemyMap.garden
      ],
      desert: [
        ...biomeEnemyMap.desert,
        ...rareBiomeEnemyMap.desert,
        ...secretBiomeEnemyMap.desert
      ],
      ocean: [
        ...biomeEnemyMap.ocean,
        ...rareBiomeEnemyMap.ocean,
        ...secretBiomeEnemyMap.ocean
      ]
    };
  }
  const renderData = deepFreeze({
    Beetle: {
      Guest: {
        // Note: componentW and componentH were manually adjusted to center the
        // hitbox on the beetle's main body.
        paths: [
          // Mid right leg
          {
            pathData: "m 590.39014,646.64372 c 7.24106,-0.13418 14.48427,-0.11716 21.72635,-0.12026 6.21981,0.009 12.43955,0.0294 18.65906,0.0931 1.97929,0.0278 3.95873,0.0404 5.93814,0.0512 1.71726,-0.005 3.4345,-0.009 5.15176,-0.0143 1.54065,0.002 3.08135,0.0195 4.62198,0.0131 1.44856,0.0874 2.03295,0.17549 2.77993,-1.17268 0,0 -13.08211,-7.48773 -13.08211,-7.48773 v 0 c 0.12242,-0.36203 -1.32326,-0.12131 -1.85274,-0.17065 -1.52862,-0.006 -3.05731,0.0113 -4.58595,0.0131 -1.73043,-0.006 -3.46083,-0.009 -5.19125,-0.0143 -1.93242,0.0107 -3.86486,0.0231 -5.79716,0.0512 -6.13404,0.0646 -12.26833,0.0835 -18.40268,0.0931 -7.35244,-0.003 -14.70593,0.0118 -22.05741,-0.12026 z",
            baseFill: "#7f467e",
            baseStroke: "#000000",
            baseStrokeWidth: 26.4567,
            adjustX: 2.8628501,
            adjustY: 0,
            componentW: 739,
            componentH: 1180,
            wiggleInterval: 17 * 2 * Math.PI,
            wiggleMagnitude: 0.15,
            randomWiggleOffset: true
          },
          // Bottom right leg
          {
            pathData: "m 565.00407,794.53719 c 1.77048,3.67765 3.98988,7.12476 6.99179,9.90837 1.89748,1.85737 4.24224,2.94773 6.49471,4.2491 2.0923,1.29866 4.16554,2.65219 5.98703,4.31846 1.96387,1.28494 3.60012,2.90069 5.28713,4.49718 1.4217,1.51462 2.81722,2.95585 4.04536,4.64223 1.26477,1.39104 2.53343,2.79991 3.78701,4.22112 1.10977,1.04094 2.14945,2.18692 3.49539,2.93817 1.07109,1.09505 1.97776,2.33813 2.94638,3.52332 0.72658,1.03313 1.3304,2.32996 2.24582,3.20814 0.46369,0.27756 1.22686,1.13781 1.80422,0.82341 1.10549,-0.54483 1.24562,1.34318 1.96899,1.42045 0.52865,0.51464 0.78023,1.30802 1.4511,1.6378 0,0 -12.72705,8.01742 -12.72705,8.01742 v 0 c -0.54184,-0.51263 -0.94875,-1.09567 -1.46683,-1.62729 -0.79442,-0.81841 -0.52645,-0.6931 -1.57147,-0.80539 -0.85721,-0.42948 -1.63657,-0.98456 -2.30741,-1.67592 -0.85354,-1.01785 -1.57751,-2.18921 -2.30965,-3.28962 -0.82546,-1.07577 -1.62864,-2.21071 -2.65996,-3.09596 -1.36563,-0.93653 -2.55866,-2.13942 -3.69803,-3.32954 -1.2681,-1.45871 -2.61873,-2.84573 -3.8491,-4.32609 -1.1989,-1.58999 -2.52552,-3.00488 -3.90735,-4.43866 -1.63852,-1.61852 -3.37577,-3.07703 -5.2282,-4.45454 -1.80431,-1.53486 -3.78794,-2.83802 -5.83047,-4.03367 -2.39519,-1.27625 -4.64413,-2.73736 -6.61149,-4.63299 -2.98781,-2.97908 -5.29239,-6.48214 -7.27366,-10.198 z",
            baseFill: "#7f467e",
            baseStroke: "#000000",
            baseStrokeWidth: 26.4567,
            adjustX: 2.8628501,
            adjustY: 0,
            componentW: 739,
            componentH: 1180,
            wiggleInterval: 17 * 2 * Math.PI,
            wiggleMagnitude: 0.15,
            randomWiggleOffset: true
          },
          // Bottom left leg
          {
            pathData: "m 155.43948,799.67752 c -1.77048,3.67765 -3.98988,7.12476 -6.99179,9.90837 -1.89748,1.85737 -4.24224,2.94773 -6.49471,4.2491 -2.0923,1.29866 -4.16554,2.65219 -5.98703,4.31846 -1.96387,1.28494 -3.60012,2.90069 -5.28713,4.49718 -1.4217,1.51462 -2.81722,2.95585 -4.04536,4.64223 -1.26477,1.39104 -2.53343,2.79991 -3.78701,4.22112 -1.10977,1.04094 -2.14945,2.18692 -3.49539,2.93817 -1.07109,1.09505 -1.97776,2.33813 -2.94638,3.52332 -0.72658,1.03313 -1.3304,2.32996 -2.24582,3.20814 -0.46369,0.27756 -1.22686,1.13781 -1.80422,0.82341 -1.10549,-0.54483 -1.24562,1.34318 -1.96899,1.42045 -0.52865,0.51464 -0.78023,1.30802 -1.4511,1.6378 0,0 12.72705,8.01742 12.72705,8.01742 v 0 c 0.54184,-0.51263 0.94875,-1.09567 1.46683,-1.62729 0.79442,-0.81841 0.52645,-0.6931 1.57147,-0.80539 0.85721,-0.42948 1.63657,-0.98456 2.30741,-1.67592 0.85354,-1.01785 1.57751,-2.18921 2.30965,-3.28962 0.82546,-1.07577 1.62864,-2.21071 2.65996,-3.09596 1.36563,-0.93653 2.55866,-2.13942 3.69803,-3.32954 1.2681,-1.45871 2.61873,-2.84573 3.8491,-4.32609 1.1989,-1.58999 2.52552,-3.00488 3.90735,-4.43866 1.63852,-1.61852 3.37577,-3.07703 5.2282,-4.45454 1.80431,-1.53486 3.78794,-2.83802 5.83047,-4.03367 2.39519,-1.27625 4.64413,-2.73736 6.61149,-4.63299 2.98781,-2.97908 5.29239,-6.48214 7.27366,-10.198 z",
            baseFill: "#7f467e",
            baseStroke: "#000000",
            baseStrokeWidth: 26.4567,
            adjustX: 2.8628501,
            adjustY: 0,
            componentW: 739,
            componentH: 1180,
            wiggleInterval: 17 * 2 * Math.PI,
            wiggleMagnitude: 0.15,
            randomWiggleOffset: true
          },
          // Mid left leg
          {
            pathData: "m 132.15626,637.86672 c -8.9812,0.20102 -17.96506,0.15506 -26.9477,0.12976 -6.4637,-0.005 -12.92715,-0.0609 -19.390616,-0.10714 -2.065092,-0.0151 -4.130231,-0.057 -6.195419,-0.0535 -1.155834,-0.003 -2.311764,-0.0117 -3.467586,-0.003 -1.00346,-0.009 -2.006858,-7.2e-4 -3.010312,-0.006 -0.544632,0.009 -1.089328,0.005 -1.633982,0.002 0,0 12.17627,8.84657 12.17627,8.84657 v 0 c 0.546359,-0.003 1.092758,-0.007 1.639097,0.002 0.997517,-0.006 1.994978,0.002 2.992502,-0.006 1.152658,0.008 2.305421,1.8e-4 3.458089,-0.003 2.016064,0.003 4.032072,-0.0379 6.048037,-0.0535 6.36515,-0.0464 12.73029,-0.1021 19.09568,-0.10714 9.10174,-0.0258 18.20454,-0.0673 27.30491,0.12976 z",
            baseFill: "#7f467e",
            baseStroke: "#000000",
            baseStrokeWidth: 26.4567,
            adjustX: 2.8628501,
            adjustY: 0,
            componentW: 739,
            componentH: 1180,
            wiggleInterval: 17 * 2 * Math.PI,
            wiggleMagnitude: 0.15,
            randomWiggleOffset: true
          },
          // Top left leg
          {
            pathData: "m 161.42271,544.01365 c -6.27856,-3.47121 -12.10671,-7.65975 -17.8614,-11.92357 -7.70674,-6.02447 -15.28744,-12.20059 -22.60269,-18.69528 -3.81614,-3.44359 -7.54222,-6.98599 -11.18038,-10.61683 -4.94886,-4.23108 -10.510254,-9.08197 -17.155982,-9.35831 -0.21562,0.009 -0.442437,0.0951 -0.646861,0.026 -0.372254,-0.12588 -1.228248,-0.97107 -0.886498,-0.7771 30.553921,17.34189 1.808968,1.02764 -1.177385,-0.7017 -0.629286,-0.12293 -0.325359,-0.0645 -0.911708,-0.17554 0,0 11.933064,9.19138 11.933064,9.19138 v 0 c 0.50082,0.20166 0.2483,0.0832 0.75463,0.3615 -33.054788,-19.38386 0.94275,0.67914 1.10314,0.7713 0.58799,0.33785 1.26932,0.13129 1.89697,0.29509 0.69047,0.14821 2.32269,1.01136 1.64115,0.61445 -21.659036,-12.61359 -14.802916,-8.8018 -10.337654,-5.94708 3.77258,3.68182 7.587134,7.32141 11.517484,10.83542 7.31042,6.54865 14.9459,12.69912 22.60683,18.83072 5.59202,4.23099 11.24188,8.43336 17.35794,11.88793 z",
            baseFill: "#7f467e",
            baseStroke: "#000000",
            baseStrokeWidth: 30.2362,
            adjustX: 2.8628501,
            adjustY: 0,
            componentW: 739,
            componentH: 1180,
            wiggleInterval: 17 * 2 * Math.PI,
            wiggleMagnitude: 0.15,
            randomWiggleOffset: true
          },
          // Top right leg
          {
            pathData: "m 583.45426,521.924 c 6.72108,-6.40418 13.73929,-12.49918 20.84123,-18.47631 6.04922,-5.14731 12.332,-10.00449 18.57174,-14.91572 2.3065,-2.22474 4.76993,-4.27511 7.45474,-6.01658 1.12419,-0.46785 1.7545,-1.52795 2.69825,-2.2307 0,0 -12.7263,-7.9653 -12.7263,-7.9653 v 0 c -0.83723,0.74923 -1.56126,1.6173 -2.58136,2.1403 -2.62242,1.86795 -5.05613,3.94945 -7.32118,6.24407 -6.09228,5.05107 -12.35354,9.89562 -18.2971,15.12587 -7.14738,6.06722 -14.21255,12.23107 -21.35802,18.30077 z",
            baseFill: "#7f467e",
            baseStroke: "#000000",
            baseStrokeWidth: 26.4567,
            adjustX: 2.8628501,
            adjustY: 0,
            componentW: 739,
            componentH: 1180,
            wiggleInterval: 17 * 2 * Math.PI,
            wiggleMagnitude: 0.15,
            randomWiggleOffset: true
          },
          // Left mandible
          {
            pathData: "m 276.91226,367.7547 -33.43225,-117.89265 22.8747,-126.69062 38.71102,86.22001 -12.31714,56.30694 47.50898,63.34531 z",
            baseFill: "#1a1a1a",
            baseStroke: "#000000",
            baseStrokeWidth: 26.4567,
            adjustX: 2.8628501,
            adjustY: 0,
            componentW: 739,
            componentH: 1180,
            wiggleInterval: 18 * 2 * Math.PI,
            wiggleMagnitude: 0.05
          },
          // Right mandible
          {
            pathData: "m 452.03757,352.5681 33.43225,-117.89265 -22.8747,-126.69062 -38.71102,86.22001 12.31714,56.30694 -47.50898,63.34531 z",
            baseFill: "#1a1a1a",
            baseStroke: "#000000",
            baseStrokeWidth: 26.4567,
            adjustX: 2.8628501,
            adjustY: 0,
            componentW: 739,
            componentH: 1180,
            wiggleInterval: 18 * 2 * Math.PI,
            wiggleMagnitude: -0.05
          },
          // Main body
          {
            pathData: "m 598.0679,653.23395 c 0,97.22684 -27.66148,252.61345 -215.88994,252.61345 -183.77713,0 -215.88994,-148.7096 -215.88994,-252.61345 0,-101.67819 36.56414,-252.61348 215.88994,-252.61348 183.77714,0 215.88994,146.48395 215.88994,252.61348 z m -31.16535,1.43985 c 0,97.22684 -27.66148,252.6135 -215.88994,252.6135 -183.77714,0 -215.88995,-148.70965 -215.88995,-252.6135 0,-101.67819 36.56414,-252.61349 215.88995,-252.61349 183.77714,0 215.88994,146.48396 215.88994,252.61349 z",
            baseFill: "#7f467e",
            baseStroke: "#633662",
            baseStrokeWidth: 30.2362,
            adjustX: 2.8628501,
            adjustY: 0,
            componentW: 739,
            componentH: 1180
          },
          // Beetle head
          {
            pathData: "m 366.44421,573.23118 c -65.83307,0 -171.04659,-17.69548 -171.04659,-138.10819 0,-117.56513 100.69249,-138.1082 171.04659,-138.1082 68.84713,0 171.04662,23.39067 171.04662,138.1082 0,117.56514 -99.18547,138.10819 -171.04662,138.10819 z m -0.97492,-19.93696 c -65.8331,0 -171.04664,-17.69548 -171.04664,-138.10821 0,-117.56513 100.69246,-138.10819 171.04664,-138.10819 68.84709,0 171.04662,23.39065 171.04662,138.10819 0,117.56515 -99.18548,138.10821 -171.04662,138.10821 z",
            baseFill: "#7f467e",
            baseStroke: "#633662",
            baseStrokeWidth: 37.7953,
            adjustX: 2.8628501,
            adjustY: 0,
            componentW: 739,
            componentH: 1180
          },
          // Middle body line
          {
            pathData: "m 354.72662,564.67559 c 0.20001,9.36917 0.2604,18.7411 0.32564,28.11203 0.29638,16.73999 -0.24663,33.47885 -1.14234,50.19318 -1.29984,16.1026 -1.58011,32.2543 -2.26768,48.38633 -0.93671,18.03083 -1.35278,36.08079 -1.50445,54.13338 -0.41383,16.83068 -0.19374,33.64511 0.40823,50.46547 0.39145,8.69518 0.72526,17.47401 2.09413,26.08474 0.55693,2.73587 1.21581,5.4494 1.79608,8.18026 0.16846,0.9408 0.24257,1.89302 0.24631,2.84762 -0.20236,1.1059 0.48801,1.65607 1.06565,2.50353 1.21973,1.43094 2.12509,3.04393 3.01853,4.69482 1.4341,2.35206 2.31772,4.96951 3.39923,7.49041 0.61505,1.39712 0.86127,3.01955 2.01353,4.11361 0.0417,-0.0586 0.0834,-0.11723 0.12513,-0.17585 0,0 13.28555,7.16017 13.28555,7.16017 v 0 c 0.0707,-0.18215 0.14147,-0.3643 0.21221,-0.54645 -0.14078,-1.63699 -2.14823,-2.49658 -2.03555,-4.32608 -1.17332,-2.52992 -2.00602,-5.19515 -3.37941,-7.61814 -0.90208,-1.6104 -1.51271,-3.45849 -2.83145,-4.76392 -0.18881,-0.27993 -0.75048,-1.47761 -1.02497,-1.56397 -0.15132,-0.0476 -0.27527,0.25881 -0.42655,0.21104 -0.10991,-0.0347 -1.1e-4,-0.23051 -1.7e-4,-0.34577 -0.002,-1.03942 0.0164,-2.07703 -0.17464,-3.10523 -0.42218,-2.80983 -1.48191,-5.50886 -2.01548,-8.29884 -1.84637,-8.55959 -2.08298,-17.45788 -2.71169,-26.16038 -0.82115,-16.85212 -1.18255,-33.70466 -0.79882,-50.578 0.29808,-18.00468 0.6664,-36.01055 1.68273,-53.99208 0.74563,-16.13293 1.03496,-32.28761 2.20827,-48.40106 0.92753,-16.6982 1.44485,-33.42283 1.39842,-50.14798 0.0649,-9.26031 0.12427,-18.52168 0.32565,-27.78018 z",
            baseFill: "#7f467e",
            baseStroke: "#633662",
            baseStrokeWidth: 26.4567,
            adjustX: 2.8628501,
            adjustY: 0,
            componentW: 739,
            componentH: 1180
          },
          // Left body line (covers up a sprite gap)
          {
            pathData: "m 141.82873,577.20969 c 0.20227,9.53193 0.23914,19.06764 0.28662,28.60155 0.11108,14.88766 0.0578,29.77562 0.0612,44.66346 0.041,11.38939 -0.11747,22.7779 -0.20669,34.16662 -0.0459,5.58953 -0.0801,11.1792 -0.1111,16.76885 -0.0155,3.36683 -0.0182,6.73372 -0.0562,10.10039 -0.23295,2.06683 0.67513,3.9033 1.17563,5.8444 0.18566,1.58459 1.11446,2.88539 1.70661,4.31816 0.42107,0.96826 0.50346,2.00983 0.58555,3.04742 -0.0709,1.19023 0.082,2.18108 0.6836,3.21933 1.35069,2.2469 1.96652,4.79281 2.90169,7.21761 0.72066,2.31101 1.87578,4.44523 2.79492,6.67708 0.18436,0.56227 0.36091,1.1322 0.44995,1.71719 0,0 12.83266,7.90134 12.83266,7.90134 v 0 c 0.90926,-1.13521 0.74324,-1.93078 0.29608,-3.26608 -0.69827,-2.35445 -2.18661,-4.38043 -2.83523,-6.74724 -0.93363,-2.42584 -1.52242,-4.97964 -2.77608,-7.2584 -0.38645,-1.08743 -1.17684,-1.40925 -0.9174,-2.67602 0.007,-1.16319 -0.0876,-2.36436 -0.3981,-3.48363 -0.47815,-1.48319 -1.38995,-2.69632 -1.80628,-4.17935 -0.42933,-1.88275 -1.35677,-3.62262 -1.37465,-5.54546 -0.0377,-3.38575 -0.0408,-6.77171 -0.0562,-10.15763 -0.031,-5.62738 -0.0653,-11.25478 -0.1111,-16.88205 -0.0891,-11.45894 -0.247,-22.91766 -0.20669,-34.37726 0.003,-14.86705 -0.0501,-29.73424 0.0612,-44.60112 0.0472,-9.43654 0.083,-18.87496 0.28662,-28.30947 z",
            baseFill: "#7f467e",
            baseStroke: "#633662",
            baseStrokeWidth: 26.4567,
            adjustX: 2.8628501,
            adjustY: 0,
            componentW: 739,
            componentH: 1180
          },
          // Right body line (covers up a sprite gap)
          {
            pathData: "m 567.64996,552.57541 c 0.36611,11.52471 0.30852,23.06091 0.27319,34.59045 0.007,9.72069 -0.0935,19.44082 -0.15075,29.16119 -0.0463,7.32515 -0.003,14.65027 0.0302,21.97534 0.0177,8.79932 0.0417,17.59852 -0.0103,26.39776 -0.0357,6.50423 -0.061,13.00849 -0.0656,19.51282 -0.029,5.62594 0.007,11.25177 -0.0111,16.87771 -0.0108,4.77988 -0.0231,9.55976 -0.0404,14.33964 -0.0161,3.81179 -0.008,7.62345 -0.0195,11.43521 0.0215,3.86423 -0.78533,7.67373 -1.22684,11.50317 -0.13737,3.18733 -1.14079,6.23112 -1.77115,9.33562 -0.0695,2.15107 -0.83704,4.07925 -1.52558,6.07393 -0.45249,1.36412 -0.6896,2.8005 -0.79286,4.23217 -0.39128,0.83668 -1.00501,1.44703 -1.36391,2.32533 -0.32301,0.75396 -0.40249,1.54679 -0.44184,2.35608 0.14923,0.606 -0.11201,0.14381 -0.13628,0.10022 0,0 12.67074,8.1613 12.67074,8.1613 v 0 c 0.3965,-0.36113 0.9653,-0.78018 0.87213,-1.38679 10e-4,-0.64814 -0.0305,-1.29107 0.19255,-1.91225 0.34507,-1.0112 1.30295,-1.66967 1.56817,-2.7429 0.0471,-1.31214 0.17441,-2.63649 0.56717,-3.89487 0.6732,-2.06821 1.5658,-4.04935 1.57788,-6.27368 0.57356,-3.16388 1.57892,-6.25942 1.74174,-9.48542 0.41291,-3.88337 1.24949,-7.7356 1.32343,-11.63797 -0.0119,-3.81841 -0.004,-7.6367 -0.0196,-11.45513 -0.0173,-4.79361 -0.0296,-9.58722 -0.0404,-14.38083 -0.0178,-5.62971 0.0178,-11.2593 -0.0111,-16.88901 -0.005,-6.52662 -0.0301,-13.05318 -0.0656,-19.5797 -0.0517,-8.80275 -0.0283,-17.60545 -0.0103,-26.40828 0.0337,-7.31481 0.0765,-14.62967 0.0302,-21.94456 -0.0572,-9.77158 -0.15744,-19.54292 -0.15075,-29.31481 -0.0349,-11.43667 -0.0968,-22.88039 0.2732,-34.31205 z",
            baseFill: "#7f467e",
            baseStroke: "#633662",
            baseStrokeWidth: 26.4567,
            adjustX: 2.8628501,
            adjustY: 0,
            componentW: 739,
            componentH: 1180
          }
        ],
        scale: 300,
        rotation: Math.PI / 2
      }
    },
    "Desert Moth": {
      NGL880: {
        // Note: components were manually moved around because the SVG data has
        // them all centred together instead.
        paths: [
          // Bottom wing shape
          {
            pathData: "M242.12594,238.61553c-49.37808,15.11132 -81.928,-3.77179 -92.27158,-37.57069c-10.34358,-33.79891 36.22895,-61.36001 85.60703,-76.47133c49.37809,-15.11132 96.13756,-5.36832 96.13756,-5.36832c0,0 -40.09493,104.29902 -89.47301,119.41034z",
            baseFill: "#b28300",
            baseStroke: "#9a4500",
            baseStrokeWidth: 7.5,
            adjustX: -144.65105 + 10,
            adjustY: -112.36452 + 60,
            componentW: 192.03085,
            componentH: 135.27096,
            wiggleInterval: 15 * 2 * Math.PI,
            wiggleMagnitude: 0.08
          },
          // Dot 1 on bottom wing
          {
            pathData: "M252.91609,208.12172c-5.66497,1.23948 -11.26215,-2.3481 -12.50163,-8.01307c-1.23948,-5.66498 2.3481,-11.26215 8.01307,-12.50162c5.66497,-1.23948 11.26215,2.34809 12.50163,8.01306c1.23948,5.66497 -2.34809,11.26215 -8.01307,12.50163z",
            baseFill: "#c05500",
            baseStroke: "#c05500",
            baseStrokeWidth: 7.5,
            adjustX: -144.65105 + 10,
            adjustY: -112.36452 + 60,
            componentW: 192.03085,
            componentH: 135.27096,
            wiggleInterval: 15 * 2 * Math.PI,
            wiggleMagnitude: 0.08
          },
          // Dot 2 on bottom wing
          {
            pathData: "M202.62218,170.39537c-4.04641,0.88534 -8.04439,-1.67721 -8.92973,-5.72362c-0.88534,-4.04642 1.67721,-8.04439 5.72362,-8.92973c4.04642,-0.88535 8.04439,1.6772 8.92974,5.72362c0.88534,4.04642 -1.67721,8.04439 -5.72362,8.92973z",
            baseFill: "#c05500",
            baseStroke: "#c05500",
            baseStrokeWidth: 7.5,
            adjustX: -144.65105 + 10,
            adjustY: -112.36452 + 60,
            componentW: 192.03085,
            componentH: 135.27096,
            wiggleInterval: 15 * 2 * Math.PI,
            wiggleMagnitude: 0.08
          },
          // Dot 3 on bottom wing
          {
            pathData: "M173.26955,196.89289c-2.42785,0.5312 -4.82664,-1.00632 -5.35784,-3.43417c-0.5312,-2.42784 1.00633,-4.82664 3.43417,-5.35784c2.42784,-0.5312 4.82664,1.00633 5.35784,3.43417c0.5312,2.42784 -1.00633,4.82663 -3.43417,5.35784z",
            baseFill: "#bf5500",
            baseStroke: "#c05500",
            baseStrokeWidth: 7.5,
            adjustX: -144.65105 + 10,
            adjustY: -112.36452 + 60,
            componentW: 192.03085,
            componentH: 135.27096,
            wiggleInterval: 15 * 2 * Math.PI,
            wiggleMagnitude: 0.08
          },
          // Dot 4 on bottom wing
          {
            pathData: "M284.91942,165.13803c-8.69978,1.90349 -17.29544,-3.606 -19.19893,-12.30579c-1.90349,-8.69978 3.60601,-17.29544 12.30579,-19.19893c8.69978,-1.90349 17.29544,3.606 19.19893,12.30579c1.90349,8.69978 -3.606,17.29544 -12.30579,19.19893z",
            baseFill: "#c05500",
            baseStroke: "#bf5600",
            baseStrokeWidth: 7.5,
            adjustX: -144.65105 + 10,
            adjustY: -112.36452 + 60,
            componentW: 192.03085,
            componentH: 135.27096,
            wiggleInterval: 15 * 2 * Math.PI,
            wiggleMagnitude: 0.08
          },
          // Top wing shape
          {
            pathData: "M331.59895,240.79481c0,0 -46.75948,9.743 -96.13756,-5.36832c-49.37809,-15.11132 -95.95061,-42.67243 -85.60703,-76.47133c10.34358,-33.7989 42.89349,-52.68201 92.27158,-37.57069c49.37809,15.11132 89.47301,119.41034 89.47301,119.41034z",
            baseFill: "#b28300",
            baseStroke: "#9a4500",
            baseStrokeWidth: 7.5,
            adjustX: -144.65105 + 10,
            adjustY: -112.36452 - 60,
            componentW: 192.03085,
            componentH: 135.27096,
            wiggleInterval: 15 * 2 * Math.PI,
            wiggleMagnitude: -0.08
          },
          // Dot 1 on top wing
          {
            pathData: "M220.92916,208.3799c-1.23948,5.66498 -6.83665,9.25255 -12.50163,8.01307c-5.66498,-1.23948 -9.25255,-6.83665 -8.01307,-12.50163c1.23948,-5.66498 6.83665,-9.25255 12.50163,-8.01307c5.66498,1.23948 9.25255,6.83665 8.01307,12.50163z",
            baseFill: "#c05500",
            baseStroke: "#c05500",
            baseStrokeWidth: 7.5,
            adjustX: -144.65105 + 10,
            adjustY: -112.36452 - 60,
            componentW: 192.03085,
            componentH: 135.27096,
            wiggleInterval: 15 * 2 * Math.PI,
            wiggleMagnitude: -0.08
          },
          // Dot 2 on top wing
          {
            pathData: "M281.3458,175.53437c-0.88534,4.04641 -4.88332,6.60896 -8.92973,5.72362c-4.04641,-0.88534 -6.60896,-4.88332 -5.72362,-8.92973c0.88534,-4.04641 4.88332,-6.60896 8.92973,-5.72362c4.04641,0.88534 6.60896,4.88332 5.72362,8.92973z",
            baseFill: "#c05500",
            baseStroke: "#c05500",
            baseStrokeWidth: 7.5,
            adjustX: -144.65105 + 10,
            adjustY: -112.36452 - 60,
            componentW: 192.03085,
            componentH: 135.27096,
            wiggleInterval: 15 * 2 * Math.PI,
            wiggleMagnitude: -0.08
          },
          // Dot 3 on top wing
          {
            pathData: "M276.70372,215.46494c-0.53121,2.42785 -2.92999,3.96538 -5.35784,3.43417c-2.42785,-0.53121 -3.96538,-2.92999 -3.43417,-5.35784c0.53121,-2.42785 2.92999,-3.96538 5.35784,-3.43417c2.42785,0.53121 3.96538,2.92999 3.43417,5.35784z",
            baseFill: "#bf5500",
            baseStroke: "#c05500",
            baseStrokeWidth: 7.5,
            adjustX: -144.65105 + 10,
            adjustY: -112.36452 - 60,
            componentW: 192.03085,
            componentH: 135.27096,
            wiggleInterval: 15 * 2 * Math.PI,
            wiggleMagnitude: -0.08
          },
          // Dot 4 on top wing
          {
            pathData: "M242.2252,149.0609c-1.90349,8.69978 -10.49915,14.20927 -19.19893,12.30578c-8.69978,-1.90349 -14.20927,-10.49915 -12.30578,-19.19893c1.90349,-8.69978 10.49915,-14.20927 19.19893,-12.30578c8.69978,1.90349 14.20927,10.49915 12.30578,19.19893z",
            baseFill: "#c05500",
            baseStroke: "#bf5600",
            baseStrokeWidth: 7.5,
            adjustX: -144.65105 + 10,
            adjustY: -112.36452 - 60,
            componentW: 192.03085,
            componentH: 135.27096,
            wiggleInterval: 15 * 2 * Math.PI,
            wiggleMagnitude: -0.08
          },
          // Main body/head
          {
            pathData: "M268.5,180c0,14.47587 -12.75988,21.5 -28.5,21.5c-15.74012,0 -28.5,-9.62588 -28.5,-21.5c0,-11.87412 12.75988,-21.5 28.5,-21.5c15.74012,0 28.5,7.02413 28.5,21.5z",
            baseFill: "#daa000",
            baseStroke: "#cc7900",
            baseStrokeWidth: 7.5,
            adjustX: -207.75 + 100,
            adjustY: -154.75,
            componentW: 64.5,
            componentH: 50.5
          },
          // Top eye
          {
            pathData: "M264.5,169.5c0,2.76142 -2.23858,5 -5,5c-2.76142,0 -5,-2.23858 -5,-5c0,-2.76142 2.23858,-5 5,-5c2.76142,0 5,2.23858 5,5z",
            baseFill: "#000000",
            baseStroke: "#000000",
            baseStrokeWidth: 7.5,
            adjustX: -207.75 + 100,
            adjustY: -154.75,
            componentW: 64.5,
            componentH: 50.5
          },
          // Bottom eye
          {
            pathData: "M264.5,190.5c0,2.76143 -2.23858,5 -5,5c-2.76142,0 -5,-2.23857 -5,-5c0,-2.76143 2.23858,-5 5,-5c2.76142,0 5,2.23857 5,5z",
            baseFill: "#000000",
            baseStroke: "#000000",
            baseStrokeWidth: 7.5,
            adjustX: -207.75 + 100,
            adjustY: -154.75,
            componentW: 64.5,
            componentH: 50.5
          }
        ],
        scale: 110,
        rotationPivot: { x: 110, y: 0 }
      }
    },
    Sandstorm: {
      Mythicbee: {
        paths: [
          // Back layer
          {
            pathData: "M197.49765,242.59565c-7.33288,-12.87272 -30.20941,-53.07359 -33.77659,-59.3406c-0.91807,-1.6129 -0.81747,-4.36033 0.64275,-6.78098c7.77542,-12.8895 32.67215,-54.16141 36.56399,-60.61301c1.00338,-1.66333 3.62993,-2.95417 5.76425,-2.85643c7.90885,0.36221 56.43182,2.58448 71.17601,3.25974c2.68102,0.12278 4.87375,1.30119 5.96121,3.21595c6.36982,11.21581 28.48417,50.15423 32.23811,56.76405c1.05881,1.86434 1.23166,4.73262 -0.03956,6.90341c-7.10095,12.12602 -30.80144,52.59843 -34.97952,59.73317c-1.22965,2.09983 -4.23813,3.93019 -7.48681,3.92047c-15.54626,-0.0465 -61.21642,-0.18315 -69.31012,-0.20736c-2.40111,-0.00718 -5.32665,-1.4913 -6.7537,-3.99842c0,0 -0.00487,0.00943 0,0.00001z",
            baseFill: "#f2e8d8",
            baseStroke: "#ded0bf",
            baseStrokeWidth: 4.5,
            adjustX: -160.952,
            adjustY: -110.75699,
            componentW: 158.2193,
            componentH: 137.96904,
            rotationSpeed: 0.8
          },
          // Back_mid layer
          {
            pathData: "M171.15122,192.60255c0.82004,-2.93259 2.73875,-9.79424 4.59585,-16.43554c2.25288,-8.0567 10.79341,-14.00404 10.79341,-14.00404c0,0 -3.88122,-10.71515 -1.64708,-18.70479c1.54754,-5.53428 2.96891,-10.61733 3.34678,-11.96864c0.46448,-1.66107 2.3443,-3.39161 4.89762,-4.01069c3.05477,-0.74067 10.41189,-2.52449 17.45477,-4.23213c8.23271,-1.99613 17.68819,0.55618 17.68819,0.55618c0,0 6.74628,-6.48064 14.7742,-8.42711c6.35434,-1.54069 12.47654,-3.02509 14.01798,-3.39884c1.75449,-0.42539 4.32469,0.46454 5.65608,1.93768c1.10788,1.22582 5.27012,5.83117 9.71265,10.74665c6.0887,6.73689 6.15141,15.48048 6.15141,15.48048c0,0 10.989,3.48467 15.95812,8.98278c4.95121,5.4783 10.43117,11.54165 12.578,13.91704c1.67245,1.8505 2.32853,4.06901 1.77553,6.03935c-0.65385,2.32965 -2.21872,7.90535 -3.81826,13.60454c-2.22516,7.92825 -9.99632,12.39018 -9.99632,12.39018c0,0 3.59417,10.42071 1.63492,17.40158c-1.83561,6.5403 -3.73661,13.31362 -4.21432,15.01572c-0.53844,1.91847 -2.31922,3.90857 -4.58395,4.48904c-2.55858,0.65578 -8.70393,2.23089 -14.70895,3.77003c-7.39962,1.89659 -16.53395,-2.23646 -16.53395,-2.23646c0,0 -5.60077,7.90978 -13.53136,9.94246c-7.59763,1.94734 -15.54591,3.98456 -17.54364,4.49658c-2.19068,0.56149 -5.3669,-0.22775 -7.48528,-2.3791c-2.24262,-2.27754 -7.25329,-7.36618 -12.18809,-12.37779c-6.37025,-6.46939 -6.9347,-16.28891 -6.9347,-16.28891c0,0 -10.87888,-1.80192 -16.06723,-7.07101c-4.40873,-4.47734 -8.80943,-8.94653 -10.00516,-10.16088c-1.56569,-1.59007 -2.49923,-4.49237 -1.77722,-7.07438z",
            baseFill: "#f0ddc0",
            baseStroke: "#d9c4a5",
            baseStrokeWidth: 4.5,
            adjustX: -168.90122,
            adjustY: -109.72695,
            componentW: 142.16981,
            componentH: 140.6526,
            rotationSpeed: -1.2
          },
          // Mid layer
          {
            pathData: "M264.63727,237.14579c0,0 -17.62291,0.43644 -27.06576,-4.63006c-9.44285,-5.0665 -12.09413,-16.38091 -12.09413,-16.38091c0,0 -14.38211,4.00644 -23.11308,1.65086c-8.73097,-2.35558 -19.51287,-13.15119 -19.51287,-13.15119c0,0 0.397,-17.07194 4.58193,-26.83889c4.18492,-9.76695 12.42989,-12.86399 12.42989,-12.86399c0,0 -1.3531,-13.44064 1.51882,-21.23823c2.87192,-7.7976 13.98066,-20.84473 13.98066,-20.84473c0,0 15.77983,-0.28659 24.39056,4.07062c8.61073,4.35721 14.45464,15.58588 14.45464,15.58588c0,0 12.66218,-4.51542 20.29587,-2.23018c7.63368,2.28524 22.64477,15.08498 22.64477,15.08498c0,0 -0.04124,15.047 -3.89114,23.51452c-3.8499,8.46752 -14.27165,16.43294 -14.27165,16.43294c0,0 3.3905,11.80393 1.01607,18.72747c-2.37443,6.92355 -15.36458,23.11091 -15.36458,23.11091z",
            baseFill: "#f2d8c2",
            baseStroke: "#d9bca5",
            baseStrokeWidth: 4.5,
            adjustX: -180.57967,
            adjustY: -120.59865,
            componentW: 118.82174,
            componentH: 118.80657,
            rotationSpeed: 1.6
          },
          // Front_mid layer
          {
            pathData: "M204.68969,214.6642l-4.23231,-21.42462c0,0 8.8368,-7.30037 9.04047,-13.70432c0.20365,-6.40395 -8.07568,-16.63329 -8.07568,-16.63329l4.24073,-18.22785l21.24239,-4.20377c0,0 7.73315,5.3816 13.37939,5.51603c5.64623,0.13443 15.91564,-4.81858 15.91564,-4.81858l19.45267,4.47952l3.88964,19.27814c0,0 -7.46758,8.56159 -7.48386,15.15938c-0.01627,6.59778 7.41084,14.44925 7.41084,14.44925l-4.78983,21.10331l-18.57629,3.77466c0,0 -9.50134,-5.97303 -16.25685,-5.94645c-6.75551,0.02658 -13.62799,6.06404 -13.62799,6.06404z",
            baseFill: "#e0c8b4",
            baseStroke: "#c4a695",
            baseStrokeWidth: 4.5,
            adjustX: -197.99004,
            adjustY: -138.07762,
            componentW: 83.97762,
            componentH: 83.89958,
            rotationSpeed: -2
          },
          // Front layer
          {
            pathData: "M227.77646,153.76045c4.56316,-2.17085 12.69285,1.73904 12.69285,1.73904l5.89379,7.45089l10.75221,-1.12848c0,0 7.67176,1.86784 9.3031,5.82972c1.63135,3.96189 -1.72011,12.58632 -1.72011,12.58632l-5.59654,6.19147l-0.37867,9.92714c0,0 -2.07155,7.9682 -6.19584,9.93703c-4.12428,1.96883 -11.43671,-1.51968 -11.43671,-1.51968l-6.98219,-7.04353l-9.42954,1.3549c0,0 -8.48146,-2.30109 -10.79355,-6.68286c-2.3121,-4.38177 1.44958,-11.02541 1.44958,-11.02541l6.39999,-7.88429l-0.76441,-8.71702c0,0 2.24285,-8.8444 6.80601,-11.01524z",
            baseFill: "#c4a89d",
            baseStroke: "#a68d7e",
            baseStrokeWidth: 4.5,
            adjustX: -210.88386,
            adjustY: -151.51045,
            componentW: 57.78455,
            componentH: 57.03313,
            rotationSpeed: 2.4
          }
        ],
        scale: 70
      }
    }
  });
  function getAvailableArtists(enemyType) {
    if (!isNil(renderData[enemyType])) {
      return [
        "Base game",
        ...Object.keys(renderData[enemyType])
      ];
    } else {
      return ["Base game"];
    }
  }
  let originalEnemyRenderMap = {};
  function applyCommunityRenders() {
    originalEnemyRenderMap = Object.freeze({ ...enemyRenderMap });
    for (let enemyType of Object.keys(renderData)) {
      enemyRenderMap[enemyType] = function(enemy) {
        communityRender(enemy, enemyType);
      };
    }
  }
  function communityRender(enemy, enemyType) {
    const artist = rendersManager.get(enemyType);
    if (enemy.artist !== artist) {
      enemy.renderPaths = void 0;
      enemy.artist = artist;
    }
    const data = renderData[enemyType]?.[artist];
    if (artist === "Base game" || isNil(data)) {
      originalEnemyRenderMap[enemyType](enemy);
      return;
    }
    if (enemy.radius === 1 && enemy.render.radius === 25) {
      enemy.radius = 25;
    }
    const pivot = data.rotationPivot;
    if (isNil(enemy.renderPaths)) {
      enemy.renderPaths = [];
      for (let pathData of data.paths) {
        const rawPath = {
          ...pathData,
          rotation: 0,
          strokeWidth: 0
        };
        if (!isNil(pivot)) {
          rawPath.adjustX -= pivot.x;
          rawPath.adjustY -= pivot.y;
        }
        enemy.renderPaths.push(rawPath);
      }
    }
    enemy.render.time += Math.sqrt(
      (enemy.render.lastX - enemy.render.x) ** 2 + (enemy.render.lastY - enemy.render.y) ** 2
    );
    enemy.render.lastX = enemy.render.x;
    enemy.render.lastY = enemy.render.y;
    for (let i = 0; i < enemy.renderPaths.length; i++) {
      const entry = enemy.renderPaths[i];
      if (entry.baseFill !== "none") {
        entry.fill = enemyColor(entry.baseFill, enemy);
      }
      if (entry.baseStroke !== "none") {
        entry.stroke = enemyColor(entry.baseStroke, enemy);
      }
      entry.rotation = (entry.rotationSpeed ?? 0) * time / 1e3;
      if (isNil(entry.wiggleOffset)) {
        if (entry.randomWiggleOffset) {
          entry.wiggleOffset = Math.random() * 2 * Math.PI;
        } else {
          entry.wiggleOffset = 0;
        }
      }
      if (!isNil(entry.wiggleInterval)) {
        entry.rotation += (entry.wiggleMagnitude ?? 0) * Math.cos(
          enemy.render.time / entry.wiggleInterval * 2 * Math.PI + entry.wiggleOffset
        );
      }
      entry.strokeWidth = entry.baseStrokeWidth / enemy.radius;
    }
    const scale = enemy.radius / data.scale;
    ctx.save();
    ctx.rotate(enemy.render.angle + (data.rotation ?? 0));
    ctx.scale(scale, scale);
    if (!isNil(pivot)) {
      ctx.translate(pivot.x, pivot.y);
    }
    for (let path of enemy.renderPaths) {
      if (!path.finished) {
        path.path = new Path2D();
        const matrix = new DOMMatrix().translate(
          path.adjustX - path.componentW / 2,
          path.adjustY - path.componentH / 2
        );
        path.path.addPath(new Path2D(path.pathData), matrix);
        path.finished = true;
      }
    }
    enemy.cachedRadius = enemy.radius;
    newRender(enemy);
    ctx.restore();
  }
  const flowrcordLink = "https://discord.com/invite/wJJPU9c6zW";
  function moveFlowrcordInvite() {
    const flowrcordButton = {
      type: "button",
      name: "Flowr's Official Discord",
      changeTime: 0,
      clickFn: () => {
        window.location.href = flowrcordLink;
      },
      hovered: false,
      screenPosition: { x: 0, y: 0, w: 0, h: 0 }
    };
    const options = settingsMenu.options;
    const buttonIndex = options.findIndex((value) => value.type === "button");
    options.splice(buttonIndex, 0, flowrcordButton);
    settingsMenu.h += 50;
    settingsMenu.targetOffset -= 50;
  }
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  const DROPDOWN_UI_PADDING = 13;
  const DROPDOWN_GREEN_TEXT_FLASH = "#7fff7f";
  const SETTINGS_BUTTON_PADDING = 13;
  const SETTINGS_OPTION_HEIGHT = 50;
  const SCROLLBAR_LENGTH = 120;
  const SETTINGS_SCROLLBAR_MIN_POS = 80;
  class DropdownUI {
    /**
     * The vertical space taken up by this dropdown UI in the parent menu,
     * excluding the expanded list of options.
     */
    height = SETTINGS_OPTION_HEIGHT;
    /**
     * The position of the top-left corner of this UI's clickable dropdown menu.
     * This is updated every frame based on the parent menu's position and scroll
     * position, and then used for mouse-related calculations.
     */
    screenPosition;
    /**
     * The mob type that this menu selects renders for.
     */
    enemyType;
    /**
     * The width of the {@linkcode labelText}.
     */
    labelWidth;
    /**
     * The options that the user can select in this dropdown menu.
     */
    options;
    /**
     * The width used to display the dropdown itself, based on the widths of its
     * contents.
     */
    optionsWidth;
    /**
     * The height that each dropdown option will take up.
     */
    heightPerOption = 30;
    /**
     * The choice that the user has currently selected.
     */
    currentChoice;
    /**
     * Whether or not the user has expanded the dropdown menu to display its list
     * of options.
     */
    expanded;
    /**
     * The vertical translation of the list of options, relative to its fully
     * expanded position. (This number is negative when the list of options is
     * retracted.)
     */
    optionsTranslateY;
    /**
     * A list of listeners to listen to the user selecting options in this
     * dropdown menu.
     */
    listeners;
    /**
     * The timestamp of the most recent time that the user clicked on an option.
     */
    optionSelectedTime;
    /**
     * The parent menu that this dropdown menu belongs to.
     */
    parentMenu;
    constructor(enemyType, options, currentChoice, parentMenu) {
      this.enemyType = enemyType;
      this.options = options;
      this.currentChoice = currentChoice;
      this.parentMenu = parentMenu;
      this.screenPosition = { x: 0, y: 0 };
      this.expanded = false;
      this.optionsTranslateY = -this.totalOptionsHeight;
      this.listeners = [];
      this.optionSelectedTime = time - 1e4;
      this.optionsWidth = 60;
      ctx.font = "900 17px Ubuntu";
      for (let name of this.options) {
        this.optionsWidth = Math.max(this.optionsWidth, ctx.measureText(name).width + 60);
      }
      ctx.font = "900 22px Ubuntu";
      this.labelWidth = ctx.measureText(this.labelText).width;
    }
    /**
     * The total height taken up by this menu's list of options, equal to
     * {@linkcode options options.length} times {@linkcode heightPerOption}.
     */
    get totalOptionsHeight() {
      return this.options.length * this.heightPerOption;
    }
    /**
     * The label for the dropdown menu, displayed to the left of the menu.
     */
    get labelText() {
      return "- " + this.enemyType + ":";
    }
    /**
     * @returns `true` iff this is a {@linkcode DropdownUI}.
     */
    isDropdownUI() {
      return true;
    }
    /**
     * This function sets {@linkcode currentChoice} to the given option, saves it
     * to the manager, and triggers all of the {@linkcode listeners}.
     */
    setOption(option) {
      this.currentChoice = option;
      rendersManager.set(this.enemyType, option);
      for (let fn of this.listeners) {
        fn(option);
      }
    }
    /**
     * Toggles whether or not the dropdown menu is opened or closed.
     */
    toggleExpansion() {
      this.expanded = !this.expanded;
    }
    /**
     * The main function to draw this UI. This also handles setting the cursor to
     * "pointer" if it is hovering over this dropdown menu, and also updating
     * {@linkcode screenPosition} based on the parent menu's scrolling.
     */
    draw() {
      this.screenPosition = {
        x: this.parentMenu.x + DROPDOWN_UI_PADDING + this.labelWidth + DROPDOWN_UI_PADDING,
        y: this.parentMenu.y + this.parentMenu.renderOffset + this.parentMenu.midHeight - this.parentMenu.scroll - this.heightPerOption / 2
      };
      if (this.screenPosition.y > this.parentMenu.y + this.parentMenu.h + this.parentMenu.renderOffset || this.screenPosition.y + this.heightPerOption < this.parentMenu.y + this.parentMenu.renderOffset) {
        if (this.expanded) {
          this.toggleExpansion();
        }
      }
      this.drawLabel();
      this.drawOptions();
    }
    /**
     * Draws the menu's lebel text.
     * 
     * This function exists to help with splitting {@linkcode draw} into multiple
     * steps.
     */
    drawLabel() {
      ctx.font = "900 22px Ubuntu";
      ctx.lineWidth = 3;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "black";
      ctx.fillStyle = "white";
      ctx.strokeText(
        this.labelText,
        DROPDOWN_UI_PADDING,
        this.parentMenu.midHeight
      );
      ctx.fillText(
        this.labelText,
        DROPDOWN_UI_PADDING,
        this.parentMenu.midHeight
      );
    }
    /**
     * Draws the menu's currently selected option and expanded list of options.
     * This also handles setting the cursor to "pointer" if it is hovering over
     * this dropdown menu.
     * 
     * This function exists to help with splitting {@linkcode draw} into multiple
     * steps.
     */
    drawOptions() {
      let renderX = DROPDOWN_UI_PADDING + this.labelWidth + DROPDOWN_UI_PADDING;
      let renderY = this.parentMenu.midHeight;
      ctx.font = "900 17px Ubuntu";
      ctx.lineWidth = 2;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "black";
      ctx.fillStyle = "white";
      if (this.expanded) {
        this.optionsTranslateY = interpolate(this.optionsTranslateY, 0, 0.3);
      } else {
        this.optionsTranslateY = interpolate(
          this.optionsTranslateY,
          -this.totalOptionsHeight,
          0.3
        );
      }
      ctx.save();
      ctx.beginPath();
      ctx.rect(
        renderX - 10,
        renderY + this.heightPerOption / 2 - 10,
        this.optionsWidth + 20,
        (this.options.length + 1) * this.heightPerOption
      );
      ctx.clip();
      ctx.closePath();
      const hoveredOption = this.hoveredOptionIndex();
      ctx.translate(0, this.optionsTranslateY);
      let currentY = renderY + this.heightPerOption;
      for (let i = 0; i < this.options.length; i++) {
        const option = this.options[i];
        ctx.fillStyle = i === hoveredOption ? "#bfbfbf" : "white";
        ctx.beginPath();
        ctx.rect(
          renderX,
          currentY - this.heightPerOption / 2,
          this.optionsWidth,
          this.heightPerOption
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.strokeText(option, renderX + 5, currentY);
        ctx.fillText(option, renderX + 5, currentY);
        currentY += this.heightPerOption;
      }
      ctx.restore();
      ctx.fillStyle = this.options.length <= 1 ? "#bfbfbf" : "white";
      ctx.beginPath();
      ctx.rect(
        renderX,
        renderY - this.heightPerOption / 2,
        this.optionsWidth,
        this.heightPerOption
      );
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
      ctx.fillStyle = this.getCurrentChoiceColour();
      ctx.strokeText(this.currentChoice, renderX + 5, renderY);
      ctx.fillText(this.currentChoice, renderX + 5, renderY);
      ctx.beginPath();
      ctx.moveTo(renderX + this.optionsWidth - 5, renderY - 5);
      ctx.lineTo(renderX + this.optionsWidth - 15, renderY + 5);
      ctx.lineTo(renderX + this.optionsWidth - 25, renderY - 5);
      ctx.stroke();
      ctx.closePath();
      if (this.hoveringOverOpener() || hoveredOption > -1) {
        setCursor("pointer");
      }
    }
    /**
     * Determines whether or not the user is hovering over the dropdown menu to
     * open/close it.
     * 
     * Note that if this dropdown menu has only 1 option, the menu becomes
     * unopenable and is treated as never being hovered.
     */
    hoveringOverOpener() {
      if (!this.expanded && !this.parentMenu.mouseInMenu()) {
        return false;
      }
      if (this.options.length <= 1) {
        return false;
      }
      return mouseInBox(
        { x: mouse.canvasX, y: mouse.canvasY },
        {
          x: this.screenPosition.x,
          y: this.screenPosition.y,
          w: this.optionsWidth,
          h: this.heightPerOption
        }
      );
    }
    /**
     * Returns the index of the option that the user is currently hovering over,
     * or -1 if the user is currently not hovering over any option.
     */
    hoveredOptionIndex() {
      if (!this.expanded && !this.parentMenu.mouseInMenu()) {
        return -1;
      }
      if (mouse.canvasY <= this.screenPosition.y + this.heightPerOption) {
        return -1;
      }
      if (!mouseInBox(
        { x: mouse.canvasX, y: mouse.canvasY },
        {
          x: this.screenPosition.x,
          y: this.screenPosition.y + this.heightPerOption + this.optionsTranslateY,
          w: this.optionsWidth,
          h: this.totalOptionsHeight
        }
      )) {
        return -1;
      }
      const relativeY = mouse.canvasY - (this.screenPosition.y + this.heightPerOption + this.optionsTranslateY);
      const index = Math.floor(relativeY / this.heightPerOption);
      return Math.max(Math.min(index, this.options.length - 1), 0);
    }
    /**
     * Processes a mouse click input.
     */
    mouseDown() {
      const hoveredOption = this.hoveredOptionIndex();
      if (this.hoveringOverOpener()) {
        this.toggleExpansion();
      } else if (hoveredOption > -1) {
        this.setOption(this.options[hoveredOption]);
        this.optionSelectedTime = time;
        this.expanded = false;
        this.optionsTranslateY = -this.totalOptionsHeight;
      } else if (this.expanded) {
        this.toggleExpansion();
      }
    }
    /**
     * Adds a listener to {@linkcode listeners}, which will allow it to listen to
     * all *future* choices made by the user.
     * @param fn The listener to be added.
     * @param applyCurrent Whether or not to also apply `fn` to the
     * {@linkcode currentChoice currently selected option}. Default: `true`.
     */
    addListener(fn, applyCurrent = true) {
      this.listeners.push(fn);
      if (applyCurrent) {
        fn(this.currentChoice);
      }
    }
    /**
     * Returns the colour that should be used for the current option's text. This
     * text is usually white, and it flashes green for 600ms when the user
     * successfully selects an option.
     */
    getCurrentChoiceColour() {
      if (time - this.optionSelectedTime < 600) {
        const ratio = (time - this.optionSelectedTime) / 600;
        return blendColor(DROPDOWN_GREEN_TEXT_FLASH, "#ffffff", ratio);
      } else {
        return "#ffffff";
      }
    }
  }
  class MenuInformationalText {
    /**
     * The vertical space taken up by this item in the parent menu.
     */
    height = SETTINGS_OPTION_HEIGHT;
    /**
     * The font used to display this text.
     */
    font = "900 17px Ubuntu";
    /**
     * The `textBaseline` to be used by the canvas rendering engine.
     */
    textBaseline = "middle";
    /**
     * The border width to be used for displaying this text.
     */
    lineWidth = 2;
    /**
     * The text to be displayed.
     */
    text;
    /**
     * The parent menu that this item belongs to.
     */
    parentMenu;
    constructor(text, parentMenu) {
      this.text = text;
      this.parentMenu = parentMenu;
    }
    /**
     * @returns `true` iff this is a {@linkcode DropdownUI}.
     */
    isDropdownUI() {
      return false;
    }
    /**
     * Draws the row of text inside the parent menu.
     */
    draw() {
      ctx.font = this.font;
      ctx.textAlign = "center";
      ctx.textBaseline = this.textBaseline;
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = this.lineWidth;
      ctx.strokeText(
        this.text,
        this.parentMenu.w / 2,
        this.parentMenu.midHeight
      );
      ctx.fillText(this.text, this.parentMenu.w / 2, this.parentMenu.midHeight);
    }
  }
  class MenuTitle extends MenuInformationalText {
    height = 1.5 * SETTINGS_OPTION_HEIGHT;
    font = "900 32px Ubuntu";
    textBaseline = "top";
    lineWidth = 3.75;
  }
  class MenuSectionHeading extends MenuInformationalText {
    /**
     * Draws this header inside the parent menu.
     * 
     * This code is adapted from the Flowr changelog's horizontal dividers.
     */
    draw() {
      super.draw();
      const textWidth = ctx.measureText(this.text).width;
      let textLeftPos = this.parentMenu.w / 2 - textWidth / 2;
      let textRightPos = this.parentMenu.w / 2 + textWidth / 2;
      ctx.strokeStyle = "#7f7f7f";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(
        SETTINGS_BUTTON_PADDING,
        this.parentMenu.midHeight
      );
      ctx.lineTo(
        textLeftPos - SETTINGS_BUTTON_PADDING,
        this.parentMenu.midHeight
      );
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(
        textRightPos + SETTINGS_BUTTON_PADDING,
        this.parentMenu.midHeight
      );
      ctx.lineTo(
        this.parentMenu.w - SETTINGS_BUTTON_PADDING - 16,
        this.parentMenu.midHeight
      );
      ctx.stroke();
      ctx.closePath();
    }
  }
  class SelectRendersMenu {
    _scroll;
    /**
     * The x-position of the menu.
     */
    x;
    /**
     * The y-position of the menu before accounting for {@linkcode renderOffset},
     * which moves the menu off-screen when the menu is toggled off.
     */
    y;
    /**
     * The overall width of this menu.
     */
    w;
    /**
     * The overall height of this menu.
     */
    h;
    /**
     * Whether or not this menu is currently toggled on.
     */
    active;
    /**
     * The vertical offset applied to this component's render. This is coded to
     * approach {@linkcode targetOffset} smoothly.
     */
    renderOffset;
    /**
     * The contents of this selection menu.
     */
    options;
    /**
     * The y-position of the row currently being drawn, relative to the menu's
     * position.
     */
    currentHeight;
    /**
     * The vertical offset of the mouse from the scrollbar's centre if the user
     * is currently dragging the scrollbar, or `undefined` if the user is not
     * dragging the scrollbar.
     */
    draggingScrollbarOffset;
    /**
     * The total height of this menu's contents.
     */
    totalHeight;
    /**
     * The ratio of scrollbar movement to actual content movement.
     */
    scrollbarRatio;
    constructor() {
      this._scroll = 0;
      this.currentHeight = 0;
      this.draggingScrollbarOffset = void 0;
      this.x = 110;
      this.y = 20;
      this.h = 13.2 * SETTINGS_OPTION_HEIGHT;
      this.w = 450;
      this.active = false;
      this.renderOffset = -this.h - 40;
      const rawOptions = [
        new MenuTitle("Renders Selection Menu", this)
      ];
      const allEnemies = getAllBiomeEnemiesMap();
      const addedEnemies = /* @__PURE__ */ new Set();
      const addEnemies = (enemyList) => {
        for (let enemyType of enemyList) {
          if (!addedEnemies.has(enemyType)) {
            const newDropdown = new DropdownUI(
              enemyType,
              getAvailableArtists(enemyType),
              rendersManager.get(enemyType),
              this
            );
            newDropdown.addListener((option) => {
              rendersManager.set(enemyType, option);
            }, false);
            rawOptions.push(newDropdown);
            addedEnemies.add(enemyType);
          }
        }
      };
      rawOptions.push(new MenuSectionHeading("Garden", this));
      addEnemies(allEnemies.garden);
      rawOptions.push(new MenuSectionHeading("Desert", this));
      addEnemies(allEnemies.desert);
      rawOptions.push(new MenuSectionHeading("Ocean", this));
      addEnemies(allEnemies.ocean);
      this.options = Object.freeze(rawOptions);
      this.totalHeight = this.options.reduce(
        (previousValue, option) => previousValue + option.height,
        0
      );
      this.scrollbarRatio = (this.h - 2 * SETTINGS_SCROLLBAR_MIN_POS) / (this.totalHeight + 10 - this.h);
      const originalOnMouseDown = _unsafeWindow.onmousedown;
      _unsafeWindow.onmousedown = (e) => {
        originalOnMouseDown?.apply(_unsafeWindow, [e]);
        if (_unsafeWindow.connected === true) {
          this.mouseDown();
        }
      };
      const originalOnMouseUp = _unsafeWindow.onmouseup;
      _unsafeWindow.onmouseup = (e) => {
        originalOnMouseUp?.apply(_unsafeWindow, [e]);
        if (_unsafeWindow.connected === true) {
          this.mouseUp();
        }
      };
      const originalDraw = settingsMenu.draw;
      settingsMenu.draw = () => {
        originalDraw.apply(settingsMenu);
        this.draw();
      };
      document.addEventListener("wheel", (e) => {
        this.updateScroll(e);
      });
    }
    /**
     * The y-position at the midpoint of the option currently being rendered.
     */
    get midHeight() {
      return this.currentHeight + SETTINGS_OPTION_HEIGHT / 2;
    }
    /**
     * How much the menu's contents are currently shifted due to scrolling.
     */
    get scroll() {
      return this._scroll;
    }
    set scroll(val) {
      this._scroll = Math.min(Math.max(val, 0), this.totalHeight + 10 - this.h);
    }
    /**
     * The target vertical offset of this component. This is set to a negative
     * value to move the menu offscreen when the menu is toggled off.
     */
    get targetOffset() {
      return this.active ? 0 : -this.h - 40;
    }
    /**
     * The vertical position of the centre of this menu's scrollbar.
     */
    get scrollbarPos() {
      return this.scroll * this.scrollbarRatio + SETTINGS_SCROLLBAR_MIN_POS;
    }
    set scrollbarPos(pos) {
      if (!isNil(this.draggingScrollbarOffset)) {
        this.scroll = (pos - SETTINGS_SCROLLBAR_MIN_POS - this.y - this.renderOffset) / this.scrollbarRatio;
      }
    }
    /**
     * The main function to draw this menu.
     */
    draw() {
      this.renderOffset = interpolate(this.renderOffset, this.targetOffset, 0.3);
      if (!isNil(this.draggingScrollbarOffset)) {
        this.scrollbarPos = mouse.canvasY - this.draggingScrollbarOffset;
      }
      ctx.save();
      ctx.translate(this.x, this.y + this.renderOffset);
      ctx.beginPath();
      ctx.roundRect(0, 0, this.w, this.h, 3);
      ctx.clip();
      ctx.closePath();
      ctx.fillStyle = "#aaaaaa";
      ctx.beginPath();
      ctx.roundRect(0, 0, this.w, this.h, 3);
      ctx.fill();
      ctx.closePath();
      ctx.strokeStyle = "#7f7f7f";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(this.w - 16, this.scrollbarPos - SCROLLBAR_LENGTH / 2);
      ctx.lineTo(this.w - 16, this.scrollbarPos + SCROLLBAR_LENGTH / 2);
      ctx.stroke();
      ctx.closePath();
      if (this.active && (this.mouseOnScrollbar() || !isNil(this.draggingScrollbarOffset))) {
        setCursor("pointer");
      }
      ctx.translate(0, -this.scroll);
      this.currentHeight = 5;
      for (let option of this.options) {
        option.draw();
        this.currentHeight += option.height;
      }
      ctx.restore();
      ctx.save();
      ctx.translate(this.x, this.y + this.renderOffset);
      ctx.strokeStyle = "#8a8a8a";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.roundRect(0, 0, this.w, this.h, 3);
      ctx.stroke();
      ctx.closePath();
      ctx.translate(0, -this.scroll);
      this.currentHeight = 5;
      for (let option of this.options) {
        if (option.isDropdownUI() && option.expanded) {
          option.drawOptions();
        }
        this.currentHeight += option.height;
      }
      ctx.restore();
    }
    /**
     * Processes the user clicking on this menu.
     */
    mouseDown() {
      if (!this.active) {
        return;
      }
      if (this.mouseOnScrollbar()) {
        this.draggingScrollbarOffset = mouse.canvasY - (this.y + this.renderOffset + this.scrollbarPos);
      }
      for (let option of this.options) {
        if (option.isDropdownUI()) {
          option.mouseDown();
        }
      }
    }
    /**
     * Processes the user releasing a mouse click.
     */
    mouseUp() {
      this.draggingScrollbarOffset = void 0;
    }
    /**
     * Scrolls this menu up/down in response to a mouse wheel input.
     */
    updateScroll(e) {
      if (this.active && this.mouseInMenu()) {
        this.scroll += e.deltaY / 2;
      }
    }
    /**
     * Toggles whether this menu is opened or closed.
     */
    toggle() {
      this.active = !this.active;
      if (!this.active) {
        this.mouseUp();
        for (let option of this.options) {
          if (option.isDropdownUI() && option.expanded) {
            option.toggleExpansion();
          }
        }
      }
    }
    /**
     * Checks whether the mouse is inside this menu, excluding its borders.
     */
    mouseInMenu() {
      return mouseInBox(
        { x: mouse.canvasX, y: mouse.canvasY },
        { x: this.x + 4, y: this.y + 4, w: this.w - 8, h: this.h - 8 }
      );
    }
    /**
     * Checks whether the mouse is hovering over this menu's scrollbar.
     */
    mouseOnScrollbar() {
      return mouseInBox(
        { x: mouse.canvasX, y: mouse.canvasY },
        {
          x: this.x + this.w - 24,
          y: this.y + this.renderOffset + this.scrollbarPos - SCROLLBAR_LENGTH / 2,
          w: 16,
          h: SCROLLBAR_LENGTH
        }
      );
    }
  }
  const selectRendersMenu = new SelectRendersMenu();
  const selectRendersIcon = new Image(25, 25);
  selectRendersIcon.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMTAwLjAwMDA1bW0iCiAgIGhlaWdodD0iMTAwLjAwMDA2bW0iCiAgIHZpZXdCb3g9IjAgMCAxMDAuMDAwMDUgMTAwLjAwMDA2IgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmcxIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzCiAgICAgaWQ9ImRlZnMxIiAvPgogIDxnCiAgICAgaWQ9ImxheWVyMSIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODkuNTI0OTc3LC0zNS42MzI2MDUpIj4KICAgIDxyZWN0CiAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDowLjI4MjEzNztzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGlkPSJyZWN0MS04IgogICAgICAgd2lkdGg9IjMxLjEyMTQyOSIKICAgICAgIGhlaWdodD0iMTguNTYwMDA3IgogICAgICAgeD0iLTE3NC43NzIyMyIKICAgICAgIHk9Ijc0LjQxNzAyMyIKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KC0wLjcwNzEwMDA4LC0wLjcwNzExMzQ5LDAuNzA3MTAwMDgsLTAuNzA3MTEzNDksMCwwKSIgLz4KICAgIDxyZWN0CiAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDowLjUxNDk0NTtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGlkPSJyZWN0MS04LTEiCiAgICAgICB3aWR0aD0iMzAuODg4NjI4IgogICAgICAgaGVpZ2h0PSI2Mi4yOTIxOTQiCiAgICAgICB4PSItMTc0LjY1NTg3IgogICAgICAgeT0iNS40NDUxNTA0IgogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoLTAuNzA3MTAwMDgsLTAuNzA3MTEzNDksMC43MDcxMDAwOCwtMC43MDcxMTM0OSwwLDApIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiNmZmZmZmY7c3Ryb2tlLXdpZHRoOjAuMDE7c3Ryb2tlLWxpbmVjYXA6c3F1YXJlO3N0cm9rZS1taXRlcmxpbWl0OjA7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjE7cGFpbnQtb3JkZXI6bWFya2VycyBzdHJva2UgZmlsbCIKICAgICAgIGlkPSJwYXRoNCIKICAgICAgIGQ9Im0gNzQuMzU4OTk5LDEzMy44ODE1OSAtMS4yNzY3NzUsMCAwLjYzODM4OCwtMS4xMDU3MiB6IgogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoLTE3LjI0NDI0MiwtMTcuMjQ0NTcsMTkuODY3Mjg2LC0xOS44Njc2NjMsLTEyNzYuOTkwOCw0MDQ0LjczNDgpIiAvPgogIDwvZz4KPC9zdmc+Cg==";
  selectRendersIcon.draggable = false;
  function addNewMenuButtons() {
    const selectRenderMenuButton = document.createElement("div");
    selectRenderMenuButton.className = "newScriptMenuButton";
    selectRenderMenuButton.appendChild(selectRendersIcon);
    selectRenderMenuButton.onclick = () => {
      selectRendersMenu.toggle();
    };
    const buttonList = discordButton.parentElement;
    buttonList?.replaceChild(selectRenderMenuButton, discordButton);
    const styles = `
    .newScriptMenuButton {
      border-color: #3f3fff;
      border-style: solid;
      border-width: 3px;
      background-color: #7f7fff;
      border-radius: 8px;
      margin-left: 10px;
      margin-top: 10px;
      width: 35px;
      height: 35px;
      transition: background-color 0.1s;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .newScriptMenuButton:hover {
      cursor: pointer;
      background-color: #bfbfff;
    }
    
    #changelogButton:hover {
      cursor: pointer;  /* I think the Flowr devs forgot to add this */
    }
  `;
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
  applyCommunityRenders();
  moveFlowrcordInvite();
  addNewMenuButtons();

})();