<template>
<div class="v-test">
  some hren:
  {{LIBRARY}}
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'


export default {
  name: "test",

  computed:{
    ...mapGetters([
      'LIBRARY'
    ])
  },
  methods: {
    ...mapActions([
        'GET_LIBRARY_FROM_API'
    ])
  },
  mounted(){
    this.GET_LIBRARY_FROM_API()
    .then((response) =>{
        if(response.data){
          console.log(response.data);
        }
    })
  }
}
</script>

<style scoped>

</style>