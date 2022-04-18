<template>
  <div style="width: 256px">
    <a-menu
      :selected-keys="selectedKeys"
      :open-keys.sync="openKeys"
      mode="inline"
      :theme="theme"
      :inlineCollapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="handleMenuItem(item)"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from './SubMenu.vue'
export default {
  props: {
    theme: {
      type: String,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'sub-menu': SubMenu
  },
  data() {
    this.selectedKeysMap = {}
    this.openKeysMap = {}
    const menuData = this.getMenuData(this.$router.options.routes)
    return {
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    }
  },
  computed: {
    isCollapsed() {
      return this.collapsed
    }
  },
  watch: {
    '$route.path': function (val) {
      this.selectedKeys = this.selectedKeysMap[val]
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val]
    },
    collapsed(val) {
      if (val) {
        this.openKeys = []
      } else {
        this.openKeys = this.openKeysMap[this.$route.path]
      }
    }
  },
  methods: {
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = []
      routes.forEach((item) => {
        this.openKeysMap[item.path] = parentKeys
        this.selectedKeysMap[item.path] = [selectedKey || item.path]
        if (item.name && !item.hideInMenu) {
          const newItem = { ...item }
          delete newItem.children
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path
            ])
          } else {
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            )
          }
          menuData.push(newItem)
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          )
        }
      })

      return menuData
    },
    handleMenuItem(item) {
      this.$router.push({
        path: item.path,
        query: this.$route.query
      })
    }
  }
}
</script>
