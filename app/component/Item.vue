<template>
    <li>
        <div
                :class="{bold: isFolder}"
              >
            <input type="checkbox">
            {{model.title}}
            <span v-if="isFolder"   @click="toggle"
                  @dblclick="changeType">[{{open ? '-' : '+'}}]</span>
        </div>
        <ul v-show="open" v-if="isFolder">
            <item
                    class="item"
                    v-for="model in model.children"
                    :model="model">
            </item>
            <!--<li class="add" @click="addChild">+</li>-->
        </ul>
    </li>
</template>
<script>
  export default{
    name: 'Item',
    props: {
      model: Object
    },
    data: function () {
      return {
        open: false
      }
    },
    computed: {
      isFolder: function () {
        console.log('Model',this.model)
        return this.model.children &&
          this.model.children.length
      }
    },
    methods: {
      toggle: function () {
        if (this.isFolder) {
          this.open = !this.open
        }
      },
      changeType: function () {
        if (!this.isFolder) {
          this.$set(this.model, 'children', [])
          this.addChild()
          this.open = true
        }
      },
      addChild: function () {
        this.model.children.push({
          title: 'new stuff'
        })
      }
    }

  }
</script>
<style>
    .item {
        cursor: pointer;
    }
    .bold {
        font-weight: bold;
    }
    ul {
        padding-left: 1em;
        line-height: 1.5em;
        list-style-type: dot;
    }
</style>