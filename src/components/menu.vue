<script setup>
  import { ref, onMounted } from 'vue'
  import { group, theme } from '../pinia'
  import { screenWidth } from '../main'
  import axios from 'axios'

  // 主题切换
  const systemColor = matchMedia('(prefers-color-scheme: dark)')
  const themes = [
    { value: 'withSystem', label: '跟随系统' },
    { value: 'light', label: '亮色' },
    { value: 'dark', label: '暗色' }
  ]
  const followSystem = () => {
    if (systemColor.matches) {
      document.documentElement.setAttribute('data-theme', themes[2].value)
      document.querySelector('html').classList.add('dark')
    } else {
      document.documentElement.setAttribute('data-theme', themes[1].value)
      document.querySelector('html').classList.remove('dark')
    }
  }
  const changeTheme = (value) => {
    if (value == 'withSystem') {
      systemColor.addEventListener('change', followSystem)
      followSystem()
    } else {
      systemColor.removeEventListener('change', followSystem)
      document.documentElement.setAttribute('data-theme', value)
      if (value == 'light') document.querySelector('html').classList.remove('dark')
      else if (value == 'dark') document.querySelector('html').classList.add('dark')
    }
  }

  // 导航选择
  const chooseGroup = (index) => {
    group().index = index
  }

  // 初始化
  const groupNames = ref([])

  axios.get('/api/group-names?fields[0]=name').then((response) => {
    groupNames.value = response.data.data
  })

  const menuSwitch = () => {
    drawer.value = !drawer.value
  }

  const drawer = ref(false)

  onMounted(() => {
    systemColor.addEventListener('change', followSystem)
    followSystem()
  })
</script>

<template>
  <el-aside width="200px" v-if="screenWidth > 833">
    <el-menu class="menu desktopMenu" :default-active="String(group().index)" @select="chooseGroup">
      <el-menu-item class="item"><el-link target="_blank" :underline="false" href="https://jayhu.site">回主站</el-link></el-menu-item>
      <el-menu-item class="item">
        <span style="margin-right: 5px">主题</span>
        <el-select v-model="theme().theme" size="small" style="width: 100px" @change="changeTheme">
          <el-option v-for="theme in themes" :key="theme.value" :label="theme.label" :value="theme.value" />
        </el-select>
      </el-menu-item>
      <el-menu-item class="item" index="0"><span>全部</span></el-menu-item>
      <template v-for="groupName in groupNames">
        <el-menu-item class="item" :index="String(groupName.id)">
          <span>{{ groupName.attributes.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>

  <el-button class="button" v-else @click="menuSwitch">菜单</el-button>
  <el-drawer size="60%" direction="btt" v-model="drawer" title="菜单">
    <el-menu class="menu mobileMenu" :default-active="String(group().index)" @select="chooseGroup">
      <el-menu-item class="item"><el-link target="_blank" :underline="false" href="https://jayhu.site">回主站</el-link></el-menu-item>
      <el-menu-item class="item">
        <span style="margin-right: 5px">主题</span>
        <el-select v-model="theme().theme" size="small" style="width: 100px" @change="changeTheme">
          <el-option v-for="theme in themes" :key="theme.value" :label="theme.label" :value="theme.value" />
        </el-select>
      </el-menu-item>
      <el-menu-item class="item" index="0" @click="menuSwitch"><span>全部</span></el-menu-item>
      <template v-for="groupName in groupNames">
        <el-menu-item class="item" :index="String(groupName.id)" @click="menuSwitch">
          <span>{{ groupName.attributes.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-drawer>
</template>

<style scoped>
  .menu {
    font-weight: bold;
    border: 0;
  }

  .mobileMenu {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
  }

  .mobileMenu > :first-child {
    grid-column: 1 / -1;
  }

  .desktopMenu {
    position: fixed;
    width: 200px;
    max-height: calc(100% - 40px);
    margin: 20px 0;
    overflow-y: scroll;
    border-radius: var(--border-radius);
    background-color: var(--element-background-color);
  }

  .button {
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    border: 0;
    z-index: 99;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
  }

  .item {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-link {
    width: 100%;
    height: 100%;
    font-size: calc(var(--title-font-size) - 6px);
    background-color: rgba(0, 0, 0, 0);
    font-weight: bolder;
  }
</style>
