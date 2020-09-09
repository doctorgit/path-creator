<template>
  <div class='list'>
    <b-steps
      label-position='left'
      position='left'
      vertical
      v-model="activeStep"
      @input='onChangeActiveStep'
      destroy-on-hide
    >
      <template v-for='(step, stepIndex) in steps'>
        <b-step-item
          :key='stepIndex'
          :label='getStepLabel(stepIndex)'>
          <template v-for='(row, index) of step'>
            <ListItem :key='index' :stepId='stepIndex' :rowId='index' :item='row' />
          </template>
          <AddListItem :stepIndex='stepIndex' />
        </b-step-item>
      </template>
      <template
        slot="navigation"
        slot-scope="{previous, next}">
        <div class="step-navigation buttons">
          <b-button
            class='button'
            :disabled="previous.disabled"
            @click.prevent="previous.action"
            rounded
          >
            Previous
          </b-button>
          <b-button
            class='button'
            :disabled="next.disabled"
            @click.prevent="next.action"
            rounded
          >
            Next
          </b-button>
        </div>
      </template>
    </b-steps>
  </div>
</template>

<script>
import { EventRow } from '@/store';
import ListItem from '@/components/ListItem';
import AddListItem from '@/components/AddListItem';

export default {
  data() {
    return {
      activeStep: 0,
      activePos: 0,
      newRowData: new EventRow(),
    };
  },
  methods: {
    getStepLabel(index) {
      return `${index + 1} step`;
    },

    onChangeActiveStep() {
      this.$store.commit('setActiveStep', this.activeStep);
    },
  },
  computed: {
    steps() {
      return this.$store.getters.path;
    },
  },
  components: {
    ListItem,
    AddListItem,
  },
};
</script>
