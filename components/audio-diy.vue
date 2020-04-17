<template name="audio">
	<audio :src="item.msg.url" controls autoplay></audio>
</template>
<script>
  export default {
    name:"audio",
    data() {
      return {
        
      };
    }
  }
</script>
