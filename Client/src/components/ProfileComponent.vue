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
        getUser() {
            this.user = store.state.data.user.user;
        },
        async getDiffUser() {
            try {
                const res = await getUser(this.$route.params.username);
                this.user = res;
            } catch (error) {
                console.error('Error in getUser:', error);
            }
        },
    },
    mounted() {
        const user = store.state.data.user.user;
        if(user.login === this.$route.params.username) {
            this.getUser();
            this.isYourProfile = true;
        } else {
            this.getDiffUser();
            this.isYourProfile = false;
        }

        this.user.joinDate = new Date(this.user.joinDate);
    }
}
</script>
<style lang="scss">
.profileComponent {
    border-left:1px solid #e0e0e0;
    border-right:1px solid #e0e0e0;
}
</style>