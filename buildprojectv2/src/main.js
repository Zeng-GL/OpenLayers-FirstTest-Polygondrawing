import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ol/ol.css';
import Draw from 'ol/interaction/Draw';
import Map from 'ol/Map';
import View from 'ol/View';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
// import {transform} from 'ol/proj.js';

var raster = new TileLayer({
  source: new OSM(),
});

var source = new VectorSource({wrapX: false});

var vector = new VectorLayer({
  source: source,
});

var map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [13531676.196969533, 2880510.8993326635],
    zoom:10,
    minZoom:4,
    maxZoom:16
  })
});


var typeSelect = document.getElementById('type');

var draw; // global so we can remove it later
function addInteraction() {
  var value = typeSelect.value;
  if (value !== 'None') {
    draw = new Draw({
      source: source,
      type: typeSelect.value,
    });
    map.addInteraction(draw);
  }
}

/**
 * Handle change event.
 */
typeSelect.onchange = function () {
  map.removeInteraction(draw);
  addInteraction();
};

document.getElementById('undo').addEventListener('click', function () {
  let features = vector.getSource().getFeatures();
  features.forEach((feature) => {
    vector.getSource().removeFeature(feature);
  })

});

addInteraction();



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
