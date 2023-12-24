<template>
    <div class="mainPage">
        <NavBarComponent/>
        <router-view/>
    </div>
</template>
<script>
import NavBarComponent from '../components/NavBarComponent.vue';

export default {
    components: {
        NavBarComponent
    }
}
</script>
<style lang="scss">
.mainPage {
    display: flex;
    @media screen and (min-width: 768px) {
        justify-content: center;
    }
}
</style>