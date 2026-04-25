// TODO: Reorganize all data in this file to allow for renders from different
// artists to coexist and use different rendering data.

/**
 * A fixed list of names used to identify artists.
 */
export type ArtistName =
  "Base game" |
  "Guest" |
  "NGL880";

/**
 * The data structure for the rendering data for each individual mob component.
 */
export type RenderData = {
  /**
   * A string containing the component's render data in SVG path format.
   */
  pathData: string,

  /**
   * The component's base fill colour before shaders (e.g., damage flash).
   */
  baseFill: string,

  /**
   * The component's base stroke colour before shaders (e.g., damage flash).
   */
  baseStroke: string,

  /**
   * The raw stroke width given by the SVG file, before scaling by the SVG
   * size, the mob's radius, etc..
   */
  baseStrokeWidth: number,
  
  /**
   * The width of the SVG file containing the component. This is used for
   * translating the render data to compensate for SVG files not centering the
   * component at (0, 0).
   */
  componentW: number,

  /**
   * The height of the SVG file containing the component. This is used for
   * translating the render data to compensate for SVG files not centering the
   * component at (0, 0).
   */
  componentH: number,

  /**
   * An additional amount that the render data should be translated, taken
   * directly from the SVG's translation data.
   */
  adjustX: number,
  
  /**
   * An additional amount that the render data should be translated, taken
   * directly from the SVG's translation data.
   */
  adjustY: number,

  /**
   * The component's fill colour after shaders (e.g., damage flash).
   */
  fill?: string,
  
  /**
   * The component's stroke colour after shaders (e.g., damage flash).
   */
  stroke?: string,

  /**
   * The component's actual stroke width to be rendered by the rendering
   * engine, after scaling by the SVG's size.
   */
  strokeWidth?: number,

  /**
   * The component's rotation, measured counterclockwise in radians.
   */
  rotation?: number,

  /**
   * Rotation speed in radians per second.
   */
  rotationSpeed?: number,

  /**
   * The number of units that the entity must travel for this component to
   * perform one full wiggle.
   */
  wiggleInterval?: number,

  /**
   * The magnitude, in radians, of the component's wiggling.
   */
  wiggleMagnitude?: number,

  /**
   * Whether or not to offset the wiggle animation to a random time in the
   * entity's wiggle animation.
   */
  randomWiggleOffset?: boolean,

  /**
   * The wiggle offset provided by `randomWiggleOffset`.
   */
  wiggleOffset?: number,

  /**
   * Whether or not `this.path` has been constructed yet.
   */
  finished?: boolean,

  /**
   * The final path constructed by the given data.
   */
  path?: Path2D,
};

/**
 * The data extracted from the artists' SVG files.
 */
