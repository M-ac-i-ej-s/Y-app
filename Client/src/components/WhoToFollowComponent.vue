<template>
    <div class="whoToFollow">
        <div class="who-to-follow-label">
            <span class="who-to-follow-label-value">
                Who to follow
            </span>
        </div>
        <div>
            <div v-if="users">
                <div v-if="users.length > 0">
                    <ProfileShowcaseComponent v-for="user in users" :key="user._id" :user="user" :isToFollow="true"/>
                </div>
                <div v-else>
                    <ExeptionComponent text="users"/>
                </div>
            </div>
            <div v-else>
                <LoaderComponent/>
            </div>
        </div>
        <div class="who-to-follow-refresh" @click="getSomeoneToFollowService">
            <v-icon icon="mdi-refresh" class="who-to-follow-refresh-icon"/>
        </div>
    </div>
</template>
<script>
import ProfileShowcaseComponent from '../components/ProfileShowcaseComponent.vue';
import ExeptionComponent from '../components/ExeptionComponent.vue';
import LoaderComponent from '../components/LoaderComponent.vue';
import { getSomeoneToFollow } from '../services/user.service';

export default {
    name: 'WhoToFollowComponent',
    components: {
        ProfileShowcaseComponent,
        ExeptionComponent,
        LoaderComponent
    },
    data() {
        return {
            users: null,
            seenIds: []
        }
    },
    methods: {
        async getSomeoneToFollowService() {
            try {
                const res = await getSomeoneToFollow(this.$store.state.data.user.user.login, this.seenIds);
                res.forEach(user => {
                    if(!this.seenIds.includes(user._id)) {
                        this.seenIds.push(user._id);
                    }
                });
                this.users = res;
            } catch (error) {
                router.push('/errorpage');
            }
        }
    },
    mounted() {
        this.getSomeoneToFollowService();
    }
}
</script>
<style lang="scss">
.whoToFollow {
    position: fixed;
    width: 400px;
    margin: 15px 0 0 1050px;
    border-radius: 10px;
    border: 1px solid #e6ecf0;
    @media screen and (max-width: 1500px) {
        width: 300px;
        margin: 15px 0 0 950px;
    }
    @media screen and (max-width: 1200px) {
                    display: none;
                }
    .who-to-follow-label {
        font-size: 25px;
        font-weight: 700;
        padding: 10px 25px 10px 25px; 
    }
    .who-to-follow-refresh {
        display: flex;
        justify-content: center;
        padding: 10px 0 10px 0;
        cursor: pointer;
        &:hover {
            cursor: pointer;
            background-color: #e6ecf0;
        }
        .who-to-follow-refresh-icon {
            color: #582b5a;
            transition: 0.5s ease;
            border-radius: 90px;
        }
    }
}
</style>