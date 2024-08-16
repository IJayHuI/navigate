<template>
  <div class="footer">Copyright &copy; 2024 JayHu.保留所有权利。<a href="https://beian.miit.gov.cn">浙ICP备2024102465号</a></div>
</template>
<style scoped>
  .footer {
    padding: 0 20px 20px 20px;
  }
  .footer,
  a {
    color: var(--font-color);
    transition: color var(--theme-change-time);
    font-size: 14px;
    font-weight: normal;
    text-decoration: none;
    height: 25px;
  }

  a:hover {
    text-decoration: underline;
  }
  @media screen and (max-width: 833px) {
    .footer,
    a {
      font-size: 13px;
    }

    .footer {
      padding: 0;
      text-align: center;
      margin-bottom: 80px;
    }
  }
</style>
