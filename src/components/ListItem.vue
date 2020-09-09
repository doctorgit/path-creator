<template>
  <div class="content">
    <b-field grouped group-multiline>
      <b-field label='Event' label-position='on-border'>
        <b-input :value='rowId'
                  placeholder='Select event'
                  rounded
                  disabled
                 style='width: 298px;'
        >
        </b-input>
      </b-field>
      <b-field label='Amount' label-position='on-border'>
        <b-numberinput
          :value='item.amount'
          style='width: 160px;'
          controls-position='compact'
          controls-rounded
          @change='onChangeRowQuantity($event, stepId, rowId)'
          min="1"
        />
      </b-field>
      <b-field>
        <b-button
          class='button'
          @click='onDeleteRow(stepId, rowId)' rounded
        >
          Delete
        </b-button>
      </b-field>
    </b-field>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    isNew: Boolean,
    stepId: Number,
    rowId: String,
  },
  computed: {
    getEventsMap() {
      console.log(this);
      return this.$store.getters.events;
    },

    filteredSelect() {
      return this.$store.getters.events;
    },
  },
  methods: {
    onChangeRowSelector(value, stepId, rowId) {
      this.$store.commit('updateStepRow', {
        value, stepId, rowId, prop: 'name',
      });
    },

    onChangeRowQuantity(value, stepId, rowId) {
      this.$store.commit('updateStepRow', {
        value, stepId, rowId, prop: 'amount',
      });
    },

    onDeleteRow(stepId, rowId) {
      this.$store.dispatch('deleteStepRow', { stepId, rowId });
    },
  },
};
</script>
