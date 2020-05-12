<template name="img">
	<image class="avatar" :src="item.msg.data" style="width:90px;height:120px;margin:2px auto" mode="aspectFit" @tap="previewImage" :data-url="item.msg.data"></image>
</template>
<script>
  export default {
    name:"img",
    data() {
      return {
        
      };
    }
  }
</script>