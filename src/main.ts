import { API_KEY, fetchData } from "./lib.js";

console.log( "API Key: " + API_KEY ) 

document.addEventListener('DOMContentLoaded', function () {
  console.log("html rendering done")
  interface dsInfo {
    dsname: string;
    url:    string;
  }


  let dataSets: Array<dsInfo> = [{ 'dsname': 'Coronal Mass Ejection (CME)', 'url': 'https://api.nasa.gov/DONKI/CME?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY' },
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
  ]

  class PictureOfTheDay {
    render() {
        
    }
  }


  class Datasets {
    private datalist = <HTMLInputElement>document.getElementById("dataSetList")

    render() {
      for (let i = 0; i < dataSets.length; ++i) {
        console.log(dataSets[i].dsname)
        this.datalist.innerHTML += `<button type="button class="btn btn-info">${dataSets[i].dsname}</button>`
      }
    }
  }

  /**
   * Facade Pattern implementation
   */
  class Facade {
    private ds

    constructor(ds: Datasets) {
      this.ds = ds;
    }

    render() {
      this.ds.render();
    }
  }

  let ds = new Datasets();
  new Facade(ds).render()

})