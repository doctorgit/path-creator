<template>
  <div id='app' class='container'>
    <div class='container'>
      <Menu />
    </div>
    <List />
    <a id='download_json_helper' style='display:none'></a>
  </div>
</template>

<script>
import List from '@/components/List';
import Menu from '@/components/Menu';

export default {
  name: 'App',
  components: {
    List,
    Menu,
  },
};
</script>
