<template name="video">
	<video :src="item.msg.data" controls autoplay></video>
</template>
<script>
  export default {
    name:"video",
    data() {
      return {
        
      };
    }
  }
</script>