<template >
    <div v-if="user" class="profileCardComponent">
        <div class="profile-card-info">
            <div class="profile-card-info-name">
                <span>{{ user.login }}</span>
            </div>
            <div class="profile-card-info-posts">
                <span>{{ postsLength }} Posts and Replies</span>
            </div>
        </div>
        <div class="profile-card-background-photo">
            <img v-if="user.backgroundPhoto" class="profile-card-background-photo-value" :src="user.backgroundPhoto" alt="background">
            <div v-else class="profile-card-background-photo-default"/>
        </div>
        <div class="profile-card-values">
            <div class="profile-card-values-credentials">
                <div class="profile-card-values-credentials-image">
                    <img class="profile-card-values-credentials-image-value" :src="user.avatar" alt="avatar">
                </div>
                <div class="profile-card-values-credentials-login">
                    <span>{{ user.login }}</span>
                </div>
                <div class="profile-card-values-credentials-bio">
                    <span>{{ user.bio }}</span>
                </div>
                <div class="profile-card-values-credentials-annotations">
                    <div v-if="user.location" class="profile-card-values-credentials-annotations-value">
                        <v-icon icon="mdi-map-marker-outline"/>
                        <span>{{ user.location }}</span>
                    </div>
                    <div v-if="user.website" class="profile-card-values-credentials-annotations-value">
                        <v-icon icon="mdi-link"/>
                        <a href="facebook.com">{{ user.website }}</a>
                    </div>
                    <div class="profile-card-values-credentials-annotations-value">
                        <v-icon icon="mdi-calendar-month-outline"/>
                        <span>Joined {{ user.joinDate.toLocaleString('en-us', { month: 'long' }) }} {{ user.joinDate.getFullYear() }}</span>
                    </div>
                </div>
                <div class="profile-card-values-credentials-stats">
                    <div class="profile-card-values-credentials-stats-follow"  @click="goToFollowing">
                        <span class="profile-card-values-credentials-stats-follow-num">{{ user.following.length }}</span>
                        <span class="profile-card-values-credentials-stats-follow-label">Following</span>
                    </div>
                    <div class="profile-card-values-credentials-stats-follow" @click="goToFollowers">
                        <span class="profile-card-values-credentials-stats-follow-num">{{ user.followers.length }}</span>
                        <span class="profile-card-values-credentials-stats-follow-label">Followers</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="profile-card-buttons">
                    <div v-if="isYourProfile">
                        <EditProfileComponent :user="user"/> 
                    </div>
                    <div v-else class="profile-card-values-buttons-follow">
                        <v-menu v-if="!isFollowed" v-model="menu" :close-on-content-click="false" location="start" class="profile-card-values-buttons-follow-block">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon="mdi-dots-horizontal" size="x-small"/>
                            </template>

                            <v-btn v-if="!isBlocked" prepend-icon="mdi-account-cancel" color="red" rounded="xl" @click="updateBlockedUsers">
                                Block this user
                            </v-btn>
                            <v-btn v-else prepend-icon="mdi-account-check" color="green" rounded="xl" @click="updateBlockedUsers">
                                Unblock this user
                            </v-btn>
                        </v-menu>
                        <div v-if="isBlocked">
                            <v-btn color="red" rounded="xl">Blocked</v-btn>
                        </div>
                        <div v-else>
                            <v-btn v-if="!isFollowed" class="profile-card-values-buttons-follow-button" color="#582b5a" @click="updateFollowers">Follow</v-btn>
                            <div v-else @mouseover="isHovering = true" @mouseleave="isHovering = false">
                                <v-btn v-if="!isHovering" class="profile-card-values-buttons-follow-button following" color="#582b5a">Following</v-btn>
                                <v-btn v-else class="profile-card-values-buttons-follow-button" color="red" @click="updateFollowers">Unfollow</v-btn>
                            </div>
                        </div>
                    </div>
        </div>
    </div>
</template>
<script>
import EditProfileComponent from './EditProfileComponent.vue';

