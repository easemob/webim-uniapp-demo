export default function convertGroupDetailsToGroupList(detailsData) {
  const groupListData = {};
  // 转换重合字段名
  groupListData.groupName = detailsData.name;
  groupListData.groupId = detailsData.id;
  groupListData.maxUsers = detailsData.maxusers;
  groupListData.allowInvites = detailsData.allowinvites;
  groupListData.affiliationsCount = detailsData.affiliations_count;
  //将返回群列表里面的不存在的属性从群详情新增。
  groupListData.shieldgroup = detailsData.shieldgroup;
  groupListData.affiliations = detailsData.affiliations;
  groupListData.mute = detailsData.mute;
  groupListData.custom = detailsData.custom;
  groupListData.created = detailsData.created;
  groupListData.owner = detailsData.owner;
  groupListData.membersonly = detailsData.membersonly;
  //两个数据结构重合的属性值
  groupListData.description = detailsData.description;
  groupListData.disabled = detailsData.disabled;
  groupListData.public = detailsData.public;

  return groupListData;
}
