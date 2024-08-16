<script setup>
  import { ref, onMounted } from 'vue'
  import { ElLoading } from 'element-plus'
  import { group } from '../pinia'
  import { screenWidth } from '../main'
  import axios from 'axios'
  import Footer from './footer.vue'
  const items = ref()
  const loading = ref(null)

  const createLoading = () => {
    loading.value = ElLoading.service({
      lock: true,
      text: '加载中',
      fullscreen: true,
      customClass: 'loadingBackground'
    })
    return loading
  }
  createLoading()
  axios
    .get('/api/group-names?populate[navigate][fields][0]=name&populate[navigate][fields][1]=link&populate[navigate][fields][2]=needProxy&populate[navigate][fields][3]=visible&fields[0]=name')
    .then((response) => {
      items.value = response.data.data
    })
    .finally(() => {
      loading.value.close()
    })

  group().$subscribe((mutation, state) => {
    if (mutation.storeId === 'group' && state.index !== mutation.events.oldValue) {
      createLoading()
      let url = ''
      if (state.index == 0) url = '/api/group-names?populate[navigate][fields][0]=name&populate[navigate][fields][1]=link&populate[navigate][fields][2]=needProxy&populate[navigate][fields][3]=visible&fields[0]=name'
      else url = '/api/group-names/' + state.index + '?populate[navigate][fields][0]=name&populate[navigate][fields][1]=link&populate[navigate][fields][2]=needProxy&populate[navigate][fields][3]=visible&fields[0]=name'
      axios
        .get(url)
        .then((response) => {
          items.value = response.data.data
        })
        .finally(() => {
          loading.value.close()
        })
    }
  })

  // 添加和移除滚动事件监听
  onMounted(() => {
    window.addEventListener('scroll', () => {
      const titles = document.querySelectorAll('.title')
      titles.forEach((title) => {
        if (title.getBoundingClientRect().top <= 19) title.classList.add('stickyTitle') // 添加类
        else title.classList.remove('stickyTitle') // 移除类
      })
    })
  })
</script>
<template>
  <el-container>
    <el-main class="main" v-if="group().index == 0">
      <div class="module" v-for="groupName in items" v-if="items && items.length">
        <h1 class="title">{{ groupName.attributes.name }}</h1>
        <template v-for="item in groupName.attributes.navigate.data">
          <el-popover v-if="item.attributes.needProxy" trigger="hover" placement="top" width="auto">
            <p>This link need some magic to visit!</p>
            <template #reference>
              <el-link :class="{ needProxy: item.attributes.needProxy }" v-if="item.attributes.visible" target="_blank" :href="item.attributes.link" :underline="false" class="item">
                {{ item.attributes.name }}
              </el-link>
            </template>
          </el-popover>

          <el-link v-else :class="{ needProxy: item.attributes.needProxy }" v-if="item.attributes.visible" target="_blank" :href="item.attributes.link" :underline="false" class="item">
            {{ item.attributes.name }}
          </el-link>
        </template>
      </div>
    </el-main>
    <el-main class="main" v-else>
      <div class="module" v-if="items && items.attributes">
        <h1 class="title">{{ items.attributes.name }}</h1>
        <template v-for="item in items.attributes.navigate.data">
          <el-link :class="{ needProxy: item.attributes.needProxy }" v-if="item.attributes.visible" target="_blank" :href="item.attributes.link" :underline="false" class="item">
            {{ item.attributes.name }}
          </el-link>
        </template>
      </div>
    </el-main>
    <Footer></Footer>
  </el-container>
</template>
<style scoped>
  .el-container {
    flex-direction: column;
  }
  .main {
    display: grid;
    gap: 20px;
    overflow: visible;
  }

  .module {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
  }

  .module > :first-child {
    grid-column: 1 / -1;
  }

  .title {
    width: max-content;
    height: 40px;
    position: sticky;
    top: 19px;
    font-size: var(--title-font-size);
    padding: 10px;
    z-index: 9;
    border-radius: var(--border-radius);
    color: var(--font-color);
    transition: background-color var(--theme-change-time);
  }

  .stickyTitle {
    background-color: var(--element-background-color);
  }

  .item {
    height: 60px;
    padding: 0 15px;
    border-radius: var(--border-radius);
    color: var(--font-color);
    font-weight: normal;
    background-color: var(--element-background-color);
    transition: outline var(--element-transition-time);
    outline: 0px solid var(--element-background-color);
  }

  .item:hover {
    outline-width: 4px;
  }

  .item:active {
    outline-width: 0px;
  }

  .needProxy {
    outline: 1px solid var(--need-proxy-outline);
  }
</style>
