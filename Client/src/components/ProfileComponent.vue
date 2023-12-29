<template>
    <div>
    <div class="profileComponent" v-if="user">
        <ProfileCardComponent :isYourProfile="isYourProfile" :isFollowed="isFollowed" :isHovering="isHovering" :user="user"/>
        <ProfileSlotsComponent :isYourProfile="isYourProfile" :isFollowed="isFollowed" :user="user"/>
    </div>
    <div v-else>
        ...loading
    </div>
    </div>
</template>
<script>
import ProfileCardComponent from './ProfileCardComponent.vue';
import ProfileSlotsComponent from './ProfileSlotsComponent.vue';
import { getUser } from '../services/user.service';
import store from '../store'

export default {
    components: {
        ProfileCardComponent,
        ProfileSlotsComponent
    },
    data() {
        return {
            isYourProfile: true,
            isFollowed: true,
            isHovering: false,
            user: null
        }
    },
    methods: {
        async getUserService() {
            try {
                const res = await getUser(this.$route.params.username);
                console.log(res)
                this.user = res;
                this.user.joinDate = new Date(this.user.joinDate);
            } catch (error) {
                console.error('Error in getUser:', error);
            }
        },
    },
    mounted() {
        this.getUserService();

        if (store.state.data.user.user.login === this.$route.params.username) {
            this.isYourProfile = true;
        }
    }
}
</script>
<style lang="scss">

</style>