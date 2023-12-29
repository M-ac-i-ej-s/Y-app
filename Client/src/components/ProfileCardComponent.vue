<template >
    <div v-if="user" class="profileCardComponent">
        <div class="profile-card-info">
            <div class="profile-card-info-name">
                <span>{{ user.login }}</span>
            </div>
            <div class="profile-card-info-posts">
                <span>{{ user.posts.length }} Posts</span>
            </div>
        </div>
        <div class="profile-card-background-photo">
            <img class="profile-card-background-photo-value" src="../assets/dummy-background.jpg" alt="">
        </div>
        <div class="profile-card-values">
            <div class="profile-card-values-credentials">
                <div class="profile-card-values-credentials-image">
                    <img class="profile-card-values-credentials-image-value" src="../assets/dummy-avatar.png" alt="">
                </div>
                <div class="profile-card-values-credentials-login">
                    <span>{{ user.login }}</span>
                </div>
                <div class="profile-card-values-credentials-bio">
                    <span>{{ user.bio }}</span>
                </div>
                <div class="profile-card-values-credentials-annotations">
                    <div class="profile-card-values-credentials-annotations-value">
                        <v-icon icon="mdi-map-marker-outline"/>
                        <span>Gdańsk, PL</span>
                    </div>
                    <div class="profile-card-values-credentials-annotations-value">
                        <v-icon icon="mdi-link"/>
                        <a href="facebook.com">facebook.com</a>
                    </div>
                    <div class="profile-card-values-credentials-annotations-value">
                        <v-icon icon="mdi-calendar-month-outline"/>
                        <span>Joined {{ user.joinDate.toLocaleString('en-us', { month: 'long' }) }} {{ user.joinDate.getFullYear() }}</span>
                    </div>
                </div>
                <div class="profile-card-values-credentials-stats">
                    <div class="profile-card-values-credentials-stats-follow">
                        <span class="profile-card-values-credentials-stats-follow-num">{{ user.following.length }}</span>
                        <span class="profile-card-values-credentials-stats-follow-label">Following</span>
                    </div>
                    <div class="profile-card-values-credentials-stats-follow">
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
                        <v-icon icon="mdi-dots-horizontal" class="profile-card-values-buttons-follow-more"/>
                        <v-btn v-if="!isFollowed" class="profile-card-values-buttons-follow-button" color="#582b5a">Follow</v-btn>
                        <div v-else @mouseover="isHovering = true" @mouseleave="isHovering = false">
                            <v-btn v-if="!isHovering" class="profile-card-values-buttons-follow-button following" color="#582b5a">Following</v-btn>
                            <v-btn v-else class="profile-card-values-buttons-follow-button" color="red">Unfollow</v-btn>
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
        user: {
            type: [Object, null],
            required: true
        }
    }
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
        @media screen and (max-width: 700px) {
                width: 100%;
                height: auto;
                max-height: 200px;
        }
        .profile-card-background-photo-value {
            width: 600px;
            max-height: 200px;
            object-fit: cover;
            @media screen and (max-width: 700px) {
                width: 100%;
                height: auto;
                max-height: 200px;
            }
        }
    }
    .profile-card-values {
        display: flex;
        width: 600px;
        position: absolute;
        top: 175px;
        @media screen and (max-width: 700px) {
            width: 100%;
        }
        .profile-card-values-credentials {
            width: 600px;
            padding: 0 20px 0 20px;
            @media screen and (max-width: 700px) {
                width: 100%;
            }
            .profile-card-values-credentials-image {
                .profile-card-values-credentials-image-value {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
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
                @media screen and (max-width: 700px) {
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
                align-items: center;
                gap: 10px;
                .profile-card-values-buttons-follow-more {
                    cursor: pointer;
                    border-radius: 90px;
                    border: 1px solid gray;
                    padding: 10px;
                    transition: 0.2s ease;
                    &:hover {
                        background-color: #e9e9e9;
                    }
                }
                .profile-card-values-buttons-follow-button {
                    width: 150px;
                    font-weight: 700;
                    font-size: 0.8vw;
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