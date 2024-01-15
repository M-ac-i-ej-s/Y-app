<template>
    <div class="Loader">
        <div class="loader-value"></div>
    </div>
</template>

<style scoped lang="css">
.Loader {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0 20px 0;
}
.loader-value {
    width: 120px;
    height: 20px;
    -webkit-mask: linear-gradient(90deg,#582b5a 70%,#0000 0) left/20% 100%;
    background:
     linear-gradient(#582b5a 0 0) left -25% top 0 /20% 100% no-repeat
     #ddd;
    animation: l7 1s infinite steps(6);
  }
  @keyframes l7 {
      100% {background-position: right -25% top 0}
  }
</style>