export default {
    components: {
        EditProfileComponent
    },
    props: {
        isYourProfile: {
            type: Boolean,
            required: true
        },
        isFollowed: {
            type: Boolean,
            required: true
        },
        isHovering: {
            type: Boolean,
            required: true
        },
        isBlocked: {
            type: Boolean,
            required: true
        },
        user: {
            type: [Object, null],
            required: true
        },
        updateFollowers: {
            type: Function,
            required: true
        },
        updateBlockedUsers: {
            type: Function,
            required: true
        },
        postsLength: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            menu: false
        }
    },
    methods: {
        goToFollowers() {
            this.$router.push(`/${this.user.login}/followers`);
        },
        goToFollowing() {
            this.$router.push(`/${this.user.login}/following`);
        },
    },
}

</script>
<style lang="scss">
.profileCardComponent {
    display: flex;
    flex-direction: column;
    .profile-card-info {
        padding: 5px 20px 5px 20px;
        .profile-card-info-name {
            font-size: 25px;
            font-weight: 700;
        }
        .profile-card-info-posts {
            font-size: 15px;
            color: gray;
        }
    }
    .profile-card-background-photo {
        width: 600px;
        max-height: 200px;
        background-color: rgb(216, 216, 216);
        @media screen and (max-width: 850px) {
                width: 480px;
                height: auto;
                max-height: 200px;
        }
        .profile-card-background-photo-value {
            width: 600px;
            max-height: 200px;
            object-fit: cover;
            @media screen and (max-width: 850px) {
                width: 100%;
                height: auto;
                max-height: 200px;
            }
        }
        .profile-card-background-photo-default {
            width: 600px;
            height: 200px;
            @media screen and (max-width: 850px) {
                width: 100%;
                height: 200px;
            }
        }
    }
    .profile-card-values {
        display: flex;
        width: 600px;
        position: absolute;
        top: 175px;
        @media screen and (max-width: 850px) {
            width: 100%;
        }
        .profile-card-values-credentials {
            width: 600px;
            padding: 0 20px 0 20px;
            @media screen and (max-width: 850px) {
                width: 100%;
            }
            .profile-card-values-credentials-image {
                .profile-card-values-credentials-image-value {
                    width: 150px;
                    height: 150px;
                    border-radius: 90px;
                    object-fit: cover;
                    border: white 4px solid;
                }
            }
            .profile-card-values-credentials-login {
                font-size: 25px;
                font-weight: 700;
                padding: 0 0 15px 0;
            }
            .profile-card-values-credentials-bio {
                padding: 0 0 15px 0;
            }
            .profile-card-values-credentials-annotations {
                display: flex;
                gap: 15px;
                @media screen and (max-width: 850px) {
                    flex-direction: column;
                }
                .profile-card-values-credentials-annotations-value {
                    display: flex;
                    gap: 5px;
                    color: gray;
                }
            }
            .profile-card-values-credentials-stats {
                padding: 10px 0 0 0;
                display: flex;
                gap: 15px;
                .profile-card-values-credentials-stats-follow {
                    cursor: pointer;
                    height: 20px;
                    &:hover {
                        border-bottom: 1px solid gray;
                    }
                    .profile-card-values-credentials-stats-follow-num {
                        font-weight: 700;
                        padding: 0 5px 0 0;
                    }
                    .profile-card-values-credentials-stats-follow-label {
                        color: gray;
                    }
                }
            }
        }
    }
    .profile-card-buttons {
            padding: 20px 20px 0 0;
            align-self: end;
            .profile-card-values-buttons-edit {
                width: 150px;
                font-weight: 700;
                font-size: 15px;
                border-radius: 20px;
            }
            .profile-card-values-buttons-follow {
                display: flex;
                // align-items: center;
                gap: 10px;
                .profile-card-values-buttons-follow-more {
                    cursor: pointer;
                    border-radius: 90px;
                    border: 1px solid gray;
                    padding: 3px;
                    transition: 0.2s ease;
                    &:hover {
                        background-color: #e9e9e9;
                    }
                }
                .profile-card-values-buttons-follow-button {
                    width: 150px;
                    font-weight: 700;
                    font-size: 13px;
                    border-radius: 20px;
                    &.following {
                        background-color: #e9e9e9;
                        color: gray;
                    }
                }
            }
        }
}
</style>