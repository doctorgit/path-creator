import Vue from 'vue';
import Vuex from 'vuex';
import { EVENTS_MAP } from '@/constants';

Vue.use(Vuex);

class EventRow {
  constructor(name = '', amount = 0) {
    this.name = name;
    this.amount = amount;
  }
}

export default new Vuex.Store({
  state: {
    activeStep: 0,
    pathName: '',
    path: [{}],
    events: EVENTS_MAP,
  },
  mutations: {
    setActiveStep(state, value) {
      state.activeStep = value;
    },

    changePathName(state, { value }) {
      state.pathName = value;
    },

    addPath(state, payload) {
      const newArr = state.path.slice();
      newArr.push(payload);
      state.path = newArr;
    },

    addRowToPath(state, { stepId, data }) {
      const newEvents = {
        ...state.path[stepId],
        ...data,
      };
      const newArr = state.path.slice();
      newArr[stepId] = newEvents;
      state.path = newArr;
    },

    deleteRowFromPath(state, { stepId, rowId }) {
      const newArr = state.path.slice();
      delete newArr[stepId][rowId];
      state.path = newArr;
    },

    updateStepRow(state, {
      stepId,
      rowId,
      value,
      prop,
    }) {
      state.path[stepId].rows[rowId][prop] = value;
    },
  },
  actions: {
    addStep({ commit }) {
      commit('addPath', {});
    },

    addStepRow({ commit }, payload) {
      commit('addRowToPath', payload);
    },

    deleteStepRow({ commit }, payload) {
      commit('deleteRowFromPath', payload);
    },

    downloadJson({ getters }) {
      const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(getters.path))}`;
      const helperElem = document.getElementById('download_json_helper');

      helperElem.setAttribute('href', dataStr);
      helperElem.setAttribute('download', `${getters.pathName}.json`);
      helperElem.click();
    },
  },
  getters: {
    pathName: (state) => state.pathName,
    path: (state) => state.path,
    events: (state) => state.events,
    activeStep: (state) => state.activeStep,
    hasEmptyStep: ({ path }) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const step of path) {
        if (Object.keys(step).length === 0) {
          return true;
        }
      }
      return false;
    },
    filteredEvents: ({ events, path, activeStep }) => {
      const currentStep = path[activeStep];

      return events.filter((event) => !(event in currentStep));
    },
  },
  modules: {
  },
});

export { EventRow };
