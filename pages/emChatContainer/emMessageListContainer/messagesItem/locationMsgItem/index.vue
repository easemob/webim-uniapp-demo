<template>
  <view class="location_msg_container" @click="openMap">
    <u--text
      :lines="1"
      :text="msgBody.buildingName ? msgBody.buildingName : '未知建筑'"
    ></u--text>
    <u--text
      :lines="1"
      :text="msgBody.addr ? msgBody.addr : '未知建筑'"
    ></u--text>
    <img
      class="map_image_container"
      :src="`${AMAP_API_URL}${location}&zoom=10&size=400*200&scale=1&markers=mid,,A:${msgBody.lng},${msgBody.lat}&key=${AMAP_KEY}`"
    />
  </view>
</template>

<script>
// const AMAP_KEY = 'b3881602546852c0283ad73652032c89';
const AMAP_KEY = 'YOUR AMAP_KEY HERE';
const AMAP_API_URL = 'https://restapi.amap.com/v3/staticmap?';

export default {
  props: {
    msgBody: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      AMAP_KEY,
      AMAP_API_URL,
      id: 0, // 使用 marker点击事件 需要填写id
      title: 'map',
      latitude: 39.909,
      longitude: 116.39742,
      covers: [
        {
          latitude: 39.909,
          longitude: 116.39742,
          iconPath: '../../../static/location.png',
        },
        {
          latitude: 39.9,
          longitude: 116.39,
          iconPath: '../../../static/location.png',
        },
      ],
    };
  },
  computed: {
    location() {
      return `location=${this.msgBody.lng},${this.msgBody.lat}`;
    },
  },
  methods: {
    openMap() {
      uni.openLocation({
        latitude: this.msgBody.lat,
        longitude: this.msgBody.lng,
        success: function () {
          console.log('success');
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.location_msg_container {
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #cccccc44;
  padding: 5px;
  border-radius: 5px;
}
.map_image_container {
  width: 100%;
  height: 60px;
  background: #ccc;
  border-radius: 5px;
  overflow: hidden;
}
.cover-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.7);
}
</style>
