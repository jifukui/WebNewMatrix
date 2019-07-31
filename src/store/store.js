import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    switchVideo:true,
    switchAfv:[],
    switchAll:[],
    switchAllA:[],
    portInfo:[],
    resetLoading:false,
    upgradeLoading:false,
    upgradeDeviceLoading:false,
    afvAll:false,
    upgradeNumbers:0,
    upgradeNumber:-1,
    temperature:[],
    voltage:[],
    fan:[],
    outRes:7,
    outputs:[0,0,0,0],
    outputsA:[0,0,0,0]
}


export default new Vuex.Store({
  state
})