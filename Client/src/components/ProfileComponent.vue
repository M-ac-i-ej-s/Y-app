<template>
    <div class="profileComponent">
        <ProfileCardComponent/>
    </div>
</template>
<script>
import ProfileCardComponent from './ProfileCardComponent.vue';

export default {
    components: {
        ProfileCardComponent
    }
}
</script>
<style lang="scss">
.profileComponent {
    border-left:1px solid #e0e0e0;
    border-right:1px solid #e0e0e0;
}
</style>