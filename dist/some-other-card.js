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
  
  customElements.define('ha-custom-card-test2', HaCustomTestCard2); 
  window.customCards.push({
    type: 'ha-custom-card-test2',
    name: 'Iain Test Card 2',
    preview: false,
    description: 'This card displays stuff 2',
  });