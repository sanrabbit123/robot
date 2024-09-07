import { Dictionary, RequestData, List, StringList, Matrix } from "./dictionary";
import { SvgTong } from "./svgTong";
import { DateRange } from "./dateRange";
import { DateMatrix, DateFactor } from "./dateMatrix";

class AbstractNode {

  public totalContents: HTMLElement;
  public baseTong: HTMLElement;
  public sero: boolean;
  public userNameToken: string;
  public mode: string;
  public ea: string;
  public standardWidth: number;
  public modeMinus: number;
  public naviHeight: number;
  public backHeight: number;
  public margin: number;
  public baseTop: number;
  public subBoxMargin: Dictionary;
  public media: List;
  public firstPageViewTime: Date;
  public events: Dictionary;
  public stacks: Dictionary;
  public timeouts: Dictionary;
  public boos: Dictionary;

  constructor () {
    this.totalContents = document.createElement("DIV");
    this.baseTong = document.createElement("DIV");
    this.sero = false;
    this.userNameToken = "";
    this.mode = "";
    this.ea = "";
    this.standardWidth = 0;
    this.modeMinus = 0;
    this.naviHeight = 0;
    this.backHeight = 0;
    this.margin = 0;
    this.baseTop = 0;
    this.subBoxMargin = {};
    this.media = [];
    this.firstPageViewTime = new Date();

    this.events = {};
    this.stacks = {};
    this.timeouts = {};
    this.boos = {};
  }
  
  public static events: Dictionary = {};
  public static stacks: Dictionary = {
    __temporaryPreventDefaultEvent: function (e: Event): void {
      e.preventDefault();
    },
    __temporaryPreventScroll: 0,
    ____isDoingToken____: 0,
  };
  public static timeouts: Dictionary = {};
  public static boos: Dictionary = {
    scroll: true,
  };

  public static mimeTypes: Dictionary = { aac: "audio/aac", abw: "application/x-abiword", arc: "application/octet-stream", avi: "video/x-msvideo", azw: "application/vnd.amazon.ebook", bin: "application/octet-stream", bz: "application/x-bzip", bz2: "application/x-bzip2", csh: "application/x-csh", css: "text/css", csv: "text/csv", doc: "application/msword", epub: "application/epub+zip", gif: "image/gif", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jar: "application/java-archive", jpeg: "image/jpeg", jpg: "image/jpeg", mjs: "application/js", js: "application/js", json: "application/json", mid: "audio/midi", midi: "audio/midi", mpeg: "video/mpeg", mpkg: "application/vnd.apple.installer+xml", odp: "application/vnd.oasis.opendocument.presentation", ods: "application/vnd.oasis.opendocument.spreadsheet", odt: "application/vnd.oasis.opendocument.text", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", pdf: "application/pdf", ppt: "application/vnd.ms-powerpoint", rar: "application/x-rar-compressed", rtf: "application/rtf", sh: "application/x-sh", svg: "image/svg+xml", swf: "application/x-shockwave-flash", tar: "application/x-tar", tif: "image/tiff", tiff: "image/tiff", ttf: "application/x-font-ttf", vsd: "application/vnd.visio", wav: "audio/x-wav", weba: "audio/webm", webm: "video/webm", webp: "image/webp", woff: "application/x-font-woff", xhtml: "application/xhtml+xml", xls: "application/vnd.ms-excel", xml: "application/xml", xul: "application/vnd.mozilla.xul+xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", "7z": "application/x-7z-compressed" };

  public mimeTypes: Dictionary = AbstractNode.mimeTypes;

  public static colorExtended: Dictionary = {
    transparent: "transparent",
    white: "#ffffff",
    whiteIcon: "#ffffff",
    whiteBlack: "#ffffff",
    whiteGray: "#fbfbfb",
    gray0: "#f7f7f7",
    gray1: "#f2f2f2",
    gray2: "#ececec",
    gray3: "#dddddd",
    gray4: "#cccccc",
    gray5: "#aaaaaa",
    gray6: "#e7e7e7",
    grayDeactive: "#c2c2c2",
    deactive: "#bbbbbb",
    liteShadow: "#bbbbbb",
    shadow: "#808080",
    shadowWhite: "#808080",
    darkShadow: "#606060",
    darkDarkShadow: "#505050",
    darkDarkDarkShadow: "#464646",
    liteBlack: "#aaaaaa",
    black: "#404040",
    darkBlack: "#303030",
    darkDarkBlack: "#252525",
    realBlack: "#202020",
    gradientGreen: "linear-gradient(222deg, rgba(89, 175, 137, 0.9) 5%, rgba(0, 156, 106, 0.9) 100%)",
    gradientGreen2: "linear-gradient(222deg, rgba(89, 175, 137, 0.8) 5%, rgba(0, 156, 106, 0.9) 100%)",
    gradientGreen3: "linear-gradient(172deg, rgba(89, 175, 137, 0.9) 5%, rgba(0, 156, 106, 0.9) 100%)",
    gradientGreen4: "linear-gradient(222deg, rgba(89, 175, 137, 1) 5%, rgba(0, 156, 106, 1) 100%)",
    gradientGreenWhite: "linear-gradient(222deg, rgba(89, 175, 137, 0.9) 5%, rgba(0, 156, 106, 0.9) 100%)",
    greenGray: "#2fa678",
    greenWhite: "#2fa678",
    greenBlack: "#2fa678",
    cancelBlack: "#404040",
    green: "#2fa678",
    softGreen: "#59af89",
    darkGreen: "#009b6a",
    whiteGreen: "#bedacb",
    middleGreen: "#83cea7",
    liteGreen: "#f0f9f5",
    gradientWhiteGray: "linear-gradient(254deg, rgba(240, 240, 240, 0.95) 0%, rgba(247, 247, 247, 0.95) 100%)",
    gradientGray: "linear-gradient(256deg, rgba(17, 17, 17, 0.8) 0%, rgba(20, 20, 20, 0.75) 100%)",
    gradientBlack: "linear-gradient(256deg, rgba(17, 17, 17, 0.9) 0%, rgba(20, 20, 20, 0.75) 100%)",
    gradientWhite: "linear-gradient(256deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.85) 100%)",
    gradientWhite2: "linear-gradient(200deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.75) 100%)",
    red: "#ff5f57",
    yellow: "#ffbd3d",
    purple: "#ba7dd7",
    darkRed: "#d13939",
    blueWhite: "#E7F3FB",
    blueLight: "#8CC9F4",
    blue: "#77BBE9",
    blueDark: "#65A0C8",
    blueDim: "#5A96BF",
    blueDarkDim: "#2A5F84",
    blueDarkDarkDim: "#224761",
    blueDeactive: "#A9CDE5",
    gardientWhite: "linear-gradient(28deg, rgba(140,201,244,0.88) 0%, rgba(195,224,244,1) 100%)",
    gradientBlue: "linear-gradient(199deg, rgba(140,201,244,0.85) 0%, rgba(119,187,233,1) 100%)",
    gradientBlue1: "linear-gradient(138deg, rgba(140,201,244,1) 0%, rgba(101,160,200,1) 100%)",
    gradientBlue2: "linear-gradient(199deg, rgba(140,201,244,1) 0%, rgba(90,150,191,1) 100%)",
    gradientBlue3: "linear-gradient(117deg, rgba(119,187,233,0.85) 0%, rgba(78,139,180,0.85) 100%)",
    gradientBlue4: "linear-gradient(138deg, rgba(111,170,215,1) 0%, rgba(119,187,233,1) 100%)",
    ultimateBlack: "#000000",
    subRed: "#ff9062",
    subYellow: "#ffd874",
    yellowLine: "#cc921f",
    warmGray0: "#f2f2f2",
    warmGray1: "#ececec",
    warmGrayMiddle: "#dddddd",
    warmGray2: "#cccccc",
  };

  public colorExtended: Dictionary = AbstractNode.colorExtended;

  public static svgMaker: Dictionary = {
    returnLoading: function (color: string = AbstractNode.colorExtended.darkShadow, color2: string = AbstractNode.colorExtended.black): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 566.929 566.929"><path d="M196.13 552.859c-23.91-7.75-37.01-33.409-29.26-57.31l0 0c7.74-23.9 33.4-37.01 57.31-29.26l0 0c23.9 7.74 37 33.399 29.26 57.31l0 0c-6.24 19.25-24.08 31.49-43.28 31.49l0 0C205.52 555.09 200.79 554.37 196.13 552.859z" fill="${color}"/><path d="M313.729 523.569C305.96 499.67 319.04 474 342.939 466.229l0 0c23.891-7.77 49.561 5.301 57.33 29.2l0 0c7.771 23.9-5.3 49.57-29.2 57.34l0 0c-4.67 1.521-9.409 2.24-14.069 2.24l0 0C337.819 555.01 319.979 542.79 313.729 523.569z" fill="${color2}"/><path d="M54.55 450.109c-14.81-20.3-10.35-48.76 9.96-63.569l0 0c20.3-14.8 48.77-10.34 63.57 9.97l0 0c14.8 20.3 10.34 48.76-9.96 63.56l0 0c-8.09 5.9-17.47 8.74-26.77 8.74l0 0C77.31 468.81 63.45 462.33 54.55 450.109z" fill="${color}"/><path d="M449 459.899c-20.33-14.779-24.82-43.239-10.03-63.56l0 0c14.78-20.32 43.23-24.81 63.561-10.03l0 0c20.319 14.78 24.81 43.24 10.029 63.561l0 0c-8.91 12.239-22.779 18.739-36.84 18.739l0 0C466.439 468.609 457.069 465.78 449 459.899z" fill="${color2}"/><path d="M0.33 283.77C0.3 258.64 20.65 238.25 45.78 238.22l0 0c25.13-0.03 45.52 20.32 45.55 45.45l0 0C91.35 308.8 71 329.189 45.88 329.22l0 0c-0.02 0-0.03 0-0.05 0l0 0C20.72 329.22 0.35 308.88 0.33 283.77z" fill="${color}"/><path d="M475.6 283.46L475.6 283.46c0-0.01 0-0.03 0-0.05l0 0c0-0.12 0-0.24 0-0.36l0 0C475.55 257.92 495.87 237.51 521 237.45l0 0c25.13-0.05 45.55 20.28 45.6 45.41l0 0c0 0.12 0 0.24 0 0.36l0 0c0 0.08 0 0.16 0 0.24l0 0c0 25.13-20.37 45.5-45.5 45.5l0 0C495.97 328.96 475.6 308.59 475.6 283.46z" fill="${color2}"/><path d="M0.33 283.76v0.01l0 0 0 0 0 0C0.33 283.76 0.33 283.76 0.33 283.76z" fill="${color}"/><path d="M64.29 180.85c-20.34-14.76-24.86-43.21-10.1-63.55l0 0C68.95 96.96 97.41 92.44 117.74 107.2l0 0c20.34 14.76 24.86 43.22 10.1 63.55l0 0c-8.9 12.27-22.78 18.78-36.86 18.78l0 0C81.71 189.53 72.36 186.71 64.29 180.85z" fill="${color}"/><path d="M438.729 170.26c-14.83-20.29-10.399-48.76 9.891-63.59l0 0c20.29-14.82 48.76-10.39 63.58 9.9l0 0 0 0 0 0c14.83 20.29 10.399 48.75-9.891 63.58l0 0c-8.1 5.92-17.5 8.77-26.81 8.77l0 0C461.47 188.92 447.64 182.45 438.729 170.26z" fill="${color}"/><path d="M166.43 71.62C158.63 47.73 171.67 22.05 195.57 14.25l0 0c23.89-7.8 49.57 5.25 57.37 29.14l0 0c7.79 23.89-5.26 49.57-29.14 57.37l0 0c-4.69 1.53-9.45 2.26-14.13 2.26l0 0C190.52 103.02 172.69 90.82 166.43 71.62z" fill="${color}"/><path d="M342.56 100.57h-0.01c-23.91-7.72-37.04-33.36-29.32-57.27l0 0C320.95 19.38 346.6 6.25 370.51 13.98l0 0 0 0 0 0C394.42 21.69 407.55 47.34 399.83 71.25l0 0c-6.221 19.27-24.07 31.54-43.29 31.54l0 0C351.91 102.79 347.2 102.07 342.56 100.57z" fill="${color}"/></svg>`;
    },
    musicIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 190.3604 228.5013" xml:space="preserve"><path fill="${color}" d="M190.3588,92.5411c0,27.2085,0.0045,54.417-0.0016,81.6255c-0.0038,16.9354-12.2404,29.5731-29.1318,30.2833 c-8.0408,0.3381-15.9315-0.1328-23.573-2.9057c-14.2383-5.1668-21.5354-18.8859-17.5531-33.5142 c1.9154-7.0359,7.3796-10.6451,13.88-12.8728c5.987-2.0517,12.2216-2.6337,18.513-2.9545 c5.1651-0.2634,10.3952-0.4364,15.4465-1.4197c5.2526-1.0224,7.5702-4.3736,7.9675-9.759c0.1424-1.9304,0.2231-3.8699,0.2242-5.8053 c0.0146-24.8831,0.0142-49.7662,0.0009-74.6492c-0.0011-1.936-0.0856-3.8745-0.2047-5.8073 c-0.2053-3.3328-1.5277-4.5815-4.7838-3.9927c-5.4801,0.9909-10.9207,2.2087-16.3633,3.3981 c-26.0831,5.7002-52.1625,11.4174-78.2399,17.1437c-3.8895,0.8541-4.6838,1.7892-5.0232,5.8036 c-0.1369,1.6194-0.21,3.2492-0.2105,4.8743c-0.0114,38.1385-0.3324,76.2811,0.1357,114.4139 c0.2151,17.5239-11.143,27.4111-24.1964,30.4439c-9.1203,2.119-18.2647,2.3043-27.3779-0.0396 c-12.1187-3.1169-19.4519-12.3519-19.8487-24.8942c-0.3807-12.0342,5.1014-19.5656,16.6356-23.1213 c6.47-1.9945,13.1459-1.8328,19.774-2.3525c4.1398-0.3246,8.3133-0.873,12.3365-1.868c5.2085-1.2881,7.6766-4.6607,8.0948-10.0512 c0.1377-1.7751,0.2096-3.5601,0.2101-5.3406c0.0114-41.0842,0.0088-82.1684,0.0091-123.2526c0-0.7752-0.0182-1.5511,0.01-2.3254 c0.2201-6.0568,1.8858-8.1047,7.8565-9.3468c38.4912-8.0077,76.9852-16.0023,115.4854-23.9667 c5.9467-1.2302,9.3986,1.509,9.8106,7.6076c0.0887,1.3132,0.1127,2.6329,0.1131,3.9496 C190.3604,38.744,190.3588,65.6425,190.3588,92.5411z"/></svg>`;
    },
    rabbitLogo: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 365.0174 319.9759" xml:space="preserve"><path fill="${color}" d="M0,160.1689c0,36.9398,28.7166,44.9485,48.2896,49.6733c4.9173,1.187,8.7928,5.1226,9.6175,10.1134 c2.859,17.3003,20.1173,39.6472,40.2479,49.6958c1.8247,0.9108,1.5226,3.5723-0.4289,4.1643 c-15.6562,4.75-27.0305,19.3415-26.9075,36.5781c0.0381,5.3367,4.5211,9.5822,9.8579,9.5822h172.2743 c0.3013,0,0.5953-0.0307,0.8796-0.0887c1.167,0.0375,2.3307,0.0887,3.5069,0.0887c59.4701,0,107.6802-48.2101,107.6802-107.6802 c0-5.7456-0.4516-11.491-1.3605-17.1644c-4.5865-28.6308-21.0121-54.6273-44.779-71.2088 c-5.029-3.5086-10.3757-6.5587-15.9527-9.1075c-8.8923-4.0639-18.3544-6.8328-28.0106-8.3388 c-2.3029-0.3592-4.6165-0.6487-6.9366-0.8703c-12.9993-1.2417-26.2029-0.3667-38.9412,2.4935 c-3.6537,0.8204-7.2547,1.8653-10.796,3.0809c-18.1071,6.2289-33.5727,17.7488-51.3084,24.8242 c-5.3935,2.1517-12.7303,3.8704-16.7037-2.09c-7.1685-10.753,14.499-42.4581,29.3149-59.3361 c23.2962-26.5389,30.6432-49.94,20.8216-64.7688c-8.7041-13.1415-29.308-14.0801-46.057,3.328 c-1.0855-0.27-2.2393-0.3451-3.3516-0.3903c-23.4358-0.9523-36.4365,23.3603-44.8278,41.59 c-4.2827,9.3038-8.2604,18.7981-10.6519,28.7877c-0.5371,2.2434-2.2685,3.9838-4.506,4.545C73.3918,92.0799,0,115.1123,0,160.1689z  M36.1397,146.5098c0-6.7027,5.4335-12.1363,12.1362-12.1363s12.1363,5.4336,12.1363,12.1363s-5.4336,12.1363-12.1363,12.1363 S36.1397,153.2124,36.1397,146.5098z"/></svg>`;
    },
    searchIcon: function (color: string, boldMode: boolean = false): string {
      if (!boldMode) {
        return `<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 37.146 39.325"><path d="M13.308 2.882c6.582-0.834 12.616 3.843 13.45 10.425s-3.843 12.616-10.425 13.45 -12.616-3.843-13.45-10.425S6.725 3.716 13.308 2.882M12.958 0.119C4.839 1.148-0.909 8.563 0.119 16.682s8.444 13.867 16.563 12.839c8.119-1.028 13.867-8.444 12.839-16.563C28.492 4.839 21.077-0.909 12.958 0.119L12.958 0.119z" fill="${color}"/><path d="M35.929 39.314c-0.434 0.055-0.887-0.095-1.204-0.442l-11.032-12.096c-0.519-0.568-0.479-1.449 0.089-1.967 0.568-0.519 1.449-0.479 1.968 0.089l11.032 12.096c0.519 0.568 0.479 1.449-0.089 1.967C36.472 39.162 36.205 39.279 35.929 39.314z" fill="${color}"/></svg>`;
      } else {
        return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 37.146 39.325" style="enable-background:new 0 0 37.146 39.325;" xml:space="preserve"><path fill="${color}" d="M36.6375,35.7993L26.4641,24.6445c2.6861-3.2016,3.9178-7.3604,3.3907-11.521c-0.5028-3.9772-2.5257-7.5201-5.6939-9.9761 C20.9928,0.6921,17.0589-0.3799,13.0806,0.12C4.8713,1.1603-0.9621,8.6851,0.077,16.8943 c1.0403,8.2092,8.5737,14.0438,16.7749,13.0035c2.3158-0.2929,4.5423-1.1325,6.481-2.4369l10.1952,11.179 c0.4002,0.4383,0.9676,0.6851,1.5593,0.6851c0.0865,0,0.1753-0.0046,0.263-0.0161c0.4336-0.0565,0.8315-0.241,1.1522-0.534 c0.4163-0.3783,0.6585-0.8961,0.6851-1.4589C37.213,36.7543,37.018,36.2157,36.6375,35.7993z M16.3243,25.7194 c-2.8544,0.361-5.6847-0.4129-7.9676-2.1821c-2.2818-1.7692-3.7379-4.3163-4.0994-7.1718 c-0.3621-2.8562,0.4123-5.6858,2.1809-7.9676s4.3157-3.7379,7.1718-4.0994c0.4596-0.0582,0.918-0.0871,1.3736-0.0871 c2.3781,0,4.6784,0.7842,6.594,2.2686c2.2812,1.7686,3.7379,4.3157,4.1,7.1713C26.4261,19.5573,22.2303,24.9709,16.3243,25.7194z"/></svg>`;
      }
    },
    referenceIcon: function (color: string): string {
      return `<svg width="100%" height="100%" viewBox="0 0 850 852" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" xmlns:serif="http://www.serif.com/"><path fill="${color}" d="M0,177.071c0,-37.967 30.826,-68.792 68.796,-68.792l172.839,-0c56.457,-0 85.776,29.115 106.993,50.331l369.956,369.936c20.193,20.192 23.193,29.689 23.193,52.304c0,22.615 -14.916,37.426 -32.54,45.008c-17.624,7.583 -96.744,39.955 -112.874,44.64c-16.131,4.684 -23.744,9.9 -29.014,24.116c-5.269,14.216 -42.556,105.3 -50.039,123.808c-7.483,18.507 -24.617,32.598 -45.919,32.598c-21.302,-0 -33.714,-8.741 -57.573,-32.598c-23.859,-23.858 -334.585,-332.625 -355.619,-355.6c-21.035,-22.976 -58.199,-47.549 -58.199,-119.034l-0,-166.717Zm194.267,70.08c-30.189,0 -54.699,24.509 -54.699,54.696c0,30.188 24.51,54.696 54.699,54.696c30.189,0 54.699,-24.508 54.699,-54.696c0,-30.187 -24.51,-54.696 -54.699,-54.696Zm563.307,247.011l-381.086,-381.066c-23.827,-23.825 -56.751,-56.521 -120.151,-56.521l-133.342,0c-7.889,0 -12.472,-5.315 -10.477,-12.554c0.526,-1.362 1.095,-2.702 1.704,-4.02c0.366,-0.647 0.648,-1.238 0.852,-1.778c11.265,-22.646 34.646,-38.223 61.637,-38.223l172.84,0c56.457,0 85.775,29.115 106.993,50.331l369.956,369.936c20.193,20.192 23.193,29.689 23.193,52.304c0,22.615 -14.917,37.426 -32.54,45.008c-4.76,2.048 -25.339,10.863 -25.407,10.892c-4.567,1.916 -9.281,2.256 -12.24,-3.812c-2.959,-6.068 -8.004,-16.57 -21.932,-30.497Z"/></svg>`;
    },
    terminalIcon: function (color: string): string {
      return `<svg viewBox="0 0 4671 4167" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"><path fill="${color}" d="M4670.29,414.15l-0,3338.37c-0,228.575 -186.28,414.15 -415.725,414.15l-3838.83,-0c-229.446,-0 -415.73,-185.575 -415.73,-414.15l0,-3338.37c0,-228.575 186.284,-414.15 415.73,-414.15l3838.83,-0c229.445,-0 415.725,185.575 415.725,414.15Zm-2677.79,1717.63l959.619,0c89.387,0 161.956,-74.73 161.956,-166.781c0,-92.045 -72.569,-166.776 -161.956,-166.776l-959.619,0c-89.387,0 -161.956,74.731 -161.956,166.776c-0,92.051 72.569,166.781 161.956,166.781Zm-1254.81,-1193.53l517.803,462.383l-514.54,435.524c-69.054,58.45 -79.036,163.635 -22.277,234.742c56.759,71.112 158.903,81.388 227.957,22.938l662.731,-560.953c36.85,-31.194 58.475,-77.524 59.1,-126.641c0.63,-49.118 -19.799,-96.023 -55.837,-128.203l-662.731,-591.799c-67.53,-60.303 -169.902,-52.802 -228.463,16.739c-58.562,69.546 -51.278,174.967 16.257,235.27Z"/></svg>`;
    },
    figmaLogo: function (color: string): string {
      return `<svg width="100%" height="100%" viewBox="0 0 500 750" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"><path fill="${color}" d="M117.321,234.642c-64.751,-0 -117.321,-52.57 -117.321,-117.321c0,-64.751 52.57,-117.321 117.321,-117.321l117.321,0l-0,234.642l-117.321,-0Zm-0,257.021c-64.751,0 -117.321,-52.569 -117.321,-117.32c0,-64.752 52.57,-117.321 117.321,-117.321l117.321,-0l-0,234.641l-117.321,0Zm117.321,140.428c-0,64.751 -52.57,117.321 -117.321,117.321c-64.751,-0 -117.321,-52.57 -117.321,-117.321c0,-64.751 52.57,-117.321 117.321,-117.321l117.321,0l-0,117.321Zm30.695,-397.449l-0,-234.642l117.32,0c64.752,0 117.321,52.57 117.321,117.321c0,64.751 -52.569,117.321 -117.321,117.321l-117.32,-0Zm117.32,22.38c64.752,-0 117.321,52.569 117.321,117.321c0,64.751 -52.569,117.32 -117.321,117.32c-64.751,0 -117.32,-52.569 -117.32,-117.32c-0,-64.752 52.569,-117.321 117.32,-117.321Z"/></svg>`;
    },
    notionLogo: function (color: string): string {
      return `<svg width="100%" height="100%" viewBox="0 0 1357 1391" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" xmlns:serif="http://www.serif.com/"><path fill="${color}" d="M0,195.483c0,-99.871 68.808,-142.211 132.193,-147.436c63.385,-5.225 651.022,-41.557 747.867,-47.194c96.846,-5.638 125.276,17.782 156.549,37.775c31.274,19.992 194.684,120.887 251.347,156.855c56.663,35.968 68.994,84.849 68.994,148.955l-0,857.862c-0,94.722 -79.464,139.982 -130.027,143.69c-38.712,2.839 -548.274,28.849 -595.075,31.168c-46.802,2.319 -274.329,13.441 -314.402,13.441c-40.073,-0 -82.311,-19.671 -116.144,-62.985c-33.833,-43.313 -179.177,-227.611 -189.72,-242.884c-10.544,-15.273 -11.582,-26.267 -11.582,-55.528l0,-833.719Zm276.551,214.105l-0,847.006c-0,63.181 53.487,52.519 78.754,50.834c39.886,-2.661 850.036,-46.236 872.471,-47.773c5.582,-0.383 46.769,-3.204 46.769,-51.345l0,-841.036c0,-6.385 0,-58.107 -58.984,-54.604c-32.912,1.954 -851.419,42.174 -890.436,45.538c-48.574,4.188 -48.574,45.758 -48.574,51.38Zm171.086,161.165c4.761,-42.891 41.267,-63.746 76.943,-65.631c24.236,-1.28 83.343,-4.984 126.718,-6.884c39.745,-1.742 43.708,-2.161 57.172,17.407l262.487,381.498l0,-336.699c0,-15.438 -51.622,-16.489 -70.333,-25.37c-18.71,-8.88 -13.35,-16.306 6.483,-31.336c18.775,-14.229 46.274,-20.369 70.699,-20.369c17.369,-0 95.074,1.053 121.67,-2.433c26.595,-3.487 32.456,-13.487 39.332,-8.531c6.877,4.957 0,23.237 -18.967,43.24c-18.967,20.002 -51.657,24.175 -51.657,24.175l-0,543.67c-0,27.776 -8.485,41.712 -22.095,48.1c-13.611,6.387 -47.664,27.083 -77.724,27.083c-30.061,-0 -56.63,-21.692 -76.815,-52.376c-20.184,-30.685 -273.754,-424.612 -273.754,-424.612l-0,394.347c-0,18.444 41.492,22.831 65.572,30.265c24.079,7.433 18.724,14.323 -0,30.684c-20.011,17.486 -60.667,24.251 -80.915,24.251l-80.069,-0c-24.3,-0 -47,-0 -57.913,5.656c-10.914,5.656 -23.944,-0 -4.749,-29.907c19.194,-29.906 62.662,-34.25 62.662,-34.25l-0,-524.676l-74.747,-7.302Zm-316.089,-410.637c1.274,1.257 95.996,97.045 105.795,106.905c1.87,1.881 24.933,33.554 57.035,30.021c24.133,-2.655 815.739,-43.193 897.689,-47.653c1.886,-0.102 46.984,-2.556 7.481,-29.496c-5.689,-3.879 -187.918,-124.704 -198.506,-131.464c-26.329,-16.811 -57.644,-25.85 -89.666,-23.234c-32.554,2.658 -741.956,47.26 -769.134,50.535c-32.765,3.949 -26.645,28.65 -10.694,44.386Z"/></svg>`;
    },
    folderIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 416.427 350.794"><path d="M173.206 29.54L133.756 4.781C128.779 1.657 123.022 0 117.145 0H23.61C10.57 0 0 10.57 0 23.61v303.92c0 12.849 10.416 23.265 23.265 23.265h373.314c10.962 0 19.848-8.886 19.848-19.848V55.293c0-11.583-9.389-20.972-20.972-20.972H189.817C183.94 34.321 178.183 32.664 173.206 29.54z" fill="${color}"/></svg>`;
    },
    triangleIcon: function (color: string): string {
      return `<svg shape-rendering="geometricPrecision" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 425.197 373.954" xml:space="preserve"><path fill="${color}" d="M2.922,32.348l191.001,330.823c8.301,14.377,29.052,14.377,37.353,0l191-330.823C430.576,17.971,420.2,0,403.599,0H21.598 C4.997,0-5.379,17.971,2.922,32.348z"/></svg>`;
    },
    logoutIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 424.942 505.757"><path d="M278.583 326.277h19.269c2.611 0 4.728 2.117 4.728 4.728v108.305 16.073 7.924c0 2.611-2.117 4.728-4.728 4.728H178.201c-2.611 0-4.728-2.117-4.728-4.728v-19.269c0-2.611 2.117-4.728 4.728-4.728h90.926c2.611 0 4.728-2.117 4.728-4.728V331.005C273.855 328.393 275.972 326.277 278.583 326.277zM278.583 178.17h19.269c2.611 0 4.728-2.117 4.728-4.728V65.137 49.064v-7.924c0-2.611-2.117-4.728-4.728-4.728H178.201c-2.611 0-4.728 2.117-4.728 4.728v19.269c0 2.611 2.117 4.728 4.728 4.728h90.926c2.611 0 4.728 2.117 4.728 4.728v103.577C273.855 176.053 275.972 178.17 278.583 178.17zM422.434 247.537l-92.906-59.541c-1.99-1.276-4.604 0.154-4.604 2.518v15.979c0 1.17-0.949 2.119-2.119 2.119H178.921c-3.009 0-5.447 2.439-5.447 5.447v75.764c0 3.009 2.439 5.447 5.447 5.447h143.884c1.17 0 2.119 0.949 2.119 2.119v15.996c0 2.36 2.606 3.79 4.597 2.522l92.901-59.191C425.777 254.58 425.783 249.684 422.434 247.537zM149.64 24.761v454.666c0 18.688-18.941 31.415-36.243 24.353l-89.219-36.415C9.556 461.398 0 447.175 0 431.383V74.073C0 58.138 9.727 43.818 24.539 37.945l91.246-36.179C132.024-4.673 149.64 7.293 149.64 24.761zM122.286 250.815c0-8.442-6.844-15.286-15.286-15.286s-15.286 6.844-15.286 15.286c0 8.442 6.844 15.286 15.286 15.286S122.286 259.257 122.286 250.815z" fill="${color}"/></svg>`;
    },
    increaseIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.853 34.853"><path d="M9.963 0c0.64 0 1.279 0.244 1.768 0.733l14.926 14.926c0.977 0.976 0.977 2.559 0 3.536L11.731 34.12c-0.977 0.977-2.559 0.977-3.536 0 -0.977-0.976-0.977-2.559 0-3.536l13.158-13.158L8.196 4.268c-0.977-0.977-0.977-2.559 0-3.536C8.684 0.244 9.324 0 9.963 0z" fill="${color}"/></svg>`;
    },
    decreaseIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.853 34.853"><path d="M24.89 34.853c-0.64 0-1.279-0.244-1.768-0.733L8.196 19.194c-0.977-0.976-0.977-2.559 0-3.536L23.122 0.733c0.977-0.977 2.559-0.977 3.536 0 0.977 0.976 0.977 2.559 0 3.536l-13.158 13.158 13.158 13.158c0.977 0.977 0.977 2.559 0 3.536C26.169 34.609 25.529 34.853 24.89 34.853z" fill="${color}"/></svg>`;
    },
    wingIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140.316 226.772"><path d="M139.316 110.452l-8.145-10.556c0 0 0 0 0-0.001l-53.754-69.665 0 0L56.375 2.962C54.934 1.094 52.709 0 50.35 0h-7.215H28.485 1.886c-1.563 0-2.445 1.795-1.49 3.032l25.144 32.586c0.001 0.001 0.002 0.003 0.003 0.004l58.653 76.015c0.795 1.03 0.795 2.467 0 3.497l-41.894 54.294h0L0.396 223.739c-0.955 1.237-0.073 3.032 1.49 3.032h26.599 14.65 7.215c2.359 0 4.585-1.094 6.026-2.962l4.383-5.681c0 0 0 0 0 0l45.021-58.347v0l2.329-3.019 23.061-29.887c0.001-0.001 0.002-0.003 0.003-0.004l8.142-10.553C140.649 114.591 140.649 112.181 139.316 110.452z" fill="${color}"/></svg>`;
    },
    horizontalArrow: function (width: number, height: number, color: string = AbstractNode.colorExtended.blue): string {
      if (height === 0) {
        throw new Error("zero height ban");
      }
      const ratio: number = width / height;
      const y: number = 6.721;
      const x: number = (ratio * y);
      const calcul = (num: number) => { return String(Math.round(num * 1000) / 1000); }
      const constValues: Array<number> = [ 3.095, 1.655, 3.626, 0.042 ];
      return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${calcul(x)} ${calcul(y)}" xml:space="preserve"><path fill="${color}" d="M${calcul(x)},3.36c0-0.103-0.042-0.196-0.109-0.263c0,0,0-0.001-0.001-0.002L${calcul(x - constValues[0])},0.11c-0.146-0.146-0.385-0.146-0.531,0c-0.146,0.146-0.146,0.384,0,0.53l2.346,2.345H0.375C0.168,2.985,0,3.153,0,3.36s0.168,0.375,0.375,0.375h${calcul(x - constValues[1])}L${calcul(x - constValues[2])},6.08c-0.146,0.146-0.146,0.385,0,0.531c0.073,0.073,0.17,0.109,0.266,0.109s0.192-0.036,0.266-0.109l2.985-2.986c0,0,0-0.001,0.001-0.002C${calcul(x - constValues[3])},3.556,${calcul(x)},3.463,${calcul(x)},3.36z"/></svg>`;
    },
    verticalArrow: function (width: number, height: number, color: string = AbstractNode.colorExtended.blue): string {
      if (width === 0) {
        throw new Error("zero width ban");
      }
      const ratio: number = height / width;
      const y: number = 6.72;
      const x: number = (ratio * y);
      const calcul = (num: number) => { return String(Math.round(num * 1000) / 1000); }
      const constValues: Array<number> = [ 1.655, 3.553, 3.456, 3.36, 0.042 ]
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${calcul(y)} ${calcul(x)}" xml:space="preserve"><path fill="${color}" d="M3.36,${calcul(x)}c0.103,0,0.196-0.042,0.263-0.109c0,0,0.001,0,0.002-0.001l2.985-2.985c0.146-0.146,0.146-0.385,0-0.531s-0.384-0.146-0.53,0l-2.345,2.346V0.375C3.735,0.168,3.567,0,3.36,0S2.985,0.168,2.985,0.375v${calcul(x - constValues[0])}l-2.345-2.346c-0.146-0.146-0.385-0.146-0.531,0C0.036,${calcul(x - constValues[1])},0,${calcul(x - constValues[2])},0,${calcul(x - constValues[3])}c0,0.096,0.036,0.192,0.109,0.266l2.986,2.985c0,0,0.001,0,0.002,0.001C3.164,${calcul(x - constValues[4])},3.257,${calcul(x)},3.36,${calcul(x)}z"/></svg>`;
    },
    squareArrow: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 153.1014 153.1014" xml:space="preserve"><path fill="${color}" d="M102.0676,0H51.0338C22.9652,0,0,22.9652,0,51.0338v51.0338c0,28.0686,22.9652,51.0338,51.0338,51.0338h51.0338 c28.0686,0,51.0338-22.9652,51.0338-51.0338V51.0338C153.1014,22.9652,130.1362,0,102.0676,0z M122.0687,77.8907 c-0.2417,0.5856-0.5918,1.1126-1.0329,1.5524l-35.9504,35.9504c-0.9288,0.9288-2.1455,1.393-3.3622,1.393 c-1.2167,0-2.4333-0.4641-3.3622-1.393c-1.8571-1.8577-1.8571-4.8667,0-6.7243l26.1349-26.1349 c0.6292-0.6286,0.1838-1.7038-0.7058-1.7038H34.7817c-2.6283,0-4.7551-2.1268-4.7551-4.7551c0-2.6283,2.1268-4.7551,4.7551-4.7551 h69.0084c0.8896,0,1.335-1.0752,0.7058-1.7044L78.361,43.4815c-1.8571-1.8577-1.8571-4.8666,0-6.7243 c1.8577-1.8577,4.8667-1.8577,6.7243,0l35.9504,35.9504c0.4411,0.4398,0.7912,0.9669,1.0329,1.5518 C122.5496,75.4219,122.5496,76.7289,122.0687,77.8907z"/></svg>`;
    },
    bentArrow: function (width: number, height: number, zMultiple: number = 1, color: string = AbstractNode.colorExtended.blue): string {
      if (height === 0) {
        throw new Error("zero height ban");
      }
      const ratio: number = width / height;
      const y: number = 6.721 * zMultiple;
      const x: number = (ratio * y);
      const calcul = (num: number) => { return String(Math.round(num * 1000) / 1000); }
      const constXValues: Array<number> = [ 0.029, 4.156, 0.01, 0.029 ];
      const constYValues: Array<number> = [ 3.506, 5.862, 3.411, 3.461, 3.506 ];
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${calcul(x)} ${calcul(y)}" xml:space="preserve"><path d="M${calcul(x - constXValues[0])},${calcul(y - constYValues[0])}c-0.019-0.045-0.046-0.086-0.081-0.121l-2.983-2.984c-0.146-0.146-0.384-0.146-0.53,0s-0.146,0.384,0,0.53l2.344,2.344H2.876c-1.172,0-2.126-0.954-2.126-2.126V0H0v${calcul(y - constYValues[1])}c0,1.586,1.29,2.876,2.876,2.876h${calcul(x - constXValues[1])}l-2.344,2.343c-0.146,0.146-0.146,0.385,0,0.531c0.073,0.073,0.169,0.109,0.265,0.109s0.192-0.036,0.265-0.109l2.984-2.984c0.034-0.034,0.062-0.075,0.081-0.121c0.019-0.045,0.029-0.094,0.029-0.144C${calcul(x)},${calcul(y - constYValues[2])},${calcul(x - constXValues[2])},${calcul(y - constYValues[3])},${calcul(x - constXValues[3])},${calcul(y - constYValues[4])}z"/></svg>`;
    },
    processArrow: function (width: number, height: number, color: string = AbstractNode.colorExtended.blue): string {
      if (height === 0) {
        throw new Error("zero height ban");
      }
      const ratio: number = width / height;
      const calcul = (num: number) => { return String(Math.round(num * 1000) / 1000); }
      let standard: number;
      let x: number, y: number, w: number, z: number;
      let standardWidth: number;
  
      standard = 200;
      standardWidth = standard * ratio;
  
      x = 3;
      y = 4;
      w = 10;
      z = 14;
  
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 ${calcul(standardWidth)} ${calcul(standard)}" xml:space="preserve"><path fill="${color}" d="M ${calcul(standardWidth - (((standard / 2) / y) * x))}, ${calcul(standard)}H 0l ${calcul(((standard / 2) - (z / 2)) / (y / x))}, -${calcul((standard / 2) - (z / 2))}c ${calcul(x)}, -${calcul(y)}, ${calcul(x)}, -${calcul(w)}, 0, -${calcul(z)}L 0,0h ${calcul(standardWidth - (((standard / 2) / y) * x))}l ${calcul(((standard / 2) - (z / 2)) / (y / x))}, ${calcul((standard / 2) - (z / 2))}c ${calcul(x)}, ${calcul(y)}, ${calcul(x)}, ${calcul(w)}, 0, ${calcul(z)}L ${calcul(standardWidth - (((standard / 2) / y) * x))}, ${calcul(standard)}z" /></svg>`;
    },
    extractArrow: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 314.679 388.43"><path d="M310.776 204.421h-67.473c-0.985 0-1.783 0.799-1.783 1.783v173.779c0 4.666-3.782 8.447-8.447 8.447H81.607c-4.665 0-8.447-3.782-8.447-8.447V206.204c0-0.985-0.799-1.783-1.783-1.783H3.903c-3.232 0-5.059-3.709-3.089-6.271L151.189 3.029c3.106-4.038 9.196-4.038 12.301 0l150.374 195.12C315.835 200.711 314.008 204.421 310.776 204.421z" fill="${color}"/></svg>`;
    },
    returnArrow: function (direction: string, color: string): string {
      const right: string = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" viewBox="0 0 425.197 425.197"><path style="fill:${color};" d="M32.348 422.275l330.823-191.001c14.377-8.301 14.377-29.052 0-37.353L32.348 2.921C17.971-5.379 0 4.997 0 21.598v382.001C0 420.2 17.971 430.576 32.348 422.275z"/></svg>`;
      const left: string = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" viewBox="0 0 425.197 425.197"><path style="fill:${color}" d="M392.849 2.921L62.026 193.922c-14.377 8.301-14.377 29.052 0 37.353l330.823 191.001c14.377 8.301 32.348-2.075 32.348-18.676V21.598C425.197 4.997 407.226-5.379 392.849 2.921z"/></svg>`;
      if (direction === "right") {
        return right;
      } else {
        return left;
      }
    },
    goalFlag: function (color0: string, color1: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 476.3076 595.2756" style="enable-background:new 0 0 476.3076 595.2756;"><path fill="${color0}" d="M20.1645,32.0342C9.028,32.0342,0,39.3074,0,48.2793v530.7512c0,8.9719,9.028,16.2451,20.1645,16.2451 s20.1645-7.2732,20.1645-16.2451V48.2793C40.329,39.3074,31.301,32.0342,20.1645,32.0342z"/><path fill="${color1}" d="M54.9746,306.6144c0,9.8952,11.6965,15.0119,19.0547,8.3959c5.2399-4.7114,11.9062-9.3995,20.3824-13.6187 c36.4869-18.1623,75.4347-15.2138,124.3226,8.9199c48.8879,24.1337,105.281,63.347,168.4556,63.347 c46.7735,0,73.852-22.4899,85.61-40.9722c5.2438-8.2426,3.6788-19.0876-3.7186-25.4686 c-16.96-14.6298-50.3036-46.8942-70.6179-89.6277c-2.1025-4.4228-2.139-9.5653-0.142-14.0367 c2.8334-6.3439,8.3161-16.8622,18.6418-32.0683c16.5381-24.3547,46.4747-65.6442,58.9731-113.7058 c1.4158-5.4444-4.9409-9.554-9.2845-5.9791c-15.9952,13.1644-45.3319,32.3686-80.36,32.3686 c-53.2946,0-101.6407-33.1875-130.9226-47.7687S188.9857,0,146.7683,0S54.9746,20.0516,54.9746,65.2618V306.6144z"/></svg>`;
    },
    completeCircle: function (color0: string, color1: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48.561 48.5605" xml:space="preserve"><path fill="${color0}" d="M22.564,33.6807c-0.5347,0-1.0483-0.2144-1.4253-0.5967l-8.2368-8.3662 c-0.7749-0.7871-0.7651-2.0537,0.022-2.8286s2.0537-0.7656,2.8286,0.022l6.6748,6.7798L32.687,16.1655 c0.6992-0.855,1.9609-0.9775,2.8145-0.2803c0.8545,0.7002,0.9795,1.96,0.2793,2.8145l-11.6694,14.248 c-0.3599,0.4395-0.8892,0.7051-1.4561,0.731C22.625,33.6802,22.5942,33.6807,22.564,33.6807z"/><path fill="${color1}" style="opacity:0.7;"  d="M24.2803,48.5605C10.8921,48.5605,0,37.6685,0,24.2803S10.8921,0,24.2803,0S48.561,10.8921,48.561,24.2803 S37.6685,48.5605,24.2803,48.5605z M24.2803,4C13.0977,4,4,13.0977,4,24.2803s9.0977,20.2803,20.2803,20.2803 c11.1831,0,20.2808-9.0977,20.2808-20.2803S35.4634,4,24.2803,4z"/></svg>`;
    },
    informationCircle: function (color0: string, color1: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48.561 48.5605" xml:space="preserve"><path fill="${color0}" d="M24.2803,48.5605C10.8921,48.5605,0,37.6685,0,24.2803S10.8921,0,24.2803,0S48.561,10.8921,48.561,24.2803 S37.6685,48.5605,24.2803,48.5605z M24.2803,4C13.0977,4,4,13.0977,4,24.2803s9.0977,20.2803,20.2803,20.2803 c11.1831,0,20.2808-9.0977,20.2808-20.2803S35.4634,4,24.2803,4z"/><path fill="${color1}" d="M24.2859,29.349h-0.0109c-1.4669,0-2.6755-1.1513-2.7468-2.6165l-0.6076-12.5 c-0.0763-1.5694,1.1755-2.8835,2.7468-2.8835h1.2262c1.5712,0,2.823,1.3142,2.7468,2.8835l-0.6076,12.5 C26.9615,28.1977,25.7528,29.349,24.2859,29.349z M24.2805,31.7115L24.2805,31.7115c-1.5188,0-2.75,1.2312-2.75,2.75v0 c0,1.5188,1.2312,2.75,2.75,2.75h0c1.5188,0,2.75-1.2312,2.75-2.75v0C27.0305,32.9427,25.7993,31.7115,24.2805,31.7115z"/></svg>`;
    },
    commentTriangle: function (direction: string, color: string): string {
      if (typeof direction !== "string" || typeof color !== "string") {
        throw new Error("direction => [ verticalRight, verticalLeft, horizontalRight, horizontalLeft ]")
      }
      if (direction === "horizontalRight") {
        return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 10" xml:space="preserve"><path fill="${color}" d="M 0, 0L 20, 0l -10, 10h -10L 0, 0z" /></svg>`;
      } else if (direction === "horizontalLeft") {
        return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 10" xml:space="preserve"><path fill="${color}" d="M 20, 0L 0, 0l 10, 10h 10L 20, 0z" /></svg>`;
      } else if (direction === "verticalRight") {
        return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 10 20" xml:space="preserve"><path fill="${color}" d="M 10, 0L 0, 0L 0, 10l 10, 10L 10, 0z"/></svg>`;
      } else {
        return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 10 20" xml:space="preserve"><path fill="${color}" d="M 10, 0L 0, 0L 0, 20l 10, -10L 10, 0z"/></svg>`;
      }
    },
    generalTriangle: function (color: string): string {
      return `<svg shape-rendering="geometricPrecision" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 425.197 373.954" xml:space="preserve"><path fill="${color}" d="M2.922,32.348l191.001,330.823c8.301,14.377,29.052,14.377,37.353,0l191-330.823C430.576,17.971,420.2,0,403.599,0H21.598 C4.997,0-5.379,17.971,2.922,32.348z"/></svg>`;
    },
    buttonArrow: function (direction: string, color: string): string {
      const right: string = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" viewBox="0 0 425.197 425.197"><path style="fill:${color};" d="M32.348 422.275l330.823-191.001c14.377-8.301 14.377-29.052 0-37.353L32.348 2.921C17.971-5.379 0 4.997 0 21.598v382.001C0 420.2 17.971 430.576 32.348 422.275z"/></svg>`;
      const left: string = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" viewBox="0 0 425.197 425.197"><path style="fill:${color}" d="M392.849 2.921L62.026 193.922c-14.377 8.301-14.377 29.052 0 37.353l330.823 191.001c14.377 8.301 32.348-2.075 32.348-18.676V21.598C425.197 4.997 407.226-5.379 392.849 2.921z"/></svg>`;
      if (direction === "right") {
        return right;
      } else {
        return left;
      }
    },
    buttonLineArrow: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 21.6338 45.4406" xml:space="preserve"><path fill="${color}" d="M2.4985,45.4406c-0.5367,0-1.0761-0.1719-1.5305-0.5243c-1.1181-0.8671-1.1947-2.5965-0.2958-3.6892l14.463-17.5818 c0.4423-0.5376,0.4423-1.3131,0-1.8507L0.6588,4.1969c-0.8303-1.0094-0.8607-2.5266,0.061-3.4533 c1.0606-1.0664,2.7796-0.9641,3.7108,0.1678l16.6338,20.2202c0.7592,0.9228,0.7592,2.2539,0,3.1767L4.4306,44.529 C3.9364,45.1296,3.2201,45.4406,2.4985,45.4406z"/></svg>`;
    },
    titleIcon: function (color: string): string {
      return `<svg width="100%" height="100%" viewBox="0 0 750 751" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"><path fill="${color}" d="M413.515,380.695l-360.162,360.161c-12.196,12.196 -31.999,12.196 -44.194,0c-12.196,-12.195 -12.196,-31.998 -0,-44.194l117.134,-117.134l0,-146.753c0,-38.533 2.048,-51.501 22.731,-72.184l171.354,-171.354c6.795,-6.795 13.7,-5.09 16.678,6.796c2.979,11.885 23.722,72.836 27.46,84.315c3.738,11.478 14.245,11.729 18.742,-0c4.497,-11.73 80.093,-194.45 84.663,-205.547c4.571,-11.097 9.823,-14.861 21.456,-20.801c11.633,-5.939 92.948,-54 183.504,-54c61.636,0 77.119,43.834 77.119,74.801c0,67.485 -23.952,188.667 -135.484,300.199l-218.702,218.702c-25.72,25.72 -36.211,30.868 -65.376,30.868l-96.757,-0c-8.488,-0 -13.665,-4.657 -5.142,-13.179l201.893,-201.894c9.725,-9.724 16.038,-20.65 5.777,-30.235c-7.197,-6.722 -15.854,-3.411 -22.694,1.433Z"/></svg>`;
    },
    profileIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 455 455"><path d="M227.5 0C101.855 0 0 101.855 0 227.5S101.855 455 227.5 455 455 353.145 455 227.5 353.145 0 227.5 0zM227.5 85.86c36.175 0 65.5 28.716 65.5 64.14 0 35.423-29.325 64.14-65.5 64.14 -36.175 0-65.5-28.716-65.5-64.14C162 114.577 191.325 85.86 227.5 85.86zM227.5 370c-63.789 0-115.5-19.252-115.5-43 0-34.357 1.24-80.277 57.093-117.897 1.78-1.199 4.149-1.065 5.759 0.353 6.299 5.551 24.124 19.215 52.648 19.215 28.504 0 46.345-13.669 52.649-19.218 1.61-1.417 3.978-1.55 5.756-0.352C341.76 246.722 343 292.643 343 327 343 350.748 291.289 370 227.5 370z" fill="${color}"/></svg>`;
    },
    profileLogo: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 369.906 455"><path d="M369.906 386.143c0 38.029-82.806 68.857-184.953 68.857S0 424.172 0 386.143c0-55.017 1.985-128.55 91.425-188.791 2.85-1.919 6.644-1.706 9.221 0.566 10.086 8.889 38.63 30.77 84.307 30.77 45.644 0 74.214-21.889 84.308-30.775 2.578-2.269 6.37-2.481 9.218-0.563C367.921 257.591 369.906 331.126 369.906 386.143zM184.953 205.417c57.928 0 104.887-45.984 104.887-102.709C289.84 45.984 242.881 0 184.953 0 127.026 0 80.066 45.984 80.066 102.709 80.066 159.433 127.026 205.417 184.953 205.417z" fill="${color}"/></svg>`;
    },
    fullscreenIcon: function (color: string): string {
      return `<svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"><path fill="${color}" d="M100,9.362c-0.023,-5.127 -4.235,-9.339 -9.362,-9.362l-24.383,0c-2.918,0 -5.319,2.401 -5.319,5.319c0,2.918 2.401,5.319 5.319,5.319l22.043,0c0.583,0 1.064,0.481 1.064,1.064l-0,13.915c-0,2.918 2.401,5.319 5.319,5.319c2.918,0 5.319,-2.401 5.319,-5.319l-0,-16.255Z"/><path fill="${color}" d="M0,25.617c0,2.918 2.401,5.319 5.319,5.319c2.918,0 5.319,-2.401 5.319,-5.319l0,-13.915c0,-0.583 0.481,-1.064 1.064,-1.064l22.043,0c2.918,0 5.319,-2.401 5.319,-5.319c-0,-2.918 -2.401,-5.319 -5.319,-5.319l-24.383,0c-5.127,0.023 -9.339,4.235 -9.362,9.362l0,16.255Z"/><path fill="${color}" d="M100,90.596l-0,-16.213c-0,-2.918 -2.401,-5.319 -5.319,-5.319c-2.918,-0 -5.319,2.401 -5.319,5.319l-0,13.915c-0,0.583 -0.481,1.064 -1.064,1.064l-22.043,-0c-2.918,-0 -5.319,2.401 -5.319,5.319c0,2.918 2.401,5.319 5.319,5.319l24.383,-0c5.143,-0.023 9.362,-4.261 9.362,-9.404Z"/><path fill="${color}" d="M0,90.596c-0,5.143 4.219,9.381 9.362,9.404l24.383,0c2.918,0 5.319,-2.401 5.319,-5.319c-0,-2.918 -2.401,-5.319 -5.319,-5.319l-22.043,-0c-0.583,-0 -1.064,-0.481 -1.064,-1.064l0,-13.915c0,-2.918 -2.401,-5.319 -5.319,-5.319c-2.918,-0 -5.319,2.401 -5.319,5.319l0,16.213Z"/><path fill="${color}" d="M29.66,33.574l40.638,0c-0,0 8.298,0 8.298,8.298l-0,16.298c-0,0 -0,8.298 -8.298,8.298l-40.638,0c-0,0 -8.298,0 -8.298,-8.298l-0,-16.298c-0,0 -0,-8.298 8.298,-8.298"/></svg>`;
    },
    shareIcon: function (color: string): string {
      return `<svg width="100%" height="100%" viewBox="0 0 256 285" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"><path d="M241.95,236.766c0.004,36.421 -39.423,59.191 -70.964,40.986c-19.863,-11.465 -28.643,-35.522 -20.839,-57.085l-69.655,-44.751c-26.001,25.506 -69.86,13.299 -78.948,-21.968c-9.087,-35.271 23.418,-67.153 58.505,-57.388c7.702,2.144 14.735,6.206 20.443,11.806l69.655,-44.686c-12.484,-34.308 16.853,-69.272 52.811,-62.929c35.957,6.342 51.566,49.23 28.097,77.199c-17.761,21.163 -49.771,22.731 -69.51,3.406l-69.656,44.75c3.764,10.405 3.764,21.798 0,32.202l69.656,44.751c26.03,-25.476 69.872,-13.222 78.921,22.058c0.976,3.806 1.475,7.723 1.484,11.649Z" fill="${color}"/></svg>`;
    },
    plusIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.388 8.388"><path d="M4.194 0C1.878 0 0 1.878 0 4.194s1.878 4.194 4.194 4.194 4.194-1.878 4.194-4.194S6.51 0 4.194 0zM6.469 4.606H4.606v1.863c0 0.228-0.185 0.412-0.412 0.412 -0.228 0-0.412-0.185-0.412-0.412V4.606H1.918c-0.228 0-0.412-0.185-0.412-0.412 0-0.228 0.185-0.412 0.412-0.412h1.863V1.918c0-0.228 0.185-0.412 0.412-0.412 0.228 0 0.412 0.185 0.412 0.412v1.863h1.863c0.228 0 0.412 0.185 0.412 0.412C6.881 4.421 6.697 4.606 6.469 4.606z" fill="${color}"/></svg>`;
    },
    downloadArrow: function (color: string, longMode: boolean = false): string {
      if (longMode) {
        return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 41.684 72.772"><path fill="${color}" d="M41.684,70.169c0,1.437-1.166,2.603-2.603,2.603H2.603C1.166,72.772,0,71.606,0,70.169 c0-1.437,1.166-2.603,2.603-2.603H39.08C40.518,67.565,41.684,68.731,41.684,70.169z M19.001,56.57 c0.508,0.508,1.173,0.759,1.84,0.759c0.668,0,1.332-0.251,1.84-0.759l18.239-18.235c1.017-1.017,1.017-2.671,0-3.688 c-1.017-1.017-2.664-1.017-3.681,0L23.445,48.442V2.603C23.445,1.166,22.279,0,20.842,0c-1.437,0-2.603,1.166-2.603,2.603v45.839 L4.444,34.647c-1.017-1.017-2.664-1.003-3.681,0c-1.017,1.017-1.017,2.671,0,3.688L19.001,56.57z"/></svg>`;
      } else {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.853 30.842"><path fill="${color}" d="M16.366 25.637c0.281 0.281 0.663 0.439 1.061 0.439s0.78-0.158 1.061-0.439L25.75 18.375c0.586-0.586 0.586-1.535 0-2.121s-1.535-0.586-2.121 0l-4.703 4.703V1.5c0-0.829-0.671-1.5-1.5-1.5s-1.5 0.671-1.5 1.5v19.456l-4.702-4.702c-0.586-0.586-1.535-0.586-2.121 0s-0.586 1.535 0 2.121L16.366 25.637z"/><path d="M25.45 27.83H9.403c-0.829 0-1.5 0.672-1.5 1.5s0.671 1.5 1.5 1.5h16.047c0.828 0 1.5-0.672 1.5-1.5S26.278 27.83 25.45 27.83z" fill="${color}"/></svg>`;
      }
    },
    entireArrow: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1078.5691 1080" xml:space="preserve"><path fill="${color}" d="M243.8123,128.607c-1.7437-1.7437-1.7437-4.5707,0-6.3143L358.483,7.6221 C361.2958,4.8093,359.3037,0,355.3258,0H51.5803C23.0933,0,0,23.0933,0,51.5803v303.7455c0,3.9778,4.8094,5.9699,7.6221,3.1572 L121.94,244.1651c1.7437-1.7437,4.5707-1.7437,6.3143,0l178.5876,178.5877c10.9222,10.9222,28.6306,10.9222,39.5528,0 L422.4,346.7475c10.9222-10.9222,10.9222-28.6306,0-39.5528L243.8123,128.607z"/><path fill="${color}" d="M1026.9888,0H723.2432c-3.9778,0-5.9699,4.8093-3.1572,7.6221l114.6707,114.6706 c1.7437,1.7437,1.7437,4.5707,0,6.3143L656.1691,307.1947c-10.9222,10.9222-10.9222,28.6306,0,39.5528l76.0052,76.0052 c10.9222,10.9222,28.6306,10.9222,39.5528,0l178.5876-178.5877c1.7437-1.7437,4.5707-1.7437,6.3144,0l114.3178,114.3179 c2.8129,2.8127,7.6222,0.8206,7.6222-3.1572V51.5803C1078.5691,23.0933,1055.4758,0,1026.9888,0z"/><path fill="${color}" d="M346.3948,657.2473c-10.9222-10.9222-28.6306-10.9222-39.5528,0L128.2544,835.835 c-1.7437,1.7437-4.5707,1.7437-6.3143,0L7.6221,721.517C4.8094,718.7043,0,720.6964,0,724.6742v303.7455 C0,1056.9067,23.0933,1080,51.5803,1080h303.7455c3.9778,0,5.9699-4.8093,3.1572-7.6221L243.8123,957.7073 c-1.7437-1.7437-1.7437-4.5707,0-6.3143L422.4,772.8054c10.9222-10.9222,10.9222-28.6306,0-39.5529L346.3948,657.2473z"/><path fill="${color}" d="M1070.9469,721.517L956.6291,835.835c-1.7437,1.7437-4.5707,1.7437-6.3144,0L771.7271,657.2473 c-10.9222-10.9222-28.6306-10.9222-39.5528,0l-76.0052,76.0052c-10.9222,10.9222-10.9222,28.6306,0,39.5529l178.5876,178.5876 c1.7437,1.7437,1.7437,4.5707,0,6.3143l-114.6707,114.6707c-2.8127,2.8127-0.8207,7.6221,3.1572,7.6221h303.7455 c28.4871,0,51.5803-23.0933,51.5803-51.5803V724.6742C1078.5691,720.6964,1073.7598,718.7043,1070.9469,721.517z"/></svg>`;
    },
    plusCircleIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.853 34.853"><path fill="${color}" d="M17.427,0.001c-9.624,0-17.425,7.801-17.425,17.425s7.801,17.425,17.425,17.425s17.425-7.801,17.425-17.425 S27.05,0.001,17.427,0.001z M25.821,19.341H19.34v6.48c0,1.056-0.858,1.914-1.914,1.914c-1.055,0-1.914-0.858-1.914-1.914V19.34 H9.031c-1.055,0-1.914-0.859-1.914-1.914s0.858-1.914,1.914-1.914h6.482V9.031c0-1.056,0.858-1.914,1.914-1.914 c1.056,0,1.914,0.858,1.914,1.914v6.482h6.483c0.512,0,0.992,0.199,1.354,0.561c0.36,0.361,0.56,0.842,0.559,1.353 C27.735,18.483,26.876,19.341,25.821,19.341z"/></svg>`;
    },
    settingIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512.9863 526.2865" xml:space="preserve"><path fill="${color}" d="M103.543,52.1175c2.081,0.9305,4.3185,1.6158,6.2185,2.8297c17.124,10.9406,34.2023,21.953,51.2494,33.0131 c1.6664,1.0811,2.9053,1.2133,4.7211,0.2065c11.0291-6.1159,22.6236-10.9538,34.662-14.6977 c1.6555-0.5149,2.4143-1.281,2.7901-2.9917c4.5563-20.7406,9.2001-41.4619,13.8099-62.1907 c1.1024-4.9572,4.8512-8.2334,9.9073-8.247c19.748-0.053,39.4964-0.0545,59.2445,0.0058c5.0661,0.0155,8.7577,3.2817,9.8683,8.2807 c4.6228,20.8093,9.233,41.6216,13.9677,62.4055c0.2314,1.0159,1.442,2.2511,2.4568,2.5788 c12.24,3.9524,24.0614,8.8645,35.3101,15.1064c1.4818,0.8222,2.5106,0.6443,3.8484-0.2219 c17.0588-11.0438,34.1554-22.0292,51.2303-33.0483c6.0642-3.9135,10.3034-3.4893,15.3405,1.6715 c13.2652,13.5911,26.5221,27.1903,39.7736,40.7948c4.4557,4.5745,4.9806,9.3125,1.6769,14.7055 c-10.874,17.7511-21.7367,35.5092-32.6405,53.2419c-0.8248,1.3414-0.9726,2.4349-0.1998,3.9018 c6.0728,11.5275,10.9155,23.5638,14.553,36.0747c0.501,1.7231,1.4024,2.5582,3.179,2.9635 c14.2887,3.2594,28.5578,6.6046,42.8278,9.9457c5.9151,1.3849,11.8234,2.7998,17.7239,4.2455 c4.7671,1.168,7.884,5.0094,7.8939,9.9468c0.0405,20.3314,0.0408,40.663,0.0024,60.9944c-0.0095,5.0196-3.1241,8.8686-8.114,10.0508 c-13.7744,3.2636-27.5671,6.45-41.3513,9.6721c-6.5674,1.5352-13.1452,3.0297-19.6815,4.688 c-0.8476,0.2151-1.8889,1.1774-2.14,2.0058c-3.9005,12.8683-8.8825,25.2838-15.0081,37.2585 c-0.4511,0.8819-0.0374,2.5909,0.5531,3.5639c10.5851,17.4401,21.2589,34.8264,31.9152,52.2232 c4.0132,6.5516,3.5458,10.7183-1.8926,16.2983c-13.1378,13.4796-26.2849,26.9502-39.4359,40.4169 c-4.5985,4.7088-8.9868,5.1776-14.5333,1.602c-17.1493-11.0553-34.3102-22.0927-51.4333-33.1884 c-1.5034-0.9742-2.6964-1.1354-4.3275-0.2313c-11.0324,6.1152-22.6006,11.006-34.6502,14.7319 c-1.7785,0.5499-2.6782,1.3756-3.1029,3.3228c-4.5259,20.7477-9.1708,41.4695-13.796,62.1956 c-1.0436,4.6766-4.7787,7.9647-9.5983,7.9839c-19.9145,0.0796-39.8297,0.0811-59.7442-0.0044 c-4.911-0.0211-8.5311-3.3644-9.6207-8.2614c-4.6122-20.7284-9.2647-41.4478-13.804-62.192 c-0.3872-1.7694-1.2394-2.4904-2.8185-2.9748c-12.1413-3.7241-23.775-8.6707-34.8874-14.8111 c-1.6486-0.911-2.8399-0.7009-4.3265,0.2607c-17.2003,11.1268-34.4318,22.2053-51.6598,33.2891 c-5.2878,3.402-9.778,2.9194-14.141-1.5487c-13.2681-13.5875-26.5309-27.1802-39.7766-40.7895 c-5.2276-5.371-5.634-9.7041-1.6956-16.1254c10.6654-17.389,21.2869-34.805,31.999-52.1651 c1.0123-1.6406,0.9874-2.8936,0.1196-4.5525c-5.8828-11.2466-10.6752-22.9488-14.1713-35.1558 c-0.6059-2.1157-1.6517-2.9992-3.8442-3.5013c-19.8854-4.5543-39.7338-9.2699-59.5922-13.9419 c-5.199-1.2231-8.3607-5.0414-8.3703-10.3763c-0.0365-20.1648-0.0374-40.3297,0.0008-60.4946 c0.0099-5.2348,3.1058-9.0556,8.1659-10.2474c19.6963-4.6389,39.3859-9.3079,59.114-13.8078 c2.723-0.6211,3.9687-1.8202,4.7499-4.4918c3.4428-11.7745,7.9935-23.1342,13.7456-33.98c1.0638-2.0058,1.0158-3.5054-0.189-5.453 c-10.7335-17.3506-21.3692-34.7618-32.0168-52.1655c-3.5895-5.8671-3.0839-10.4565,1.6663-15.3293 c13.3151-13.6589,26.6535-27.295,39.9526-40.9695C97.4627,54.1286,99.9501,52.5041,103.543,52.1175z M254.0143,384.4631 c35.9556-0.5699,64.4068-12.8121,87.3302-37.091c40.8153-43.2289,44.9545-109.7653,9.1699-157.3098 c-27.218-36.1626-64.0588-52.1869-109.2199-47.0405c-26.5673,3.0275-49.1572,15.054-67.9178,34.0693 c-40.3733,40.9214-46.8352,105.7537-14.8032,153.6495C181.7802,365.4408,214.6885,383.2517,254.0143,384.4631z"/></svg>`;
    },
    returnIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.449 413.43"><path style="fill:${color}" d="M201.159 62.683c-1.04 0 1.037 0.02 0 0.031l0-58.417c0-3.611-4.287-5.606-7.155-3.329L43.119 120.739c-3.724 2.956-3.755 8.501-0.065 11.497l150.913 120.542c2.859 2.322 7.193 0.334 7.193-3.299v-69.727l-3.111 0c120.242 0.588 163.157 53.466 163.157 118.639 0 55.465-52.965 102.031-124.531 115.039 107.786-13.319 190.203-93.841 190.203-181.851C426.877 143.35 361.043 62.683 201.159 62.683z"/></svg>`;
    },
    filterIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1206.412 1268.126"><path fill="${color}" d="M1154.367 0H52.045C5.759 0-17.41 59.19 15.334 93.785l419.086 442.77v403.991c0 23.315 9.28 45.671 25.791 62.132l256.736 255.967c20.34 20.279 55.045 5.873 55.045-22.849V536.555l419.086-442.77C1223.822 59.19 1200.653 0 1154.367 0z"/></svg>`;
    },
    hashIcon: function (color: string): string {
      return `<svg width="100%" height="100%" viewBox="0 0 104 160" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"><path fill="${color}" d="M17.349,112.034l-14.465,0c-1.592,0 -2.884,-1.292 -2.884,-2.884l-0,-13.765c-0,-1.592 1.292,-2.884 2.884,-2.884l17.689,0.001l4.295,-27.612l-16.045,0c-1.578,0 -2.859,-1.281 -2.859,-2.858l0,-13.817c0,-1.577 1.281,-2.858 2.859,-2.858l19.274,-0c0.151,-0.986 5.239,-34.171 6.423,-42.303c0.445,-3.054 3.24,-3.054 3.24,-3.054l12.178,-0c0,-0 2.437,0.374 1.999,3.054c-1.262,7.723 -6.502,41.311 -6.656,42.303l24.774,-0c0.151,-0.986 5.239,-34.171 6.423,-42.303c0.444,-3.054 3.24,-3.054 3.24,-3.054l12.178,-0c0,-0 2.437,0.374 1.999,3.054c-1.262,7.723 -6.502,41.311 -6.657,42.303l13.883,-0c1.577,-0 2.858,1.281 2.858,2.858l0,13.817c0,1.577 -1.281,2.858 -2.858,2.858l-16.905,0l-4.273,27.611l15.187,-0c1.592,-0 2.885,1.292 2.885,2.884l-0,13.765c-0,1.592 -1.293,2.884 -2.885,2.884l-18.209,0c-0.102,0.655 -5.723,36.663 -7.025,44.45c-0.519,3.103 -3.069,3.104 -3.069,3.104l-12.156,-0.001c-0,0 -2.47,0 -1.99,-3.103c1.182,-7.646 6.493,-43.546 6.626,-44.45l-24.344,0c-0.102,0.655 -5.723,36.663 -7.025,44.45c-0.519,3.103 -3.069,3.104 -3.069,3.104l-12.156,-0.001c-0,0 -2.47,0 -1.99,-3.103c1.182,-7.646 6.493,-43.546 6.626,-44.45Zm24.909,-47.144l-4.273,27.612l24.546,0l4.295,-27.612l-24.568,0Z"/></svg>`;
    },
    additionIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.853 34.853"><path d="M32.342 14.915H19.937V2.512c0-1.387-1.124-2.511-2.511-2.511 -1.387 0-2.511 1.124-2.511 2.511V14.915H2.512c-1.387 0-2.511 1.124-2.511 2.511 0 1.387 1.124 2.512 2.511 2.512h12.403v12.402c0 1.387 1.124 2.511 2.511 2.511 1.387 0 2.511-1.124 2.511-2.511V19.939h12.404c1.387 0 2.511-1.125 2.511-2.512C34.853 16.039 33.729 14.915 32.342 14.915z" fill="${color}"/></svg>`;
    },
    blankArrow: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1080.0533 1080" xml:space="preserve"><path fill="${color}" d="M539.7226,1079.8636c-124.393-0.0005-248.7868-0.2578-373.1786,0.1353c-45.1227,0.1427-84.1436-14.3094-116.6906-45.3521 c-29.5977-28.2297-46.087-63.0261-49.1954-103.9402c-0.4741-6.2405-0.4855-12.5262-0.4861-18.791 C0.1493,663.8575,0.302,415.7991,0.0002,167.7413C-0.048,128.1848,10.0144,92.3785,34.9556,61.6091 C68.401,20.3484,111.9671-0.0429,165.3529,0.0468C298.4241,0.2704,431.496,0.115,564.5676,0.1217 c28.2051,0.0014,56.4184-0.3716,84.6132,0.1816c31.2153,0.6125,53.9622,25.4533,52.8174,56.6719 c-0.9522,25.9622-22.8329,48.6824-48.7466,50.5031c-4.5624,0.3205-9.1539,0.3164-13.7319,0.3168 c-157.6609,0.0153-315.3218,0.0262-472.9827-0.0009c-23.3922-0.004-42.2211,8.7187-52.392,30.3418 c-4.1387,8.7986-6.0082,19.4534-6.0422,29.2736c-0.4016,115.952-0.2602,231.9058-0.2598,347.8591 c0.0005,132.828,0.0093,265.6561-0.0017,398.4841c-0.0019,23.1031,8.6367,41.7916,29.9793,51.8642 c9.0032,4.2491,19.8911,6.2592,29.9315,6.2902c130.6597,0.403,261.3209,0.2675,391.9819,0.2674 c118.1251-0.0002,236.2502,0.0222,354.3754-0.0188c26.7462-0.0093,46.687-13.056,54.6546-36.7849 c2.546-7.5825,3.3141-16.0732,3.3237-24.1501c0.1865-158.1398,0.2299-316.2802,0.0198-474.42 c-0.0241-18.1701,4.7162-33.8824,18.8365-45.7023c16.5436-13.8484,35.4057-17.3034,55.4003-8.9795 c20.124,8.3777,31.5012,23.8629,33.3245,45.8806c0.2582,3.1171,0.2365,6.2627,0.2366,9.3951 c0.0104,158.6223-0.2081,317.2451,0.1476,475.8665c0.1005,44.8239-13.9149,83.7839-44.6803,116.239 c-28.2864,29.8398-63.2085,46.677-104.4042,49.8301c-6.9594,0.5326-13.9717,0.5117-20.9595,0.5134 C786.58,1079.8718,663.1513,1079.864,539.7226,1079.8636z"/><path fill="${color}" d="M970.0544,186.9626c-2.584,2.3743-5.2608,4.6558-7.7386,7.136c-127.052,127.177-254.0822,254.3756-381.1285,381.5581 c-19.8133,19.8345-46.5831,24.1418-68.5496,11.1249c-30.5685-18.1142-36.0625-59.1721-10.9549-85.0772 c19.7832-20.4116,40.1472-40.2604,60.2634-60.349C670.9156,332.5355,779.89,223.7207,888.8408,114.8822 c1.5888-1.5871,2.8972-3.4548,4.3365-5.1915c-0.2444-0.6374-0.4888-1.2747-0.7331-1.9121c-9.2573,0-18.5151-0.0533-27.772,0.0117 c-16.6613,0.117-30.683-5.947-41.405-18.6199c-14.4191-17.0426-17.265-36.5933-8.5165-56.7742 c8.7747-20.2415,25.0278-31.3798,47.4395-32.1063c13.9672-0.4527,27.9593-0.1656,41.9402-0.1668 c40.4976-0.0035,80.9969-0.2274,121.4919,0.103c31.3495,0.2558,53.9006,22.4354,54.1382,53.7478 c0.4094,53.9918,0.3521,107.9904,0.0132,161.9831c-0.1704,27.1332-19.4187,49.7164-44.0782,53.1509 c-28.9084,4.0262-53.0789-10.838-61.4047-38.4024c-1.7707-5.8623-1.7394-12.3505-1.9829-18.572 c-0.3163-8.084-0.0773-16.1897-0.0773-24.2861C971.5051,187.5525,970.7798,187.2575,970.0544,186.9626z"/></svg>`;
    },
    doubleQuote: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.785 49.482"><path d="M1.404 41.51C-3.883 27.672 6.229 7.036 23.924 0l1.608 2.581c-8.272 4.924-13.097 10.083-14.936 15.947 -1.379 4.22 0.69 6.799 3.446 7.034 6.205 0.47 10.8 5.862 10.8 11.492 0 6.801-5.054 12.428-11.718 12.428C7.837 49.482 3.242 46.2 1.404 41.51zM32.657 41.51C27.37 27.672 37.482 7.036 55.177 0l1.608 2.581c-8.272 4.924-13.097 10.083-14.936 15.947 -1.379 4.22 0.69 6.799 3.446 7.034 6.205 0.47 10.802 5.862 10.802 11.492 0 6.801-5.056 12.428-11.72 12.428C39.09 49.482 34.495 46.2 32.657 41.51z" fill="${color}"/></svg>`;
    },
    serifAsterisk: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 117.4811 129.0094" xml:space="preserve"><path fill="${color}" d="M109.1632,54.0568c-10.9022,6.8139-33.1609,6.8139-39.5205,9.5394c-1.817,0.9085-2.7256,2.2713-0.9085,2.7256 c7.2681,2.7255,28.6183,2.7255,39.9747,9.5394c8.6309,4.9968,10.4479,12.7192,5.4511,20.8959 c-5.4511,9.0852-11.8107,11.3565-21.3501,5.9054c-11.3565-6.3596-22.2587-25.8927-27.7098-29.5268 c-1.3628-0.9085-2.2713-0.4543-2.2713,0.9085c0,7.2681,11.3565,26.347,11.3565,39.5205c0,10.4479-5.4511,15.4448-15.8991,15.4448 s-15.4448-4.9968-15.4448-15.4448c0-13.1735,11.8107-32.2524,11.8107-39.0662c0-1.817-0.9085-2.7255-2.2713-1.817 c-6.8139,4.0883-16.3533,21.8044-28.6183,29.0725c-9.0852,5.4511-15.899,3.6341-20.8959-5.4511 c-4.9968-8.6309-3.6341-15.899,5.4511-21.3501c11.8107-6.8139,32.7066-6.3596,39.5205-9.5394 c1.3628-0.4543,2.7256-1.817,0.9085-2.7256c-6.3596-2.7255-28.6183-2.7255-39.9747-9.5394 C0.1412,48.1514-1.6758,41.3375,3.321,32.2523s12.7192-10.9022,21.8044-5.4511c11.3565,6.8139,21.3501,25.4385,27.2555,29.0725 c1.3628,0.9085,2.2713,0.4543,2.2713-0.9085c0-6.8139-11.3565-26.347-11.3565-39.5205C43.2958,4.9968,48.2926,0,58.7406,0 s15.899,4.9968,15.899,15.4448c0,13.1735-11.8107,32.7066-11.8107,39.0662c0,1.817,0.9085,2.2713,2.2713,1.817 c6.8139-3.6341,17.7161-22.2587,28.6183-29.0725c8.6309-5.4511,15.4448-3.6341,20.8959,5.4511 C119.6112,41.3375,118.2484,48.6057,109.1632,54.0568z"/></svg>`;
    },
    calendarIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1343.66 1279.127"><path fill="${color}" d="M1343.66 90.609c0-35.574-20.504-66.354-50.336-81.182 -1.354-0.673-2.728-1.313-4.12-1.92 -1.225-0.534-2.463-1.041-3.715-1.521 -0.873-0.335-1.753-0.657-2.639-0.965 -2.514-0.875-5.077-1.643-7.686-2.298C1268.085 0.947 1260.679 0 1253.051 0H90.609C72.315 0 55.29 5.427 41.048 14.751c-0.976 0.639-1.942 1.291-2.891 1.966 -0.849 0.604-1.683 1.227-2.51 1.859 -3.773 2.883-7.317 6.052-10.59 9.482 -0.046 0.048-0.092 0.098-0.138 0.146 -0.908 0.955-1.794 1.931-2.66 2.925 -1.069 1.227-2.105 2.484-3.107 3.768C7.152 50.264 0 69.601 0 90.609v169.702h0v928.208c0 50.042 40.567 90.609 90.609 90.609h1162.442c50.042 0 90.609-40.567 90.609-90.609V260.311h0V90.609zM1291.361 1188.518c0 21.158-17.152 38.311-38.311 38.311H90.609c-21.158 0-38.311-17.152-38.311-38.311V280.009c0-10.879 8.819-19.699 19.699-19.699h1199.666c10.879 0 19.699 8.819 19.699 19.699V1188.518z"/><path fill="${color}" d="M358.2 576.714h-161.176c-9.348 0-16.927-7.578-16.927-16.927V398.612c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C375.127 569.136 367.548 576.714 358.2 576.714z"/><path fill="${color}" d="M620.995 576.714H459.82c-9.348 0-16.927-7.578-16.927-16.927V398.612c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C637.922 569.136 630.344 576.714 620.995 576.714z"/><path fill="${color}" d="M883.792 576.714H722.616c-9.348 0-16.927-7.578-16.927-16.927V398.612c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C900.718 569.136 893.14 576.714 883.792 576.714z"/><path fill="${color}" d="M1146.588 576.714H985.412c-9.348 0-16.927-7.578-16.927-16.927V398.612c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C1163.515 569.136 1155.936 576.714 1146.588 576.714z"/><path fill="${color}" d="M358.2 839.509h-161.176c-9.348 0-16.927-7.578-16.927-16.927V661.407c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C375.127 831.931 367.548 839.509 358.2 839.509z"/><path fill="${color}" d="M620.995 839.509H459.82c-9.348 0-16.927-7.578-16.927-16.927V661.407c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C637.922 831.931 630.344 839.509 620.995 839.509z"/><path fill="${color}" d="M883.792 839.509H722.616c-9.348 0-16.927-7.578-16.927-16.927V661.407c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C900.718 831.931 893.14 839.509 883.792 839.509z"/><path fill="${color}" d="M1146.588 839.509H985.412c-9.348 0-16.927-7.578-16.927-16.927V661.407c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C1163.515 831.931 1155.936 839.509 1146.588 839.509z"/><path fill="${color}" d="M358.2 1102.305h-161.176c-9.348 0-16.927-7.578-16.927-16.927V924.202c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C375.127 1094.726 367.548 1102.305 358.2 1102.305z"/><path fill="${color}" d="M620.995 1102.305H459.82c-9.348 0-16.927-7.578-16.927-16.927V924.202c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C637.922 1094.726 630.344 1102.305 620.995 1102.305z"/><path fill="${color}" d="M883.792 1102.305H722.616c-9.348 0-16.927-7.578-16.927-16.927V924.202c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C900.718 1094.726 893.14 1102.305 883.792 1102.305z"/><path fill="${color}" d="M1146.588 1102.305H985.412c-9.348 0-16.927-7.578-16.927-16.927V924.202c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C1163.515 1094.726 1155.936 1102.305 1146.588 1102.305z"/></svg>`;
    },
    calendarIcon2: function (color: string): string {
      return `<svg width="100%" height="100%" viewBox="0 0 717 750" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"><path fill="${color}" d="M451.439,113.013l-0,66.686c-0,13.826 11.225,25.051 25.051,25.051c13.826,0 25.052,-11.225 25.052,-25.051l-0,-86.258l0.04,0l0,-64.214c0,-16.131 13.096,-29.227 29.227,-29.227c16.13,-0 29.226,13.096 29.226,29.227l0,64.214l91.953,0c35.853,0 64.96,29.108 64.96,64.961l0,526.638c0,35.852 -29.107,64.96 -64.96,64.96l-587.028,-0c-35.852,-0 -64.96,-29.108 -64.96,-64.96l-0,-526.638c-0,-35.853 29.108,-64.961 64.96,-64.961l37.885,0l0,0.117c10.738,-0 19.456,8.717 19.456,19.455l0.098,0l-0,65.117c-0,13.827 11.225,25.052 25.051,25.052c13.826,-0 25.051,-11.225 25.051,-25.052l0,-84.689l0.164,0l-0,-64.214c-0,-16.131 13.096,-29.227 29.226,-29.227c16.131,-0 29.227,13.096 29.227,29.227l-0,64.214l200.772,0l0,0.117c10.738,-0 19.456,8.717 19.456,19.455l0.093,0Zm-392.986,180.82l0,383.512c0,7.838 6.364,14.202 14.203,14.202l571.637,-0c7.839,-0 14.202,-6.364 14.202,-14.202l0,-383.512c0,-7.839 -6.363,-14.203 -14.202,-14.203l-571.637,0c-7.839,0 -14.203,6.364 -14.203,14.203Zm322.942,110.065l-70.935,-0c-16.13,-0 -29.226,-13.096 -29.226,-29.227c-0,-16.13 13.096,-29.226 29.226,-29.226l102.216,-0l11.632,1.574l8.557,3.576l7.04,5.226l5.907,7.328l3.789,8.613l1.448,8.667l-1.076,11.522l-3.322,9.652l-92.996,204.518c-6.676,14.684 -24.018,21.185 -38.702,14.508c-14.684,-6.677 -21.185,-24.019 -14.508,-38.703l80.95,-178.028Z"/></svg>`;
    },
    githubIcon: function (color: string): string {
      return `<svg width="100%" height="100%" viewBox="0 0 3141 3284" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"><path fill="${color}" d="M1038.06,2944.55l-1.001,0c-0.366,-51.114 -0.634,-106.703 -0.634,-163.365c-536,98.667 -674.667,-130.666 -717.334,-250.666c-24,-61.334 -128,-250.667 -218.666,-301.334c-74.667,-40 -181.334,-138.666 -2.667,-141.333c168,-2.667 288,154.667 328,218.667c192,322.666 498.667,232 621.333,176c18.667,-138.667 74.667,-232 136,-285.334c-474.666,-53.333 -970.666,-237.333 -970.666,-1053.33c-0,-232 82.666,-424 218.666,-573.333c-21.333,-53.334 -96,-272 21.334,-565.334c-0,0 178.666,-56 586.666,218.667c170.667,-48 352,-72 533.334,-72c181.333,-0 362.666,24 533.333,72c408,-277.333 586.667,-218.667 586.667,-218.667c117.333,293.334 42.666,512 21.333,565.334c136,149.333 218.667,338.666 218.667,573.333c-0,818.667 -498.667,1000 -973.334,1053.33c77.334,66.667 144,194.667 144,394.667c0,133.208 -0.581,254.211 -1.201,352.698l-0.608,0l0,238.829c0,55.494 -45.054,100.548 -100.548,100.548l-862.125,0c-55.494,0 -100.549,-45.054 -100.549,-100.548l0,-238.829Z"/></svg>`;
    },
    interactionIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 164.7519 136.627" xml:space="preserve"><path fill="${color}" d="M133.7234,100.943c-0.036-0.942,0.417-1.842,1.193-2.377c15.607-10.751,26.021-25.595,26.021-42.495 c0-31.157-31.917-56.071-71.287-56.071s-71.287,24.914-71.287,56.071s31.916,55.727,71.287,55.727c3.2,0,6.35-0.169,9.439-0.493 c1.217-0.128,2.427,0.239,3.388,0.997c11.411,8.991,28.209,14.495,42.154,15.168c0.974,0.047,1.498-1.129,0.81-1.821 C141.7265,121.911,134.1754,112.89,133.7234,100.943z"/><path fill="${color}" d="M36.9615,98.552c-12.261-9.54-19.824-21.906-21.794-35.376c-7.085,6.644-11.353,15.225-11.353,24.641 c0,11.526,7.088,21.653,17.718,28.997c0.567,0.392,0.907,1.042,0.879,1.731c-0.34,8.333-5.726,14.574-8.186,17.004 c-0.408,0.403-0.109,1.101,0.464,1.077c9.433-0.395,20.845-4.059,28.709-10.09c0.906-0.695,2.032-1.031,3.169-0.921 c1.956,0.19,3.948,0.289,5.969,0.289c13.053,0,24.907-3.952,33.654-10.453C67.5725,114.795,50.2025,108.854,36.9615,98.552z"/></svg>`;
    },
    linkIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 77.326 72.7716" xml:space="preserve"><path fill="${color}" d="M32.4648,53.8433c0.7818-0.8269,1.9796-1.0714,3.0235-0.6186c3.0778,1.3352,6.0816,1.63,9.3559,1.1336 c-0.268,0.3706-0.3808,0.5807-0.5424,0.742c-4.1556,4.1481-8.2184,8.3957-12.4999,12.4098 c-5.936,5.5651-14.1185,6.7112-20.6902,3.1443C1.4752,65.4242-0.6793,52.4901,7.0136,43.8894 c5.1292-5.7345,10.6434-11.1642,16.3361-16.3449c6.9673-6.3407,17.4842-6.1651,23.6823-0.076 c1.3946,1.3701,1.9352,2.9763,1.4056,4.8363c-0.4905,1.7227-1.7106,3.0358-3.4683,3.1096c-1.3413,0.0563-2.9694-0.3345-4.0305-1.12 c-4.024-2.9787-8.3527-3.0391-11.9467,0.4467c-5.0482,4.8962-10.0118,9.8856-14.8637,14.9761 c-3.5474,3.7219-3.3953,8.9197,0.0819,11.9336c3.1163,2.701,7.6792,2.4502,11.1588-0.7631 c2.4248-2.2392,4.7108-4.6297,7.0323-6.9789C32.4229,53.8873,32.444,53.8654,32.4648,53.8433z"/><path fill="${color}" d="M44.5844,19.2995c-0.5888,0.6009-1.4959,0.7818-2.2594,0.4284c-3.1276-1.4477-6.2668-1.9142-9.5952-1.3541 c0-0.1569-0.0461-0.3084,0.0066-0.3611c4.4082-4.4118,8.6418-9.0192,13.2788-13.1767c8.5503-7.6661,21.3662-5.8016,26.732,3.6491 c3.6604,6.4469,2.809,14.8065-2.5958,20.592c-5.256,5.6261-10.7121,11.0956-16.4099,16.2709 c-6.7187,6.1025-16.7418,6.0137-23.1022,0.2401c-2.2629-2.0541-2.5948-4.7657-0.8335-6.8093 c1.7979-2.086,4.4361-2.1616,6.8376-0.1959c3.4519,2.8255,7.8897,2.9706,11.1925-0.1604 c5.3674-5.0883,10.5592-10.3712,15.6488-15.7391c2.2252-2.3468,2.9494-5.3508,1.7545-8.527 c-1.0328-2.7454-3.1023-4.3876-5.9872-4.7994c-2.999-0.428-5.5306,0.737-7.6309,2.8119 C49.2641,14.4974,46.9579,16.8771,44.5844,19.2995z"/></svg>`;
    },
    linkIcon2: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 566.9291 566.3705" xml:space="preserve"><path style="fill:${color};" d="M310.0074,199.8997l-25.7186,25.6573c-1.1178,1.1177-2.1418,2.3093-3.1116,3.5333 c-0.292,0.3661-0.5589,0.7519-0.8383,1.1304c-0.6707,0.9068-1.2981,1.8388-1.8876,2.7943 c-0.2488,0.4164-0.5101,0.8257-0.7444,1.2493c-0.6526,1.143-1.2422,2.322-1.7704,3.5262c-0.0937,0.2127-0.2054,0.4057-0.292,0.6165 c-0.6023,1.4278-1.1124,2.9007-1.5414,4.397c-0.0308,0.1046-0.0559,0.2165-0.0795,0.3281 c11.7074,3.3226,22.4321,9.5962,31.1829,18.3849c12.733,12.7311,20.1478,29.6682,20.8816,47.6979 c0,0.0505,0.0181,0.0939,0.0181,0.1442c0,0.0307,0,0.054,0,0.0793c0,0.0072,0,0.0126,0,0.0126 c0.8708,20.0109-6.7876,39.681-21.0168,53.8599l-33.4273,33.3893c-0.056,0.0559-0.1298,0.092-0.1857,0.1552l-95.2537,95.05 c-13.5641,13.5641-31.6189,21.042-50.8348,21.042c-19.2412,0-37.3393-7.5032-50.9594-21.1305 c-13.5767-13.6002-21.042-31.6929-21.0186-50.9466c0.0197-19.2538,7.5158-37.332,21.1051-50.9033l88.3166-88.1363 c-0.2415-0.7643-0.4091-1.5468-0.64-2.3165c-0.4596-1.5343-0.8635-3.0864-1.2782-4.6403c-0.7715-2.8738-1.4656-5.7762-2.075-8.7003 c-0.3408-1.6404-0.6707-3.2792-0.9573-4.9307c-0.5336-3.0629-0.9429-6.1491-1.2979-9.2554 c-0.1677-1.4531-0.3787-2.9006-0.5032-4.3645c-0.3911-4.554-0.6327-9.1366-0.6327-13.7571 c0.0055-3.4415,0.1425-6.8758,0.3732-10.2993c0.0738-1.1537,0.2163-2.2966,0.3155-3.4469c0.2056-2.2787,0.4164-4.5574,0.7157-6.8181 c0.0488-0.3659,0.0668-0.7391,0.1172-1.1067l-120.2023,119.95c-48.9545,48.8589-49.0339,128.4446-0.1677,177.4154 c23.6813,23.7499,55.212,36.8308,88.789,36.8308c33.4506,0,64.9073-13.0178,88.5833-36.656L342.8504,401.166 c8.8193-8.7831,16.2414-18.7759,22.0733-29.7062c14.0744-26.4396,18.1487-56.7174,11.9362-85.5528 c-1.4404-6.6523-3.4217-13.2362-5.9545-19.6703c-6.2864-15.9618-15.6573-30.2578-27.8568-42.4878 C333.2867,213.9543,322.2068,205.9607,310.0074,199.8997L310.0074,199.8997z"/><path style="fill:${color};" d="M187.5694,245.3822c-0.1983,2.8303-0.3173,5.6626-0.3226,8.5073 c0,16.0375,2.9367,31.6009,8.7254,46.2468c6.2665,15.9042,15.6571,30.202,27.9359,42.506 c9.7332,9.7873,20.8006,17.7809,32.9981,23.8364l25.724-25.6753c1.1321-1.125,2.1632-2.3292,3.1368-3.5658 c0.3047-0.384,0.5786-0.7878,0.8634-1.179c0.6455-0.8888,1.2675-1.801,1.839-2.733c0.2848-0.4778,0.5661-0.9573,0.8329-1.4404 c0.5138-0.9321,0.986-1.8821,1.4278-2.852c0.2182-0.4778,0.4471-0.9501,0.64-1.4332c0.5085-1.2367,0.9429-2.4969,1.3233-3.7769 c0.0559-0.193,0.1371-0.3787,0.1857-0.5715c-11.6569-3.3225-22.3707-9.5836-31.1413-18.3524 c-12.5708-12.5708-19.9478-29.1907-20.8798-46.9102v-0.0072c-0.0126-0.2038-0.0505-0.4092-0.0559-0.6129 c-0.0937-1.1249-0.1117-2.2805-0.1117-3.3929c0.0486-19.2772,7.5518-37.35,21.1285-50.9214L390.7053,74.4802 c13.62-13.5642,31.6803-21.0294,50.8655-21.0294c19.2411,0,37.3393,7.503,50.9593,21.1231 c28.0225,28.1217,27.9559,73.7825-0.1297,101.8122l-88.3545,88.1795c0.3227,1.0132,0.5769,2.0317,0.8762,3.0503 c0.4399,1.4712,0.8816,2.944,1.2727,4.4348c0.3481,1.2981,0.6454,2.6087,0.9556,3.9121c0.3678,1.5288,0.7264,3.0502,1.0437,4.5845 c0.2669,1.2907,0.4977,2.5959,0.732,3.894c0.2812,1.5521,0.5534,3.0989,0.7896,4.6512c0.1928,1.3051,0.3533,2.6158,0.5156,3.9246 c0.1927,1.554,0.3786,3.0991,0.5283,4.653c0.1243,1.3232,0.2163,2.6446,0.3045,3.968c0.1046,1.5414,0.2037,3.0809,0.2597,4.6204 c0.0559,1.3485,0.081,2.6898,0.0991,4.0383c0.0199,1.5143,0.0253,3.0359,0,4.5519c-0.0181,1.3666-0.0613,2.7259-0.1172,4.087 c-0.0612,1.4963-0.1425,2.9998-0.2488,4.4962c-0.0991,1.372-0.2162,2.7384-0.3479,4.1121c-0.1425,1.4838-0.3102,2.962-0.4904,4.433 c-0.0939,0.7211-0.1425,1.4422-0.2416,2.1562l120.179-119.9248c23.6813-23.6128,36.7352-55.0948,36.773-88.6519 c0.0361-33.5498-12.9494-65.0569-36.5622-88.7257C506.6783,13.0809,475.1459,0,441.5708,0 c-33.4633,0-64.9398,13.0178-88.614,36.6632L224.0759,165.225c-8.8373,8.8445-16.2971,18.8373-22.1472,29.6936 c0,0.0072-0.0055,0.0072-0.0055,0.0126C193.6683,210.3956,188.7809,227.688,187.5694,245.3822L187.5694,245.3822z"/></svg>`;
    },
    facebookIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 39.9954 71.8158" xml:space="preserve"><path fill="${color}" d="M35.642,35.8267l1.6974-10.9954H24.814V18.822c0-4.5661,1.4931-8.6206,5.7664-8.6206h6.8669V0.6042 c-1.2051-0.1609-3.7584-0.5197-8.5788-0.5197c-10.0686,0-15.9702,5.3159-15.9702,17.4294v7.3174H2.5481v10.9954h10.3502v35.8177 l11.9157,0.0869V35.8267H35.642z"/></svg>`;
    },
    twitterIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 95.7448 72.7716" xml:space="preserve"><path fill="${color}" d="M92.3282,8.9345c0.0413-0.0609-0.0226-0.1375-0.09-0.1081c-3.217,1.4019-6.6648,2.3476-10.2794,2.7797 c3.6844-2.2066,6.5313-5.6677,7.9374-9.7991c0.038-0.1115-0.0846-0.2111-0.1865-0.1519c-3.4564,2.0073-7.2726,3.4696-11.3289,4.2702 c-3.5244-3.7562-8.6285-6.0247-14.2419-5.7592c-8.1436,0.3851-15.2084,6.2443-16.9653,14.2053 c-0.6271,2.8413-0.5682,5.662,0.0281,8.2395c-15.207-0.7616-28.6886-8.0478-37.7175-19.1212 C7.9131,6.1929,7.011,9.3352,7.011,12.6936c0,6.3463,3.228,11.9481,8.137,15.2276c-2.9982-0.096-5.8215-0.9193-8.2879-2.2881 c0,0.0789,0,0.1509,0,0.2299c0,8.8676,6.3051,16.2636,14.6788,17.9411c-1.5334,0.4185-3.1526,0.6415-4.8232,0.6415 c-1.1766,0-2.3258-0.1166-3.4407-0.3259c2.3293,7.269,9.0872,12.5622,17.0938,12.7097c-6.2605,4.9089-14.1505,7.8351-22.7266,7.8351 c-1.475,0-2.933-0.0858-4.3669-0.2573c8.0992,5.1902,17.7147,8.2193,28.0505,8.2193c33.6593,0,52.0601-27.8824,52.0601-52.0635 c0-0.7924-0.0172-1.5814-0.0515-2.367C86.8439,15.6623,89.8979,12.5147,92.3282,8.9345z"/></svg>`;
    },
    talkIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 451.0676 385.724" xml:space="preserve"><path fill="${color}" d="M61.5539,378.9067c-2.0208,2.0784-0.4816,5.6116,2.3813,5.4706c40.9867-2.0228,90.3566-18.5609,123.8974-45.5795 c2.8252-2.275,6.3823-3.3783,9.9602-2.994c9.0774,0.9742,18.3355,1.4826,27.7415,1.4826 c115.7158,0,209.5221-73.8304,209.5221-167.4551S341.251,1.3427,225.5343,1.3427S16.0112,76.2068,16.0112,169.8315 c0,50.783,30.6094,95.3863,76.4798,127.6918c2.281,1.6068,3.6107,4.3138,3.5054,7.1429 C94.6668,340.5665,72.4753,367.6725,61.5539,378.9067z"/></svg>`;
    },
    closeIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.219 32.219"><path d="M18.967 16.109L31.627 3.45c0.789-0.789 0.789-2.069 0-2.858 -0.788-0.789-2.069-0.789-2.858 0L16.109 13.252 3.45 0.592c-0.788-0.789-2.069-0.789-2.858 0 -0.789 0.789-0.789 2.069 0 2.858l12.66 12.66L0.592 28.769c-0.789 0.789-0.789 2.068 0 2.858 0.394 0.395 0.912 0.592 1.429 0.592s1.035-0.197 1.429-0.592l12.66-12.66 12.66 12.66c0.394 0.395 0.912 0.592 1.429 0.592 0.517 0 1.035-0.197 1.429-0.592 0.789-0.789 0.789-2.068 0-2.858L18.967 16.109z" fill="${color}"/></svg>`;
    },
    checkCircle: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59.044 59.04"><path d="M29.524 0c-16.307 0-29.524 13.217-29.524 29.52 0 16.306 13.217 29.52 29.524 29.52 16.303 0 29.52-13.214 29.52-29.52C59.044 13.217 45.826 0 29.524 0zM44.092 23.517L25.984 41.569c-0.515 0.515-1.188 0.772-1.865 0.772 -0.659 0-1.315-0.243-1.827-0.733l-8.164-7.79c-1.058-1.005-1.097-2.68-0.088-3.738 1.005-1.054 2.684-1.093 3.738-0.085l6.298 6.009 16.282-16.232c1.033-1.033 2.712-1.026 3.742 0.007C45.129 20.812 45.129 22.487 44.092 23.517z" fill="${color}"/></svg>`;
    },
    hamburgerIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 65.032 41.503"><path d="M63.272 6.046H1.76C0.788 6.046 0 5.258 0 4.286V1.76C0 0.788 0.788 0 1.76 0h61.513c0.972 0 1.76 0.788 1.76 1.76v2.526C65.032 5.258 64.244 6.046 63.272 6.046zM65.032 22.015v-2.526c0-0.972-0.788-1.76-1.76-1.76H1.76C0.788 17.729 0 18.516 0 19.488v2.526c0 0.972 0.788 1.76 1.76 1.76h61.513C64.244 23.774 65.032 22.986 65.032 22.015zM65.032 39.743v-2.526c0-0.972-0.788-1.76-1.76-1.76H1.76C0.788 35.457 0 36.245 0 37.217v2.526c0 0.972 0.788 1.76 1.76 1.76h61.513C64.244 41.503 65.032 40.715 65.032 39.743z" fill="${color}"/></svg>`;
    },
    mailIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 198.6291 140.8618"><path fill="${color}" d="M0.0003,19.0035c0-2.5127,0.5001-4.9621,1.488-7.2941L64.368,71.4319L2.0719,130.424 c-1.3573-2.6498-2.0716-5.5953-2.0716-8.5654V19.0035z M18.8279,0.1759c-5.0004,0-9.6737,1.9311-13.2259,5.4519l70.6926,67.1433 c12.908,12.2596,33.1308,12.2596,46.0398,0l70.6926-67.1438c-3.5527-3.5203-8.2255-5.4514-13.2254-5.4514H18.8279z  M179.8015,140.6861c4.5018,0,8.8248-1.6133,12.2468-4.5558l-63.0468-59.7014l-1.6781,1.5926 c-7.5967,7.2155-17.5444,11.1887-28.0085,11.1887c-10.4655,0-20.4123-3.9732-28.0085-11.1887l-1.6776-1.5926L6.5815,136.1303 c3.4215,2.9426,7.745,4.5558,12.2463,4.5558H179.8015z M198.6291,19.0035c0-2.5132-0.5001-4.9626-1.4885-7.2941l-62.8798,59.723 l62.2971,58.9915c1.3568-2.6498,2.0711-5.5943,2.0711-8.5654V19.0035z"/></svg>`;
    },
    downArrow: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 295.5974 275.3"><path fill="${color}" d="M289.6034,121.5312h-45.1321V5.982c0-3.3038-2.6782-5.982-5.982-5.982H57.1081c-3.3038,0-5.982,2.6782-5.982,5.982v115.5493 H5.994c-5.3294,0-7.9984,6.4434-4.2299,10.2119l141.8047,141.8047c2.3361,2.3361,6.1237,2.3361,8.4598,0l141.8047-141.8047 C297.6017,127.9747,294.9328,121.5312,289.6034,121.5312z"/></svg>`;
    },
    houseLine: function (color: string, shortVersion: boolean = false) {
      if (!shortVersion) {
        return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 566.9291 149.2332" xml:space="preserve"><path fill="${color}" d="M566.9291,149.2332H466.1548v-45.9778c0-4.8913-2.6993-9.3296-7.0432-11.5818L289.676,3.8755 c-3.7587-1.9478-8.2442-1.9454-12.0029,0L108.2364,91.6737c-4.3439,2.2522-7.042,6.6893-7.042,11.5818v45.9778H0v-2.4162h98.7782 v-43.5617c0-5.7985,3.1983-11.0579,8.3468-13.7266L276.5618,1.7307c4.4512-2.3064,9.7696-2.3088,14.2256,0l169.4355,87.7981 c5.1497,2.6686,8.348,7.9292,8.348,13.7266v43.5617h98.3582V149.2332z"/></svg>`;
      } else {
        return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 365.3806 149.2332" xml:space="preserve"><path fill="${color}" d="M356.3929,87.9033L190.3481,1.8623c-4.7961-2.4824-10.5202-2.4838-15.3154,0.0005L8.9861,87.9033 C3.4431,90.7769,0,96.4403,0,102.6819v46.5523h5.356v-46.5513c0-4.2343,2.3354-8.0754,6.0942-10.0239L177.4954,6.6174 c3.2562-1.6835,7.1392-1.684,10.3887-0.0005l166.0438,86.041c3.7602,1.9504,6.0961,5.7916,6.0961,10.024v46.5523h5.357v-46.5523 C365.3809,96.4413,361.9368,90.7779,356.3929,87.9033z"/></svg>`;
      }
    },
    cloudIcon: function (color: string): string {
      return `<svg width="100%" height="100%" viewBox="0 0 1428 777" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M168.14,317.834c58.909,-22.82 82.875,-40.95 109.332,-104.48c26.457,-63.53 83.84,-188.334 259.035,-210.248c142.387,-17.81 220.168,45.064 283.818,84.559c67.272,41.742 107.129,33.276 191.924,47.366c84.795,14.089 119.883,75.424 142.231,109.594c22.347,34.169 21.682,67.287 114.077,100.477c92.396,33.191 162.294,105.55 158.756,206.092c-3.539,100.541 -35.407,220.987 -273.649,223.281c-238.242,2.293 -689.288,1.12 -863.202,1.863c-173.914,0.743 -221.439,-70.027 -260.912,-121.347c-39.473,-51.321 -39.494,-159.481 0.503,-229.56c39.997,-70.078 79.178,-84.777 138.087,-107.597Z" style="fill:${color}"/></svg>`;
    },
    boxTag: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 435.7833 566.9291" xml:space="preserve"><path fill="${color}" d="M24.0582,338.9482c32.9704,34.0915,66.5096,67.6332,99.7931,101.4218c31.7184,32.2031,63.8426,64.0182,95.0303,96.7278 c19.2624,20.204,41.8937,29.8313,69.7035,29.8313c28.5998,0,147.1982,0,147.1982,0V0c0,0-116.2152,0.0047-144.8111,0.0047 c-26.3687,0-48.0859,8.3752-66.8201,26.9874C158.9034,91.8119,93.2196,156.194,27.7725,220.8154 c-4.7373,4.6775-9.5116,9.5205-13.2284,14.9945C-7.795,268.7141-4.2283,309.701,24.0582,338.9482z M173.3789,245.0669 c20.4966-19.84,52.9568-19.5232,73.1086,0.7113c20.503,20.5895,20.4126,53.1184-0.2061,73.5196 c-20.4979,20.2841-53.6134,20.12-73.6926-0.3652C152.5845,298.5225,152.9446,264.8458,173.3789,245.0669z"/></svg>`;
    },
    gitlabIcon: function (color: string): string {
      return `<svg width="100%" height="100%" viewBox="0 0 1180 1141" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"><path fill="${color}" d="M554.674,1126.63l-432.615,-328.566c-74.092,-55.66 -122.059,-144.31 -122.059,-244.086c0,-42.763 8.812,-83.484 24.715,-120.439l157.201,-406.652c5.804,-15.692 20.897,-26.889 38.581,-26.889c17.635,-0 32.692,11.133 38.533,26.755c0.4,1.071 0.757,2.164 1.069,3.275l108.828,333.284l441.7,0l108.828,-333.284c0.311,-1.111 0.668,-2.204 1.069,-3.275c5.84,-15.622 20.898,-26.755 38.532,-26.755c17.684,-0 32.777,11.197 38.582,26.889l157.201,406.652c15.903,36.955 24.714,77.676 24.714,120.439c0,99.776 -47.967,188.426 -122.058,244.086l-432.616,328.566c-9.285,8.324 -21.546,13.389 -34.98,13.389c-0.082,0 -0.163,0 -0.244,0c-13.434,0 -25.696,-5.065 -34.981,-13.389Z"/></svg>`;
    },
    designIcon: function (color: string): string {
      return `<svg width="100%" height="100%" viewBox="0 0 1274 1229" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" ><path fill="${color}" d="M0,663.411c0,-166.324 55.416,-318.74 154.282,-435.72c118.257,-139.923 296.132,-227.691 481.057,-227.691c233.813,-0 426.486,123.234 536.671,300.555c66.725,107.38 101.609,235.689 101.609,362.856c-0,337.164 -296.15,564.843 -414.896,564.843c-118.745,0 -189.61,-91.777 -223.384,-128.011c-33.774,-36.233 -183.127,-183.518 -223.532,-223.567c-48.14,-47.714 -90.143,-17.254 -102.048,8.012c-11.904,25.266 -3.202,56.621 35.031,90.636c52.262,46.494 50.76,101.826 0,144.789c-50.759,42.962 -167.231,10.179 -245.466,-125.694c-78.234,-135.873 -99.324,-219.258 -99.324,-331.008Zm539.005,-471.893c-59.744,0 -108.248,48.512 -108.248,108.265c-0,59.753 48.504,108.265 108.248,108.265c59.743,-0 108.247,-48.512 108.247,-108.265c0,-59.753 -48.504,-108.265 -108.247,-108.265Zm469.584,352.404c-44.127,0 -79.953,35.831 -79.953,79.965c0,44.134 35.826,79.965 79.953,79.965c44.127,0 79.953,-35.831 79.953,-79.965c-0,-44.134 -35.826,-79.965 -79.953,-79.965Zm-146.805,207.172c-72.842,0 -131.981,59.148 -131.981,132.001c0,72.853 59.139,132.001 131.981,132.001c72.842,0 131.98,-59.148 131.98,-132.001c-0,-72.853 -59.138,-132.001 -131.98,-132.001Zm-0,-504.474c-59.744,0 -108.248,48.512 -108.248,108.265c-0,59.753 48.504,108.264 108.248,108.264c59.743,0 108.247,-48.511 108.247,-108.264c0,-59.753 -48.504,-108.265 -108.247,-108.265Z"/></svg>`;
    },
    gridViewIcon: function (color: string): string {
      return `<svg width="100%" height="100%" viewBox="0 0 1049 1046" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"><path fill="${color}" d="M488.48,129.783l-0,228.6c-0,71.629 -58.192,129.783 -129.867,129.783l-228.746,-0c-71.676,-0 -129.867,-58.154 -129.867,-129.783l-0,-228.6c-0,-71.629 58.191,-129.783 129.867,-129.783l228.746,-0c71.675,-0 129.867,58.154 129.867,129.783Zm-0,557.758l-0,228.599c-0,71.63 -58.192,129.784 -129.867,129.784l-228.746,-0c-71.676,-0 -129.867,-58.154 -129.867,-129.784l-0,-228.599c-0,-71.629 58.191,-129.783 129.867,-129.783l228.746,-0c71.675,-0 129.867,58.154 129.867,129.783Zm560.402,-557.758l0,228.6c0,71.629 -58.191,129.783 -129.866,129.783l-228.746,-0c-71.676,-0 -129.867,-58.154 -129.867,-129.783l-0,-228.6c-0,-71.629 58.191,-129.783 129.867,-129.783l228.746,-0c71.675,-0 129.866,58.154 129.866,129.783Zm0,557.758l0,228.599c0,71.63 -58.191,129.784 -129.866,129.784l-228.746,-0c-71.676,-0 -129.867,-58.154 -129.867,-129.784l-0,-228.599c-0,-71.629 58.191,-129.783 129.867,-129.783l228.746,-0c71.675,-0 129.866,58.154 129.866,129.783Z"/></svg>`;
    },
    listViewIcon: function (color: string): string {
      return `<svg width="100%" height="100%" viewBox="0 0 4371 4359" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"><path fill="${color}" d="M4370.83,3798.15l0,248.24c0,172.168 -139.778,311.946 -311.946,311.946l-3746.95,0c-172.168,0 -311.946,-139.778 -311.946,-311.946l-0,-248.24c-0,-172.168 139.778,-311.947 311.946,-311.947l3746.95,0c172.168,0 311.946,139.779 311.946,311.947Zm0,-2324.89l0,248.24c0,172.168 -139.778,311.946 -311.946,311.946l-3746.95,0c-172.168,0 -311.946,-139.778 -311.946,-311.946l-0,-248.24c-0,-172.168 139.778,-311.947 311.946,-311.947l3746.95,0c172.168,0 311.946,139.779 311.946,311.947Zm0,1164.4l0,248.24c0,172.168 -139.778,311.947 -311.946,311.947l-3746.95,-0c-172.168,-0 -311.946,-139.779 -311.946,-311.947l-0,-248.24c-0,-172.168 139.778,-311.946 311.946,-311.946l3746.95,-0c172.168,-0 311.946,139.778 311.946,311.946Zm0,-2324.89l0,248.24c0,172.168 -139.778,311.947 -311.946,311.947l-3746.95,-0c-172.168,-0 -311.946,-139.779 -311.946,-311.947l-0,-248.24c-0,-172.168 139.778,-311.946 311.946,-311.946l3746.95,-0c172.168,-0 311.946,139.778 311.946,311.946Z"/></svg>`;
    },
    checkBox: function (color: string, back: any = null): string {
      const uncheckColorList: Array<string> = [
        AbstractNode.colorExtended.gray3,
        AbstractNode.colorExtended.gray4,
        AbstractNode.colorExtended.gray2,
        AbstractNode.colorExtended.deactive,
        AbstractNode.colorExtended.gradientGray,
      ];
      const checkColorList: Array<string> = [
        AbstractNode.colorExtended.blue,
        AbstractNode.colorExtended.black,
        AbstractNode.colorExtended.red,
        AbstractNode.colorExtended.gradientBlue,
      ];
      let uncheck: boolean;
      let uncheckColor: string, checkColor: string;
      let whiteBack: string;
  
      if (back === null) {
        whiteBack = AbstractNode.colorExtended.white;
      } else {
        whiteBack = back;
      }
  
      if (uncheckColorList.includes(color)) {
        uncheck = true;
        uncheckColor = color;
        checkColor = checkColorList[0];
      } else {
        if (checkColorList.includes(color)) {
          uncheck = false;
          uncheckColor = uncheckColorList[0];
          checkColor = color;
        } else {
          uncheck = false;
          uncheckColor = uncheckColorList[0];
          checkColor = checkColorList[0];
        }
      }
  
      if (uncheck) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160.654 160.654">
        <g style="opacity:1;" class="uncheckbox">
          <path d="M145.66 0H14.993C6.713 0 0 6.713 0 14.993v130.667c0 8.281 6.713 14.993 14.993 14.993h130.667c8.281 0 14.993-6.713 14.993-14.993V14.993C160.654 6.713 153.941 0 145.66 0z" fill="${uncheckColor}"/>
        </g>
        <g style="opacity:0;" class="checkbox">
          <path d="M145.66 0H14.993C6.713 0 0 6.713 0 14.993v130.667c0 8.281 6.713 14.993 14.993 14.993h130.667c8.281 0 14.993-6.713 14.993-14.993V14.993C160.654 6.713 153.941 0 145.66 0z" fill="${whiteBack}"/>
          <path d="M145.66 0H14.993C6.713 0 0 6.713 0 14.993v130.667c0 8.281 6.713 14.993 14.993 14.993h130.667c8.281 0 14.993-6.713 14.993-14.993V14.993C160.654 6.713 153.941 0 145.66 0zM139.273 48.929l-71.955 77.279c-1.129 1.214-2.728 1.91-4.385 1.91 0 0-0.001 0-0.001 0 -1.658 0-3.257-0.696-4.387-1.909L19.522 84.299c-2.252-2.418-2.116-6.219 0.303-8.471l6.544-6.09c1.171-1.091 2.707-1.672 4.298-1.602 1.6 0.057 3.083 0.735 4.174 1.907l28.047 30.142 61.081-65.511 0 0 0 0c1.09-1.172 2.572-1.849 4.173-1.906 1.616-0.05 3.128 0.513 4.3 1.605l6.531 6.087c1.169 1.087 1.847 2.569 1.905 4.17C140.935 46.231 140.365 47.757 139.273 48.929z" fill="${checkColor}"/>
        </g>
        </svg>`;
      } else {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160.654 160.654">
        <g style="opacity:1;" class="uncheckbox">
          <path d="M145.66 0H14.993C6.713 0 0 6.713 0 14.993v130.667c0 8.281 6.713 14.993 14.993 14.993h130.667c8.281 0 14.993-6.713 14.993-14.993V14.993C160.654 6.713 153.941 0 145.66 0z" fill="${uncheckColor}"/>
        </g>
        <g style="opacity:1;" class="checkbox">
          <path d="M145.66 0H14.993C6.713 0 0 6.713 0 14.993v130.667c0 8.281 6.713 14.993 14.993 14.993h130.667c8.281 0 14.993-6.713 14.993-14.993V14.993C160.654 6.713 153.941 0 145.66 0z" fill="${whiteBack}"/>
          <path d="M145.66 0H14.993C6.713 0 0 6.713 0 14.993v130.667c0 8.281 6.713 14.993 14.993 14.993h130.667c8.281 0 14.993-6.713 14.993-14.993V14.993C160.654 6.713 153.941 0 145.66 0zM139.273 48.929l-71.955 77.279c-1.129 1.214-2.728 1.91-4.385 1.91 0 0-0.001 0-0.001 0 -1.658 0-3.257-0.696-4.387-1.909L19.522 84.299c-2.252-2.418-2.116-6.219 0.303-8.471l6.544-6.09c1.171-1.091 2.707-1.672 4.298-1.602 1.6 0.057 3.083 0.735 4.174 1.907l28.047 30.142 61.081-65.511 0 0 0 0c1.09-1.172 2.572-1.849 4.173-1.906 1.616-0.05 3.128 0.513 4.3 1.605l6.531 6.087c1.169 1.087 1.847 2.569 1.905 4.17C140.935 46.231 140.365 47.757 139.273 48.929z" fill="${checkColor}"/>
        </g>
        </svg>`;
      }
    },
    furnitureIllust: function (index: number, color: string): string {
      const furnitures = [
        `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 595.2756 535.4619" xml:space="preserve"><path fill="${color}" d="M332.7396,139.7497c3.0963,0.8314,6.2588,1.5842,9.4388,1.9091c24.7999,2.5337,49.5469,5.4344,74.1574,9.4683 c14.6825,2.4066,29.3069,5.0244,43.8049,8.4171c18.1242,4.2412,33.8917,12.5978,46.6291,26.1853 c15.8197,16.8755,28.2367,35.9865,36.5473,57.6608c0.5755,1.5009,1.175,2.9934,1.8015,4.4736 c2.8145,6.6496,5.7427,13.2529,8.4455,19.9474c5.6371,13.9627,11.1573,27.9727,16.7284,41.9622 c0.1486,0.3731,0.3301,0.7331,0.4937,1.1003c4.001,8.9805,8.0886,17.9237,11.9805,26.9512 c5.0205,11.6456,7.8802,24.03,12.0489,35.9701c0.3237,0.9276,0.3961,1.9678,0.4418,2.9623 c0.0834,1.8186-0.0897,3.5645-1.1396,5.1959c-1.6218,2.5198-3.2045,5.0799-4.587,7.7356 c-2.7748,5.3299-7.024,8.7241-12.8415,10.0839c-1.3246,0.3096-2.8798,0.5105-4.1279,0.1199 c-5.851-1.8312-11.2617-4.4129-14.2674-10.2413c-3.498-6.7829-7.1647-13.4889-10.3862-20.4016 c-3.3046-7.0912-6.2961-14.3381-9.1651-21.6192c-2.0001-5.0759-4.743-9.7386-7.2832-14.5201 c-1.5068-2.8363-3.0419-5.662-4.6916-8.4161c-1.2065-2.0142-2.332-2.386-4.5632-1.7107c-1.1473,0.3473-2.2468,0.8659-3.3463,1.3558 c-4.4017,1.961-8.7791,3.9773-13.1947,5.9064c-9.0163,3.9393-18.055,7.8271-27.0762,11.7549 c-2.3905,1.0408-4.7531,2.1462-7.1252,3.229c-6.3953,2.919-12.6712,6.1419-19.2058,8.7052 c-17.3988,6.8248-34.9088,13.3663-52.3747,20.02c-0.3758,0.1432-0.7571,0.2727-1.1296,0.4236 c-11.3533,4.6005-22.5996,9.4788-34.3336,13.0877c-0.8744,0.2689-1.5922,1.0468-2.3519,1.5668 c0.4031,3.0189,2.3575,4.9301,3.6719,7.1305c6.5076,10.894,12.2817,22.0721,15.9669,34.3204 c2.0776,6.9052,4.5812,13.8065,7.9029,20.1835c4.7129,9.0481,7.1737,18.7311,9.5209,28.4623 c1.4867,6.1637,0.085,11.8853-4.6304,16.6476c-4.0788,4.1195-10.3311,4.2913-14.4164,8.3972 c-1.0247,1.0299-2.9134,1.3537-4.4719,1.6479c-1.1068,0.2089-2.684,0.2546-3.435-0.3688 c-3.9778-3.3018-8.5917-6.1242-10.2136-11.5145c-1.2365-4.1098-3.6215-7.5901-5.9147-11.1319 c-1.7464-2.6972-3.5266-5.3788-5.1351-8.158c-9.255-15.9908-18.4114-32.0388-27.7092-48.0047 c-4.7524-8.1609-9.7642-16.1704-14.5807-24.2946c-1.1962-2.0178-2.6429-3.3628-5.03-3.8735 c-7.8585-1.6812-15.6287-3.836-23.5369-5.2115c-17.2276-2.9967-34.5118-5.6734-51.7888-8.3798 c-6.7505-1.0575-13.523-2.0545-20.3212-2.7094c-13.8046-1.3298-27.6323-2.4211-41.4543-3.5644 c-1.1222-0.0928-2.2738,0.1689-3.8243,0.3011c0.1736,1.9041,0.1839,3.4793,0.4786,4.9994c1.3375,6.9008,2.791,13.779,4.1344,20.6786 c1.4969,7.6883,2.6494,15.4543,4.4324,23.074c3.5262,15.0689,6.7789,30.1687,8.4887,45.5749 c1.1738,10.577,2.7789,21.1107,3.7381,31.7049c0.4485,4.9545,0.3226,10.0828-0.4345,14.995 c-1.0212,6.6255-4.8939,11.3329-11.6487,13.2225c-2.5125,0.7029-4.9777,1.5952-7.5163,2.1733 c-1.0943,0.2492-2.365,0.0999-3.4782-0.1781c-4.1081-1.0256-6.6936-4.1609-9.6063-6.9285c-2.0396-1.9378-3.0667-4.0028-3.3021-6.79 c-0.388-4.5971-0.8856-9.2089-1.7414-13.7381c-2.7593-14.6032-5.5177-29.2117-8.6612-43.7349 c-1.3914-6.4281-2.0732-13.1391-5.6674-18.9703c-0.7045-1.143-0.8176-2.6692-1.1231-4.0367 c-2.5396-11.3676-5.021-22.7484-7.6169-34.1031c-0.5794-2.5345-1.3018-5.0908-2.378-7.4453 c-1.936-4.236-3.1037-8.6691-4.1688-13.1636c-0.3153-1.3305-0.7574-2.7494-1.5543-3.8209 c-1.3629-1.8325-2.0775-3.8367-2.6708-5.9933c-1.6491-5.994-3.3977-11.9614-5.1793-17.9177 c-1.036-3.4638-2.3076-6.8583-3.3046-10.3324c-2.3797-8.2926-4.3621-16.7114-7.0462-24.9019 c-4.5019-13.7373-9.4254-27.3364-14.2038-41.0869c-1.8762-1.5958-4.2867-1.8938-6.6673-2.2359 c-7.3698-1.0592-14.6543-2.4855-21.8018-4.6173c-7.3885-2.2037-13.6225-6.0925-17.7889-12.6438 c-2.6847-4.2211-5.0061-8.7087-7.1109-13.2526c-2.0106-4.3406-0.3493-8.4311,3.9417-10.6089 c3.0905-1.5685,6.3745-2.4476,9.8995-2.0925c4.3994,0.4434,8.798,0.9004,13.2029,1.2822c1.1252,0.0975,2.2733-0.0669,3.8188-0.1268 c-0.3487-1.3896-0.4022-2.4101-0.8416-3.2216c-2.677-4.9433-5.2598-9.9519-8.2204-14.724 c-4.249-6.8488-7.6193-14.1298-11.2034-21.3162c-2.9537-5.9224-5.6922-11.9569-9.4603-17.4654 c-2.6018-3.8033-5.1837-7.7225-7.029-11.9177c-2.9892-6.7958-5.4508-13.8302-7.9759-20.8214 c-2.1149-5.8556-4.1335-11.7355-7.1657-17.2086c-0.6771-1.2222-1.281-2.5322-1.6378-3.8762 c-1.492-5.6215-3.003-11.243-4.2735-16.9169c-2.1212-9.4723-2.268-19.1463-2.3227-28.7847 c-0.0214-3.7775,0.5568-7.6477,1.4824-11.3194c1.2248-4.8589,2.7052-9.9059,7.1082-12.9254 c3.2748-2.2457,6.8605-4.3706,10.6227-5.5039c7.6787-2.3131,15.5416-4.0487,23.3806-5.7876 c9.6052-2.1307,19.2761-3.9642,28.8956-6.0324c8.8333-1.8992,17.5876-4.0717,26.2787-6.6093 c10.5876-3.0914,21.385-5.4788,32.1254-8.0282c10.7498-2.5516,21.5122-5.065,32.3223-7.3428 c11.6009-2.4444,23.1414-5.1349,34.5303-8.3994c11.7834-3.3775,23.6108-6.4754,35.5965-9.0994 c9.064-1.9844,16.5571,1.2762,23.9214,5.3362c3.0941,1.7058,5.6759,4.4767,8.2056,7.0441 c8.6732,8.8021,15.6011,18.8866,21.0367,29.9547c2.2968,4.6764,4.2676,9.5361,6.0539,14.4338 c1.9245,5.2767,3.4661,10.6935,5.1602,16.0538c0.4837,1.5305,0.9898,3.0596,1.3598,4.6191 c1.2969,5.4655,2.5218,10.9481,3.8078,16.4163c0.8265,3.5142,1.5122,7.0788,2.614,10.5073 c2.277,7.0862,4.2509,14.2319,5.5627,21.5656c0.4916,2.7482,1.0852,5.5207,2.6663,7.5326 C319.6233,136.0326,326.157,137.9823,332.7396,139.7497z M195.7266,334.8376c0.115,0.074,0.2235,0.1926,0.3468,0.2109 c0.1661,0.0247,0.3436-0.0277,0.5163-0.0469c0.8949,0.1009,1.789,0.2023,2.683,0.3037c0.8951,0.1,1.7893,0.2008,2.6834,0.3017 c0.8902,0.1047,1.7794,0.2102,2.6686,0.3158c0.89,0.1076,1.7793,0.2159,2.6687,0.3241c1.7258,0.4581,3.4254,1.1022,5.1806,1.3455 c10.7149,1.4858,21.4287,2.9958,32.1698,4.2724c10.3391,1.2287,20.7098,2.1933,31.0695,3.2462 c0.9248,0.0939,1.8704-0.0164,2.8369-0.0323c-0.1296-1.9984-1.4934-2.1251-2.5713-2.29c-4.1591-0.6366-8.3275-1.2484-12.5123-1.6755 c-16.7445-1.7092-33.4939-3.372-50.2489-4.9738c-1.9599-0.1874-3.9664,0.1104-5.9512,0.1832 c-0.8921-0.1018-1.7841-0.2037-2.6762-0.3055c-0.8878-0.1109-1.7757-0.2218-2.6636-0.3327 c-0.8936-0.1035-1.7872-0.2071-2.6807-0.3105c-0.895-0.0994-1.79-0.1989-2.685-0.2982 C196.2829,334.9962,196.0048,334.9169,195.7266,334.8376z M161.6603,369.5204c0.8876,0.1084,1.774,0.2182,2.6603,0.328 c0.8978,0.0987,1.795,0.1983,2.6921,0.2978c4.753,0.6582,9.4878,1.5069,14.2602,1.9421 c17.4027,1.5873,34.7876,3.2138,51.9924,6.4546c13.8143,2.6022,27.73,4.6694,41.5383,7.3013 c8.8506,1.687,17.5878,3.9686,26.5735,6.029c0.7658-0.4977,0.1757-1.2978-0.1406-1.9502c-1.0476-2.1613-2.0965-4.3326-3.341-6.381 c-0.3443-0.5668-1.3384-0.8608-2.0909-1.0312c-1.3666-0.3094-2.7722-0.4594-4.1673-0.6291 c-19.1403-2.3272-38.2483-4.9838-57.4316-6.8764c-20.9787-2.0698-42.0263-3.4438-63.0477-5.0731 c-1.3766-0.1067-2.7849,0.1945-4.1785,0.306c-0.8972-0.0999-1.7945-0.1997-2.6917-0.2996 c-0.8849-0.1172-1.7697-0.2343-2.6546-0.3515C161.4248,369.4766,161.6811,369.5547,161.6603,369.5204z M253.6469,256.0851 c16.1509-4.2582,31.7336-10.2146,47.4446-15.8059c11.3701-4.0465,22.3753-8.9539,33.5587-13.4392 c6.7075-2.6901,13.6011-4.9174,20.4182-7.3324c3.2194-1.1405,6.4662-2.2045,9.6759-3.3706 c0.6792-0.2468,1.2514-0.7882,1.7902-1.1399c-0.1317-0.4921-0.1242-0.7865-0.2389-0.846 c-6.1525-3.1951-11.1552-7.7262-15.6377-12.9707c-2.0753-2.4281-4.5721-4.5206-7.0146-6.6049 c-4.1562-3.5468-7.7419-7.5493-10.8488-12.0553c-2.6035-3.7758-5.3023-7.4488-9.1615-10.2492 c-1.9943-1.4472-3.2168-4.0428-4.5861-6.2451c-2.0086-3.2307-3.7102-6.6558-5.7809-9.8433 c-1.6614-2.5574-2.935-5.0427-3.2907-8.2249c-0.3735-3.3413-1.8229-6.5546-2.7184-9.8467 c-1.58-5.8092-3.0791-11.6404-4.6471-17.4529c-0.7832-2.9035-1.6476-5.7851-2.4684-8.6785 c-1.3682-4.8241-2.8091-9.6293-4.0764-14.4798c-1.6741-6.4068-3.1335-12.8702-4.8391-19.2682 c-0.8261-3.0985-1.8997-6.143-3.0421-9.143c-2.8562-7.5002-5.2186-15.1731-8.9116-22.373 c-4.9012-9.5554-10.9582-18.2319-18.1716-26.1404c-3.2418-3.5542-6.4-7.1538-10.2595-10.1326 c-4.7654-3.6778-9.7476-5.1848-15.7381-3.7245c-8.9743,2.1877-17.9226,4.3745-26.798,7.0114 c-18.2594,5.4248-36.5602,10.7776-55.2984,14.4448c-5.6999,1.1155-11.2578,2.9443-16.901,4.3661 c-10.7051,2.6971-21.4321,5.3079-32.1351,8.0132c-4.474,1.1308-8.8767,2.5561-13.3703,3.5943 c-10.17,2.3498-20.3846,4.5055-30.5657,6.8082c-12.1433,2.7466-24.2728,5.5546-36.4011,8.3666 c-1.1691,0.2711-2.2956,0.7376-3.4292,1.1481C12.6627,63.2017,8.065,69.1555,7.9907,77.2655 c-0.0681,7.4178,0.2732,14.8597,1.8074,22.1713c1.7726,8.4483,3.5482,16.8962,5.3829,25.3311 c0.3827,1.7594,0.9634,3.4848,1.568,5.185c1.7507,4.9237,3.6708,9.7897,5.3209,14.7461c2.6129,7.8485,6.0492,15.3064,10.1484,22.475 c0.3982,0.6963,0.8203,1.3965,1.0906,2.1457c2.4178,6.7005,6.2672,12.5214,10.712,18.0367 c6.6107,8.2032,11.1255,17.6067,15.1878,27.2522c3.1946,7.5857,6.4636,15.14,9.6733,22.7194 c0.6892,1.6275,1.8301,2.5836,3.5811,2.8297c1.3933,0.1958,2.7809,0.4335,4.1753,0.6209 c6.1734,0.8295,12.3521,1.6204,18.5217,2.4777c5.5985,0.7778,11.2129,0.6726,16.8342,0.4373 c11.6465-0.4874,23.2932-0.885,34.9359,0.0728c2.8024,0.2305,5.603,0.4885,8.4001,0.7749 c13.9897,1.4323,27.981,2.8491,41.9658,4.3282c12.0255,1.2719,23.823,3.7014,35.4077,7.1688 c4.041,1.2095,8.092,2.3852,12.8284,3.7794C247.7899,257.414,250.7462,256.8499,253.6469,256.0851z M269.1768,271.2634 c6.6449,4.1978,12.7794,9.0255,18.1714,14.8029c5.2075,5.5799,10.5815,11.0065,15.9471,16.4366 c8.5328,8.6353,15.0223,18.8137,21.8579,28.7335c1.7094,2.4807,3.3485,5.0119,5.1212,7.4462 c1.9041,2.6146,2.7572,2.7712,5.5218,1.5104c2.1894-0.9985,4.3787-2.0103,6.6231-2.8729 c9.1915-3.5323,18.4875-6.8077,27.5869-10.5611c10.1956-4.2054,20.2094-8.8502,30.3231-13.2561 c7.3644-3.2082,14.7456-6.3795,22.1506-9.4929c7.4005-3.1116,14.8419-6.1259,22.2616-9.1919 c11.5004-4.752,23.0778-9.33,34.4626-14.3446c5.697-2.5093,11.3384-5.1023,17.2091-7.1964 c5.263-1.8773,10.7768-3.0738,15.7027-5.9066c1.1481-0.6602,2.7003-0.6142,4.0643-0.904c1.1673-0.248,2.3693-0.4032,3.4875-0.7948 c1.5074-0.5279,2.0687-1.9616,1.4094-3.4245c-0.9046-2.0074-2.2761-3.8922-2.749-5.9872 c-0.8517-3.7728-2.7475-7.0899-3.9956-10.6732c-1.3565-3.8944-3.8493-6.113-7.9543-7.3603 c-11.9345-3.6263-24.004-6.6864-36.1558-9.4371c-16.4612-3.7263-32.9586-7.3384-49.7471-9.2625 c-11.3971-1.3062-22.8644-1.4996-34.3068-0.5476c-6.2449,0.5195-12.1289,2.6978-18.0175,4.7187 c-2.4658,0.8462-4.8909,1.8108-7.3582,2.6521c-11.4064,3.8894-22.8427,7.6932-33.8424,12.6728 c-1.8274,0.8273-3.7393,1.4725-5.6272,2.1609c-12.6527,4.6137-25.3198,9.1877-37.9608,13.8332 c-7.5493,2.7743-15.1577,5.3289-23.0288,7.0498c-1.1203,0.2449-2.1793,0.7707-4.1789,1.4985 C261.2621,266.5725,265.2892,268.8075,269.1768,271.2634z M293.8044,370.9929c-2.2664-4.4706-4.7064-8.8529-7.0432-13.2883 c-1.1208-2.1273-2.9167-3.2677-5.1922-3.7297c-5.1169-1.039-10.202-2.3487-15.3694-3.0005 c-9.9638-1.2567-19.9793-2.1004-29.9663-3.1804c-6.9892-0.7558-13.9753-1.5536-20.9475-2.4508 c-9.5641-1.2307-19.1199-2.5308-28.6683-3.8783c-13.5355-1.9102-27.1193-3.2725-40.7758-3.9291 c-2.4034-0.1156-4.7923-0.5247-7.1887-0.7908c-3.0119-0.3344-4.8451-2.1099-5.2426-4.9817 c-1.2017-8.6822-5.2856-16.4154-7.8673-24.6387c-2.2327-7.1114-5.5037-13.7825-8.5416-20.5558 c-0.794-1.7702-1.8616-3.1399-3.923-3.2709c-6.37-0.4047-12.732-1.2117-19.5406-0.7158c0.4434,4.2217,1.4078,8.0122,2.5567,11.7955 c4.3143,14.2061,8.9229,28.3314,12.0545,42.8711c0.1687,0.7831,0.4131,1.554,0.6761,2.312 c3.5554,10.2479,6.9382,20.5605,10.7373,30.7175c3.3872,9.0561,5.4716,18.4687,8.235,27.6928 c1.3244,4.4207,2.5501,8.8711,3.8011,13.3136c2.3369,8.2988,5.0227,16.5197,6.916,24.9189 c4.5876,20.351,8.8348,40.7792,13.1455,61.1919c0.995,4.7121,1.6735,9.4905,2.5448,14.2296 c0.215,1.1694,0.3152,2.5333,0.9864,3.4121c1.8094,2.369,2.3821,5.0397,2.6327,7.8777c0.1338,1.5141,0.7642,2.7152,2.3751,3.0928 c1.5445,0.3621,3.0647-0.4312,3.928-2.1033c1.5345-2.9723,1.761-6.1318,1.2223-9.3873c-0.9179-5.5469-1.8998-11.0848-2.7144-16.647 c-1.658-11.3217-2.9709-22.6998-4.8812-33.9774c-3.3179-19.5878-6.2944-39.2364-11.2556-58.5291 c-2.9467-11.4591-5.1-23.127-7.4482-34.7336c-1.532-7.5725-0.3533-9.0221,7.292-9.1876c5.4096-0.1172,10.8426-0.1732,16.2361,0.1818 c16.6401,1.0955,33.2969,2.0904,49.8901,3.708c18.5948,1.8128,37.1275,4.2608,55.6868,6.437 c5.9767,0.7009,11.9793,1.081,17.7802,3.0406c2.5781,0.871,5.4836,0.7735,9.2415,1.2398 C294.5377,373.6175,294.4085,372.1848,293.8044,370.9929z M340.5264,354.6234c3.938,6.5336,7.877,13.0668,11.8674,19.5683 c1.455,2.3707,2.579,5.0382,5.1485,6.4603c0.4687,0.0183,0.9174,0.1647,1.2539,0.0301c7.086-2.8352,14.149-5.7281,21.2394-8.552 c3.5483-1.4131,7.11-2.806,10.7213-4.0457c14.4617-4.9644,28.4979-10.998,42.6101-16.8422 c9.8327-4.0719,19.6813-8.1061,29.4977-12.2172c4.812-2.0152,9.5721-4.1546,14.3463-6.2594 c11.7646-5.1866,23.5355-10.3596,35.2793-15.5932c4.402-1.9617,8.7574-4.0319,13.0928-6.1377 c2.5223-1.2252,4.9359-2.5475,6.4982-5.1432c0.7748-1.2875,2.288-2.131,3.4335-3.1454c-0.6791-3.5378-8.015-24.8731-10.2387-29.6181 c-0.4091-0.8728-1.1193-1.6046-1.7678-2.5093c-1.0923,0.2338-2.1262,0.2756-2.998,0.6728 c-3.8341,1.7471-7.6262,3.587-11.4204,5.4204c-0.5359,0.259-1.1255,0.5689-1.4773,1.021c-3.1099,3.997-7.6449,5.7541-12.0462,7.6964 c-6.2418,2.7543-12.4236,5.6812-18.7995,8.0877c-14.859,5.6082-29.8272,10.9269-44.7348,16.4075 c-10.0007,3.6767-20.1629,6.9996-29.8954,11.2915c-7.1701,3.1619-14.4459,6.0327-21.642,9.1093 c-6.082,2.6002-11.9691,5.6559-18.0498,8.2592c-6.0954,2.6096-12.3254,4.9041-18.4926,7.3463 c-2.0215,0.8005-4.031,1.6309-6.8118,2.7581C338.5692,351.1991,339.5087,352.9348,340.5264,354.6234z M386.1299,479.7303 c-1.9594-10.2501-3.6714-20.5607-6.0715-30.708c-1.3308-5.6259-3.5957-11.0757-5.8672-16.4232 c-2.9788-7.0125-6.4707-13.805-9.5757-20.7662c-4.009-8.9883-8.1523-17.8908-13.6758-26.0835 c-0.7777-1.1536-1.6299-2.4295-1.8579-3.7506c-0.8872-5.1399-3.7203-9.2818-6.5584-13.4165 c-10.116-14.7372-20.2385-29.4706-30.4506-44.1413c-7.8554-11.2854-17.9118-20.5754-27.6288-30.1783 c-6.4581-6.3823-13.3587-12.1516-21.0422-17.0099c-5.1231-3.2394-10.4906-5.9709-16.1905-7.9616 c-13.2909-4.6417-26.7625-8.6818-40.7031-10.8879c-5.5526-0.8787-11.1498-1.5037-16.7427-2.0928 c-12.1853-1.2835-24.3824-2.4549-36.5717-3.7011c-8.1974-0.838-16.3854-1.3654-24.6536-1.1961 c-7.6163,0.156-15.274-0.1734-22.8681-0.8209c-12.2052-1.0407-24.3717-2.5293-36.5566-3.8097 c-7.9929-0.8399-15.982-1.7354-23.9894-2.4084c-2.1499-0.1807-4.3946,0.2028-6.5251,0.6581 c-0.7449,0.1592-1.6877,1.2557-1.7951,2.0277c-0.1139,0.819,0.4178,2.1038,1.0936,2.5754c1.282,0.8951,2.8123,1.5943,4.3385,1.9485 c3.713,0.8615,7.4538,1.7551,11.2342,2.1499c24.1742,2.5242,48.3517,5.0273,72.5493,7.3143 c15.9958,1.5118,32.0194,2.7546,48.0445,3.9284c16.0678,1.1769,31.9114,3.8031,47.6884,6.9149 c8.1666,1.6107,15.6922,4.8958,22.9035,8.9897c8.1175,4.6083,14.9265,10.8436,21.6956,17.1503 c18.4559,17.1954,33.9467,36.9565,49.2641,56.8665c1.096,1.4247,2.0645,2.9827,2.8697,4.5902 c4.8583,9.6983,10.5266,18.9395,16.0545,28.2508c5.635,9.4918,11.823,18.6566,17.4139,28.173 c4.2631,7.2563,8.0442,14.8011,11.9004,22.2892c2.3862,4.6334,4.5329,9.3908,6.7498,14.1102 c3.9248,8.3556,7.7942,16.7372,11.7481,25.0788c0.9837,2.0754,2.201,4.0403,3.3109,6.0559c0.2365-0.0839,0.473-0.1677,0.7096-0.2515 C386.2993,482.0386,386.3456,480.8594,386.1299,479.7303z M581.7056,390.2634c3.2867-3.2018,5.3189-7.0578,5.7459-11.6385 c0.126-1.3529-0.03-2.8206-0.4315-4.1198c-3.0816-9.9702-5.5418-20.1444-9.576-29.8049c-1.7004-4.0721-3.6208-8.0528-5.2973-12.1342 c-6.1009-14.8516-11.7742-29.8922-18.3276-44.54c-4.6839-10.4695-7.9744-21.4652-12.8337-31.8297 c-5.1911-11.0723-9.1329-22.7213-15.5517-33.23c-8.1973-13.4205-17.1661-26.2049-29.091-36.6581 c-7.7862-6.8252-16.2632-12.4953-26.3484-15.3326c-9.2793-2.6106-18.5215-5.4327-27.925-7.5045 c-17.6604-3.8911-35.5008-6.8683-53.4224-9.334c-12.937-1.7799-25.8622-3.6462-38.7981-5.4351 c-1.9835-0.2743-4.0062-0.2603-5.9923-0.5203c-2.774-0.3632-5.5809-0.6594-8.2838-1.3402 c-5.2583-1.3245-10.4487-2.9167-15.6804-4.3502c-1.1515-0.3156-2.351-0.4927-3.5407-0.6204 c-0.9806-0.1052-1.7716,1.1562-1.4818,2.1339c0.4409,1.4874,1.468,2.3847,2.8646,2.8571c5.5125,1.8647,10.9691,3.8331,16.7837,4.748 c10.7126,1.6856,21.3738,3.6962,32.0609,5.5453c6.3354,1.0962,12.7218,1.9404,19.0107,3.2543 c12.5837,2.6293,25.111,5.5269,37.6715,8.2686c8.2437,1.7994,16.5313,3.4047,24.7525,5.2997 c16.1969,3.7334,30.4297,11.2762,42.6695,22.5234c1.7695,1.6259,3.4333,3.395,4.9619,5.2496 c4.982,6.0444,9.9171,12.1287,14.7916,18.2601c2.2662,2.8506,3.7585,5.9223,4.1693,9.7786c0.3501,3.287,1.8349,6.5799,3.3743,9.5851 c2.6658,5.2041,4.6046,10.6923,6.9475,16.014c6.8081,15.4644,11.9274,31.5577,18.0763,47.2614 c3.7296,9.5247,7.9739,18.8477,11.9747,28.2665c0.5496,1.2939,1.0435,2.6122,1.5357,3.9295 c1.6157,4.3228,3.5045,8.5226,5.3622,12.7451c2.8212,6.4128,4.7878,13.2051,7.0442,19.8611 c0.9661,2.8499,1.7485,5.762,2.6129,8.6463c0.4606,1.5369,1.0778,3.0472,1.3487,4.6171c1.0571,6.1251,1.0161,6.1322,4.5993,11.4105 C579.2306,392.296,580.5287,391.4099,581.7056,390.2634z M44.983,263.9904c2.8637,2.2842,6.1976,3.698,9.6955,4.7233 c9.4925,2.7826,19.2483,4.169,29.0477,5.173c3.7697,0.3862,7.6221-0.1204,11.4232,0.0624 c21.282,1.0238,42.5704,1.9648,63.8352,3.2786c12.6349,0.7806,25.2395,2.104,37.8407,3.3551 c8.8692,0.8806,17.2441,3.874,25.6438,6.6336c5.5346,1.8184,10.9745,3.927,16.4422,5.9457 c4.9368,1.8227,9.5053,4.385,13.7493,7.4504c2.091,1.5103,4.0279,3.3482,5.6769,5.3347c4.8801,5.879,9.2863,12.0988,13.1854,18.6958 c1.7238,2.9167,3.9326,5.583,6.1579,8.1587c3.1592,3.6565,6.2892,7.2935,8.6663,11.5464c1.3687,2.4486,3.0296,4.7404,4.6409,7.0456 c3.7032,5.2983,6.5711,11.0031,9.0701,16.9708c4.0309,9.6262,8.648,18.925,14.6868,27.5629 c11.6399,16.6504,21.9994,34.0702,30.3178,52.6807c2.1923,4.9048,5.6756,9.2212,8.4244,13.8912 c5.809,9.8692,11.5316,19.7893,17.2729,29.6982c1.1989,2.0692,2.3711,4.1423,4.2218,5.4662 c2.1309-0.0628,3.3945-1.2235,3.9843-2.681c0.5692-1.4064,0.7567-3.1129,0.6057-4.6375c-0.445-4.493-2.7527-8.3735-4.5786-12.3812 c-2.9946-6.5727-6.2745-13.0153-9.2717-19.587c-8.1702-17.9146-16.6647-35.6441-27.0935-52.4033 c-6.1523-9.8868-11.8855-20.0352-17.7625-30.0921c-1.2194-2.0867-2.3584-4.0961-4.5405-5.4693 c-1.2824-0.8072-2.3692-2.2305-3.0651-3.617c-8.1057-16.149-19.3908-29.964-31.481-43.2022 c-8.5524-9.3647-17.7489-18.0667-27.3053-26.3852c-7.0285-6.118-14.8914-10.9621-23.5998-14.32 c-2.7979-1.0789-5.7316-1.8816-8.6669-2.5168c-18.8954-4.0883-37.9977-6.6044-57.2986-7.8777 c-15.2378-1.0051-30.4406-2.547-45.6552-3.8919c-14.4129-1.274-28.8361-2.4568-43.2258-3.9569 c-9.7917-1.0207-19.5337-2.5179-29.2975-3.805c-0.971-0.128-1.9394-0.2761-4.5214-0.6458 C43.67,262.2342,44.1537,263.3289,44.983,263.9904z M255.3168,312.1895c-3.1757-3.8289-6.8624-6.7812-11.2816-8.7827 c-4.9293-2.2325-9.9415-4.3369-15.0575-6.0886c-6.8338-2.3398-13.7485-4.4901-20.7313-6.332 c-4.8325-1.2746-9.8036-2.3054-14.7737-2.7251c-16.0027-1.3513-32.0331-2.3765-48.0544-3.5049 c-1.9663-0.1384-3.9855-0.547-6.1044,0.5991c-0.1496,4.3857,2.2886,8.0002,3.4622,11.9453 c1.1432,3.8434,2.6083,7.5969,3.6266,11.4701c1.0758,4.0918,2.4027,8.0559,4.4062,12.1902c0.3652,0.1073,0.9259,0.3547,1.509,0.4315 c17.5151,2.308,35.0208,4.6941,52.5538,6.8574c10.3585,1.278,20.7764,2.0721,31.1395,3.3164 c10.7636,1.2925,21.4931,2.8689,32.2391,4.3089c0.9667,0.1295,1.9457,0.1682,3.859,0.3271 C266.3175,327.4415,261.3517,319.4661,255.3168,312.1895z M343.611,185.8609c1.9261,2.0378,4.133,3.8072,6.1219,5.7894 c2.84,2.8306,5.8114,5.5697,8.3383,8.6649c4.3781,5.3624,10.193,8.3217,16.4708,10.6091c1.8768,0.6838,3.8085,0.8414,5.9005,0.5187 c3.5527-0.548,7.1753-0.7976,10.7743-0.8656c19.3841-0.3664,38.4207,2.2815,57.2386,6.7651 c9.1718,2.1853,18.3582,4.3091,27.5439,6.4354c0.5515,0.1276,1.155,0.0306,1.673,0.0374c0.8694-1.1491,0.1443-1.9646-0.3854-2.751 c-2.3525-3.4926-4.6312-7.0421-7.1338-10.4252c-9.0916-12.2902-22.0406-18.3557-36.3672-21.8848 c-5.2342-1.2893-10.6692-1.9989-16.0553-2.3957c-20.8344-1.535-41.497-4.3878-62.1172-7.6226 c-5.9203-0.9288-11.8441-1.8366-18.7746-2.9103C338.4232,180.3708,341.0311,183.1316,343.611,185.8609z M507.2979,230.4203 c-2.189-3.8304-4.1818-7.8158-6.7673-11.366c-3.3058-4.5391-7.0023-8.81-10.7207-13.0287 c-5.8978-6.6912-12.9218-11.8703-20.7908-16.1827c-8.235-4.513-16.9298-7.2568-25.9897-9.3004 c-12.7418-2.8742-25.4189-6.0343-38.1518-8.9491c-7.8336-1.7932-15.7111-3.4-23.5844-5.0143 c-12.0106-2.4625-24.0164-4.9554-36.0604-7.2455c-6.6972-1.2735-13.4664-2.17-20.2087-3.1999 c-0.3384-0.0517-0.7299,0.2431-1.4116,0.4912c0.118,2.8266,1.4454,5.2612,2.8553,7.5856c0.869,1.4327,2.5341,1.8392,4.1746,2.1152 c5.153,0.8672,10.2799,1.8986,15.4449,2.6833c17.282,2.6254,34.5656,5.2441,51.8705,7.7116 c6.957,0.992,13.9658,1.6349,20.9599,2.3491c11.4832,1.1727,22.5521,3.7038,33.0108,8.8334 c9.8324,4.8225,17.6639,11.8226,23.7863,20.7595c3.1711,4.6291,6.3514,9.3071,8.1797,14.7098 c0.5486,1.6211,1.6165,2.7492,3.2814,3.2657c6.3263,1.9628,12.6494,3.936,18.9868,5.8622c0.2964,0.0901,0.7195-0.2365,1.2032-0.4125 C507.3539,231.5317,507.5442,230.8512,507.2979,230.4203z M177.2741,515.3116c0.1208-3.8037,0.2182-7.6397-0.1214-11.4214 c-1.8679-20.7982-4.6052-41.4837-8.8798-61.9341c-2.5842-12.3632-5.3483-24.691-8.2135-36.9923 c-1.9988-8.582-4.32-17.0885-6.466-25.6366c-0.5358-2.1346-0.8448-4.3298-1.4464-6.4435c-0.9144-3.2133-1.661-3.6718-5.2534-3.5341 c-0.5534,0.0212-1.0943,0.373-1.8615,0.6523c-0.0651,0.7683-0.3215,1.571-0.1634,2.2816c1.3041,5.8668,2.6244,11.7313,4.056,17.568 c2.5779,10.5099,5.3868,20.9654,7.8165,31.5087c2.2042,9.5649,4.1806,19.1889,5.9731,28.8397 c1.1714,6.3069,1.7882,12.7152,2.7375,19.0655c1.7498,11.7049,3.5477,23.4027,5.3526,35.0993 c0.972,6.299,2.5738,12.5306,1.4322,20.1433C176.2797,521.6283,177.17,518.5889,177.2741,515.3116z M531.1201,319.1409 c0.3908,1.2499,0.6179,2.6205,1.2235,3.796c2.0188,3.9185,4.1132,7.8012,6.291,11.6338c2.7718,4.8781,5.1858,9.9166,7.5811,14.9921 c4.699,9.9566,8.5804,20.308,14.2076,29.8243c1.5266,2.5818,2.8866,5.2615,4.3862,7.8598c0.3411,0.5912,0.9442,1.0314,1.4781,1.5953 c1.3263-1.6559,0.4449-2.9766,0.0645-4.239c-2.4842-8.2444-4.6686-16.6035-7.6459-24.6687 c-3.6036-9.7619-7.1063-19.5813-11.6302-28.9978c-1.9897-4.1417-3.2783-8.6182-4.9275-12.9265 c-0.6983-1.8244-1.175-3.8281-3.2089-5.0069C536.364,315.025,533.8814,316.9735,531.1201,319.1409z M122.7717,284.2691 c0.0005,0.8073-0.1725,1.4524,0.0272,1.947c3.2946,8.1585,6.6499,16.2924,9.9612,24.4442c1.6475,4.0558,4.0438,7.808,4.738,12.2598 c0.2012,1.2896,1.4501,1.9763,2.7862,1.5945c1.103-0.3152,2.1079-0.9738,3.2894-1.5445c-0.1102-1.3463-0.0173-2.5688-0.3307-3.6764 c-3.3099-11.6942-6.7865-23.3376-10.7185-34.7261C129.1005,283.7253,125.9965,283.4058,122.7717,284.2691z M101.0237,222.3944 c-4.7658-9.9426-9.4304-19.9354-14.3311-29.8111c-3.5649-7.184-7.2231-14.3395-11.2328-21.2806 c-5.5172-9.5503-11.5539-18.8003-17.0836-28.3438c-3.8158-6.5854-7.0906-13.482-10.722-20.1773 c-2.1982-4.0528-4.6255-7.9811-6.9327-11.9752c-3.8135-6.6017-7.6594-13.1852-11.4048-19.8254 c-3.2702-5.7978-6.1716-11.7173-5.9592-18.6746c0.0399-1.3086-0.4649-2.8304-1.2179-3.9033 c-0.5848-0.8332-1.8969-1.3569-2.9779-1.5886c-1.2617-0.2705-2.5916,1.1759-2.0846,2.2436c1.2619,2.6575,0.941,5.4962,1.3419,8.252 c0.2868,1.9717,0.7958,3.9328,1.4143,5.8306c2.6277,8.063,6.5466,15.53,10.9033,22.7595 c7.3573,12.2089,13.868,24.8599,20.3352,37.5539c4.1839,8.2121,9.25,15.9704,13.7635,24.0203 c4.8047,8.5694,9.5481,17.1782,14.0853,25.8911c3.7037,7.1121,7.2403,14.3239,10.5232,21.6386 c2.7912,6.2188,5.077,12.6628,7.6652,18.9749c0.9089,2.2169,1.9646,4.3861,3.1232,6.4832c0.5937,1.0748,1.6685,1.7951,3.032,1.3846 c1.2795-0.3853,2.0947-1.4133,2.0948-2.6624c0.0001-1.7669-0.0911-3.6176-0.6154-5.2839 c-1.2041-3.8275-2.6936-7.5653-4.0672-11.3395C100.7921,222.5055,100.9079,222.45,101.0237,222.3944z M380.491,292.8264 c-10.4406,3.5994-20.556,7.9696-30.5143,12.7324c-3.4343,1.6426-7.0429,2.9168-10.5242,4.4663 c-2.7438,1.2212-5.4426,2.5532-8.1015,3.9498c-0.8546,0.4489-1.7841,1.1254-2.2007,1.9417 c-0.4957,0.9715-0.8565,2.3097-0.5857,3.3003c0.3583,1.311,1.9639,1.5783,3.0464,1.2225c3.792-1.2463,7.53-2.6716,11.2355-4.1606 c2.0359-0.8181,3.9475-1.9395,5.9469-2.8551c5.6464-2.5857,11.2615-5.2479,16.9766-7.6735 c8.6704-3.6797,17.4411-7.123,26.1128-10.7993c2.9391-1.246,5.7432-2.8316,8.5228-4.4135c0.5329-0.3033,0.9292-1.3195,0.9183-1.9992 c-0.018-1.1231-0.941-1.8741-2.006-1.7816c-1.5748,0.1368-3.1771,0.4376-4.6698,0.9523 C389.9045,289.3446,385.2067,291.1115,380.491,292.8264z M458.3082,263.2068c-2.0677,0.7526-4.1738,1.4176-6.1854,2.2984 c-0.8755,0.3833-1.6204,1.1474-2.3111,1.8501c-0.9028,0.9184-0.5142,2.3798,0.6158,3.0365c1.9265,1.1197,3.8555,0.732,5.8043,0.1518 c4.9846-1.4842,9.9742-2.9523,14.9504-4.4647c8.4155-2.5576,16.8104-5.183,25.2387-7.6973 c2.8664-0.8551,5.8148-1.4324,8.7098-2.1967c0.9583-0.253,1.9786-0.5394,2.76-1.1026c0.5439-0.3921,1.0421-1.3102,0.986-1.9422 c-0.057-0.6436-0.7278-1.6277-1.2881-1.7523c-1.3169-0.293-2.784-0.4301-4.0919-0.1578 c-6.6546,1.3854-13.3276,2.7315-19.8999,4.4517c-8.51,2.2274-16.9309,4.7951-25.3902,7.2164 C458.2406,263.0009,458.2744,263.1038,458.3082,263.2068z"/></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 304.0488 345.5214" xml:space="preserve"><path fill="${color}" d="M233.2215,217.5866c3.5241,0.6465,6.4962-0.5704,9.7353-1.4045c0.4488-0.8038,0.9564-1.634,1.3895-2.5013 c3.7134-7.4353,13.9965-9.1496,19.4539-2.9732c1.9312,2.1857,3.9316,3.0943,6.6667,3.2326c3.993,0.2019,7.977,0.586,11.9639,0.9039 c4.0938,0.3263,7.7896,1.7777,11.0877,4.1686c2.7239,1.9745,4.4895,4.6505,4.4258,8.0965 c-0.1598,8.6429,1.3274,17.1004,2.6182,25.5861c0.3603,2.3689,0.6224,4.7537,1.0291,7.1141 c0.1629,0.9461,0.3534,2.0605,0.9478,2.7271c1.8484,2.0728,1.6617,4.4035,1.1946,6.792c-1.0464,5.3507-3.006,10.3704-5.9416,14.9572 c-5.5514,8.6739-12.6705,15.8777-20.7628,22.2239c-14.1371,11.0868-29.8442,19.3228-46.5125,25.7758 c-18.37,7.1118-37.3429,11.852-57.0654,12.9895c-11.0114,0.6351-22.0201,0.2299-32.5918-3.4512 c-3.1804-1.1074-6.2286-2.6613-9.2117-4.2471c-2.3049-1.2253-4.0507-3.1198-5.5585-5.3324 c-5.6241-8.2533-11.383-16.415-17.1246-24.5877c-0.7997-1.1383-1.7889-2.1432-2.6835-3.2155 c-4.668-5.5956-5.3922-11.9658-1.9675-18.3949c2.7645-5.1899,6.8006-9.3671,11.1109-13.265c2.9522-2.6697,6.082-5.1431,9.364-7.8988 c-0.7027-1.2447-1.4233-2.3895-2.0181-3.5963c-3.2769-6.6493-3.3634-15.1624,1.9589-20.6978 c4.1846-4.3522,11.4547-5.2101,16.355-1.5815c0.9086,0.6728,1.5563,1.7579,2.1795,2.7443c1.8148,2.8726,3.7145,5.6465,6.8852,7.6187 c4.4987-2.1466,9.0022-4.2682,13.4821-6.4382c13.3351-6.4592,27.0975-11.8432,41.1826-16.4209 c2.2814-0.7415,4.5257-1.6151,6.8383-2.2379c2.8129-0.7576,3.9476-2.6519,3.7364-5.3349 c-0.4387-5.5722-0.7221-11.1837-1.6302-16.6866c-2.3856-14.4579-6.5425-28.4247-12.5632-41.8076 c-0.6512-1.4476-1.4926-2.8146-2.32-4.1738c-0.1661-0.2728-0.6696-0.3403-1.237-0.6047c-0.478,0.5098-1.0993,1.0122-1.5219,1.6468 c-7.8568,11.801-19.5302,17.4653-32.9335,19.8932c-14.0741,2.5493-27.9047,1.0257-41.2281-4.2149 c-2.3867-0.9388-4.5261-1.0726-6.9616-0.5807c-14.1178,2.8513-28.3292,5.1238-42.7338,5.8144 c-8.5688,0.4108-17.1836,0.937-25.7191-0.2054c-6.7144-0.8987-13.4268-2.0248-19.7936-4.5752 c-4.1315-1.655-7.6142-4.2411-11.1885-6.8457c-6.0396-4.401-8.725-10.7276-11.2029-17.2927 c-4.6313-12.2701-5.5071-24.7616-2.9239-37.6723C5.1279,93.1588,14.5746,77.899,27.0251,64.2453 c10.1825-11.1665,22.123-20.1782,35.0727-27.8959c8.4326-5.0256,17.1735-9.4488,26.3366-12.9643 c3.29-1.2622,5.8697-3.0686,8.0718-5.8582c5.6769-7.1916,12.669-12.738,21.4798-15.6978 c5.6057-1.8831,11.2715-2.6367,17.0509-0.6808c3.0796,1.0422,5.9903,2.2728,7.7268,5.2792 c1.0317,1.7862,2.6958,2.2051,4.6312,2.0434c3.5834-0.2993,7.1662-0.641,10.7566-0.8129 c21.9341-1.0501,43.5221,0.8922,64.4949,7.7733c13.7983,4.5272,26.6436,10.9187,37.7783,20.3562 c9.2534,7.843,16.7393,17.0837,21.7951,28.2442c2.9397,6.4891,2.7831,12.7337-0.1876,19.0761 c-2.4764,5.2872-5.6451,10.0894-9.4936,14.4917c-9.0433,10.3446-19.9383,18.4396-31.4727,25.6745 c-7.4432,4.6687-15.2473,8.7628-22.897,13.1014c-1.0426,0.5912-2.1595,1.0541-3.1869,1.6685 c-1.7982,1.0755-2.1872,2.0917-1.4501,3.9796c0.7264,1.8606,1.5583,3.6813,2.3805,5.503 c6.1934,13.723,10.8173,27.9764,13.6544,42.7397c1.5046,7.8295,2.1402,15.8258,3.1703,23.7465 C232.8865,215.1597,233.0476,216.305,233.2215,217.5866z M86.2381,33.5576c-1.31,0.3939-2.2584,0.5875-3.133,0.9559 C72.5135,38.9747,63.3948,45.8443,54.041,52.3283c-0.1633,0.1132-0.3088,0.2547-0.4514,0.3945 c-5.1329,5.0331-10.298,10.0341-15.3881,15.1101c-6.8443,6.8255-11.8366,15.0835-17.4051,22.8823 c-2.6613,3.7272-5.0822,7.6876-7.1128,11.7894c-3.4635,6.9961-6.5563,14.1923-6.4739,22.2421 c0.0824,8.0539,1.2404,15.9342,4.2382,23.4632c0.5116,1.2848,1.1769,2.5366,1.9512,3.6821 c1.2171,1.8006,2.6127,3.4794,3.8864,5.2433c1.7737,2.4562,3.7233,4.7782,6.468,6.1328c3.0315,1.4963,6.1029,3.0312,9.3213,4.0076 c10.4544,3.1714,21.2791,3.6351,32.0776,3.328c19.0382-0.5413,37.7743-3.5538,56.3071-7.8622 c18.3301-4.2612,36.2516-9.8329,53.8846-16.4166c22.7505-8.4945,44.4989-18.9781,64.872-32.199 c8.554-5.551,16.7443-11.637,23.8452-19.0531c4.0251-4.2038,7.6928-8.6675,10.5486-13.7626 c2.865-5.1116,3.0676-10.2428,0.1653-15.4139c-0.2934-0.5228-0.5464-1.068-0.8312-1.5957 c-7.3318-13.588-18.0642-23.766-31.4039-31.3423c-15.8901-9.0249-33.1001-13.9581-51.1164-16.1578 c-19.3759-2.3658-38.6776-1.5175-57.9266,1.7439c-6.1108,1.0353-11.5788,3.2147-16.306,7.041 c-5.9703,4.8324-11.1231,10.3187-12.7187,18.3028c-1.0545,5.2769-2.795,10.4089-3.1175,15.844 c-0.0926,1.5606-0.4823,3.191-1.1236,4.6148c-1.7277,3.8359-4.9303,4.8606-8.8493,3.2844c-2.1847-0.8787-3.6155-2.237-4.5834-4.4 c-1.8358-4.1022-2.8719-8.2894-2.369-12.8043C85.0229,45.099,85.5745,39.7663,86.2381,33.5576z M117.2356,310.088 c3.9457,5.2356,7.002,9.1544,9.9087,13.1812c4.038,5.5941,9.613,8.9046,15.9978,11.0441 c9.2631,3.1041,18.8969,3.6053,28.4672,2.9321c34.6788-2.4396,66.3308-13.8205,95.1069-33.2388 c7.9902-5.3918,15.1613-11.7341,21.2801-19.2299c3.9793-4.8748,7.0193-10.2187,8.3083-16.4204 c0.3578-1.7217,0.732-3.6561,0.3064-5.2862c-1.6232-6.2167-2.371-12.5416-3.0051-18.9012c-0.0503-0.505-0.5648-0.9637-1.0076-1.6753 c-0.7309,0.6038-1.4161,1.0123-1.8968,1.5907c-5.9335,7.1406-13.119,12.8301-20.7199,18.0618 c-14.8874,10.247-30.8925,18.4033-47.5004,25.4246c-20.6701,8.7386-41.8412,15.9038-63.9326,20.1493 c-10.8133,2.0781-21.6769,3.5785-32.7296,3.0105C123.4747,310.6102,121.136,310.3838,117.2356,310.088z M272.1833,221.9181 c0.0546,1.0297-0.0188,1.6366,0.1322,2.1815c1.2884,4.6485-0.6627,8.1931-3.8643,11.2644 c-3.7534,3.6006-8.4256,5.2751-13.4533,6.0444c-1.1585,0.1773-2.405,0.0533-3.5719-0.153 c-2.7853-0.4922-4.8277-1.9715-5.4005-4.8871c-0.4994-2.5421-0.7723-5.128-1.2441-7.6763 c-0.2412-1.3027-0.6994-2.5653-1.1157-4.0459c-3.8865,0.2662-7.3845,0.5205-10.0971,2.5281 c-1.2051,7.308-1.9689,14.2818-3.5558,21.063c-3.0592,13.0727-8.6027,24.91-18.8701,34.0665 c-0.1677,0.1495-0.0246,0.6473-0.0271,1.0744c0.5867-0.1172,1.1904-0.138,1.7114-0.3562 c13.839-5.7957,27.4628-12.0407,40.4096-19.6644c7.7581-4.5684,15.2986-9.469,22.2478-15.2209 c4.1617-3.4446,8.2868-6.9621,11.3859-11.4352c1.3476-1.945,2.5108-4.1077,3.2869-6.3356c0.9605-2.7572,0.0569-4.6204-2.6047-5.9126 c-4.1798-2.0292-8.6741-2.9496-13.2945-3.22C273.7132,221.2014,273.1439,221.5872,272.1833,221.9181z M132.0165,270.2409 c-6.92,4.059-14.7585,10.6053-18.8929,15.7602c-1.1142,1.3892-2.1421,2.9027-2.911,4.5026 c-1.8819,3.9155-0.7271,7.5916,3.0982,9.6351c1.733,0.9258,3.6815,1.525,5.5979,2.0165c5.0918,1.3061,10.3052,1.1019,15.4772,0.7875 c15.216-0.925,30.0057-4.2173,44.63-8.341c1.4622-0.4123,2.8626-1.0438,4.2917-1.5735 C163.4508,291.4215,147.3131,281.8583,132.0165,270.2409z M156.8263,255.8109c0.7518,0.8773,1.3544,1.9643,2.2724,2.5856 c4.1169,2.7863,8.221,5.6188,12.5291,8.0868c3.6361,2.0832,7.6621,3.3355,11.8472,3.9402 c7.6362,1.1034,14.1602-1.0805,19.5769-6.5888c2.8285-2.8762,4.9586-6.2268,6.7214-9.8202 c3.0229-6.1623,4.2396-12.8226,5.213-19.5328c0.0969-0.6679-0.3633-1.4165-0.5498-2.0743 c-5.7754,0.5402-13.8999,3.2262-30.1749,9.9022C168.5079,248.7717,160.846,252.5198,156.8263,255.8109z M224.4199,230.219 c-0.4058,0.0344-0.8116,0.0688-1.2173,0.1032c-0.2198,1.1455-0.4713,2.2861-0.6535,3.4375 c-0.5917,3.7392-0.9737,7.5223-1.7725,11.2158c-1.6626,7.687-4.5952,14.8847-9.2899,21.2479 c-6.6431,9.004-15.3545,13.6198-26.8088,12.6237c-7.1472-0.6214-13.5321-3.1875-19.6655-6.6805 c-7.5341-4.2907-13.6734-10.3432-20.2075-15.8946c-0.8892-0.7555-1.4717-1.868-2.213-2.802 c-1.7373-2.1889-3.3784-4.4693-5.2824-6.503c-0.7206-0.7697-2.1106-1.4382-3.1032-1.3275 c-2.7193,0.3033-4.9992,1.7382-5.8855,4.4408c-0.8871,2.705-1.2203,5.4435,1.5237,7.6098c3.1316,2.4723,6.0489,5.216,9.1817,7.6866 c9.007,7.1031,18.7302,12.9756,29.8542,16.1017c4.0084,1.1265,8.193,1.9023,12.3429,2.1988 c13.7896,0.9852,24.4181-4.8647,32.1965-15.9794c7.4192-10.6015,10.5993-22.6735,11.4464-35.442 C224.9102,231.5896,224.5773,230.8985,224.4199,230.219z M135.0359,168.2971c5.7693,1.7773,11.3858,2.4792,17.2173,2.1933 c8.4884-0.4162,16.5932-1.9686,24.1556-5.9172c5.7508-3.0027,10.5905-7.068,14.1479-12.545 c0.4904-0.755,0.7337-1.6704,1.6316-3.7819C172.8809,156.7058,153.9605,162.5001,135.0359,168.2971z M133.0054,10.2102 c-5.7385-2.7677-11.1339-1.817-16.2103,0.8295c-11.7048,6.1021-19.444,15.6553-23.7083,28.0732 c-1.438,4.1875-2.1211,8.5293-1.8258,12.9491c0.2223,3.327,0.7178,6.6456,2.9871,9.314c2.0117-0.827,1.6902-2.4138,1.8139-3.7164 c0.6616-6.97,1.9037-13.8254,4.1043-20.4748c0.6827-2.0627,1.453-4.2117,2.6976-5.9539 c6.4057-8.9669,14.3516-16.0136,25.1527-19.3064C129.6976,11.4122,131.3434,10.7846,133.0054,10.2102z M223.386,218.9619 c2.5287-2.4098,1.7834-5.0709,1.5759-7.5576c-1.8643-22.3387-7.9739-43.5598-17.1675-63.9414 c-0.4899-1.0861-1.0477-2.1585-1.7121-3.1442c-0.6568-0.9743-1.7675-1.104-2.6159-0.4578c-0.499,0.38-0.9384,1.4546-0.7555,1.9988 c0.5685,1.6916,1.4269,3.2888,2.2082,4.9056c10.0134,20.7236,16.5122,42.4149,18.0737,65.471 C223.0545,217.1496,223.2518,218.0536,223.386,218.9619z M266.433,227.1264c-2.4652-4.1234-4.6893-7.8686-6.9414-11.5969 c-0.7911-1.3096-2.0546-1.9398-3.5293-1.8288c-1.3699,0.1031-2.7611,0.3539-4.0664,0.7762 c-1.6909,0.5471-2.5986,1.902-2.5128,3.6602c0.2033,4.1645,0.4797,8.3275,0.8474,12.4806c0.1105,1.2483,0.9097,2.278,2.269,2.4296 C257.9649,233.6569,262.7346,232.5104,266.433,227.1264z M290.1095,268.0176c0.1285,0.6939,1.3455,1.6318,2.0742,1.6456 c0.748,0.0142,1.8013-0.8055,2.2169-1.5439c1.0242-1.8199,0.6322-3.8252,0.2635-5.8001c-0.6906-3.6988-1.2914-7.4142-1.9438-11.1203 c-0.1021-0.5803-0.1387-1.2508-0.4623-1.6906c-0.3077-0.4181-0.9434-0.7896-1.4506-0.8111 c-0.4967-0.0211-1.328,0.3101-1.4653,0.6864c-0.5331,1.4601-0.8483,2.9998-1.3696,4.9865 C288.6207,258.6799,289.2483,263.3704,290.1095,268.0176z"/></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 407.6999 359.2555" xml:space="preserve"><path fill="${color}" d="M356.8638,241.3519c3.1956,2.6721,6.1598,4.1268,8.8651,5.9521c1.5802,1.0661,3.2564,2.0292,4.6817,3.2761 c2.254,1.9721,2.3167,3.4733,0.4218,5.8035c-4.2656,5.2458-8.5531,10.4742-12.8733,15.675 c-6.3134,7.6003-12.7051,15.136-18.9735,22.773c-2.0168,2.4572-4.3414,4.4483-7.0624,6.0495 c-6.7281,3.9592-13.2182,8.3931-20.1987,11.8364c-10.4518,5.1555-20.1867,11.497-30.2769,17.243 c-8.1391,4.6348-16.1103,9.5639-24.1766,14.3274c-7.3198,4.3228-14.7712,8.4335-21.9633,12.9577 c-4.1694,2.6227-8.1051,2.5676-12.2671,0.4798c-1.3911-0.6978-2.7453-1.4875-4.0493-2.3382 c-4.5052-2.939-8.9286-6.0063-13.4782-8.8742c-11.6005-7.3126-23.2622-14.5281-34.8819-21.8105 C116.3577,290.6882,62.0932,256.6591,7.8107,222.6588c-2.6762-1.6762-5.1396-3.4743-6.8752-6.211 c-0.8229-1.2973-1.0727-2.5041-0.673-3.9171c0.1415-0.5006,0.253-1.0144,0.4454-1.4953c4.8925-12.2296,9.866-24.4275,14.663-36.6944 c2.3332-5.9665,5.5183-11.5983,7.0407-17.8837c1.2488-5.1556,5.0385-8.0308,11.35-7.7249 c4.5036,0.2181,8.9922,0.7497,13.4868,1.1496c11.2344,0.9994,22.4678,2.0098,33.7033,2.9975 c1.3642,0.1199,2.7383,0.1269,4.0168,0.1823c0.7837-1.0898,0.0298-1.7408-0.3196-2.4526c-1.1463-2.3362-2.3655-4.6383-3.4494-7.0026 c-1.6007-3.4912-2.6816-7.1415-3.0267-10.9864c-0.4943-5.5073,0.608-10.4753,3.4775-15.3988 c4.1929-7.1944,10.4414-10.7683,18.1585-12.6915c10.3055-2.5684,20.6565-2.0908,31.0302-0.7693 c3.6105,0.46,7.1832,1.216,10.7729,1.8385c2.0371,0.3532,4.0736,0.7098,5.8844,1.0255c1.7865-1.0586,1.3669-2.564,1.3797-3.8881 c0.0847-8.8489,0.126-17.6981,0.1966-26.5472c0.1576-19.7804,0.3316-39.5606,0.4772-59.3411 c0.0176-2.3999,0.1539-4.7303-0.994-7.1005c-1.2632-2.6081,0.5899-5.7621,3.3989-6.4884c1.1626-0.3006,2.4006-0.3513,3.6098-0.4238 c15.5904-0.9338,31.1835-1.8229,46.7713-2.7961c3.195-0.1995,5.9627,0.3416,8.888,1.9646c4.2185,2.3404,8.8824,3.8909,13.389,5.6967 c18.0263,7.2235,36.0656,14.4148,54.0996,21.6188c28.3481,11.324,56.701,22.6362,85.0416,33.9787 c13.0372,5.2177,26.0513,10.4928,39.0724,15.7509c0.8027,0.3241,1.5994,0.6804,2.3543,1.1019 c2.7952,1.5609,3.0074,2.4057,1.8831,5.3999c-0.6003,1.5985-1.0581,3.2915-1.2875,4.9817 c-1.5163,11.1721-2.9571,22.3545-4.4149,33.5346c-2.1532,16.5147-4.2991,33.0303-6.4508,49.5451 c-2.151,16.5094-4.3051,33.0185-6.4588,49.5275c-0.0673,0.5163-0.1757,1.0292-0.2109,1.5473 c-0.2011,2.9622-1.8865,4.7371-4.55,5.7458c-0.8115,0.3072-1.6194,0.6235-2.4258,0.944c-6.4495,2.5637-12.9028,5.118-19.3437,7.7033 C360.497,239.6518,359.1178,240.3347,356.8638,241.3519z M196.1862,38.9081c-1.1519,2.6719-1.0078,4.9453-1.1277,7.1541 c-1.1754,21.6499-2.3194,43.3015-3.4722,64.9526c-0.1817,3.4109-0.1937,6.8488-1.9043,9.903 c1.0351,0.6464,1.7218,1.1986,2.5005,1.5429c9.8405,4.3495,19.3336,9.3427,28.6802,14.6843 c11.7852,6.7353,22.871,14.4299,33.4748,22.8571c2.8497,2.2647,5.5335,4.7386,8.3933,6.9895c1.1986,0.9433,2.601,1.685,4.0065,2.299 c8.7394,3.8179,17.5416,7.4936,26.253,11.3736c7.9185,3.527,15.7594,7.2292,23.6137,10.8989 c8.1644,3.8146,16.7861,6.5927,24.7224,10.9317c0.6473,0.354,1.5639,0.2154,2.4254,0.3137c0.226-0.9949,0.4904-1.6607,0.5141-2.3349 c1.1025-31.3795,2.1851-62.7597,3.259-94.1401c0.0175-0.5122-0.0984-1.0292-0.134-1.3704c-2.707-2.4777-5.9018-3.4081-8.9132-4.7065 c-23.248-10.0233-46.4925-20.0552-69.726-30.1123c-20.2025-8.7451-40.3848-17.5371-60.5872-26.2825 C204.3559,42.2131,200.4946,40.6858,196.1862,38.9081z M229.7788,197.2083c1.9544-0.8344,2.7385-1.1908,3.5385-1.5071 c2.2569-0.8924,4.528-1.7493,6.7791-2.6557c2.4241-0.976,4.7228-0.9206,6.9094,0.6479c2.2558,1.618,4.6662,3.0494,6.7717,4.8411 c2.8694,2.4416,6.1379,3.8108,9.7478,4.6272c6.261,1.4159,12.5001,2.9284,18.755,4.3716c1.147,0.2646,2.3257,0.3917,3.5887,0.5984 c0.5401-2.1765-0.6227-3.5997-1.4058-5.0695c-3.1193-5.8536-7.1909-11.0427-11.551-15.9976 c-11.4202-12.9783-24.7421-23.7802-39.0594-33.3382c-15.8913-10.609-32.5716-19.8265-50.2113-27.2533 c-15.3956-6.4818-31.1897-11.6706-47.6199-14.8031c-9.064-1.7282-18.19-2.6258-27.4361-1.9229 c-4.0071,0.3046-7.8782,1.0618-11.6625,2.437c-9.0637,3.294-13.4394,11.4695-11.6785,20.6461 c0.8598,4.481,2.4924,8.6595,4.7178,12.6188c3.5013,6.2296,7.8178,11.8543,12.5733,17.18 c11.6422,13.0385,25.5269,23.3878,39.7966,33.2615c8.1384,5.6312,16.9195,10.1963,25.6283,14.8668 c1.376,0.738,2.6873,1.6066,4.0956,2.2728c9.8717,4.6696,19.8083,9.1874,30.0951,12.8942 c16.7175,6.0241,33.7391,10.6584,51.5939,11.6598c5.7422,0.3222,11.4639,0.1716,17.1179-0.7971 c5.3497-0.9166,10.3782-2.7161,14.6048-6.3591c3.6715-3.1646,4.5837-7.0996,3.7863-11.8241 c-1.0375-0.3836-1.9727-0.8158-2.9533-1.0786c-10.3892-2.7836-20.7846-5.5439-31.1822-8.2959 c-0.6653-0.1761-1.3728-0.3643-2.0439-0.3156c-2.3671,0.1712-4.468-0.5631-6.4004-1.8048c-2.8751-1.8473-5.7519-1.735-8.9245-0.6853 c-4.455,1.474-9.0969,2.1625-13.8167,2.1904c-15.0548,0.0891-29.1561-3.7712-42.5904-10.3338 c-1.3865-0.6773-2.6721-1.6252-3.8667-2.614c-1.2922-1.0698-1.3358-2.7662-0.3204-4.2063c0.8522-1.2086,2.1071-1.4719,3.678-0.7453 c0.471,0.2179,0.9224,0.4826,1.3687,0.7495c11.0523,6.6077,23.0569,10.3167,35.8059,11.7351 c1.8665,0.2077,3.7505,0.2563,5.4374,0.3663c1.0133-1.58,1.9289-2.7678,1.869-4.4336c-9.0966,1.2372-12.5796,1.104-20.3752-0.8771 c-9.8041-2.4915-19.1111-6.3257-27.963-11.1394c-6.8509-3.7255-13.4968-7.8537-20.0658-12.0649 c-6.5897-4.2244-12.5309-9.2897-17.8075-15.1019c-2.3533-2.5922-4.3477-5.4441-5.5981-8.7084 c-2.3039-6.0147,0.8081-11.8682,7.1387-13.0848c2.6747-0.5141,5.5691-0.5811,8.2583-0.1669 c4.2685,0.6575,8.5477,1.5867,12.6494,2.9298c19.4915,6.3827,37.1845,16.1564,53.0632,29.1105 c4.4137,3.6007,8.6747,7.4603,11.9877,12.2236C229.4654,186.3693,231.571,190.6233,229.7788,197.2083z M6.6656,212.8746 c1.8477,1.2501,3.2467,2.2566,4.7024,3.1728c30.2646,19.0478,60.5107,38.1251,90.8124,57.1138 c31.4787,19.7264,63.0135,39.3631,94.5209,59.0435c7.3616,4.5982,14.7016,9.231,22.0754,13.8092 c1.5941,0.9897,3.0539,2.3433,5.4559,2.3326c0.6686-0.6968,1.6054-1.4651,2.2789-2.4194c1.2991-1.8403,2.3955-3.8227,3.6705-5.6814 c8.0441-11.7254,14.8518-24.2437,23.3097-35.7246c3.7698-5.1171,6.3564-11.1089,9.4273-16.7325 c0.3027-0.5541,0.2364-1.3098,0.3933-2.2998c-1.4422-0.9566-2.8028-2.0146-4.2994-2.8198c-3.2013-1.7223-6.5062-3.252-9.709-4.9717 c-7.329-3.935-14.596-7.9862-21.9374-11.8976c-7.7962-4.1537-15.6361-8.2263-23.4819-12.2858 c-6.1502-3.1823-12.367-6.2365-18.5015-9.4484c-5.6789-2.9734-11.2505-6.1517-16.9353-9.1134 c-10.4502-5.4443-20.9729-10.7496-31.4193-16.2011c-7.9888-4.1689-15.909-8.4694-23.8555-12.7194 c-7.1849-3.8426-14.3496-7.7232-21.5498-11.537c-7.1956-3.8115-14.4257-7.5577-21.6376-11.3384 c-5.0674-2.6564-10.1275-5.3265-15.1948-7.9829c-6.7518-3.5393-13.4911-7.1032-20.2706-10.5886 c-2.2687-1.1664-4.3589-2.806-6.8725-3.1096c-0.4597,0.3296-0.8873,0.4689-0.9922,0.7353 c-6.0263,15.3153-13.7743,29.928-18.6646,45.7053C7.537,209.3805,7.1952,210.8799,6.6656,212.8746z M346.8461,256.8282 c-3.0855-1.9268-5.2419-3.3699-7.4986-4.6334c-0.8578-0.4802-2.0258-0.9252-2.9169-0.7388 c-4.1996,0.8779-7.8961-0.5649-11.5473-2.2245c-2.8378-1.29-5.5169-2.9612-8.4146-4.0792c-3.359-1.2959-5.1651-3.3311-4.7612-7.0425 c0.032-0.2948-0.2591-0.6247-0.4037-0.9367c-6.5144-4.8295-11.5647-7.7643-15.3237-8.8484 c-0.528,0.5344-1.2483,1.0562-1.6997,1.7522c-4.7595,7.3392-12.0151,10.9826-20.1272,12.78 c-5.3763,1.1911-11.0005,1.6191-16.5257,1.7157c-13.8252,0.242-27.2749-2.4292-40.5123-6.1926 c-13.8778-3.9454-27.3215-9.0298-40.4025-15.1627c-11.3234-5.3088-22.3091-11.2076-32.9871-17.6801 c-3.8426-2.3291-7.3121-5.2644-11.0665-7.7497c-12.9455-8.569-24.6525-18.5701-35.1104-30.0376 c-1.9841-2.1757-3.9439-4.3737-5.9149-6.5613c-3.0825-0.3209-6.163-0.6626-9.2479-0.959 c-14.1697-1.3611-28.3399-2.7175-42.5121-4.0532c-1.8312-0.1725-3.6747-0.2147-5.5125-0.3172 c0.3221,1.0241,0.8219,1.3842,1.3624,1.6661c5.6843,2.9661,11.3882,5.8952,17.0611,8.8829 c7.3654,3.879,14.6917,7.8325,22.0646,11.6971c6.5948,3.4567,13.239,6.8189,19.8444,10.2554 c5.2325,2.7221,10.4324,5.5063,15.659,8.2397c6.2974,3.2934,12.6124,6.5532,18.9111,9.8442 c5.3775,2.8096,10.7357,5.656,16.1152,8.4619c6.1498,3.2076,12.3346,6.3486,18.4657,9.5913 c7.2043,3.8101,14.3302,7.7695,21.5577,11.5342c8.4552,4.4043,17.0063,8.624,25.4735,13.0056 c9.0819,4.6997,18.1184,9.4873,27.1677,14.2497c9.0538,4.7646,18.1528,9.4476,27.1147,14.3797 c2.6783,1.4741,5.0402,1.5896,7.9117,0.7644c8.1692-2.3477,16.4239-4.3968,24.6387-6.5869 c11.0634-2.9495,22.1507-5.8159,33.168-8.9291C336.0095,261.4649,341.0023,259.5182,346.8461,256.8282z M359.0558,100.9746 c-2.3219,44.1424-4.6183,87.7528-6.8936,131.3643c-0.0511,0.9817,0.1385,1.976,0.2182,2.9975 c4.1806-0.764,23.9094-8.6404,28.848-11.484c0.2417-1.1758,0.6006-2.5082,0.7815-3.8645c2.6128-19.59,5.196-39.1837,7.798-58.7752 c2.0544-15.4669,4.1175-30.9328,6.192-46.397c0.8989-6.7013,1.873-13.3927,2.7294-20.0994 c0.2099-1.6437,0.8509-3.3723-0.3112-5.3133C385.4356,93.1062,372.4811,96.75,359.0558,100.9746z M164.0623,9.5636 c2.3663,1.1109,3.8725,1.867,5.4167,2.5351c9.7023,4.1975,19.4107,8.3806,29.1215,12.5584 c9.3898,4.0398,18.7869,8.0626,28.1771,12.1015c9.0696,3.901,18.139,7.8023,27.2001,11.7229 c9.7002,4.1972,19.3814,8.4388,29.0873,12.6225c16.2327,6.9972,32.4773,13.9665,48.719,20.9426 c8.2792,3.5561,16.5761,7.0714,24.8346,10.6748c1.8331,0.7997,3.5572,1.0718,5.524,0.5004 c9.6514-2.8036,19.3311-5.5098,28.9862-8.3007c0.739-0.2136,1.3651-0.8176,2.5258-1.5403 c-1.4033-0.7277-2.2595-1.2594-3.1796-1.6342c-4.815-1.9609-9.6492-3.8748-14.4715-5.818 c-17.3562-6.9942-34.7021-14.0148-52.0678-20.9852c-17.692-7.1014-35.4187-14.116-53.1013-21.2404 c-20.896-8.4192-41.7618-16.9137-62.6388-25.3802c-2.6036-1.0559-5.2452-1.5109-8.1017-1.3282 c-11.0736,0.7084-22.1577,1.2535-33.2365,1.8845C166.2313,8.9147,165.618,9.1738,164.0623,9.5636z M229.8759,351.5538 c0.1751,0.2321,0.3503,0.4643,0.5254,0.6964c1.0433-0.5461,2.1116-1.0495,3.1262-1.6446 c23.7947-13.9576,47.5901-27.9139,71.356-41.9206c1.3056-0.7696,2.56-1.8138,3.486-3.0043 c2.8692-3.6883,5.5834-7.4977,8.3301-11.2804c6.5309-8.9944,13.7715-17.3878,21.4294-25.4326 c0.5056-0.5311,1.4937-0.9634,0.5375-2.537c-0.6612,0.2794-1.4347,0.6802-2.2529,0.9408 c-9.7585,3.1074-19.6599,5.6806-29.6459,7.9465c-9.4784,2.1506-18.9257,4.4395-28.4161,6.5348 c-6.0964,1.346-10.1359,4.9277-12.5221,10.5945c-0.6698,1.5909-1.4297,3.1632-2.3247,4.6369 c-5.8536,9.6394-11.7254,19.2681-17.6509,28.8636C240.5678,334.5078,235.2049,343.0203,229.8759,351.5538z M159.9334,23.7662 c0.997,29.2663,1.7356,57.9326,1.8056,86.8198c6.9839,2.5093,13.9675,5.0309,20.9684,7.5025 c0.409,0.1444,0.9594-0.1124,1.4688-0.1861c0.1921-0.5775,0.466-1.0486,0.4935-1.5339c1.4768-26.1063,2.9359-52.2137,4.374-78.3222 c0.0366-0.6652-0.1806-1.3444-0.3073-2.2069c-8.4453-4.3817-17.4199-7.5836-26.0342-11.5774 C162.1056,23.9855,161.3689,24.0115,159.9334,23.7662z M275.6021,179.1741c0.1752,0.4665,0.1952,0.6581,0.2988,0.7761 c5.9645,6.7883,11.41,13.9479,15.6165,21.9803c0.8466,1.6168,2.2031,2.6042,3.653,3.5861 c6.4439,4.3636,13.4408,7.8225,19.88,12.1916c0.2817,0.1911,0.62,0.3158,0.9487,0.4176c4.955,1.5348,9.6928,3.7718,14.8948,4.5129 c3.4691,0.4942,6.7327,1.5873,9.6487,3.6165c0.6764,0.4707,1.4499,1.0229,2.7222,0.118c0.3515-4.6931,0.6188-9.6465,0.2994-14.7185 c-5.4557-3.4331-10.9876-6.2581-16.6093-8.9009c-9.7057-4.5625-19.4625-9.0159-29.1739-13.5663 c-6.4236-3.0098-12.7976-6.1254-19.2149-9.1486C277.7043,179.6331,276.718,179.4914,275.6021,179.1741z M149.9247,148.4402 c-0.8288,1.5198-0.1727,2.6057,0.62,3.4947c1.8389,2.0623,3.6989,4.1245,5.7249,5.998 c7.4233,6.8646,15.9724,12.1625,24.7136,17.1036c7.531,4.2569,15.3071,8.1148,23.6144,10.6605 c3.6179,1.1086,7.3964,1.7118,11.1254,2.4215c0.6769,0.1288,1.4672-0.3383,2.4723-0.5999 c-0.4925-0.9908-0.6831-1.6822-1.1068-2.1719c-1.5833-1.8302-3.0581-3.8194-4.9096-5.3397 c-4.938-4.0548-9.9181-8.0835-15.1269-11.7765c-6.3589-4.5084-13.2654-8.1377-20.2948-11.507 c-6.7257-3.2237-13.6428-5.9442-20.884-7.7786C153.8886,148.4424,151.8785,147.8701,149.9247,148.4402z M359.1117,260.1803 c-5.6369,0.0832-7.4476,0.7689-10.8849,4.5982c-5.3238,5.9306-10.5821,11.9271-15.6703,18.0599 c-3.9798,4.7968-7.6679,9.836-11.4567,14.7897c-0.3526,0.4609-0.4962,1.0815-0.9925,2.2088 c3.0331-0.873,4.8642-2.5054,6.9704-3.5897c2.9767-1.5326,5.3616-3.6593,7.5056-6.2639 c6.8279-8.2947,13.8558-16.4246,20.7677-24.6508C356.5508,263.9044,357.5615,262.3174,359.1117,260.1803z M320.1534,240.9476 c-0.0088,0.0196-0.0175,0.0393-0.0263,0.0589c2.1856,0.9853,4.3339,2.0667,6.5655,2.9335c3.4145,1.3262,4.2207,0.8452,4.9738-2.6774 c0.1427-0.6673,0.2624-1.3468,0.3067-2.0263c0.0736-1.1306-0.3822-2.0978-1.446-2.48c-3.0538-1.0975-6.1327-2.1334-9.2383-3.0721 c-0.559-0.1689-1.4116,0.0644-1.9256,0.4121c-2.585,1.7485-2.3897,5.0629,0.3297,6.6218 C319.8416,240.8033,319.9997,240.8715,320.1534,240.9476z M345.9419,243.8758c-1.3754,1.4086-2.2928,2.6801-1.0285,3.5615 c3.5283,2.4594,7.1806,4.7739,10.957,6.8276c1.4582,0.793,3.311,0.4893,4.8013-1.4072 C355.9163,249.4004,351.2603,246.2613,345.9419,243.8758z M300.818,222.2944c4.6307,2.8918,8.4949,5.3086,12.3658,7.7143 c0.2874,0.1786,0.6141,0.3484,0.9413,0.3984c0.9255,0.1416,1.6874-0.1227,2.0598-1.0703c0.6233-1.5858,0.2207-2.8855-1.2339-3.3956 c-2.2594-0.7925-4.5652-1.4553-6.8603-2.143C306.0137,223.1761,303.9813,222.3038,300.818,222.2944z M142.9821,153.0386 c-0.832-3.337,0.5081-5.7334-0.0618-8.2341c-2.7292,0.2602-3.4703,0.7831-3.3112,2.3228 C139.8209,149.1753,140.5,151.0078,142.9821,153.0386z M332.4001,230.7872c1.8874,0.7832,2.8213,1.184,3.7664,1.5557 c0.314,0.1234,0.6911,0.3013,0.9792,0.2258c0.4419-0.1158,1.0519-0.344,1.1833-0.6826c0.138-0.3555-0.0625-1.0464-0.362-1.3295 c-0.8795-0.831-1.9298-1.5114-3.2182-1.167C334.161,229.5467,333.6578,230.0204,332.4001,230.7872z M336.1127,244.1656 c2.7235-0.3051,3.3351-1.6699,3.3672-3.3364c0.0104-0.5403-0.4393-1.3883-0.8928-1.5748c-0.8719-0.3584-1.8163,0.077-2.0567,1.0238 C336.2474,241.3929,336.2658,242.5842,336.1127,244.1656z M187.2209,27.1858c0.1074,0.0911,0.215,0.1821,0.3224,0.2732 c-0.0118-0.0817,0.0037-0.2061-0.0417-0.2352C187.4296,27.1776,187.3166,27.1952,187.2209,27.1858z M167.6885,133.2166 c-0.6805-1.3592-2.0295-1.7893-3.3861-2.146c-4.3429-1.1418-8.6446-2.4954-13.0424-3.3581 c-4.3953-0.8621-8.8771-1.3286-13.3394-1.7907c-4.7238-0.4891-9.3078,0.4647-13.7379,2.0138 c-1.4122,0.4938-2.7386,1.4373-3.8648,2.4431c-0.4534,0.4049-0.4598,1.5791-0.2754,2.3029 c0.0791,0.3106,1.1933,0.5784,1.7826,0.4924c1.1858-0.1728,2.3368-0.5928,3.4977-0.9262 c5.5834-1.6035,11.1958-1.7919,16.9188-0.6978c5.6035,1.0713,11.184,2.1561,16.6076,3.9887 c1.9421,0.6563,4.0155,1.094,6.0545,1.2208c1.0206,0.0634,2.0984-0.7962,3.3101-1.3055 C167.9982,134.4873,167.9739,133.7866,167.6885,133.2166z M239.7775,212.7195c0.3798-0.6506-0.0451-1.9712-0.7193-2.2357 c-1.5396-0.604-6.7702,0.4751-7.7316,1.6683c-0.3001,0.3723-0.4885,0.9403-0.4886,1.4187 c-0.0002,0.4558,0.3122,0.9117,0.4377,1.2387C233.7184,216.159,238.4978,214.9118,239.7775,212.7195z M63.3383,235.3303 c-12.7001-7.8828-26.4318-13.6775-40.1053-19.5948c-2.0652-0.8938-4.0884-1.8938-6.0878-2.9283 c-1.9294-0.9983-2.7105-2.7434-2.3201-4.7893c0.3528-1.8493,0.8954-3.7146,1.6866-5.4185 c2.8439-6.1243,5.8363-12.1794,8.7554-18.269c0.8223-1.7156,1.4886-3.513,2.4033-5.1756c0.9343-1.6981,2.0772-2.0386,3.9487-1.3952 c0.9814,0.3373,1.961,0.7247,2.8704,1.2199c6.3894,3.4782,12.7464,7.0161,19.1415,10.4837 c4.8694,2.6403,9.8001,5.1674,14.6657,7.8146c4.5657,2.484,9.1506,4.9453,13.5972,7.6317c3.4212,2.0668,3.5871,2.707,2.2804,6.3501 c-1.1098,3.094-2.4952,6.0881-3.6913,9.1526c-0.4179,1.0709-0.6352,2.2203-0.9991,3.5318c2.8015,0.6078,5.1552,0.239,7.4172-0.6633 c2.1944-0.8753,3.808-0.383,5.65,1.1593c2.2257,1.8636,4.8137,3.3929,7.4426,4.6551c4.7275,2.2698,5.5432,3.4303,5.1346,8.8017 c-0.0247,0.3246,0.1048,0.6611,0.1744,1.0599c1.7123,1.0693,3.4151,2.2538,5.2265,3.2385c3.8002,2.0657,7.6503,4.0402,11.493,6.0268 c5.8403,3.0193,11.6964,6.008,17.5355,9.0297c1.5374,0.7956,3.0657,1.6165,4.5476,2.5099 c3.4166,2.0596,6.7569,4.2491,10.2116,6.2414c4.504,2.5975,9.0012,3.3381,13.4611-0.2992c0.6691-0.5457,1.9688-0.6183,2.9027-0.4632 c1.1645,0.1934,2.3243,0.7256,3.3608,1.3272c5.4027,3.1357,10.7081,6.4323,15.4847,10.4872 c3.3031,2.804,3.7963,5.0012,1.0987,9.0317c-1.4379,2.1483-3.1224,4.1471-4.8384,6.087c-0.78,0.8818-1.8169,1.6603-2.8921,2.1348 c-3.8038,1.6783-7.678,3.1968-11.5183,4.793c-1.9117,0.7946-3.5879,0.5822-5.3833-0.583 c-4.0703-2.6415-8.2276-5.1576-12.4357-7.5746c-2.8465-1.6348-5.7975-3.1052-8.7759-4.4896 c-7.5692-3.5182-14.586-7.9859-21.7166-12.28c-11.1319-6.7038-22.3952-13.1895-33.6083-19.7581 c-7.1809-4.2065-14.3794-8.3828-21.5545-12.5991C64.7736,239.9791,64.7788,239.931,63.3383,235.3303z M78.614,241.1504 c3.7145,2.2397,7.4239,4.488,11.1446,6.7172c8.027,4.8095,16.6049,8.6614,24.3316,13.9947 c0.5698,0.3932,1.1852,0.7222,1.7894,1.0636c7.0931,4.0089,14.1786,8.0313,21.29,12.0076c1.5092,0.8438,3.1487,1.4527,4.6694,2.278 c7.9113,4.2934,16.4129,7.5159,23.6654,13.0153c0.2707,0.2052,0.8433,0.0121,2.0224-0.0085 c-1.0762-1.0232-1.5736-1.6798-2.2274-2.0829c-1.9185-1.1828-3.9068-2.2517-5.8543-3.3884 c-8.2306-4.8041-16.4562-9.6169-24.6844-14.4249c-0.2995-0.175-0.6061-0.3379-0.9124-0.5009 c-7.7944-4.1471-15.6128-8.2497-23.3771-12.4524c-7.7695-4.2054-15.429-8.6175-23.2546-12.714 c-2.7117-1.4195-5.4212-3.0726-8.5958-3.436c-1.2717-0.8539-2.5024-1.7788-3.8266-2.5415c-1.303-0.7505-2.4393-1.9183-5.1921-2.2067 C73.2533,238.3865,75.435,240.6784,78.614,241.1504z M20.494,207.4434c2.775,2.1795,5.5887,3.1196,8.2715,4.2839 c5.5533,2.4099,11.1794,4.6551,16.7054,7.1249c7.089,3.1683,14.1988,6.3088,21.0158,10.6208 c1.7044-2.8669,4.6917-3.5244,7.5669-4.8833c0.6782-4.5665,4.0437-8.2242,4.8045-13.0921c-1.5441-1.759-3.5268-2.7601-5.5185-3.7892 c-6.602-3.4109-13.211-6.8111-19.7568-10.3278c-6.3958-3.4361-12.7164-7.0121-19.0736-10.5202 c-0.4534-0.2501-0.9233-0.4803-1.4065-0.6645c-2.1038-0.8018-3.3517-0.4254-4.2873,1.5439 c-2.5955,5.4633-5.1355,10.9536-7.6237,16.4666C20.7859,205.1054,20.7555,206.1737,20.494,207.4434z M181.0623,279.9688 c-2.817-2.0723-4.9774-3.7578-7.2384-5.2953c-1.9213-1.3065-3.9339-1.7498-6.3271-0.8854 c-2.0616,0.7447-4.3415,0.8836-6.5234,1.2984c-0.6269,0.1191-1.4617-0.0273-1.4099,1.3805 c2.4369,1.5218,5.0644,3.1183,7.6466,4.7848C171.9012,284.2793,176.209,283.1692,181.0623,279.9688z M93.9618,231.9727 c-2.6538-2.8011-5.6452-4.1199-9.6756-2.8333c-2.2773,0.7269-4.7656,0.7823-7.1498,1.1929c-0.5954,0.1026-1.1558,0.408-1.95,0.7005 c1.3439,2.31,3.5195,2.6779,5.2762,3.6232c1.6716,0.8993,3.3911,1.7305,5.1508,2.4394c1.8323,0.7382,3.4623,2.2467,5.4693,1.9353 C92.1046,236.5256,93.0029,234.3235,93.9618,231.9727z M172.1839,290.8878c1.2237,0.7642,1.639,1.2435,1.9484,1.1829 c3.201-0.6277,6.4283-2.4453,8.1234-4.6411C179.0673,288.5244,176.1889,289.5127,172.1839,290.8878z M203.6629,325.2859 c-6.4961-3.8695-11.7553-6.9097-16.9184-10.1049c-4.7062-2.9125-5.1758-4.5223-2.6933-9.3397 c4.2853-8.3159,8.6948-16.5676,13.035-24.8553c0.5611-1.0715,0.9902-2.2116,1.5342-3.2928c0.543-1.0793,1.0493-2.2009,1.758-3.1674 c1.2242-1.6698,2.7119-1.9821,4.5625-1.1502c0.3157,0.1419,0.6321,0.298,0.9148,0.4954c6.895,4.8152,14.9925,7.2049,22.3537,11.0815 c2.6042,1.3714,5.2959,2.5757,7.9297,3.8921c2.321,1.16,4.6238,2.3573,6.9204,3.565c0.7636,0.4016,1.5321,0.8233,2.2126,1.3472 c1.2883,0.9916,1.6302,2.2126,0.9458,3.6754c-1.1746,2.5102-2.4523,4.972-3.6782,7.4583 c-3.1404,6.3696-6.2465,12.7565-9.432,19.1034c-0.9307,1.8545-2.0134,3.6436-3.1559,5.3774 c-0.8607,1.3062-1.6049,2.5139-1.8544,4.1806c-0.3485,2.3278-2.3014,3.584-4.585,3.0969c-1.6525-0.3527-3.2922-1.0961-4.7492-1.977 C213.2673,331.3494,207.8482,327.8995,203.6629,325.2859z M190.1698,309.2629c5.918,3.4778,11.3175,6.5663,16.6307,9.7966 c5.4354,3.3046,10.8197,6.6845,16.9208,9.2621c1.0676-1.5088,2.069-2.6942,2.8185-4.0218 c4.0003-7.0853,7.978-14.1843,11.8637-21.3328c0.8022-1.4757,1.6167-3.0922,1.0198-5.2018 c-0.9558-0.6992-1.9976-1.6179-3.1766-2.299c-9.9067-5.724-20.4885-10.0799-30.746-15.0943 c-0.1274-0.0623-0.3419,0.0272-0.5068,0.0759c-0.1589,0.0471-0.3063,0.1332-0.4592,0.2019 c-0.228,0.2541-0.5206,0.4742-0.6746,0.7672c-4.0266,7.6653-8.0688,15.3228-12.0251,23.0244 C191.1455,305.7837,190.8283,307.3175,190.1698,309.2629z M49.8268,202.3024c-3.6766-1.8907-7.3659-3.7591-11.0852-5.5638 c-2.1672-1.0517-4.3714-2.0453-6.6222-2.8981c-0.9752-0.3696-2.0931-0.1836-2.6993,0.8991c-0.587,1.0482-0.338,2.1012,0.5616,2.7639 c1.5224,1.1215,3.1681,2.0767,4.7698,3.0893c1.5807,0.9993,3.1712,1.9831,4.7942,2.9967c-0.0647,1.4196-0.274,2.6249-0.1245,3.784 c0.1249,0.9685,0.4048,2.2154,1.0816,2.7546c1.5968,1.2722,3.3821,2.406,5.2581,3.2025c1.9275,0.8183,3.7425-0.1423,4.734-1.9896 c0.876-1.6322,1.7821-3.2483,2.7231-4.9593C53.1046,204.2723,51.5481,203.1875,49.8268,202.3024z M56.4165,214.1224 c-1.2468-0.4465-2.6689-0.5469-4.0069-0.5205c-0.4919,0.0097-1.2118,0.7532-1.3818,1.3007 c-0.1673,0.5384,0.1718,1.2754,0.4068,1.8793c0.1088,0.2798,0.4678,0.5099,0.7649,0.6616c3.373,1.7219,6.7386,3.4602,10.145,5.1139 c1.3549,0.6577,2.883,0.4955,3.8503-0.5838c1.3432-1.4987,3.0045-2.141,4.7974-2.7925c1.4783-0.5371,1.6864-2.4163,0.3534-3.324 c-2.557-1.7413-5.2179-3.338-7.9057-4.8718c-0.4803-0.274-1.5791-0.2064-1.8969,0.1479c-0.5024,0.5598-0.8881,1.5423-0.7766,2.2612 c0.1716,1.1065,0.8059,2.1414,1.3081,3.3629C60.1023,215.8183,58.3191,214.8038,56.4165,214.1224z M212.9315,297.7317 c-0.8807,3.7119,1.3114,5.8627,3.9587,7.7092c1.9423,1.3548,3.4957,1.3443,5.1554-0.2656c1.2669-1.2288,2.5717-2.1136,4.2327-2.7561 c3.0039-1.1618,3.2223-3.4756,0.6784-5.4215c-0.5442-0.4162-1.1596-0.7484-1.769-1.0683c-2.2888-1.2012-4.5658-2.4283-6.8899-3.5579 c-3.0998-1.5068-6.2192-2.9787-9.3838-4.3413c-0.4807-0.2069-1.577,0.0614-1.8117,0.4545 c-0.3835,0.6423-0.5642,1.6613-0.3274,2.3481c0.2505,0.7271,1.0165,1.3492,1.6852,1.8448c1.3767,1.0204,2.8385,1.9262,4.4198,2.9823 C212.9152,296.7182,213.0449,297.2538,212.9315,297.7317z M210.6833,312.6718c1.4711,0.9187,2.8967,1.9248,4.4293,2.7261 c1.0601,0.5541,2.2452,0.9238,3.4162,1.1961c1.2026,0.2795,2.6529-0.5511,2.9599-1.5946c0.347-1.1794-0.2612-2.1176-1.2043-2.6125 c-3.8297-2.0099-7.6909-3.9645-11.5945-5.8263c-1.0162-0.4847-2.0564-0.0708-2.6515,0.9914 c-0.6069,1.0835-0.2211,2.2916,1.002,3.097c1.1581,0.7627,2.3492,1.4756,3.5258,2.2103 C210.6052,312.7968,210.6443,312.7343,210.6833,312.6718z"/></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 359.6065 429.2505" xml:space="preserve"><path fill="${color}" d="M227.9258,317.5579c-0.9414-1.0642-1.4087-2.428-1.3164-3.8412c0.1919-2.9175,2.7466-5.1487,5.6763-4.9471 c9.3633,1.0255,18.835,1.0264,28.1748,0.0019l0.5547-0.0611v0.2132c0.4741-0.1153,0.9604-0.1628,1.4585-0.1483 c1.4233,0.0514,2.7417,0.6484,3.7114,1.6836c0.9702,1.0342,1.4766,2.3815,1.4253,3.7937c-0.0513,1.4132-0.6533,2.7217-1.6958,3.6841 c-1.0425,0.9625-2.4082,1.452-3.8232,1.4142c-5.0356,0.5505-10.1255,0.8258-15.2236,0.8258c-5.1011,0-10.2114-0.2753-15.2856-0.8277 C230.1627,319.2551,228.8648,318.6192,227.9258,317.5579z M75.7032,316.6846l0.0898,0.0233 c2.9043,0.4701,5.7671,0.6174,8.585,0.6174c2.4004,0,4.7686-0.1066,7.0996-0.2122c3.689-0.1657,7.1743-0.3237,10.5908-0.064 c2.9492,0.222,5.5088-1.9763,5.7295-4.8938c0.1069-1.4122-0.3472-2.7818-1.2783-3.8567c-0.9312-1.0739-2.228-1.7234-3.6514-1.83 l-0.5376-0.0398v0.1939c-3.7949-0.2472-7.5728-0.0775-11.231,0.0892c-4.791,0.2181-9.3179,0.4236-13.6904-0.2927 c-2.9385,0.0611-5.2803,2.4832-5.2202,5.3997C72.2339,313.9891,73.646,315.945,75.7032,316.6846z M359.6065,16.628l-4.4482,146.3097 c-2.7891,91.6784-4.189,137.6949-4.9277,160.6703c-0.6978,21.7066-0.7515,23.1411-1.1289,23.4716 c-1.5776,3.0348-5.8687,3.3449-18.3794,4.2521l-1.3286,0.0969l-5.2012,0.0572c-20.9473,0.2288-21.084,0.2307-50.7686,0.2307 c0.7827,4.7504,1.3369,9.5869,1.6484,14.3848c1.0942,9.5162,1.5176,19.2185,1.2568,28.8141 c0.252,9.2012-0.335,18.507-1.7446,27.6326c-0.8779,3.813-1.9224,6.7024-6.6782,6.7024c-3.1758-0.0184-6.1489-1.2629-8.375-3.5049 l-0.105-0.156c-2.7197-6.431-4.6812-13.179-5.8296-20.0569c-3.3862-13.4601-5.7798-27.3264-7.106-41.1751 c-0.7427-4.1649-1.1797-8.4597-1.2954-12.7361H111.816c-0.2383,6.274-0.9009,12.5849-1.9707,18.7668 c-1.4741,12.8834-3.8672,25.8114-7.1099,38.3982c-0.9761,5.171-2.481,10.3003-4.4653,15.2135 c-1.1982,2.1208-4.2803,3.8518-7.5225,4.2677c-2.5386,0.3228-4.6533-0.2307-5.9575-1.5663 c-6.7715-6.8711-2.9136-63.6745-1.0981-75.3677H49.4273c-0.147,0.0049-16.1909,0.4459-22.9399,0.2627 c-1.3945-0.0359-3.2261,0.0756-5.1621,0.1977c-5.7969,0.3615-13.0112,0.8132-16.3052-2.1915 c-1.145-1.0449-1.7441-2.4425-1.7803-4.1513c-0.1846-8.7766-1.4604-74.9538-1.4604-74.9538l-0.0439-0.5195 c-0.1597-1.9347-0.3174-3.8703-0.4648-5.8059c-0.1411-1.8561-0.2734-3.7113-0.3906-5.5674c-0.1216-1.925-0.228-3.8499-0.3179-5.7758 c-0.0996-2.145-0.1797-4.2899-0.2456-6.4359c-0.0762-2.5143-0.1318-5.0285-0.1743-7.5428c-0.0513-3.0338-0.0835-6.0676-0.105-9.1004 c-0.0264-3.7045-0.0361-7.4081-0.0371-11.1106c-0.001-4.5235,0.0112-9.0461,0.0308-13.5696 c0.0229-5.4938,0.0566-10.9875,0.0957-16.4813c0.0474-6.6142,0.1021-13.2275,0.1611-19.8427 c0.0698-7.8849,0.1455-15.7699,0.2241-23.6548c0.0923-9.3059,0.1885-18.6117,0.2861-27.9185l0.98-91.406 c0.02-1.8571,0.0034-3.7142-0.0132-5.5713c-0.0234-2.6684-0.0479-5.4279,0.041-8.1466c0.0796-2.4387,0.2529-4.6786,0.5298-6.8468 C2.5069,3.8599,2.9273,1.9679,4.585,0.956L4.5626,0.9037l0.2881-0.1522l0.0586,0.0339c3.2207-0.9848,6.5386-0.8248,9.7529-0.6688 c0.8804,0.0426,1.7617,0.0853,2.6416,0.1047l9.5542,0.2191c0.0894,0.0019,0.29,0.0155,0.5693,0.0339 c1.1328,0.0746,4.1431,0.2714,5.1748-0.0107l0.0967-0.0271l0.0991,0.0126c1.6431,0.2045,3.3496,0.1347,4.9985,0.0669 c0.9746-0.0388,1.9844-0.0824,2.98-0.0669l66.9771,2.0015c0.4619,0.0572,0.874,0.0989,1.2686,0.126 c1.1655,0.0824,2.3608,0.0998,3.5166,0.1163l1.1157,0.0184c0.5625,0.0107,1.0908,0.0204,1.6138,0.0698 c0.4414,0.0504,0.8701,0.0116,1.2788-0.1115l0.0786-0.0233l0.082,0.0019l16.8901,0.506 c16.7334-0.4827,93.2969,0.5389,139.0415,1.1486c14.7114,0.1958,26.6626,0.3547,33.2007,0.4207 c6.3618,0.0649,12.5601-0.2094,18.5557-0.474c14.521-0.6387,27.063-1.1922,32.354,3.9381c1.9067,1.8493,2.8037,4.2948,2.7422,7.4749 c0.0259,0.2695,0.0605,0.5379,0.0947,0.8074L359.6065,16.628z M11.1221,344.8464c0.3418-0.0068,0.9038-0.0107,1.6562-0.0107 c1.6675,0,4.271,0.0155,7.4902,0.0339c9.4229,0.0572,25.1953,0.1483,39.4785-0.0233c12.7295-0.3024,39.0049-0.5137,91.3535-0.9334 c40.5967-0.3257,96.1963-0.7715,173.8076-1.4839l2.9258-0.2016c5.9072-0.4023,9.8101-0.6678,13.9565-1.3269l0.0156-0.002 c0.1504-1.355,0.2393-6.4088,0.4878-20.528c0.1611-9.1847,0.3926-22.3346,0.7568-41.1548 c-14.394-0.1144-316.1396-3.1501-336.5337-6.8294v3.7326l-0.0947,0.0174c0.0107,3.1259,0.562,17.1288,1.0962,30.6926 c0.5,12.6973,0.9722,24.6899,0.9722,27.0268l-0.001,0.7454c-0.0068,3.7132-0.0151,8.3337,1.4912,9.8002 C10.2989,344.7107,10.6749,344.8503,11.1221,344.8464z M186.3506,130.1884c-9.749,3.6405-21.4844,3.5969-31.9121,0.566 c-10.0088-2.9087-18.3979-8.3696-23.6221-15.3763c-5.9697-8.008-7.6118-17.7093-4.7476-28.0562 c2.2661-8.5256,6.9888-16.0771,13.6729-21.8713c-2.0288-1.7834-3.4082-4.2221-3.8921-6.8653 c-15.5903,14.3509-21.7695,31.3953-17.4043,48.085c4.2983,16.4328,18.6743,29.7233,36.6255,33.8592 c11.231,2.7081,22.8823,2.0917,33.7432-1.7757c-1.0029-1.4704-1.8379-3.0503-2.4863-4.7048 C185.8672,132.7143,185.3599,131.2429,186.3506,130.1884z M162.3804,73.9112v-0.1367c-4.6479-1.4471-7.7891-5.6275-7.8838-10.4321 c-8.2217,3.2267-14.9941,9.1556-19.2437,16.8331c3.9214-1.3347,8.208-1.0633,11.9565,0.7929c2.083,1.3608,3.478,2.9369,4.708,4.3277 c1.8164,2.0539,3.251,3.6754,5.9385,3.6754c1.769-0.1531,3.5698,0.031,5.313,0.5476c3.7563,1.7737,6.2632,5.2166,6.7778,9.2351 c0.8843,6.6617-5.248,12.0082-10.7681,14.5622c-1.4424,0.5564-2.4893,0.8374-3.2534,1.0429 c-0.5342,0.1434-0.9561,0.2569-1.3047,0.4032c-1.8994,0.8161-2.0874,2.6218-2.3252,4.9083 c-0.1206,1.1592-0.2451,2.3572-0.6133,3.5552c-0.0186,0.1619-0.0635,0.3179-0.1348,0.4633c-0.0977,0.2045-0.2393,0.38-0.4141,0.5156 c9.1626,3.8819,20.1177,5.2447,29.9736,3.2373c-0.478-0.7899-0.8765-1.6264-1.1895-2.4949 c-1.2705-3.5252-1.0811-7.3305,0.5327-10.7152c1.6138-3.3837,4.459-5.9416,8.0112-7.2026c1.4575-0.4439,2.8496-0.629,4.1953-0.8064 c2.0884-0.2772,3.8921-0.5156,5.3301-1.6138c0.9458-0.7221,1.7627-1.6691,2.5527-2.584c1.209-1.4006,2.457-2.8467,4.2354-3.6018 c0.5776-7.5631-1.1016-14.9857-4.8696-21.5583c-0.8159,2.2991-2.541,4.226-4.7803,5.2825 c-5.6938,2.9213-9.1982-0.7405-12.2891-3.9711c-1.8237-1.9075-3.5464-3.7084-5.5684-4.1436 c-1.6509-0.2782-3.3901-0.0165-5.2314,0.2598c-2.6865,0.4052-5.7334,0.8617-9.3081-0.2714L162.3804,73.9112z M197.941,73.6931 c-3.4424-4.414-8.0508-7.7473-13.3467-9.6519c-4.1777-1.3453-8.5088-2.3873-12.8569-3.0929 c-4.667-0.4769-9.3442-0.0698-13.8813,1.2174c0.1445,2.2904,1.3643,4.3617,3.3125,5.5936c3.5474,2.1217,6.8188,1.5944,10.2847,1.039 c1.5317-0.2472,3.0918-0.4982,4.6816-0.4982c1.4004,0,2.8232,0.1948,4.2715,0.7589c2.9761,1.1592,4.895,3.4409,6.5879,5.453 c2.0791,2.4726,3.7202,4.4256,6.5449,3.4583l0.3506-0.1309C195.6451,77.1912,196.1514,77.0041,197.941,73.6931z M184.5294,126.6457 c11.4111-3.4428,17.4116-10.1859,19.6543-22.2503c-0.8799,1.4888-1.8633,2.9184-2.939,4.2715l-0.1089,0.1018 c-3.0376,2.0771-6.5859,3.3149-10.2656,3.5804l-0.127,0.0514C185.1446,114.7277,182.4234,121.0473,184.5294,126.6457z  M148.8638,115.5487c0.6968-3.3362,3.2212-4.4915,5.6626-5.6091c0.6548-0.2995,1.332-0.6097,1.979-0.9605 c3.3599-1.8232,7.959-5.8553,7.6646-9.1101c-0.2808-1.6788-1.1372-3.2819-2.4067-4.4799c-0.7036-0.504-1.6245-0.7589-2.5591-0.6804 c-2.4756,0.3247-5.0166-0.2501-7.1279-1.6128c-2.2344-1.388-3.6689-3.1918-4.9346-4.7823c-1.3169-1.6555-2.4541-3.0852-4.2319-3.91 c-3.272-1.0478-6.8442-0.8442-10.0259,0.5883c-4.3906,11.0079-3.0874,21.0572,3.7729,29.0729 c3.124,3.6502,7.314,6.715,12.104,9.0597c-0.0083-0.1919,0.021-0.3877,0.0923-0.5757c-0.0039-0.7764-0.0571-1.5421-0.1084-2.2826 C148.6343,118.6726,148.5303,117.1683,148.8638,115.5487z M95.9156,139.4584c-16.2954,0.3547-28.6753,0.5738-37.7393,0.7337 c-25.9834,0.4594-28.106,0.4972-30.3779,2.0451c-3.1128,1.4384-4.5327,4.9248-3.3423,8.0187 c0.623,0.0989,3.3896,0.1812,11.9712,0.4352c9.6821,0.2869,27.6562,0.819,59.8506,1.891L95.9156,139.4584z M25.856,126.5459v-0.0058 c-3.3643,2.6839-2.2012,6.0986-1.7339,7.1347c0.9629,2.1372,2.9038,3.5523,4.3228,3.1675 c5.6606-1.2697,11.4517-1.9191,17.2339-1.9356c10.0894-0.7202,20.3633-0.9285,30.5-0.6232 c11.9082,0.2724,13.6963,0.2869,16.2056,0.2879c0.4238-3.8887,0.2886-7.8055-0.4028-11.6563 c-12.7324,0.3344-22.8491,0.5835-30.9126,0.7822c-31.5283,0.7744-31.5283,0.7744-33.7764,2.0665 c-0.208,0.1192-0.4341,0.2491-0.7007,0.3906L25.856,126.5459z M217.6856,13.725c-23.8291,0-42.4678,0.0252-57.4585,0.0446 c-61.6323,0.0824-61.6294,0.0804-107.2026-2.0132c-10.9185-0.5021-24.4526-1.1234-42.0781-1.8939L6.629,149.4514l13.2969,0.44 c-1.1748-4.3568,0.585-8.9085,4.3599-11.3704c-0.5918-0.2665-1.1499-0.6009-1.667-1.0003 c-0.9634-0.8394-1.7275-1.8174-2.2944-2.9243c-2.4541-4.793-0.522-10.6735,4.3071-13.1092 c2.9961-1.6758,6.4194-2.5937,9.8813-2.6441c19.2109-1.3909,38.7354-1.6167,58.0044-0.6698 c1.4634,0.2249,2.6089,1.2523,2.9707,2.6228c0.688,4.6447,0.5029,9.2603-0.5391,13.7771c1.3389,0.1124,1.9712,0.1716,2.3071,0.2035 c0.3506,0.033,0.3506,0.0339,0.5508,0.0339l0.1914,0.0378c2.3594,0.9693,2.0981,3.9749,1.5776,9.964 c-0.1826,2.1004-0.4072,4.6873-0.5674,7.7085l66.3941,2.2119c-0.7969-2.4755-0.7954-5.1264,0.0044-7.6019 c-0.1821,0.0019-0.3638,0.0029-0.5454,0.0029c-27.1108,0.0019-49.8662-19.8786-53.2026-46.7203 c-1.3228-18.4983,7.4761-33.9638,27.6885-48.6985c0.0981-0.0775,0.6943-0.5108,1.3164-0.3964 c0.3184,0.0572,0.5815,0.2452,0.7607,0.5418c0.5991,0.9896,0.3657,1.2009-2.4941,3.7782l-0.4282,0.3867 c2.5386,0.8345,3.7915,3.1927,4.8193,5.1274c0.1772,0.3334,0.3496,0.6581,0.5229,0.9644c2.1699-1.6332,4.564-2.9281,7.126-3.8509 c10.6953-4.3326,22.4966-4.3316,33.2104,0.0068c8.6143,2.6732,15.7246,8.7107,19.9819,16.9863 c5.1821,10.0735,5.6675,22.6342,1.3667,35.3683c-2.8823,9.1983-9.311,15.3279-17.3027,18.8036 c0.0776,0.0107,0.1558,0.0252,0.2349,0.0446c1.8604,0.4585,3.6494,3.4913,4.9556,5.706c0.2554,0.4323,0.4863,0.8239,0.6841,1.1369 l1.9097-1.105c1.0752-0.7318,1.6958-1.2019,2.1069-1.513c0.7471-0.5651,0.8706-0.6387,1.5684-0.5932 c0.1719,0.0107,0.4014,0.0242,0.731,0.0242h0.5v2.0209l-0.1758,0.1483c-8.5352,7.2074-19.3599,11.35-30.5498,11.7048 c0.8052,2.5618,0.8042,5.3115-0.0029,7.8723l44.667,1.6826L217.6856,13.725z M213.0245,248.5417 c0.2363-8.417,0.3608-14.6397,0.3711-18.5158c-8.4839,0.0785-71.0049,1.859-74.4487,4.6786 c-2.1841,1.8057-3.377,3.8208-3.5439,5.9861c-0.3052,3.9565,2.7773,7.4226,4.0938,8.9026c0.1265,0.1425,0.23,0.2588,0.3145,0.3577 c0.7627-0.3421,1.5518-0.63,2.3511-0.8588c9.1055-1.1854,18.3037-1.8774,27.4165-2.0713v-0.1434l0.4893-0.0107 C184.3536,246.5616,198.8013,247.1266,213.0245,248.5417z M136.796,267.4937l75.8857,1.8969l0.3687-18.3045l-6.8472,0.2239 c-59.9858,1.9637-62.3271,2.0403-65.375,3.9536C136.7149,257.8874,135.0499,262.9886,136.796,267.4937z M180.8043,225.549 c10.9673,0,21.9346,0.2888,32.8208,0.8665c0.061-1.1127,0.0967-3.3158,0.1587-7.1531c0.0498-3.09,0.1172-7.2753,0.23-12.9047 c-11.0688,0.4488-20.0884,0.787-27.4624,1.0643c-32.8604,1.2348-32.8604,1.2348-35.9951,4.162 c-0.5957,0.5428-1.0884,1.1137-1.5083,1.7369c-2.8618,4.2551-1.7461,10.0144,2.4736,12.9173 C161.2413,225.7787,171.0235,225.549,180.8043,225.549z M213.8897,203.5148l0.8491-42.9227H7.1407l-0.1826,19.738 c5.9824-1.325,12.1001-1.6351,18.2002-0.9247c0.5508,0.1328,0.979,0.4245,1.2681,0.8316l0.0659,0.1289 c0.9897,2.9562,1.5166,6.0278,1.5674,9.1391c5.3701-1.0642,10.8603-1.4723,16.3281-1.2135 c-0.1152-0.945-0.2188-1.7641-0.3086-2.4765c-0.5986-4.7465-0.6343-5.0305,0.5869-5.8892l0.1025-0.0717l0.1245-0.0155 c7.7593-0.9654,15.645-1.1282,23.4375-0.4817l0.1299,0.0107l0.1079,0.0717c0.832,0.5564,1.3521,1.4442,1.4268,2.4367 c0.7026,5.9735,1.061,12.0663,1.0654,18.1029c5.8677-1.3996,11.8862-1.8358,17.9019-1.2988 c2.5596,0.6446,2.7896,2.4047,3.1079,4.8414c0.7427,4.384,1.1514,8.8784,1.2119,13.3399 c1.3452,16.427,1.3594,33.1167,0.0405,49.5825c10.7983,0.2656,18.7246,0.472,24.5327,0.6232 c9.458,0.2462,13.499,0.3499,14.8809,0.3179c-2.0732-5.6682-0.2974-11.9907,4.3711-15.7825 c-3.6631-1.515-7.4453-5.9619-7.7363-10.9032c-0.1753-2.9805,0.9136-8.5479,10.1777-12.3503 c2.416-0.8588,4.9097-1.3928,7.4424-1.5983c-2.0161-2.1236-3.2988-4.8376-3.645-7.755c-0.8857-7.4662,4.5132-14.2559,12.0356-15.135 c10.2686-1.2814,20.73-1.8697,31.0801-1.7301C195.5836,202.0968,204.8121,202.5688,213.8897,203.5148z M70.0323,266.4702 l19.8652-0.2733c-0.1504-4.1387-0.5742-12.7332-1.4604-30.6877c-0.418-8.4772-0.9419-19.0886-1.5933-32.3985 c-5.2378-0.7056-10.5566-0.8423-15.8208-0.4052l0.0347,1.4723c0.8574,36.3472,0.8574,36.3472-0.0757,51.4163l-0.2129,3.4506 C70.6485,261.5182,70.4004,264.015,70.0323,266.4702z M27.0626,266.9965l19.0337-0.3179 c-0.0312-3.9323-0.4204-14.2171-1.5947-45.2411l-1.0928-28.9256c-5.1265-0.7008-10.3242-0.7764-15.4683-0.22 C30.1807,217.1077,29.8853,242.2377,27.0626,266.9965z M50.6544,236.3533c-0.0269,2.239-0.0571,4.8114-0.0781,7.944 c0,3.0396-0.4341,15.8532-1.1909,22.3637l17.6279-0.2724c0.25-3.498-0.2373-18.8366-1.2495-50.701 c-0.2915-9.1828-0.6279-19.7777-1.0059-31.9313c-1.1992-0.1938-4.0479-0.1958-17.0015-0.1958 C50.8311,221.4975,50.814,222.9397,50.6544,236.3533z M6.6993,182.6873L5.3096,235.101c0.2666,7.9508,0.4478,13.5803,0.5801,17.688 c0.3057,9.4871,0.3496,10.8586,0.5913,14.3634l0.27-0.0252c1.8691-0.1803,4.1914-0.4032,17.5103-0.409 c-0.0151-2.3379-0.1987-15.3133-1.9692-84.0309C17.1163,182.0457,11.8741,182.0457,6.6993,182.6873z M309.3145,238.8976 c0.3896-10.5591,0.9277-25.131,1.6685-45.5426c-0.0361-1.5527-0.1758-3.1385-0.416-4.698 c-17.354-1.4025-34.9263-1.165-52.2393,0.7047l-0.2119,2.9911l-0.3267,7.9208c-0.4194,10.2334-0.4194,10.2334-1.9595,42.4196 l-1.313,27.4417c6.6284,0.1657,11.8906,0.2927,16.1562,0.3964c18.2524,0.441,18.2524,0.441,28.7808,1.1118 c2.3335,0.1493,5.1851,0.3305,8.8687,0.5573l-0.0005-0.0349C308.2886,266.6873,308.2886,266.6873,309.3145,238.8976z  M297.3106,167.9556v-2.6325c0-11.8696,0.1387-18.2899,0.2397-22.9792c0.2124-9.836,0.2842-13.149-1.2056-44.1265 c-0.8438-17.595-2.6338-25.6689-3.4238-27.4368c-3.6772,4.1756-6.5601,17.6134-8.5737,39.9732 c-1.666,18.5342-4.8198,61.7021-3.5439,71.3821h15.4531C295.962,177.3739,296.316,172.6061,297.3106,167.9556z M276.5679,182.3326 c2.1499-14.5719-24.021-113.0641-35.4028-138.8678c0.3286,23.491,8.627,124.2455,17.5864,140.1656 C264.6417,182.8512,270.6314,182.415,276.5679,182.3326z M312.9869,182.3365c4.2812-11.7019,7.2632-23.8787,8.8696-36.2096 c1.0059-6.0491,1.7607-10.3963,2.3545-13.8178c2.186-12.5975,2.186-12.5975,4.4272-37.9717l1.187-13.4 c0.8359-6.1354,1.2998-12.3522,1.3857-18.5342c-7.4868,19.1177-14.0059,38.8169-19.3906,58.6005 c-3.7773,10.8906-6.5654,22.1544-8.2979,33.5092c-1.2188,6.6394-2.0269,10.0832-2.5098,12.14 c-0.3198,1.3618-0.48,2.0442-0.48,2.5055c-0.5469,4.3665-0.7158,8.7485-0.5068,13.085l0.5503,0.0145 c4.9272,0.1173,9.6934,0.3644,12.4067,1.2174C312.8629,183.1778,312.838,182.7978,312.9869,182.3365z M343.4107,274.3105 l5.8828-256.91c-0.167-0.7822-0.7559-2.9165-6.8516-2.7556c-2.1055,0.0446-4.5273-0.2598-7.2139-0.9198H227.9503l-10.6836,255.7867 l34.1572,0.8384c0.2642-16.9824,0.4673-30.4861,0.6289-41.2304c0.6313-42.0048,0.6313-42.0048,1.2529-42.9033l0.0688-0.1037 c0.5957-0.7609,1.3677-1.3027,2.2354-1.5935c-11.2388-20.9302-22.5801-134.6437-19.8843-147.5601 c0.0278-1.0458,0.5693-2.0878,1.4751-2.776c0.8037-0.6087,1.7969-0.8733,2.8003-0.7376c1.002,0.1328,1.8916,0.6455,2.5054,1.4423 c5.373,5.4569,14.4688,35.8568,19.4087,53.4886c6.894,24.7995,12.0122,47.642,15.2441,68.0188 c-0.0312-1.0439-0.0615-2.1876-0.0903-3.4312c0.0649-1.8164,0.126-4.0757,0.1963-6.6986 c0.6147-22.829,1.8931-70.3314,12.3022-79.4609c1.3574-1.1902,2.8447-1.7098,4.4268-1.5654 c2.854,0.3673,4.0654,3.2703,4.8765,6.0627c1.4194,5.6295,2.2529,11.4072,2.4829,17.1879 c1.1611,10.8131,1.5518,21.8384,1.1597,32.7377c0.0005,8.798-0.1699,13.8149-0.311,17.4583 c3.4478-16.4726,8.0278-32.8153,13.6396-48.6636c3.6865-13.0288,8.3267-25.9558,13.7812-38.3924l0.1997-0.4013 c0.7085-1.4238,1.3779-2.7692,2.9424-3.3207c1.5703-0.4934,3.2603,0.3557,3.7812,1.892c0.6401,4.4954,0.7222,8.9724,0.2651,13.3942 c-0.3882,15.828-1.9346,31.8063-4.5942,47.454c-1.2891,13.8304-3.6177,27.7276-6.9155,41.2691 c-2.0537,10.7966-5.3149,21.4148-9.6885,31.5349c-0.2617,0.4071-0.6289,0.6717-1.0176,0.7783 c0.1416,0.1066,0.2632,0.2191,0.3628,0.3373c3.3608,3.6599,1.6274,24.8576-2.5596,76.0714l-0.9565,11.7213L343.4107,274.3105z"/></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 317.4577 242.9929" xml:space="preserve"><path fill="${color}" d="M314.5677,233.1166c-1.36,6.7083-1.987,2.3113-163.1255,6.1232c-20.4916,0.4864-12.8179,2.3538-14.382-78.1738 c-0.4229-21.9565-0.5919-113.9833-0.3662-153.352c0.0419-7.6596,4.6503-4.7564,31.0044-6.0813 c11.26-0.5709,140.0908-2.2194,145.2276-1.4161c2.6356,0.4155,3.9389,2.2127,4.1152,4.9888 c1.2472,20.3221-0.5215,218.2998-2.466,227.9112H314.5677z M146.2062,213.1046c2.9667,1.36,66.7165-75.4186,92.2032-81.4506 c1.4309-0.3378,1.0499-1.3458,1.0222-2.212c-0.5567-17.0034,0.1547-34.0068-0.1128-51.0029 c-0.1412-9.0757,2.9525-11.7958,11.4011-8.1386c9.7452,4.2139,16.6224,0.0986,22.9503-1.5431 c5.4044-1.402,2.8187,1.7336,3.516,15.7698c0.2682,5.4191-4.6362,6.9623-10.0411,7.4203 c-19.7722,1.6769-23.6617-6.5252-23.5705-0.0986c0.9303,68.2732-3.9599,17.7291,31.4131,57.6119 c9.7033,10.9363,8.5338,18.229-2.4944,7.2157c-15.3894-15.3542-24.7468-27.7986-44.8297-13.1909 c-24.5921,17.8838-56.2444,53.9473-76.0031,71.0426c-4.1997,3.6288-6.3772,7.0042-5.1793,12.5497 c1.156,5.3199,0,1.8249,157.1294,0.3101c5.5597-0.0567,1.1978-1.2053,2.7626-46.8451c0.1406-4.1855-0.9513-5.4259-4.3834-6.8211 c-9.7946-3.9815-18.9054-3.6078-27.8824,2.3539c-20.7944,13.8037-32.4772,28.1222-35.275,25.2616 c-3.9037-4.0024,27.4952-28.3836,32.6462-31.5118c13.0854-7.9555,21.7808-7.371,32.5623-2.7059 c3.868,1.6769,2.3391-1.6424,2.3816-8.1811c1.0567-157.6226,1.1763-148.6172-0.8249-148.5185 c-13.1768,0.6554-123.2705,2.4241-123.4191,2.4241c-36.8952,0.352-36.6628-1.6282-36.4513,4.4672 c0.7047,20.2937,0.4655,62.6432,0.4655,195.8001l0.0142-0.0068H146.2062z M273.3674,73.8448 c-2.7058,0.6412-13.2901,6.1867-25.7129-0.2817c-4.7915-2.4944-4.6294-2.2269-4.4111,9.9425 c0.0142,0.8385-0.3945,1.8606,1.1202,2.114C275.5025,90.8131,273.3674,86.7256,273.3674,73.8448z M180.2266,47.8526 c17.9547-0.0777,17.9405,27.6925-1.0777,27.5587C161.4199,75.2844,161.857,47.9303,180.2266,47.8526z M179.6563,68.6747 c10.9924-0.0068,9.604-15.0935-0.254-14.903C169.5443,53.9549,170.6225,68.6821,179.6563,68.6747z M0.6685,7.7701 C-1.2057,1.0902,4.1,2.8448,91.7373,2.6333c13.4449-0.0284,15.2907,0.4371,15.3333,5.0949 c0.8527,100.6654,3.3612,101.7721-3.77,101.8004C1.8805,109.9793,1.19,112.9743,1.3171,105.3992 c0.0142-0.9371,0.352-94.0989-0.6412-97.6359L0.6685,7.7701z M30.3412,60.8019c-3.516-12.4653-3.6713-12.6058,5.5172-13.8672 c3.5024-0.479,0.4581-1.987,2.9667-16.8906c0.7891-4.7071,4.9118-2.4876,9.0763,0.6128c2.4377,1.8113,2.4099,3.6855-0.5216,4.4395 c-5.1368,1.3175-6.236,4.5801-5.6584,9.1466c0.0703,0.5635-0.7682,2.4661,1.8884,2.4802 c12.4936,0.0913,13.1909-0.127,12.1693,5.4327c-1.4938,8.1102-2.6498,8.519,4.8057,7.6454 c20.4491-2.4025,1.3033,11.8592-29.6586,6.7927c-8.5689-1.4019-23.2604-4.7213-22.9361,4.5801 c1.106,31.7233-1.7336,32.1536,4.7071,32.0827c88.088-1.0216,88.1157,1.4445,87.9893-3.5727 c-0.86-34.3515,3.868-28.7634-8.3223-32.4347c-4.9888-1.5006-9.8581-4.2139-15.4036-2.5086 c-4.0443,1.2472-2.5931-10.8938,23.3732,0.0845c0-54.4899,1.4303-54.8283-2.3532-54.7155 c-21.7808,0.6344-22.6618,0.648-86.4394,0.8668c-4.5517,0.0142-4.6226-0.3385-3.7274,47.4863 c0.0845,4.6645,2.6282-0.6837,13.0361,1.1763c2.9944,0.5357,6.0246,0.754,9.5054,1.1769L30.3412,60.8019z M31.8844,50.8877 c-0.3946,1.3317,0.3736,2.2262,0.6412,3.2201c2.0228,7.6312,2.0154,7.7933,9.9148,7.6034c9.4844-0.233,7.8353,0.3378,8.6811-8.1669 c0.4858-4.8766-6.2995-0.4513-19.2296-2.6498L31.8844,50.8877z M29.0305,80.8762c0.8736,2.1985,1.8742-0.6769,8.6811,0.4087 c10.535,1.6837,24.5921,5.7286,37.114-0.2682c9.5479-4.5659-1.2472-2.9593-32.7029-3.516 C37.9934,77.4305,27.5016,77.0359,29.0305,80.8762z M77.7924,26.6526c0.1128,5.6583,8.4413,6.257,8.9345-0.4087 C85.7195,20.1977,77.6796,20.9943,77.7924,26.6526z M34.4213,135.7045c60.9164,1.0641,72.1628-4.749,72.2054,5.3624 c0.1479,35.7115-0.275,0.0425,1.0074,90.554c0.1831,13.0362-2.2268,10.5843-9.9141,10.6971 c-30.7936,0.4439-70.2609,0.479-71.7756,0.4507c-23.3732-0.4371-24.8603,2.5789-25.0434-5.1651 c-1.3458-55.0121,0.5425-92.3721-0.6128-96.586c-1.6843-6.1725,3.3045-5.8557,34.14-5.3199L34.4213,135.7045z M7.4612,189.3707 c3.3896-2.4525,6.3562-4.9185,10.0695-5.0949C37.3171,183.3671,46.4495,197.7627,39.1,195.55 c-3.4882-1.0499-6.9758-2.1418-10.4782-3.1633c-13.1206-3.8193-21.2734,0.352-21.1464,5.5314 c0.9513,38.537-1.5857,38.1917,4.7354,38.1073c88.1021-1.1418,88.0738,1.4587,88.0035-3.5727 c-0.148-10.6404-0.106-21.2592-0.2115-31.8996c-0.0284-3.1639,1.4161-7.3143-0.4655-9.2304 c-2.0573-2.0931-24.6907-6.011-34.9008,6.9475c-1.8465,2.3397-4.0024,0.2115-3.347-1.8742 c2.6775-8.498,18.8351-17.6723,36.3669-12.0423c3.5727,1.1486,2.2829,4.5943,2.2404-39.0585c0-3.8544-0.0703-2.0857-29.3411-1.8606 c-63.1013,0.4932-62.7703-1.4722-62.9534,3.1923c-0.5641,14.0294-0.8107,28.052-0.127,42.7299L7.4612,189.3707z M27.3536,218.9997 c4.6504,3.8896,2.5579-10.408,25.163-8.1811c8.8081,0.8668,17.9122,10.7884,19.6316,9.1466 c1.3952-1.3391-6.4968-15.3333-21.9146-16.3129C31.8918,204.1947,24.2322,216.3924,27.3536,218.9997z M32.8147,179.0447 c1.987,2.9383,7.3636-7.4765,22.9078-0.0284C57.9776,165.4728,28.1637,172.1811,32.8147,179.0447z"/></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 284.6681 486.6373" xml:space="preserve"><path fill="${color}" d="M262.3694,0.816h-0.0024c-21.2974-4.0859-40.0596,7.1865-55.7622,33.5039l-0.3184,0.5117 c-0.0405,0.0654-0.0742,0.1299-0.1475,0.2852c-0.1689,0.3467-0.3374,0.6924-0.5249,1.0234c-0.0581,0.1006-0.126,0.1953-0.2231,0.334 l-1.4897,2.3447l0.2305,0.0166c-14.9492,27.1035-21.9233,57.9228-28.0562,85.1904h-0.1392l-0.1777,1.3398 c-0.0854,0.6426-0.1909,1.1387-0.3447,1.6182l-0.0459,0.1562c-0.355,1.4727-1.4727,6.7666-2.0938,9.8525l-0.085-0.0049 l-0.1714,1.4316c-0.0322,0.2676-0.0767,0.5381-0.127,0.8418c-0.0254,0.1504-0.0654,0.2949-0.1128,0.4414 c-0.1299,0.4004-0.2202,0.792-0.3125,1.2285l-0.0225,0.168c-0.0596,0.8008-0.0542,1.4277,0.0142,1.9648 c-0.0093,0.4854-0.1333,0.9277-0.3354,1.29l-0.375,0.4688l-0.0728,0.3633c-1.5713,7.9512-2.811,14.9648-3.6953,20.9033 c-1.6602-8.1328-3.6602-16.2539-5.9536-24.1709l-0.2705-1.0713c-0.2588-0.8828-0.5513-1.8311-0.9097-2.752 c-0.0059-0.0996-0.0127-0.1992-0.0283-0.3164l-0.2158-1.2959l-0.2114-0.0059c-1.2153-3.8105-2.2295-6.7891-3.293-9.6621 l-0.5474-1.1445l-0.314-1.6445h-0.252c-0.8257-2.1855-1.6313-4.1875-2.5044-6.2217h0.2236l-1.1118-2.2139 c-0.4487-0.8926-0.8306-1.875-1.2002-2.8252l-0.4951-1.2734l-0.1689,0.0029c-0.0952-0.2295-0.1934-0.457-0.292-0.6836 l-0.3472-0.7812l-0.5337-1.3203c-0.021-0.0742-0.0435-0.1484-0.0918-0.2734l-0.1255-0.251c-0.166-0.2822-0.3335-0.5625-0.5366-0.835 c-0.2231-0.2949-0.3823-0.5908-0.5483-1.0283c-5.1201-10.8115-12.4385-20.3359-21.7944-28.3418l-0.2241-0.1514 c-2.0229-1.1094-4.0078-2.4062-5.9272-3.6611l-0.8188-0.5342c-1.749-1.1396-3.6255-2.2012-5.2808-3.1377l-0.1416-0.0811 c-1.1455-0.6494-2.29-1.2979-3.4604-2.0039l-0.2549-0.1182c-15.2153-5.3203-31.9902-1.958-43.7788,8.7734l-0.1382,0.127 l-0.1934,0.3066c-0.0273,0.0537-0.0527,0.1074-0.0913,0.1943c-0.3794,0.4834-0.8281,1.04-1.3081,1.5498 c-0.2363,0.252-0.4639,0.5078-0.7563,0.8574c-0.1406,0.1914-0.3193,0.376-0.5996,0.6182l-0.2471,0.2871 c-4.6201,7.0752-4.7344,15.7061-0.3066,25.7168l0.1899,0.2969c0.2002,0.2412,0.3193,0.4697,0.3896,0.7529 c0.0239,0.085,0.0527,0.1689,0.1079,0.3105l0.0791,0.1836c0.4062,0.7861,0.8848,1.502,1.356,2.207 c0.3813,0.5684,0.7412,1.1055,1.0771,1.709c0.1343,0.2246,0.2354,0.4736,0.3096,0.7627l0.6021,1.1377 c2.0522,3.2334,4.3765,6.4453,7.1367,9.8555l0.1689,0.1699c0.064,0.0547,0.1304,0.1045,0.1597,0.1162 c1.4482,1.4238,2.7104,3.126,3.9355,4.7774l0.2886,0.3887l-0.019,0.0156l0.5195,0.6572l0.0239-0.0166 c0.918,1.0195,1.8398,2.04,2.812,3.0684l-0.04,0.0527l0.3892,0.2832l0.252,0.2324l0.0278-0.0293l0.1436,0.1045 c0.958,0.6729,1.8633,1.3086,2.6406,2.0498c0.7358,0.7002,1.3706,1.5312,2.0454,2.4141l0.4287,0.5576l0.6855,0.7441 c0.4355,0.4717,0.8789,0.9346,1.3315,1.3945c0.8589,0.8721,1.7402,1.7236,2.7178,2.668c0.145,0.1406,0.2749,0.2998,0.4346,0.5361 l0.2075,0.2393c12.0605,11.1328,24.6826,20.8711,33.9678,28.0352c3.9751,3.0684,7.1152,5.4912,9.1587,7.2227 c2.7207,2.3105,7.835,7.0859,14.0698,13.1338l0.2251,0.1768c0.2412,0.1729,0.4829,0.3467,0.7109,0.5312 c0.2085,0.1699,0.3994,0.3555,0.6069,0.5576c0.1279,0.124,0.2554,0.2461,0.3848,0.3662c0.5229,0.4834,0.9629,1.0195,1.3813,1.5518 l0.1172,0.1289c4.7588,4.6328,12.1436,11.9766,13.7632,13.6094c1.7427,13.6963,5.5586,27.0381,11.3442,39.6572 c0.0874,0.3594,0.2803,0.6787,0.561,0.9287c0.4917,0.4365,1.0854,0.5605,1.8906,0.5605c0.0127,0,0.0264,0,0.0396,0 c1.1523,14.418,2.0122,25.1572,2.6519,33.0898c-6.5142-20.2285-16.9761-38.0664-28.9624-58.5029l-3.3091-5.6465 c-5.7017-9.0557-12.8638-17.2158-21.3208-24.2803c-0.582-0.4053-1.1582-0.8203-1.729-1.25 c-1.0264-0.7715-1.9834-1.6035-2.8452-2.4736l-0.4111-0.4541c-22.0991-17.4717-48.3569-28.6289-70.334-29.8486l-0.1831,0.0137 c-1.897,0.2227-3.8628,0.3184-5.7642,0.4111l0.0244,0.4985h-0.0002l-0.1653-0.4916c-1.5972,0.0771-3.2485,0.1572-4.8716,0.3086 l-0.6357-0.0557l-0.3535,0.1484c-0.4312,0.1807-0.7769,0.2656-1.0859,0.2676c-0.4971,0.0029-0.981,0.0459-1.5186,0.0977 l-0.2754,0.0283c-1.5347,0.2578-3.0225,0.6299-4.4629,0.9902l-0.1187,0.0293c-1.0806,0.2715-2.2251,0.4951-3.5469,0.6924 l-0.2549,0.0654c-8.1201,2.8779-15.21,7.8555-20.541,14.4492l-0.248,0.4131c-0.0342,0.0635-0.0674,0.127-0.1123,0.1885 c-0.4741,0.6504-0.9912,1.2744-1.5493,1.8691l-1.5039,1.7256l0.2944,0.1025c-12.9272,19.2285-10.9209,37.5723,5.6904,51.7168 c7.6104,6.1025,16.0889,11.0762,25.1675,14.7686l0.3237,0.1602c0.4521,0.2217,0.8926,0.4648,1.3892,0.7666l0.2437,0.1152 c1.6758,0.6123,3.0522,1.166,4.3555,1.8936l0.1719,0.0801c10.8057,4.1758,21.6582,7.3682,31.2642,10.1943 c3.9751,1.1699,7.73,2.2744,10.957,3.3047c7.8315,2.46,15.6548,5.5557,23.2446,8.5586c3.8936,1.541,7.9199,3.1338,11.9355,4.6348 c4.6758,1.6748,8.459,2.8145,11.8027,3.8223c8.5537,2.5791,14.2212,4.2881,24.4683,11.9092 c0.9575,6.9561,1.1143,7.915,2.1699,14.0518l0.1147,0.3877c0.373,1.3936,0.6323,2.8623,0.8882,4.3174 c0.2422,1.377,0.4922,2.8008,0.8501,4.2129c0.1538,0.6055,0.3535,1.1738,0.5684,1.7842c0.1538,0.4395,0.3081,0.876,0.4292,1.3262 c0.2842,1.0498,0.3955,2.0459,0.3218,2.8799l-0.0176,0.2021l0.0366,0.1982c0.5425,2.9844,1.5308,8.3877,2.2324,12.0449 c-21.9561,2.1416-33.4907,5.4121-35.2612,10.001c-1.9351,5.1865,3.8433,39.3984,9.0312,67.1846 c4.6406,24.8525,11.9321,60.5371,13.583,62.9375l0.1621,0.1895c2.916,2.8584,6.5757,4.7646,10.5391,5.502 c7.5562,2.1289,22.9814,4.2842,37.8433,4.2842c12.5356-0.001,34.0938-1.6289,37.6348-12.5254 c2.8037-8.7471,10.8965-87.3662,12.5234-117.6641c0.9727-0.374,1.9072-0.8379,2.7783-1.3789 c8.728-5.2598,20.2183-16.6309,25.3931-40.9297c5.8101-27.2861,0.6714-59.1133-12.5098-77.416 c-10.0737-12.8154-25.3403-21.0557-41.8555-22.6055c-1.3481-0.209-2.7144-0.3096-4.0698-0.2783 c24.9888-39.6719,55.8179-88.9268,61.3979-144.5059C285.8875,52.4898,283.8123,4.9644,262.3694,0.816z M225.866,220.1129 c14.8491,1.6738,28.5078,9.2305,37.4619,20.7139c11.9644,16.7607,16.6538,47.4199,11.1499,72.9014 c-2.5981,12.0264-8.5811,28.0947-22.3291,36.3496c-2.3276,1.4131-4.8218,1.7334-7.4102,0.9521 c-4.7734-1.4443-9.7134-6.5898-12.5845-13.1064c-3.8037-8.791-6.144-18.9316-8.6226-29.6719 c-4.9478-21.4443-10.0645-43.6191-27.6475-56.4336c-2.7422-2.0889-5.8828-3.751-9.2007-4.8809 c24.3389-11.4258,49.4224-2.4336,62.481,22.4404c3.9365,7.3555,6.1494,15.2607,6.5771,23.4688c0,1.2119,1.0137,2.1982,2.2593,2.1982 c0.5962,0,1.1602-0.2246,1.5879-0.6318c0.4326-0.4121,0.6709-0.957,0.6699-1.5166c0.5034-15.5234-5.4858-30.8379-16.4321-42.0156 c-9.0898-9.2822-20.6997-14.5547-32.7021-14.8467h-0.1709c-7.1416,0-14.3105,1.4678-20.8809,4.2598 c7.0581-7.6445,21.5654-21.3086,34.4004-20.5459v0.207L225.866,220.1129z M233.9304,472.525l-0.042,0.3086 c-1.125,2.9375-6.3774,5.2764-14.8047,6.5879c-21.3223,3.3213-55.6729-0.7637-59.5098-5.7383 c-1.0054-2.791-7.3857-31.0811-13.5054-61.3828c-8.8267-43.6992-11.0845-61.5713-10.2544-63.7246 c2.187-5.666,53.4292-10.0449,91.248-6.2373c3.5083,6.9102,10.5781,14.9512,19.314,15.5771 C244.9646,379.0592,236.9924,463.1285,233.9304,472.525z M102.3298,217.4439h-0.0005c-6.8979-4.0312-30.625-17.1582-46.5615-16.5977 l-0.2793,0.042c-0.5957,0.1455-1.0972,0.5088-1.4131,1.0225c-0.3188,0.5176-0.4087,1.125-0.2534,1.71 c0.2114,0.7939,0.8491,1.4121,1.7246,1.623l0.3262,0.0361c12.9854,0,38.7998,12.7285,62.7759,30.9531 c16.5269,12.5625,45.979,38.2617,62.3286,72.2402c-9.6699-12.2109-25.5981-25.4355-40.311-29.5674 c-9.5742-2.7168-19.1035-6.5293-28.3193-10.2158c-7.1191-2.8477-14.4805-5.792-21.8311-8.2207 c-3.6948-1.2041-7.7163-2.4258-11.9731-3.7188l-0.2656-0.0811c-19.9116-6.0459-44.6919-13.5703-59.6201-26.334 c-13.8481-11.8184-15.5244-25.5859-5.123-42.0928c8.333-13.4004,21.2446-20.1953,38.3755-20.1953l0.5605,0.0029 c34.9268,0.2988,79.4175,29.6709,94.3843,54.7383c1.5762,2.6689,3.1934,5.3721,4.8301,8.1094l0.0996,0.167 c6.4668,10.8105,13.1538,21.9902,18.8999,33.5322c5.9658,11.6016,10.3086,23.8643,12.9336,36.5068 C165.5242,264.0377,130.0818,233.7291,102.3298,217.4439z M209.2585,323.231l0.0054,0.001l1.2798-14.2178 c0.7119-7.8906,1.3809-15.6611,1.8213-20.9082c2.0254,6.8877,3.7422,13.9121,5.1123,20.916l3.1069,13.5361 c1.022,4.5479,2.3091,9.0967,3.8286,13.5352c-5.2578-0.3955-10.7549-0.6494-16.3613-0.7539 C208.5681,330.9771,208.9641,326.6471,209.2585,323.231z M193.384,329.5787c-0.0127-1.2734-0.1055-2.5234-0.1963-3.75 l-0.0083-0.1123c-0.062-0.8496-0.125-1.7061-0.1611-2.6104l-0.8213-14.0059c-0.2607-4.4795-2.874-38.29-4.3608-56.9072 c7.9888,3.9785,15.2314,12.207,19.98,22.7354l-0.4795,3.7939c-1.5879,12.54-1.5884,12.543-3.0957,29.6396l-1.1714,14.3926 c-0.4116,4.7021-0.7632,9.0176-1.0273,12.2676l-0.041,0.5088c-2.7734-0.0752-5.6011-0.0859-8.2891-0.0879 c-0.04-0.8613-0.106-1.7285-0.1704-2.5791c-0.0532-0.7012-0.1055-1.3926-0.1411-2.0566 C193.5168,330.4059,193.511,329.9762,193.384,329.5787z M176.0813,310.4576c1.2656,1.4277,2.3237,3.042,3.5229,5.0254 c0.2983,0.4951,0.5928,0.9951,0.9238,1.5576c0.9409,1.6045,1.9141,3.2637,3.1318,4.8711c0.5464,0.6436,1.1489,1.3916,1.3926,2.1279 l2.7563,4.6943c0.208,2.332,0.3906,4.5889,0.5669,6.8105c-5.1152,0.0713-10.2954,0.4648-14.8179,0.8418l-2.561-13.2734 l-2.4194-13.918l-0.0225-0.1064c-0.8916-3.5791-1.0259-4.1865-1.8179-8.4268c2.5508,2.29,4.9927,4.7227,7.2827,7.2539h-0.1899 L176.0813,310.4576z M229.9905,81.5836c2.8389-7.6787,5.2905-14.3105,7.3271-20.0732c0.5859-1.0117,0.2886-2.2744-0.6909-2.9375 c-0.5063-0.3447-1.1162-0.4736-1.7139-0.3701c-0.6055,0.1035-1.1333,0.4287-1.4863,0.916 c-0.1797,0.2471-0.3086,0.5352-0.3496,0.7549c-1.8955,4.8076-4.0781,10.0469-6.6411,16.1992 c-9.4229,22.6172-22.3281,53.5918-33.3096,93.957c-6.6206,23.0322-10.8242,46.791-12.5024,70.6533 c-8.4067-22.7783-10.8516-47.373-7.0674-71.2842l0.0005-0.001c3.5581-22.8467,9.4946-46.957,13.833-64.5772l0.939-3.8154 c4.7163-21.0645,12.2939-41.5371,22.5234-60.8486l0.0796-0.1514l0.1245-0.6328c0.1123-0.3545,0.29-0.7217,0.5068-1.1699 c0.0186-0.0381,0.0405-0.0742,0.0596-0.1035l0.0498-0.0723c0.2451-0.3223,0.5024-0.6406,0.7612-0.9512 c0.0347-0.041,0.0703-0.0801,0.0747-0.085l0.1455-0.1162l0.2104-0.2861c12.2134-19.999,26.0977-30.1387,41.2676-30.1387 c2.2788,0,4.6157,0.2305,6.9492,0.6855c5.7461,1.0791,10.2622,7.8096,13.4214,20c15.3755,60.9775-20.7021,126.6436-59.0137,188.6865 c-11.7705,3.7354-22.5576,14.0908-29.8569,22.6172c5.8213-52.6191,28.9497-115.1777,44.3091-156.7217L229.9905,81.5836z  M155.4963,161.8834c-10.1792-18.7061-22.8662-36.0635-37.7056-51.585c-3.6191-3.8584-7.7866-7.2188-12.4077-9.999 c-1.0918-0.5879-2.4785-0.2021-3.0894,0.8574c-0.6016,1.043-0.251,2.3496,0.7661,2.9541c3.9595,2.7852,7.519,6.0801,10.5889,9.8047 c13.6968,15.7617,25.8193,32.918,36.0371,51c6.9751,11.7441,12.6963,24.2275,17.0063,37.1074 c-7.731-8.0312-21.0225-21.6006-26.4644-26.3389c-2.1592-1.8828-5.3882-4.4639-9.4761-7.7314l-0.1494-0.1191 c-16.8774-13.4844-45.126-36.0537-57.9082-56.6318c-8.7676-14.1504-8.5078-24.5273,0.7837-31.7148 c6.5249-4.7676,14.4507-7.2354,22.4258-7.2354c4.7046,0,9.4272,0.8594,13.8867,2.6133 c34.7837,14.8486,50.1948,74.9492,56.3208,109.8359C163.4856,177.6227,159.9226,169.9615,155.4963,161.8834z"/></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 444.3163 400.3593" xml:space="preserve"><path fill="${color}" d="M391.0627,187.4592c-1.0227,2.9701-2.0489,5.939-3.0672,8.9106c-1.6854,4.9183-4.0609,9.3926-7.7684,13.1529 c-2.7006,2.7391-5.1291,5.7454-7.7036,8.6104c-11.1609,12.4201-27.9966,17.7796-42.9763,24.0042 c-10.1536,4.2192-20.359,8.3139-30.6131,12.2827c-5.002,1.936-35.5161,12.33-39.2,13.4797 c-3.1924,0.9962-6.3959,1.9668-9.5464,3.0844c-2.0008,0.7097-3.8651,1.7282-5.4604,3.2018 c-0.8971,0.8286-1.3944,1.7559-1.5864,2.969c-1.1367,7.1837-2.3263,14.3591-3.502,21.5366 c-2.4033,14.6726-4.8945,29.3316-7.1875,44.0214c-1.9256,12.3362-3.6125,24.7096-5.4251,37.0636 c-0.4393,2.9944-0.9101,5.9859-1.4518,8.9632c-0.568,3.1221-1.9425,5.8545-4.262,8.0656c-1.7701,1.6873-3.8231,2.8289-6.2744,3.1684 c-3.1417,0.435-6.2808,0.5903-9.4261-0.0077c-3.7581-0.7144-6.6468-2.7037-8.6751-5.9175 c-2.0124-3.1885-3.0156-6.6871-2.8378-10.465c0.5421-11.5177,0.9808-23.0428,1.7337-34.5471 c0.5506-8.4142,1.5324-16.8001,2.3242-25.1985c0.8825-9.3596,1.7936-18.7167,2.6403-28.0796 c0.429-4.7432,0.7481-9.4965,1.1042-14.2462c0.0511-0.6814,0.0307-1.3681,0.0464-2.2146c-2.1857,0.0783-4.1642,0.1881-6.1436,0.213 c-6.8888,0.0866-53.4625-7.0025-69.3392-11.771c-15.7439-4.7286-31.5932-9.3642-46.6752-15.9752 c-9.7458-4.2719-18.7892-9.9512-27.5527-15.9561c-3.0814-2.1114-6.2234-4.1347-9.346-6.1855 c-0.5268-0.346-1.0967-0.6263-1.9034-1.0819c-0.3183,1.8851-0.5895,3.5665-0.8874,5.2433 c-1.7788,10.01-3.6361,20.0067-5.327,30.0314c-1.8413,10.9169-3.5252,21.8603-5.2895,32.7902 c-0.3181,1.9704-0.6388,3.9432-1.0538,5.8946c-0.7239,3.4035-2.4154,6.2197-5.2962,8.2496 c-2.7739,1.9545-5.8335,2.6425-9.1696,1.9756c-1.6386-0.3276-3.297-0.6124-4.8866-1.1083c-0.9516-0.2969-1.9855-0.7827-2.641-1.497 c-2.7678-3.016-4.9937-6.3726-5.987-10.4393c-0.5808-2.3778-0.3805-4.7385-0.0601-7.1019 c1.6864-12.4389,3.325-24.8849,5.1131-37.3092c2.5587-17.7785,5.1189-35.5582,7.9041-53.302 c1.4169-9.027,3.3867-17.9659,4.9938-26.9648c1.1882-6.6533,2.1573-13.3454,3.2889-20.0093 c2.8478-16.7713,6.5222-33.3457,11.5405-49.6205c3.2531-10.5502,10.0937-17.5709,20.1897-21.6667 c4.6847-1.9005,9.6122-2.8808,14.5164-3.9548c9.3771-2.0535,18.8352-3.6369,28.3396-4.9814 c12.8984-1.8246,25.8597-2.8672,38.8652-3.4849c7.0539-0.335,14.0042,0.5099,20.9452,1.5623 c13.1684,1.9966,26.3348,4.0065,39.5019,6.0114c4.6109,0.7021,7.4054-0.8285,9.5567-5.0399 c3.1492-6.1647,5.3954-12.6776,7.4745-19.247c2.2134-6.9938,4.3412-14.0172,6.3552-21.0708 c1.8506-6.4811,4.3832-12.6604,7.764-18.4751c5.5372-9.5236,13.916-14.4024,24.8826-14.7957 c11.1454-0.3997,22.2925-0.2993,33.4208,0.4508c9.6999,0.6538,19.3896,1.461,29.0816,2.2293 c7.8923,0.6256,15.7748,1.3894,23.6731,1.9214c12.2875,0.8276,24.5856,0.879,36.8831,0.1093 c4.4998-0.2816,9.0013-0.5645,13.5063-0.7278c2.4985-0.0905,5.0527-0.2295,7.5012,0.1602 c10.3702,1.6502,17.5562,7.6324,21.9318,17.0009c3.4907,7.4738,3.6867,15.3209,1.8578,23.2596 c-4.7835,20.7621-9.6092,41.5146-14.3919,62.2769c-1.1267,4.8914-2.1096,9.816-3.2488,14.7043 c-0.3002,1.2882-0.1236,2.2507,0.5695,3.4159c1.4327,2.4085,2.7226,4.902,3.0575,7.8073c0.1891,1.6394,0.9181,3.2099,1.3201,4.8323 c4.6597,18.8059,9.3557,37.6031,13.933,56.4291c2.9661,12.1993,5.8127,24.4285,8.6045,36.6691 c3.4641,15.1891,6.7957,30.4084,10.2265,45.6051c1.3611,6.0292,2.8397,12.0319,4.2512,18.0498 c0.1758,0.7497,0.2887,1.5159,0.3973,2.2793c1.239,8.7187-7.3089,13.5633-13.986,11.6014 c-5.2326-1.5375-9.0154-4.7038-10.9925-9.7622c-1.1667-2.9851-2.0439-6.1042-2.806-9.223 c-3.3773-13.8211-6.6414-27.6698-9.9944-41.4969c-2.5925-10.6911-5.2718-21.3611-7.8829-32.0477 c-2.1383-8.7515-4.2315-17.514-6.3503-26.2703c-0.1622-0.6701-0.3692-1.3293-0.5554-1.9935 C391.4396,187.494,391.2512,187.4766,391.0627,187.4592z M380.587,108.6527c0.207-0.674,0.382-1.1497,0.4991-1.6393 c1.4974-6.2601,3.0537-12.5071,4.4634-18.787c2.7913-12.4347,5.5052-24.8868,8.242-37.3338 c2.5292-11.5026,5.053-23.0064,7.5652-34.5128c0.7-3.2063-0.1497-4.3848-3.373-4.4967c-3.4081-0.1184-6.8236-0.2036-10.2311-0.1156 c-9.2093,0.2378-18.4143,0.6519-27.6242,0.8458c-5.9212,0.1247-11.8651,0.2612-17.7685-0.1016 c-9.374-0.5761-18.7151-1.667-28.0838-2.3521c-10.3991-0.7604-20.8098-1.3835-31.2228-1.925 c-6.7504-0.351-13.5138-0.4557-20.2718-0.6574c-3.6693-0.1096-7.3395-0.275-11.0091-0.2682 c-7.5301,0.0139-13.4539,3.1438-17.4928,9.5335c-1.2296,1.9453-2.2446,4.0666-3.0741,6.2168 c-2.3862,6.1846-4.629,12.4245-6.9251,18.6438c-1.7639,4.7777-3.358,9.6-4.078,14.6713c-0.5703,4.017-6.1953,31.644-6.6949,33.9036 c-2.2233,10.0566-8.1513,35.0501-8.4532,36.6096c-0.5868,3.0316,1.097,4.9306,4.1961,5.0145 c1.4622,0.0396,2.9251,0.3097,4.3726,0.5621c1.5149,0.2641,3.0111,0.6346,4.5166,0.9535c0.6251,0.1324,1.2628,0.2154,1.8777,0.3833 c2.2963,0.6268,4.5752,1.3196,6.8801,1.9119c2.7664,0.7109,6.0377-4.5229,6.6438-4.9419c2.2251-1.5381,4.421-3.1184,6.6481-4.6534 c3.5646-2.4567,7.2979-4.602,11.4093-6.0258c12.5535-4.3475,25.5102-6.6168,38.7177-7.7729 c8.8521-0.7748,17.7325-0.9824,26.5929-1.5907c11.419-0.784,22.9012-0.6365,34.3549-0.9374 C353.8335,109.7235,375.56,108.8614,380.587,108.6527z M224.3707,143.3397c-1.5784-0.3899-3.1484-0.5779-4.5538-1.1622 c-4.2465-1.7655-8.7284-2.6824-13.1405-3.8448c-2.688-0.7081-5.4337-1.1043-8.2222-0.5553 c-2.2727,0.4474-4.5363,0.9446-6.8158,1.3537c-2.658,0.477-5.3605,0.744-7.9879,1.3457 c-6.5229,1.4938-13.0034,3.1715-19.5204,4.6919c-9.1476,2.1341-18.3035,4.2348-27.4733,6.271 c-8.7346,1.9395-17.5149,3.6402-26.3784,4.9114c-5.9889,0.8589-11.9451,1.9431-17.9274,2.8515 c-5.5332,0.8402-11.0607,1.8145-16.6281,2.3095c-8.034,0.7144-16.094,0.1947-24.131-0.2765 c-3.6799-0.2157-6.9906,0.6129-10.1339,2.4915c-3.3047,1.9751-5.2541,4.7081-5.8784,8.58 c-1.3627,8.4512,2.1389,14.9799,9.1186,19.6062c13.4937,8.944,28.4346,13.3895,43.4407,19.3196 c15.1472,5.9859,30.2084,12.1761,45.3462,18.1781c3.1744,1.2586,6.365,2.477,9.579,3.6311 c19.9917,7.1788,39.8924,9.7133,60.8749,10.2487c2.3622,0.0603,3.1399-0.6817,3.1993-3.105 c0.2441-9.9484,2.1545-19.7018,3.4872-29.516c1.264-9.3081,2.9431-18.5603,4.4671-27.8326 C217.2854,169.496,219.938,156.2615,224.3707,143.3397z M282.6545,120.8288c-6.7563,0.8887-13.4731,2.1729-20.1459,3.5753 c-6.5898,1.385-12.9074,3.6562-18.4395,7.628c-6.5838,4.7269-11.7684,10.6021-14.2062,18.5193 c-1.4203,4.6125-2.8088,9.2394-4.03,13.9073c-1.584,6.0543-2.2595,12.271-3.1342,18.459 c-1.0355,7.3253-2.3803,14.6127-3.7863,21.8788c-2.7066,13.9883-4.39,28.099-5.59,42.2869 c-0.656,7.7559-1.6522,15.4833-2.5192,23.2208c-0.681,6.078-1.5016,12.1423-2.0671,18.2306 c-0.4283,4.6112-0.3683,9.2698-0.8496,13.8735c-1.0033,9.5966-2.2539,19.1672-3.3376,28.7558 c-0.593,5.2462-1.1305,10.5013-1.5525,15.7637c-0.489,6.0977-0.8825,12.2048-1.2089,18.3136 c-0.3368,6.3021-0.582,12.6099-0.7873,18.9178c-0.0809,2.485,0.7165,4.7111,2.6852,6.3624 c0.7844,0.6579,1.6809,1.1802,2.5029,1.7957c1.7953,1.3441,3.8161,1.6542,5.8615,0.9324c1.4928-0.5267,2.9414-1.3068,4.2434-2.2128 c1.5857-1.1035,2.454-2.7302,2.7254-4.7063c0.7005-5.1012,1.509-10.1874,2.2222-15.2869 c1.3913-9.9466,2.6499-19.9129,4.1473-29.8433c1.2567-8.3347,2.7693-16.6309,4.1784-24.9424 c1.3448-7.9324,2.6526-15.8716,4.0717-23.7908c0.9307-5.1932,2.084-10.3464,3.0229-15.5383 c0.2947-1.6296,0.5199-10.4201,0.6202-11.4443c0.8211-8.3911,1.6318-16.7832,2.4339-25.1761 c0.8878-9.2901,1.7476-18.5828,2.6478-27.8717c1.1178-11.5352,2.2044-23.074,3.4228-34.5987 c0.663-6.272,1.3904-12.548,2.4185-18.7677c1.0598-6.4115,4.2303-11.6563,10.1422-14.7438 c7.1286-3.7229,14.6175-6.3994,22.7693-6.7733c2.3812-0.1092,4.7815-0.1185,7.1356-0.4439 c10.5881-1.4636,21.1675-2.9918,31.7409-4.5586c12.4182-1.8401,24.7622-4.1756,37.2495-5.5572 c4.6099-0.51,9.2135-1.0181,13.8665-0.907c4.2422,0.1012,7.6585,1.5632,9.6855,5.5153c1.0282,2.0047,2.1177,3.9798,3.0861,6.0128 c1.9096,4.009,3.8692,7.9954,5.0063,12.3284c0.9315,3.549,2.0694,7.0438,3.002,10.5925 c2.7159,10.3344,5.4482,20.6655,8.0297,31.0338c1.6943,6.8049,3.0314,13.6987,4.725,20.5038 c1.693,6.8028,3.791,13.5061,5.427,20.3214c3.1989,13.3263,6.1462,26.7129,9.304,40.0494c1.6758,7.0778,3.528,14.1152,5.3905,21.147 c1.0699,4.0396,3.3804,6.78,7.8404,7.468c3.843,0.5929,6.3586-1.6301,5.7901-5.4865c-0.1498-1.0163-0.2375-2.0415-0.3683-3.0608 c-0.3195-2.4906-0.4485-5.0258-1.0078-7.4619c-1.9443-8.4693-4.2067-16.8571-6.955-25.1075 c-0.4657-1.3981-0.9234-2.8045-1.2713-4.2347c-0.2928-1.2034-7.3624-27.4759-9.533-36.8849 c-1.4313-6.2047-9.9516-39.8998-12.4426-50.6208c-1.2676-5.4552-6.4012-29.9405-7.5332-35.2233 c-0.7067-3.2976-1.5653-6.5129-3.2318-9.4499c-0.5575-0.9825-1.2591-2.0005-2.1502-2.654c-2.488-1.8244-5.1035-3.4756-7.6853-5.17 c-0.3658-0.2401-0.8123-0.4387-1.2408-0.488c-2.2947-0.264-4.594-0.493-6.895-0.6966c-1.3465-0.1192-2.7016-0.2645-4.0487-0.231 c-4.047,0.1008-8.1009,0.1658-12.135,0.4705c-3.4619,0.2616-6.8929,0.9086-10.351,1.2488 c-3.8443,0.3782-7.7003,0.6657-11.5574,0.8784c-5.9129,0.326-11.8307,0.5671-17.7475,0.8192 C318.5183,117.8646,289.6049,119.9146,282.6545,120.8288z M52.4754,154.0857c0.7336,0.1357,1.1615,0.2625,1.5952,0.2876 c3.4704,0.2012,6.9401,0.4374,10.4136,0.5554c3.2079,0.1089,6.4109,0.4243,9.628-0.1773c5.251-0.9818,10.5364-1.7781,15.7962-2.7146 c8.4883-1.5112,16.9652-3.0862,25.4516-4.6083c6.0161-1.0791,12.036-2.1372,18.0613-3.1633 c4.4394-0.756,8.9152-1.3183,13.3309-2.1895c10.1817-2.0088,20.0062-5.3449,29.9431-8.2616 c1.7728-0.5203,2.6411-1.7038,2.9238-3.4474c0.2885-1.7794,0.5334-3.5695,0.9137-5.3297c1.3181-6.101,2.6822-12.1921,4.0383-18.2848 c0.6685-3.0036,0.5471-3.2459-2.2626-4.2543c-2.2411-0.8044-4.5031-1.5558-6.7182-2.4263 c-12.6483-4.9703-25.8043-6.3838-39.2603-5.566c-12.0876,0.7346-24.1126,1.9652-35.9881,4.4906 c-11.1493,2.3709-22.1503,5.2856-33.0336,8.6442c-3.625,1.1187-6.4319,3.4397-8.3712,6.7649 c-1.2898,2.2116-1.9946,4.6002-2.3164,7.112C55.2388,132.301,53.8738,143.0868,52.4754,154.0857z M365.8219,173.6088 c-0.2517-0.1332-0.4064-0.2634-0.5807-0.3004c-7.7352-1.6437-15.476-3.2608-23.2074-4.9218 c-5.532-1.1885-11.0307-2.5109-16.669-3.1774c-7.2179-0.8532-14.4393-1.7078-21.4647-3.733 c-3.1475-0.9073-6.3713-1.5486-9.5573-2.3239c-5.806-1.4128-11.5993-2.8794-17.4178-4.2384 c-3.9395-0.9202-7.9084-1.7173-11.8747-2.5178c-0.9402-0.1898-1.9263-0.1399-2.8838-0.2597 c-0.892-0.1116-1.6041,0.1438-2.3088,0.7044c-3.1878,2.5361-5.0258,5.8081-5.4227,9.8554 c-0.4831,4.9268-0.8821,9.8619-1.3701,14.7882c-0.8056,8.1319-1.6207,16.2631-2.4951,24.3878 c-0.5778,5.368-2.4481,22.7358-2.7937,24.2802c-0.4888,2.1847,2.0849,1.3021,4.2853,0.7777 c0.2496-0.0594,0.4913-0.155,0.7333-0.2432c12.6743-4.6198,25.959-7.1497,38.6812-11.7919 c23.0362-8.4057,43.5402-20.5946,65.3251-31.5532C361.0275,181.2162,363.5578,177.5876,365.8219,173.6088z M198.4937,85.4005 c-2.598-0.1781-28.2586-3.7307-30.7178-4.1119c-6.8657-1.0641-13.7514-2.0485-20.6601-2.7686 c-4.4613-0.465-8.9935-0.742-13.4647-0.5184c-9.3234,0.4661-18.6307,1.278-27.938,2.03 c-5.7714,0.4663-11.5335,1.0767-17.1949,2.3592c-7.0289,1.5923-14.0532,3.2056-21.0711,4.846 c-4.5183,1.0562-8.9618,2.3726-13.2232,4.2304c-6.3801,2.7814-11.0694,7.2017-13.3516,13.9267 c-0.2685,0.7913-0.6026,1.5618-0.9323,2.3308c-2.929,6.8334-5.071,13.8853-6.318,21.2339 c-1.8197,10.7235-3.6712,21.4456-5.7685,32.1173c-3.824,19.4581-7.2116,38.9876-10.0102,58.6173 c-2.8804,20.204-5.6986,40.4171-8.4774,60.6353c-0.7891,5.7415-1.3287,11.514-1.2349,17.3287 c0.0361,2.2399,1.0186,3.9626,2.6624,5.3465c1.8735,1.5773,4.0559,2.1302,6.4925,1.8278c3.0493-0.3784,4.4634-1.678,4.9653-4.7049 c0.5466-3.2966,0.733-6.654,1.7846-9.8665c0.2754-0.8414,0.3861-1.7848,0.3498-2.6722c-0.1945-4.7549,0.8864-9.3405,1.747-13.9573 c1.5095-8.0974,3.1049-16.18,4.5055-24.2962c1.2362-7.1633,1.882-14.4217,3.5456-21.523c0.3051-1.3024,0.0563-2.8463-0.3214-4.1689 c-0.4723-1.6538-1.2487-3.2435-2.0582-4.774c-2.2858-4.3214-4.6533-8.5997-6.9953-12.8913 c-0.3082-0.5647-0.5955-1.1567-0.9973-1.6509c-0.703-0.8649-0.8406-1.8209-0.7928-2.8922 c0.1982-4.4455,1.6603-8.4464,4.2318-12.0402c1.3718-1.9171,1.6715-3.8917,1.1515-6.2092c-0.4883-2.176-0.7876-4.4576-0.7286-6.681 c0.1472-5.5444,2.4098-10.3307,5.763-14.6724c1.8155-2.3507,4.0086-4.1346,6.7608-5.2839c1.2965-0.5414,2.4988-1.3089,3.7428-1.9756 c1.4433-0.7734,2.0196-1.8988,1.9755-3.6077c-0.0763-2.9559-0.0784-5.9422,0.2546-8.8741c0.646-5.6885,1.4601-11.362,2.3721-17.0147 c0.5732-3.553,1.3279-7.0887,2.2258-10.5743c0.963-3.7388,3.0756-6.7929,6.336-8.9463c2.0413-1.3482,4.1118-2.6585,6.2247-3.8906 c3.4152-1.9916,7.0528-3.4001,10.9485-4.202c7.3743-1.5179,14.7358-3.1018,22.0842-4.7412 c10.5-2.3424,21.0139-4.5341,31.7808-5.3194c10.7725-0.7857,21.5266-0.6275,32.19,0.9788c5.9631,0.8982,11.8235,2.5184,17.6995,3.94 c4.2519,1.0287,8.4688,2.2129,12.671,3.4321c2.2149,0.6426,2.6382,1.4852,2.2925,3.7392c-0.039,0.2543-0.1112,0.5032-0.161,0.7561 c-1.3415,6.8214-2.7062,13.6383-4.0108,20.4667c-0.5191,2.7169-0.976,5.4502-1.3261,8.1934 c-0.2321,1.8186,0.5104,2.3939,2.2663,1.9724c1.69-0.4057,3.3697-0.8546,5.0558-1.2766c1.6283-0.4076,2.6529-1.3014,3.0961-3.0364 c1.6414-6.4249,3.5329-12.7883,5.0684-19.2372c2.0273-8.5143,3.8092-17.087,5.6909-25.6359 c0.0895-0.4067,0.1243-0.8254,0.1977-1.328C206.3865,80.6419,205.3311,85.8693,198.4937,85.4005z M34.0937,192.8526 c-4.4856,3.1796-5.7044,7.7025-2.859,12.505c2.06,3.4768,4.5173,6.7277,6.9281,9.9825c1.0234,1.3817,2.2456,2.6966,3.6162,3.7231 c2.4819,1.8586,4.8704,3.795,7.0541,5.999c0.9024,0.9108,1.8931,1.7687,2.9595,2.4757c3.2178,2.1333,6.4313,4.2848,9.7581,6.2393 c14.1223,8.2968,29.2219,14.8502,44.6705,20.2427c12.7507,4.4508,25.6603,8.5409,38.8568,11.4596 c8.1407,1.8005,16.4207,2.8393,24.6848,3.8827c7.7402,0.9772,15.8017,3.112,23.595,3.1598c2.1898,0.0135,4.38,0.0374,6.5696,0.0196 c2.6473-0.0216,3.7716-1.0084,4.1551-3.5801c0.0475-0.3186,0.0915-0.6378,0.1302-0.9576c0.627-5.1782,1.2552-10.3563,1.8779-15.5349 c0.2697-2.2431-0.3496-3.0081-2.5938-2.9903c-2.5119,0.02-5.0228,0.1567-7.5344,0.2318 c-6.9528,0.2079-13.8948-1.5927-20.8353-2.4714c-10.5848-1.3401-21.3545-2.7012-31.3004-6.7034 c-20.1908-8.1247-40.5027-14.0012-60.1646-23.3615c-6.6178-3.1505-13.1802-6.4186-19.8213-9.5185 c-4.8926-2.2837-9.8291-4.4873-14.8315-6.516c-2.8222-1.1445-5.6053-2.2561-7.9278-4.2844 c-0.2373-0.2073-0.5521-0.3259-0.8312-0.4853C38.2655,195.236,36.2807,194.1021,34.0937,192.8526z M245.3446,262.3852 c2.1746-0.35,4.0362-0.5314,5.8378-0.963c26.1445-6.2631,92.7638-34.6618,96.4785-36.425 c7.5025-3.5614,16.0795-10.1506,21.758-16.4165c1.5939-1.5849,3.1011-3.2578,4.6268-4.9101 c0.9124-0.9881,1.9754-1.8999,2.6462-3.0373c2.4518-4.1568,4.6349-8.4391,4.6607-13.2607 c-0.6456-0.7559-1.1634-1.3948-1.7183-1.9995c-0.3378-0.3682-0.7158-0.7051-1.1057-1.0188 c-0.8938-0.7193-1.8644-1.3537-2.6962-2.1369c-1.0891-1.0256-2.2091-1.3683-3.688-0.897c-2.8154,0.8972-5.3543,2.2284-7.393,4.3832 c-2.6064,2.7547-5.8876,4.5865-9.0547,6.5238c-29.8681,18.2696-62.3445,32.1607-95.9842,41.7969 c-1.5998,0.4583-3.1192,1.1902-4.7051,1.7057c-1.7116,0.5562-3.4858,0.9247-5.1849,1.5133c-3.1597,1.0945-3.6996,1.7617-3.771,4.754 c-0.1257,5.273-0.3653,10.5432-0.5551,15.8147C245.4462,259.211,245.4033,260.6105,245.3446,262.3852z M274.4604,146.1203 c-0.0057,0.2083-6.8501,1.6258-6.8558,1.8341c1.4705,0.4039,8.8719,1.1205,10.3573,1.4592 c3.638,0.8295,7.2832,1.6302,10.9362,2.3911c2.4505,0.5103,46.4367,7.8772,53.1312,9.1736 c6.0019,1.1623,12.0078,2.3133,18.1721,2.1959c3.0776-0.0586,7.0531-1.4562,10.1313-1.4444 c0.174-0.4069,0.3315-0.6892,0.4187-0.9917c1.3725-4.7617,2.7916-9.5111,4.0693-14.2983c0.4105-1.5378,0.5938-3.1743,0.6187-4.7698 c0.071-4.5324-2.1739-7.3139-6.5895-8.1669c-4.0657-0.7854-8.1816-1.0761-12.2913-0.3942 c-2.9156,0.4837-5.8027,1.1428-8.6968,1.7508c-4.6551,0.9778-9.2756,2.1597-13.9642,2.9293 c-8.6332,1.417-17.3002,2.6334-25.963,3.8642c-6.5011,0.9237-13.0178,1.7373-19.527,2.6032 C283.7582,144.8747,279.1095,145.4988,274.4604,146.1203z M396.194,115.3542c0.1782-0.7706,0.3464-1.445,0.4893-2.1248 c1.0321-4.9117,1.9815-9.8424,3.1131-14.731c0.8557-3.6967,2.0799-7.3095,2.8969-11.0133 c1.7048-7.7286,3.1415-15.5171,4.8899-23.2353c1.6618-7.3361,3.0811-14.7437,5.9785-21.7598c0.639-1.5475,0.702-3.3877,0.7659-5.103 c0.0692-1.858-0.1102-3.7336-0.2981-5.5897c-0.1218-1.2027-0.325-2.4287-0.7205-3.5647c-0.6122-1.7587-1.4165-3.4508-2.1476-5.1677 c-0.124-0.2911-0.2166-0.6715-0.4476-0.8288c-1.6392-1.1167-2.6098-2.7918-3.7465-4.3337c-0.2082-0.2824-0.5571-0.461-1.0046-0.8179 c-0.5459,2.9759-0.9869,5.7636-1.575,8.5199c-2.8206,13.2223-5.5973,26.4548-8.5505,39.6476 c-3.0512,13.6302-6.2901,27.2184-9.4384,40.8269c-0.2292,0.9903-0.3902,1.9963-0.5494,2.8212 c1.9203,1.0329,3.7117,1.8836,5.3827,2.9269C392.9069,112.8727,394.4617,114.1107,396.194,115.3542z M386.0232,177.4523 c0.0318-0.8427,0.0954-1.4634,0.0718-2.0809c-0.1058-2.765-0.1455-5.5368-0.3825-8.2913c-0.2641-3.0696-0.6766-6.1285-1.1017-9.1813 c-0.2206-1.5845-0.6509-3.1391-0.9014-4.7207c-0.125-0.7887-0.4872-1.3154-1.1841-1.6189c-0.4485-0.1954-1.3704-3.4529-1.3428-4.886 c-0.1455-0.0237-0.2909-0.0474-0.4363-0.071c-2.4264,7.1256-4.8527,14.2512-7.2183,21.1982 C377.2806,171.6828,381.4655,174.5325,386.0232,177.4523z"/></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 224.5497 355.9136" xml:space="preserve"><path fill="${color}" d="M186.7789,134.3081c12.0889-14.207,24.5889-28.8984,32.5664-49.2842c13.4658-34.3955-1.1465-63.2939-21.6025-76.6748 c-18.3994-12.0352-39.2061-10.9795-53.1504,2.6523c-1.3389-1.1348-3.0137-1.8545-4.8105-2.0439 c-3.4912,0.0117-6.8984,1.2402-9.5483,3.4248c-3.8784,2.5029-22.4419,15.9258-26.6543,19.5996 c-21.2388,0.0557-62.4707,9.335-82.7598,15.9883c-6.9751,1.9922-13.8701,4.499-20.4932,7.4502L0.1763,55.524 c-1.2607,1.2617,4.644,17.4307,4.896,18.1191c1.8887,5.1533,6.6606,17.4893,10.5425,21.7803 c-0.5498,9.1924,2.875,18.8438,9.6592,27.2031c6.3506,7.8252,15.2568,13.9805,24.4424,16.8936 c0.3218,0.2363,1.9512,1.668,3.8271,3.3164c13.7583,12.0869,26.9116,23.2529,30.1147,23.252c0.0293,0,0.0581-0.001,0.0859-0.0029 c0.3774-0.0254,0.5986-0.1953,0.7178-0.333c8.8774-10.249,46.7324-87.8701,47.2861-99.6006 c3.2964-2.6094,11.5024-10.2197,24.4009-22.6289c0.5254-0.5049,0.8848-0.8506,1.04-0.999l0.002,0.002 c1.7139-1.3789,3.1289-3.0518,4.2051-4.9697l0.0488-0.1221c0.6582-2.583,0.4395-5.3262-0.6113-7.7715 c8.6934-6.8301,15.6523-6.9551,24.7217-0.4814c8.0654,5.5879,13.2676,14.3906,14.2715,24.1406 c1.708,20.335-10.9346,38.2744-22.9189,53.4922c-5.7227,7.2637-10.9043,13.3262-15.915,19.1885 c-15.7607,18.4385-27.1484,31.7617-35.7886,60.0723c-7.9858,26.4863-9.564,54.8789-4.5469,82.1729l0.3198,1.041 c0.6509,2.0947,1.2656,4.0742,1.293,6.2979c0.2222,1.1885,0.4443,2.3574,0.6665,3.5264c0.374,1.9658,0.7476,3.9316,1.1372,6.0518 c0.3726,1.1562,0.606,2.3545,0.6958,3.5674c-25.041,7.5127-43.2969,27.5029-44.5254,48.7783 c-0.4009,0.4014-0.647,0.9238-0.6997,1.4951c-0.0596,0.6465,0.1367,1.2783,0.5522,1.7793c0.0957,0.1143,0.2021,0.2207,0.3477,0.3389 c6.8257,4.8047,14.3804,8.3271,22.4468,10.4658c10.3281,2.8838,21.6479,4.3242,33.6436,4.3242 c12.5166,0,25.7686-1.5693,39.3887-4.7051c4.3779-1.0059,8.6514-2.1094,13.3379-3.335c4.3154-0.7002,8.2588-2.6729,11.4502-5.752 c0.6641-0.8311,0.9736-1.9131,0.8516-2.915c-0.1855-25.5586-19.4297-47.0654-46.8447-52.4131 c-0.5176-3.2773-1.2402-6.8135-2.2646-11.0869l-0.0918-0.1865c-0.4443-0.8125-2.2891-7.8086-2.3174-8.4141l0.0137-0.0811 l-0.0137-0.0811c-5.4404-33.7744-3.9365-61.1514,4.5977-83.6943C162.2613,163.1226,174.7252,148.4742,186.7789,134.3081z  M126.584,66.2407c-3.1631,5.5215-5.8794,11.3457-8.0674,17.2959c-10.104,24.3867-21.7334,48.4375-34.5752,71.5059 C79.4307,132.2007,47.0523,82.898,9.108,57.9009c29.1929-8.8506,59.3008-15.4854,89.5679-19.7354 c1.8599-0.4922,3.7705-0.8545,5.6821-1.0781c0.8511,0.5869,1.3657,0.7012,1.8643,0.8125 c1.2368,0.2754,2.7764,0.6182,12.3896,10.5283c4.6021,4.7402,6.4971,12.2002,7.4082,15.7861 C126.2559,65.1431,126.4268,65.8159,126.584,66.2407z M24.3697,84.8902l2.6675,2.6631 c5.9946,5.9775,10.3257,10.2969,14.3179,15.0625c13.8691,16.5615,21.8442,27.292,23.7041,31.8926 c0.0195,0.0488,0.0386,0.0957,0.0571,0.1406l-3.7856,0.9453c-8.4912,0.9277-17.2222-2.4023-25.9512-9.9121 C19.7017,112.1929,17.9932,95.1001,24.3697,84.8902z M111.2994,33.9175c5.0166-4.0068,6.7915-5.3564,7.8672-6.1738 c1.2227-0.9287,1.479-1.124,4.5835-3.7842c4.0112-3.0205,8.2236-5.8711,12.522-8.4746c0.4121-0.1396,0.7637-0.2842,1.0781-0.415 c1.5625-0.6484,2.0322-0.8418,5.8125,2.9375c7.5244,6.4482,11.3398,11.8184,11.3398,15.959l0.0244,0.1553 c0.458,1.4033-0.2217,2.8955-1.5801,3.4717l-0.1172,0.0693c-3.2178,2.5732-19.0889,18.3564-22.458,21.7139 C127.2925,48.8306,120.5577,39.8394,111.2994,33.9175z M204.8873,54.354c-0.6729-10.7178-5.7432-20.8613-13.9102-27.8301 c-6.1084-5.2529-12.5781-7.9521-18.6885-7.9521c-3.2598,0-6.4189,0.7686-9.3633,2.3281c-1.9541,1.1064-3.7266,2.4854-5.2773,4.1055 c-0.0439-0.0234-0.0889-0.043-0.1357-0.0586c-2.0664-3.1338-4.5459-5.9717-7.3301-8.3945c-0.5205-0.584-1.1045-1.1064-1.7422-1.5576 c4.1562-3.1934,8.7861-5.6436,13.7715-7.2871c13.4014-3.9736,29.6807,1.5,41.4639,13.9453 c14.749,15.5772,18.6309,37.3291,10.6504,59.6797c-6.3975,17.9219-20.2334,34.6494-33.6123,50.8262 c-9.8145,11.8662-19.084,23.0742-25.3984,34.5098c-16.1885,29.3125-19.458,67.9102-9.7178,114.7207 c1.0625,5.0977,1.7344,7.8516,2.0957,9.3311c0.4463,1.8271,0.4463,1.8271,0.2637,2.3359l-0.0889,0.2549 c-1.085,1.5342-2.8447,2.4023-4.8154,2.335c-3.3066,0.4316-10.3311,0.1895-10.9541-3.3066 c-0.4824-2.6943-1.2192-5.9004-2.0723-9.6123c-3.0566-13.2969-7.6758-33.3926-6.4624-57.1162 c1.2373-17.3682,4.9746-34.4375,11.1069-50.7266c7.0254-17.9102,20.8076-34.2021,34.1367-49.958 C188.2779,101.9107,206.6685,80.1714,204.8873,54.354z M124.8985,294.5464c0.2935,0.749,0.9648,1.9248,1.5396,2.3232 c2.5034,3.6934,6.6514,5.9629,11.0801,6.0723c5.0889,0.5088,10.1934-0.8252,14.3799-3.7588l0.1436-0.1074 c1.6602-1.7637,2.7295-4.0244,3.0459-6.417c23.4492,5.3486,39.0635,23.0254,39.8994,45.2109 c-2.876,2.332-7.9209,3.4492-16.165,5.2744c-1.1045,0.2441-2.2666,0.501-3.4873,0.7754 c-20.0869,4.5176-43.9297,8.2725-68.4644,1.8633c-7.4766-1.9414-14.8403-4.5088-21.8936-7.6328 C85.8853,319.4546,102.5772,301.2339,124.8985,294.5464z"/></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 404.9558 269.009" xml:space="preserve"><path fill="${color}" d="M398.903,166.605c-0.7423-1.0947-1.4448-2.215-2.0738-3.3821c-0.8965-0.8903-1.7962-1.7777-2.6779-2.6844 c-1.3348-1.3726-2.6643-2.7479-3.8691-4.2384c-0.3639-0.4501-0.7121-0.9131-1.0636-1.3731c0.0081,0.0116-0.523-0.6721-0.6909-0.8876 c-0.5425-0.6958-1.0883-1.3891-1.6395-2.0783c-2.212-2.7637-4.5382-5.433-7.0411-7.9366c0.0013,0.0054,0.0022,0.0121,0.0035,0.0175 c-0.025-0.0294-0.0465-0.0596-0.0714-0.089c-0.2351-0.2346-0.4479-0.4902-0.6867-0.7213c-0.5532-0.5351-0.9662-1.1407-1.3172-1.7705 c-11.6082-15.0531-14.7266-31.7354-25.2201-48.2034c-2.0288-13.359-7.6252-25.923-16.199-36.3668 c-15.3878-16.8481-34.0082-30.4278-54.7526-39.9306c-6.1557-2.5108-12.5544-4.4549-20.0059-6.7227 c-26.6732-9.2504-55.0868-12.2583-83.0982-8.9172c-1.8919,0.5327-3.8251,0.7591-5.7773,0.8444 c-0.4205,0.1179-0.8448,0.2175-1.2576,0.3688c-0.193,0.0707-0.4024,0.0499-0.6006,0.0959l0.019,0.0756 c-8.7115,1.5599-17.2483,3.943-25.5367,7.0344c-0.3495,0.197-0.7017,0.3891-1.092,0.5159c-0.3807,0.2-0.7823,0.3231-1.1862,0.4378 c0.0299-0.004,0.0596-0.0082,0.0895-0.0121c-0.0531,0.0079-0.1033,0.0279-0.1565,0.0366c-0.1589,0.043-0.3189,0.0831-0.4815,0.113 c-0.6026,0.13-1.1939,0.2986-1.773,0.5099c-1.1476,0.5344-2.2807,1.0987-3.4323,1.6252c-0.5515,0.3198-1.1303,0.5398-1.7196,0.721 C112.54,22.9961,93.0231,39.3796,79.9254,60.536c-14.2725,6.3606-28.1721,13.5266-41.6317,21.4637 c-7.4341,3.266-14.586,7.14-21.3826,11.5823c-6.4237,4.0671-11.9384,9.4165-16.1991,15.7131c-0.9494,2.1121-0.9494,4.5295,0,6.6417 c1.9725,4.0137,4.726,7.5936,8.0995,10.5295c14.822,12.8782,22.3545,6.8036,50.541,47.0582 c14.4171,20.4918,19.6818,46.6531,37.7438,68.7649c12.7161,15.5512,19.0339,32.3981,48.5972,24.8656 c16.1991-4.0497,25.1086-11.0963,47.2201-17.0899c11.2585-2.9968,22.8407-5.1838,34.0992-8.5855 c69.8179-20.8969,53.3759-15.2271,101.163-22.0307c8.0995-1.2149,16.7661-3.0779,25.1086-4.3738 c14.6277-1.1958,29.3076-1.6284,43.9803-1.296c3.7803-0.9887,6.5539-4.2139,6.9657-8.0995c0.7084-4.2539,0.899-8.5783,0.567-12.8782 C405.5674,183.6539,403.4791,174.5241,398.903,166.605z M203.3614,5.6213l-0.0803,0.4049 c19.4962,0.7218,38.7965,4.1568,57.3445,10.2055c6.5848,1.8304,13.0728,3.9929,19.4388,6.4795 c19.8548,9.0687,37.6988,22.0109,52.485,38.0679c14.4171,17.0091,17.6569,39.1206,16.199,61.5564 c-1.053,13.5261-9.8006,22.3545-20.4109,30.9402c-1.1338-9.1525-16.1991-16.1991-24.9464-17.5761 c-1.2959,0-1.4579,0.486,2.0249-1.4579c6.2289-3.4578,11.2152-8.784,14.255-15.2271c1.1341-1.2149-0.7289-2.9157-1.7819-1.7008 c-8.8285,6.0746-13.5261,10.9344-25.4324,18.3858c-0.81,0-0.6481,1.9441-5.8317,1.7011c-7.2171-1.705-14.6156-2.521-22.0307-2.43 c-7.4356-18.7166-5.2582-39.8854,5.8317-56.6967c13.9312-18.7099,19.1958-11.9063,19.1958-15.3891 c0-5.4265-35.476,4.3738-35.0711,47.6253c0.2979,8.5477,2.6898,16.8914,6.9657,24.2986c-9.6355,0.4778-19.116,2.6149-28.0246,6.3176 c-1.8627-1.7008-9.6384,2.3489-14.6601,0c4.2823-14.4913,5.8744-29.6443,4.6979-44.7093 c-1.2097-8.9891-5.0091-17.4317-10.9344-24.2986c-6.614-7.5412-14.9491-13.376-24.2986-17.0091 c-19.2769-6.9657-25.8375,2.8349-37.2579,6.4795c-1.8919,0.636-3.9398,0.636-5.8317,0c-7.2895-2.3487-26.9715-8.0995-31.2643-1.5389 c-3.3208,4.9408,1.5389,12.2304,4.6979,17.738c3.1587,5.5079,4.2117,5.8317-1.053,19.1958 c-1.5681,4.4309-3.633,8.6695-6.1557,12.6352c-4.1308,4.2927-17.981,7.4517-20.5729,12.4733 c-5.2646,9.7193,14.7412,19.5199,18.4669,24.2986s10.2055,13.6071,13.6882,17.3329c13.2023,14.4171,45.5193,17.738,62.2854,12.3923 c8.0891-2.5489,15.3932-7.1209,21.2207-13.2831c5.1028,4.2927,4.1308,11.0152,2.7538,17.738 c-0.81,3.8876-4.9406,6.1555-8.0995,8.0995c-10.4032,6.7208-22.7213,9.8501-35.0708,8.9095 c-3.217-1.0426-6.3342-2.3707-9.3144-3.9689c-8.082-1.925-15.7964-5.1529-22.8407-9.5574 c-6.1186-6.1896-13.273-11.2609-21.1399-14.9842C74.4979,159.2693,67.2084,113.264,79.2768,77.14 C94.1799,31.2966,153.8734,4.7302,203.3614,5.6213z M171.6118,128.572c-10.5293-16.199-19.9248-10.5295-27.1335-14.2552 c-10.2052-5.3457-11.7442-11.3393-15.7939-14.255c-1.9445-1.2698-4.0765-2.2263-6.3176-2.8349 c1.8909-4.1182,3.0685-8.5276,3.4827-13.0404c-0.567-5.5076-9.4766-17.3329-8.0995-20.0058 c4.2927-2.0249,20.2488,2.43,24.7845,3.9689c8.6665,2.9157,18.6288-5.2646,26.2424-8.0995 c12.5544-4.1308,30.1302,6.4795,38.6349,16.199c13.8501,16.1991,10.7723,36.0427,6.6417,56.6967 c-2.254,20.0882-17.1682,36.4385-36.9499,40.5424C184.8598,159.6094,180.2688,141.3971,171.6118,128.572z M161.2445,148.4159 l-0.0811,0.4049c0.6481,1.1338-0.8908,2.6727-2.2679,1.2149c-2.1376-2.1109-3.0796-5.1497-2.5108-8.0995 c0.2726-2.9597,2.278-5.4743,5.1027-6.3987c2.187-0.7289,2.43,1.2959,1.62,1.944 C160.8109,140.6345,160.1215,144.6803,161.2445,148.4159z M397.4267,207.9473c-1.5389,1.5389-22.7597-1.7819-44.4666,1.377 c-8.0995,1.2149-16.7661,3.0779-25.1086,4.2117c-46.7342,6.6417-32.3981,1.2149-102.1349,22.2737 c-11.1774,3.3208-22.5977,5.5076-33.856,8.5047c-21.8688,5.9125-31.3451,13.1212-47.1393,17.009 c-25.1897,6.3176-29.5635-7.4517-42.1176-22.6788c-17.6569-21.5448-22.7596-47.3012-37.5817-68.2789 c-29.1583-41.2266-36.7719-35.0708-51.7561-47.8682c-2.9481-2.4307-5.3729-5.4342-7.1276-8.8285 c-0.5235-0.8723-0.5235-1.9623,0-2.8349c3.9492-4.8837,8.5875-9.1671,13.7693-12.7163c6.5646-4.3587,13.4719-8.1779,20.6537-11.4204 c11.1774-6.0746,26.1616-15.389,35.8811-19.6007c-18.3861,38.8776-11.8255,97.1943,34.0179,108.2095 c2.9249,0.9961,5.6626,2.4743,8.0995,4.3738c5.6814,5.2414,11.9295,9.8325,18.6291,13.6882 c5.5076,2.4298,11.7442,3.7257,17.252,5.7506c9.1038,5.3867,20.2224,6.1379,29.9681,2.0249 c8.9043-2.6836,17.171-7.1474,24.2986-13.1212c1.4925-1.5528,2.5294-3.4862,2.9968-5.5887 c1.4579-8.0995,2.106-15.632-4.0498-20.6537c4.3429-5.3284,7.6405-11.429,9.7195-17.981c2.821,1.0381,5.8653,1.3175,8.8284,0.81 c-12.1493,9.9623-8.5855,18.5477,7.0466,22.5167c15.0648,3.7319,30.6911,4.6383,46.0863,2.6727 c15.2272-1.3768,35.719-0.4859,48.0302-9.8814c12.3112-9.3955,24.7845-20.3296,26.3235-37.0957 c1.5389-16.7661-0.8911-20.6539,1.5389-15.389c4.7787,10.2052,8.5044,20.9777,14.012,30.6162 c9.3955,16.1991,26.8905,25.5945,29.4013,44.7093c0.5504,3.3764,0.8752,6.7858,0.9719,10.2055l-0.1617,0.4049 C399.4515,197.9039,400.4234,205.0315,397.4267,207.9473z M192.5896,116.9087c-3.7535,0.2833-7.4701,0.9343-11.0963,1.9439 c-3.8068,1.4579-7.1276,3.8068-5.2646,7.4515c2.3479,5.2132,5.9349,9.7734,10.4483,13.2832 c1.1339,1.2149,2.9158-0.567,1.7819-1.7819s-1.296-3.7258-5.8317-12.7163c3.8519-1.6691,7.5627-3.6464,11.0963-5.9126 c0.5599-0.4458,0.6523-1.2611,0.2065-1.8211C193.6108,116.9546,193.0854,116.7795,192.5896,116.9087z M176.1476,93.6631 c-4.4559-0.3944-8.3877,2.898-8.7821,7.3539c-0.1712,1.9347,0.3585,3.8666,1.4926,5.4434c0.1776,0.6933,0.8835,1.1114,1.5769,0.934 c0.4585-0.1174,0.8166-0.4754,0.934-0.934c0.0122-4.191,2.2271-8.067,5.8317-10.2054 C178.4154,95.364,178.1724,93.2582,176.1476,93.6631z"/></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 324.4626 437.1873" xml:space="preserve"><path fill="${color}" d="M314.5615,280.12l-0.1221-0.0781l-0.1416-0.0264c-2.1011-0.4004-4.563-0.9209-7.1699-1.4707 c-2.3726-0.501-4.813-1.0166-7.0459-1.4531c1.1011-1.2158,3-3.2051,5.1143-5.4199c4.8071-5.0352,10.2559-10.7422,11.2969-12.5078 l0.082-0.2012c4.2451-17.1533,4.0244-35.2285-0.6416-52.2832c-0.373-1.2852-1.4697-2.2412-2.7632-2.4297 c-6.5508-1.2451-13.0356-2.417-19.3081-3.5508c6.7437-6.8564,13.625-14.4033,20.2896-21.7119l4.1494-4.5469l0.1211-0.1768 c0.2261-0.4648,0.2515-0.9893,0.0757-1.4658c-0.0063-3.3955-0.2222-6.3066-0.4717-9.668c-0.0996-1.3428-0.2046-2.7598-0.3047-4.3154 c-0.0659-0.9551-0.8984-1.6846-1.7988-1.6143l-4.479,0.001c2.501-16.1504,2.4551-32.5166-0.1318-48.6211 c-0.186-1.709-1.6182-2.9922-3.3511-2.9922c-25.8887,0-52.6357,0-78.8623,0.7148c0.9086-0.0248,3.1514-2.9857,3.7876-3.6597 c1.2469-1.3213,2.4307-2.7021,3.5457-4.1365c2.2193-2.8552,4.1647-5.9226,5.8011-9.1475 c2.7466-5.4122,4.4689-11.4617,5.1633-17.5463c0.3618-3.17,0.4571-6.3691,0.3113-9.5559c-0.1384-3.0237-0.0939-6.319-1.1685-9.1845 c-0.5059-1.9346-1.0293-3.9336-1.77-5.8906l-0.2915-0.4268c-0.0801-0.1016-0.1602-0.2021-0.2368-0.3057l-0.355-0.4805 c-0.8755-1.1865-1.7808-2.415-2.8887-3.4834c-1.9292-1.8613-4.9795-2.9258-8.3779-2.9258c-0.0249,0-0.0498,0-0.0747,0 c-3.7017,0.0166-7.1689,0.9785-10.4028,1.9619c-1.9741,0.6006-3.5181,1.6348-4.8926,2.6631 c-0.4707,0.3525-1.3257,1.0498-2.2954,1.8428c-1.1392,0.9307-2.4663,2.0146-3.4731,2.7832 c0.0195-0.6523,0.0376-1.2949,0.0537-1.8984c0.0508-0.3271,0.0718-0.5869,0.0645-0.8135c-0.0176-0.6045-0.0176-1.209-0.0117-1.8105 l0.0229-1.1094c0.0986-2.0547,0.521-7.1543,0.9287-12.0859c0.3843-4.6455,0.7476-9.0332,0.7852-10.249 c0.0859-2.752-0.1006-3.4219-1.25-4.4824l-0.1143-0.0869c-1.9653-1.2168-4.1304-2.4658-6.1772-3.6348l-0.1343-0.0596 c-0.8179-0.2734-1.6592-0.5625-2.2729-0.8203c-1.771-0.7402-3.5498-1.4619-5.3379-2.1621 c-9.5117-3.7236-18.4141-6.5137-27.2153-8.5283l-0.9175-0.167v0.0605c-14.3589-2.2373-26.5107-0.1592-34.2363,2.0078 c-7.7882,2.1836-14.6115,5.5048-18.1097,8.7398c-0.7701,0.7121-1.2443,1.6768-1.3226,2.7227 c-0.7613,10.1703-5.1056,71.65-1.3816,103.2973c-22.0352,10.9541-60.4604,30.4434-82.7021,41.9492 c-1.1343,0.1641-1.5273,1.6562-1.876,2.9824c-0.1353,0.5127-0.2749,1.0439-0.4297,1.3916l-0.0444,0.1318 c-3.2485,13.7539-3.1084,28.2568,0.4053,41.9424c0.5605,2.1836,2.5312,3.6602,4.7568,3.625 c20.4482-0.4424,44.0698-1.0283,61.8652-1.5322l0.6704,5.7793c0.5542,4.7881,1.188,10.2705,1.6567,14.1787 c-4.3975,2.5986-41.8423,24.7422-59.7544,35.8389h-0.417l-2.1582,1.2959l-0.0933,0.2393c-0.2148,0.5518-0.2671,0.8359-0.3135,1.0869 c-0.0571,0.3086-0.1113,0.5996-0.7148,1.8057l-0.0508,0.1318c-4.089,14.4939-1.7088,41.2451-0.4694,52.2719 c0.3214,2.86,2.6858,5.0463,5.5621,5.1446c2.6319,0.09,5.7899,0.175,8.0977,0.1646c3.1919-0.0117,6.4673-0.0264,9.0278,0.0742 c-1.5786,1.1787-3.2075,2.3936-4.877,3.6377C36.186,342.3993,15.2661,357.992,0.5268,371.2381l-0.2354,0.2109l-0.0127,0.3164 c-0.7998,19.7598,0.1235,39.7178,2.7437,59.3203c0.4668,3.4932,3.4458,6.1025,6.9497,6.1016c0.0298,0,0.0596,0,0.0894,0 l55.3569-0.6895l0.2529-0.0439c1.9976-0.2725,4.1362-0.5312,6.269-0.5859l0.7217-0.0186l0.0044-0.3594 c52.3164-0.4209,98.0986-1.4023,139.9473-3.001l0.1846-0.0068l0.1602-0.0918c1.9395-1.1133,5.521-3.6338,5.6841-3.7715 c0.1313-0.1113,47.4155-49.0498,67.8521-68.6484l0.1226-0.1523c0.3936-0.6504,0.8564-1.1426,1.416-1.5039l0.0991-0.0762 c0.2217-0.2031,0.4844-0.3662,0.7544-0.5342c0.0293-0.0186,0.0552-0.0352,0.0767-0.0498l0.1724-0.1055 c0.0889-0.0449,0.1738-0.0967,0.3291-0.1943l0.1167-0.0879c9.9209-9.0498,30.1353-27.8506,31.9917-29.5771 c1.2422-0.3955,2.0684-1.8174,2.522-4.333C325.8818,313.4413,320.9037,284.1786,314.5615,280.12z M132.9423,428.5526 c-27.4438,0.75-58.5371,1.5986-123.4482,2.1982c-2.521-17.7588-3.7441-35.8457-3.6367-53.7822 c19.2725-0.3496,39.2217-0.6514,58.521-0.9434c50.5288-0.7656,102.77-1.5566,152.561-3.3105 c-0.0269,8.4502-0.4863,18.7588-0.9316,28.7393c-0.2852,6.4006-0.5773,12.9535-0.7504,18.9612 c-0.1075,3.7314-3.1558,6.7034-6.8886,6.7321C175.0173,427.4037,155.4093,427.9386,132.9423,428.5526z M301.539,293.1434 c-0.563-4.4238-1.3291-8.8525-2.2832-13.2031c2.6875,0.7686,8.73,2.3828,11.668,3.124L301.539,293.1434z M210.9599,67.0858 c0.0532-1.0312,1.2852-3.2041,2.2749-4.0098l0.354-0.29c0.4756-0.3906,0.9517-0.7822,1.4482-1.1455 c1.2749-0.9307,2.7383-1.5352,4.0015-2.0039c2.3232-0.8613,5.021-1.7129,7.4409-1.5273c1.437,0.1113,2.5234,0.6064,3.229,1.4697 c0.7007,0.8594,1.0869,1.958,1.2158,3.457c0.1089,1.2734-0.1406,2.5664-0.3813,3.8174c-0.334,1.7334-0.6528,3.124-1.0015,4.3633 l-0.0669,0.1846c-2.8394,11.6328-9.8379,21.5859-19.7764,28.1748c0.3428-8.3066,0.9043-21.9717,1.1826-30.1338 C210.8808,69.4422,210.9448,67.5086,210.9599,67.0858z M209.5063,112.1014c-0.1387-2.457-0.1284-4.9365,0.0308-7.3906 c14.8789-7.251,25.0464-21.9395,26.5713-38.415c0.8843-6.999-0.3945-11.4873-3.8013-13.3398 c-5.3799-2.9268-14.4175,1.752-21.0483,7.0166v-4.1924c10.1519-8.4229,17.6631-12.1133,22.333-10.9736 c2.2197,0.542,3.8633,2.1533,5.0239,4.9258c4.1265,9.8818,2.7461,24.748-3.5166,37.8721 C229.1786,100.0125,220.1157,108.6746,209.5063,112.1014z M205.2612,82.3211c-2.7446,50.2773-2.9688,54.3838-34.4341,57.9102 c-16.458,0.8496-45.1987-3.5098-48.5029-25.1445c-2.1153-30.3124-2.1547-61.0281-0.1195-91.3629 c0.0804-1.1988,1.3678-1.9345,2.4347-1.3821c22.5555,11.6791,51.6316,11.9906,82.6093,0.8685 c1.0217-0.3668,2.0795,0.4418,1.983,1.5231C207.1003,48.6391,206.0847,67.2389,205.2612,82.3211z M209.9326,115.9168 c5.5303-0.9404,10.8315-3.1543,15.3857-6.4287c4.0864,0.1064,55.5884,1.4443,81.2646,1.335 c0.0151,0.5879,0.0732,0.8809,0.2866,1.9199c0.0669,0.3252,0.1499,0.7295,0.2534,1.249 c-6.6211,3.9502-15.7915,9.4893-24.667,14.8496c-5.7192,3.4541-11.1997,6.7646-15.5376,9.3711l-0.1509,0.0908l-0.0947,0.1475 c-0.1216,0.1904-0.272,0.3506-0.4478,0.4756c-3.0962,2.2129-6.5122,4.4902-10.7515,7.167c-0.748,0.4717-1.4961,0.9629-2.2485,1.457 c-2.4956,1.6387-5.0767,3.333-7.8052,4.4033c-0.6436,0.2529-1.3242,0.4766-2.0801,0.6865l-10.2979,6.3184 c-59.3823-0.4727-122.5229-0.0391-183.5879,0.3809l-3.1484,0.0215l8.1304-4.1387c19.0615-9.6963,47.7681-24.2988,62.2563-32.001 c3.772,9.1104,12.7451,16.5293,25.3555,20.9414c11.9233,4.1709,25.708,5.1729,37.8203,2.75 C199.1537,143.0535,210.0737,131.7752,209.9326,115.9168z M255.9194,218.6912c-0.229,3.7295-0.4658,7.5859-0.603,11.126 c-0.0615,1.8145-1.5312,3.2598-3.3408,3.2891c-40.8267,0.3594-83.2827,2.1494-124.3413,3.8809 c-7.0537,0.2969-14.0767,0.5928-21.0552,0.8809c-0.354-2.3428-1.1855-8.835-1.9927-15.1357 c-0.7231-5.6465-1.4692-11.4688-1.937-14.8379c60.9082-1.8291,112.7104-3.6572,154.0015-5.4336 C256.6157,207.3563,256.2621,213.1141,255.9194,218.6912z M238.1288,164.6199l-0.0356-2.1064l12.6787-8.0527 c0.8452,10.374,1.9961,23.9023,2.8159,33.4951c-2.7554,1.5791-8.1909,4.7998-12.6025,7.4131 c-1.1899,0.7051-2.2905,1.3564-3.2197,1.9062C238.5024,186.6073,238.3207,175.9129,238.1288,164.6199z M268.4692,143.1434 c0.7241,4.9473,1.146,10.4346,1.5552,15.75c0.4707,6.1191,0.957,12.4395,1.9077,18.1924l-14.9951,9.4199 c-0.7017-9.8574-1.8062-24.2256-2.5542-33.9492L268.4692,143.1434z M275.2656,175.3221 c-1.3672-11.4365-3.0542-24.4551-4.2983-34.0518c0.5464-0.3652,1.4912-0.9707,2.8262-1.8252 c4.4966-2.8799,13.7744-8.8203,33.4712-21.9102c1.7061,13.6924,1.3818,27.5156-0.9648,41.1182 C297.2241,163.3621,284.435,170.0623,275.2656,175.3221z M36.2529,165.0379c20.9722,0.001,42.9395,0.0557,64.1899,0.1084 c43.772,0.1084,89.0273,0.2227,131.6113-0.1025c-0.374,11.6689-0.1699,23.4717,0.6064,35.1104 c-39.9194,0.0967-165.6279,2.4287-193.7407,3.0254c-1.5933,0.042-2.9624-1.0605-3.2969-2.6006 C33.0878,188.8983,33.3066,176.6209,36.2529,165.0379z M310.7582,256.411c-14.4663,15.5176-33.0771,35.543-49.8677,54.0254 c-0.0713-7.2988-0.5083-17.9111-0.8975-27.3672c-0.1963-4.7725-0.3794-9.2158-0.4937-12.7236 c1.437-1.3623,5.9414-6.2773,21.6147-24.0049c6.5737-7.4355,22.3965-25.4004,31.2686-36.0605 C315.1938,225.5106,314.6371,241.4188,310.7582,256.411z M89.1616,357.161v-31.3799c50.1206-0.749,105.0381-2.292,158.9253-4.4629 c-0.3247,5.8984-0.3584,13.1436-0.3911,20.1602c-0.0234,5.0537-0.0454,9.8438-0.1699,14.0586 c-31.2891-0.7129-126.2344,1.0332-157.6016,1.6094L89.1616,357.161z M253.9086,271.3631 c0.0215,8.0684,0.3735,21.2871,0.6582,31.9727c0.0972,3.6377,0.1875,7.0273,0.2568,9.9004 c0.0127,0.4014-0.1318,0.7832-0.4067,1.0762c-0.2754,0.292-0.6475,0.46-1.1201,0.4736 c-105.7769,3.2188-147.3345,5.4551-169.6611,6.6562c-20.5879,1.1074-22.4604,1.208-43.0654,0.1367 c-0.2036-1.7695-0.4243-3.5742-0.6484-5.4062c-1.8569-15.168-3.9585-32.3379,1.8843-46.9141 C50.79,269.4071,173.4721,271.4071,253.9086,271.3631z M50.4658,338.6571c5.1714-4.125,10.5166-8.3877,15.8125-12.5137h17.0884 v37.4688l14.6577-0.1738c42.5474-0.501,86.5171-1.0195,128.1582-2.3076c-2.2393,2.0547-4.0591,3.7588-7.0376,6.6758 c-64.1909,0.0059-190.5884,1.8555-210.0381,2.1455C23.3076,360.3192,37.1025,349.3163,50.4658,338.6571z M221.8759,373.4178 c4.5771-3.9893,8.9663-8.2871,13.0547-12.7812l17.168-0.5049v-0.584c0.4839-0.8037,3.8101-4.5654,7.9839-9.2852 c11.3101-12.7891,32.2349-36.4502,53.8257-64.9121c4.084,12.0498,5.7397,24.5977,4.9224,37.3193l-0.0073,0.1143 c-32.8408,26.1836-53.2886,48.9229-71.3345,68.9922c-9.4146,10.4697-18.3296,20.3838-27.96,29.5801 C220.2582,407.9491,221.3578,385.0409,221.8759,373.4178z M280.8564,239.5574c-9.3193,9.6582-18.1284,18.7871-24.6948,26.0713 c-61.7681-1.4502-125.3164-1.8262-186.7803-2.1904l-18.0122-0.1084c15.8315-9.0147,32.269-18.9444,48.1899-28.5625l0.8647-0.5225 l0.7544,5.6338c0.2979,2.2246,2.189,3.873,4.4478,3.8008c50.8872-1.29,149.5527-5.5801,150.5435-5.624l0.2842-0.0117l0.2046-0.1982 c9.8145-9.4873,32.0518-32.0098,34.9155-34.9121l19.104,4.9385C302.7661,216.8514,291.6337,228.3885,280.8564,239.5574z  M123.8964,13.8055c0.0615-0.0371,0.125-0.0742,0.1904-0.1133c26.2056-15.7051,55.293-7.8232,75.0874,1.5605l3.6292,2.1053 c0.7735,0.4487,0.6608,1.6107-0.1877,1.893c-13.6337,4.5356-27.6644,7.0177-39.8922,7.0242c-0.0195,0-0.0361,0-0.0557,0 C146.3061,26.2752,133.267,22.0809,123.8964,13.8055z"/></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 380.8211 348.8141" xml:space="preserve"><path fill="${color}" d="M135.4305,88.2194c-6.4214-0.8379-11.7383,0.5068-15.8071,3.9932c-4.772,4.0889-7.5146,11.0635-7.7231,19.6367 c-0.5073,19.1436,7.6392,41.3936,24.1914,46.8789c3.1401,1.04,6.0454,1.5596,8.709,1.5596 c4.4951-0.001,8.2988-1.4805,11.3633-4.4326c8.583-8.2695,9.0562-26.4316,5.0879-40.0986 C158.5257,106.3707,151.5462,90.3131,135.4305,88.2194z M137.3992,153.069l-0.501-0.1318 c-6.3159-2.0117-10.6728-8.6191-13.2363-13.8799c-3.0557-6.2705-5.2095-14.1221-5.6206-20.4922 c-0.6626-10.0312,0.7173-16.7998,4.2183-20.6953c2.1436-2.3838,5.1577-3.6709,8.9473-3.8232 c10.5146-0.3164,19.6016,8.4395,24.2407,23.3965c2.9131,9.3643,3.8901,25.7813-3.0576,32.9609 C148.9461,153.9615,143.9017,154.86,137.3992,153.069z M373.7405,335.2067l-0.6094-0.251l-0.1094,0.1064 c-9.5889-3.957-36.0703-14.8115-47.29-14.3086c-25.7412,1.1582-59.0508,2.084-91.2637,2.9785 c-23.3965,0.6494-45.4951,1.2637-63.7495,1.9365c-0.535,0.0222-1.0135,0.1936-1.4057,0.478 c-1.0808-5.2817-0.8754-12.2324-0.4136-21.1997c0.7072-13.8105,2.4611-27.6931,4.7127-41.4963 c0.4337,0.2854,0.9662,0.4614,1.57,0.4924c33.418,0.8584,81.7646-1.5352,112.5225-4.1191 c23.9746-1.6982,39.248-4.5156,46.3672-13.8906c5.4043-7.1182,7.2715-17.5156,0.8145-49.4209l0.2178-0.1816l-0.1201-0.5869 c-3.7852-18.5527-7.4434-39.8193-11.3164-62.335c-4.707-27.3652-9.5742-55.6621-14.959-80.5234l-0.5732-2.6523 c-9.4502-43.7617-11.4258-52.8672-67.7109-49.6436c-77.293,4.4326-141.769,9.9365-209.0601,17.8457 C-3.8097,22.5944-1.3571,46.8033,1.4837,74.8346l0.252,2.499c4.7529,46.7783,11.6108,94.9141,20.9653,147.1582 c0.2549,1.4307,0.4995,2.8623,0.7427,4.2871c3.0508,17.8643,6.2012,36.3203,29.8076,36.3193c0.6699,0,1.3569-0.0146,2.0601-0.0449 c0.4072-0.0156,41.1582-1.6982,44.6162-2.5918c0.1239-0.0327,0.2208-0.0715,0.3347-0.1064 c-8.9062,24.9736-16.1581,49.9233-16.3976,64.0508c-0.1475,8.4893,1.3804,14.0527,4.8096,17.5088 c4.3403,4.374,11.4287,4.8994,19.7769,4.8994c1.2954,0,2.6226-0.0127,3.9731-0.0254c7.041-0.0654,16.8496-0.4189,26.335-0.7607 c10.1689-0.3662,20.6846-0.7461,28.1587-0.7881c4.2819-0.0579,7.1047-1.3745,7.3376-3.3782 c3.69,1.7751,8.2173,2.7483,13.6755,2.9387c0.4951,0.0186,1.2583,0.0273,2.2642,0.0273c17.436-0.001,107.2544-2.584,117.3784-3.1504 c3.2098-0.1726,5.3986-0.583,6.6559-1.2561c-0.1925,0.4446-0.3918,0.8914-0.5778,1.3333c-0.7432,1.4111-0.2002,3.1621,1.209,3.9043 c0.4219,0.2227,0.8818,0.335,1.3447,0.335c0.2881,0,0.5762-0.043,0.8594-0.1309c0.7373-0.2285,1.3418-0.7305,1.6621-1.3457 c0.7178-1.1367,1.4043-2.2578,2.0889-3.4121l56.126,0.6787c2.8389,0.4189,3.6045-0.7402,3.8066-1.4688 C381.3401,340.1881,378.262,337.066,373.7405,335.2067z M359.3792,337.3522c-10.7588-0.2227-25.5645-0.3721-35.4287,0.1631 c1.0684-2.0322,1.8564-3.6777,2.5156-5.0537c1.5586-3.2539,2.0635-4.3076,3.4629-4.3076c0.6699,0,1.5449,0.2412,2.8398,0.5996 C341.6683,331.2252,350.596,334.111,359.3792,337.3522z M166.7615,340.0162h-0.0078c-0.0923,0-0.1846,0-0.2783,0 c-7.6133,0-18.4785,0.5049-28.9897,0.9932c-9.4155,0.4365-18.3091,0.8496-24.9082,0.9209 c-0.8804,0.0088-1.7363,0.0215-2.5679,0.0332c-7.4204,0.1055-12.7812,0.1865-15.7661-2.7812 c-2.2441-2.2314-3.2632-6.3193-3.2065-12.8662c0.2202-25.0254,17.9702-68.0449,32.2324-102.6123 c3.9826-9.6516,7.7441-18.7688,10.649-26.3833c0.5206,0.2568,1.1788,0.446,2.0346,0.5063 c4.8701,0.3447,30.2905,0.3057,42.5063,0.2852l1.4614-0.002c-8.6099,36.3027-16.4321,71.8213-18.2104,107.0957 c-0.5776,11.4932-1.2964,25.7979,6.3364,34.1094c0.2594,0.2825,0.5276,0.5557,0.8027,0.822 C168.2164,340.0673,167.5261,340.0233,166.7615,340.0162z M181.2606,222.694c1.5967-7.9775,3.2476-16.2275,4.7578-24.3135 c0.4092-2.2021,0.6641-4.126-0.3638-5.376c-1.0361-1.2607-2.9683-1.5098-6.4004-1.5459 c-6.5776-0.0723-23.3911,0.4316-36.8975,0.8359l-7.1387,0.2109c-0.9474,0.0278-1.8078,0.5229-2.3188,1.2305 c-0.169-0.1155-0.352-0.2188-0.5518-0.3047c-1.4521-0.627-3.498-0.2705-4.4258,1.6201l-0.562,1.1465l0.1685,0.0371 c-6.4485,13.0815-16.7826,37.2546-25.7792,61.9897c-0.5845-0.4321-1.3434-0.709-2.0748-0.7729 c-4.189-0.3867-12.436,0.0762-20.4121,0.5254c-5.8149,0.3281-11.3164,0.6328-14.6626,0.5801 c-1.8296-0.0303-3.5859-0.0215-5.272-0.0127c-16.5879,0.0859-25.7266,0.1279-31.4746-37.7236l-1.8325-12.2178 C19.6102,165.9108,12.9818,121.7653,8.411,77.9508c-0.2319-2.1963-0.4868-4.3789-0.7397-6.5381 C4.932,47.986,2.5662,27.7535,34.5594,23.9645C112.5789,14.7604,180.2337,9.276,235.6439,7.6656 c4.3496-0.127,8.3721-0.2822,12.0967-0.4268c39.6582-1.5371,44.7471-1.7295,54.375,47.3232 c4.2861,21.8828,8.1562,44.1709,11.8994,65.7246c4.8691,28.043,9.9043,57.04,15.8584,85.0967 c3.9453,18.6406,3.4912,29.8994-1.4727,36.5039c-6.458,8.5918-20.7959,9.6416-40.6396,11.0957 c-19.7021,1.4277-44.9795,2.376-69.4248,3.292c-15.6338,0.5859-30.4009,1.1387-42.9526,1.7891 c-0.3296,0.0166-0.6232,0.0898-0.9,0.1855C176.5388,246.2904,178.9167,234.4054,181.2606,222.694z M307.2318,337.3014 c-0.0801,0-0.1611,0-0.2422,0.001l-1.0098,0.0938v0.0098l-112.6025,2.3447c-10.0688,0.124-16.4736-1.6191-20.165-5.4619 c-0.8058-0.8386-1.4703-1.7856-2.0375-2.8218c19.2647,2.0713,126.5226-2.2058,149.723-3.4331 c-0.7061,1.5166-1.4248,3.0322-2.1436,4.5479c-1.1426,2.408-2.3047,4.8694-3.4124,7.3218 C314.5055,338.1967,310.7952,337.3014,307.2318,337.3014z"/></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 268.9163 285.106" xml:space="preserve"><path fill="${color}" d="M264.9344,91.9953c-9.3191-0.1343-9.4724,1.0161-9.2615-2.7129c0.6712-11.7737,0.9395-8.8494,10.6419-18.0918 c0.3643-0.345,0.3259-1.0928,0.4796-1.6489c-4.6691-1.189-10.3736,4.8416-11.7543,3.001c-7.6698-10.249-3.4993-7.0659-0.345-16.7302 c0.9202-2.8091-3.8829-2.6938-5.6662-0.7285c-2.8857,3.1829-4.765,5.6853-8.2164,3.7004c-2.4448-1.4187-9.5491,0.614-8.2163-7.3535 c0.4696-2.8281-4.8033-3.729-5.6279-0.46c-1.5244,6.0496-0.0383,7.2578-4.0939,8.5232 c-14.9852,4.6597-20.8144,29.606-13.0773-9.1846c1.4767-7.3726,2.8571-6.1072,8.9642-12.9045 c0.8438-0.9395-0.1917-2.646-1.3804-2.5693c-3.0584,0.2012-5.9155,3.7583-6.6826-1.438 c-1.9653-13.3362-9.0025-11.6008-5.4936-17.8037c6.5291-11.5435,3.7872-12.1379-5.8002-3.5571 c-2.7228,2.4255-3.279,1.4285-12.0609-0.4412c-4.3718-0.9299-3.0681-4.1511-3.4803-8.197c-0.3356-3.231-4.5924-3.1448-4.7841,0.23 c-0.4602,8.2642,1.3997,7.6509-5.1486,10.2202c-3.9212,1.5435-4.8511-0.3259-7.5262-3.0393 c-2.3295-2.3777-5.2059-0.6709-4.4771,2.6174c0.7285,3.2979,3.7679,3.6912-0.4602,7.0083 c-3.49,2.7324-10.9778,13.6909-12.2335,23.0483c-0.6906,5.1479-4.6691,7.4492-5.4745-3.1929 c-0.5559-7.3345,1.5627-6.3945,2.3585-7.7178c1.2368-2.0708,0.4029-3.7964-2.0516-3.6145 c-2.6365,0.1919-4.0268-0.9587-5.2826-3.1064c-2.4545-4.1704-1.0641-5.1963,0.6712-8.6091c1.0641-2.1094,0.067-4.4009-3.1734-2.4644 c-1.6299,0.9685-2.3011,3.6338-5.2252,2.4448c-12.5595-5.0811-4.6115-4.0647-7.6028-15.3491 c-0.6998-2.6558-6.644-2.6655-6.548,1.1121c0.2493,9.875,2.3105,9.8557-2.2819,10.5461 c-10.1053,1.5244-8.3986,7.0181-13.4992,3.0391c-6.2798-4.8989-9.8847-0.9587-5.321,5.0144c4.7937,6.2703-2.4158,5.436-4.88,18.6282 c-0.8052,4.3049-2.3585,3.2981-4.3814-0.4602c-0.2014-0.3643,1.3231-3.7485,1.4766-6.3372c0.0957-1.5532-1.812-3.8733-3.4036-1.074 c-0.163,0.2974-1.457,5.8772-4.5731,2.9148c-2.7805-2.6365,0.1343-16.5864-5.3786-14.947 c-2.3395,0.6907-2.3011,2.1477-2.7997,6.6633c-0.5656,5.1487-2.9337,3.3652-7.4492,3.8257 c-4.5924,0.4695-3.7776-2.5122-7.8714-8.1592c-2.2339-3.0869-5.8292-0.2109-5.6662,2.2053 c0.2493,3.5759,1.1888,4.2278,2.0326,5.6663c3.0487,5.2344-2.4735,6.0686-3.5473,8.2832c-3.3077,6.8359-8.8589,1.0933-9.9133,5.3979 c-1.2847,5.2246,4.5347,1.572,3.6526,8.8394c-0.9971,8.3123-0.6519,9.0503-4.3047,9.4912 c-4.5921,0.5562-1.5724,6.3948,0.4219,6.3948c5.3209-0.019,5.2443,3.7678,8.437,17.7463c2.8668,12.5403-0.4796,5.4744-9.5107,1.0356 c-5.7811-2.8381-3.2213-3.979-6.414-11.6777c-1.4571-3.5186-5.9538-1.7639-5.7812,1.4189c0.163,3.001,0.9971,4.3816,1.3614,5.9539 c0.4316,1.8601-3.25,3.9309-6.0494,1.6492c-2.7228-2.2148-5.2443-4.9185-7.7178-2.8955c-3.4037,2.7993,2.5598,6.9509,0.7478,9.1465 c-1.8216,2.1956-3.7199,4.4197-5.9538,6.1455c-2.3202,1.7832-4.765-3.3655-7.7371-0.4985 c-0.9012,0.8628-0.7479,2.0994,0.1917,2.9624c4.6884,4.3333,6.7976,1.563,5.5128,8.7148 c-0.6522,3.6338,0.4026,10.2395,0.5942,12.2334c0.4699,4.7844-4.4581,2.0903-3.9405,6.0691 c0.6329,4.8416,5.6279-0.2493,9.7793,7.6602c3.1638,6.0115,5.7429,6.7114,0.0574,9.2231c-3.8253,1.6873-4.1129,5.6279-0.0767,7.2192 c4.5061,1.7834,6.577-4.5154,11.1597,0.6711c0.1727,0.2014,10.7379,13.5759,10.8912,13.7676 c7.6508,9.6162,9.2998,10.6035,7.1042,14.5825c-4.3045,7.7849-1.6201,14.7742-1.4954,18.9351 c0.2396,7.7561-0.4412,26.8542,0.8052,32.4055c0.2109,0.9395-0.7479,4.4387-0.6712,6.5674 c0.7607,20.374,3.0329,28.9399,3.1394,32.5339c0.014,0.0693,0.0605,0.1396,0.0711,0.2087c0.2621,1.7375,0.7601,3.3438,1.2707,5.0095 c0.1559,0.2988,0.3046,0.6011,0.4708,0.8953c0.1574,0.2781,0.3347,0.5449,0.5085,0.8137c0.1954,0.1694,0.4789,0.4199,0.6472,0.6123 c0.7259,0.4163,1.4387,0.8513,2.1912,1.2244c0.0357,0.0178,0.0357,0.0127,0.0688,0.0286c0.4398,0.0085,0.8184,0.2468,0.6773,0.2571 c0.1545,0.0735,0.3242,0.157,0.4169,0.189c0.9468,0.3257,1.9097,0.6018,2.8796,0.8481c1.998,0.5073,4.0406,0.8176,6.0181,1.3953 c72.5146,0.9973,111.2438,2.0322,131.9529,3.136c1.5656-0.2954,3.1271-0.6479,4.6208-1.1555 c0.9828-0.5144,1.9284-1.0908,2.8328-1.7402c1.922-1.5337,3.7899-3.1885,5.3692-5.0503c0.5366-0.8127,1.0261-1.6523,1.4384-2.5295 c0.3143-0.7827,0.6407-1.5442,0.9837-2.2944c1.4521-11.8845,0.1738-14.6653,1.7526-29.1855 c1.0738-9.9133,2.3105-7.1523,1.5147-13.9495c-0.0383-0.3455,0.7765-42.3669,0.2876-43.968 c-1.6777-5.4744-3.6909-6.4524-4.688-7.3918c-2.0806-1.9463-1.1121-1.7832,11.543-16.5767c2.7324-3.1926,6.2797,2.186,12.1185-1.208 c1.6203-0.9395,1.7546-3.6621,0.2493-4.7456c-0.6326-0.4507-1.3997-0.7192-2.1093-1.0933 c-4.0075-2.0996-3.0583-2.6941-0.5176-6.4712c11.5624-17.1331,11.2171-18.5134,16.0398-18.571 c6.1264-0.0767,12.5978-4.4771,7.6698-6.3757c-2.9048-1.1311-6.548-1.1887-5.3976-3.7676 c7.6891-17.2478,7.1809-18.5903,10.7569-18.3215C262.8349,101.2856,275.3751,92.1584,264.9344,91.9953z M200.2675,251.5681 c0.0767,7.1426-0.4792,14.199-2.0037,21.2073c-1.3231,6.0305,0.115,5.158-100.6677,2.1284 c-44.7733-1.3423-44.8596,0.7097-45.6744-5.2058c-1.2657-9.1272-2.0039-17.1902-2.0902-17.3823 c-2.6555-6.3945,1.649-7.7847,16.0591-22.6643c2.3202-2.3967,4.6497-5.7429,6.644-7.4495 c7.2002-6.1648,18.3597,37.7073,33.9202,26.3269c12.6938-9.29,16.0588-15.0713,27.3335-26.4419 c3.7393-3.7678,3.7489,3.2214,17.2095,16.6533c3.8539,3.8445,5.3785,10.0283,11.639,6.5291 c6.5867-3.6816,17.4684-15.5796,21.6866-21.802c1.438-2.1282,3.231-3.1252,4.9183-0.9968 c16.9122,21.3796,10.8434,11.1404,11.0255,29.0977H200.2675z M201.9455,214.2348c-0.0577,0.6697-0.7441,1.2817-1.1473,1.9321 c-5.0102-3.3767-7.7824-10.9041-17.299-5.719c-9.9517,5.4167-14.9753,13.1826-15.5219,13.7288 c-8.9738,8.7727-5.7811,8.9165-12.9813-0.4026c-12.3008-15.9341-13.4609-15.7808-18.1683-17.4585 c-2.4448-0.8726-4.688-0.1152-5.9345,1.7446c-1.649,2.4644-4.0364,3.9407-6.0497,5.9155 c-22.7124,22.2812-22.7221,25.0234-25.2339,21.3989c-9.971-14.3809-18.3024-31.178-26.2407-27.7358 c-11.5624,5.0139-16.5193,14.9849-23.7002,20.9194c-3.5377,2.9336-2.6078-8.571-2.5215-43.3157 c0.0193-9.175,7.4111-6.2322,24.9466-9.0796c5.7618-0.9297,43.239-1.7639,43.4309-1.7639c44.1787,0,50.5735,2.9817,68.3965,4.7456 c8.2833,0.8247,10.0476,2.6558,16.4614,3.864c2.1189,0.4026,2.8284,0.9778,2.6941,3.1443 C202.5974,193.9094,203.9301,189.9306,201.9455,214.2348z M246.3539,94.9099c-2.3969,5.9731-3.5953,12.4062-6.8166,18.0918 c-15.5892,27.5635-8.389,15.2437-38.2057,58.1763c-4.88,7.0273-0.1919,3.3267-40.4492-2.3586 c-20.8621-2.9434-68.0129-3.0583-88.8944-0.2876c-28.9252,3.8347-20.0472,8.5999-28.5802-3.3174h-0.0287 c-21.236-29.644-26.1351-34.668-28.043-44.6196c-0.7382-3.8733-5.4362-8.1973,0.0573-19.9514 c4.1322-8.8301,16.8453-11.6008,25.8958-3.3174c17.4202,15.9536,14.6783,19.1079,20.1429,25.656 c1.3614,1.6204,4.8417,2.5981,4.6884,0.1726c-0.115-1.8599-14.966-51.3979-15.0236-51.5898 c-0.7862-2.4448,1.6203-4.5732-0.019-6.8167c-2.8764-3.9402-1.2464-17.4009,8.437-23.9299 c11.2171-7.5645,22.3002,3.7776,26.7487,16.96c9.7887,29.0596,6.1071,47.6877,15.5988,50.2668 c8.3027,2.2625-5.8292-38.7236-4.88-56.2207c1.8406-34.2075,34.2461-45.4248,40.8711-2.905 c1.553,9.9709-8.5903,7.8235-16.2124,41.2739c-6.1647,27.0459,1.3904,32.252,3.7103,23.9299 c3.2503-11.658,2.7997-44.8496,20.7375-56.5273c10.4886-6.8357,33.6232-8.3506,34.1311,28.5994 c0.2013,14.8315-7.6891,41.9448-5.9728,46.5371c4.3621,11.6584,14.0551-32.8848,14.3428-47.7356 c0.1533-8.1013-1.3997-14.0742-3.8829-20.2773c-2.4832-6.1648,6.3564,0.7576,12.5018-13.7097 c1.1121-2.6177-1.2847-4.2473-5.2632-1.8027c-8.6096,5.2922-8.2454,12.3101-11.1598,7.4878 c-3.9595-6.5479-10.2779-9.0503-17.2861-10.3923c-3.4706-0.6614-8.341,1.1121-7.1233-2.4832 c11.0255-32.5493,45.4252-33,46.8632-5.647c0.9588,18.2637-12.3965,56.5654-9.4724,62.0398 c5.3306,9.9709,15.7521-29.999,33.364-33.7476C243.7654,62.9262,252.6817,79.1386,246.3539,94.9099z M181.6488,39.1169 c-3.6144-0.8438-0.6998-9.3669,2.3777-8.1016C186.0494,31.8591,184.3715,39.7495,181.6488,39.1169z"/></svg>`,
      ];
      return furnitures[index];
    },
    reportIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 138.205 174.702"><path d="M133.959 24.22l-18.454-19.689C112.786 1.63 109.098 0 105.253 0H13.1C5.865 0 0 6.258 0 13.977v146.748c0 7.719 5.865 13.977 13.1 13.977h112.005c7.235 0 13.1-6.258 13.1-13.977V35.158C138.205 31.055 136.678 27.121 133.959 24.22zM110.481 138.596H26.823c-2.529 0-4.579-2.187-4.579-4.886s2.05-4.886 4.579-4.886h83.658c2.529 0 4.579 2.187 4.579 4.886S113.01 138.596 110.481 138.596zM110.481 106.992H26.823c-2.529 0-4.579-2.187-4.579-4.886s2.05-4.886 4.579-4.886h83.658c2.529 0 4.579 2.187 4.579 4.886S113.01 106.992 110.481 106.992zM110.481 75.388H26.823c-2.529 0-4.579-2.187-4.579-4.886s2.05-4.886 4.579-4.886h83.658c2.529 0 4.579 2.187 4.579 4.886S113.01 75.388 110.481 75.388z" fill="${color}"/></svg>`;
    },
    interActionIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 446.1 446.1"><path class="st0" d="M446 437.3L414.4 193c-0.4-3.3-4.4-4.5-6.6-2.3L360 238.4c-0.7 0.7-1.8 0.7-2.5 0l-26.9-26.9 0 0L207.6 88.6c-0.7-0.7-0.7-1.8 0-2.5l47.7-47.7c2.3-2.3 1-6.2-2.3-6.6L8.8 0.1c-5-0.6-9.3 3.7-8.7 8.7l31.6 244.3c0.4 3.3 4.4 4.5 6.6 2.3L86 207.6c0.7-0.7 1.8-0.7 2.5 0l27 27 0 0 122.9 122.9c0.7 0.7 0.7 1.8 0 2.5l-47.7 47.7c-2.3 2.3-1 6.2 2.3 6.6L437.3 446C442.4 446.7 446.7 442.4 446 437.3z" fill="${color}"/></svg>`;
    },
    okIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 545.677 545.677"><path class="st0" d="M272.839 0c-150.685 0-272.839 122.154-272.839 272.839s122.154 272.839 272.839 272.839 272.839-122.154 272.839-272.839S423.523 0 272.839 0zM433.643 193.855L241.566 405.315c-4.247 4.676-10.264 7.352-16.581 7.372 -0.024 0-0.049 0-0.074 0 -6.291 0-12.294-2.633-16.555-7.263L99.241 286.872c-8.416-9.143-7.825-23.377 1.318-31.792 9.143-8.416 23.377-7.826 31.792 1.318l92.45 100.446 175.532-193.246c8.355-9.198 22.584-9.881 31.783-1.526C441.315 170.426 441.999 184.656 433.643 193.855z" fill="${color}"/></svg>`;
    },
    downloadIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.853 30.842"><path fill="${color}" d="M16.366 25.637c0.281 0.281 0.663 0.439 1.061 0.439s0.78-0.158 1.061-0.439L25.75 18.375c0.586-0.586 0.586-1.535 0-2.121s-1.535-0.586-2.121 0l-4.703 4.703V1.5c0-0.829-0.671-1.5-1.5-1.5s-1.5 0.671-1.5 1.5v19.456l-4.702-4.702c-0.586-0.586-1.535-0.586-2.121 0s-0.586 1.535 0 2.121L16.366 25.637z"/><path d="M25.45 27.83H9.403c-0.829 0-1.5 0.672-1.5 1.5s0.671 1.5 1.5 1.5h16.047c0.828 0 1.5-0.672 1.5-1.5S26.278 27.83 25.45 27.83z" fill="${color}"/></svg>`;
    },
    escIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.181 7.908"><path d="M7.893 6.239h-7.604C0.129 6.239 0 6.368 0 6.527v1.092c0 0.159 0.129 0.289 0.289 0.289h7.604c0.159 0 0.289-0.129 0.289-0.289V6.527C8.181 6.368 8.052 6.239 7.893 6.239z" fill="${AbstractNode.colorExtended.blue}"/><path d="M0.276 5.519h7.63c0.231 0 0.359-0.28 0.214-0.468l-3.763-4.917c-0.136-0.178-0.396-0.178-0.532 0l-3.764 4.917C-0.083 5.239 0.045 5.519 0.276 5.519z" fill="${color}"/></svg>`;
    },
    checkIcon: function (color: string): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59.044 59.04"><path d="M29.524 0c-16.307 0-29.524 13.217-29.524 29.52 0 16.306 13.217 29.52 29.524 29.52 16.303 0 29.52-13.214 29.52-29.52C59.044 13.217 45.826 0 29.524 0zM44.092 23.517L25.984 41.569c-0.515 0.515-1.188 0.772-1.865 0.772 -0.659 0-1.315-0.243-1.827-0.733l-8.164-7.79c-1.058-1.005-1.097-2.68-0.088-3.738 1.005-1.054 2.684-1.093 3.738-0.085l6.298 6.009 16.282-16.232c1.033-1.033 2.712-1.026 3.742 0.007C45.129 20.812 45.129 22.487 44.092 23.517z" fill="${color}"/></svg>`;
    },  
  }

  public svgMaker: Dictionary = AbstractNode.svgMaker;

  public static nodes: Dictionary = {
    div: document.createElement("DIV") as HTMLElement,
    img: document.createElement("IMG") as HTMLElement,
    input: document.createElement("INPUT") as HTMLElement,
    textarea: document.createElement("TEXTAREA") as HTMLElement,
    a: document.createElement('A') as HTMLElement,
    b: document.createElement('B') as HTMLElement,
    label: document.createElement("LABEL") as HTMLElement,
    iframe: document.createElement("IFRAME") as HTMLElement,
    aside: document.createElement("ASIDE") as HTMLElement,
    article: document.createElement("ARTICLE") as HTMLElement,
    video: document.createElement("VIDEO") as HTMLElement,
    source: document.createElement("SOURCE") as HTMLElement,
    canvas: document.createElement("CANVAS") as HTMLElement,
    figure: document.createElement("FIGURE") as HTMLElement,
  };

  public nodes: Dictionary = AbstractNode.nodes;

  public static mediaCondition: Matrix = [
    [ Infinity, 1450 ],
    [ 1450, 1100 ],
    [ 1100, 900 ],
    [ 900, 760 ],
    [ 760, -1 ]
  ];

  public mediaCondition: Dictionary = AbstractNode.mediaCondition;
  
  public static mediaConditionToArray = (booleanMode: boolean = false): List => {
    const { mediaCondition } = AbstractNode;
    let conditions: List;
    let thisCondition: string;
    let thisConditionBoo: boolean;

    conditions = [];
    for (let conditionArr of mediaCondition) {
      if (!Array.isArray(conditionArr)) {
        throw new Error("invalid condition 0")
      }
      if (conditionArr.length !== 2) {
        throw new Error("invalid condition 1")
      }
      if (!conditionArr.every((n: number) => { return typeof n === "number" })) {
        throw new Error("invalid condition 2")
      }
      thisCondition = `window.innerWidth <= ${String(conditionArr[0])} && window.innerWidth > ${String(conditionArr[1])}`;

      thisConditionBoo = false;
      if (window.innerWidth <= conditionArr[0] && window.innerWidth > conditionArr[1]) {
        thisConditionBoo = true;
      }
      if (booleanMode) {
        conditions.push(thisConditionBoo);
      } else {
        conditions.push(thisCondition);
      }
    }

    return conditions;
  }

  public static mediaQuery = (code: string): Dictionary => {
    const conditions: List = AbstractNode.mediaConditionToArray();
    const updateProtoConst: string = "AbstractNode.stacks.updateMiddleMedialQueryConditions";
    let updateProto: string;
  
    updateProto = '';
    updateProto += updateProtoConst;
    updateProto += " = ";
    updateProto += "[";
    for (let i of conditions) {
      updateProto += "(";
      updateProto += i;
      updateProto += "),";
    }
    updateProto += "];\n";
  
    code = code.replace(/[\n;]([^\n\;]*)\/\<\%\%\/,([^\%]+)\/\%\%\>\/[;]?/g, (match, p1, p2, offset, string) => {
      const safeWall: string = "\n\n";
      let tempValue: string, tempArr: List, tempStr: string;
  
      tempValue = p1.replace(/[\n;]/g, '').replace(/\/\<\%\%\/,/g, '').trim();
      tempArr = p2.replace(/\/\<\%\%\/,/g, '').replace(/\/\%\%\>\//g, '').trim().replace(/,$/, '').split(",");
      tempStr = "";
      if (tempArr.length > conditions.length) {
        throw new Error("parse error");
      }
      for (let j = 0; j < tempArr.length; j++) {
        tempStr += " } else if (" + conditions[j] + ") { ";
        tempStr += "\n"
        tempStr += tempValue;
        tempStr += " ";
        tempStr += tempArr[j];
        tempStr += ";\n";
      }
      tempStr = safeWall + tempStr.slice(7) + " }" + safeWall;
      return tempStr;
    });
    code = code.replace(/\/\<\&\&\/,([^\&]+)[, ]*\/\&\&\>\//g, (match, p1) => {
      let tempValue: string, tempArr: List, tempStr: string;
      tempArr = p1.replace(/\/\<\&\&\/,/g, '').replace(/[, ]*\/\&\&\>\//g, '').trim().replace(/,$/, '').split("|");
      tempArr = tempArr.map((str: string) => { return str.trim(); });
      return `(${conditions[0]} ? ${tempArr[0]} : (${conditions[1]} ? ${tempArr[1]} : (${conditions[2]} ? ${tempArr[2]} : (${conditions[3]} ? ${tempArr[3]} : ${tempArr[4]}))))`;
    });
  
    return { conditions: updateProto, code };
  }

  public static mediaNumber = (bigDesktop: number, desktop: number, smallDesktop: number, tablet: number, mobile: number): number => {
    if (typeof bigDesktop !== "number") {
      throw new Error("invalid big desktop value");
    }
    if (typeof desktop !== "number") {
      throw new Error("invalid normal desktop value");
    }
    if (typeof smallDesktop !== "number") {
      throw new Error("invalid small desktop value");
    }
    if (typeof tablet !== "number") {
      throw new Error("invalid tablet value");
    }
    if (typeof mobile !== "number") {
      throw new Error("invalid mobile value");
    }
    const conditionMatrix: Matrix = AbstractNode.mediaCondition;
    let finalValue: number;
    if (window.innerWidth <= conditionMatrix[0][0] && window.innerWidth > conditionMatrix[0][1]) {
      finalValue = bigDesktop;
    } else if (window.innerWidth <= conditionMatrix[1][0] && window.innerWidth > conditionMatrix[1][1]) {
      finalValue = desktop;
    } else if (window.innerWidth <= conditionMatrix[2][0] && window.innerWidth > conditionMatrix[2][1]) {
      finalValue = smallDesktop;
    } else if (window.innerWidth <= conditionMatrix[3][0] && window.innerWidth > conditionMatrix[3][1]) {
      finalValue = tablet;
    } else {
      finalValue = mobile;
    }
    return finalValue;
  }

  public static mediaString = (bigDesktop: string, desktop: string, smallDesktop: string, tablet: string, mobile: string): string => {
    if (typeof bigDesktop !== "string") {
      throw new Error("invalid big desktop value");
    }
    if (typeof desktop !== "string") {
      throw new Error("invalid normal desktop value");
    }
    if (typeof smallDesktop !== "string") {
      throw new Error("invalid small desktop value");
    }
    if (typeof tablet !== "string") {
      throw new Error("invalid tablet value");
    }
    if (typeof mobile !== "string") {
      throw new Error("invalid mobile value");
    }
    const conditionMatrix: Matrix = AbstractNode.mediaCondition;
    let finalValue: string;
    if (window.innerWidth <= conditionMatrix[0][0] && window.innerWidth > conditionMatrix[0][1]) {
      finalValue = bigDesktop;
    } else if (window.innerWidth <= conditionMatrix[1][0] && window.innerWidth > conditionMatrix[1][1]) {
      finalValue = desktop;
    } else if (window.innerWidth <= conditionMatrix[2][0] && window.innerWidth > conditionMatrix[2][1]) {
      finalValue = smallDesktop;
    } else if (window.innerWidth <= conditionMatrix[3][0] && window.innerWidth > conditionMatrix[3][1]) {
      finalValue = tablet;
    } else {
      finalValue = mobile;
    }
    return finalValue;
  }

  public static mediaBoolean = (bigDesktop: boolean, desktop: boolean, smallDesktop: boolean, tablet: boolean, mobile: boolean): boolean => {
    if (typeof bigDesktop !== "boolean") {
      throw new Error("invalid big desktop value");
    }
    if (typeof desktop !== "boolean") {
      throw new Error("invalid normal desktop value");
    }
    if (typeof smallDesktop !== "boolean") {
      throw new Error("invalid small desktop value");
    }
    if (typeof tablet !== "boolean") {
      throw new Error("invalid tablet value");
    }
    if (typeof mobile !== "boolean") {
      throw new Error("invalid mobile value");
    }
    const conditionMatrix: Matrix = AbstractNode.mediaCondition;
    let finalValue: boolean;
    if (window.innerWidth <= conditionMatrix[0][0] && window.innerWidth > conditionMatrix[0][1]) {
      finalValue = bigDesktop;
    } else if (window.innerWidth <= conditionMatrix[1][0] && window.innerWidth > conditionMatrix[1][1]) {
      finalValue = desktop;
    } else if (window.innerWidth <= conditionMatrix[2][0] && window.innerWidth > conditionMatrix[2][1]) {
      finalValue = smallDesktop;
    } else if (window.innerWidth <= conditionMatrix[3][0] && window.innerWidth > conditionMatrix[3][1]) {
      finalValue = tablet;
    } else {
      finalValue = mobile;
    }
    return finalValue;
  }

  public static mediaEa = (): string => {
    const conditionMatrix: Matrix = AbstractNode.mediaCondition;
    let finalValue: string;
    if (window.innerWidth <= conditionMatrix[0][0] && window.innerWidth > conditionMatrix[0][1]) {
      finalValue = "px";
    } else if (window.innerWidth <= conditionMatrix[1][0] && window.innerWidth > conditionMatrix[1][1]) {
      finalValue = "px";
    } else if (window.innerWidth <= conditionMatrix[2][0] && window.innerWidth > conditionMatrix[2][1]) {
      finalValue = "px";
    } else if (window.innerWidth <= conditionMatrix[3][0] && window.innerWidth > conditionMatrix[3][1]) {
      finalValue = "px";
    } else {
      finalValue = "vw";
    }
    return finalValue;
  }

  public static colorParsing = (str: string | Array<number>) => {
    if (typeof str === "string") {

      if (/^\#/.test(str) && str.length === 7) {
        str = str.slice(1);
      }
      if (str.length !== 6 && str.replace(/[^0-9a-f]/gi, '') === '') {
        throw new Error("invaild input");
      }
      let colorArr: Array<string | number>;
      let tempArr: Array<number>;
      let num: number;

      colorArr = [ str.slice(0, 2), str.slice(2, 4), str.slice(4) ];
      tempArr = [];
      for (let s of colorArr) {
        if (typeof s === "string") {
          num = 0;
          if (/[a-z]/gi.test(s[1])) {
            num += s[1].charCodeAt(0) - 97 + 10;
          } else {
            num += Number(s[1]);
          }
          if (/[a-z]/gi.test(s[0])) {
            num += (s[0].charCodeAt(0) - 97 + 10) * 16;
          } else {
            num += (Number(s[0])) * 16;
          }
          tempArr.push(num);
        }
      }
      colorArr = tempArr;

      return colorArr;

    } else if (Array.isArray(str)) {

      if (str.length !== 3) {
        throw new Error("invaild input");
      }
      if (typeof str[0] !== "number" || typeof str[1] !== "number" || typeof str[2] !== "number") {
        throw new Error("invaild input");
      }
      if (Number.isNaN(str[0]) || Number.isNaN(str[1]) || Number.isNaN(str[2])) {
        throw new Error("invaild input");
      }
      const convertNum = (num: number) => {
        const convertStr = (n: number): string => {
          if (n < 10) {
            return String(n);
          } else {
            return String.fromCharCode(n + 87);
          }
        }
        let first: number, second: number;
        second = num % 16;
        first = (num - second) / 16;
        return convertStr(first) + convertStr(second);
      }
      return '#' + str.map(convertNum).join('');
    } else {

      throw new Error("invaild input");
    }
  }
  
  public static ajaxPromise = (data: Dictionary, url: string, option: Dictionary = {}): Promise<any> => {
    let dataString: string;
    let finalData: string;

    dataString = "";
    for (let i in data) {
      dataString += i.replace(/[\=\&]/g, '');
      dataString += '=';
      if (typeof data[i] === "object") {
        if (data[i] instanceof Date) {
          dataString += JSON.stringify(data[i]).replace(/^\"/g, '').replace(/\"$/g, '');
        } else {
          dataString += JSON.stringify(data[i]).replace(/[\=\&]/g, '').replace(/[ ]/g, '+');
        }
      } else {
        dataString += String(data[i]).replace(/[\=\&]/g, '').replace(/[ ]/g, '+');
      }
      dataString += '&';
    }
    finalData = dataString.slice(0, -1);

    return new Promise((resolve, reject) => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.onload = function () {
       if (xhr.readyState !== 4) { return }
       if (xhr.status >= 200 && xhr.status < 300) {
         resolve(xhr.response);
       } else {
         reject({
           status: xhr.status,
           statusText: xhr.statusText
         });
       }
      };
      xhr.onerror = function () {
       reject({
         status: xhr.status,
         statusText: xhr.statusText
       });
      };
      if (typeof finalData === "string") {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      }
      if (typeof option.headers === "object" && option.headers !== null) {
        for (let key in option.headers) {
          xhr.setRequestHeader(key, option.headers[key]);
        }
      }
      xhr.send(finalData);
    });
  }
  
  public static ajaxForm = (data: FormData, url: string, loadingDom: HTMLElement | null = null): Promise<any> => {
    return new Promise((resolve, reject) => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.onload = function () {
       if (xhr.readyState !== 4) { return }
       if (xhr.status >= 200 && xhr.status < 300) {
         resolve(xhr.response);
       } else {
         reject({
           status: xhr.status,
           statusText: xhr.statusText
         });
       }
      };
      xhr.onerror = function () {
       reject({
         status: xhr.status,
         statusText: xhr.statusText
       });
      };
  
      if (loadingDom !== null) {
        xhr.upload.onprogress = function (e) {
          if (loadingDom.textContent !== undefined && loadingDom.textContent !== null) {
            if (loadingDom.textContent.trim() !== "") {
              if (e.total !== 0 && e.lengthComputable) {
                loadingDom.textContent = String(Math.round((e.loaded / e.total) * 100)) + '%';
              }
            } else {
              if (e.total !== 0 && e.lengthComputable) {
                if (loadingDom.firstChild !== null) {
                  loadingDom.firstChild.textContent = String(Math.round((e.loaded / e.total) * 100)) + '%';
                }
              }
            }
          }
        }
      }
  
      xhr.send(data);
    });
  }
  
  public static ajaxJson = (data: Dictionary, url: string, option: Dictionary = {}): Promise<any> => {
    return new Promise(function (resolve, reject) {
      AbstractNode.ajaxPromise(data, url, option).then(function (jsonString) {
        let json: Dictionary, filtered: string, temp: string, tempFunc: () => Dictionary;
        try {
          temp = jsonString.trim();
          if (temp[0] !== '{' && temp[0] !== '[') {
            reject("server must send json");
          } else {
            filtered = jsonString.replace(/(\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\")/g, (match: any, p1: string) => {
              return "new Date(" + p1 + ")";
            });
            tempFunc = new Function("const obj = " + filtered + "; return obj;") as () => Dictionary;
            json = tempFunc();
            resolve(json);
          }
        } catch (e) {
          reject(e);
        }
      }).catch(function (e) {
        reject(e);
      });
    });
  }
  
  public static equalJson = (jsonString: string | Dictionary | List): Dictionary | List => {
    const equal = (jsonString: string | Dictionary | List): Dictionary | List => {
      if (typeof jsonString === "object") {
        jsonString = JSON.stringify(jsonString);
      }
      if (typeof jsonString !== "string") {
        jsonString = String(jsonString);
      }
      let filtered: string;
      filtered = jsonString.replace(/(\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\")/g, function (match, p1, offset, string) { return "new Date(" + p1 + ")"; });
      filtered = filtered.replace(/nbsp\;/g, "&nbsp;");
      filtered = filtered.replace(/\&\&nbsp\;/g, "&nbsp;");
      const tempFunc = new Function("const obj = " + filtered + "; return obj;") as () => Dictionary | List;
      const json: Dictionary | List = tempFunc();
      let temp: string, boo: boolean;
      if (typeof json === "object") {
        if (Array.isArray(json)) {
          for (let item of json) {
            if (typeof item === "string") {
              if (/^[\{\[]/.test(item.trim()) && /[\}\]]$/.test(item.trim())) {
                try {
                  temp = JSON.parse(item);
                  boo = true;
                } catch (e) {
                  boo = false;
                }
                if (boo) {
                  item = equal(item);
                }
              }
            }
          }
        } else {
          for (let i in json) {
            if (typeof json[i] === "string") {
              if (/^[\{\[]/.test(json[i].trim()) && /[\}\]]$/.test(json[i].trim())) {
                try {
                  temp = JSON.parse(json[i]);
                  boo = true;
                } catch (e) {
                  boo = false;
                }
                if (boo) {
                  json[i] = equal(json[i]);
                }
              }
            }
          }
        }
        return json;
      } else {
        throw Error("invalid input");
      }
    }
    return equal(jsonString);
  }
  
  public static networkSetString = (): string => {
    const between: string = ";\n\n";
    let jsText: string;
  
    jsText = "";
    jsText += "const ajaxPromise = " + AbstractNode.ajaxPromise.toString().replace(/AbstractNode\./g, "");
    jsText += between;
    jsText += "const ajaxJson = " + AbstractNode.ajaxJson.toString().replace(/AbstractNode\./g, "");
    jsText += between;
    jsText += "const equalJson = " + AbstractNode.equalJson.toString().replace(/AbstractNode\./g, "");
    jsText += between;
  
    return jsText;
  }
  
  public static ajaxMultiple = (matrix: List): Promise<List> => {
    let responseTong: List;
    let number: number;
    let workers: Array<Worker | Dictionary>;
    let responseResult: List;
    let intervalId: any;
    let workerJsString: string;
    let blob: Blob;
    let blobUrl: string;
  
    workerJsString = AbstractNode.networkSetString();
    workerJsString += "\n\n";
    workerJsString += String(`
    const thisHost = "${window.location.protocol + "//" + window.location.host}";
    const main = async function () {
      try {
        onmessage = async function (e) {
          try {
            if (e.data.data === undefined || e.data.url === undefined || e.data.number === undefined) {
              throw new Error("invalid post message");
            }
            const { data, url, number } = equalJson(JSON.stringify(e.data));
            let finalUrl;
            if (/^\\//.test(url)) {
              finalUrl = thisHost + url;
            } else {
              finalUrl = url;
            }
            const response = await ajaxJson(data, finalUrl, { equal: true }); 
            postMessage(JSON.stringify({ response, number }));
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    main().catch((err) => { console.log(err); });
    `).split("\n").map((s) => { return s.trim() }).join("\n");
  
    blob = new Blob([ workerJsString ], { type: "application/javascript" });
    blobUrl = window.URL.createObjectURL(blob);
  
    responseResult = (new Array(matrix.length)).fill(0, 0);
    workers = (new Array(matrix.length)).fill({});
    responseTong = (new Array(matrix.length)).fill(0, 0);
  
    return new Promise((resolve, reject) => {
      number = 0;
      for (let [ data, url ] of matrix) {        
        workers[number] = new Worker(blobUrl);
        workers[number].addEventListener("message", (e: any) => {
          const { response, number } = AbstractNode.equalJson(e.data) as Dictionary;
          responseTong[number] = response;
          responseResult[number] = true;
        });
        workers[number].addEventListener("error", (e: any) => {
          reject(e);
        })
        workers[number].postMessage({ data, url, number });
        number++;
      }
      intervalId = setInterval(() => {
        if (responseResult.every((boo) => { return boo === true })) {
          for (let i = 0; i < matrix.length; i++) {
            workers[i].terminate();
          }
          clearInterval(intervalId);
          window.URL.revokeObjectURL(blobUrl);
          resolve(responseTong);
        }
      }, 1);
    })
  }
  
  public static requestPromise = (url: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = function () {
       if (xhr.readyState !== 4) { return }
       if (xhr.status >= 200 && xhr.status < 300) {
         resolve(xhr.response);
       } else {
         reject({
           status: xhr.status,
           statusText: xhr.statusText
         });
       }
      };
      xhr.onerror = function () {
       reject({
         status: xhr.status,
         statusText: xhr.statusText
       });
      };
      xhr.send();
    });
  }
  
  public static downloadFile = (url: string, forceName: string | null = null, loadingDom: HTMLElement | null = null): Promise<any> => {
    return new Promise((resolve, reject) => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      if (/pdf/gi.test(url)) {
        setTimeout(() => {
          AbstractNode.blankHref(url);
        }, 0);
      }
      xhr.open("GET", url);
      xhr.responseType = "arraybuffer";
      xhr.onprogress = function (e) {
        if (loadingDom !== null) {
          if (loadingDom.textContent !== undefined && loadingDom.textContent !== null && e.total !== 0 && e.lengthComputable) {
            loadingDom.textContent = String(Math.round((e.loaded / e.total) * 100)) + '%';
          }
        }
      }
      xhr.onload = function () {
        if (xhr.readyState !== 4) {
          return;
        }
        if (xhr.status >= 200 && xhr.status < 300) {
          let fileName: string, fileType: string, blob: Blob, a: HTMLAnchorElement, timeoutId: any;
          let execSearch: RegExpExecArray | null;
  
          fileName = url.split("/")[url.split("/").length - 1];
          execSearch = /\.[^\.]+$/.exec(fileName);
          if (execSearch === null) {
            reject("invaild url");
            return;
          }
          fileType = AbstractNode.mimeTypes[execSearch[0].replace(/\./g, '').toLowerCase()];
          if (fileType === undefined) {
            fileType = "application/octet-stream";
          }
          if (forceName !== null && typeof forceName === "string") {
            fileName = forceName.replace(/\.[^\.]+$/, '') + '.' + execSearch[0].replace(/\./g, '').toLowerCase();
          }
          blob = new Blob([ xhr.response ], { type: fileType });
          a = document.createElement("A") as HTMLAnchorElement;
          a.target = '_blank';
          a.download = fileName;
          a.href = URL.createObjectURL(blob);
          a.dataset.downloadurl = [ fileType, a.download, a.href ].join(':');
          a.style.display = "none";
          document.body.appendChild(a);
          a.addEventListener("click", () => {
            timeoutId = setTimeout(() => {
              URL.revokeObjectURL(a.href);
              document.body.removeChild(a);
              resolve(fileName);
              clearTimeout(timeoutId);
            }, 500);
          });
          a.click();
  
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = () => {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
  }
  
  public static createNode = (mode: string | Dictionary, source?: string | HTMLElement | Element | SVGElement, style?: Dictionary, mother?: HTMLElement | Element | SVGElement | null): HTMLElement | SVGElement => {
    /* append style object properties */
    /*
    dom = {
      mode: "div",
      source: "",
      mother: base,
      text: "hi!",
      class: [ "hoverdefault" ],
      id: "aaa",
      attribute: [
        { index: "b" },
      ],
      events: [
        { type: "click", event: new Function() }
      ],
      style: {},
      child: {},
      children: [
        ...nodeObject
      ]
    }
    */
    const { mediaNumber, mediaString, mediaEa } = AbstractNode;
    let dom_clone: HTMLElement | SVGElement;
    let targetStyle: Dictionary;
    let ratio: number;
    let temp: any, tempIndex: any;
    let boldObject: string, underObject: string, specialObject: string, codeObject: string, italicObject: string;
    let children: List;
    let nextObject: any, previousObject: any, previousDom: any;
    let thisEa: string;
    let ea: string;
    let codeArr: List;
    let thisCodeRegExp: RegExp;
    let thisExecResult: RegExpExecArray | null;
    let codeDomArr: List;
  
    thisEa = mediaEa();
    children = [];
    nextObject = null;
    previousObject = null;
    codeArr = [];

    if (mode === undefined) {
      throw new Error("arguments must be mode(dom node name), style");
    } else {
      if (mode !== undefined && typeof mode === "object") {
        style = mode;
        mode = "div";
        if (typeof source === "object" && source.nodeName !== undefined) {
          mother = source;
        } else {
          mother = null;
        }
        source = "";
      } else {
        throw new Error("arguments must be mode(dom node name), svg source string, style object, dom mother");
      }
    }
    if (Array.isArray(style)) {
      throw new Error("argument must be object, not array");
    }
    if (style.mode !== undefined) {
      if (typeof style.mode === "string") {
        mode = style.mode;
      }
      delete style.mode;
    }
    if (style.source !== undefined) {
      if (typeof style.source === "string") {
        source = style.source;
      }
      delete style.source;
    }
    if (style.mother !== undefined) {
      if (typeof style.mother === "object" && style.mother.nodeName !== undefined) {
        mother = style.mother;
      }
      delete style.mother;
    }
    if (style.child !== undefined) {
      if (typeof style.child === "object" && style.child !== null && !Array.isArray(style.child)) {
        children.push(style.child);
      }
      delete style.child;
    }
    if (style.children !== undefined) {
      if (Array.isArray(style.children)) {
        children = style.children;
      }
      delete style.children;
    }
    if (style.next !== undefined) {
      if (typeof style.next === "object" && style.next !== null && !Array.isArray(style.next)) {
        nextObject = style.next;
      }
      delete style.next;
    }
    if (style.previous !== undefined) {
      if (typeof style.previous === "object" && style.previous !== null && !Array.isArray(style.previous)) {
        previousObject = style.previous;
      }
      delete style.previous;
    }
    if (mother === undefined) {
      mother = null;
    }
  
    if (!/svg/gi.test(mode)) {
      if (AbstractNode.nodes[mode] === undefined || typeof style !== "object") {
        throw new Error("invaild arguments");
      } else {
        dom_clone = AbstractNode.nodes[mode].cloneNode(true);
        if (style.text !== undefined) {
          if ((typeof style.text === "string" || Array.isArray(style.text)) && dom_clone.textContent !== undefined) {
            if (Array.isArray(style.text)) {
              style.text = style.text.join("<br>");
            }
            if (/\<b\%/gi.test(style.text)) {
              if (style.bold === undefined || typeof style.bold !== "object") {
                throw new Error("bold option needs");
              } else {
                boldObject = "";
                if (style.bold.display === undefined || style.bold.display === null) {
                  style.bold.display = "inline-block";
                }
                if (style.bold.position === undefined || style.bold.position === null) {
                  style.bold.position = "relative";
                }
                for (let b in style.bold) {
                  if (b === "fontSizeWeight") {
                    const [ thisSize, thisWeight ] = style.bold[b];
                    if (typeof thisSize === "number") {
                      boldObject += "font-size:" + String(thisSize) + thisEa;
                      boldObject += ';';
                    } else if (typeof thisSize === "string") {
                      boldObject += "font-size:" + thisSize;
                      boldObject += ';';
                    }
                    if (typeof thisWeight === "number") {
                      boldObject += "font-weight:" + String(thisWeight);
                      boldObject += ';';
                    } else if (typeof thisWeight === "string") {
                      boldObject += "font-weight:" + thisWeight;
                      boldObject += ';';
                    }
                  } else {
                    if (/^font/.test(b) || /^padding/.test(b) || /^margin/.test(b)) {
                      tempIndex = null;
                      for (let z = 0; z < b.length; z++) {
                        if (b.charCodeAt(z) < "a".charCodeAt(0)) {
                          tempIndex = z;
                          break;
                        }
                      }
                      if (tempIndex !== null) {
                        boldObject += b.slice(0, tempIndex) + '-' + b.slice(tempIndex).toLowerCase();
                      } else {
                        boldObject += b;
                      }
                    } else {
                      boldObject += b;
                    }
                    boldObject += ':';
                    if (typeof style.bold[b] === "number") {
                      if (b === "fontWeight" || b === "zIndex" || b === "opacity" || b === "lineHeight" || b === "flex") {
                        boldObject += String(style.bold[b]);
                      } else {
                        boldObject += String(style.bold[b]) + thisEa;
                      }
                    } else {
                      boldObject += style.bold[b];
                    }
                    boldObject += ';'; 
                  }
                }
                style.text = style.text.replace(/\<b\%/gi, "<b style=\"" + boldObject + "\">");
                style.text = style.text.replace(/\%b\>/gi, "</b>");
              }
            }
            if (/\<u\%/gi.test(style.text)) {
              if (style.under === undefined || typeof style.under !== "object") {
                throw new Error("under option needs");
              } else {
                underObject = "";
                if (style.under.display === undefined || style.under.display === null) {
                  style.under.display = "inline-block";
                }
                if (style.under.position === undefined || style.under.position === null) {
                  style.under.position = "relative";
                }
                for (let b in style.under) {
                  if (b === "fontSizeWeight") {
                    const [ thisSize, thisWeight ] = style.under[b];
                    if (typeof thisSize === "number") {
                      underObject += "font-size:" + String(thisSize) + thisEa;
                      underObject += ';';
                    } else if (typeof thisSize === "string") {
                      underObject += "font-size:" + thisSize;
                      underObject += ';';
                    }
                    if (typeof thisWeight === "number") {
                      underObject += "font-weight:" + String(thisWeight);
                      underObject += ';';
                    } else if (typeof thisWeight === "string") {
                      underObject += "font-weight:" + thisWeight;
                      underObject += ';';
                    }
                  } else {
                    if (/^font/.test(b) || /^padding/.test(b) || /^margin/.test(b)) {
                      tempIndex = null;
                      for (let z = 0; z < b.length; z++) {
                        if (b.charCodeAt(z) < "a".charCodeAt(0)) {
                          tempIndex = z;
                          break;
                        }
                      }
                      if (tempIndex !== null) {
                        underObject += b.slice(0, tempIndex) + '-' + b.slice(tempIndex).toLowerCase();
                      } else {
                        underObject += b;
                      }
                    } else {
                      underObject += b;
                    }
                    underObject += ':';
                    if (typeof style.under[b] === "number") {
                      if (b === "fontWeight" || b === "zIndex" || b === "opacity" || b === "lineHeight" || b === "flex") {
                        underObject += String(style.under[b]);
                      } else {
                        underObject += String(style.under[b]) + thisEa;
                      }
                    } else {
                      underObject += style.under[b];
                    }
                    underObject += ';';
                  }
                }
                style.text = style.text.replace(/\<u\%/gi, "<b style=\"" + underObject + "\">");
                style.text = style.text.replace(/\%u\>/gi, "</b>");
              }
            }
            if (/\<s\%/gi.test(style.text)) {
              if (style.special === undefined || typeof style.special !== "object") {
                throw new Error("special option needs");
              } else {
                specialObject = "";
                if (style.special.display === undefined || style.special.display === null) {
                  style.special.display = "inline-block";
                }
                if (style.special.position === undefined || style.special.position === null) {
                  style.special.position = "relative";
                }
                for (let b in style.special) {
                  if (b === "fontSizeWeight") {
                    const [ thisSize, thisWeight ] = style.special[b];
                    if (typeof thisSize === "number") {
                      specialObject += "font-size:" + String(thisSize) + thisEa;
                      specialObject += ';';
                    } else if (typeof thisSize === "string") {
                      specialObject += "font-size:" + thisSize;
                      specialObject += ';';
                    }
                    if (typeof thisWeight === "number") {
                      specialObject += "font-weight:" + String(thisWeight);
                      specialObject += ';';
                    } else if (typeof thisWeight === "string") {
                      specialObject += "font-weight:" + thisWeight;
                      specialObject += ';';
                    }
                  } else {
                    if (/^font/.test(b) || /^padding/.test(b) || /^margin/.test(b)) {
                      tempIndex = null;
                      for (let z = 0; z < b.length; z++) {
                        if (b.charCodeAt(z) < "a".charCodeAt(0)) {
                          tempIndex = z;
                          break;
                        }
                      }
                      if (tempIndex !== null) {
                        specialObject += b.slice(0, tempIndex) + '-' + b.slice(tempIndex).toLowerCase();
                      } else {
                        specialObject += b;
                      }
                    } else {
                      specialObject += b;
                    }
                    specialObject += ':';
                    if (typeof style.special[b] === "number") {
                      if (b === "fontWeight" || b === "zIndex" || b === "opacity" || b === "lineHeight" || b === "flex") {
                        specialObject += String(style.special[b]);
                      } else {
                        specialObject += String(style.special[b]) + thisEa;
                      }
                    } else {
                      specialObject += style.special[b];
                    }
                    specialObject += ';';
                  }
                }
                style.text = style.text.replace(/\<s\%/gi, "<b style=\"" + specialObject + "\">");
                style.text = style.text.replace(/\%s\>/gi, "</b>");
              }
            }
            if (/\<c\%/gi.test(style.text)) {
              if (style.code === undefined || typeof style.code !== "object") {
                throw new Error("code option needs");
              } else {
                codeObject = "";
                if (style.code.display === undefined || style.code.display === null) {
                  style.code.display = "inline-block";
                }
                if (style.code.position === undefined || style.code.position === null) {
                  style.code.position = "relative";
                }
                for (let b in style.code) {
                  if (b === "fontSizeWeight") {
                    const [ thisSize, thisWeight ] = style.code[b];
                    if (typeof thisSize === "number") {
                      codeObject += "font-size:" + String(thisSize) + thisEa;
                      codeObject += ';';
                    } else if (typeof thisSize === "string") {
                      codeObject += "font-size:" + thisSize;
                      codeObject += ';';
                    }
                    if (typeof thisWeight === "number") {
                      codeObject += "font-weight:" + String(thisWeight);
                      codeObject += ';';
                    } else if (typeof thisWeight === "string") {
                      codeObject += "font-weight:" + thisWeight;
                      codeObject += ';';
                    }
                  } else {
                    if (/^font/.test(b) || /^padding/.test(b) || /^margin/.test(b)) {
                      tempIndex = null;
                      for (let z = 0; z < b.length; z++) {
                        if (b.charCodeAt(z) < "a".charCodeAt(0)) {
                          tempIndex = z;
                          break;
                        }
                      }
                      if (tempIndex !== null) {
                        codeObject += b.slice(0, tempIndex) + '-' + b.slice(tempIndex).toLowerCase();
                      } else {
                        codeObject += b;
                      }
                    } else {
                      codeObject += b;
                    }
                    codeObject += ':';
                    if (typeof style.code[b] === "number") {
                      if (b === "fontWeight" || b === "zIndex" || b === "opacity" || b === "lineHeight" || b === "flex") {
                        codeObject += String(style.code[b]);
                      } else {
                        codeObject += String(style.code[b]) + thisEa;
                      }
                    } else {
                      codeObject += style.code[b];
                    }
                    codeObject += ';';
                  }
                }
                style.text = style.text.replace(/\<c\%/gi, "<code style=\"" + codeObject + "\">");
                style.text = style.text.replace(/\%c\>/gi, "</code>");
  
                thisCodeRegExp = /\<code [^\>]*\>(((?!\<\/code\>).)*)\<\/code\>/gi;
                codeArr = [];
                do {
                  thisExecResult = thisCodeRegExp.exec(style.text);
                  codeArr.push(thisExecResult);
                } while (thisExecResult !== null)
                codeArr = codeArr.filter((o) => { return o !== null }).map((o) => { return o[1] });
                style.text = style.text.replace(/(\<code [^\>]*\>)(((?!\<\/code\>).)*)(\<\/code\>)/gi, (match: any, p1: string) => {
                  return p1 + "</code>"
                });
  
              }
            }
            if (/\<i\%/gi.test(style.text)) {
              if (style.italic === undefined || typeof style.italic !== "object") {
                throw new Error("italic option needs");
              } else {
                italicObject = "";
                if (style.italic.display === undefined || style.italic.display === null) {
                  style.italic.display = "inline-block";
                }
                if (style.italic.position === undefined || style.italic.position === null) {
                  style.italic.position = "relative";
                }
                for (let b in style.italic) {
                  if (b === "fontSizeWeight") {
                    const [ thisSize, thisWeight ] = style.italic[b];
                    if (typeof thisSize === "number") {
                      italicObject += "font-size:" + String(thisSize) + thisEa;
                      italicObject += ';';
                    } else if (typeof thisSize === "string") {
                      italicObject += "font-size:" + thisSize;
                      italicObject += ';';
                    }
                    if (typeof thisWeight === "number") {
                      italicObject += "font-weight:" + String(thisWeight);
                      italicObject += ';';
                    } else if (typeof thisWeight === "string") {
                      italicObject += "font-weight:" + thisWeight;
                      italicObject += ';';
                    }
                  } else {
                    if (/^font/.test(b) || /^padding/.test(b) || /^margin/.test(b)) {
                      tempIndex = null;
                      for (let z = 0; z < b.length; z++) {
                        if (b.charCodeAt(z) < "a".charCodeAt(0)) {
                          tempIndex = z;
                          break;
                        }
                      }
                      if (tempIndex !== null) {
                        italicObject += b.slice(0, tempIndex) + '-' + b.slice(tempIndex).toLowerCase();
                      } else {
                        italicObject += b;
                      }
                    } else {
                      italicObject += b;
                    }
                    italicObject += ':';
                    if (typeof style.italic[b] === "number") {
                      if (b === "fontWeight" || b === "zIndex" || b === "opacity" || b === "lineHeight" || b === "flex") {
                        italicObject += String(style.italic[b]);
                      } else {
                        italicObject += String(style.italic[b]) + thisEa;
                      }
                    } else {
                      italicObject += style.italic[b];
                    }
                    italicObject += ';';
                  }
                }
                style.text = style.text.replace(/\<i\%/gi, "<b style=\"" + italicObject + "\">");
                style.text = style.text.replace(/\%i\>/gi, "</b>");
              }
            }
  
            if (mode !== "textarea") {
              dom_clone.insertAdjacentHTML("beforeend", style.text.replace(/\n/g, "<br>"));
              if (Array.isArray(codeArr)) {
                if (codeArr.length > 0) {
                  codeDomArr = [ ...dom_clone.querySelectorAll("code") ];
                  for (let i = 0; i < codeDomArr.length; i++) {
                    codeDomArr[i].textContent = "";
                    codeDomArr[i].textContent = codeArr[i];
                  }
                }
              }
            } else {
              dom_clone.textContent = style.text.replace(/\<br\>/g, "\n");
            }
          }
          delete style.text;
        }
        if (style.contents !== undefined) {
          dom_clone.textContent = style.contents;
          delete style.contents;
        }
        if (style.class !== undefined) {
          if (Array.isArray(style.class)) {
            for (let c of style.class) {
              dom_clone.classList.add(c);
            }
          }
          delete style.class;
        }
        if (style.id !== undefined) {
          if (typeof style.id === "string" && dom_clone.id !== undefined) {
            dom_clone.id = style.id;
          }
          delete style.id;
        }
        if (style.attribute !== undefined) {
          if (Array.isArray(style.attribute)) {
            for (let a of style.attribute) {
              if (typeof a === "object") {
                for (let key in a) {
                  dom_clone.setAttribute(key, String(a[key]));
                }
              }
            }
          } else if (typeof style.attribute === "object" && style.attribute !== null) {
            for (let key in style.attribute) {
              dom_clone.setAttribute(key, String(style.attribute[key]));
            }
          }
          delete style.attribute;
        }
        if (typeof style.style === "object" && style.style !== null && typeof style.set === "string") {
          if (style.set === "block") {
            style.style.display = "block";
            if (typeof style.style.position !== "string") {
              style.style.position = "relative";
            }
          }
          if (style.set === "flex") {
            style.style.display = "flex";
            if (typeof style.style.position !== "string") {
              style.style.position = "relative";
            }
            if (typeof style.style.flexDirection !== "string") {
              style.style.flexDirection = "column";
            }
          }
          if (style.set === "center") {
            style.style.display = "flex";
            if (typeof style.style.position !== "string") {
              style.style.position = "relative";
            }
            if (typeof style.style.flexDirection !== "string") {
              style.style.flexDirection = "column";
            }
            style.style.justifyContent = "center";
            style.style.alignItems = "center";
          }
          if (style.set === "inline") {
            style.style.display = "inline-flex";
            if (typeof style.style.position !== "string") {
              style.style.position = "relative";
            }
            style.style.verticalAlign = "top";
            if (typeof style.style.flexDirection !== "string") {
              style.style.flexDirection = "column";
            }
          }
          if (style.set === "absolute") {
            if (typeof style.style.display !== "string") {
              style.style.display = "block";
            }
            style.style.position = "absolute";
          }
          if (style.set === "fixed") {
            if (typeof style.style.display !== "string") {
              style.style.display = "block";
            }
            if (typeof style.style.top !== "string") {
              style.style.top = "0";
            }
            if (typeof style.style.left !== "string") {
              style.style.left = "0";
            }
            if (typeof style.style.width !== "string") {
              style.style.width = "100%";
            }
            if (typeof style.style.height !== "string") {
              style.style.height = "100%";
            }
            style.style.position = "fixed";
          }
          delete style.set;
        }
        if (style.style !== undefined) {
          if (typeof style.style === "object") {
            targetStyle = style.style;
          } else {
            throw new Error("invaild arguments");
          }
        } else {
          targetStyle = style;
        }
        if (targetStyle.display === undefined || targetStyle.display === null) {
          targetStyle.display = "flex";
        }
        if (targetStyle.position === undefined || targetStyle.position === null) {
          targetStyle.position = "relative";
        }
        if (typeof targetStyle.display === "string" && /flex/gi.test(targetStyle.display)) {
          if (targetStyle.flexDirection === undefined || targetStyle.flexDirection === null) {
            targetStyle.flexDirection = "column";
          }
        }
        if (targetStyle.wordSpacing === undefined) {
          targetStyle.wordSpacing = String(-1) + "px";
        }
        for (let i in targetStyle) {
          if (typeof targetStyle[i] === "number") {
            if (i === "fontWeight" || i === "zIndex" || i === "opacity" || i === "lineHeight" || i === "flex") {
              dom_clone.style[i] = String(targetStyle[i]);
            } else {
              Object.defineProperty(dom_clone.style, i, {
                value: String(targetStyle[i]) + thisEa,
                writable: true,
              });
            }
          } else {
            if (i === "widthHeight") {
              const [ thisWidth, thisHeight ] = targetStyle[i];
              if (typeof thisWidth === "number") {
                dom_clone.style.width = String(thisWidth) + thisEa;
              } else if (typeof thisWidth === "string") {
                dom_clone.style.width = thisWidth;
              }
              if (typeof thisHeight === "number") {
                dom_clone.style.height = String(thisHeight) + thisEa;
              } else if (typeof thisHeight === "string") {
                dom_clone.style.height = thisHeight;
              }
            } else if (i === "fontSizeWeight") {
              const [ thisSize, thisWeight ] = targetStyle[i];
              if (typeof thisSize === "number") {
                dom_clone.style.fontSize = String(thisSize) + thisEa;
              } else if (typeof thisSize === "string") {
                dom_clone.style.fontSize = thisSize;
              }
              if (typeof thisWeight === "number") {
                dom_clone.style.fontWeight = String(thisWeight);
              } else if (typeof thisWeight === "string") {
                dom_clone.style.fontWeight = thisWeight;
              }
            } else {
              Object.defineProperty(dom_clone.style, i, {
                value: targetStyle[i],
                writable: true,
              })
            }
          }
        }
        if (style.event !== undefined) {
          style.events = style.event;
        }
        if (style.events !== undefined) {
          if (Array.isArray(style.events)) {
            for (let obj of style.events) {
              if (Array.isArray(obj.type)) {
                for (let str of obj.type) {
                  if (typeof obj.event === "function") {
                    if (str === "touch") {
                      if (/iPhone/gi.test(window.navigator.userAgent)) {
                        dom_clone.addEventListener("touchstart", obj.event);
                      } else {
                        dom_clone.addEventListener("click", obj.event);
                      }
                    } else {
                      dom_clone.addEventListener(str, obj.event);
                    }
                  }
                  if (str === "click") {
                    dom_clone.style.cursor = "pointer";
                  }
                }
              } else if (typeof obj.type === "string") {
                if (typeof obj.event === "function") {
                  if (obj.type === "touch") {
                    if (/iPhone/gi.test(window.navigator.userAgent)) {
                      dom_clone.addEventListener("touchstart", obj.event);
                    } else {
                      dom_clone.addEventListener("click", obj.event);
                    }
                  } else {
                    dom_clone.addEventListener(obj.type, obj.event);
                  }
                  if (obj.type === "click") {
                    dom_clone.style.cursor = "pointer";
                  }
                }
              } else {
                throw new Error("invaild type");
              }
            }
          } else if (typeof style.events === "object" && style.events !== null) {
            for (let type in style.events) {
              if (typeof style.events[type] === "function") {
                if (type === "touch") {
                  if (/iPhone/gi.test(window.navigator.userAgent)) {
                    dom_clone.addEventListener("touchstart", style.events[type]);
                  } else {
                    dom_clone.addEventListener("click", style.events[type]);
                  }
                } else {
                  dom_clone.addEventListener(type, style.events[type]);
                }
                if (type === "click") {
                  dom_clone.style.cursor = "pointer";
                }
              }
            }
          } else if (typeof style.events === "function") {
            dom_clone.addEventListener("click", style.events);
            dom_clone.style.cursor = "pointer";
          }
        }
        if (mother !== null && typeof mother.appendChild === "function") {
          if (style.before === undefined) {
            mother.appendChild(dom_clone);
          } else {
            mother.insertBefore(dom_clone, style.before);
          }
        }
        if (Array.isArray(children)) {
          if (children.length > 0) {
            for (let childObject of children) {
              childObject.mother = dom_clone;
              AbstractNode.createNode(childObject);
            }
          }
        }
        if (typeof nextObject === "object" && nextObject !== null && !Array.isArray(nextObject)) {
          nextObject.mother = mother;
          AbstractNode.createNode(nextObject);
        }
        if (typeof previousObject === "object" && previousObject !== null && !Array.isArray(previousObject)) {
          previousObject.mother = mother;
          previousDom = AbstractNode.createNode(previousObject);
          if (mother !== null) {
            mother.insertBefore(previousDom, dom_clone);
          }
        }
        return dom_clone;
      }
    } else {
      if (typeof source === "string" && typeof style === "object") {
        dom_clone = SvgTong.stringParsing(source);
        if (style.text !== undefined) {
          delete style.text;
        }
        if (style.class !== undefined) {
          if (Array.isArray(style.class)) {
            for (let c of style.class) {
              dom_clone.classList.add(c);
            }
          }
          delete style.class;
        }
        if (style.id !== undefined) {
          if (typeof style.id === "string" && dom_clone.id !== undefined) {
            dom_clone.id = style.id;
          }
          delete style.id;
        }
        if (style.attribute !== undefined) {
          if (Array.isArray(style.attribute)) {
            for (let a of style.attribute) {
              if (typeof a === "object") {
                for (let key in a) {
                  dom_clone.setAttribute(key, String(a[key]));
                }
              }
            }
          } else if (typeof style.attribute === "object" && style.attribute !== null) {
            for (let key in style.attribute) {
              dom_clone.setAttribute(key, String(style.attribute[key]));
            }
          }
          delete style.attribute;
        }
  
        if (typeof style.style === "object" && style.style !== null && typeof style.set === "string") {
          if (style.set === "block") {
            style.style.display = "block";
            if (typeof style.style.position !== "string") {
              style.style.position = "relative";
            }
          }
          if (style.set === "flex") {
            style.style.display = "flex";
            if (typeof style.style.position !== "string") {
              style.style.position = "relative";
            }
            if (typeof style.style.flexDirection !== "string") {
              style.style.flexDirection = "column";
            }
          }
          if (style.set === "center") {
            style.style.display = "flex";
            if (typeof style.style.position !== "string") {
              style.style.position = "relative";
            }
            if (typeof style.style.flexDirection !== "string") {
              style.style.flexDirection = "column";
            }
            style.style.justifyContent = "center";
            style.style.alignItems = "center";
          }
          if (style.set === "inline") {
            style.style.display = "inline-flex";
            if (typeof style.style.position !== "string") {
              style.style.position = "relative";
            }
            style.style.verticalAlign = "top";
            if (typeof style.style.flexDirection !== "string") {
              style.style.flexDirection = "column";
            }
          }
          if (style.set === "absolute") {
            if (typeof style.style.display !== "string") {
              style.style.display = "block";
            }
            style.style.position = "absolute";
          }
          if (style.set === "fixed") {
            if (typeof style.style.display !== "string") {
              style.style.display = "block";
            }
            if (typeof style.style.top !== "string") {
              style.style.top = "0";
            }
            if (typeof style.style.left !== "string") {
              style.style.left = "0";
            }
            if (typeof style.style.width !== "string") {
              style.style.width = "100%";
            }
            if (typeof style.style.height !== "string") {
              style.style.height = "100%";
            }
            style.style.position = "fixed";
          }
          delete style.set;
        }
  
        if (style.style !== undefined) {
          if (typeof style.style === "object") {
            targetStyle = style.style;
          } else {
            throw new Error("invaild arguments");
          }
        } else {
          targetStyle = style;
        }
  
        if (targetStyle.display === undefined || targetStyle.display === null) {
          targetStyle.display = "flex";
        }
        if (targetStyle.position === undefined || targetStyle.position === null) {
          targetStyle.position = "relative";
        }
        if ((targetStyle.width === "auto" || targetStyle.width === undefined) && targetStyle.height !== undefined) {
          ratio = SvgTong.getRatio(dom_clone);
          if (typeof targetStyle.height !== "number") {
            ea = targetStyle.height.replace(/[\-\.0-9]/gi, '');
            temp = Number(targetStyle.height.replace(/[^\-\.0-9]/gi, ''));
          } else {
            ea = thisEa;
            temp = targetStyle.height;
          }
          targetStyle.width = String(temp * ratio) + ea;
        }
        if ((targetStyle.height === "auto" || targetStyle.height === undefined) && targetStyle.width !== undefined) {
          ratio = SvgTong.getRatio(dom_clone);
          if (typeof targetStyle.width !== "number") {
            ea = targetStyle.width.replace(/[\-\.0-9]/gi, '');
            temp = Number(targetStyle.width.replace(/[^\-\.0-9]/gi, ''));  
          } else {
            ea = thisEa;
            temp = targetStyle.width;
          }
          targetStyle.height = String(temp / ratio) + ea;
        }
        for (let i in targetStyle) {
          if (typeof targetStyle[i] === "number") {
            if (i === "fontWeight" || i === "zIndex" || i === "opacity" || i === "lineHeight" || i === "flex") {
              dom_clone.style[i] = String(targetStyle[i]);
            } else {
              Object.defineProperty(dom_clone.style, i, {
                value: String(targetStyle[i]) + thisEa,
                writable: true,
              });
            }
          } else {
            if (i === "widthHeight") {
              const [ thisWidth, thisHeight ] = targetStyle[i];
              if (typeof thisWidth === "number") {
                dom_clone.style.width = String(thisWidth) + thisEa;
              } else if (typeof thisWidth === "string") {
                dom_clone.style.width = thisWidth;
              }
              if (typeof thisHeight === "number") {
                dom_clone.style.height = String(thisHeight) + thisEa;
              } else if (typeof thisHeight === "string") {
                dom_clone.style.height = thisHeight;
              }
            } else if (i === "fontSizeWeight") {
              const [ thisSize, thisWeight ] = targetStyle[i];
              if (typeof thisSize === "number") {
                dom_clone.style.fontSize = String(thisSize) + thisEa;
              } else if (typeof thisSize === "string") {
                dom_clone.style.fontSize = thisSize;
              }
              if (typeof thisWeight === "number") {
                dom_clone.style.fontWeight = String(thisWeight);
              } else if (typeof thisWeight === "string") {
                dom_clone.style.fontWeight = thisWeight;
              }
            } else {
              Object.defineProperty(dom_clone.style, i, {
                value: targetStyle[i],
                writable: true,
              })
            }
          }
        }
        if (style.event !== undefined) {
          style.events = style.event;
        }
        if (style.events !== undefined) {
          if (Array.isArray(style.events)) {
            for (let obj of style.events) {
              if (Array.isArray(obj.type)) {
                for (let str of obj.type) {
                  if (typeof obj.event === "function") {
                    if (str === "touch") {
                      if (/iPhone/gi.test(window.navigator.userAgent)) {
                        dom_clone.addEventListener("touchstart", obj.event);
                      } else {
                        dom_clone.addEventListener("click", obj.event);
                      }
                    } else {
                      dom_clone.addEventListener(str, obj.event);
                    }
                  }
                }
              } else if (typeof obj.type === "string") {
                if (typeof obj.event === "function") {
                  if (obj.type === "touch") {
                    if (/iPhone/gi.test(window.navigator.userAgent)) {
                      dom_clone.addEventListener("touchstart", obj.event);
                    } else {
                      dom_clone.addEventListener("click", obj.event);
                    }
                  } else {
                    dom_clone.addEventListener(obj.type, obj.event);
                  }
                }
              } else {
                throw new Error("invaild type");
              }
            }
          } else if (typeof style.events === "object" && style.events !== null) {
            for (let type in style.events) {
              if (typeof style.events[type] === "function") {
                if (type === "touch") {
                  if (/iPhone/gi.test(window.navigator.userAgent)) {
                    dom_clone.addEventListener("touchstart", style.events[type]);
                  } else {
                    dom_clone.addEventListener("click", style.events[type]);
                  }
                } else {
                  dom_clone.addEventListener(type, style.events[type]);
                }
              }
            }
          } else if (typeof style.events === "function") {
            dom_clone.addEventListener("click", style.events);
          }
        }
        if (mother !== null && typeof mother.appendChild === "function") {
          if (style.before === undefined) {
            mother.appendChild(dom_clone);
          } else {
            mother.insertBefore(dom_clone, style.before);
          }
        }
        if (typeof nextObject === "object" && nextObject !== null && !Array.isArray(nextObject)) {
          nextObject.mother = mother;
          AbstractNode.createNode(nextObject);
        }
        if (typeof previousObject === "object" && previousObject !== null && !Array.isArray(previousObject)) {
          previousObject.mother = mother;
          previousDom = AbstractNode.createNode(previousObject);
          if (mother !== null) {
            mother.insertBefore(previousDom, dom_clone);
          }
        }
        return dom_clone;
      } else {
        throw new Error("invaild arguments");
      }
    }
  }
  
  public static createNodes = (arr: Array<Dictionary>): Array<HTMLElement | SVGElement> => {
    let result: List;
    let pastNode: HTMLElement | SVGElement | null;
  
    pastNode = null;
    result = [];
    for (let i = 0; i < arr.length; i++) {
      if (typeof arr[i] !== "object") {
        throw new Error("arguments must be [ object, object, object... ]");
      } else {
        if (arr[i].mother === undefined) {
          throw new Error("mother must be exist");
        } else {
          if (typeof arr[i].mother === "string") {
            if (pastNode === null) {
              throw new Error("first mother can not be chain");
            }
            if (/ch/gi.test(arr[i].mother)) {
              arr[i].mother = pastNode;
            } else {
              throw new Error("invaild mother operation");
            }
          } else if (typeof arr[i].mother === "number") {
            if (pastNode === null) {
              throw new Error("first mother can not be chain");
            }
            if (arr[i].mother >= 0) {
              if (result[arr[i].mother] === undefined) {
                throw new Error("index out error");
              }
              arr[i].mother = result[arr[i].mother];
            } else {
              if (result[i + arr[i].mother] === undefined) {
                throw new Error("index out error");
              }
              arr[i].mother = result[i + arr[i].mother];
            }
          }
          pastNode = AbstractNode.createNode(arr[i]);
          result.push(pastNode);
        }
      }
    }

    return result;
  }

  public static createDom = (domCommandObject: Dictionary): HTMLElement => {
    if (typeof domCommandObject !== "object" || domCommandObject === null) {
      throw new Error("invalid input");
    }
    return AbstractNode.createNode(domCommandObject) as HTMLElement;
  }

  public static createSvg = (domCommandObject: Dictionary): SVGElement => {
    if (typeof domCommandObject !== "object" || domCommandObject === null) {
      throw new Error("invalid input");
    }
    domCommandObject.mode = "svg";
    if (typeof domCommandObject.source !== "string") {
      domCommandObject.source = "<svg></svg>";
    }
    return AbstractNode.createNode(domCommandObject) as SVGElement;
  }
  
  public static nodeQueue = (obj: Dictionary): Promise<HTMLElement | SVGElement> => {
    return new Promise((resolve, reject) => {
      if (typeof obj === "object" && obj !== null) {
        try {
          const dom: HTMLElement | SVGElement = AbstractNode.createNode(obj);
          resolve(dom);
        } catch (e) {
          reject(e);
        }
      }
    });
  }
  
  public static withOut = (percent: number, num?: string | number, ea?: string): string => {
    const thisEa: string = AbstractNode.mediaEa();
    if (typeof percent === "number" && typeof num === "number" && typeof ea === "string") {
      return ("calc(" + String(percent) + "% - " + String(num) + ea + ")");
    } else if (typeof percent === "number" && typeof num === "number" && ea === undefined) {
      return ("calc(" + String(percent) + "% - " + String(num) + thisEa + ")");
    } else if (typeof percent === "number" && typeof num === "string" && ea === undefined) {
      return ("calc(" + String(100) + "% - " + String(percent) + num + ")");
    } else if (typeof percent === "number" && num === undefined && ea === undefined) {
      return ("calc(" + String(100) + "% - " + String(percent) + thisEa + ")");
    } else {
      throw new Error("invaild arguments");
    }
  }
  
  public static vwConvert = (num: number): number => {
    return (num / 100) * window.innerWidth;
  }
  
  public static autoHypenPhone = (m: string): string => {
    let str: string = m.trim();
    let tmp: string;

    str = str.replace(/[^0-9]/g, '');
    tmp = '';

    if (str.length < 4) {
      return str;
    } else if (str.length < 7) {
      tmp += str.slice(0,3);
      tmp += '-';
      tmp += str.slice(3);
      return tmp;
    } else if (str.length < 11) {
      tmp += str.slice(0, 3);
      tmp += '-';
      tmp += str.slice(3, 3);
      tmp += '-';
      tmp += str.slice(6);
      return tmp;
    } else {
      tmp += str.slice(0, 3);
      tmp += '-';
      tmp += str.slice(3, 4);
      tmp += '-';
      tmp += str.slice(7);
      return tmp;
    }
  }
  
  public static returnGet = (): Dictionary => {
    let obj: Dictionary = {};
    let target = document.location.search;
    let decode = (str: string) => { return decodeURIComponent(str.split("+").join(" ")); };
    target.replace(/\??(?:([^=]+)=([^&]*)&?)/g, (origin: string, p1: string, p2: string) => {
      obj[decode(p1)] = decode(p2);
      return "";
    });
    return obj;
  }
  
  public static parseRatio = (options: Dictionary): number | string => {
    let obj: Dictionary = options;
    let srcName: string = obj.source;
    let srcArr: Array<string> = srcName.split('_');
    let ratio_raw: List;
    let number0: number;
    let number1: number;
    let result: number;
    let result_return: number | string;
    let ratio: number = 0;

    for (let i = 0; i < srcArr.length; i++) {
      if (/^[0-9]+rspot/.test(srcArr[i])) {
        ratio_raw = srcArr[i].split("rspot");
        number0 = Number(ratio_raw[0]);
        if (ratio_raw[1] === undefined) {
          number1 = 0;
        } else if (ratio_raw[1].length === 0) {
          number1 = 0;
        } else if (ratio_raw[1].length === 1) {
          number1 = Number(ratio_raw[1]) / 10;
        } else if (ratio_raw[1].length === 2) {
          number1 = Number(ratio_raw[1]) / 100;
        } else if (ratio_raw[1].length === 3) {
          number1 = Number(ratio_raw[1]) / 1000;
        } else {
          number1 = 0;
        }
        ratio = number0 + number1;
      }
    }
    if (obj.method === "height") {
      result = (ratio * obj.target);
    } else {
      result = (obj.target / ratio);
    }
    result_return = result;
    if (obj.result === "string") {
      result_return = String(result);
    }
    return result_return;
  }
  
  public static addHrefEvent = (dom: HTMLElement | SVGElement, to: string) => {
    dom.addEventListener("click", function (e) {
      window.location.href = to;
    });
  }
  
  public static addScrollXEvent = (node: HTMLElement, name: string = "") => {
    const today = new Date();
    const todayConst = String(today.getFullYear()) + String(today.getMonth() + 1) + String(today.getDate());
  
    if (name === "") {
      name = node.nodeName + "_" + String(today.getTime() + Math.round(Math.random() * 1000));
    }
    const keyName = name + "_" + todayConst;
    const variablesName = {
      isDown: "isDown" + '_' + keyName,
      startX: "startX" + '_' + keyName,
      scrollLeft: "scrollLeft" + '_' + keyName,
      mouseDown: "mouseDown" + '_' + keyName,
      mouseLeave: "mouseLeave" + '_' + keyName,
      mouseUp: "mouseUp" + '_' + keyName,
      mouseMove: "mouseMove" + '_' + keyName,
      events: [
        { target: "mousedown", name: "mouseDown" + '_' + keyName, },
        { target: "mouseleave", name: "mouseLeave" + '_' + keyName, },
        { target: "mouseup", name: "mouseUp" + '_' + keyName, },
        { target: "mousemove", name: "mouseMove" + '_' + keyName, },
      ],
    };
  
    AbstractNode.stacks[variablesName.isDown] = false;
    AbstractNode.stacks[variablesName.startX] = 0;
    AbstractNode.stacks[variablesName.scrollLeft] = 0;
  
    AbstractNode.events[variablesName.mouseDown] = function (e: any) {
      AbstractNode.stacks[variablesName.isDown] = true;
      AbstractNode.stacks[variablesName.startX] = e.pageX - node.offsetLeft;
      AbstractNode.stacks[variablesName.scrollLeft] = node.scrollLeft;
      node.style.cursor = "grabbing";
    }
  
    AbstractNode.events[variablesName.mouseLeave] = function () {
      AbstractNode.stacks[variablesName.isDown] = false;
      node.style.cursor = "pointer";
    }
  
    AbstractNode.events[variablesName.mouseUp] = function () {
      AbstractNode.stacks[variablesName.isDown] = false;
      node.style.cursor = "pointer";
    }
  
    AbstractNode.events[variablesName.mouseMove] = function (e: Dictionary) {
      let x: number, walk: number;
      if (!AbstractNode.stacks[variablesName.isDown]) {
        return;
      }
      e.preventDefault();
      x = e.pageX - node.offsetLeft;
      walk = x - AbstractNode.stacks[variablesName.startX];
      node.scrollLeft = AbstractNode.stacks[variablesName.scrollLeft] - walk;
      node.style.cursor = "grabbing";
    }
  
    node.addEventListener("mousedown", AbstractNode.events[variablesName.mouseDown]);
    node.addEventListener("mouseleave", AbstractNode.events[variablesName.mouseLeave]);
    node.addEventListener("mouseup", AbstractNode.events[variablesName.mouseUp]);
    node.addEventListener("mousemove", AbstractNode.events[variablesName.mouseMove]);
  
    return variablesName;
  }

  public static getDateMatrix = (year: any, month: any): DateMatrix => {
    let tempObj: any;
    let tempArr: any;
    let tempArr2: any;
    let tempArr3: any;
  
    if (year === "today" || (year === undefined && month === undefined)) {
      tempObj = new Date();
      year = tempObj.getFullYear();
      month = tempObj.getMonth();
    } else if (typeof year === "string" && month === undefined && /\-/g.test(year)) {
      if (year.length === 10) {
        tempArr = year.split("-");
        tempObj = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
      } else {
        tempArr = year.split(" ");
        tempArr2 = tempArr[0].split("-");
        tempArr3 = tempArr[1].split(":");
        tempObj = new Date(Number(tempArr2[0]), Number(tempArr2[1].replace(/^0/, '')) - 1, Number(tempArr2[2].replace(/^0/, '')), Number(tempArr3[0].replace(/^0/, '')), Number(tempArr3[1].replace(/^0/, '')), Number(tempArr3[2].replace(/^0/, '')));
      }
      year = tempObj.getFullYear();
      month = tempObj.getMonth();
    } else if (typeof year === "object") {
      month = year.getMonth();
      year = year.getFullYear();
    }
  
    const getLastDate = (year: number, month: number): number => {
      const today: Date = new Date(year, month, 1);
      let newMonth: number, lastDate: number;
      lastDate = -1;
      for (let i = 27; i < 33; i++) {
        today.setDate(i);
        newMonth = today.getMonth();
        if (month !== newMonth) {
          lastDate = i - 1;
          break;
        }
      }
      return lastDate;
    }
  
    const firstDate: number = 1;
    const firstDay: number = (new Date(year, month, 1)).getDay();
    const lastDate: number = getLastDate(year, month);
  
    let tempDate: Date;
    let arr: List;
    let tong: List;
    let pastLength: number;
    let result: DateMatrix;
    let num: number;
  
    result = new DateMatrix(year, month);
    tong = [];
    arr = [];
  
    if (firstDay !== 0) {
      for (let i = 0; i < firstDay - 1; i++) {
        arr.push(null);
      }
    } else {
      for (let i = 0; i < 6; i++) {
        arr.push(null);
      }
    }
  
    for (let i = firstDate; i < lastDate + 1; i++) {
      tempDate = new Date(year, month, i);
      arr.push(tempDate.getDay());
      if (arr.length % 7 === 0) {
        tong.push(arr);
        arr = [];
      }
    }
  
    if (arr.length !== 7 && arr.length !== 0) {
      pastLength = arr.length;
      for (let i = 0; i < 7 - pastLength; i++) {
        arr.push(null);
      }
      tong.push(arr);
    }
  
    num = 1;
    for (let arr of tong) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== null) {
          arr[i] = new DateFactor(year, month, num, i);
          num++;
        }
      }
    }
  
    result.matrix = tong;
  
    return result;
  }

  public static sleep = (time: number): Promise<string> => {
    let timeoutId: any = null;
    return new Promise((resolve, reject) => {
      timeoutId = setTimeout(function () {
        resolve("awake");
        clearTimeout(timeoutId);
        timeoutId = null;
      }, time);
    });
  }

  public static downloadString = (text: string, fileName: string, fileType: string = "plain") => {
    if (/csv/gi.test(fileType)) {
      fileType = "text/csv"
    } else if (/json/gi.test(fileType)) {
      fileType = "application/json"
    } else if (/js/gi.test(fileType)) {
      fileType = "application/js"
    } else if (/svg/gi.test(fileType)) {
      fileType = "image/svg+xml"
    } else if (/xml/gi.test(fileType)) {
      fileType = "application/xml"
    } else if (/html/gi.test(fileType)) {
      fileType = "text/html"
    } else if (/pdf/gi.test(fileType)) {
      fileType = "application/pdf"
    } else {
      fileType = "text/plain"
    }
  
    let blob: Blob;
    let a: HTMLAreaElement;
    let timeoutId: any;
  
    blob = new Blob([ text ], { type: fileType });
  
    a = document.createElement('A') as HTMLAreaElement;
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = [ fileType, a.download, a.href ].join(':');
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  
    timeoutId = setTimeout(() => {
      URL.revokeObjectURL(a.href);
      clearTimeout(timeoutId);
    }, 1000);
  }

  public static blankHref = (link: string) => {
    let a: HTMLAnchorElement;
    a = document.createElement("A") as HTMLAnchorElement;
    a.style.display = "none";
    a.href = link;
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  public static selfHref = (link: string) => {
    window.location.assign(link);
  }

  public static styleInjection = (dom: HTMLElement | SVGElement, styleObj: Dictionary) => {
    for (let i in styleObj) {
      Object.defineProperty(dom.style, i, {
        value: styleObj[i],
        writable: true,
      });
    }
  }

  public static cssInjection = (cssString: string) => {
    const style: HTMLStyleElement | null = document.querySelector("style");
    if (style !== null) {
      style.insertAdjacentHTML("beforeend", cssString);
    }
  }
  
  public static uniqueValue = (type: string = "number"): any => {
    if (type === "number") {
      return Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000)));
    } else if (type === "string") {
      return String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000));
    } else if (type === "hex") {
      const x = 16;
      const length = 11;
      const uniqueNumber = (new Date()).valueOf();
      const hexChars = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' ];
      const randomKeyWords = [ 'A', 'B', 'C', 'D', 'E', 'F' ];
      let uniqueNumber_copied: number;
      let maxExponent: number;
      let cArr: List;
      let temp: number;
      let hexString: string;
      uniqueNumber_copied = uniqueNumber;
      maxExponent = 0;
      while (Math.pow(x, maxExponent) <= uniqueNumber) {
        maxExponent++;
      }
      cArr = [];
      for (let i = 0; i < maxExponent; i++) {
        temp = ((uniqueNumber_copied / Math.pow(x, i)) % x);
        cArr.push(temp);
        uniqueNumber_copied = uniqueNumber_copied - (temp * Math.pow(x, i));
      }
      hexString = cArr.map((index) => { return hexChars[index] }).join('');
      for (let i = 0; i < length; i++) {
        hexString += hexChars[Math.floor(hexChars.length * Math.random())];
      }
      return randomKeyWords[Math.floor(randomKeyWords.length * Math.random())] + randomKeyWords[Math.floor(randomKeyWords.length * Math.random())] + hexChars[Math.floor(hexChars.length * Math.random())] + randomKeyWords[Math.floor(randomKeyWords.length * Math.random())] + String(uniqueNumber) + 'A' + hexString;
    } else {
      return String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000));
    }
  }
  
  public static copyText = async (str: string): Promise<any> => {
    try {
      await window.navigator.clipboard.writeText(str);
    } catch (e) {
      console.log(e);
    }
  }

  public static isMac = (): boolean => {
    return !/Windows/gi.test(window.navigator.userAgent);
  }
  
  public static isIphone = (): boolean => {
    return /iPhone/gi.test(window.navigator.userAgent);
  }

  public static cleanChildren = (dom: List | HTMLElement | SVGElement) => {
    if (Array.isArray(dom)) {
      for (let d of dom) {
        while (d.firstChild !== null && d.firstChild !== undefined) {
          d.removeChild(d.firstChild);
        }
      }
    } else {
      while (dom.firstChild !== null && dom.firstChild !== undefined) {
        dom.removeChild(dom.firstChild);
      }
    }
  }
  
  public static objectDeepCopy = (obj: Dictionary | List): Dictionary | List => {
    return AbstractNode.equalJson(JSON.stringify(obj));
  }
  
  public static pixelUnit = (num: number): string => {
    return `${String(num)}px`;
  }
  
  public static eaUnit = (num: number): string => {
    const thisEa: string = AbstractNode.mediaEa();
    return `${String(num)}${thisEa}`;
  }

  public static percent = (num?: number): string => {
    if (num === undefined || typeof num !== "number") {
      return `100%`;
    } else {
      return `${String(num)}%`;
    }
  }

  public static hexaJson = async (input: any, middleMode: boolean = false) => {
    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
    const tokenStart: string = "__hexaFunctionStart__<<<";
    const tokenEnd: string = ">>>__hexaFunctionEnd__";
    const hexaFunction = async (input: any) => {
      try {
        const hexEncode = (str: string): string => {
          let hex: string;
          let result: string = "";
          for (let i = 0; i < str.length; i++) {
            hex = str.charCodeAt(i).toString(16);
            result += String("000" + hex).slice(-4);
          }
          return result
        }
        const hexDecode = (hash: string): string => {
          let hexes: List = (hash.match(/.{1,4}/g) || []);
          let back: string = "";
          for(let j = 0; j < hexes.length; j++) {
            back += String.fromCharCode(parseInt(hexes[j], 16));
          }
          return back;
        }
        const toHex = (str: string): Promise<any> => {
          return new Promise((resolve, reject) => {
            resolve(hexEncode(str));
          });
        }
        const toFunction = (hash: string): Promise<any> => {
          return new Promise((resolve, reject) => {
            resolve(hexDecode(hash));
          });
        }
        let functionString: string, functionString_copied: string;
        let argString: string;
        let argArr: List;
        let decodeFunction: any;
        let asyncBoo: boolean;
  
        if (typeof input === "function") {
  
          return tokenStart + (await toHex(input.toString())) + tokenEnd;
  
        } else if (typeof input === "string") {
  
          if ((new RegExp('^' + tokenStart)).test(input) && (new RegExp(tokenEnd + '$')).test(input)) {
            input = input.replace(new RegExp('^' + tokenStart), '').replace(new RegExp(tokenEnd + '$'), '');
            functionString = await toFunction(input);
            functionString_copied = String(functionString).trim();
            argString = '';
            asyncBoo = /^async/.test(functionString_copied);
            if (/^(async function|function)/i.test(functionString_copied)) {
              functionString_copied.replace(/^(async function|function) [^\(]*\(([^\)]*)\)[ ]*\{/, (match, p1, p2) => {
                argString = p2.trim();
                return '';
              });
            } else {
              functionString_copied.replace(/^(async \(|\()([^\)]*)\)[ ]*\=\>[ ]*\{/, (match, p1, p2) => {
                argString = p2.trim();
                return '';
              });
            }
            argString = argString.replace(/[ ]*\=[ ]*[\{\[][^\=]*[\}\]]/gi, '');
            argString = argString.replace(/[ ]*\=[ ]*[^,]+/gi, '');
            argArr = argString.split(',').map((str) => { return str.trim(); });
            if (argArr.some((str) => { return / /gi.test(str); })) {
              throw new Error("invaild argument name");
            }
            if (asyncBoo) {
              decodeFunction = new AsyncFunction(...argArr, functionString.trim().replace(/^(async function [^\(]*\([^\)]*\)[ ]*\{|async \([^\)]*\)[ ]*\=\>[ ]*\{)/, '').replace(/\}$/, ''));
            } else {
              decodeFunction = new Function(...argArr, functionString.trim().replace(/^(function [^\(]*\([^\)]*\)[ ]*\{|\([^\)]*\)[ ]*\=\>[ ]*\{)/, '').replace(/\}$/, ''));
            }
            return decodeFunction;
          } else {
            return input;
          }
  
        } else {
          throw new Error("invaild input");
        }
      } catch (e) {
        console.log(e);
      }
    }
    try {
      if (typeof input === "function") {
        return await hexaFunction(input);
      } else if (typeof input === "object") {
        if (input === null) {
          return null;
        } else {
          const toJson = async function (obj: Dictionary) {
            try {
              for (let i in obj) {
                if (typeof obj[i] === "function") {
                  obj[i] = await hexaFunction(obj[i]);
                } else if (typeof obj[i] === "object" && obj[i] !== null) {
                  obj[i] = await toJson(obj[i]);
                }
              }
              return obj;
            } catch (e) {
              return obj;
            }
          }
          if (!middleMode) {
            return JSON.stringify(await toJson(input));
          } else {
            return await toJson(input);
          }
        }
      } else if (typeof input === "string") {
        if ((new RegExp('^' + tokenStart)).test(input)) {
          return await hexaFunction(input);
        } else {
          const toObj = async function (obj: Dictionary) {
            try {
              for (let i in obj) {
                if (typeof obj[i] === "string" && (new RegExp('^' + tokenStart)).test(obj[i])) {
                  obj[i] = await hexaFunction(obj[i]);
                } else if (typeof obj[i] === "object" && obj[i] !== null) {
                  obj[i] = await toObj(obj[i]);
                }
              }
              return obj;
            } catch (e) {
              return obj;
            }
          }
          return await toObj(AbstractNode.equalJson(input) as Dictionary);
        }
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  
  public static autoComma = (str: number | string, manVersion: boolean = false): string => {
    let minus: string;
    let count: number;
    let countArr: List;
    let execResult: RegExpExecArray | null;
    let temp: any, tempArr: List;
    if (typeof str === "number") {
      str = String(Math.floor(str));
    }
    if (/e/gi.test(str)) {
      throw new Error("is too heavy");
    }
    execResult = /\-/g.exec(str);
    if (execResult !== null) {
      minus = execResult[0];
    } else {
      minus = "";
    }
    str = str.replace(/[^0-9]/g, '');
    if (str === '') {
      throw new Error("invaild number");
    }
    if (manVersion) {
      str = String(Math.floor(Number(str) / 10000));
    }
    count = Math.ceil(str.length / 3);
    countArr = [];
    for (let i = 0; i < count; i++) {
      countArr.push([ 3 * i, 3 * (i + 1) ]);
    }
    if (countArr.length === 0) {
      throw new Error("invaild number");
    }
    tempArr = [];
    for (let arr of countArr) {
      temp = '';
      for (let i = arr[0]; i < arr[1]; i++) {
        if (str.length - 1 - i < 0) {
          temp += '';
        } else {
          temp = str[str.length - 1 - i] + temp;
        }
      }
      if (temp !== '') {
        tempArr.unshift(temp);
      }
    }
  
    if (manVersion) {
      return (minus + tempArr.join(',')) + "만";
    } else {
      return (minus + tempArr.join(','));
    }
  }

  public static dateToString = (date: Date, detail: boolean = false, dayOption: boolean = false): string => {
    const dayday: Array<string> = [ '일', '월', '화', '수', '목', '금', '토' ];
    if (detail === undefined || detail === null) {
      detail = false;
    }
    const zeroAddition = (num: number): string => { return (num < 10) ? `0${String(num)}` : String(num); }
    const emptyDateValue = (new Date(1900, 0, 1)).valueOf();
    const futureDateValue = (new Date(3000, 0, 1)).valueOf();
    if (date.valueOf() <= emptyDateValue) {
      return "해당 없음";
    } else if (date.valueOf() >= futureDateValue) {
      return "예정";
    } else {
      if (!detail) {
        return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())}`;
      } else {
        if (dayOption) {
          return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())} ${zeroAddition(date.getHours())}:${zeroAddition(date.getMinutes())}:${zeroAddition(date.getSeconds())} ${dayday[date.getDay()]}요일`;
        } else {
          return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())} ${zeroAddition(date.getHours())}:${zeroAddition(date.getMinutes())}:${zeroAddition(date.getSeconds())}`;
        }
      }
    }
  }
  
  public static dateToHangul = (date: Date, shortYear: boolean = false): string => {
    const emptyDateValue: number = (new Date(1900, 0, 1)).valueOf();
    const futureDateValue: number = (new Date(3000, 0, 1)).valueOf();
    if (date.valueOf() <= emptyDateValue) {
      return "해당 없음";
    } else if (date.valueOf() >= futureDateValue) {
      return "예정";
    } else {
      if (shortYear) {
        return `${String(date.getFullYear()).slice(2)}년 ${String(date.getMonth() + 1)}월 ${String(date.getDate())}일`;
      } else {
        return `${String(date.getFullYear())}년 ${String(date.getMonth() + 1)}월 ${String(date.getDate())}일`;
      }
    }
  }
  
  public static zeroAddition = (num: number): string => {
    return ((num < 10) ? `0${String(num)}` : String(num));
  }

  public static stringToDate = (str: any): Date => {
    if (str instanceof Date) {
      return str;
    }
    if (typeof str === "number") {
      return new Date(str);
    }
    if (typeof str !== "string") {
      throw new Error("invaild input");
    }
    if (str.trim() === '' || str.trim() === '-' || /없음/gi.test(str)) {
      return (new Date(1800, 0, 1));
    }
    if (str.trim() === "예정" || str.trim() === "진행중" || str.trim() === "미정") {
      return (new Date(3800, 0, 1));
    }
  
    const zeroAddition = function (num: number): string { return (num < 10) ? `0${String(num)}` : String(num); };
    let tempArr: List, tempArr2: List, tempArr3: List, tempArr4: List;
    let tempArr5: List;
    str = str.trim().replace(/[\~\t]/gi, '').trim();
  
    if (/T/g.test(str) && /Z$/.test(str) && /^[0-9]/.test(str) && /\-/g.test(str) && /\:/g.test(str)) {
      if (!Number.isNaN((new Date(str)).getTime())) {
        return new Date(str);
      }
    }
  
    if (!/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(str) && !/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]$/.test(str)) {
      if (/^[0-9][0-9][ ]*\-[ ]*[0-9][0-9][ ]*\-[ ]*[0-9][0-9]$/.test(str)) {
        str = str.split("-").map((s: string) => { return s.trim() }).join("-");
        str = "20" + str;
      } else if (/^[0-9][0-9][0-9][0-9][ ]*\-[ ]*[0-9][0-9]$/.test(str)) {
        str = str.split("-").map((s: string) => { return s.trim() }).join("-");
        str = str + "-01";
      } else if (/^[0-9][0-9][ ]*\-[ ]*[0-9][0-9]$/.test(str)) {
        str = str.split("-").map((s: string) => { return s.trim() }).join("-");
        str = "20" + str + "-01";
      } else if (/^[0-9][0-9][ ]*[년][ ]*[0-9]/.test(str)) {
        tempArr = str.split("년").map((s: string) => { return s.trim(); });
        if (/월/gi.test(str)) {
          tempArr4 = tempArr[1].trim().split("월");
          if (/일/gi.test(str)) {
            str = String(Number(tempArr[0].replace(/[^0-9]/gi, '')) + 2000) + "-" + zeroAddition(Number(tempArr4[0].replace(/[^0-9]/gi, ''))) + "-" + zeroAddition(Number(tempArr4[1].replace(/[^0-9]/gi, '')));
          } else {  
            str = String(Number(tempArr[0].replace(/[^0-9]/gi, '')) + 2000) + "-" + zeroAddition(Number(tempArr4[0].replace(/[^0-9]/gi, ''))) + "-01";
          }
        } else {
          str = String(Number(tempArr[0].replace(/[^0-9]/gi, '')) + 2000) + "-" + zeroAddition(Number(tempArr[1].replace(/[^0-9]/gi, ''))) + "-01";
        }
      } else if (/^[0-9][0-9][0-9][0-9][ ]*[년][ ]*[0-9]/.test(str)) {
        tempArr = str.split("년").map((s: string) => { return s.trim(); });
        if (/월/gi.test(str)) {
          tempArr4 = tempArr[1].trim().split("월");
          if (/일/gi.test(str)) {
            str = String(Number(tempArr[0].replace(/[^0-9]/gi, ''))) + "-" + zeroAddition(Number(tempArr4[0].replace(/[^0-9]/gi, ''))) + "-" + zeroAddition(Number(tempArr4[1].replace(/[^0-9]/gi, '')));
          } else {  
            str = String(Number(tempArr[0].replace(/[^0-9]/gi, ''))) + "-" + zeroAddition(Number(tempArr4[0].replace(/[^0-9]/gi, ''))) + "-01";
          }
        } else {
          str = String(Number(tempArr[0].replace(/[^0-9]/gi, ''))) + "-" + zeroAddition(Number(tempArr[1].replace(/[^0-9]/gi, ''))) + "-01";
        }
      } else if (/^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/.test(str.trim())) {
        str = str.slice(0, 4) + "-" + str.slice(4, 6) + "-" + str.slice(6);
      } else if (/^[0-9][0-9][0-9][0-9][0-9][0-9]$/.test(str.trim())) {
        str = "20" + str.slice(0, 2) + "-" + str.slice(2, 4) + "-" + str.slice(4);
      } else if (/^[0-9][0-9][ ]*\-[ ]*[0-9]$/.test(str)) {
        str = str.split("-").map((s: string) => { return s.trim() }).join("-");
        tempArr5 = str.split("-");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + "01";
      } else if (/^[0-9][0-9][0-9][0-9][ ]*\-[ ]*[0-9]$/.test(str)) {
        str = str.split("-").map((s: string) => { return s.trim() }).join("-");
        tempArr5 = str.split("-");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + "01";
      } else if (/^[0-9][0-9][ ]+[0-9][0-9]$/.test(str)) {
        str = str.split(" ").map((s: string) => { return s.trim() }).filter((s: string) => { return s !== "" }).join(" ");
        tempArr5 = str.split(" ");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + "01";
      } else if (/^[0-9][0-9][0-9][0-9][ ]+[0-9]$/.test(str)) {
        str = str.split(" ").map((s: string) => { return s.trim() }).filter((s: string) => { return s !== "" }).join(" ");
        tempArr5 = str.split(" ");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + "01";
      } else if (/^[0-9][0-9][ ]+[0-9]$/.test(str)) {
        str = str.split(" ").map((s: string) => { return s.trim() }).filter((s: string) => { return s !== "" }).join(" ");
        tempArr5 = str.split(" ");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + "01";
      } else if (/^[0-9][0-9][0-9][0-9][ ]+[0-9]$/.test(str)) {
        str = str.split(" ").map((s: string) => { return s.trim() }).filter((s: string) => { return s !== "" }).join(" ");
        tempArr5 = str.split(" ");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + "01";
      } else if (/^[0-9][0-9][0-9][0-9][ ]+[0-9][0-9][ ]+[0-9][0-9]$/.test(str)) {
        str = str.split(" ").map((s: string) => { return s.trim() }).filter((s: string) => { return s !== "" }).join(" ");
        tempArr5 = str.split(" ");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][0-9][0-9][ ]+[0-9][ ]+[0-9][0-9]$/.test(str)) {
        str = str.split(" ").map((s: string) => { return s.trim() }).filter((s: string) => { return s !== "" }).join(" ");
        tempArr5 = str.split(" ");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][0-9][0-9][ ]+[0-9][0-9][ ]+[0-9]$/.test(str)) {
        str = str.split(" ").map((s: string) => { return s.trim() }).filter((s: string) => { return s !== "" }).join(" ");
        tempArr5 = str.split(" ");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][0-9][0-9][ ]+[0-9][ ]+[0-9]$/.test(str)) {
        str = str.split(" ").map((s: string) => { return s.trim() }).filter((s: string) => { return s !== "" }).join(" ");
        tempArr5 = str.split(" ");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][ ]+[0-9][0-9][ ]+[0-9][0-9]$/.test(str)) {
        str = str.split(" ").map((s: string) => { return s.trim() }).filter((s: string) => { return s !== "" }).join(" ");
        tempArr5 = str.split(" ");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][ ]+[0-9][ ]+[0-9][0-9]$/.test(str)) {
        str = str.split(" ").map((s: string) => { return s.trim() }).filter((s: string) => { return s !== "" }).join(" ");
        tempArr5 = str.split(" ");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][ ]+[0-9][0-9][ ]+[0-9]$/.test(str)) {
        str = str.split(" ").map((s: string) => { return s.trim() }).filter((s: string) => { return s !== "" }).join(" ");
        tempArr5 = str.split(" ");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][ ]+[0-9][ ]+[0-9]$/.test(str)) {
        str = str.split(" ").map((s: string) => { return s.trim() }).filter((s: string) => { return s !== "" }).join(" ");
        tempArr5 = str.split(" ");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][ ]*\/[ ]*[0-9][0-9]$/.test(str)) {
        str = str.split("/").map((s: string) => { return s.trim() }).join("/");
        tempArr5 = str.split("/");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + "01";
      } else if (/^[0-9][0-9][0-9][0-9][ ]*\/[ ]*[0-9][0-9]$/.test(str)) {
        str = str.split("/").map((s: string) => { return s.trim() }).join("/");
        tempArr5 = str.split("/");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + "01";
      } else if (/^[0-9][0-9][ ]*\/[ ]*[0-9]$/.test(str)) {
        str = str.split("/").map((s: string) => { return s.trim() }).join("/");
        tempArr5 = str.split("/");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + "01";
      } else if (/^[0-9][0-9][0-9][0-9][ ]*\/[ ]*[0-9]$/.test(str)) {
        str = str.split("/").map((s: string) => { return s.trim() }).join("/");
        tempArr5 = str.split("/");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + "01";
      } else if (/^[0-9][0-9][0-9][0-9][ ]*\/[ ]*[0-9][0-9][ ]*\/[ ]*[0-9][0-9]$/.test(str)) {
        str = str.split("/").map((s: string) => { return s.trim() }).join("/");
        tempArr5 = str.split("/");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][0-9][0-9][ ]*\/[ ]*[0-9][ ]*\/[ ]*[0-9][0-9]$/.test(str)) {
        str = str.split("/").map((s: string) => { return s.trim() }).join("/");
        tempArr5 = str.split("/");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][0-9][0-9][ ]*\/[ ]*[0-9][0-9][ ]*\/[ ]*[0-9]$/.test(str)) {
        str = str.split("/").map((s: string) => { return s.trim() }).join("/");
        tempArr5 = str.split("/");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][0-9][0-9][ ]*\/[ ]*[0-9][ ]*\/[ ]*[0-9]$/.test(str)) {
        str = str.split("/").map((s: string) => { return s.trim() }).join("/");
        tempArr5 = str.split("/");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][ ]*\/[ ]*[0-9][0-9][ ]*\/[ ]*[0-9][0-9]$/.test(str)) {
        str = str.split("/").map((s: string) => { return s.trim() }).join("/");
        tempArr5 = str.split("/");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][ ]*\/[ ]*[0-9][ ]*\/[ ]*[0-9][0-9]$/.test(str)) {
        str = str.split("/").map((s: string) => { return s.trim() }).join("/");
        tempArr5 = str.split("/");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][ ]*\/[ ]*[0-9][0-9][ ]*\/[ ]*[0-9]$/.test(str)) {
        str = str.split("/").map((s: string) => { return s.trim() }).join("/");
        tempArr5 = str.split("/");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][ ]*\/[ ]*[0-9][ ]*\/[ ]*[0-9]$/.test(str)) {
        str = str.split("/").map((s: string) => { return s.trim() }).join("/");
        tempArr5 = str.split("/");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][ ]*\.[ ]*[0-9][0-9][ ]*\.?[ ]*$/.test(str)) {
        str = str.split(".").map((s: string) => { return s.trim() }).join(".");
        tempArr5 = str.split(".");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + "01";
      } else if (/^[0-9][0-9][0-9][0-9]\.[0-9][0-9][ ]*\.?[ ]*$/.test(str)) {
        str = str.split(".").map((s: string) => { return s.trim() }).join(".");
        tempArr5 = str.split(".");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + "01";
      } else if (/^[0-9][0-9][ ]*\.[ ]*[0-9][ ]*\.?[ ]*$/.test(str)) {
        str = str.split(".").map((s: string) => { return s.trim() }).join(".");
        tempArr5 = str.split(".");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + "01";
      } else if (/^[0-9][0-9][0-9][0-9][ ]*\.[ ]*[0-9][ ]*\.?[ ]*$/.test(str)) {
        str = str.split(".").map((s: string) => { return s.trim() }).join(".");
        tempArr5 = str.split(".");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + "01";
      } else if (/^[0-9][0-9][0-9][0-9][ ]*\.[ ]*[0-9][0-9][ ]*\.[ ]*[0-9][0-9]$/.test(str)) {
        str = str.split(".").map((s: string) => { return s.trim() }).join(".");
        tempArr5 = str.split(".");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][0-9][0-9][ ]*\.[ ]*[0-9][ ]*\.[ ]*[0-9][0-9]$/.test(str)) {
        str = str.split(".").map((s: string) => { return s.trim() }).join(".");
        tempArr5 = str.split(".");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][0-9][0-9][ ]*\.[ ]*[0-9][0-9][ ]*\.[ ]*[0-9]$/.test(str)) {
        str = str.split(".").map((s: string) => { return s.trim() }).join(".");
        tempArr5 = str.split(".");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][0-9][0-9][ ]*\.[ ]*[0-9][ ]*\.[ ]*[0-9]$/.test(str)) {
        str = str.split(".").map((s: string) => { return s.trim() }).join(".");
        tempArr5 = str.split(".");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][ ]*\.[ ]*[0-9][0-9][ ]*\.[ ]*[0-9][0-9]$/.test(str)) {
        str = str.split(".").map((s: string) => { return s.trim() }).join(".");
        tempArr5 = str.split(".");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][ ]*\.[ ]*[0-9][ ]*\.[ ]*[0-9][0-9]$/.test(str)) {
        str = str.split(".").map((s: string) => { return s.trim() }).join(".");
        tempArr5 = str.split(".");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][ ]*\.[ ]*[0-9][0-9][ ]*\.[ ]*[0-9]$/.test(str)) {
        str = str.split(".").map((s: string) => { return s.trim() }).join(".");
        tempArr5 = str.split(".");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][ ]*\.[ ]*[0-9][ ]*\.[ ]*[0-9]$/.test(str)) {
        str = str.split(".").map((s: string) => { return s.trim() }).join(".");
        tempArr5 = str.split(".");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9]\. [0-9][0-9][ ]*\.?[ ]*$/.test(str)) {
        tempArr5 = str.split(". ");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + "01";
      } else if (/^[0-9][0-9][0-9][0-9]\. [0-9][0-9][ ]*\.?[ ]*$/.test(str)) {
        tempArr5 = str.split(". ");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + "01";
      } else if (/^[0-9][0-9]\. [0-9][ ]*\.?[ ]*$/.test(str)) {
        tempArr5 = str.split(". ");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + "01";
      } else if (/^[0-9][0-9][0-9][0-9]\. [0-9]\.?$/.test(str)) {
        tempArr5 = str.split(". ");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + "01";
      } else if (/^[0-9][0-9][0-9][0-9]\. [0-9][0-9]\. [0-9][0-9]$/.test(str)) {
        tempArr5 = str.split(". ");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][0-9][0-9]\. [0-9]\. [0-9][0-9]$/.test(str)) {
        tempArr5 = str.split(". ");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][0-9][0-9]\. [0-9][0-9]\. [0-9]$/.test(str)) {
        tempArr5 = str.split(". ");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9][0-9][0-9]\. [0-9]\. [0-9]$/.test(str)) {
        tempArr5 = str.split(". ");
        str = tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9]\. [0-9][0-9]\. [0-9][0-9]$/.test(str)) {
        tempArr5 = str.split(". ");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9]\. [0-9]\. [0-9][0-9]$/.test(str)) {
        tempArr5 = str.split(". ");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9]\. [0-9][0-9]\. [0-9]$/.test(str)) {
        tempArr5 = str.split(". ");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else if (/^[0-9][0-9]\. [0-9]\. [0-9]$/.test(str)) {
        tempArr5 = str.split(". ");
        str = "20" + tempArr5[0] + "-" + zeroAddition(Number(tempArr5[1])) + "-" + zeroAddition(Number(tempArr5[2]));
      } else {
        throw new Error("not date string : " + str);
      }
    }
  
    if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(str)) {
      tempArr = str.split('-');
      return (new Date(Number(tempArr[0]), Number(tempArr[1]) - 1, Number(tempArr[2])));
    } else {
      tempArr = str.split(' ');
      tempArr2 = tempArr[0].split('-');
      tempArr3 = tempArr[1].split(':');
      return (new Date(Number(tempArr2[0]), Number(tempArr2[1]) - 1, Number(tempArr2[2]), Number(tempArr3[0]), Number(tempArr3[1]), Number(tempArr3[2])));
    }
  }
  
  public static rangeToDate = (str: string): DateRange => {
    if (!/ ~ /gi.test(str)) {
      throw new Error("invalid input");
    }
    const [ start, end ] = str.split(" ~ ").map((s: string) => { return s.trim() }).map((s) => { return AbstractNode.stringToDate(s) });
    return (new DateRange(start, end));
  }

  public static linkToString = (link: string): string => {
    const nameToToken = (name: string): string => { return `_____${name}_____` } 
    const tokens: Dictionary = {
      equal: nameToToken("equal"),
      amp: nameToToken("amp"),
      question: nameToToken("question"),
      hypen: nameToToken("hypen"),
      slash: nameToToken("slash"),
      colon: nameToToken("colon"),
      back: nameToToken("back"),
      sharp: nameToToken("sharp"),
      plus: nameToToken("plus"),
      percent: nameToToken("percent"),
      dot: nameToToken("dot"),
      wave: nameToToken("wave"),
      hat: nameToToken("hat"),
    }
    let linkArr: List;
    let protocol: string;
    let host: string;
    let pathName: string;
    let search: string;
    let getObj: Dictionary;
    let filteredLink: string;
  
    if (!/^http/.test(link)) {
  
      pathName = link;
      pathName = pathName.split("/").map((str) => { return globalThis.encodeURIComponent(str) }).join("/");
      filteredLink = pathName;
  
    } else {
  
      linkArr = link.split("/");
      if (linkArr.length < 3) {
        throw new Error("invalid link");
      }
      protocol = linkArr[0].replace(/[\:]/gi, '');
      host = linkArr[2];
      pathName = "/" + linkArr.slice(3).join("/");
    
      if (/[\?]/gi.test(pathName)) {
        search = pathName.split("?")[1];
        pathName = pathName.split("?")[0];
      } else {
        search = "";
      }
    
      if (search !== "") {
        getObj = search.split("&").map((str) => { return { key: str.split("=")[0], value: str.split("=")[1] } });
      } else {
        getObj = [];
      }
    
      pathName = pathName.split("/").map((str) => { return globalThis.encodeURIComponent(str) }).join("/");
    
      if (getObj.map((obj: Dictionary) => { return `${obj.key}=${obj.value}` }).join("&") === '') {
        filteredLink = protocol + "://" + host + pathName;
      } else {
        filteredLink = protocol + "://" + host + pathName + "?" + getObj.map((obj: Dictionary) => { return `${obj.key}=${obj.value}` }).join("&");
      }

    }
  
    filteredLink = filteredLink.replace(/[\=]/gi, tokens.equal);
    filteredLink = filteredLink.replace(/[\&]/gi, tokens.amp);
    filteredLink = filteredLink.replace(/[\?]/gi, tokens.question);
    filteredLink = filteredLink.replace(/[\-]/gi, tokens.hypen);
    filteredLink = filteredLink.replace(/[\/]/gi, tokens.slash);
    filteredLink = filteredLink.replace(/[\:]/gi, tokens.colon);
    filteredLink = filteredLink.replace(/[\\]/gi, tokens.back);
    filteredLink = filteredLink.replace(/[\#]/gi, tokens.sharp);
    filteredLink = filteredLink.replace(/[\+]/gi, tokens.plus);
    filteredLink = filteredLink.replace(/[\%]/gi, tokens.percent);
    filteredLink = filteredLink.replace(/[\.]/gi, tokens.dot);
    filteredLink = filteredLink.replace(/[\~]/gi, tokens.wave);
    filteredLink = filteredLink.replace(/[\^]/gi, tokens.hat);
  
    return filteredLink;
  }

  public static promiseTogether = (promiseArr: List): Promise<any> => {
    if (!promiseArr.every((obj) => { return obj instanceof Promise })) {
      throw new Error("invaild input");
    }
    return new Promise((resolve, reject) => {
      const workLength: number = promiseArr.length;
      let promiseTong: List, interval: any, timeout: any;
  
      promiseTong = [];
  
      for (let i = 0; i < workLength; i++) {
        promiseArr[i].then(() => {
          promiseTong.push(true);
        }).catch((err) => {
          reject(err);
        })
      }
  
      interval = setInterval(() => {
        if (promiseTong.length >= workLength) {
          timeout = setTimeout(() => {
            resolve(true);
            clearTimeout(timeout);
          }, 0);
          clearInterval(interval);
        }
      }, 100);
    });
  }

  public static stringToLink = (string: string): string => {
    const nameToToken = (name: string): string => { return `_____${name}_____` } 
    const tokens = {
      equal: nameToToken("equal"),
      amp: nameToToken("amp"),
      question: nameToToken("question"),
      hypen: nameToToken("hypen"),
      slash: nameToToken("slash"),
      colon: nameToToken("colon"),
      back: nameToToken("back"),
      sharp: nameToToken("sharp"),
      plus: nameToToken("plus"),
      percent: nameToToken("percent"),
      dot: nameToToken("dot"),
      wave: nameToToken("wave"),
      hat: nameToToken("hat"),
    }
    let filteredLink: string;
  
    filteredLink = string;
  
    filteredLink = filteredLink.replace(new RegExp(tokens.equal, "gi"), "=");
    filteredLink = filteredLink.replace(new RegExp(tokens.amp, "gi"), "&");
    filteredLink = filteredLink.replace(new RegExp(tokens.question, "gi"), "?");
    filteredLink = filteredLink.replace(new RegExp(tokens.hypen, "gi"), "-");
    filteredLink = filteredLink.replace(new RegExp(tokens.slash, "gi"), "/");
    filteredLink = filteredLink.replace(new RegExp(tokens.colon, "gi"), ":");
    filteredLink = filteredLink.replace(new RegExp(tokens.back, "gi"), "\\");
    filteredLink = filteredLink.replace(new RegExp(tokens.sharp, "gi"), "#");
    filteredLink = filteredLink.replace(new RegExp(tokens.plus, "gi"), "+");
    filteredLink = filteredLink.replace(new RegExp(tokens.percent, "gi"), "%");
    filteredLink = filteredLink.replace(new RegExp(tokens.dot, "gi"), ".");
    filteredLink = filteredLink.replace(new RegExp(tokens.wave, "gi"), "~");
    filteredLink = filteredLink.replace(new RegExp(tokens.hat, "gi"), "^");
  
    return filteredLink;
  }

  public static xyConverting = (original: List): List => {
    if (!Array.isArray(original)) {
      throw new Error("input must be array");
    }
    if (original.length > 0) {
      if (!original.every((arr) => { return Array.isArray(arr); })) {
        throw new Error("input must be matrix");
      }
    }
    let converted: List, tempArr: List;
  
    converted = [];
    if (original.length > 0) {
      for (let i = 0; i < original[0].length; i++) {
        tempArr = [];
        for (let arr of original) {
          tempArr.push(arr[i]);
        }
        converted.push(tempArr);
      }
    }
  
    return converted;
  }

  public static cssCalc = (x: any, mode: string, y: any): string => {
    if (typeof mode !== "string") {
      throw new Error("invalid mode => plus, minus, multiple, divide");
    }
    const thisEa: string = AbstractNode.mediaEa();
    let targetX: any, targetY: any;
    let resultString: string;
    
    if (typeof x === "string") {
      targetX = x;
    } else if (typeof x === "number") {
      targetX = String(x) + thisEa;
    } else {
      throw new Error("invalid input x");
    }
  
    if (typeof y === "string") {
      targetY = y;
    } else if (typeof y === "number") {
      if (mode === "divide" || mode === "/" || mode === "multiple" || mode === "*") {
        targetY = String(y);
      } else {
        targetY = String(y) + thisEa;
      }
    } else {
      throw new Error("invalid input y");
    }
  
    resultString = "calc(";
  
    if (mode === "plus" || mode === "add" || mode === "+" || mode === "addition") {
      resultString += targetX + " + " + targetY + ")";    
    } else if (mode === "minus" || mode === "-") {
      resultString += targetX + " - " + targetY + ")";    
    } else if (mode === "multiple" || mode === "*") {
      resultString += targetX + " * " + targetY + ")";    
    } else if (mode === "divide" || mode === "/") {
      resultString += targetX + " / " + targetY + ")";    
    } else {
      throw new Error("invalid mode");
    }
  
    return resultString;
  }

  public static jsonToString = (json: any): string => {
    if (typeof json !== "string" && typeof json !== "object") {
      throw new Error("invalid input");
    }
    if (json === null) {
      throw new Error("invalid input2");
    }
    if (typeof json === "object") {
      if (json._id !== undefined) {
        delete json._id;
      }
      json = JSON.stringify(json);
    }
    const nameToToken = (name: string) => { return `_____${name}_____` } 
    const tokens = {
      colon: nameToToken("colon"),
      middler: nameToToken("middler"),
      middlel: nameToToken("middlel"),
      bigr: nameToToken("bigr"),
      bigl: nameToToken("bigl"),
      back: nameToToken("back"),
      double: nameToToken("double"),
    }
    let filteredJson: string;
  
    filteredJson = json;
  
    filteredJson = filteredJson.replace(/[\:]/gi, tokens.colon);
    filteredJson = filteredJson.replace(/[\}]/gi, tokens.middler);
    filteredJson = filteredJson.replace(/[\{]/gi, tokens.middlel);
    filteredJson = filteredJson.replace(/[\]]/gi, tokens.bigr);
    filteredJson = filteredJson.replace(/[\[]/gi, tokens.bigl);
    filteredJson = filteredJson.replace(/[\\]/gi, tokens.back);
    filteredJson = filteredJson.replace(/[\"]/gi, tokens.double);
  
    return filteredJson;
  }

  public static stringToJson = (string: string): any => {
    const nameToToken = (name: string) => { return `_____${name}_____` } 
    const tokens = {
      colon: nameToToken("colon"),
      middler: nameToToken("middler"),
      middlel: nameToToken("middlel"),
      bigr: nameToToken("bigr"),
      bigl: nameToToken("bigl"),
      back: nameToToken("back"),
      double: nameToToken("double"),
    }
    let filteredJson: string;
  
    filteredJson = string;
  
    filteredJson = filteredJson.replace(new RegExp(tokens.colon, "gi"), ":");
    filteredJson = filteredJson.replace(new RegExp(tokens.middler, "gi"), "}");
    filteredJson = filteredJson.replace(new RegExp(tokens.middlel, "gi"), "{");
    filteredJson = filteredJson.replace(new RegExp(tokens.bigr, "gi"), "]");
    filteredJson = filteredJson.replace(new RegExp(tokens.bigl, "gi"), "[");
    filteredJson = filteredJson.replace(new RegExp(tokens.back, "gi"), "\\");
    filteredJson = filteredJson.replace(new RegExp(tokens.double, "gi"), "\"");
  
    try {
      JSON.parse(filteredJson);
      return AbstractNode.equalJson(filteredJson);
    } catch {
      return filteredJson;
    }
  }

  public static findByAttribute = (dom: any, attributeName: string | List, attributeValue: string | List) => {
    if (typeof dom !== "string" && typeof dom !== "object") {
      throw new Error("input must be => [ HTMLCollections or className, attribute name, attribute value ]");
    }
    if (typeof attributeName !== "string" && !Array.isArray(attributeName)) {
      throw new Error("input must be => [ HTMLCollections or className, attribute name, attribute value ]");
    }
    if (typeof attributeValue !== "string" && !Array.isArray(attributeValue)) {
      attributeValue = String(attributeValue);
    }
    if (Array.isArray(attributeName)) {
      if (!Array.isArray(attributeValue)) {
        throw new Error("if multiple attribute name, attribute value must be same array");
      }
      if (attributeName.length !== attributeValue.length) {
        throw new Error("if multiple attribute name, attribute value must be same array");
      }
      if (!attributeName.every((s) => { return typeof s === "string"; })) {
        throw new Error("invalid attribute name array");
      }
      if (!attributeValue.every((s) => { return typeof s === "string"; })) {
        attributeValue = attributeValue.map((i) => { return String(i); });
      }
    }
    if (typeof dom === "string") {
      if (!/^\./.test(dom)) {
        throw new Error("input must be => [ HTMLCollections or className, attribute name, attribute value ]");
      } else {
        dom = document.querySelectorAll(dom);
      }
    } else {
      if (dom[Symbol.iterator] === undefined) {
        dom = dom.children;
      }
    }
    let targets: List, resultDom: any;
  
    targets = [ ...dom ];
  
    if (Array.isArray(attributeName)) {
      for (let i = 0; i < attributeName.length; i++) {
        targets = targets.filter((d) => { return d.getAttribute(attributeName[i]) === attributeValue[i]; });
      }
      if (targets.length !== 0) {
        return targets[0];
      } else {
        return null;
      }
    } else {
      resultDom = targets.find((d) => { return d.getAttribute(attributeName) === attributeValue; });
      if (resultDom === undefined) {
        return null;
      } else {
        return resultDom;
      }
    }
  }

  public static appendQuery = (obj: Dictionary) => {
    if (!Object.values(obj).every((str) => { return typeof str === "string" })) {
      throw new Error("invaild object factor, must be string");
    }
    let now: Date;
    let title: string;
    let original: string;
  
    now = new Date();
    title = String(now.valueOf()) + String(Math.round(Math.random() * 10000));
    original = window.location.href;
  
    if (/\?/gi.test(original)) {
      if (/\=/gi.test(original)) {
        if (!/\&$/gi.test(original)) {
          original += '&';
        }
      }
    } else {
      original += '?';
    }
  
    for (let key in obj) {
      original += key;
      original += '=';
      original += String(obj[key]);
      original += '&';
    }
  
    if (/\&$/gi.test(original)) {
      original = original.slice(0, -1);
    }
  
    window.history.replaceState({}, title, original);
  }

  public static removeQuery = (key: string) => {
    const decode = function (str: string) { return decodeURIComponent(str.split("+").join(" ")); };
    let now: Date;
    let title: string;
    let original: string;
    let obj: Dictionary;
    let newUrl: string;
  
    now = new Date();
    title = String(now.valueOf()) + String(Math.round(Math.random() * 10000));
    original = window.location.search;
    newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?";
  
    if (/\?/gi.test(original)) {
  
      obj = {};
      original.replace(/\??(?:([^=]+)=([^&]*)&?)/g, (origin, name, value) => {
        obj[decode(name)] = decode(value);
        return "";
      });
  
      for (let str in obj) {
        if (str !== key) {
          newUrl += str;
          newUrl += '=';
          newUrl += String(obj[str]);
          newUrl += '&';
        }
      }
  
      if (/\&$/gi.test(newUrl)) {
        newUrl = newUrl.slice(0, -1);
      }
  
      window.history.replaceState({}, title, newUrl);
  
    }
  }

  public static hasQuery = (key: string): boolean => {
    let original: string;
    let obj: Dictionary;
    let keys: Array<string>;
  
    original = window.location.search;
  
    if (original === '') {
      return false;
    } else {
  
      original = original.slice(1);
  
      obj = {};
      original.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function (origin, name, value) {
        let decode = function (str: string) { return decodeURIComponent(str.split("+").join(" ")); }
        obj[decode(name)] = decode(value);
        return "";
      });
  
      keys = Object.keys(obj);
  
      return keys.includes(key);
    }
  }
  
  public static setQuery = (obj: Dictionary): boolean => {
    let keyList: string[];
    keyList = Object.keys(obj);
    try {
      for (let k of keyList) {
        if (AbstractNode.hasQuery(k)) {
          AbstractNode.removeQuery(k)
        }
      }
      AbstractNode.appendQuery(obj);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  
  public static confirm = (message: string) => {
    return window.confirm(message);
  }
  
  public static prompt = (message: string, preValue: string = ''): Promise<any> => {
    const { createNode, colorExtended, withOut, setQueue } = AbstractNode;
    const ea: string = "px";
    const promptAsideClassName: string = "promptAsideClassName";
    const mobile: boolean = window.innerWidth <= 900;
    const desktop: boolean = !mobile;
    let whiteTongBase;
    let whiteTong;
    let whiteWidth, whiteHeight;
    let paddingTop, paddingLeft;
    let paddingBottom;
    let size0, size1;
    let marginLeft;
    let bottomVisual;
    let inputBoxHeight;
    let input;
    let inputIndent;
    let inputBottomVisual;
    let greenBarHeight;
    let lineHeight;
    let wordingVisual;
    let finalEvent;
    let inputSize;
    let loadingDom;
    let loadingStyle;
    let loadingTop, loadingLeft, loadingWidth;
  
    whiteWidth = 380;
    whiteHeight = 150;
    paddingTop = 19;
    paddingLeft = 23;
    paddingBottom = 60;
    size0 = 15;
    size1 = 16;
    inputSize = 14;
    marginLeft = 18;
    bottomVisual = 7;
    inputBoxHeight = 30;
    inputIndent = 9;
    inputBottomVisual = 0;
    lineHeight = 1.5;
    loadingTop = 22;
    loadingLeft = 21;
    loadingWidth = 15;
    wordingVisual = AbstractNode.isMac() ? 0 : 1;
  
    greenBarHeight = 0;

    whiteTongBase = createNode({
      mode: "aside",
      mother: document.body,
      class: [ promptAsideClassName ],
      event: {
        contextmenu: (e: any) => { e.stopPropagation(); },
        dblclick: (e: any) => { e.stopPropagation(); },
        drop: (e: any) => { e.stopPropagation(); },
        keyup: (e: any) => { e.stopPropagation(); },
        keydown: (e: any) => { e.stopPropagation(); },
        keypress: (e: any) => { e.stopPropagation(); },
      },
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: String(0) + "vh",
        left: String(1) + "vw",
        width: String(98) + "vw",
        height: "calc(100vh - " + String(greenBarHeight) + ea + ")",
        background: "transparent",
        zIndex: String(900)
      }
    });
  
    whiteTong = createNode({
      mother: whiteTongBase,
      event: {
        click: (e: any) => { e.stopPropagation(); },
      },
      style: {
        display: "block",
        position: "relative",
        width: String(whiteWidth - (paddingLeft * 2)) + ea,
        paddingTop: String(paddingTop) + ea,
        paddingBottom: String(paddingBottom) + ea,
        paddingLeft: String(paddingLeft) + ea,
        paddingRight: String(paddingLeft) + ea,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorExtended.shadow,
        background: colorExtended.white,
        animation: desktop ? "fadeuplite 0.4s ease forwards" : "fadeuplite 0.3s ease forwards",
      }
    });
  
    loadingDom = AbstractNode.returnLoadingIcon();
    loadingStyle = {
      display: "inline-block",
      position: "absolute",
      top: String(loadingTop) + ea,
      left: String(loadingLeft) + ea,
      width: String(loadingWidth) + ea,
      height: String(loadingWidth) + ea,
    };
    for (let i in loadingStyle) {
      Object.defineProperty(loadingDom.style, i, {
        value: loadingStyle[i],
        writable: true,
      })
    }
    whiteTong.appendChild(loadingDom);
  
    createNode({
      mother: whiteTong,
      text: message,
      style: {
        position: "relative",
        marginLeft: String(marginLeft) + ea,
        fontSize: String(size1) + ea,
        fontWeight: String(600),
        color: colorExtended.black,
        lineHeight: String(lineHeight),
        top: String(wordingVisual) + ea,
      }
    });
  
    createNode({
      mother: whiteTong,
      style: {
        position: "absolute",
        bottom: String(paddingTop + bottomVisual) + ea,
        left: String(paddingLeft + marginLeft) + ea,
        width: withOut((paddingLeft * 2) + marginLeft, ea),
        height: String(inputBoxHeight) + ea,
        borderRadius: String(5) + "px",
        background: colorExtended.gray1,
      }
    });
  
    input = createNode({
      mother: whiteTong,
      mode: "input",
      attribute: {
        type: "text",
      },
      style: {
        position: "absolute",
        bottom: String(paddingTop + bottomVisual + inputBottomVisual) + ea,
        left: String(paddingLeft + marginLeft + inputIndent) + ea,
        width: withOut((paddingLeft * 2) + marginLeft + (inputIndent * 2), ea),
        height: String(inputBoxHeight) + ea,
        background: "transparent",
        fontSize: String(inputSize) + ea,
        fontWeight: String(400),
        color: colorExtended.black,
        border: String(0),
        outline: String(0),
      }
    }) as HTMLInputElement;
  
    input.value = (typeof preValue === "string" ? preValue : "");
    input.focus();
  
    return new Promise((resolve, reject) => {
  
      whiteTongBase.addEventListener("click", function (e) {
        e.stopPropagation();
        const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
        for (let z = 0; z < targets.length; z++) {
          try {
            targets[z].remove();
          } catch {}
        }
        resolve(null);
      });
  
      input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          const finalValue = this.value.trim();
          const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
          for (let z = 0; z < targets.length; z++) {
            try {
              targets[z].remove();
            } catch {}
          }
          resolve(finalValue);
        }
      });
  
      if (mobile) {
        input.addEventListener("blur", function (e) {
          if (document.querySelector('.' + promptAsideClassName) !== null) {
            const finalValue = this.value.trim();
            const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
            for (let z = 0; z < targets.length; z++) {
              try {
                targets[z].remove();
              } catch {}
            }
            resolve(finalValue === '' ? null : finalValue);
          }
        });
      } else {
        input.addEventListener("keydown", function (e) {
          if (e.key === "Tab") {
            e.preventDefault();
            const finalValue = this.value.trim();
            const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
            for (let z = 0; z < targets.length; z++) {
              try {
                targets[z].remove();
              } catch {}
            }
            resolve(finalValue);
          }
        });
      }
  
    });
  }
  
  public static alert = (message: string, blackMode: boolean = false, skipMode: boolean = false) => {
    const { createNode, colorExtended, withOut, setQueue, removeByClass, createDom } = AbstractNode;
    const ea = "px";
    const px = "px";
    const promptAsideClassName = "promptAsideClassName";
    const generalJsAlertSkipModeTimeOutStactName = "generalJsAlertSkipModeTimeOutStactName";
    const delta = 1600;
    const mobile = window.innerWidth <= 900;
    const desktop = !mobile;
    let whiteTongBase: HTMLElement;
    let whiteTong: HTMLElement;
    let whiteWidth: number, whiteHeight: number;
    let paddingTop: number, paddingLeft: number;
    let paddingBottom;
    let size0, size1;
    let marginLeft;
    let bottomVisual;
    let inputBoxHeight;
    let input;
    let inputIndent;
    let inputBottomVisual;
    let greenBarHeight;
    let lineHeight;
    let wordingVisual;
    let finalEvent;
    let inputSize;
    let thisBox;
    let maxHeight;
    let maxWidthVw;
  
    whiteWidth = 320;
    whiteHeight = 150;
    paddingTop = desktop ? 11 : 9;
    paddingLeft = desktop ? 23 : 17;
    paddingBottom = desktop ? 13 : 10;
    size0 = desktop ? 14 : 12;
    size1 = desktop ? 15 : 13;
    inputSize = 13;
    marginLeft = 18;
    bottomVisual = 7;
    inputBoxHeight = 30;
    inputIndent = 9;
    inputBottomVisual = 0;
    lineHeight = 1.5;
    wordingVisual = AbstractNode.isMac() ? 0 : 2;
    maxHeight = 50;
    maxWidthVw = 90;
  
    greenBarHeight = 0;

    if (!skipMode) {
      whiteTongBase = createDom({
        mode: "aside",
        mother: document.body,
        class: [ promptAsideClassName ],
        event: {
          contextmenu: (e: any) => { e.stopPropagation(); },
          dblclick: (e: any) => { e.stopPropagation(); },
          drop: (e: any) => { e.stopPropagation(); },
          keyup: (e: any) => { e.stopPropagation(); },
          keydown: (e: any) => { e.stopPropagation(); },
          keypress: (e: any) => { e.stopPropagation(); },
        },
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: String(0) + "vh",
          left: String(1) + "vw",
          width: String(98) + "vw",
          height: "calc(100vh - " + String(greenBarHeight) + ea + ")",
          background: "transparent",
          zIndex: String(900)
        }
      });
    
      whiteTong = createDom({
        mother: whiteTongBase,
        style: {
          display: "flex",
          position: "relative",
          paddingTop: String(paddingTop) + ea,
          paddingBottom: String(paddingBottom) + ea,
          paddingLeft: String(paddingLeft) + ea,
          paddingRight: String(paddingLeft) + ea,
          borderRadius: String(5) + "px",
          boxShadow: !blackMode ? "0px 3px 15px -9px " + colorExtended.shadow : "0px 3px 15px -9px " + colorExtended.ultimateBlack,
          background: !blackMode ? colorExtended.white : colorExtended.darkDarkBlack,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          animation: desktop ? "fadeuplite 0.4s ease forwards" : "fadeuplite 0.3s ease forwards",
        }
      });
    
      createNode({
        mother: whiteTong,
        text: message,
        style: {
          position: "relative",
          fontSize: String(size1) + ea,
          fontWeight: String(700),
          color: !blackMode ? colorExtended.black : colorExtended.white,
          lineHeight: String(lineHeight),
          top: String(wordingVisual) + ea,
        }
      });
    
      return new Promise((resolve, reject) => {
    
        whiteTongBase.addEventListener("click", function (e: any) {
          e.stopPropagation();
          const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
          for (let z = 0; z < targets.length; z++) {
            try {
              targets[z].remove();
            } catch {}
          }
          resolve(null);
        });
    
      });
    } else {
    
      if (document.querySelector('.' + promptAsideClassName) === null) {
  
        whiteTong = createDom({
          mode: "aside",
          mother: document.body,
          class: [ promptAsideClassName ],
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: withOut(50, maxHeight / 2, px),
            left: String((100 - maxWidthVw) / 2) + "vw",
            width: String(maxWidthVw) + "vw",
            height: String(maxHeight) + px,
            background: "transparent",
            zIndex: String(900)
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              paddingTop: String(paddingTop) + ea,
              paddingBottom: String(paddingBottom) + ea,
              paddingLeft: String(paddingLeft) + ea,
              paddingRight: String(paddingLeft) + ea,
              borderRadius: String(5) + "px",
              boxShadow: !blackMode ? "0px 3px 15px -9px " + colorExtended.shadow : "0px 3px 15px -9px " + colorExtended.ultimateBlack,
              background: !blackMode ? colorExtended.white : colorExtended.darkDarkBlack,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              opacity: String(0),
              transition: "all 0s ease",
              transform: "translateY(10px)",
              width: String(2000) + px,
            },
            child: {
              text: message,
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(size1) + ea,
                fontWeight: String(700),
                color: !blackMode ? colorExtended.black : colorExtended.white,
                lineHeight: String(lineHeight),
                top: String(wordingVisual) + ea,
              }
            }
          },
        });
        if (whiteTong.firstChild !== null) {
          const firstTarget = whiteTong.firstChild as HTMLElement;
          firstTarget.style.width = "";
          firstTarget.style.animation = "fadeuplite 0.4s ease forwards";
    
          AbstractNode.stacks[generalJsAlertSkipModeTimeOutStactName] = setTimeout(() => {
            firstTarget.style.animation = "fadedownlite 0.4s ease forwards";
            setQueue(() => {
              removeByClass(promptAsideClassName);
            }, 400);
          }, 400 + delta);
        }
  
      } else {
  
        clearTimeout(AbstractNode.stacks[generalJsAlertSkipModeTimeOutStactName]);
        if (document.querySelector('.' + promptAsideClassName) !== null) {
          const donwTarget = document.querySelector('.' + promptAsideClassName) as HTMLElement;
          donwTarget.style.animation = "fadedownlite 0.4s ease forwards";
        }
        setQueue(() => {
          removeByClass(promptAsideClassName);
  
          whiteTong = createDom({
            mode: "aside",
            mother: document.body,
            class: [ promptAsideClassName ],
            style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "fixed",
              top: withOut(50, maxHeight / 2, px),
              left: String((100 - maxWidthVw) / 2) + "vw",
              width: String(maxWidthVw) + "vw",
              height: String(maxHeight) + px,
              background: "transparent",
              zIndex: String(900)
            },
            child: {
              style: {
                display: "flex",
                position: "relative",
                paddingTop: String(paddingTop) + ea,
                paddingBottom: String(paddingBottom) + ea,
                paddingLeft: String(paddingLeft) + ea,
                paddingRight: String(paddingLeft) + ea,
                borderRadius: String(5) + "px",
                boxShadow: !blackMode ? "0px 3px 15px -9px " + colorExtended.shadow : "0px 3px 15px -9px " + colorExtended.ultimateBlack,
                background: !blackMode ? colorExtended.white : colorExtended.darkDarkBlack,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                opacity: String(0),
                transition: "all 0s ease",
                transform: "translateY(10px)",
                width: String(2000) + px,
              },
              child: {
                text: message,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(size1) + ea,
                  fontWeight: String(700),
                  color: !blackMode ? colorExtended.black : colorExtended.white,
                  lineHeight: String(lineHeight),
                  top: String(wordingVisual) + ea,
                }
              }
            },
          });

          if (whiteTong.firstChild !== null) {
            const firstTarget = whiteTong.firstChild as HTMLElement;
            firstTarget.style.width = "";
            firstTarget.style.animation = "fadeuplite 0.4s ease forwards";
      
            AbstractNode.stacks[generalJsAlertSkipModeTimeOutStactName] = setTimeout(() => {
              firstTarget.style.animation = "fadedownlite 0.4s ease forwards";
              setQueue(() => {
                removeByClass(promptAsideClassName);
              }, 400);
            }, 400 + delta);
          }
  
        }, 400);
  
      }
  
    }
  
  }
  
  public static promptLong = (message: string, preValue: string = ''): Promise<any> => {
    const { createNode, colorExtended, withOut, setQueue } = AbstractNode;
    const ea = "px";
    const promptAsideClassName = "promptAsideClassName";
    const mobile = window.innerWidth <= 900;
    const desktop = !mobile;
    let whiteTongBase: HTMLElement | SVGElement;
    let whiteTong: HTMLElement | SVGElement;
    let whiteWidth, whiteHeight;
    let paddingTop, paddingLeft;
    let paddingBottom;
    let size0, size1;
    let marginLeft;
    let bottomVisual;
    let inputBoxHeight;
    let input;
    let inputIndent;
    let inputBottomVisual;
    let greenBarHeight;
    let lineHeight;
    let wordingVisual;
    let finalEvent;
    let inputSize;
    let textareaVisual;
    let buttonBetween;
    let buttonTop;
    let buttonRight;
    let buttonHeight;
    let buttonPadding;
    let buttonWidth;
    let size2;
    let textTop;
    let toTextButton;
  
    whiteWidth = 380;
    whiteHeight = 150;
    paddingTop = 17;
    paddingLeft = 23;
    paddingBottom = 152;
    size0 = 14;
    size1 = 15;
    inputSize = 13;
    marginLeft = 18;
    bottomVisual = 7;
    inputBoxHeight = 120;
    inputIndent = 9;
    inputBottomVisual = 0;
    lineHeight = 1.5;
    wordingVisual = AbstractNode.isMac() ? 0 : 2;
    textareaVisual = 5;
    buttonBetween = 4;
    buttonTop = 20;
    buttonRight = 23;
    buttonHeight = 19;
    buttonPadding = 7;
    buttonWidth = 49;
    size2 = desktop ? 9 : 9;
    textTop = AbstractNode.isMac() ? -1 : 1;
  
    greenBarHeight = 0;

    whiteTongBase = createNode({
      mode: "aside",
      mother: document.body,
      class: [ promptAsideClassName ],
      event: {
        contextmenu: (e: any) => { e.stopPropagation(); },
        dblclick: (e: any) => { e.stopPropagation(); },
        drop: (e: any) => { e.stopPropagation(); },
        keyup: (e: any) => { e.stopPropagation(); },
        keydown: (e: any) => { e.stopPropagation(); },
        keypress: (e: any) => { e.stopPropagation(); },
      },
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: String(0) + "vh",
        left: String(1) + "vw",
        width: String(98) + "vw",
        height: "calc(100vh - " + String(greenBarHeight) + ea + ")",
        background: "transparent",
        zIndex: String(900)
      }
    });
  
    whiteTong = createNode({
      mother: whiteTongBase,
      event: {
        click: (e: any) => { e.stopPropagation(); },
      },
      style: {
        display: "block",
        position: "relative",
        width: String(whiteWidth - (paddingLeft * 2)) + ea,
        paddingTop: String(paddingTop) + ea,
        paddingBottom: String(paddingBottom) + ea,
        paddingLeft: String(paddingLeft) + ea,
        paddingRight: String(paddingLeft) + ea,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorExtended.shadow,
        background: colorExtended.white,
        animation: desktop ? "fadeuplite 0.4s ease forwards" : "fadeuplite 0.3s ease forwards",
      }
    });
  
    createNode({
      mother: whiteTong,
      text: "Q",
      style: {
        fontSize: String(size0) + ea,
        fontWeight: String(400),
        color: colorExtended.blue,
        fontFamily: "graphik",
        position: "absolute",
        top: String(paddingTop) + ea,
        left: String(paddingLeft) + ea,
        lineHeight: String(lineHeight),
      }
    });
  
    createNode({
      mother: whiteTong,
      text: message,
      style: {
        position: "relative",
        marginLeft: String(marginLeft) + ea,
        fontSize: String(size1) + ea,
        fontWeight: String(700),
        color: colorExtended.black,
        lineHeight: String(lineHeight),
        top: String(wordingVisual) + ea,
      }
    });
  
    toTextButton = createNode({
      mother: whiteTong,
      style: {
        display: "inline-flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: String(buttonTop) + ea,
        right: String(buttonRight) + ea,
        height: String(buttonHeight) + ea,
        paddingLeft: String(buttonPadding) + ea,
        paddingRight: String(buttonPadding) + ea,
        background: colorExtended.gradientGreen,
        borderRadius: String(5) + "px",
        zIndex: String(1),
      },
      child: {
        text: "확인",
        style: {
          position: "relative",
          fontSize: String(size2) + ea,
          fontWeight: String(700),
          color: colorExtended.white,
          top: String(textTop) + ea,
        }
      }
    });
  
    createNode({
      mother: whiteTong,
      style: {
        position: "absolute",
        bottom: String(paddingTop + bottomVisual) + ea,
        left: String(paddingLeft + marginLeft) + ea,
        width: withOut((paddingLeft * 2) + marginLeft, ea),
        height: String(inputBoxHeight) + ea,
        borderRadius: String(5) + "px",
        background: colorExtended.gray1,
      }
    });
  
    input = createNode({
      mother: whiteTong,
      mode: "textarea",
      attribute: {
        type: "text",
      },
      style: {
        position: "absolute",
        bottom: String(paddingTop + bottomVisual + inputBottomVisual) + ea,
        left: String(paddingLeft + marginLeft + inputIndent) + ea,
        width: withOut((paddingLeft * 2) + marginLeft + (inputIndent * 2), ea),
        height: String(inputBoxHeight - textareaVisual) + ea,
        background: "transparent",
        fontSize: String(inputSize) + ea,
        fontWeight: String(400),
        color: colorExtended.black,
        border: String(0),
        outline: String(0),
        lineHeight: String(1.7),
      }
    }) as HTMLInputElement;
  
    input.value = (typeof preValue === "string" ? preValue : "");
    input.focus();
  
    return new Promise((resolve, reject) => {
  
      whiteTongBase.addEventListener("click", function (e) {
        e.stopPropagation();
        const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
        for (let z = 0; z < targets.length; z++) {
          try {
            targets[z].remove();
          } catch {}
        }
        resolve(input.value.trim());
      });
  
      toTextButton.addEventListener("click", function (e) {
        const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
        for (let z = 0; z < targets.length; z++) {
          try {
            targets[z].remove();
          } catch {}
        }
        resolve(input.value.trim());
      });
  
      input.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
          e.preventDefault();
          const finalValue = this.value.trim();
          const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
          for (let z = 0; z < targets.length; z++) {
            try {
              targets[z].remove();
            } catch {}
          }
          resolve(finalValue);
        }
      });
  
      if (mobile) {
        input.addEventListener("blur", function (e) {
          if (document.querySelector('.' + promptAsideClassName) !== null) {
            const finalValue = this.value.trim();
            const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
            for (let z = 0; z < targets.length; z++) {
              try {
                targets[z].remove();
              } catch {}
            }
            resolve(finalValue === '' ? null : finalValue);
          }
        });
      }
  
    });
  }
  
  public static promptWithButton = (message: string, progressName: string = "NULL", preValue: string = ''): Promise<any> => {
    const { createNode, colorExtended, withOut, setQueue } = AbstractNode;
    const ea = "px";
    const promptAsideClassName = "promptAsideClassName";
    const mobile = window.innerWidth <= 900;
    const desktop = !mobile;
    let whiteTongBase: HTMLElement | SVGElement;
    let whiteTong: HTMLElement | SVGElement;
    let whiteWidth, whiteHeight;
    let paddingTop, paddingLeft;
    let paddingBottom;
    let size0, size1;
    let marginLeft;
    let bottomVisual;
    let inputBoxHeight;
    let input;
    let inputIndent;
    let inputBottomVisual;
    let greenBarHeight;
    let lineHeight;
    let wordingVisual;
    let finalEvent;
    let inputSize;
    let toTextButton: HTMLElement | SVGElement;
    let buttonBetween;
    let buttonTop;
    let buttonRight;
    let buttonHeight;
    let buttonPadding;
    let buttonWidth;
    let size2;
    let textTop;
    let processButtonBoo;
    
    whiteWidth = 380;
    whiteHeight = 150;
    paddingTop = 17;
    paddingLeft = 23;
    paddingBottom = 62;
    size0 = 14;
    size1 = 15;
    inputSize = 13;
    marginLeft = 18;
    bottomVisual = 7;
    inputBoxHeight = 30;
    inputIndent = 9;
    inputBottomVisual = 0;
    lineHeight = 1.5;
    wordingVisual = AbstractNode.isMac() ? 0 : 2;
    buttonBetween = 4;
    buttonTop = 20;
    buttonRight = 23;
    buttonHeight = 19;
    buttonPadding = 7;
    buttonWidth = 49;
    size2 = desktop ? 9 : 9;
    textTop = AbstractNode.isMac() ? -1 : 1;
    processButtonBoo = (typeof progressName === "string" && !/null/gi.test(progressName));
  
    greenBarHeight = 0;

    whiteTongBase = createNode({
      mode: "aside",
      mother: document.body,
      class: [ promptAsideClassName ],
      event: {
        contextmenu: (e: any) => { e.stopPropagation(); },
        dblclick: (e: any) => { e.stopPropagation(); },
        drop: (e: any) => { e.stopPropagation(); },
        keyup: (e: any) => { e.stopPropagation(); },
        keydown: (e: any) => { e.stopPropagation(); },
        keypress: (e: any) => { e.stopPropagation(); },
      },
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: String(0) + "vh",
        left: String(1) + "vw",
        width: String(98) + "vw",
        height: "calc(100vh - " + String(greenBarHeight) + ea + ")",
        background: "transparent",
        zIndex: String(900)
      }
    });
  
    whiteTong = createNode({
      mother: whiteTongBase,
      event: {
        click: (e: any) => { e.stopPropagation(); },
      },
      style: {
        display: "block",
        position: "relative",
        width: String(whiteWidth - (paddingLeft * 2)) + ea,
        paddingTop: String(paddingTop) + ea,
        paddingBottom: String(paddingBottom) + ea,
        paddingLeft: String(paddingLeft) + ea,
        paddingRight: String(paddingLeft) + ea,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorExtended.shadow,
        background: colorExtended.white,
        animation: desktop ? "fadeuplite 0.4s ease forwards" : "fadeuplite 0.3s ease forwards",
      }
    });
  
    createNode({
      mother: whiteTong,
      text: "Q",
      style: {
        fontSize: String(size0) + ea,
        fontWeight: String(400),
        color: colorExtended.blue,
        fontFamily: "graphik",
        position: "absolute",
        top: String(paddingTop) + ea,
        left: String(paddingLeft) + ea,
        lineHeight: String(lineHeight),
      }
    });
  
    createNode({
      mother: whiteTong,
      text: message,
      style: {
        position: "relative",
        marginLeft: String(marginLeft) + ea,
        fontSize: String(size1) + ea,
        fontWeight: String(700),
        color: colorExtended.black,
        lineHeight: String(lineHeight),
        top: String(wordingVisual) + ea,
      }
    });
  
    if (processButtonBoo) {
      toTextButton = createNode({
        mother: whiteTong,
        style: {
          display: "inline-flex",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: String(buttonTop) + ea,
          right: String(buttonRight) + ea,
          height: String(buttonHeight) + ea,
          paddingLeft: String(buttonPadding) + ea,
          paddingRight: String(buttonPadding) + ea,
          background: colorExtended.gradientGreen,
          borderRadius: String(5) + "px",
          zIndex: String(1),
        },
        child: {
          text: progressName,
          style: {
            position: "relative",
            fontSize: String(size2) + ea,
            fontWeight: String(700),
            color: colorExtended.white,
            top: String(textTop) + ea,
          }
        }
      });
    }
  
    createNode({
      mother: whiteTong,
      style: {
        position: "absolute",
        bottom: String(paddingTop + bottomVisual) + ea,
        left: String(paddingLeft + marginLeft) + ea,
        width: withOut((paddingLeft * 2) + marginLeft, ea),
        height: String(inputBoxHeight) + ea,
        borderRadius: String(5) + "px",
        background: colorExtended.gray1,
      }
    });
  
    input = createNode({
      mother: whiteTong,
      mode: "input",
      attribute: {
        type: "text",
      },
      style: {
        position: "absolute",
        bottom: String(paddingTop + bottomVisual + inputBottomVisual) + ea,
        left: String(paddingLeft + marginLeft + inputIndent) + ea,
        width: withOut((paddingLeft * 2) + marginLeft + (inputIndent * 2), ea),
        height: String(inputBoxHeight) + ea,
        background: "transparent",
        fontSize: String(inputSize) + ea,
        fontWeight: String(400),
        color: colorExtended.black,
        border: String(0),
        outline: String(0),
      }
    }) as HTMLInputElement;
  
    input.value = (typeof preValue === "string" ? preValue : "");
    input.focus();
  
    return new Promise((resolve, reject) => {
  
      whiteTongBase.addEventListener("click", function (e) {
        e.stopPropagation();
        const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
        for (let z = 0; z < targets.length; z++) {
          try {
            targets[z].remove();
          } catch {}
        }
        resolve(null);
      });
  
      input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          const finalValue = this.value.trim();
          const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
          for (let z = 0; z < targets.length; z++) {
            try {
              targets[z].remove();
            } catch {}
          }
          resolve(finalValue);
        }
      });
  
      if (processButtonBoo) {
  
        toTextButton.addEventListener("click", function (e) {
          const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
          for (let z = 0; z < targets.length; z++) {
            try {
              targets[z].remove();
            } catch {}
          }
          resolve(progressName);
        });
  
        if (mobile) {
          input.addEventListener("blur", function (e) {
            setTimeout(() => {
              if (document.querySelector('.' + promptAsideClassName) !== null) {
                const finalValue = this.value.trim();
                const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
                for (let z = 0; z < targets.length; z++) {
                  try {
                    targets[z].remove();
                  } catch {}
                }
                resolve(finalValue === '' ? null : finalValue);
              }
            }, 500);
          });
        }
  
      } else {
        if (mobile) {
          input.addEventListener("blur", function (e) {
            if (document.querySelector('.' + promptAsideClassName) !== null) {
              const finalValue = this.value.trim();
              const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
              for (let z = 0; z < targets.length; z++) {
                try {
                  targets[z].remove();
                } catch {}
              }
              resolve(finalValue === '' ? null : finalValue);
            }
          });
        }
      }
  
    });
  }
  
  public static promptButtons = (message: string, buttons: Array<string>, customColor: any = null): Promise<any> => {
    const { createNode, colorExtended, withOut, setQueue } = AbstractNode;
    const ea = "px";
    const promptAsideClassName = "promptAsideClassName";
    const mobile = window.innerWidth <= 900;
    const desktop = !mobile;
    let whiteTongBase;
    let whiteTong;
    let whiteWidth, whiteHeight;
    let paddingTop, paddingLeft;
    let paddingBottom;
    let size0, size1;
    let marginLeft;
    let bottomVisual;
    let inputBoxHeight;
    let input;
    let inputIndent;
    let inputBottomVisual;
    let greenBarHeight;
    let lineHeight;
    let wordingVisual;
    let finalEvent;
    let inputSize;
    let buttonsBaseTong;
    let buttonBetween;
    let num;
    let buttonSize;
    let textTop;
    let buttonsChildren;
    let buttonsBaseTongMarginTop;
    let buttonPaddingLeft;
    let loadingDom;
    let loadingStyle;
    let loadingTop, loadingLeft, loadingWidth;
  
    whiteWidth = 380;
    whiteHeight = 150;
    paddingTop = 19;
    paddingLeft = 23;
    paddingBottom = 60;
    size0 = 15;
    size1 = 16;
    inputSize = 14;
    buttonSize = 15;
    marginLeft = 18;
    bottomVisual = 7;
    inputBoxHeight = 32;
    inputIndent = 9;
    inputBottomVisual = 0;
    lineHeight = 1.5;
    wordingVisual = AbstractNode.isMac() ? 0 : 1;
    textTop = AbstractNode.isMac() ? 0 : 1;
    buttonBetween = 4;
    buttonsBaseTongMarginTop = 10;
    buttonPaddingLeft = 12;
    loadingTop = 22;
    loadingLeft = 21;
    loadingWidth = 15;
  
    greenBarHeight = 0;
  
    whiteTongBase = createNode({
      mode: "aside",
      mother: document.body,
      class: [ promptAsideClassName ],
      event: {
        contextmenu: (e: any) => { e.stopPropagation(); },
        dblclick: (e: any) => { e.stopPropagation(); },
        drop: (e: any) => { e.stopPropagation(); },
        keyup: (e: any) => { e.stopPropagation(); },
        keydown: (e: any) => { e.stopPropagation(); },
        keypress: (e: any) => { e.stopPropagation(); },
      },
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: String(0) + "vh",
        left: String(1) + "vw",
        width: String(98) + "vw",
        height: "calc(100vh - " + String(greenBarHeight) + ea + ")",
        background: "transparent",
        zIndex: String(900)
      }
    });
  
    whiteTong = createNode({
      mother: whiteTongBase,
      event: {
        click: (e: any) => { e.stopPropagation(); },
      },
      style: {
        display: "block",
        position: "relative",
        width: String(whiteWidth - (paddingLeft * 2)) + ea,
        paddingTop: String(paddingTop) + ea,
        paddingBottom: String(buttons.length <= 3 ? paddingBottom : (paddingLeft - buttonBetween)) + ea,
        paddingLeft: String(paddingLeft) + ea,
        paddingRight: String(paddingLeft) + ea,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorExtended.shadow,
        background: colorExtended.white,
        animation: desktop ? "fadeuplite 0.4s ease forwards" : "fadeuplite 0.3s ease forwards",
      }
    });
  
    loadingDom = AbstractNode.returnLoadingIcon();
    loadingStyle = {
      display: "inline-block",
      position: "absolute",
      top: String(loadingTop) + ea,
      left: String(loadingLeft) + ea,
      width: String(loadingWidth) + ea,
      height: String(loadingWidth) + ea,
    };
    for (let i in loadingStyle) {
      Object.defineProperty(loadingDom.style, i, {
        value: loadingStyle[i],
        writable: true,
      })
    }
    whiteTong.appendChild(loadingDom);
  
    createNode({
      mother: whiteTong,
      text: message,
      style: {
        position: "relative",
        marginLeft: String(marginLeft) + ea,
        fontSize: String(size1) + ea,
        fontWeight: String(700),
        color: colorExtended.black,
        lineHeight: String(lineHeight),
        top: String(wordingVisual) + ea,
      }
    });
  
    if (buttons.length <= 3) {
  
      buttonsBaseTong = createNode({
        mother: whiteTong,
        style: {
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          bottom: String(paddingTop + bottomVisual) + ea,
          left: String(paddingLeft + marginLeft) + ea,
          width: withOut((paddingLeft * 2) + marginLeft, ea),
          height: String(inputBoxHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorExtended.white,
          justifyContent: "start",
          alignItems: "start",
        }
      });
  
      num = 0;
      for (let text of buttons) {
        createNode({
          mother: buttonsBaseTong,
          attribute: { value: text },
          style: {
            display: "inline-flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            width: "calc(calc(100% - " + String(buttonBetween * (buttons.length - 1)) + ea + ") / " + String(buttons.length) + ")",
            height: String(inputBoxHeight) + ea,
            marginRight: num === buttons.length - 1 ? "" : String(buttonBetween) + ea,
            background: customColor === null ? AbstractNode.colorExtended.blueDark : customColor,
            borderRadius: String(5) + "px",
          },
          child: {
            text,
            style: {
              fontSize: String(buttonSize) + ea,
              fontWeight: String(600),
              color: colorExtended.white,
              position: "relative",
              top: String(textTop) + ea,
            }
          }
        });
        num++;
      }
  
    } else {
  
      buttonsBaseTong = createNode({
        mother: whiteTong,
        style: {
          display: "block",
          position: "relative",
          marginTop: String(buttonsBaseTongMarginTop) + ea,
          width: withOut(0, ea),
          height: "auto",
          borderRadius: String(5) + "px",
          background: colorExtended.white,
        }
      });
  
      num = 0;
      for (let text of buttons) {
        createNode({
          mother: buttonsBaseTong,
          attribute: { value: text },
          style: {
            display: "inline-flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            height: String(inputBoxHeight) + ea,
            marginRight: String(buttonBetween) + ea,
            marginBottom: String(buttonBetween) + ea,
            background: customColor === null ? AbstractNode.colorExtended.blueDark : customColor,
            borderRadius: String(5) + "px",
            paddingLeft: String(buttonPaddingLeft) + ea,
            paddingRight: String(buttonPaddingLeft) + ea,
          },
          child: {
            text,
            style: {
              fontSize: String(buttonSize) + ea,
              fontWeight: String(700),
              color: colorExtended.white,
              position: "relative",
              top: String(textTop) + ea,
            }
          }
        });
        num++;
      }
  
    }
  
    return new Promise((resolve, reject) => {
  
      whiteTongBase.addEventListener("click", (e: any) => {
        e.stopPropagation();
        const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
        for (let z = 0; z < targets.length; z++) {
          try {
            targets[z].remove();
          } catch {}
        }
        resolve(null);
      });
  
      buttonsChildren = [ ...buttonsBaseTong.children ];
      for (let dom of buttonsChildren) {
        dom.addEventListener("click", (e: any) => {
          e.stopPropagation();
          const thisValue = e.target.getAttribute("value").trim();
          const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
          for (let z = 0; z < targets.length; z++) {
            try {
              targets[z].remove();
            } catch {}
          }
          resolve(thisValue);
        });
      }
  
    });
  }
  
  public static querySetting = (obj: Dictionary) => {
    return AbstractNode.setQuery(obj);
  }

  public static promptLongButtons = (message: string, buttons: Array<string>): Promise<any> => {
    const { createNode, colorExtended, withOut, setQueue } = AbstractNode;
    const ea = "px";
    const promptAsideClassName = "promptAsideClassName";
    const mobile = window.innerWidth <= 900;
    const desktop = !mobile;
    let whiteTongBase;
    let whiteTong;
    let whiteWidth, whiteHeight;
    let paddingTop, paddingLeft;
    let paddingBottom;
    let size0, size1;
    let marginLeft;
    let bottomVisual;
    let inputBoxHeight;
    let input;
    let inputIndent;
    let inputBottomVisual;
    let greenBarHeight;
    let lineHeight;
    let wordingVisual;
    let finalEvent;
    let inputSize;
    let buttonsBaseTong;
    let buttonBetween;
    let num;
    let buttonSize;
    let textTop;
    let buttonsChildren;
    let buttonsBaseTongMarginTop;
    let buttonPaddingLeft;
    let loadingDom;
    let loadingStyle;
    let loadingTop, loadingLeft, loadingWidth;
  
    whiteWidth = 380;
    whiteHeight = 150;
    paddingTop = 19;
    paddingLeft = 23;
    paddingBottom = 60;
    size0 = 15;
    size1 = 16;
    inputSize = 14;
    buttonSize = 15;
    marginLeft = 18;
    bottomVisual = 7;
    inputBoxHeight = 32;
    inputIndent = 9;
    inputBottomVisual = 0;
    lineHeight = 1.5;
    wordingVisual = AbstractNode.isMac() ? 0 : 1;
    textTop = AbstractNode.isMac() ? 0 : 1;
    buttonBetween = 4;
    buttonsBaseTongMarginTop = 10;
    buttonPaddingLeft = 12;
    loadingTop = 22;
    loadingLeft = 21;
    loadingWidth = 15;
  
    greenBarHeight = 0;

    whiteTongBase = createNode({
      mode: "aside",
      mother: document.body,
      class: [ promptAsideClassName ],
      event: {
        contextmenu: (e: any) => { e.stopPropagation(); },
        dblclick: (e: any) => { e.stopPropagation(); },
        drop: (e: any) => { e.stopPropagation(); },
        keyup: (e: any) => { e.stopPropagation(); },
        keydown: (e: any) => { e.stopPropagation(); },
        keypress: (e: any) => { e.stopPropagation(); },
      },
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: String(0) + "vh",
        left: String(1) + "vw",
        width: String(98) + "vw",
        height: "calc(100vh - " + String(greenBarHeight) + ea + ")",
        background: "transparent",
        zIndex: String(900)
      }
    });
  
    whiteTong = createNode({
      mother: whiteTongBase,
      event: {
        click: (e: any) => { e.stopPropagation(); },
      },
      style: {
        display: "block",
        position: "relative",
        width: String(whiteWidth - (paddingLeft * 2)) + ea,
        paddingTop: String(paddingTop) + ea,
        paddingBottom: String(paddingLeft - buttonBetween) + ea,
        paddingLeft: String(paddingLeft) + ea,
        paddingRight: String(paddingLeft) + ea,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorExtended.shadow,
        background: colorExtended.white,
        animation: desktop ? "fadeuplite 0.4s ease forwards" : "fadeuplite 0.3s ease forwards",
      }
    });
  
    loadingDom = AbstractNode.returnLoadingIcon();
    loadingStyle = {
      display: "inline-block",
      position: "absolute",
      top: String(loadingTop) + ea,
      left: String(loadingLeft) + ea,
      width: String(loadingWidth) + ea,
      height: String(loadingWidth) + ea,
    };
    for (let i in loadingStyle) {
      Object.defineProperty(loadingDom.style, i, {
        value: loadingStyle[i],
        writable: true
      });
    }
    whiteTong.appendChild(loadingDom);
  
    createNode({
      mother: whiteTong,
      text: message,
      style: {
        position: "relative",
        marginLeft: String(marginLeft) + ea,
        fontSize: String(size1) + ea,
        fontWeight: String(700),
        color: colorExtended.black,
        lineHeight: String(lineHeight),
        top: String(wordingVisual) + ea,
      }
    });
  
    buttonsBaseTong = createNode({
      mother: whiteTong,
      style: {
        display: "block",
        position: "relative",
        marginTop: String(buttonsBaseTongMarginTop) + ea,
        width: withOut(0, ea),
        height: "auto",
        borderRadius: String(5) + "px",
        background: colorExtended.white,
      }
    });
  
    num = 0;
    for (let text of buttons) {
      createNode({
        mother: buttonsBaseTong,
        attribute: { value: text },
        style: {
          display: "inline-flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          height: String(inputBoxHeight) + ea,
          width: withOut(buttonPaddingLeft * 2, ea),
          marginBottom: String(buttonBetween) + ea,
          background: AbstractNode.colorExtended.blueDark,
          borderRadius: String(5) + "px",
          paddingLeft: String(buttonPaddingLeft) + ea,
          paddingRight: String(buttonPaddingLeft) + ea,
        },
        child: {
          text,
          style: {
            fontSize: String(buttonSize) + ea,
            fontWeight: String(700),
            color: colorExtended.white,
            position: "relative",
            top: String(textTop) + ea,
          }
        }
      });
      num++;
    }
  
    return new Promise((resolve, reject) => {
  
      whiteTongBase.addEventListener("click", function (e) {
        e.stopPropagation();
        const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
        for (let z = 0; z < targets.length; z++) {
          try {
            targets[z].remove();
          } catch {}
        }
        resolve(null);
      });
  
      buttonsChildren = [ ...buttonsBaseTong.children ];
      for (let dom of buttonsChildren) {
        dom.addEventListener("click", (e: any) => {
          e.stopPropagation();
          const thisValue = e.target.getAttribute("value").trim();
          const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
          for (let z = 0; z < targets.length; z++) {
            try {
              targets[z].remove();
            } catch {}
          }
          resolve(thisValue);
        });
      }
  
    });
  }
  
  public static promptFile = (message: string): Promise<any> => {
    const { createNode, colorExtended, withOut, setQueue } = AbstractNode;
    const ea: string = "px";
    const promptAsideClassName: string = "promptAsideClassName";
    const tempHiddenFileInputClassName: string = "tempHiddenFileInputClassName" + String(Math.round(Math.random() * 10000)) + String((new Date()).valueOf());
    const mobile: boolean = window.innerWidth <= 900;
    const desktop: boolean = !mobile;
    let whiteTongBase: HTMLElement | SVGElement;
    let whiteTong: HTMLElement | SVGElement;
    let whiteWidth: number, whiteHeight: number;
    let paddingTop: number, paddingLeft: number;
    let paddingBottom: number;
    let size0: number, size1: number;
    let marginLeft;
    let bottomVisual;
    let inputBoxHeight;
    let input;
    let inputIndent;
    let inputBottomVisual;
    let greenBarHeight;
    let lineHeight;
    let wordingVisual;
    let finalEvent;
    let inputSize;
    let buttonsBaseTong;
    let buttonBetween;
    let num;
    let buttonSize;
    let textTop;
    let buttonsChildren;
    let buttonsBaseTongMarginTop;
    let buttonPaddingLeft;
    let grayBoxMarginTop;
    let extractArrowWidth, extractArrowMargin;
    let fileHiddenInput;
  
    whiteWidth = 380;
    whiteHeight = 150;
    paddingTop = 17;
    paddingLeft = 23;
    paddingBottom = 62;
    size0 = 14;
    size1 = 15;
    inputSize = 13;
    buttonSize = 12;
    marginLeft = 18;
    bottomVisual = 7;
    inputBoxHeight = 100;
    inputIndent = 9;
    inputBottomVisual = 0;
    lineHeight = 1.5;
    wordingVisual = AbstractNode.isMac() ? 0 : 2;
    textTop = AbstractNode.isMac() ? -1 : 1;
    buttonBetween = 4;
    buttonsBaseTongMarginTop = 10;
    buttonPaddingLeft = 10;
    grayBoxMarginTop = 10;
    extractArrowWidth = 14;
    extractArrowMargin = 4;
  
    greenBarHeight = 0;
  
    whiteTongBase = createNode({
      mode: "aside",
      mother: document.body,
      class: [ promptAsideClassName ],
      event: {
        contextmenu: (e: any) => { e.stopPropagation(); },
        dblclick: (e: any) => { e.stopPropagation(); },
        drop: (e: any) => { e.stopPropagation(); },
        keyup: (e: any) => { e.stopPropagation(); },
        keydown: (e: any) => { e.stopPropagation(); },
        keypress: (e: any) => { e.stopPropagation(); },
      },
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: String(0) + "vh",
        left: String(1) + "vw",
        width: String(98) + "vw",
        height: "calc(100vh - " + String(greenBarHeight) + ea + ")",
        background: "transparent",
        zIndex: String(900)
      }
    });
  
    whiteTong = createNode({
      mother: whiteTongBase,
      event: {
        click: (e: any) => { e.stopPropagation(); },
      },
      style: {
        display: "block",
        position: "relative",
        width: String(whiteWidth - (paddingLeft * 2)) + ea,
        paddingTop: String(paddingTop) + ea,
        paddingBottom: String(paddingLeft) + ea,
        paddingLeft: String(paddingLeft) + ea,
        paddingRight: String(paddingLeft) + ea,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorExtended.shadow,
        background: colorExtended.white,
        animation: desktop ? "fadeuplite 0.4s ease forwards" : "fadeuplite 0.3s ease forwards",
      }
    });
  
    fileHiddenInput = createNode({
      mother: whiteTong,
      class: [ tempHiddenFileInputClassName ],
      mode: "input",
      attribute: {
        type: "file",
        name: "tempfile",
      },
      style: {
        display: "none",
      }
    }) as HTMLInputElement;
  
    createNode({
      mother: whiteTong,
      text: "Q",
      style: {
        fontSize: String(size0) + ea,
        fontWeight: String(400),
        color: colorExtended.blue,
        fontFamily: "graphik",
        position: "absolute",
        top: String(paddingTop) + ea,
        left: String(paddingLeft) + ea,
        lineHeight: String(lineHeight),
      }
    });
  
    createNode({
      mother: whiteTong,
      text: message,
      style: {
        position: "relative",
        marginLeft: String(marginLeft) + ea,
        fontSize: String(size1) + ea,
        fontWeight: String(700),
        color: colorExtended.black,
        lineHeight: String(lineHeight),
        top: String(wordingVisual) + ea,
      }
    });
  
    buttonsBaseTong = createNode({
      mother: whiteTong,
      event: {
        click: function (e: any) {
          e.stopPropagation();
          fileHiddenInput.click();
        },
        dragenter: function (e: any) {
          e.preventDefault();
          e.stopPropagation();
          this.style.background = colorExtended.whiteGreen;
        },
        dragover: function (e: any) {
          e.preventDefault();
          e.stopPropagation();
        },
        dragleave: function (e: any) {
          e.preventDefault();
          e.stopPropagation();
          this.style.background = colorExtended.gray1;
        },
      },
      style: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        left: String(0) + ea,
        width: withOut(0, ea),
        height: String(inputBoxHeight) + ea,
        borderRadius: String(5) + "px",
        background: colorExtended.gray1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(grayBoxMarginTop) + ea,
        border: "1px dashed " + colorExtended.gray4,
      },
      child: {
        text: desktop ? "클릭 또는 드래그하여 파일을 업로드..." : "터치하여 파일을 업로드...",
        style: {
          position: "relative",
          fontSize: String(size1) + ea,
          fontWeight: String(400),
          color: colorExtended.deactive,
          top: String(wordingVisual) + ea,
        },
        previous: {
          mode: "svg",
          source: AbstractNode.svgMaker.extractArrow(colorExtended.deactive),
          style: {
            position: "relative",
            width: String(extractArrowWidth) + ea,
            marginBottom: String(extractArrowMargin) + ea,
          }
        }
      }
    });
  
    return new Promise((resolve, reject) => {
  
      whiteTongBase.addEventListener("click", function (e) {
        e.stopPropagation();
        const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
        for (let z = 0; z < targets.length; z++) {
          try {
            targets[z].remove();
          } catch {}
        }
        resolve(null);
      });
  
      fileHiddenInput.addEventListener("change", async function (e) {
        e.stopPropagation();
        let formData: FormData;
        let thisExe: string;
        let targets: List;
        try {
          if (this.files !== null) {
            if (this.files.length === 1) {
              formData = new FormData();
      
              thisExe = this.files[0].name.split(".")[this.files[0].name.split(".").length - 1];
      
              formData.append("uploadedFile0", this.files[0]);
              formData.append("exe", thisExe);
    
              targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
              for (let z = 0; z < targets.length; z++) {
                try {
                  targets[z].remove();
                } catch {}
              }
    
              resolve(formData);
    
            } else {
    
              targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
              for (let z = 0; z < targets.length; z++) {
                try {
                  targets[z].remove();
                } catch {}
              }
    
              resolve(null);
            }
          }
        } catch (e) {
          targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
          for (let z = 0; z < targets.length; z++) {
            try {
              targets[z].remove();
            } catch {}
          }
          console.log(e);
          resolve(null);
        }
      });
  
      buttonsBaseTong.addEventListener("drop", async function (e: any) {
        e.stopPropagation();
        e.preventDefault();
        let formData;
        let thisExe;
        let targets;
        try {
          if (e.dataTransfer.files.length >= 1) {
            formData = new FormData();
    
            thisExe = e.dataTransfer.files[0].name.split(".")[e.dataTransfer.files[0].name.split(".").length - 1];
    
            formData.append("uploadedFile0", e.dataTransfer.files[0]);
            formData.append("exe", thisExe);
  
            targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
            for (let z = 0; z < targets.length; z++) {
              try {
                targets[z].remove();
              } catch {}
            }
  
            resolve(formData);
  
          } else {
  
            targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
            for (let z = 0; z < targets.length; z++) {
              try {
                targets[z].remove();
              } catch {}
            }
  
            resolve(null);
          }
        } catch (e) {
          targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
          for (let z = 0; z < targets.length; z++) {
            try {
              targets[z].remove();
            } catch {}
          }
          console.log(e);
          resolve(null);
        }
      });
  
    });
  }

  public static setCookie = (obj: Dictionary, day: boolean | number = 730, del: boolean = false) => {
    if (typeof day === "boolean") {
      del = day;
      day = 730;
    }
    const today = new Date();
    let totalString: string, expires: string;
  
    today.setTime(today.getTime() + (day * 24 * 60 * 60 * 1000));
    if (!del) {
      expires = "expires=" + today.toUTCString();
    } else {
      expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }
  
    for (let i in obj) {
      totalString = '';
      totalString += encodeURIComponent(i.replace(/\=\;/g, ''));
      totalString += '=';
      totalString += encodeURIComponent(String(obj[i]).replace(/\=\;/g, ''));
      totalString += ';';
      totalString += expires + ";path=/";
      document.cookie = totalString;
    }
  }

  public static getCookiesAll = () => {
    const cookies = window.decodeURIComponent(document.cookie);
    let tempArr0: List, tempArr1: List;
    let resultObj: Dictionary;
    resultObj = {};
    tempArr0 = cookies.split(';');
    for (let i of tempArr0) {
      tempArr1 = i.split('=');
      if (tempArr1.length > 1) {
        resultObj[tempArr1[0].trim()] = tempArr1[1].trim();
      }
    }
    return resultObj;
  }

  public static getCookieById = (key: string): any => {
    const cookiesObj = AbstractNode.getCookiesAll();
    const cookiesKey = Object.keys(cookiesObj);
    if (cookiesKey.includes(key)) {
      return cookiesObj[key];
    } else {
      return null;
    }
  }

  public static setMetaData = (obj: Dictionary): string => {
    if (typeof obj.title !== "string" || typeof obj.description !== "string" || typeof obj.image !== "string") {
      throw new Error("invaild input");
    }
    const head: HTMLElement = document.querySelector("head") || new HTMLElement();
    const metas: List = [ ...head.querySelectorAll("meta") ];
    if (metas.length < 3) {
      throw new Error("invalid html");
    }
    const title = metas.find((dom) => { return dom.getAttribute("property") === "og:title" });
    const title2 = document.querySelector("title");
    const description = metas.find((dom) => { return dom.getAttribute("property") === "og:description" });
    const description2 = metas.find((dom) => { return dom.getAttribute("name") === "description" });
    const image = metas.find((dom) => { return dom.getAttribute("property") === "og:image" });
    if (title === undefined || title2 === null || description === undefined || description2 === undefined || image === undefined) {
      throw new Error("invalid meta setting");
    }
    let description3: any;
    let firstTarget: HTMLElement;

    if (document.body.firstChild !== null) {
      firstTarget = document.body.children[0] as HTMLElement;
      if (firstTarget.id !== "totalcontents" && firstTarget.style.display === "none") {
        description3 = document.body.firstChild;
      } else {
        description3 = null;
      }
    } else {
      description3 = null;
    }
    title.setAttribute("content", obj.title);
    title2.textContent = obj.title;
    description.setAttribute("content", obj.description);
    description2.setAttribute("content", obj.description);
    if (description3 !== null) {
      description3.textContent = obj.description;
    }
    image.setAttribute("content", obj.image);
    return "success";
  }

  public static injectVideo = (obj: Dictionary): HTMLElement | SVGElement => {
    if (typeof obj.dom !== "object" || typeof obj.id !== "string" || typeof obj.dom.style.width !== "string" || typeof obj.dom.style.height !== "string") {
      throw new Error("invaild input");
    }
    const { id, dom } = obj;
    let htmlString: string, targetDom: HTMLElement | SVGElement;
    let width: number, height: number, ea: string;
    let widthStr: string, heightStr: string;
  
    widthStr = dom.style.width;
    heightStr = dom.style.height;
    width = Number(widthStr.replace(/[^0-9\-\.]/gi, ''));
    height = Number(heightStr.replace(/[^0-9\-\.]/gi, ''));
    ea = widthStr.replace(/[0-9\-\.]/gi, '')
  
    if (ea === '' || Number.isNaN(width) || Number.isNaN(height)) {
      throw new Error("invalid width, height value");
    }
  
    targetDom = AbstractNode.createNode(dom);
    targetDom.style.display = "inline-flex";
    targetDom.style.position = "relative";
    targetDom.style.overflow = "hidden";
    targetDom.style.justifyContent = "center";
    targetDom.style.alignItems = "center";
  
    if (ea !== "px") {
      width = targetDom.getBoundingClientRect().width;
      height = targetDom.getBoundingClientRect().height;
    }
  
    width = width + 10;
    height = height + (10 * (height / width));
  
    htmlString = `<iframe width="${String(width)}" height="${String(height)}" src="https://www.youtube.com/embed/${id}?controls=1&autoplay=1&mute=1&modestbranding=1&amp;playlist=${id}&loop=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    targetDom.insertAdjacentHTML("beforeend", htmlString);
  
    return targetDom;
  }

  public static removeByClass = (className: string): void => {
    const targets: Array<Element> = [ ...document.querySelectorAll('.' + className) ];
    for (let dom of targets) {
      dom.remove();
    }
  }

  public static selectByClass = (className: any, areaMother: Document | HTMLElement = document): List => {
    let targets: List;
    let thisMother: Document | HTMLElement;
    thisMother = areaMother;
    targets = [];
    if (typeof className === "string") {
      targets = [ ...thisMother.querySelectorAll('.' + className) ];
    } else if (Array.isArray(className)) {
      targets = [];
      for (let c of className) {
        targets = targets.concat([ ...thisMother.querySelectorAll('.' + c) ]);
      }
    } else {
      throw new Error("invalid input");
    }
    if (targets.length > 0) {
      return targets;
    } else {
      return [];
    }
  }

  public static setArray = (targetList: StringList = []): StringList => {
    if (!Array.isArray(targetList)) {
      throw new Error("invalid input");
    }
    if (!targetList.every((s) => { return typeof s === "string" })) {
      throw new Error("invalid input 2");
    }
    const resultArr: StringList = [ ...new Set(targetList) ];
    return resultArr;
  }

  public static findStringToArr = (regex: RegExp, targetString: string, setMode: boolean = true): StringList => {
    let matchResult: IterableIterator<RegExpExecArray>;
    let matchList: List;

    matchResult = targetString.matchAll(regex);
    matchList = [ ...matchResult ].map((a) => { return a[0] });

    if (setMode) {
      return [ ...new Set(matchList) ];
    } else {
      return matchList;
    }
  }
  
  public static fireEvent = (dom: any, eventName: string) => {
    if (typeof dom === "object" && dom !== null) {
      if (eventName !== "click" && eventName !== "focus" && eventName !== "blur") {
        dom.dispatchEvent(new Event(eventName, { bubbles: true }));
      } else if (eventName === "click") {
        dom.click();
      } else if (eventName === "blur") {
        dom.dispatchEvent(new Event(eventName, { bubbles: true }));
        if (typeof dom.blur === "function") {
          dom.blur();
        }
      } else if (eventName === "focus") {
        dom.focus();
      }
    }
  }

  public static getRealBox = (dom: HTMLElement | SVGElement, original: string | Dictionary = "attribute"): Dictionary => {
    const mobile: boolean = window.innerWidth <= 900;
    const desktop: boolean = !mobile;
    let box: Dictionary;
    let widthVisual: number;
  
    if (desktop) {
      widthVisual = AbstractNode.isMac() ? 0.97 : 0.84;
    } else {
      widthVisual = 1;
    }
  
    dom.style.display = "inline-block";
    dom.style.position = "relative";
    dom.style.width = "auto";
    dom.style.height = "auto";
    
    box = dom.getBoundingClientRect();
    box = JSON.parse(JSON.stringify(box));
  
    box.width = box.width * widthVisual;
  
    if (original !== null && typeof original === "object") {
      if (typeof original.display === "string") {
        dom.style.display = original.display;
      }
      if (typeof original.position === "string") {
        dom.style.position = original.position;
      }
      if (typeof original.width === "string") {
        dom.style.width = original.width;
      }
      if (typeof original.height === "string") {
        dom.style.height = original.height;
      }
    } else if (original === "attribute") {
      if (dom.getAttribute("display") !== null) {
        dom.style.display = dom.getAttribute("display") || "";
      }
      if (dom.getAttribute("position") !== null) {
        dom.style.position = dom.getAttribute("position") || "";
      }
      if (dom.getAttribute("width") !== null) {
        dom.style.width = dom.getAttribute("width") || "";
      }
      if (dom.getAttribute("height") !== null) {
        dom.style.height = dom.getAttribute("height") || "";
      }
    }
    return box;
  }

  public static capitalizeString = (str: string): string => {
    if (typeof str !== "string") {
      throw new Error("invalid input");
    }
    if (str.length === 0 || str.length === 1) {
      if (str.length === 0) {
        return "";
      }
      return str.toUpperCase();
    } else {
      return str.slice(0, 1).toUpperCase() + str.slice(1);
    }
  }

  public static arrayPromise = (promiseArr: List): Promise<any> => {
    return new Promise((resolve, reject) => {
      Promise.all(promiseArr).then((values) => {
        resolve(values);
      }).catch((err) => {
        reject(err);
      })
    });
  }

  public static dropToFiles = async (e: any): Promise<Dictionary> => {
    try {
      e.preventDefault();
      let readDroppedItems;
      let promiseArr: List, resultArr: List;
      let result: Dictionary;
  
      promiseArr = [];
      for await (const item of e.dataTransfer.items) {
        promiseArr.push(item.getAsFileSystemHandle());
      }
  
      resultArr = await AbstractNode.arrayPromise(promiseArr);
      readDroppedItems = async (items: any) => {
        try {
          let tong;
          let handle;
          let fileEntry;
  
          tong = [];
          const readFolderRecursively = async (entry: any, motherName: any | null = null) => {
            let motherStart;
            if (entry.kind === "file") {
              const file = await entry.getFile();
              if (file !== null) {
                if (file.name !== ".DS_Store") {
                  file.relativePath = motherName + "/" + file.name;
                  file.motherFolder = file.relativePath.split("/").slice(0, -1).join("/");
                  tong.push(file);
                }
              }
            } else if (entry.kind === "directory") {
              if (motherName !== null) {
                motherStart = motherName + "/" + entry.name;
              } else {
                motherStart = "/" + entry.name;
              }
              const values = entry.values();
              for await (const handle of values) {
                await readFolderRecursively(handle, motherStart);
              }
            }
          }
  
          for (const handle of items) {
            try {
              if (handle.kind === "file") {
                fileEntry = await handle.getFile();
                if (fileEntry !== null) {
                  if (fileEntry.name !== ".DS_Store") {
                    fileEntry.relativePath = "/" + fileEntry.name;
                    fileEntry.motherFolder = fileEntry.relativePath.split("/").slice(0, -1).join("/");
                    tong.push(fileEntry);
                  }
                }
              } else if (handle.kind === "directory") {
                await readFolderRecursively(handle);
              }
            } catch {}
          }
  
          return tong;
        } catch (e) {
          console.log(e);
          return null;
        }
      }
  
      result = {};
      result.fromArray = await readDroppedItems(resultArr);
      result.toArray = result.fromArray.map((obj: Dictionary) => { return obj.motherFolder + "/" + obj.name.replace(/ /gi, "_").replace(/\n/gi, "_").replace(/\t/gi, "_").replace(/[\/\\\=\&\:\,\!\@\#\$\%\^\+\*\(\)\[\]\{\}\+\?\<\>]/gi, ''); });
  
      return result;
    } catch (e) {
      console.log(e);
      return {};
    }
  }

  public static dropToForm = async (e: any, motherPath: string | null = null): Promise<FormData> => {
    try {
      const uploadKeyword: string = "upload";
      let formData: FormData, files: any, toArr: List;
  
      formData = new FormData();
      files = await AbstractNode.dropToFiles(e);
  
      for (let i = 0; i < files.fromArray.length; i++) {
        formData.append("upload" + String(i), files.fromArray[i]);
      }
      toArr = [];
      for (let i = 0; i < files.fromArray.length; i++) {
        toArr.push((motherPath === null ? "" : motherPath) + files.toArray[i]);
      }
      formData.append("toArr", JSON.stringify(toArr));
  
      return formData;
  
    } catch (e) {
      console.log(e);
      return (new FormData());
    }
  }

  public static tempScrollBan = (scrollBanTarget: HTMLElement) => {
    scrollBanTarget.addEventListener("DOMMouseScroll", AbstractNode.stacks.__temporaryPreventDefaultEvent);
    scrollBanTarget.addEventListener("wheel", AbstractNode.stacks.__temporaryPreventDefaultEvent);
    scrollBanTarget.addEventListener("mousewheel", AbstractNode.stacks.__temporaryPreventDefaultEvent);
    scrollBanTarget.addEventListener("touchmove", AbstractNode.stacks.__temporaryPreventDefaultEvent);
  }
  
  public static tempScrollRelease = (scrollBanTarget: HTMLElement) => {
    scrollBanTarget.removeEventListener("DOMMouseScroll", AbstractNode.stacks.__temporaryPreventDefaultEvent);
    scrollBanTarget.removeEventListener("wheel", AbstractNode.stacks.__temporaryPreventDefaultEvent);
    scrollBanTarget.removeEventListener("mousewheel", AbstractNode.stacks.__temporaryPreventDefaultEvent);
    scrollBanTarget.removeEventListener("touchmove", AbstractNode.stacks.__temporaryPreventDefaultEvent);
  }

  public static blackAlert = async (message: string): Promise<any> => {
    try {
      const { mediaNumber, mediaString, mediaEa } = AbstractNode;
      let div_clone: HTMLElement, div_clone2: HTMLElement;
      let ea: string;
      let margin: number;
      let wordWidth: number, width: number;
      let borderRadius: number;
      let blackHeight: number;
      let textSize: number, textTop: number;
      let boxBottom: number;
  
      if (AbstractNode.timeouts["blackAlertLevel0_TimeOut"] !== undefined && AbstractNode.timeouts["blackAlertLevel0_TimeOut"] !== null) {
        AbstractNode.stacks["blackAlert_blackBox"].style.animation = "fadedowndelay 0.4s ease forwards";
        await AbstractNode.sleep(401);
        document.body.removeChild(AbstractNode.stacks["blackAlert_blackBox"]);
        clearTimeout(AbstractNode.timeouts["blackAlertLevel1_TimeOut"]);
        clearTimeout(AbstractNode.timeouts["blackAlertLevel0_TimeOut"]);
        AbstractNode.timeouts["blackAlertLevel1_TimeOut"] = null;
        AbstractNode.timeouts["blackAlertLevel0_TimeOut"] = null;
      }
  
      ea = mediaEa();
      margin = mediaNumber(20, 20, 16, 14, 2);
      borderRadius = mediaNumber(15, 15, 14, 12, 3);
      blackHeight = mediaNumber(36, 36, 32, 28, 4);
      textSize = mediaNumber(16, 16, 14, 13, 3.5);
      textTop = mediaNumber(-1, -1, -1, -1, -0.1);
      boxBottom = mediaNumber(30, 30, 26, 24, 4);
  
      div_clone = AbstractNode.createDom({
        mother: document.body,
        style: {
          position: "fixed",
          background: AbstractNode.colorExtended.darkBlack,
          borderRadius: borderRadius,
          height: blackHeight,
          bottom: boxBottom,
          boxShadow: "0px 5px 12px -8px " + AbstractNode.colorExtended.gray4,
          opacity: 0,
          width: 2000,
          transition: "all 0s ease",
          zIndex: 400,
        }
      });
  
      div_clone2 = AbstractNode.createDom({
        mother: div_clone,
        style: {
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          textAlign: "center",
          color: AbstractNode.colorExtended.white,
          height: AbstractNode.withOut(0),
          fontSize: textSize,
          fontWeight: 400,
          top: textTop,
        }
      });
  
      div_clone2.textContent = message;
      wordWidth = div_clone2.getBoundingClientRect().width;
      width = wordWidth + (Number(margin) * 2);
  
      div_clone.style.width = String(width) + ea;
      div_clone.style.left = "calc(50% - " + String(width / 2) + ea + ")";
      div_clone2.style.width = String(100) + '%';
      div_clone.style.animation = "fadeupdelay 0.5s ease forwards";
  
      AbstractNode.timeouts["blackAlertLevel0_TimeOut"] = setTimeout(function () {
        div_clone.style.animation = "fadedowndelay 0.4s ease forwards";
        AbstractNode.timeouts["blackAlertLevel1_TimeOut"] = setTimeout(function () {
          div_clone.removeChild(div_clone2);
          document.body.removeChild(div_clone);
          clearTimeout(AbstractNode.timeouts["blackAlertLevel1_TimeOut"]);
          AbstractNode.timeouts["blackAlertLevel1_TimeOut"] = null;
          clearTimeout(AbstractNode.timeouts["blackAlertLevel0_TimeOut"]);
          AbstractNode.timeouts["blackAlertLevel0_TimeOut"] = null;
        }, 410);
      }, 2400);
  
    } catch (e) {
      console.log(e);
    }
  }

  public static returnLoadingIcon = (color: string = AbstractNode.colorExtended.darkShadow, color2: string = AbstractNode.colorExtended.black): SVGElement => {
    let icon: SVGElement = SvgTong.stringParsing(AbstractNode.svgMaker.returnLoading(color, color2));
    icon.classList.add("loading");
    return icon;
  }
  
  public static generalCss = (fontFamily: string): string => {
    const styleTag: HTMLStyleElement | null = document.querySelector("style");
    const css: string = `html{-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing: grayscale;-ms-touch-action: manipulation;touch-action: manipulation;}
    *{margin:0;padding:0;transition:all 0.3s ease;font-family:${fontFamily};-webkit-tap-highlight-color: transparent;}
    *::-webkit-scrollbar{display:none;}
    input::placeholder {color: ${AbstractNode.colorExtended.black};opacity:0.6;}
    textarea::placeholder {color: ${AbstractNode.colorExtended.black};opacity:0.6;}
    body,div{font-size:0;color:${AbstractNode.colorExtended.black};margin:0;font-family:${fontFamily};}
    a{text-decoration:inherit;color:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);background:0 0;outline:0}
    textarea{resize:none}
    b,strong{font-weight:inherit;display:inline;}
    img{border:0}
    button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}
    button,html input[type=button],input[type=submit]{-webkit-appearance:button;cursor:pointer;box-sizing:border-box;white-space: normal}
    input[type=text],input[type=password],textarea{-webkit-appearance:none;appearance: none;box-sizing:border-box;background-color:${AbstractNode.colorExtended.white}}
    input{line-height:normal}
    input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}
    input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}
    input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}
    iframe{border:0;outline:0}
    p{overflow:hidden;}
    b{color:${AbstractNode.colorExtended.grayDeactive};}
    label{cursor:pointer}
    article,section{margin:0;}
    #totalcontents{display:block;position:relative;left:0;top:0;height:100vh;width:100%;background-color:${AbstractNode.colorExtended.white};}
    .hiddenobject{display: none;position: absolute; opacity: 0;font-size:0px}
    .hoverDefault_lite{cursor:pointer;opacity:1}
    .hoverDefault_lite:hover{opacity:0.75;}
    .hoverDefault{cursor:pointer;opacity:1}
    .hoverDefault:hover{opacity:0.5;}
    .hoverdefault_reverse{opacity: 0;transition:all 0.5s ease;cursor: pointer;}
    .hoverdefault_reverse:hover{opacity: 0.4;}
    .hoverdefault_lite_reverse{opacity: 0.7;transition:all 0.5s ease;cursor: pointer;}
    .hoverdefault_lite_reverse:hover{opacity: 0.95;}
    .backblurdefault {-webkit-backdrop-filter: blur(10px);backdrop-filter: blur(10px);}
    .backblurdefault_lite {-webkit-backdrop-filter: blur(5px);backdrop-filter: blur(5px);}
    .backblurwhite {-webkit-backdrop-filter: blur(4px);backdrop-filter: blur(4px);background: rgb(255, 255, 255, 0.8);}
    .backblurwhite_lite {-webkit-backdrop-filter: blur(5px);backdrop-filter: blur(5px);background: rgb(255, 255, 255, 0.82);}
    .backblurgray {-webkit-backdrop-filter: blur(10px);backdrop-filter: blur(10px);background: rgb(236, 236, 236, 0.9);}
    .backblurtransparent {-webkit-backdrop-filter: blur(4px);backdrop-filter: blur(4px);background: rgb(255, 255, 255, 0.3);}
    .backblurblack {-webkit-backdrop-filter: blur(5px);backdrop-filter: blur(5px);background: linear-gradient(256deg, rgba(20, 20, 20, 0.65) 0%, rgba(28, 28, 28, 0.7) 100%);}
    @keyframes in{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0px);}}
    @keyframes fa{from{opacity:0;}to{opacity:1;}}
    @keyframes flash{from,80%,to{opacity:0}30%,50%{opacity:0.85}}
    @keyframes justfadeinoriginal{from{opacity:0;}to{opacity:1;}}
    @keyframes justfadeoutoriginal{from{opacity:1;}to{opacity:0;}}
    @keyframes justfadeinnine{from{opacity:0;}to{opacity:0.9;}}
    @keyframes justfadeoutnine{from{opacity:0.9;}to{opacity:0;}}
    @keyframes justfadeineight{from{opacity:0;}to{opacity:0.8;}}
    @keyframes justfadeouteight{from{opacity:0.8;}to{opacity:0;}}
    @keyframes justfadeinseven{from{opacity:0;}to{opacity:0.7;}}
    @keyframes justfadeoutseven{from{opacity:0.7;}to{opacity:0;}}
    @keyframes justfadeinmiddle{from{opacity:0;}to{opacity:0.6;}}
    @keyframes justfadeoutmiddle{from{opacity:0.6;}to{opacity:0;}}
    @keyframes justfadeinsmall{from{opacity:0;}to{opacity:0.4;}}
    @keyframes justfadeoutsmall{from{opacity:0.4;}to{opacity:0;}}
    @keyframes justfadeinmini{from{opacity:0;}to{opacity:0.12;}}
    @keyframes justfadeoutmini{from{opacity:0.12;}to{opacity:0;}}
    @keyframes justfadein{from{opacity:0;}to{opacity:0.3;}}
    @keyframes justfadeout{from{opacity:0.3;}to{opacity:0;}}
    @keyframes invisible{from{opacity:0;}to{opacity:0;}}
    @keyframes fadedown{from{opacity:1;transform:translateY(0px);}to{opacity:0;transform:translateY(20px);}}
    @keyframes fadeup{from{opacity:0;transform:translateY(20px);}to{opacity:0.95;transform:translateY(0px);}}
    @keyframes fadeuporiginal{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0px);}}
    @keyframes justfadeindelay{from,33%{opacity:0;}to{opacity:0.3;}}
    @keyframes justfadeoutdelay{from,33%{opacity:0.3;}to{opacity:0;}}
    @keyframes justfadeouttiny{from{opacity:0.3;}to{opacity:0;}}
    @keyframes fadeupentire{from{transform:translateY(100%);}to{transform:translateY(0%);}}
    @keyframes fadedownentire{from{transform:translateY(0%);}to{transform:translateY(100%);}}
    @keyframes fadeinslide{from{opacity:0;transform:translateX(-15px);}to{opacity:1;transform:translateX(0px);}}
    @keyframes fadeoutslide{from{opacity:1;transform:translateX(0px);}to{opacity:0;transform:translateX(15px);}}
    @keyframes fadeinslidereverse{from{opacity:0;transform:translateX(15px);}to{opacity:1;transform:translateX(0px);}}
    @keyframes fadeoutslidereverse{from{opacity:1;transform:translateX(0px);}to{opacity:0;transform:translateX(-15px);}}
    @keyframes fadeupdelay{from,30%{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0px);}}
    @keyframes fadeupdelaymiddle{from,30%{opacity:0;transform:translateY(10px);}to{opacity:0.4;transform:translateY(0px);}}
    @keyframes fadeupdelay2{from,30%{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0px);}}
    @keyframes fadeuplitereverse{from{opacity:0;transform:translateY(-10px);}to{opacity:0.95;transform:translateY(0px);}}
    @keyframes fadeuplite{from{opacity:0;transform:translateY(10px);}to{opacity:0.95;transform:translateY(0px);}}
    @keyframes fadeupnine{from{opacity:0;transform:translateY(5px);}to{opacity:0.91;transform:translateY(0px);}}
    @keyframes fadeuphard{from{opacity:0;transform:translateY(5px);}to{opacity:1;transform:translateY(0px);}}
    @keyframes fadedownlite{from{opacity:0.95;transform:translateY(0px);}to{opacity:0;transform:translateY(10px);}}
    @keyframes fadeupmini{from{opacity:0;transform:translateY(5px);}to{opacity:1;transform:translateY(0px);}}
    @keyframes fadedownmini{from{opacity:0.95;transform:translateY(0px);}to{opacity:0;transform:translateY(5px);}}
    @keyframes fadeupmiddle{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0px);}}
    @keyframes fadedownmiddle{from{opacity:1;transform:translateY(0px);}to{opacity:0;transform:translateY(10px);}}
    @keyframes fadeupbacklite{from{opacity:0;transform:translateY(5px);}to{opacity:0.2;transform:translateY(0px);}}
    @keyframes loginfadeup0{from{opacity:0;}to{opacity:0.1;}}
    @keyframes loginfadeup1{from{opacity:0;backdrop-filter: blur(0px);}to{opacity:0.6;backdrop-filter: blur(4px);}}
    @keyframes loginfadedown0{from{opacity:0.1;}to{opacity:0;}}
    @keyframes loginfadedown1{from{opacity:0.6;backdrop-filter: blur(4px);}to{opacity:0;backdrop-filter: blur(0px);}}
    @keyframes profilefadeup{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0px);}}
    @keyframes communicationfadeup{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0px);}}
    @keyframes fadedowndelay{from{opacity:1;transform:translateY(0px);}70%,to{opacity:0;transform:translateY(-5px);}}
    @keyframes fadeout{from{opacity:1;transform:translateX(0px);}to{opacity:0;transform:translateX(-30px);}}
    @keyframes fadein{from{opacity:0;transform:translateX(30px);}to{opacity:1;transform:translateX(0px);}}
    @keyframes fadeoutlite{from{opacity:1;transform:translateX(0px);}to{opacity:0;transform:translateX(-20px);}}
    @keyframes fadeoutlite2{from{opacity:1;transform:translateX(0px);}to{opacity:0;transform:translateX(20px);}}
    @keyframes fadeinlite{from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:translateX(0px);}}
    @keyframes fadeinlite2{from{opacity:0;transform:translateX(-20px);}to{opacity:1;transform:translateX(0px);}}
    @keyframes loadingrotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
    @keyframes fadecancel{from{opacity:0}to{opacity:0.2}}
    @keyframes twinkle {from {opacity: 1;}49% {opacity: 1;}50% {opacity: 0;}99% {opacity: 0;}to {opacity: 1;}}
    @keyframes focusProgress {from {transform: scale(0deg);opacity: 1;}25% {transform: scale(0.92);opacity: 0.9;}50% {transform: scale(1.08);opacity: 1;}75% {transform: scale(0.92);opacity: 0.9;}to {transform: scale(1);opacity: 1;}}
    @keyframes blackToBlack {from {background-color: ${AbstractNode.colorExtended.darkBlack};opacity: 1;}25% {background-color: ${AbstractNode.colorExtended.ultimateBlack};opacity: 1;}50% {background-color: ${AbstractNode.colorExtended.darkBlack};opacity: 1;}75% {background-color: ${AbstractNode.colorExtended.ultimateBlack};opacity: 1;}to {background-color: ${AbstractNode.colorExtended.darkBlack};opacity: 1;}}
    @keyframes garoProgress {from {transform: scaleX(0);}to {transform: scaleX(1);}}
    @keyframes rotateProgress {from {transform: rotate(0deg);opacity: 1;}25% {transform: rotate(90deg);}50% {transform: rotate(180deg);opacity: 0.92;}75% {transform: rotate(270deg);}to {transform: rotate(360deg);opacity: 1;}}
    @keyframes rotateProgress2 {from {transform: rotate(0deg);opacity: 1;}25% {transform: rotate(90deg);}50% {transform: rotate(180deg);opacity: 0.8;}75% {transform: rotate(270deg);}to {transform: rotate(360deg);opacity: 1;}}
    @keyframes opacityProgress {from {opacity: 1;}50% {opacity: 0.85;}to {opacity: 1;}}
    .justfadeinoriginal{animation:justfadeinoriginal 0.3s ease forwards;}
    .justfadeoutoriginal{animation:justfadeoutoriginal 0.3s ease forwards;}
    .justfadein{animation:justfadein 0.3s ease forwards;}
    .justfadeout{animation:justfadeout 0.3s ease forwards;}
    .fadeout{animation:fadeout 0.3s ease forwards;}
    .fadein{animation:fadein 0.3s ease forwards;}
    .fadedown{animation:fadedown 0.3s ease forwards;}
    .fadeup{animation:fadeup 0.3s ease forwards;}
    .loading{position:absolute;left:50%;transform:rotate(0deg);transform-origin:50% 50%;animation:loadingrotate 1.7s linear infinite;mix-blend-mode: multiply}`;
    if (styleTag !== null) {
      styleTag.insertAdjacentHTML(`beforeend`, css);
    } else {
      const styleDummy: HTMLStyleElement = window.document.createElement("STYLE") as HTMLStyleElement;
      window.document.head.appendChild(styleDummy);
      styleDummy.insertAdjacentHTML(`beforeend`, css);
    }
    return css;
  }
  
  public static loadingRun = (): Promise<SVGElement> => {
    let loading: SVGElement;
    let style: Dictionary;
    let ea: string;
    let width: number, height: number;
  
    ea = "px";
    loading = AbstractNode.returnLoadingIcon();
    width = 50;
    height = 50;
    style = {
      position: "fixed",
      width: String(width) + ea,
      height: String(height) + ea,
      top: "calc(calc(100vh - " + String(0) + ea + ") / 2 - " + String(Number(width) / 2) + ea + ")",
      left: "calc(50vw - " + String(Number(height) / 2) + ea + ")",
    };
    for (let i in style) {
      Object.defineProperty(loading.style, i, {
        value: style[i],
        writable: true,
      })
    }
  
    document.body.appendChild(loading);
  
    return new Promise((resolve, reject) => {
      resolve(loading);
    });
  }
  
  public static grayLoading = (mother: HTMLElement | null = null, whiteMode: boolean = false) => {
    const { createNode, colorExtended, withOut, mediaNumber, mediaEa, createDom } = AbstractNode;
    let width: number, ea: string;
    let cancel: HTMLElement, loading: HTMLElement;
  
    ea = "px";
    width = mediaNumber(50, 50, 50, 50, 50);
  
    class GrayLoading {
      public cancel;
      public loading;

      constructor (cancel: any, loading: any) {
        this.cancel = cancel;
        this.loading = loading;
      }
      remove = () => {
        this.loading.parentElement.removeChild(this.loading);
        this.cancel.parentElement.removeChild(this.cancel);
      }
    }
  
    if (mother === null || mother === undefined) {
      mother = document.body;
    }
  
    cancel = createDom({
      mother,
      style: {
        position: "fixed",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: String(100) + '%',
        background: !whiteMode ? colorExtended.black : "transparent",
        zIndex: String(300),
        opacity: String(0.3),
      }
    });
  
    loading = createDom({
      mother,
      mode: "svg",
      source: AbstractNode.svgMaker.returnLoading(),
      class: [ "loading" ],
      style: {
        position: "fixed",
        top: withOut(50, Number(width) / 2, ea),
        left: withOut(50, Number(width) / 2, ea),
        width: String(width) + ea,
        height: String(width) + ea,
        zIndex: 300,
      }
    });
  
    return (new GrayLoading(cancel, loading));
  }
  
  public static whiteProgressLoading = (mother: HTMLElement | null = null, emptyProgress: boolean = false, transparentBackground: boolean = false) => {
    const { createNode, colorExtended, withOut, mediaNumber, mediaEa, createDom } = AbstractNode;
    let width: number;
    let ea: string;
    let cancel: HTMLElement, loading: HTMLElement, progressBox: HTMLElement;
    let zIndex: number;
    let progressWidth: number;
    let progressSize: number;
    let progressWeight: number;
    let progressHeight: number;
    let progressPadding: number;
  
    zIndex = 300;
  
    ea = mediaEa();
    width = mediaNumber(50, 50, 48, 40, 10);
    progressWidth = mediaNumber(200, 200, 200, 200, 20);
    progressHeight = mediaNumber(40, 40, 36, 32, 4);
    progressSize = mediaNumber(17, 17, 17, 15, 3.5);
    progressWeight = mediaNumber(400, 400, 400, 400, 400);
    progressPadding = mediaNumber(20, 20, 20, 17, 3.9);
  
    class WhiteLoading {
      public cancel;
      public loading;
      public progress;

      constructor (cancel: any, loading: any, progress: any) {
        this.cancel = cancel;
        this.loading = loading;
        this.progress = progress;
      }

      remove = () => {
        this.loading.parentElement.removeChild(this.loading);
        this.cancel.parentElement.removeChild(this.cancel);
        this.progress.parentElement.removeChild(this.progress);
      }
    }
  
    if (mother === null || mother === undefined) {
      mother = document.body;
    }
  
    cancel = createDom({
      mother,
      style: {
        position: "fixed",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: String(100) + '%',
        background: transparentBackground ? "transparent" : colorExtended.white,
        zIndex: zIndex,
        opacity: 0.7,
      }
    });
  
    loading = createDom({
      mother,
      mode: "svg",
      source: AbstractNode.svgMaker.returnLoading(),
      class: [ "loading" ],
      style: {
        position: "fixed",
        top: withOut(50, (Number(width) / 2) + Number(progressPadding)),
        left: withOut(50, Number(width) / 2),
        width: width,
        height: width,
        zIndex: zIndex,
      }
    });
  
    progressBox = createDom({
      mother,
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        height: progressHeight,
        width: progressWidth,
        top: withOut(50, (Number(progressHeight) / 2) - Number(progressPadding)),
        left: withOut(50, Number(progressWidth) / 2),
        zIndex: zIndex,
      },
      child: {
        text: "0%",
        style: {
          display: emptyProgress ? "none" : "inline-block",
          position: "relative",
          fontSize: progressSize,
          fontWeight: progressWeight,
          fontFamily: "bergen",
          color: colorExtended.black,
        }
      }
    })
  
    return (new WhiteLoading(cancel, loading, progressBox));
  }
  
  public static setPolling = (data: Dictionary, url: string, interval: number, callback: (response: any) => any) => {
    let worker: Worker;
    let workerJsString: string;
    let blob: Blob;
    let blobUrl: string;

    workerJsString = AbstractNode.networkSetString();
    workerJsString += "\n\n";
    workerJsString += String(`
    const thisHost = "${window.location.protocol + "//" + window.location.host}";
    const main = async function () {
      try {
        onmessage = async function (e) {
          try {
            if (e.data.data === undefined || e.data.url === undefined || e.data.interval === undefined) {
              throw new Error("invalid post message");
            }
            const { data, url, interval } = equalJson(JSON.stringify(e.data));
            let finalUrl;
            let response;

            if (/^\\//.test(url)) {
              finalUrl = thisHost + url;
            } else {
              finalUrl = url;
            }

            setInterval(async () => {
              try {
                response = await ajaxJson(data, finalUrl);
                postMessage(JSON.stringify({ response }));
              } catch (e) {
                console.log(e);
              }
            }, Number(interval));
            response = await ajaxJson(data, finalUrl);
            postMessage(JSON.stringify({ response }));

          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    main().catch((err) => { console.log(err); });
    `).split("\n").map((s) => { return s.trim() }).join("\n");

    blob = new Blob([ workerJsString ], { type: "application/javascript" });
    blobUrl = window.URL.createObjectURL(blob);

    worker = new Worker(blobUrl);
    worker.addEventListener("message", async (e) => {
      try {
        const { response } = AbstractNode.equalJson(e.data) as Dictionary;
        await callback(response);
      } catch (e) {
        console.log(e);
      }
    });
    worker.addEventListener("error", (e) => {
      console.log(e);
    })
    worker.postMessage({ data, url, interval });
  }
  
  public static backgroundSse = (url: string, callback: (response: any) => any) => {
    let worker: Worker;
    let workerJsString: string;
    let blob: Blob;
    let blobUrl: string;

    workerJsString = AbstractNode.networkSetString();
    workerJsString += "\n\n";
    workerJsString += String(`
    const thisHost = "${window.location.protocol + "//" + window.location.host}";
    const main = async function () {
      try {
        onmessage = async function (e) {
          try {
            if (e.data.url === undefined) {
              throw new Error("invalid post message");
            }
            const { url } = e.data;
            let finalUrl;

            if (/^\\//.test(url)) {
              finalUrl = thisHost + url;
            } else {
              finalUrl = url;
            }

            const sseSrouce = new EventSource(finalUrl);
            sseSrouce.addEventListener("message", (e) => {
              postMessage(e.data);
            });
            sseSrouce.addEventListener("error", (e) => {
              console.log(e);
            });
            
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    main().catch((err) => { console.log(err); });
    `).split("\n").map((s) => { return s.trim() }).join("\n");

    blob = new Blob([ workerJsString ], { type: "application/javascript" });
    blobUrl = window.URL.createObjectURL(blob);

    worker = new Worker(blobUrl);
    worker.addEventListener("message", async (e) => {
      try {
        const response = AbstractNode.equalJson(e.data);
        await callback(response);
      } catch (e) {
        console.log(e);
      }
    });
    worker.addEventListener("error", (e) => {
      console.log(e);
    })
    worker.postMessage({ url });
  }
  
  public static request = (url: string, callback: (response: any) => any) => {
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function () {
      if (xhr.readyState !== 4) { return; }
      if (xhr.status >= 200 && xhr.status < 300) {
        let response = xhr.response;
        if (!/Exception occur/g.test(response)) {
          callback(response);
        } else {
          alert("오류가 발생하였습니다. 다시 시도해주세요!");
          window.location.reload();
        }
      } else if (xhr.status >= 500) {
        alert("오류가 발생하였습니다. 다시 시도해주세요!");
        window.location.reload();
      } else if (xhr.status >= 402 && xhr.status <= 420) {
        alert("오류가 발생하였습니다. 다시 시도해주세요!");
        window.location.reload();
      } else if(xhr.status === 400 || xhr.status === 401) {
        alert("오류가 발생하였습니다. 다시 시도해주세요!");
        window.location.reload();
      }
    }
    xhr.onerror = function () {
      alert("오류가 발생하였습니다. 다시 시도해주세요!");
      window.location.reload();
    }
    xhr.send();
  }

  public static scrollTo = (from: HTMLElement | Window, valueOrTo: HTMLElement | number, visualSpecific: number = 0, noSmoothMode: boolean = false, callback: () => Promise<any> = async () => {}) => {

    if (from instanceof HTMLElement) {
      if (typeof valueOrTo !== "number") {
        if (typeof valueOrTo === "object") {
          let thisValueNumber: number;
          thisValueNumber = from.scrollTop + valueOrTo.getBoundingClientRect().top;
          from.scrollTop = thisValueNumber - visualSpecific;
        } else {
          throw new Error("invaild input");
        }
      } else {
        from.scrollTop = valueOrTo - visualSpecific;
      }
    } else {
      if (typeof valueOrTo === "number") {
        if (!noSmoothMode) {
          window.scroll({ top: valueOrTo - visualSpecific, left: 0, behavior: "smooth" });
        } else {
          window.scroll({ top: valueOrTo - visualSpecific, left: 0 });
        }
      } else {
        if (!noSmoothMode) {
          window.scroll({ top: Math.abs(document.body.getBoundingClientRect().top - valueOrTo.getBoundingClientRect().top) - visualSpecific, left: 0, behavior: "smooth" });
        } else {
          window.scroll({ top: Math.abs(document.body.getBoundingClientRect().top - valueOrTo.getBoundingClientRect().top) - visualSpecific, left: 0 });
        }
      }
    }
  
    if (from === window && valueOrTo === 0 && !noSmoothMode) {
      const tempEventName: string = "__tempScrollYOberserEventFromScrollTo__";
      const tempTimeoutScrollToName: string = "__tempTimeoutScrollToNameScrollTo__";
      const tempTimeoutScrollCallBack: string = "__tempTimeoutScrollCallBack__";
      const delta: number = 800;
      const scrollDelta: number = 8;
      if (AbstractNode.stacks[tempTimeoutScrollToName] !== undefined) {
        clearTimeout(AbstractNode.stacks[tempTimeoutScrollToName]);
      }
      if (AbstractNode.stacks[tempEventName] !== undefined) {
        window.removeEventListener("scroll", AbstractNode.stacks[tempEventName]);
      }
      AbstractNode.stacks[tempTimeoutScrollCallBack] = 0;
      if (Math.floor(window.scrollY) !== 0) {
        AbstractNode.stacks[tempTimeoutScrollToName] = setTimeout(async () => {
          window.scroll({ top: 0, left: 0, behavior: "smooth" });
          if (AbstractNode.stacks[tempTimeoutScrollCallBack] === 0) {
            await callback();
          }
          AbstractNode.stacks[tempTimeoutScrollCallBack] = 1;
          window.removeEventListener("scroll", AbstractNode.stacks[tempEventName]);
        }, delta);
      } else {
        if (AbstractNode.stacks[tempTimeoutScrollCallBack] === 0) {
          callback().catch((err) => { console.log(err) });
        }
        AbstractNode.stacks[tempTimeoutScrollCallBack] = 1;
      }
    }
  }

  public static setQueue = (callback: () => any, delay?: number) => {
    if (typeof callback !== "function") {
      throw new Error("invaild input");
    }
    if (typeof delay !== "number") {
      delay = 0;
    }
    let propertyName: string;
    propertyName = "tempQueue_" + String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000));
    AbstractNode.timeouts[propertyName] = setTimeout(() => {
      callback();
      clearTimeout(AbstractNode.timeouts[propertyName]);
      AbstractNode.timeouts[propertyName] = null;
    }, delay);
  }
  
  public static setDebounce = (callback: () => any, name: string = "__null__", delay: number = 300) => {
    if (AbstractNode.timeouts[name] !== null || AbstractNode.timeouts[name] !== undefined) {
      clearTimeout(AbstractNode.timeouts[name]);
    }
    AbstractNode.timeouts[name] = setTimeout(() => {
      callback();
      clearTimeout(AbstractNode.timeouts[name]);
      AbstractNode.timeouts[name] = null;
    }, delay);
  }
  
  public static setThrottle = (callback: () => any, ms: number = 100): () => any => {
    let timeout: any;
    let waiting: boolean;
    waiting = false;
    return function () {
      if (!waiting) {
        callback();
        waiting = true;
        timeout = setTimeout(function () {
          waiting = false;
          clearTimeout(timeout);
        }, ms);
      }
    }
  }
  
  public static delayLaunching = (callback: () => any, ms: number = 100): () => any => {
    let timer: any = 0;
    return function () {
      if (timer !== 0) {
        clearTimeout(timer);
      }
      timer = setTimeout(callback, ms);
    }
  }

  public static swipePatch = (direction: string | Dictionary, callback = function (e: any) {}, dom: Document | HTMLElement = document, stackConst: string = "swipeStack_", scrollBanTarget: HTMLElement | SVGElement | Document | Window | null = null, conditionFunc = () => { return true }) => {
    const xDown: string = "xDown";
    const yDown: string = "yDown";
    const xDiff: string = "xDiff";
    const yDiff: string = "yDiff";
    const timeDown: string = "timeDown";
    const startElement: string = "startElement";
    const handleTouchEnd: string = "handleTouchEnd";
    const handleTouchStart: string = "handleTouchStart";
    const handleTouchMove: string = "handleTouchMove";
    const getNearestAttribute = function (el: HTMLElement | SVGElement | Document | null, attributeName: string, defaultValue: string) {
      let attributeValue: string | null;
      while (el && el !== document.documentElement) {
        if (el instanceof HTMLElement || el instanceof SVGElement) {
          attributeValue = el.getAttribute(attributeName);
        } else {
          attributeValue = null;
        }
        if (attributeValue) {
          return attributeValue;
        }
        el = el.parentNode as HTMLElement | SVGElement | Document;
      }
      return defaultValue;
    }
  
    if (typeof direction === "string") {
      if (!([ "up", "down", "left", "right" ].includes(direction))) {
        throw new Error("must be direction: [ up, down, left, right ]");
      }
      if (typeof callback !== "function") {
        throw new Error("must be function input");
      }
      AbstractNode.stacks[stackConst + direction] = callback.bind(dom);
    } else if (typeof direction === "object") {
      for (let i in direction) {
        if (!([ "up", "down", "left", "right" ].includes(i))) {
          throw new Error("must be direction: [ up, down, left, right ]");
        }
        if (typeof direction[i] !== "function") {
          throw new Error("must be function input");
        }
        AbstractNode.stacks[stackConst + i] = direction[i].bind(dom);
      }
    } else {
      throw new Error("invaild input");
    }
  
    if (typeof AbstractNode.stacks[stackConst + handleTouchStart] === "function") {
      dom.removeEventListener("touchstart", AbstractNode.stacks[stackConst + handleTouchStart]);
    }
    if (typeof AbstractNode.stacks[stackConst + handleTouchMove] === "function") {
      dom.removeEventListener("touchmove", AbstractNode.stacks[stackConst + handleTouchMove]);
    }
    if (typeof AbstractNode.stacks[stackConst + handleTouchEnd] === "function") {
      dom.removeEventListener("touchend", AbstractNode.stacks[stackConst + handleTouchEnd]);
    }
  
    AbstractNode.stacks[stackConst + xDown] = null;
    AbstractNode.stacks[stackConst + yDown] = null;
    AbstractNode.stacks[stackConst + xDiff] = null;
    AbstractNode.stacks[stackConst + yDiff] = null;
    AbstractNode.stacks[stackConst + timeDown] = null;
    AbstractNode.stacks[stackConst + startElement] = null;
  
    AbstractNode.stacks[stackConst + handleTouchStart] = function (e: any) {
      if (conditionFunc()) {
        AbstractNode.stacks[stackConst + startElement] = e.target;
        AbstractNode.stacks[stackConst + timeDown] = Date.now();
        AbstractNode.stacks[stackConst + xDown] = e.touches[0].clientX;
        AbstractNode.stacks[stackConst + yDown] = e.touches[0].clientY;
        AbstractNode.stacks[stackConst + xDiff] = 0;
        AbstractNode.stacks[stackConst + yDiff] = 0;
    
        if (scrollBanTarget !== null) {
          scrollBanTarget.addEventListener("DOMMouseScroll", AbstractNode.stacks.__temporaryPreventDefaultEvent);
          scrollBanTarget.addEventListener("wheel", AbstractNode.stacks.__temporaryPreventDefaultEvent);
          scrollBanTarget.addEventListener("mousewheel", AbstractNode.stacks.__temporaryPreventDefaultEvent);
          scrollBanTarget.addEventListener("touchmove", AbstractNode.stacks.__temporaryPreventDefaultEvent);
        }
        dom.addEventListener("DOMMouseScroll", AbstractNode.stacks.__temporaryPreventDefaultEvent);
        dom.addEventListener("wheel", AbstractNode.stacks.__temporaryPreventDefaultEvent);
        dom.addEventListener("mousewheel", AbstractNode.stacks.__temporaryPreventDefaultEvent);
        dom.addEventListener("touchmove", AbstractNode.stacks.__temporaryPreventDefaultEvent);
  
      }
    }
    AbstractNode.stacks[stackConst + handleTouchMove] = function (e: any) {
      const thresholdKey = "data-swipe-threshold";
      const thresholdValue = 2;
      let swipeThreshold: number;
      let direction: string | null;
      if (conditionFunc()) {
  
        swipeThreshold = parseInt(getNearestAttribute(AbstractNode.stacks[stackConst + startElement], thresholdKey, String(thresholdValue)), 10);
  
        if (!AbstractNode.stacks[stackConst + xDown] || !AbstractNode.stacks[stackConst + yDown]) {
          return;
        }
        AbstractNode.stacks[stackConst + xDiff] = AbstractNode.stacks[stackConst + xDown] - e.touches[0].clientX;
        AbstractNode.stacks[stackConst + yDiff] = AbstractNode.stacks[stackConst + yDown] - e.touches[0].clientY;
  
        direction = null;
        if (Math.abs(AbstractNode.stacks[stackConst + xDiff]) > Math.abs(AbstractNode.stacks[stackConst + yDiff])) {
          if (Math.abs(AbstractNode.stacks[stackConst + xDiff]) > swipeThreshold) {
            if (AbstractNode.stacks[stackConst + xDiff] > 0) {
              direction = "left";
            } else {
              direction = "right";
            }
          }
        } else if (Math.abs(AbstractNode.stacks[stackConst + yDiff]) > swipeThreshold) {
          if (AbstractNode.stacks[stackConst + yDiff] > 0) {
            direction = "up";
          } else {
            direction = "down";
          }
        }
  
        if (direction !== null) {
          if (typeof AbstractNode.stacks[stackConst + direction] !== "function") {
            if (scrollBanTarget !== null) {
              scrollBanTarget.removeEventListener("DOMMouseScroll", AbstractNode.stacks.__temporaryPreventDefaultEvent);
              scrollBanTarget.removeEventListener("wheel", AbstractNode.stacks.__temporaryPreventDefaultEvent);
              scrollBanTarget.removeEventListener("mousewheel", AbstractNode.stacks.__temporaryPreventDefaultEvent);
              scrollBanTarget.removeEventListener("touchmove", AbstractNode.stacks.__temporaryPreventDefaultEvent);
            }
            dom.removeEventListener("DOMMouseScroll", AbstractNode.stacks.__temporaryPreventDefaultEvent);
            dom.removeEventListener("wheel", AbstractNode.stacks.__temporaryPreventDefaultEvent);
            dom.removeEventListener("mousewheel", AbstractNode.stacks.__temporaryPreventDefaultEvent);
            dom.removeEventListener("touchmove", AbstractNode.stacks.__temporaryPreventDefaultEvent);
          }
        }
        
      }
    }
    AbstractNode.stacks[stackConst + handleTouchEnd] = function (e: any) {
      if (conditionFunc()) {
  
        if (scrollBanTarget !== null) {
          scrollBanTarget.removeEventListener("DOMMouseScroll", AbstractNode.stacks.__temporaryPreventDefaultEvent);
          scrollBanTarget.removeEventListener("wheel", AbstractNode.stacks.__temporaryPreventDefaultEvent);
          scrollBanTarget.removeEventListener("mousewheel", AbstractNode.stacks.__temporaryPreventDefaultEvent);
          scrollBanTarget.removeEventListener("touchmove", AbstractNode.stacks.__temporaryPreventDefaultEvent);
        }
        dom.removeEventListener("DOMMouseScroll", AbstractNode.stacks.__temporaryPreventDefaultEvent);
        dom.removeEventListener("wheel", AbstractNode.stacks.__temporaryPreventDefaultEvent);
        dom.removeEventListener("mousewheel", AbstractNode.stacks.__temporaryPreventDefaultEvent);
        dom.removeEventListener("touchmove", AbstractNode.stacks.__temporaryPreventDefaultEvent);
    
        if (AbstractNode.stacks[stackConst + startElement] !== e.target) {
          return;
        }
        const thresholdKey = "data-swipe-threshold";
        const timeoutKey = "data-swipe-timeout";
        const thresholdValue = 20;
        const timeoutValue = 500;
        const delta = 1.2;
        const gamma = 0.8;
        let swipeThreshold: number, swipeTimeout: number;
        let timeDiff: any;
        let direction: string | null;
        let changedTouches: any;
        let eventData: Dictionary;
    
        swipeThreshold = parseInt(getNearestAttribute(AbstractNode.stacks[stackConst + startElement], thresholdKey, String(thresholdValue)), 10);
        swipeTimeout = parseInt(getNearestAttribute(AbstractNode.stacks[stackConst + startElement], timeoutKey, String(timeoutValue)), 10);
    
        timeDiff = Date.now() - AbstractNode.stacks[stackConst + timeDown];
        changedTouches = e.changedTouches || e.touches || [];
    
        direction = null;
        if (Math.abs(AbstractNode.stacks[stackConst + xDiff]) > Math.abs(AbstractNode.stacks[stackConst + yDiff])) {
          if (Math.abs(AbstractNode.stacks[stackConst + xDiff]) > swipeThreshold && timeDiff < swipeTimeout) {
            if (AbstractNode.stacks[stackConst + xDiff] > 0) {
              direction = "left";
            } else {
              direction = "right";
            }
          }
        } else if (Math.abs(AbstractNode.stacks[stackConst + yDiff]) > swipeThreshold && timeDiff < swipeTimeout) {
          if (AbstractNode.stacks[stackConst + yDiff] > 0) {
            direction = "up";
          } else {
            direction = "down";
          }
        }
    
        if (direction !== null) {
          eventData = {
            direction,
            start: [ parseInt(AbstractNode.stacks[stackConst + xDown], 10), parseInt(AbstractNode.stacks[stackConst + yDown], 10) ],
            end: [ parseInt((changedTouches[0] || {}).clientX || -1, 10), parseInt((changedTouches[0] || {}).clientY || -1, 10) ],
            y: AbstractNode.stacks[stackConst + yDiff],
            x: AbstractNode.stacks[stackConst + xDiff],
            top: AbstractNode.stacks[stackConst + yDiff],
            left: AbstractNode.stacks[stackConst + xDiff],
          };
          if (typeof AbstractNode.stacks[stackConst + direction] === "function") {
            (AbstractNode.stacks[stackConst + direction])(eventData);
          }
        }
        AbstractNode.stacks[stackConst + xDown] = null;
        AbstractNode.stacks[stackConst + yDown] = null;
        AbstractNode.stacks[stackConst + timeDown] = null;
      }
    }
  
    dom.addEventListener("touchstart", AbstractNode.stacks[stackConst + handleTouchStart], false);
    dom.addEventListener("touchmove", AbstractNode.stacks[stackConst + handleTouchMove], false);
    dom.addEventListener("touchend", AbstractNode.stacks[stackConst + handleTouchEnd], false);
  }

  public static variableArray = (length: number, callback: (i: number) => any = (i) => i): List => {
    if (typeof length !== "number") {
      throw new Error("invaild input")
    }
    let targetArray: List = [];
    for (let i = 0; i < length; i++) {
      if (typeof callback === "function") {
        targetArray.push(callback(i));
      } else {
        targetArray.push(i);
      }
    }
    return targetArray;
  }

  public mediaConditionToArray (): List {
    return AbstractNode.mediaConditionToArray();
  }
  
  public mediaQuery (code: string): Dictionary {
    return AbstractNode.mediaQuery(code);
  }
  
  public mediaNumber (bigDesktop: number, desktop: number, smallDesktop: number, tablet: number, mobile: number): number {
    return AbstractNode.mediaNumber(bigDesktop, desktop, smallDesktop, tablet, mobile);
  }
  
  public mediaString (bigDesktop: string, desktop: string, smallDesktop: string, tablet: string, mobile: string): string {
    return AbstractNode.mediaString(bigDesktop, desktop, smallDesktop, tablet, mobile);
  }
  
  public mediaBoolean (bigDesktop: boolean, desktop: boolean, smallDesktop: boolean, tablet: boolean, mobile: boolean): boolean {
    return AbstractNode.mediaBoolean(bigDesktop, desktop, smallDesktop, tablet, mobile);
  }
  
  public mediaEa (): string {
    return AbstractNode.mediaEa();
  }
  
  public colorParsing (str: string | Array<number>) {
    return AbstractNode.colorParsing(str);
  }
  
  public async ajaxPromise (data: Dictionary, url: string, option: Dictionary = {}): Promise<any> {
    return await AbstractNode.ajaxPromise(data, url, option);
  }
  
  public async ajaxForm (data: FormData, url: string, loadingDom: HTMLElement | null = null): Promise<any> {
    return await AbstractNode.ajaxForm(data, url, loadingDom);
  }
  
  public async ajaxJson (data: Dictionary, url: string, option: Dictionary = {}): Promise<any> {
    return await AbstractNode.ajaxJson(data, url, option);
  }
  
  public equalJson (jsonString: string | Dictionary | List): Dictionary | List {
    return AbstractNode.equalJson(jsonString);
  }
  
  public networkSetString (): string {
    return AbstractNode.networkSetString();
  }
  
  public async ajaxMultiple (matrix: List): Promise<List> {
    return await AbstractNode.ajaxMultiple(matrix);
  }
  
  public async requestPromise (url: string): Promise<any> {
    return await AbstractNode.requestPromise(url);
  }
  
  public async downloadFile (url: string, forceName: string | null = null, loadingDom: HTMLElement | null = null): Promise<any> {
    return await AbstractNode.downloadFile(url, forceName, loadingDom);
  }
  
  public createNode (mode: string | Dictionary, source?: string | HTMLElement | Element | SVGElement, style?: Dictionary, mother?: HTMLElement | Element | SVGElement | null): HTMLElement | SVGElement {
    return AbstractNode.createNode(mode, source, style, mother);
  }
  
  public createNodes (arr: Array<Dictionary>): Array<HTMLElement | SVGElement> {
    return AbstractNode.createNodes(arr);
  }
  
  public createDom (domCommandObject: Dictionary): HTMLElement {
    return AbstractNode.createDom(domCommandObject);
  }
  
  public createSvg (domCommandObject: Dictionary): SVGElement {
    return AbstractNode.createSvg(domCommandObject);
  }
  
  public async nodeQueue (obj: Dictionary): Promise<HTMLElement | SVGElement> {
    return await AbstractNode.nodeQueue(obj);
  }
  
  public withOut (percent: number, num?: string | number, ea?: string): string {
    return AbstractNode.withOut(percent, num, ea);
  }
  
  public vwConvert (num: number): number {
    return AbstractNode.vwConvert(num);
  }
  
  public autoHypenPhone (m: string): string {
    return AbstractNode.autoHypenPhone(m);
  }
  
  public returnGet (): Dictionary {
    return AbstractNode.returnGet();
  }
  
  public parseRatio (options: Dictionary): number | string {
    return AbstractNode.parseRatio(options);
  }
  
  public addHrefEvent (dom: HTMLElement | SVGElement, to: string) {
    return AbstractNode.addHrefEvent(dom, to);
  }
  
  public addScrollXEvent (node: HTMLElement, name: string = "") {
    return AbstractNode.addScrollXEvent(node, name);
  }
  
  public getDateMatrix (year: any, month: any): DateMatrix {
    return AbstractNode.getDateMatrix(year, month);
  }
  
  public async sleep (time: number): Promise<string> {
    return await AbstractNode.sleep(time);
  }
  
  public downloadString (text: string, fileName: string, fileType: string = "plain") {
    return AbstractNode.downloadString(text, fileName, fileType);
  }
  
  public blankHref (link: string) {
    return AbstractNode.blankHref(link);
  }
  
  public selfHref (link: string) {
    return AbstractNode.selfHref(link);
  }
  
  public styleInjection (dom: HTMLElement | SVGElement, styleObj: Dictionary) {
    return AbstractNode.styleInjection(dom, styleObj);
  }
  
  public cssInjection (cssString: string) {
    return AbstractNode.cssInjection(cssString);
  }
  
  public uniqueValue (type: string = "number"): any {
    return AbstractNode.uniqueValue(type);
  }
  
  public async copyText (str: string): Promise<any> {
    return await AbstractNode.copyText(str);
  }
  
  public isMac (): boolean {
    return AbstractNode.isMac();
  }
  
  public isIphone (): boolean {
    return AbstractNode.isIphone();
  }
  
  public cleanChildren (dom: List | HTMLElement | SVGElement) {
    return AbstractNode.cleanChildren(dom);
  }
  
  public objectDeepCopy (obj: Dictionary | List): Dictionary | List {
    return AbstractNode.objectDeepCopy(obj);
  }
  
  public pixelUnit (num: number): string {
    return AbstractNode.pixelUnit(num);
  }
  
  public eaUnit (num: number): string {
    return AbstractNode.eaUnit(num);
  }
  
  public percent (num?: number): string {
    return AbstractNode.percent(num);
  }
  
  public async hexaJson (input: any, middleMode: boolean = false) {
    return AbstractNode.hexaJson(input, middleMode);
  }
  
  public autoComma (str: number | string, manVersion: boolean = false): string {
    return AbstractNode.autoComma(str, manVersion);
  }
  
  public dateToString (date: Date, detail: boolean = false, dayOption: boolean = false): string {
    return AbstractNode.dateToString(date, detail, dayOption);
  }
  
  public dateToHangul (date: Date, shortYear: boolean = false): string {
    return AbstractNode.dateToHangul(date, shortYear);
  }
  
  public zeroAddition (num: number): string {
    return AbstractNode.zeroAddition(num);
  }
  
  public stringToDate (str: any): Date {
    return AbstractNode.stringToDate(str);
  }
  
  public rangeToDate (str: string): DateRange {
    return AbstractNode.rangeToDate(str);
  }
  
  public linkToString (link: string): string {
    return AbstractNode.linkToString(link);
  }
  
  public async promiseTogether (promiseArr: List): Promise<any> {
    return await AbstractNode.promiseTogether(promiseArr);
  }
  
  public stringToLink (string: string): string {
    return AbstractNode.stringToLink(string);
  }
  
  public xyConverting (original: List): List {
    return AbstractNode.xyConverting(original);
  }
  
  public cssCalc (x: any, mode: string, y: any): string {
    return AbstractNode.cssCalc(x, mode, y);
  }
  
  public jsonToString (json: any): string {
    return AbstractNode.jsonToString(json);
  }
  
  public stringToJson (string: string): any {
    return AbstractNode.stringToJson(string);
  }
  
  public findByAttribute (dom: any, attributeName: string | List, attributeValue: string | List) {
    return AbstractNode.findByAttribute(dom, attributeName, attributeValue);
  }
  
  public appendQuery (obj: Dictionary) {
    return AbstractNode.appendQuery(obj);
  }
  
  public removeQuery (key: string) {
    return AbstractNode.removeQuery(key);
  }
  
  public hasQuery (key: string): boolean {
    return AbstractNode.hasQuery(key);
  }
  
  public setQuery (obj: Dictionary): boolean {
    return AbstractNode.setQuery(obj);
  }
  
  public confirm (message: string) {
    return AbstractNode.confirm(message);
  }
  
  public async prompt (message: string, preValue: string = ''): Promise<any> {
    return await AbstractNode.prompt(message, preValue);
  }
  
  public alert (message: string, blackMode: boolean = false, skipMode: boolean = false) {
    return AbstractNode.alert(message, blackMode, skipMode);
  }
  
  public async promptLong (message: string, preValue: string = ''): Promise<any> {
    return await AbstractNode.promptLong(message, preValue);
  }
  
  public async promptWithButton (message: string, progressName: string = "NULL", preValue: string = ''): Promise<any> {
    return await AbstractNode.promptWithButton(message, progressName, preValue);
  }
  
  public async promptButtons (message: string, buttons: Array<string>, customColor: any = null): Promise<any> {
    return await AbstractNode.promptButtons(message, buttons, customColor);
  }
  
  public querySetting (obj: Dictionary) {
    return AbstractNode.querySetting(obj);
  }
  
  public async promptLongButtons (message: string, buttons: Array<string>): Promise<any> {
    return await AbstractNode.promptLongButtons(message, buttons);
  }
  
  public async promptFile (message: string): Promise<any> {
    return await AbstractNode.promptFile(message);
  }
  
  public setCookie (obj: Dictionary, day: boolean | number = 730, del: boolean = false) {
    return AbstractNode.setCookie(obj, day, del);
  }
  
  public getCookiesAll () {
    return AbstractNode.getCookiesAll();
  }
  
  public getCookieById (key: string): any {
    return AbstractNode.getCookieById(key);
  }
  
  public setMetaData (obj: Dictionary): string {
    return AbstractNode.setMetaData(obj);
  }
  
  public injectVideo (obj: Dictionary): HTMLElement | SVGElement {
    return AbstractNode.injectVideo(obj);
  }
  
  public removeByClass (className: string): void {
    return AbstractNode.removeByClass(className);
  }
  
  public selectByClass (className: any, areaMother: Document | HTMLElement = document): List {
    return AbstractNode.selectByClass(className, areaMother);
  }
  
  public fireEvent (dom: any, eventName: string) {
    return AbstractNode.fireEvent(dom, eventName);
  }
  
  public getRealBox (dom: HTMLElement | SVGElement, original: string | Dictionary = "attribute"): Dictionary {
    return AbstractNode.getRealBox(dom, original);
  }
  
  public capitalizeString (str: string): string {
    return AbstractNode.capitalizeString(str);
  }
  
  public async arrayPromise (promiseArr: List): Promise<any> {
    return await AbstractNode.arrayPromise(promiseArr);
  }
  
  public async dropToFiles (e: any): Promise<Dictionary> {
    return await AbstractNode.dropToFiles(e);
  }
  
  public async dropToForm (e: any, motherPath: string | null = null): Promise<FormData> {
    return await AbstractNode.dropToForm(e, motherPath);
  }
  
  public tempScrollBan (scrollBanTarget: HTMLElement) {
    return AbstractNode.tempScrollBan(scrollBanTarget);
  }
  
  public tempScrollRelease (scrollBanTarget: HTMLElement) {
    return AbstractNode.tempScrollRelease(scrollBanTarget);
  }
  
  public async blackAlert (message: string): Promise<any> {
    return await AbstractNode.blackAlert(message);
  }
  
  public returnLoadingIcon (color: string = AbstractNode.colorExtended.darkShadow, color2: string = AbstractNode.colorExtended.black): SVGElement {
    return AbstractNode.returnLoadingIcon(color, color2);
  }
  
  public generalCss (fontFamily: string): string {
    return AbstractNode.generalCss(fontFamily);
  }
  
  public async loadingRun (): Promise<SVGElement> {
    return await AbstractNode.loadingRun();
  }
  
  public grayLoading (mother: HTMLElement | null = null, whiteMode: boolean = false) {
    return AbstractNode.grayLoading(mother, whiteMode);
  }
  
  public whiteProgressLoading (mother: HTMLElement | null = null, emptyProgress: boolean = false, transparentBackground: boolean = false) {
    return AbstractNode.whiteProgressLoading(mother, emptyProgress, transparentBackground);
  }
  
  public setPolling (data: Dictionary, url: string, interval: number, callback: (response: any) => any) {
    return AbstractNode.setPolling(data, url, interval, callback);
  }

  public backgroundSse (url: string, callback: (response: any) => any) {
    return AbstractNode.backgroundSse(url, callback);
  }

  public request (url: string, callback: (response: any) => any) {
    return AbstractNode.request(url, callback);
  }

  public scrollTo (from: HTMLElement | Window, valueOrTo: HTMLElement | number, visualSpecific: number = 0, noSmoothMode: boolean = false, callback: () => Promise<any> = async () => {}) {
    return AbstractNode.scrollTo(from, valueOrTo, visualSpecific, noSmoothMode, callback);
  }

  public setQueue (callback: () => any, delay?: number) {
    return AbstractNode.setQueue(callback, delay);
  }

  public setDebounce (callback: () => any, name: string = "__null__", delay: number = 300) {
    return AbstractNode.setDebounce(callback, name, delay);
  }

  public setThrottle (callback: () => any, ms: number = 100): () => any {
    return AbstractNode.setThrottle(callback, ms);
  }

  public delayLaunching (callback: () => any, ms: number = 100): () => any {
    return AbstractNode.delayLaunching(callback, ms);
  }

  public swipePatch (direction: string | Dictionary, callback = function (e: any) {}, dom: Document | HTMLElement = document, stackConst: string = "swipeStack_", scrollBanTarget: HTMLElement | SVGElement | Document | Window | null = null, conditionFunc = () => { return true }) {
    return AbstractNode.swipePatch(direction, callback, dom, stackConst, scrollBanTarget, conditionFunc);
  }

  public variableArray (length: number, callback: (i: number) => any = (i) => i): List {
    return AbstractNode.variableArray(length, callback);
  }

  public setGeneralProperties () {
    const instance = this;
    const { mediaEa, mediaCondition, mediaNumber, mediaString, mediaBoolean, mediaConditionToArray } = AbstractNode;

    instance.totalContents = document.getElementById("totalcontents") as HTMLElement;
    instance.userNameToken = "____userName____";
    instance.mode = mediaString("bigDesktop", "smallDesktop", "tablet", "tablet", "mobile");
    instance.ea = mediaEa();
    instance.standardWidth = mediaNumber(1400, 1050, 900, 720, 90);
    instance.sero = mediaBoolean(false, false, false, false, true);
    instance.modeMinus = mediaNumber(0, 1, 1, 1, 1);
    instance.naviHeight = mediaNumber(72, 72, 66, 60, 45);
    instance.backHeight = mediaNumber(860, 830, 670, 640, 80);
    instance.margin = 20 - instance.modeMinus;

    const subBoxMargin: Dictionary = {};
    subBoxMargin.top = mediaNumber(30, 30, 26, 20, 10.5);
    subBoxMargin.bottom = mediaNumber(31, 31, 27, 26, 31);
    subBoxMargin.left = mediaNumber(30, 30, 30, 24, 4.5);

    instance.subBoxMargin = subBoxMargin;
    instance.media = mediaConditionToArray(true);
    instance.firstPageViewTime = new Date();

    if (instance.totalContents !== null) {
      instance.totalContents.style.height = "auto";
    }
  }
  
  public setBaseTong = (selfBaseTop: number | null = null) => {
    const childInstnace = this;
    const { ea, media, totalContents, standardWidth, naviHeight } = childInstnace;
    const { createNode, createNodes, colorExtended, withOut, mediaNumber, mediaEa, createDom } = AbstractNode;
    const mobile = media[4];
    const desktop = !mobile;
    let baseTong: HTMLElement;
    let baseTop: number;
  
    baseTop = mediaNumber(200, 200, 170, 140, 10);
    if (window.innerHeight < 960) {
      baseTop = mediaNumber(180, 180, 165, 140, 10);
    }
    if (selfBaseTop !== null) {
      baseTop = selfBaseTop;
    }
    baseTong = createDom({
      mother: totalContents,
      style: {
        position: "relative",
        width: String(standardWidth) + ea,
        left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
        paddingTop: desktop ? String(baseTop) + ea : "calc(" + String(naviHeight) + "px" + " + " + String(baseTop) + ea + ")",
        animation: mobile ? "" : "fadeupdelay 0.5s ease forwards",
      }
    });
  
    childInstnace.baseTop = baseTop;
    childInstnace.baseTong = baseTong;
  } 

  public async main (): Promise<void> {
    const instance = this;
    instance.generalCss('"bergen", "pretendard"');
    instance.setGeneralProperties();
  }

  public async launching (): Promise<boolean> {
    const instance = this;
    try {
      window.document.addEventListener("DOMContentLoaded", async (e: any) => {
        await instance.main();
      });
      
      window.document.addEventListener("error", (e: any) => {
        window.localStorage.clear();
        window.location.reload();
        console.log(e);
      });

      return true;
    } catch (e: any) {
      console.log(e);
      return false;
    }
  }

}

export { AbstractNode, SvgTong, DateMatrix, DateRange };