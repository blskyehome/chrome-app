//弹出一个iframe层
$('.setmodal').on('click', function(){
  layer.open({
  type: 2,
  title: '设置网址',
  maxmin: true,
  shadeClose: false, //点击遮罩关闭层
  area : ['800px','250px'],
  content: 'addlink.html'
  });
});