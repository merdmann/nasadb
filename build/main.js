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
        let data = document.getElementById("data");
        if (Array.isArray(o)) {
            for (let e of o) {
                let message = e.messageBody.replace("##", "<br>");
                data.innerHTML += `<div>${e.messageType} ${e.messageID} - <a href="${e.messageURL}">read more"</a - ${message}</div>`;
            }
        }
    }
    let dataSets = [
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
    function api_get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = url + "?api_key=" + API_KEY;
            console.log('api_get(' + query + ')');
            const response = yield fetch(query);
            const body = yield response.json();
            return body;
        });
    }
    function handleClick(ev) {
        let p = api_get(dataSets[this.id].url);
        p.then((o) => { dataSets[this.id].handler(o); });
    }
    /**
     * PLace a botton wihe the name of the data set of the screen. if you clik the button the
     * dataset is downloaded.
     */
    function addDataSet(name, id, link) {
        console.log("addDataSet(" + name + ", Id:" + id + ",url" + link);
        const datalist = document.getElementById("dataSetList");
        datalist.innerHTML += `<button id="${id}" type="button" class="buttons btn btn-info">${name}</button>`;
        const Btn = document.getElementById("" + id);
        Btn.addEventListener('click', handleClick, true);
    }
    class Datasets {
        /* this will put a a clicable element for each data set */
        render() {
            for (let i = 0; i < dataSets.length; ++i) {
                addDataSet(dataSets[i].dsname, i, dataSets[i].url);
            }
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
            const datalist = document.getElementById("data-display");
            if (typeof this.title !== 'undefined') {
                datalist.innerHTML += `<h2>${this.title}</h2>
                              <div>${this.explain}</div>`;
                datalist.innerHTML += `<img width="500px" src="${this.img_url}"></img>`;
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
