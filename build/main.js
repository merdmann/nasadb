var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { API_KEY } from './lib.js';
console.log("API Key: " + API_KEY);
document.addEventListener('DOMContentLoaded', function () {
    /* Data handler fo space weather reports */
    function DumpReports(o) {
        console.log("DumpReports");
        let data = document.getElementById("space-weather");
        if (Array.isArray(o)) {
            for (let e of o) {
                console.log(e);
                let message = e.messageBody.replace("##", "<br>");
                data.innerHTML += `<div class="message"><div class="${e.messageType}"> ${e.messageID}</div> - <a href="${e.messageURL}">read more"</a - ${message}</div><br>`;
            }
        }
    }
    /* Datahandler for corona mass ejection data */
    function cme_handler(o) {
        console.log("cme_handler" + o);
        console.log(o);
    }
    /* Datahandler for high speed stream */
    function hss_handler(o) {
        console.log("hss_handler");
        console.log(o);
    }
    let dataSets = [
        { /* 0 */ 'dsname': 'Coronal Mass Ejection (CME)', 'url': 'https://api.nasa.gov/DONKI/CME', 'handler': cme_handler },
        { /* 1 */ 'dsname': 'Coronal Mass Ejection (CME) Analysis', 'url': 'https://api.nasa.gov/DONKI/CMEAnalysis?startDate=2016-09-01&endDate=2016-09-30&mostAccurateOnly=true&speed=500&halfAngle=30&catalog=ALL&api_key=DEMO_KEY', 'handler': null },
        { /* 2 */ 'dsname': 'Geomagnetic Storm (GST)', 'url': 'https://api.nasa.gov/DONKI/GST?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY', 'handler': null },
        { /* 3 */ 'dsname': 'Interplanetary Shock (IPS)', 'url': 'https://api.nasa.gov/DONKI/IPS?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&location=LOCATION&catalog=CATALOG&api_key=DEMO_KEY', 'handler': null },
        { /* 4 */ 'dsname': 'Solar Flare (FLR)', 'url': 'https://api.nasa.gov/DONKI/FLR?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY', 'handler': null },
        { /* 5 */ 'dsname': 'Solar Energetic Particle (SEP)', 'url': 'https://api.nasa.gov/DONKI/SEP?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY', 'handler': null },
        { /* 6 */ 'dsname': 'Magnetopause Crossing (MPC)', 'url': 'https://api.nasa.gov/DONKI/MPC?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY', 'handler': null },
        { /* 7 */ 'dsname': 'Radiation Belt Enhancement (RBE)', 'url': 'https://api.nasa.gov/DONKI/RBE?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY', 'handler': null },
        { /* 8 */ 'dsname': 'Hight Speed Stream (HSS)', 'url': 'https://api.nasa.gov/DONKI/HSS', "handler": hss_handler },
        { /* 9 */ 'dsname': 'WSA+EnlilSimulation', 'url': 'https://api.nasa.gov/DONKI/WSAEnlilSimulations?startDate=2016-01-06&endDate=2016-01-06&api_key=DEMO_KEY', "handler": null },
        { /* 10 */ 'dsname': 'Notifications', 'url': 'https://api.nasa.gov/DONKI/notifications', 'handler': DumpReports }
    ];
    /**
     * fetch data from the NASA open api datasets
     */
    function api_get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = url + "?api_key=" + API_KEY;
            console.log('api_get(' + query + ')');
            const response = yield fetch(query);
            const body = yield response.json();
            return body;
        });
    }
    /**
    *  This is called every time a data set button is cliaked
    */
    function handleClick(ev) {
        console.log("handeClick " + this.id);
        let p = api_get(dataSets[this.id].url);
        p.then((o) => { dataSets[this.id].handler(o); });
    }
    /**
     * PLace a botton wihe the name of the data set of the screen. if you click the button the
     * dataset is downloaded. Before a dataset becomes visible make sure the that index.html
     * contains a dummy button. The Id should bb equal to the position in the dataSets aray.
     */
    function AddButtom(id) {
        const btn = document.getElementById(id);
        let name = dataSets[id].dsname;
        let url = dataSets[id].url;
        btn.innerText = name;
        btn.addEventListener('click', handleClick);
    }
    class Datasets {
        render() {
            for (let i = 0; i < dataSets.length; ++i)
                AddButtom(i);
        }
    }
    /**
     * Facade Pattern implementation
     */
    class Facade {
        constructor(ds, pod) {
            this.ds = ds;
            this.pod = pod;
        }
        render() {
            this.ds.render();
            this.pod.render();
        }
    }
    class PictureOfTheDay {
        constructor(title, url, explanation) {
            let data = api_get("https://api.nasa.gov/planetary/apod");
            console.log(data);
            data.then((o) => {
                this.img_url = o.url;
                this.title = o.title;
                this.explain = o.explanation;
                this.render();
            });
        }
        render() {
            const result = document.getElementById("apod");
            if (typeof this.title !== 'undefined') {
                result.innerHTML += `<h2>${this.title}</h2><div>
                              ${this.explain}`;
                result.innerHTML += `<img width="500px" src="${this.img_url}"></img></div>`;
            }
        }
    }
    let data = api_get("https://api.nasa.gov/planetary/apod");
    console.log(data);
    var facade;
    data.then((o) => {
        let pod;
        this.img_url = o.url;
        this.title = o.title;
        this.explain = o.explanation;
        pod = new PictureOfTheDay(o.title, o.url, o.explanation);
        pod.render();
        let ds = new Datasets();
        facade = new Facade(ds, pod).render();
    });
});
