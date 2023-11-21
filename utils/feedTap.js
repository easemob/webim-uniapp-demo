const onFeedTap = () => {
  let platform = uni.getSystemInfoSync().platform;
  // #ifdef APP-PLUS
  if (platform == 'ios') {
    let UIImpactFeedbackGenerator = plus.ios.importClass(
      'UIImpactFeedbackGenerator'
    );
    let impact = new UIImpactFeedbackGenerator();
    impact.prepare();
    impact.init(1);
    impact.impactOccurred();
  }
  if (platform == 'android') {
    uni.vibrateShort();
  }
  // #endif
};
export default onFeedTap;
