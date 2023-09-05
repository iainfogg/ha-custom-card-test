class HaCustomTestCard extends HTMLElement {
  // Whenever the state changes, a new `hass` object is set. Use this to
  // update your content.
  set hass(hass) {
    // Initialize the content if it's not there yet.
    if (!this.content) {
      this.innerHTML = `
        <ha-card header="Predbat Entities">
          <div class="card-content"></div>
        </ha-card>
      `;
      this.content = this.querySelector("div");
    }

    const entityId = 'predbat.status';
    console.log(entityId);
    const state = hass.states[entityId];
    const stateStr = state ? state.state : "unavailable";

    this.content.innerHTML = `
      The state of ${entityId} is ${stateStr}!
      <br><br>
      <img src="http://via.placeholder.com/350x150">
    `;
  }

  // The user supplied configuration. Throw an exception and Home Assistant
  // will render an error card.
  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define('ha-custom-card-test', HaCustomTestCard); 
window.customCards.push({
  type: 'ha-custom-card-test',
  name: 'Iain Test Card',
  preview: false,
  description: 'This card displays stuff',
});


class HaCustomTestCard2 extends HTMLElement { 
  // Whenever the state changes, a new `hass` object is set. Use this to 
  // update your content. 
  set hass(hass) { 
    // Initialize the content if it's not there yet. 
    if (!this.content) { 
      this.innerHTML = ` 
        <ha-card header="Predbat Entities"> 
          <div class="card-content"></div> 
        </ha-card> 
      `; 
      this.content = this.querySelector("div"); 
    } 

    const entityId = 'predbat.cost_today'; 
    const state = hass.states[entityId]; 
    const stateStr = state ? state.state : "unavailable"; 

    this.content.innerHTML = ` 
      The state of ${entityId} is ${stateStr}. 
      <br><br> 
      <img src="http://via.placeholder.com/350x150"> 
    `; 
  } 

  // The user supplied configuration. Throw an exception and Home Assistant 
  // will render an error card. 
  setConfig(config) { 
    if (!config.entity) { 
      throw new Error("You need to define an entity"); 
    } 
    this.config = config; 
  } 

  // The height of your card. Home Assistant uses this to automatically 
  // distribute all cards over the available columns. 
  getCardSize() { 
    return 3; 
  } 
} 
  
customElements.define('some-other-card', HaCustomTestCard2);  
window.customCards.push({ 
  type: 'some-other-card', 
  name: 'Iain Test Card 2', 
  preview: false, 
  description: 'This card displays stuff 2', 
});


class PredbatCharts {

  static async generateView(info) {
    const cards = [];

    cards.push({
      "type": "custom:apexcharts-card",
      "header": {
         "show": true,
         "title": "Home Battery Prediction",
         "show_states": true,
         "colorize_states": true
      },
      "graph_span": "52h",
      "span": {
         "start": "minute",
         "offset": "-12h"
      },
      "now": {
         "show": true
      },
      "yaxis": [
         {
            "min": 0,
            "max": 9.54
         }
      ],
      "series": [
         {
            "entity": "predbat.soc_kw_h0",
            "stroke_width": 1,
            "curve": "smooth",
            "name": "actual",
            "extend_to": "now",
            "show": {
               "in_header": "raw"
            }
         },
         {
            "entity": "predbat.soc_kw",
            "stroke_width": 1,
            "curve": "smooth",
            "name": "base",
            "data_generator": "let res = []; for (const [key, value] of Object.entries(entity.attributes.results)) { res.push([new Date(key).getTime(), value]); } return res.sort((a, b) => { return a[0] - b[0]  })\n",
            "show": {
               "in_header": "raw"
            }
         },
         {
            "entity": "predbat.soc_kw_best",
            "stroke_width": 2,
            "curve": "smooth",
            "name": "best",
            "data_generator": "let res = []; for (const [key, value] of Object.entries(entity.attributes.results)) { res.push([new Date(key).getTime(), value]); } return res.sort((a, b) => { return a[0] - b[0]  })\n",
            "show": {
               "in_header": "raw"
            }
         },
         {
            "entity": "predbat.soc_kw_best10",
            "stroke_width": 1,
            "curve": "smooth",
            "name": "best10",
            "data_generator": "let res = []; for (const [key, value] of Object.entries(entity.attributes.results)) { res.push([new Date(key).getTime(), value]); } return res.sort((a, b) => { return a[0] - b[0]  })\n",
            "show": {
               "in_header": "raw"
            }
         },
         {
            "entity": "predbat.best_charge_limit_kw",
            "stroke_width": 1,
            "curve": "stepline",
            "name": "charge_limit_best",
            "data_generator": "let res = []; for (const [key, value] of Object.entries(entity.attributes.results)) { res.push([new Date(key).getTime(), value]); } return res.sort((a, b) => { return a[0] - b[0]  })\n",
            "show": {
               "in_header": "raw"
            }
         },
         {
            "entity": "predbat.charge_limit_kw",
            "stroke_width": 1,
            "curve": "stepline",
            "name": "charge_limit_base",
            "data_generator": "let res = []; for (const [key, value] of Object.entries(entity.attributes.results)) { res.push([new Date(key).getTime(), value]); } return res.sort((a, b) => { return a[0] - b[0]  })\n",
            "show": {
               "in_header": "raw"
            }
         },
         {
            "entity": "predbat.best_discharge_limit_kw",
            "stroke_width": 1,
            "curve": "stepline",
            "name": "discharge_best",
            "data_generator": "let res = []; for (const [key, value] of Object.entries(entity.attributes.results)) { res.push([new Date(key).getTime(), value]); } return res.sort((a, b) => { return a[0] - b[0]  })\n",
            "show": {
               "in_header": "raw"
            }
         },
         {
            "entity": "predbat.record",
            "stroke_width": 2,
            "curve": "stepline",
            "name": "record",
            "type": "column",
            "color": "black",
            "data_generator": "let res = []; for (const [key, value] of Object.entries(entity.attributes.results)) { res.push([new Date(key).getTime(), value]); } return res.sort((a, b) => { return a[0] - b[0]  })\n",
            "show": {
               "in_header": "raw"
            }
         },
         {
            "entity": "predbat.soc_kw_base10",
            "stroke_width": 1,
            "curve": "smooth",
            "name": "base10",
            "data_generator": "let res = []; for (const [key, value] of Object.entries(entity.attributes.results)) { res.push([new Date(key).getTime(), value]); } return res.sort((a, b) => { return a[0] - b[0]  })\n",
            "show": {
               "in_header": "raw"
            }
         }
      ]


    });

    return {
      cards: [
        {
          type: "grid",
          cards,
        },
      ],
    };
  }
}

customElements.define("ll-strategy-predbat-charts-view", PredbatCharts);
