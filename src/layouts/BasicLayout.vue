<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        v-model="collapsed"
        collapsible
        width="256px"
      >
        <div class="logo">Ant Design Vue Pro</div>
        <SiderMenu :theme="navTheme" :collapsed="collapsed" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          />
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <SettingDrawer />
  </div>
</template>

<script>
import Header from './Header.vue'
import SiderMenu from './SiderMenu.vue'
import Footer from './Footer.vue'
import SettingDrawer from '@/components/SettingDrawer'

export default {
  name: 'BasicLayout',
  data() {
    return {
      collapsed: false
    }
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || 'dark'
    },
    navLayout() {
      return this.$route.query.navLayout || 'left'
    }
  },
  components: {
    Header,
    SiderMenu,
    Footer,
    SettingDrawer
  }
}
</script>

<style lang="less" scoped>
.nav-theme-light {
  .logo {
    color: #001529;
  }
}
.logo {
  text-align: center;
  line-height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  color: #fff;
  font-weight: 700;
}
.trigger {
  width: 64px;
  line-height: 64px;
  font-size: 20px;

  &:hover {
    background-color: #eee;
  }
}
</style>
