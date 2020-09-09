<template>
  <div class="content">
    <b-field v-if='filteredSelect.length !== 0' grouped group-multiline>
      <b-field>
        <b-select
          v-model='eventKey'
          placeholder='Select event'
          rounded
        >
          <template v-for='(event, index) in filteredSelect'>
            <option :key='index' :value='event'>
              {{ event }}
            </option>
          </template>
        </b-select>
      </b-field>
      <b-field label-position='on-border'>
        <b-numberinput
          v-model='amount'
          style='width: 160px;'
          controls-position='compact'
          controls-rounded
          min="0"
        />
      </b-field>
      <b-field>
        <b-button
          class='button'
          @click='onAddRow(stepIndex)'
          :disabled='!eventKey || !amount'
          rounded
        >
          Add row
        </b-button>
      </b-field>
    </b-field>
  </div>
</template>

<script>
export default {
  props: {
    stepIndex: Number,
  },
  data() {
    return {
      eventKey: '',
      amount: 0,
    };
  },
  computed: {
    filteredSelect() {
      return this.$store.getters.filteredEvents;
    },
  },
  methods: {
    onAddRow(stepId) {
      const newEvent = {
        [this.eventKey]: { amount: this.amount },
      };
      this.$store.dispatch('addStepRow', {
        stepId,
        data: newEvent,
      });
      this.amount = 0;
    },
  },
};
</script>
