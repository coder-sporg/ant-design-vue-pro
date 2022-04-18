<template>
  <div>
    <a-drawer
      width="300px"
      placement="right"
      maskClosable
      @close="visible = false"
      :visible="visible"
    >
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'" />
        </div>
      </template>
      <div class="content">
        <h3>整体风格设置</h3>
        <a-radio-group
          :value="$route.query.navTheme || 'dark'"
          @change="(e) => handleSettingChange('navTheme', e.target.value)"
        >
          <a-radio value="dark">黑色</a-radio>
          <a-radio value="light">白色</a-radio>
        </a-radio-group>
        <h3>导航模式</h3>
        <a-radio-group
          :value="$route.query.navLayout || 'left'"
          @change="(e) => handleSettingChange('navLayout', e.target.value)"
        >
          <a-radio value="left">左侧</a-radio>
          <a-radio value="top">顶部</a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleSettingChange(type, value) {
      this.$router.push({ query: { ...this.$router.query, [type]: value } })
    }
  }
}
</script>

<style lang="less" scoped>
.handle {
  width: 48px;
  height: 48px;
  line-height: 48px;
  background-color: #1980ff;
  position: absolute;
  top: 45%;
  right: 300px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  border-radius: 3px 0 0 3px;
  cursor: pointer;
}
</style>
