<template>
    <nav class="col-sm-3 col-md-2 d-none d-sm-block bg-faded sidebar">
        <ul class="nav nav-pills flex-column">
            <li class="nav-item">
                <a class="nav-link" href="link.html">链接</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="category.html">分类</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="category-new.html">新建分类</a>
            </li>
        </ul>
    </nav>
</template>
<script>
  export default{
    name: 'SidebarMenu',
    props: {
      active: {
        type: String
      }
    },

  }
</script>