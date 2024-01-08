<template>
    <div class="ExploreSlots">
        <v-tabs v-model="tabs" color="purple-darken-2" grow>
            <v-tab :value="1">
                <span class="explore-slots-tab-value">
                    Top
                </span>
            </v-tab>

            <v-tab :value="2">
                <span class="explore-slots-tab-value">
                    Latest
                </span>
            </v-tab>

            <v-tab :value="3">
                <span class="explore-slots-tab-value">
                    People
                </span>
            </v-tab>
        </v-tabs>
        <v-window v-model="tabs">
            <v-window-item :value="1">
                <div class="explore-slots-top">
                    <div class="explore-slots-top-people">
                        <div class="explore-slots-top-people-value">
                            People
                        </div>
                        <div v-for="user in users" :key="user._id">
                            <ProfileShowcaseComponent :user="user"/>
                        </div>
                    </div>
                    <div class="explore-slots-top-posts">
                        <div class="explore-slots-top-posts-value">
                            Posts
                        </div>
                        <div v-for="post in posts" :key="post._id">
                            <PostComponent :post="post"/>
                        </div>   
                    </div>
                </div>
            </v-window-item>
            <v-window-item :value="2">
               some
            </v-window-item>
            <v-window-item :value="3">
                some
            </v-window-item>
        </v-window>
    </div>
</template>
<script>
import ProfileShowcaseComponent from './ProfileShowcaseComponent.vue';
import PostComponent from './PostComponent.vue';

export default {
    name: 'ExploreSlotsComponent',
    components: {
        ProfileShowcaseComponent,
        PostComponent
    },
    props: {
        users: {
            type: Array,
            required: true
        },
        posts: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            tabs: null
        }
    },
}
</script>
<style lang="scss">
.ExploreSlots {
    .explore-slots-tab-value {
        font-weight: 700;
    }
    .explore-slots-top {
        .explore-slots-top-people {
            .explore-slots-top-people-value {
                padding: 10px 20px 10px 20px; 
                font-size: 25px;
                font-weight: 700;
            }
        }
        .explore-slots-top-posts {
            .explore-slots-top-posts-value {
                padding: 10px 20px 10px 20px; 
                font-size: 25px;
                font-weight: 700;
            }
        }
    }
}
</style>