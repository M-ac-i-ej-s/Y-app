<template>
    <div class="mainPage">
        <NavBarComponent/>
        <div class="main-page-router">
            <router-view/>
        </div>
        <WhoToFollowComponent/>
    </div>
</template>
<script>
import NavBarComponent from '../components/NavBarComponent.vue';
import WhoToFollowComponent from '../components/WhoToFollowComponent.vue';

export default {
    components: {
        NavBarComponent,
        WhoToFollowComponent
    }
}
</script>
<style lang="scss">
.mainPage {
    display: flex;
    justify-content: center;
    height: 150vh;
    @media screen and (max-width: 650px) {
            justify-content: flex-end;
    }
}
</style>