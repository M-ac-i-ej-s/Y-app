<template>
    <div class="ShowFollow">
        <div class="show-follow-label"> 
            <span class="show-follow-label-value">
                {{ user?.login }}
            </span>
        </div>
        <v-tabs class="show-follow-tabs" v-model="tabs" color="purple-darken-2" grow>
            <v-tab :value="1" @click="switchRoutesToIng">
                <span class="show-follow-tabs-label">
                    Following
                </span>
            </v-tab>
            <v-tab :value="2" @click="switchRoutesToErs">
                <span class="show-follow-tabs-label">
                    Followers
                </span>
            </v-tab>
        </v-tabs>
        <v-window v-model="tabs">
            <v-window-item :value="1">
                <div v-if="following">
                    <div v-if="following.length > 0">
                        <ProfileShowcaseComponentVue v-for="follow in following" :key="follow._id" :user="follow"/>
                    </div>
                    <div v-else>
                        <ExeptionComponent text="users who you are following"/>
                    </div>
                </div>
                <div v-else>
                    <LoaderComponent/>
                </div>
            </v-window-item>
            <v-window-item :value="2">
                <div v-if="followers">
                    <div v-if="followers.length > 0">
                        <ProfileShowcaseComponentVue v-for="follow in followers" :key="follow._id" :user="follow"/>
                    </div>
                    <div v-else>
                        <ExeptionComponent text="users who are following you"/>
                    </div>
                </div>
                <div v-else>
                    <LoaderComponent/>
                </div>
            </v-window-item>
        </v-window>
    </div>
</template>
<script>
import ProfileShowcaseComponentVue from '../components/ProfileShowcaseComponent.vue';
import LoaderComponent from '../components/LoaderComponent.vue';
import ExeptionComponent from '../components/ExeptionComponent.vue';
import { getUser, getAllFollowers, getAllFollowing } from '../services/user.service';
import router from '../router';

export default {
    name: 'ShowFollowPage',
    components: {
        ProfileShowcaseComponentVue,
        LoaderComponent,
        ExeptionComponent
    },
    data() {
        return {
            user: null,
            following: null,
            followers: null,
            tabs: null,
        }
    },
    methods: {
        async getUserService() {
            try {
                const res = await getUser(this.$route.params.username);
                this.user = res;
                this.user.joinDate = new Date(this.user.joinDate);
            } catch (error) {
                router.push('/errorpage');
            }
        },
        async getAllFollowersService() {
            try {
                const res = await getAllFollowers(this.$route.params.username);
                this.followers = res;
            } catch (error) {
                router.push('/errorpage');
            }
        },
        async getAllFollowingService() {
            try {
                const res = await getAllFollowing(this.$route.params.username);
                this.following = res;
            } catch (error) {
                router.push('/errorpage');
            }
        },
        switchRoutesToIng() {
            router.push(`/${this.$route.params.username}/following`)
        },
        switchRoutesToErs() {
            router.push(`/${this.$route.params.username}/followers`)
        }
    },
    mounted() {
        this.getUserService();
        this.getAllFollowersService();
        this.getAllFollowingService();

        if (this.$route.path === `/${this.$route.params.username}/following`) {
            this.tabs = 1;
        } else if (this.$route.path === `/${this.$route.params.username}/followers`) {
            this.tabs = 2;
        }
    }
}
</script>
<style lang="scss">
.ShowFollow {
    width: 600px;
    min-height: 150vh;
    border-left:1px solid #e0e0e0;
    border-right:1px solid #e0e0e0;
    .show-follow-label {
        padding: 5px 20px 5px 20px;
        .show-follow-label-value {
            font-size: 25px;
            font-weight: 700;
        }
    }
    .show-follow-tabs {
        .show-follow-tabs-label {
            font-weight: 700;
        }
    }
}
</style>