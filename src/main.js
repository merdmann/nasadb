"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var lib_js_1 = require("./lib.js");
console.log("API Key: " + lib_js_1.API_KEY);
document.addEventListener('DOMContentLoaded', function () {
    /* Data handler fo space weather reports */
    function DumpReports(o) {
        console.log("DumpReports");
        var data = document.getElementById("data");
        if (Array.isArray(o)) {
            for (var _i = 0, o_1 = o; _i < o_1.length; _i++) {
                var e = o_1[_i];
                console.log(e);
                var message = e.messageBody.replace("##", "<br>");
                data.innerHTML += "<div class=\"message\"><div class=\"" + e.messageType + "\"> " + e.messageID + "</div> - <a href=\"" + e.messageURL + "\">read more\"</a - " + message + "</div><br>";
            }
        }
    }
    var dataSets = [
        { /* 0 */ 'dsname': 'Coronal Mass Ejection (CME)', 'url': 'https://api.nasa.gov/DONKI/CME?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY', 'handler': null },
        { /* 1 */ 'dsname': 'Coronal Mass Ejection (CME) Analysis', 'url': 'https://api.nasa.gov/DONKI/CMEAnalysis?startDate=2016-09-01&endDate=2016-09-30&mostAccurateOnly=true&speed=500&halfAngle=30&catalog=ALL&api_key=DEMO_KEY', 'handler': null },
        { /* 2 */ 'dsname': 'Geomagnetic Storm (GST)', 'url': 'https://api.nasa.gov/DONKI/GST?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY', 'handler': null },
        { /* 3 */ 'dsname': 'Interplanetary Shock (IPS)', 'url': 'https://api.nasa.gov/DONKI/IPS?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&location=LOCATION&catalog=CATALOG&api_key=DEMO_KEY', 'handler': null },
        { /* 4 */ 'dsname': 'Solar Flare (FLR)', 'url': 'https://api.nasa.gov/DONKI/FLR?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY', 'handler': null },
        { /* 5 */ 'dsname': 'Solar Energetic Particle (SEP)', 'url': 'https://api.nasa.gov/DONKI/SEP?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY', 'handler': null },
        { /* 6 */ 'dsname': 'Magnetopause Crossing (MPC)', 'url': 'https://api.nasa.gov/DONKI/MPC?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY', 'handler': null },
        { /* 7 */ 'dsname': 'Radiation Belt Enhancement (RBE)', 'url': 'https://api.nasa.gov/DONKI/RBE?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY', 'handler': null },
        { /* 8 */ 'dsname': 'Hight Speed Stream (HSS)', 'url': 'https://api.nasa.gov/DONKI/HSS', "handler": null },
        { /* 9 */ 'dsname': 'WSA+EnlilSimulation', 'url': 'https://api.nasa.gov/DONKI/WSAEnlilSimulations?startDate=2016-01-06&endDate=2016-01-06&api_key=DEMO_KEY', "handler": null },
        { /* 10 */ 'dsname': 'Notifications', 'url': 'https://api.nasa.gov/DONKI/notifications', 'handler': DumpReports }
    ];
    /**
     * fetch data from the NASA open api datasets
     */
    function api_get(url) {
        return __awaiter(this, void 0, void 0, function () {
            var query, response, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = url + "?api_key=" + lib_js_1.API_KEY;
                        console.log('api_get(' + query + ')');
                        return [4 /*yield*/, fetch(query)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        body = _a.sent();
                        return [2 /*return*/, body];
                }
            });
        });
    }
    /**
    *  This is called every time a data set button is cliaked
    */
    function handleClick(ev) {
        var _this = this;
        console.log("handeClick");
        var p = api_get(dataSets[this.id].url);
        p.then(function (o) { dataSets[_this.id].handler(o); });
    }
    /**
     * PLace a botton wihe the name of the data set of the screen. if you clik the button the
     * dataset is downloaded.
     */
    function AddButtom(id) {
        var datalist = document.getElementById("DataSetList");
        var name = dataSets[id].dsname;
        var url = dataSets[id].url;
        datalist.innerHTML += `<button id="${id}" type="button" class="h6 btn-block buttons btn btn-primary">${name}</button>`
        var btn = document.getElementById(id);
        btn.addEventListener('click', handleClick, true);
    }
    var Datasets = /** @class */ (function () {
        function Datasets() {
        }
        /* this will put a a clicable element for each data set */
        Datasets.prototype.render = function () {
            /*    for (let i = 0; i < dataSets.length; ++i) {
                  AddButtom( i ) */
        };
        return Datasets;
    }());
}
/**
 * Facade Pattern implementation
 */
, /** @class */ (function () {
    function Facade(ds, pod) {
        this.ds = ds;
        this.pod = pod;
    }
    Facade.prototype.render = function () {
        this.ds.render();
        this.pod.render();
    };
    return Facade;
}()), /** @class */ (function () {
    function PictureOfTheDay(title, url, explanation) {
        var _this = this;
        var data = api_get("https://api.nasa.gov/planetary/apod");
        console.log(data);
        data.then(function (o) {
            _this.img_url = o.url;
            _this.title = o.title;
            _this.explain = o.explanation;
            _this.render();
        });
    }
    PictureOfTheDay.prototype.render = function () {
        var datalist = document.getElementById("data-display");
        if (typeof this.title !== 'undefined') {
            datalist.innerHTML += "<h2>" + this.title + "</h2>\n                              <div>" + this.explain + "</div>";
            datalist.innerHTML += "<img width=\"500px\" src=\"" + this.img_url + "\"></img>";
        }
    };
    return PictureOfTheDay;
}()), let, data = api_get("https://api.nasa.gov/planetary/apod"));
console.log(data);
var facade;
data.then(function (o) {
    var pod;
    _this.img_url = o.url;
    _this.title = o.title;
    _this.explain = o.explanation;
    pod = new PictureOfTheDay(o.title, o.url, o.explanation);
    pod.render();
    var ds = new Datasets();
    facade = new Facade(ds, pod).render();
});
