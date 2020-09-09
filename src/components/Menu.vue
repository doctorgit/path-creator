<template>
  <section>
    <b-field horizontal>
      <b-input
        placeholder='Enter name of path'
        :value='pathName'
        @input='onChangePathName($event)'
        rounded />
      <div class='buttons'>
        <b-button @click='onAddStep' rounded>Add step</b-button>
        <b-button @click='onDownloadJson' :disabled='isDownloadDisabled' rounded>
          Download JSON
        </b-button>
      </div>
    </b-field>
  </section>
</template>

<script>

export default {
  methods: {
    onAddStep() {
      this.$store.dispatch('addStep');
    },

    onDownloadJson() {
      this.$store.dispatch('downloadJson');
    },

    onChangePathName(value) {
      this.$store.commit('changePathName', {
        value,
      });
    },
  },
  computed: {
    pathName() {
      return this.$store.getters.pathName;
    },

    isDownloadDisabled() {
      return !(this.$store.getters.pathName)
        || !(this.$store.getters.path)
        || this.$store.getters.hasEmptyStep;
    },
  },
};
</script>
