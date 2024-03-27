<script>
  import NavBar from "./components/NavBar.vue"  

  export default {
    components: {
      "nav-bar": NavBar 
    }
  }
</script>


<template>
   <div>
      
       <nav-bar  />
     
      <div class="pt-12"   >
         <router-view/>
      </div>
     
   </div>
  
</template>
<style> 
  @import "@/assets/css/tailwind.css";
</style>
