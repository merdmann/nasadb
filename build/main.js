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
    let dataSets = [{ 'dsname': 'Coronal Mass Ejection (CME)', 'url': 'https://api.nasa.gov/DONKI/CME?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY' },
        { 'dsname': 'Coronal Mass Ejection (CME) Analysis', 'url': 'https://api.nasa.gov/DONKI/CMEAnalysis?startDate=2016-09-01&endDate=2016-09-30&mostAccurateOnly=true&speed=500&halfAngle=30&catalog=ALL&api_key=DEMO_KEY' },
        { 'dsname': 'Geomagnetic Storm (GST)', 'url': 'https://api.nasa.gov/DONKI/GST?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY' },
        { 'dsname': 'Interplanetary Shock (IPS)', 'url': 'https://api.nasa.gov/DONKI/IPS?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&location=LOCATION&catalog=CATALOG&api_key=DEMO_KEY' },
        { 'dsname': 'Solar Flare (FLR)', 'url': 'https://api.nasa.gov/DONKI/FLR?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY' },
        { 'dsname': 'Solar Energetic Particle (SEP)', 'url': 'https://api.nasa.gov/DONKI/SEP?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY' },
        { 'dsname': 'Magnetopause Crossing (MPC)', 'url': 'https://api.nasa.gov/DONKI/MPC?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY' },
        { 'dsname': 'Radiation Belt Enhancement (RBE)', 'url': 'https://api.nasa.gov/DONKI/RBE?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY' },
        { 'dsname': 'Hight Speed Stream (HSS)', 'url': 'https://api.nasa.gov/DONKI/HSS?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY' },
        { 'dsname': 'WSA+EnlilSimulation', 'url': 'https://api.nasa.gov/DONKI/WSAEnlilSimulations?startDate=2016-01-06&endDate=2016-01-06&api_key=DEMO_KEY' },
        { 'dsname': 'Notifications', 'url': 'https://api.nasa.gov/DONKI/notifications?startDate=2014-05-01&endDate=2014-05-08&type=all&api_key=DEMO' }
    ];
    class Datasets {
        constructor() {
            this.datalist = document.getElementById("dataSetList");
        }
        render() {
            for (let i = 0; i < dataSets.length; ++i) {
                console.log(dataSets[i].dsname);
                this.datalist.innerHTML += `<button type="button class="btn btn-info">${dataSets[i].dsname}</button>`;
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
        constructor() {
            function api_get(url) {
                return __awaiter(this, void 0, void 0, function* () {
                    const response = yield fetch(url + "?api_key=" + API_KEY);
                    const body = yield response.json();
                    return body;
                });
            }
            let data = api_get("https://api.nasa.gov/planetary/apod");
            console.log(data);
            data.then((o) => {
                this.img_url = o.url;
                this.title = o.title;
                this.explain = o.explanation;
                this.render();
            });
            /*
            this.img_url = data.url;
            this.title = data.title;
            this.explain = data.explaination;
            */
            console.log("url:" + this.img_url);
            console.log("title:" + this.title);
            console.log("explain:" + this.explain);
        }
        render() {
            const datalist = document.getElementById("data-display");
            datalist.innerHTML += `<h2>${this.title}<h2>
                             <div>${this.explain}<div>`;
            datalist.innerHTML += `<img src="${this.img_url}"></img>`;
        }
    }
    let ds = new Datasets();
    let pod = new PictureOfTheDay();
    new Facade(ds, pod).render();
});
