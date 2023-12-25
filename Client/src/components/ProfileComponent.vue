<template>
    <div class="profileComponent">
        <ProfileCardComponent/>
        <ProfileSlotsComponent/>
    </div>
</template>
<script>
import ProfileCardComponent from './ProfileCardComponent.vue';
import ProfileSlotsComponent from './ProfileSlotsComponent.vue';

export default {
    components: {
        ProfileCardComponent,
        ProfileSlotsComponent
    }
}
</script>
<style lang="scss">
.profileComponent {
    border-left:1px solid #e0e0e0;
    border-right:1px solid #e0e0e0;
}
</style>