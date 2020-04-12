import { API_KEY } from './lib.js';

console.log("API Key: " + API_KEY)


document.addEventListener('DOMContentLoaded', function () {

  interface dsInfo {
    dsname: string;
    url:    string;
    handler: any
  }

  /* Data handler fo space weather reports */
  function DumpReports(o) {
    console.log("DumpReports")
    let data=document.getElementById("space-weather");

    if( Array.isArray(o) ) {
        for(let e of o) {
          console.log(e);

          let message = e.messageBody.replace("##", "<br>");
          data.innerHTML += `<div class="message"><div class="${e.messageType}"> ${e.messageID}</div> - <a href="${e.messageURL}">read more"</a - ${message}</div><br>`
        }
    }
  }

  /* Datahandler for corona mass ejection data */
  function cme_handler(o) {
    console.log("cme_handler" + o); console.log(o);
  }
  
  /* Datahandler for high speed stream */
  function hss_handler(o) {
    console.log("hss_handler"); 
    console.log(o);
  }

  let dataSets: Array<dsInfo> = [
  { /* 0 */   'dsname': 'Coronal Mass Ejection (CME)', 'url': 'https://api.nasa.gov/DONKI/CME', 'handler': cme_handler},
  { /* 1 */   'dsname': 'Coronal Mass Ejection (CME) Analysis', 'url': 'https://api.nasa.gov/DONKI/CMEAnalysis?startDate=2016-09-01&endDate=2016-09-30&mostAccurateOnly=true&speed=500&halfAngle=30&catalog=ALL&api_key=DEMO_KEY', 'handler': null  },
  { /* 2 */   'dsname': 'Geomagnetic Storm (GST)', 'url': 'https://api.nasa.gov/DONKI/GST?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY', 'handler':null },
  { /* 3 */   'dsname': 'Interplanetary Shock (IPS)', 'url': 'https://api.nasa.gov/DONKI/IPS?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&location=LOCATION&catalog=CATALOG&api_key=DEMO_KEY', 'handler':null },
  { /* 4 */   'dsname': 'Solar Flare (FLR)', 'url': 'https://api.nasa.gov/DONKI/FLR?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY', 'handler': null },
  { /* 5 */   'dsname': 'Solar Energetic Particle (SEP)', 'url': 'https://api.nasa.gov/DONKI/SEP?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY', 'handler': null },
  { /* 6 */   'dsname': 'Magnetopause Crossing (MPC)', 'url': 'https://api.nasa.gov/DONKI/MPC?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY', 'handler': null},
  { /* 7 */   'dsname': 'Radiation Belt Enhancement (RBE)', 'url': 'https://api.nasa.gov/DONKI/RBE?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY', 'handler': null },
  { /* 8 */   'dsname': 'Hight Speed Stream (HSS)', 'url': 'https://api.nasa.gov/DONKI/HSS', "handler": hss_handler },
  { /* 9 */   'dsname': 'WSA+EnlilSimulation', 'url': 'https://api.nasa.gov/DONKI/WSAEnlilSimulations?startDate=2016-01-06&endDate=2016-01-06&api_key=DEMO_KEY', "handler": null },
  { /* 10 */  'dsname': 'Notifications', 'url': 'https://api.nasa.gov/DONKI/notifications', 'handler': DumpReports }
  ]

  /**
   * fetch data from the NASA open api datasets
   */
  async function api_get(url : string ) {
    let query = url + "?api_key=" + API_KEY;
    console.log('api_get(' + query + ')')

    const response = await fetch(query)
    const body = await response.json();
    return body;
  }

  /**
  *  This is called every time a data set button is cliaked
  */
  function handleClick(this, ev) {
    console.log("handeClick " + this.id);
    let p = api_get(dataSets[this.id].url);
    p.then( (o) => { dataSets[ this.id ].handler(o)} )
  }

  /**
   * PLace a botton wihe the name of the data set of the screen. if you click the button the
   * dataset is downloaded. Before a dataset becomes visible make sure the that index.html 
   * contains a dummy button. The Id should bb equal to the position in the dataSets aray.
   */
  function AddButtom( id ) {
    const btn = <HTMLInputElement>document.getElementById(id);
    let name = dataSets[id].dsname;
    let url  = dataSets[id].url;
    
    btn.innerText = name;
    btn.addEventListener( 'click', handleClick);
  }


  class Datasets {
    render() {
      for( let i=0; i< dataSets.length; ++i)
        AddButtom(i);
    }
  }

  /**
   * Facade Pattern implementation
   */
  class Facade {
    private ds:  Datasets;
    private pod: PictureOfTheDay;

    constructor(ds: Datasets, pod: PictureOfTheDay) {
      this.ds = ds;
      this.pod = pod;
    }

    render() {
      this.ds.render();
      this.pod.render();
    }
  }

  class PictureOfTheDay {
    private img_url : string;
    private title : string ;
    private explain : string;

    constructor(title:string, url:string, explanation:string) {

    let data  = api_get("https://api.nasa.gov/planetary/apod" );
    console.log(data);

    data.then((o) => {
      this.img_url = o.url;
      this.title = o.title;
      this.explain = o.explanation;
      this.render()
      })
    }

    render() {
      const result = <HTMLInputElement>document.getElementById("apod");

      if (typeof this.title !== 'undefined') {

        result.innerHTML += `<h2>${this.title}</h2><div>
                              ${this.explain}`
        result.innerHTML += `<img width="500px" src="${this.img_url}"></img></div>`;
      }
    }
  }

  let data  = api_get("https://api.nasa.gov/planetary/apod" );
  console.log(data);

  var facade

  data.then((o) => {
    let pod: PictureOfTheDay;
    this.img_url = o.url;
    this.title = o.title;
    this.explain = o.explanation;
    pod = new PictureOfTheDay(o.title, o.url, o.explanation)
    pod.render()
    let ds = new Datasets();
    facade = new Facade(ds, pod).render()
    })
})