export const renderData: Record<string, RenderData> = deepFreeze({
  // Beetle by Guest, componentW and componentH manually adjusted to center the
  // hitbox on the beetle's main body
  beetleLegMidRight: {
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
    randomWiggleOffset: true,
  },
  beetleLegBottomRight: {
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
    randomWiggleOffset: true,
  },
  beetleLegBottomLeft: {
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
    randomWiggleOffset: true,
  },
  beetleLegMidLeft: {
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
    randomWiggleOffset: true,
  },
  beetleLegTopLeft: {
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
    randomWiggleOffset: true,
  },
  beetleLegTopRight: {
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
    randomWiggleOffset: true,
  },
  beetleMandibleLeft: {
    pathData: "m 276.91226,367.7547 -33.43225,-117.89265 22.8747,-126.69062 38.71102,86.22001 -12.31714,56.30694 47.50898,63.34531 z",
    baseFill: "#1a1a1a",
    baseStroke: "#000000",
    baseStrokeWidth: 26.4567,
    adjustX: 2.8628501,
    adjustY: 0,
    componentW: 739,
    componentH: 1180,
    wiggleInterval: 18 * 2 * Math.PI,
    wiggleMagnitude: 0.05,
  },
  beetleMandibleRight: {
    pathData: "m 452.03757,352.5681 33.43225,-117.89265 -22.8747,-126.69062 -38.71102,86.22001 12.31714,56.30694 -47.50898,63.34531 z",
    baseFill: "#1a1a1a",
    baseStroke: "#000000",
    baseStrokeWidth: 26.4567,
    adjustX: 2.8628501,
    adjustY: 0,
    componentW: 739,
    componentH: 1180,
    wiggleInterval: 18 * 2 * Math.PI,
    wiggleMagnitude: -0.05,
  },
  beetleMainBody: {
    pathData: "m 598.0679,653.23395 c 0,97.22684 -27.66148,252.61345 -215.88994,252.61345 -183.77713,0 -215.88994,-148.7096 -215.88994,-252.61345 0,-101.67819 36.56414,-252.61348 215.88994,-252.61348 183.77714,0 215.88994,146.48395 215.88994,252.61348 z m -31.16535,1.43985 c 0,97.22684 -27.66148,252.6135 -215.88994,252.6135 -183.77714,0 -215.88995,-148.70965 -215.88995,-252.6135 0,-101.67819 36.56414,-252.61349 215.88995,-252.61349 183.77714,0 215.88994,146.48396 215.88994,252.61349 z",
    baseFill: "#7f467e",
    baseStroke: "#633662",
    baseStrokeWidth: 30.2362,
    adjustX: 2.8628501,
    adjustY: 0,
    componentW: 739,
    componentH: 1180,
  },
  beetleHead: {
    pathData: "m 366.44421,573.23118 c -65.83307,0 -171.04659,-17.69548 -171.04659,-138.10819 0,-117.56513 100.69249,-138.1082 171.04659,-138.1082 68.84713,0 171.04662,23.39067 171.04662,138.1082 0,117.56514 -99.18547,138.10819 -171.04662,138.10819 z m -0.97492,-19.93696 c -65.8331,0 -171.04664,-17.69548 -171.04664,-138.10821 0,-117.56513 100.69246,-138.10819 171.04664,-138.10819 68.84709,0 171.04662,23.39065 171.04662,138.10819 0,117.56515 -99.18548,138.10821 -171.04662,138.10821 z",
    baseFill: "#7f467e",
    baseStroke: "#633662",
    baseStrokeWidth: 37.7953,
    adjustX: 2.8628501,
    adjustY: 0,
    componentW: 739,
    componentH: 1180,
  },
  beetleBodyLineMid: {
    pathData: "m 354.72662,564.67559 c 0.20001,9.36917 0.2604,18.7411 0.32564,28.11203 0.29638,16.73999 -0.24663,33.47885 -1.14234,50.19318 -1.29984,16.1026 -1.58011,32.2543 -2.26768,48.38633 -0.93671,18.03083 -1.35278,36.08079 -1.50445,54.13338 -0.41383,16.83068 -0.19374,33.64511 0.40823,50.46547 0.39145,8.69518 0.72526,17.47401 2.09413,26.08474 0.55693,2.73587 1.21581,5.4494 1.79608,8.18026 0.16846,0.9408 0.24257,1.89302 0.24631,2.84762 -0.20236,1.1059 0.48801,1.65607 1.06565,2.50353 1.21973,1.43094 2.12509,3.04393 3.01853,4.69482 1.4341,2.35206 2.31772,4.96951 3.39923,7.49041 0.61505,1.39712 0.86127,3.01955 2.01353,4.11361 0.0417,-0.0586 0.0834,-0.11723 0.12513,-0.17585 0,0 13.28555,7.16017 13.28555,7.16017 v 0 c 0.0707,-0.18215 0.14147,-0.3643 0.21221,-0.54645 -0.14078,-1.63699 -2.14823,-2.49658 -2.03555,-4.32608 -1.17332,-2.52992 -2.00602,-5.19515 -3.37941,-7.61814 -0.90208,-1.6104 -1.51271,-3.45849 -2.83145,-4.76392 -0.18881,-0.27993 -0.75048,-1.47761 -1.02497,-1.56397 -0.15132,-0.0476 -0.27527,0.25881 -0.42655,0.21104 -0.10991,-0.0347 -1.1e-4,-0.23051 -1.7e-4,-0.34577 -0.002,-1.03942 0.0164,-2.07703 -0.17464,-3.10523 -0.42218,-2.80983 -1.48191,-5.50886 -2.01548,-8.29884 -1.84637,-8.55959 -2.08298,-17.45788 -2.71169,-26.16038 -0.82115,-16.85212 -1.18255,-33.70466 -0.79882,-50.578 0.29808,-18.00468 0.6664,-36.01055 1.68273,-53.99208 0.74563,-16.13293 1.03496,-32.28761 2.20827,-48.40106 0.92753,-16.6982 1.44485,-33.42283 1.39842,-50.14798 0.0649,-9.26031 0.12427,-18.52168 0.32565,-27.78018 z",
    baseFill: "#7f467e",
    baseStroke: "#633662",
    baseStrokeWidth: 26.4567,
    adjustX: 2.8628501,
    adjustY: 0,
    componentW: 739,
    componentH: 1180,
  },
  beetleBodyLineLeft: {
    pathData: "m 141.82873,577.20969 c 0.20227,9.53193 0.23914,19.06764 0.28662,28.60155 0.11108,14.88766 0.0578,29.77562 0.0612,44.66346 0.041,11.38939 -0.11747,22.7779 -0.20669,34.16662 -0.0459,5.58953 -0.0801,11.1792 -0.1111,16.76885 -0.0155,3.36683 -0.0182,6.73372 -0.0562,10.10039 -0.23295,2.06683 0.67513,3.9033 1.17563,5.8444 0.18566,1.58459 1.11446,2.88539 1.70661,4.31816 0.42107,0.96826 0.50346,2.00983 0.58555,3.04742 -0.0709,1.19023 0.082,2.18108 0.6836,3.21933 1.35069,2.2469 1.96652,4.79281 2.90169,7.21761 0.72066,2.31101 1.87578,4.44523 2.79492,6.67708 0.18436,0.56227 0.36091,1.1322 0.44995,1.71719 0,0 12.83266,7.90134 12.83266,7.90134 v 0 c 0.90926,-1.13521 0.74324,-1.93078 0.29608,-3.26608 -0.69827,-2.35445 -2.18661,-4.38043 -2.83523,-6.74724 -0.93363,-2.42584 -1.52242,-4.97964 -2.77608,-7.2584 -0.38645,-1.08743 -1.17684,-1.40925 -0.9174,-2.67602 0.007,-1.16319 -0.0876,-2.36436 -0.3981,-3.48363 -0.47815,-1.48319 -1.38995,-2.69632 -1.80628,-4.17935 -0.42933,-1.88275 -1.35677,-3.62262 -1.37465,-5.54546 -0.0377,-3.38575 -0.0408,-6.77171 -0.0562,-10.15763 -0.031,-5.62738 -0.0653,-11.25478 -0.1111,-16.88205 -0.0891,-11.45894 -0.247,-22.91766 -0.20669,-34.37726 0.003,-14.86705 -0.0501,-29.73424 0.0612,-44.60112 0.0472,-9.43654 0.083,-18.87496 0.28662,-28.30947 z",
    baseFill: "#7f467e",
    baseStroke: "#633662",
    baseStrokeWidth: 26.4567,
    adjustX: 2.8628501,
    adjustY: 0,
    componentW: 739,
    componentH: 1180,
  },
  beetleBodyLineRight: {
    pathData: "m 567.64996,552.57541 c 0.36611,11.52471 0.30852,23.06091 0.27319,34.59045 0.007,9.72069 -0.0935,19.44082 -0.15075,29.16119 -0.0463,7.32515 -0.003,14.65027 0.0302,21.97534 0.0177,8.79932 0.0417,17.59852 -0.0103,26.39776 -0.0357,6.50423 -0.061,13.00849 -0.0656,19.51282 -0.029,5.62594 0.007,11.25177 -0.0111,16.87771 -0.0108,4.77988 -0.0231,9.55976 -0.0404,14.33964 -0.0161,3.81179 -0.008,7.62345 -0.0195,11.43521 0.0215,3.86423 -0.78533,7.67373 -1.22684,11.50317 -0.13737,3.18733 -1.14079,6.23112 -1.77115,9.33562 -0.0695,2.15107 -0.83704,4.07925 -1.52558,6.07393 -0.45249,1.36412 -0.6896,2.8005 -0.79286,4.23217 -0.39128,0.83668 -1.00501,1.44703 -1.36391,2.32533 -0.32301,0.75396 -0.40249,1.54679 -0.44184,2.35608 0.14923,0.606 -0.11201,0.14381 -0.13628,0.10022 0,0 12.67074,8.1613 12.67074,8.1613 v 0 c 0.3965,-0.36113 0.9653,-0.78018 0.87213,-1.38679 10e-4,-0.64814 -0.0305,-1.29107 0.19255,-1.91225 0.34507,-1.0112 1.30295,-1.66967 1.56817,-2.7429 0.0471,-1.31214 0.17441,-2.63649 0.56717,-3.89487 0.6732,-2.06821 1.5658,-4.04935 1.57788,-6.27368 0.57356,-3.16388 1.57892,-6.25942 1.74174,-9.48542 0.41291,-3.88337 1.24949,-7.7356 1.32343,-11.63797 -0.0119,-3.81841 -0.004,-7.6367 -0.0196,-11.45513 -0.0173,-4.79361 -0.0296,-9.58722 -0.0404,-14.38083 -0.0178,-5.62971 0.0178,-11.2593 -0.0111,-16.88901 -0.005,-6.52662 -0.0301,-13.05318 -0.0656,-19.5797 -0.0517,-8.80275 -0.0283,-17.60545 -0.0103,-26.40828 0.0337,-7.31481 0.0765,-14.62967 0.0302,-21.94456 -0.0572,-9.77158 -0.15744,-19.54292 -0.15075,-29.31481 -0.0349,-11.43667 -0.0968,-22.88039 0.2732,-34.31205 z",
    baseFill: "#7f467e",
    baseStroke: "#633662",
    baseStrokeWidth: 26.4567,
    adjustX: 2.8628501,
    adjustY: 0,
    componentW: 739,
    componentH: 1180,
  },

  // Desert moth by NGL880, components were manually moved around because the 
  // SVG data has them all centred together instead.
  desertMothBottomWing: {
    pathData: "M242.12594,238.61553c-49.37808,15.11132 -81.928,-3.77179 -92.27158,-37.57069c-10.34358,-33.79891 36.22895,-61.36001 85.60703,-76.47133c49.37809,-15.11132 96.13756,-5.36832 96.13756,-5.36832c0,0 -40.09493,104.29902 -89.47301,119.41034z",
    baseFill: "#b28300",
    baseStroke: "#9a4500",
    baseStrokeWidth: 7.5,
    adjustX: -144.65105 + 10,
    adjustY: -112.36452 + 60,
    componentW: 192.03085,
    componentH: 135.27096,
    wiggleInterval: 15 * 2 * Math.PI,
    wiggleMagnitude: 0.08,
  },
  desertMothBottomWingDot1: {
    pathData: "M252.91609,208.12172c-5.66497,1.23948 -11.26215,-2.3481 -12.50163,-8.01307c-1.23948,-5.66498 2.3481,-11.26215 8.01307,-12.50162c5.66497,-1.23948 11.26215,2.34809 12.50163,8.01306c1.23948,5.66497 -2.34809,11.26215 -8.01307,12.50163z",
    baseFill: "#c05500",
    baseStroke: "#c05500",
    baseStrokeWidth: 7.5,
    adjustX: -144.65105 + 10,
    adjustY: -112.36452 + 60,
    componentW: 192.03085,
    componentH: 135.27096,
    wiggleInterval: 15 * 2 * Math.PI,
    wiggleMagnitude: 0.08,
  },
  desertMothBottomWingDot2: {
    pathData: "M202.62218,170.39537c-4.04641,0.88534 -8.04439,-1.67721 -8.92973,-5.72362c-0.88534,-4.04642 1.67721,-8.04439 5.72362,-8.92973c4.04642,-0.88535 8.04439,1.6772 8.92974,5.72362c0.88534,4.04642 -1.67721,8.04439 -5.72362,8.92973z",
    baseFill: "#c05500",
    baseStroke: "#c05500",
    baseStrokeWidth: 7.5,
    adjustX: -144.65105 + 10,
    adjustY: -112.36452 + 60,
    componentW: 192.03085,
    componentH: 135.27096,
    wiggleInterval: 15 * 2 * Math.PI,
    wiggleMagnitude: 0.08,
  },
  desertMothBottomWingDot3: {
    pathData: "M173.26955,196.89289c-2.42785,0.5312 -4.82664,-1.00632 -5.35784,-3.43417c-0.5312,-2.42784 1.00633,-4.82664 3.43417,-5.35784c2.42784,-0.5312 4.82664,1.00633 5.35784,3.43417c0.5312,2.42784 -1.00633,4.82663 -3.43417,5.35784z",
    baseFill: "#bf5500",
    baseStroke: "#c05500",
    baseStrokeWidth: 7.5,
    adjustX: -144.65105 + 10,
    adjustY: -112.36452 + 60,
    componentW: 192.03085,
    componentH: 135.27096,
    wiggleInterval: 15 * 2 * Math.PI,
    wiggleMagnitude: 0.08,
  },
  desertMothBottomWingDot4: {
    pathData: "M284.91942,165.13803c-8.69978,1.90349 -17.29544,-3.606 -19.19893,-12.30579c-1.90349,-8.69978 3.60601,-17.29544 12.30579,-19.19893c8.69978,-1.90349 17.29544,3.606 19.19893,12.30579c1.90349,8.69978 -3.606,17.29544 -12.30579,19.19893z",
    baseFill: "#c05500",
    baseStroke: "#bf5600",
    baseStrokeWidth: 7.5,
    adjustX: -144.65105 + 10,
    adjustY: -112.36452 + 60,
    componentW: 192.03085,
    componentH: 135.27096,
    wiggleInterval: 15 * 2 * Math.PI,
    wiggleMagnitude: 0.08,
  },
  desertMothTopWing: {
    pathData: "M331.59895,240.79481c0,0 -46.75948,9.743 -96.13756,-5.36832c-49.37809,-15.11132 -95.95061,-42.67243 -85.60703,-76.47133c10.34358,-33.7989 42.89349,-52.68201 92.27158,-37.57069c49.37809,15.11132 89.47301,119.41034 89.47301,119.41034z",
    baseFill: "#b28300",
    baseStroke: "#9a4500",
    baseStrokeWidth: 7.5,
    adjustX: -144.65105 + 10,
    adjustY: -112.36452 - 60,
    componentW: 192.03085,
    componentH: 135.27096,
    wiggleInterval: 15 * 2 * Math.PI,
    wiggleMagnitude: -0.08,
  },
  desertMothTopWingDot1: {
    pathData: "M220.92916,208.3799c-1.23948,5.66498 -6.83665,9.25255 -12.50163,8.01307c-5.66498,-1.23948 -9.25255,-6.83665 -8.01307,-12.50163c1.23948,-5.66498 6.83665,-9.25255 12.50163,-8.01307c5.66498,1.23948 9.25255,6.83665 8.01307,12.50163z",
    baseFill: "#c05500",
    baseStroke: "#c05500",
    baseStrokeWidth: 7.5,
    adjustX: -144.65105 + 10,
    adjustY: -112.36452 - 60,
    componentW: 192.03085,
    componentH: 135.27096,
    wiggleInterval: 15 * 2 * Math.PI,
    wiggleMagnitude: -0.08,
  },
  desertMothTopWingDot2: {
    pathData: "M281.3458,175.53437c-0.88534,4.04641 -4.88332,6.60896 -8.92973,5.72362c-4.04641,-0.88534 -6.60896,-4.88332 -5.72362,-8.92973c0.88534,-4.04641 4.88332,-6.60896 8.92973,-5.72362c4.04641,0.88534 6.60896,4.88332 5.72362,8.92973z",
    baseFill: "#c05500",
    baseStroke: "#c05500",
    baseStrokeWidth: 7.5,
    adjustX: -144.65105 + 10,
    adjustY: -112.36452 - 60,
    componentW: 192.03085,
    componentH: 135.27096,
    wiggleInterval: 15 * 2 * Math.PI,
    wiggleMagnitude: -0.08,
  },
  desertMothTopWingDot3: {
    pathData: "M276.70372,215.46494c-0.53121,2.42785 -2.92999,3.96538 -5.35784,3.43417c-2.42785,-0.53121 -3.96538,-2.92999 -3.43417,-5.35784c0.53121,-2.42785 2.92999,-3.96538 5.35784,-3.43417c2.42785,0.53121 3.96538,2.92999 3.43417,5.35784z",
    baseFill: "#bf5500",
    baseStroke: "#c05500",
    baseStrokeWidth: 7.5,
    adjustX: -144.65105 + 10,
    adjustY: -112.36452 - 60,
    componentW: 192.03085,
    componentH: 135.27096,
    wiggleInterval: 15 * 2 * Math.PI,
    wiggleMagnitude: -0.08,
  },
  desertMothTopWingDot4: {
    pathData: "M242.2252,149.0609c-1.90349,8.69978 -10.49915,14.20927 -19.19893,12.30578c-8.69978,-1.90349 -14.20927,-10.49915 -12.30578,-19.19893c1.90349,-8.69978 10.49915,-14.20927 19.19893,-12.30578c8.69978,1.90349 14.20927,10.49915 12.30578,19.19893z",
    baseFill: "#c05500",
    baseStroke: "#bf5600",
    baseStrokeWidth: 7.5,
    adjustX: -144.65105 + 10,
    adjustY: -112.36452 - 60,
    componentW: 192.03085,
    componentH: 135.27096,
    wiggleInterval: 15 * 2 * Math.PI,
    wiggleMagnitude: -0.08,
  },
  desertMothMainBody: {
    pathData: "M268.5,180c0,14.47587 -12.75988,21.5 -28.5,21.5c-15.74012,0 -28.5,-9.62588 -28.5,-21.5c0,-11.87412 12.75988,-21.5 28.5,-21.5c15.74012,0 28.5,7.02413 28.5,21.5z",
    baseFill: "#daa000",
    baseStroke: "#cc7900",
    baseStrokeWidth: 7.5,
    adjustX: -207.75 + 100,
    adjustY: -154.75,
    componentW: 64.5,
    componentH: 50.5,
  },
  desertMothEyeTop: {
    pathData: "M264.5,169.5c0,2.76142 -2.23858,5 -5,5c-2.76142,0 -5,-2.23858 -5,-5c0,-2.76142 2.23858,-5 5,-5c2.76142,0 5,2.23858 5,5z",
    baseFill: "#000000",
    baseStroke: "#000000",
    baseStrokeWidth: 7.5,
    adjustX: -207.75 + 100,
    adjustY: -154.75,
    componentW: 64.5,
    componentH: 50.5,
  },
  desertMothEyeBottom: {
    pathData: "M264.5,190.5c0,2.76143 -2.23858,5 -5,5c-2.76142,0 -5,-2.23857 -5,-5c0,-2.76143 2.23858,-5 5,-5c2.76142,0 5,2.23857 5,5z",
    baseFill: "#000000",
    baseStroke: "#000000",
    baseStrokeWidth: 7.5,
    adjustX: -207.75 + 100,
    adjustY: -154.75,
    componentW: 64.5,
    componentH: 50.5,
  },
});

