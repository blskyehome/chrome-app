<template>
    <nav class="col-sm-3 col-md-2 d-none d-sm-block  sidebar">
        <ul class="nav nav-pills flex-column">
            <li class="nav-item">
                <a class="nav-link"  v-bind:class="active=='linkPage'?'active':''" href="link.html">链接</a>
            </li>
            <li class="nav-item">
                <a class="nav-link "  v-bind:class="active=='categoryPage'?'active':''" href="category.html">分类</a>
            </li>
            <li class="nav-item">
                <a class="nav-link"  v-bind:class="active=='categoryNewPage'?'active':''"  href="category-new.html">新建分类</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" v-bind:class="active=='importPage'?'active':''" href="import.html">导入</a>
            </li>
        </ul>
    </nav>
</template>
<script>
  export default{
    name: 'SidebarMenu',
    data(){
      return{
        isActive:'import'
      }
    },
    props: {
      active: {
        type: String,
        default:'options'
      }
    },

  }
</script>