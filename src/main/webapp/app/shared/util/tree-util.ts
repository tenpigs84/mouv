// key 为对象,对 一般用在选择多对多时或一对多时。应该包括id和name两个属性
export const toNzTreeNode = (items: any[], relationshipField: any, titleFieldName: string): any[] => {
  const nzTreeNode: any[] = [];
  if (!items) {
    return nzTreeNode;
  }
  items.forEach((item: any) => {
    const option = {
      title: item[titleFieldName],
      key: item,
      checked: relationshipField ? relationshipField.find((itemx: any) => itemx.id === item.id) : false,
      children: toNzTreeNode(item.children, relationshipField, titleFieldName),
    };
    nzTreeNode.push(option);
  });
  return nzTreeNode;
};

// key 为 id,比较id,直接比较id, 只能在子层选择父节点，不能在父层选择多个节点。一般用在选择子节点或多对一时。应该包括id和name两个属性
export const toNzTreeNodeKeyId = (items: any[], relationshipFieldId: any, titleFieldName: string, currentId?: any): any[] => {
  const nzTreeNode: any[] = [];
  if (!items) {
    return nzTreeNode;
  }
  items.forEach((item: any) => {
    const option = {
      title: item[titleFieldName],
      key: item.id,
      disabled: item.id === currentId, // 树形关系中自己不能选择自己做为上级对象。
      selected: item.id === relationshipFieldId,
      children: toNzTreeNodeKeyId(item.children, relationshipFieldId, titleFieldName, currentId),
    };
    nzTreeNode.push(option);
  });
  return nzTreeNode;
};