/**
 * A list of {@linkcode renderData} keys used by each supported mob.
 */
export const renderDataKeys: Record<EnemyType, string[]> = {
  Beetle: [
    "beetleLegMidRight",
    "beetleLegBottomRight",
    "beetleLegBottomLeft",
    "beetleLegMidLeft",
    "beetleLegTopLeft",
    "beetleLegTopRight",
    "beetleMandibleLeft",
    "beetleMandibleRight",
    "beetleMainBody",
    "beetleHead",
    "beetleBodyLineMid",
    "beetleBodyLineLeft",
    "beetleBodyLineRight",
  ],
  "Desert Moth": [
    "desertMothBottomWing",
    "desertMothBottomWingDot1",
    "desertMothBottomWingDot2",
    "desertMothBottomWingDot3",
    "desertMothBottomWingDot4",
    "desertMothTopWing",
    "desertMothTopWingDot1",
    "desertMothTopWingDot2",
    "desertMothTopWingDot3",
    "desertMothTopWingDot4",
    "desertMothMainBody",
    "desertMothEyeTop",
    "desertMothEyeBottom",
  ],
};

/**
 * A list that stores the size scaling each SVG file used for its respective
 * mob, so that the rendering functions can scale them back down to their
 * proper sizes.
 */
export const renderDataScales: Record<EnemyType, number> = {
  Beetle: 350,
  "Desert Moth": 110,
};

/**
 * A list of rotations to be applied to each mob render, in case the artist
 * drew the mob facing a different direction instead of to the right (0 rads).
 */
export const renderDataRotations: Partial<Record<EnemyType, number>> = {
  Beetle: Math.PI / 2,
};

/**
 * A list of optional pivot points used by mobs for rotating their components.
 */
export const renderDataRotationPivots:
  Partial<Record<EnemyType, { x: number, y: number }>> =
{
  "Desert Moth": { x: 110, y: 0 },
}

export const availableArtists: Partial<Record<EnemyType, ArtistName[]>> = {
  "Beetle": [ "Base game", "Guest" ],
  "Desert Moth": [ "Base game", "NGL880" ],
}