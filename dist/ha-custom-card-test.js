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


class StrategyDemo {

  static async generateDashboard(info) {
    // Query all data we need. We will make it available to views by storing it in strategy options.
    const [areas, devices, entities] = await Promise.all([
      info.hass.callWS({ type: "config/area_registry/list" }),
      info.hass.callWS({ type: "config/device_registry/list" }),
      info.hass.callWS({ type: "config/entity_registry/list" }),
    ]);

    // Each view is based on a strategy so we delay rendering until it's opened
    return {
      views: areas.map((area) => ({
        strategy: {
          type: "custom:my-demo",
          options: { area, devices, entities },
        },
        title: area.name,
        path: area.area_id,
      })),
    };
  }

  static async generateView(info) {
    const { area, devices, entities } = info.view.strategy.options;

    const areaDevices = new Set();

    // Find all devices linked to this area
    for (const device of devices) {
      if (device.area_id === area.area_id) {
        areaDevices.add(device.id);
      }
    }

    const cards = [];

    // Find all entities directly linked to this area
    // or linked to a device linked to this area.
    for (const entity of entities) {
      if (
        entity.area_id
          ? entity.area_id === area.area_id
          : areaDevices.has(entity.device_id)
      ) {
        cards.push({
          type: "button",
          entity: entity.entity_id,
        });
      }
    }

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

customElements.define("ll-strategy-my-demo", StrategyDemo);
