import { API_KEY } from './lib.js';

console.log("API Key: " + API_KEY)


document.addEventListener('DOMContentLoaded', function () {
  interface dsInfo {
    dsname: string;
    url:    string;
  }

  interface APOD {
    url: string;
    title: string;
    explaination: string;
  }

  let dataSets: Array<dsInfo> = [{ 'dsname': 'Coronal Mass Ejection (CME)', 'url': 'https://api.nasa.gov/DONKI/CME?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY' },
  { 'dsname': 'Coronal Mass Ejection (CME) Analysis', 'url': 'https://api.nasa.gov/DONKI/CMEAnalysis?startDate=2016-09-01&endDate=2016-09-30&mostAccurateOnly=true&speed=500&halfAngle=30&catalog=ALL&api_key=DEMO_KEY' },
  { 'dsname': 'Geomagnetic Storm (GST)', 'url': 'https://api.nasa.gov/DONKI/GST?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY' },
  { 'dsname': 'Interplanetary Shock (IPS)', 'url': 'https://api.nasa.gov/DONKI/IPS?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&location=LOCATION&catalog=CATALOG&api_key=DEMO_KEY' },
  { 'dsname': 'Solar Flare (FLR)', 'url': 'https://api.nasa.gov/DONKI/FLR?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY' },
  { 'dsname': 'Solar Energetic Particle (SEP)', 'url': 'https://api.nasa.gov/DONKI/SEP?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY' },
  { 'dsname': 'Magnetopause Crossing (MPC)', 'url': 'https://api.nasa.gov/DONKI/MPC?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY' },
  { 'dsname': 'Radiation Belt Enhancement (RBE)', 'url': 'https://api.nasa.gov/DONKI/RBE?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY' },
  { 'dsname': 'Hight Speed Stream (HSS)', 'url': 'https://api.nasa.gov/DONKI/HSS'},
  { 'dsname': 'WSA+EnlilSimulation', 'url': 'https://api.nasa.gov/DONKI/WSAEnlilSimulations?startDate=2016-01-06&endDate=2016-01-06&api_key=DEMO_KEY' },
  { 'dsname': 'Notifications', 'url': 'https://api.nasa.gov/DONKI/notifications' }
  ]

  async function api_get(url : string ) {
    let query = url + "?api_key=" + API_KEY;
    console.log('api_get(' + query + ')')

    const response = await fetch(query)
    const body = await response.json();
    return body;
  }

  function handleClick(this, ev) {
    let data=document.getElementById("data");
    let p = api_get(dataSets[this.id].url);
    p.then( (o) => {
      console.log(o)
      if( Array.isArray(o)) {
        for(let e of o) {
           let message = e.messageBody.replace("##", "<br>");
           data.innerHTML += `<div>${e.messageType} ${e.messageID} - <a href="${e.messageURL}">read more"</a - ${message}</div>`
        }
      }
      })
  }

  /**
   * PLace a botton wihe the name of the data set of the screen. if you clik the button the
   * dataset is downloaded.
   */
  function addDataSet(name: string, id: number, link: string) {
      console.log( "addDataSet("+ name + ", Id:"+ id + ",url" + link)
      const datalist = <HTMLInputElement>document.getElementById("dataSetList");

      datalist.innerHTML += `<button id="${id}" type="button" class="btn btn-info">${name}</button>`
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
      const datalist = <HTMLInputElement>document.getElementById("data-display");

      if (typeof this.title !== 'undefined') {

        datalist.innerHTML += `<h2>${this.title}</h2>
                              <div>${this.explain}</div>`
        datalist.innerHTML += `<img width="500px" src="${this.img_url}"></img>`;
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
