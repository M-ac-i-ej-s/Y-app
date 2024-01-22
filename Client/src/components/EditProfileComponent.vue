<template>
    <BaseDialog buttonColor="#582b5a" buttonLabel="Edit profile" :dialogWidth="750" :width="500">
        <div class="editProfile">
            <div class="edit-profile-background">
                <div v-if="!backgroundPreview" class="edit-profile-background-help">
                    <input class="edit-profile-background-input" type="file" @change="saveBackground">
                    <v-icon icon="mdi-camera-outline"></v-icon>
                </div>
                <div v-else class="edit-profile-background-help">
                    <input class="edit-profile-background-input" type="file" @change="saveBackground">
                    <img class="edit-profile-background-value" :src="backgroundPreview" alt="avatar"/>
                </div>
            </div>
            <div class="edit-profile">
                <div v-if="!avatarPreview" class="edit-profile-avatar">
                    <input class="edit-profile-avatar-input" type="file" @change="saveAvatar">
                    <v-icon icon="mdi-camera-outline"></v-icon>
                </div>
                <div v-else class="edit-profile-avatar">
                    <input class="edit-profile-avatar-input" type="file" @change="saveAvatar">
                    <img class="edit-profile-avatar-value" :src="avatarPreview" alt="avatar"/>
                </div>
                <v-text-field
                    label="Login"
                    variant="outlined"
                    v-model="userEdited.login"
                    prepend-icon="mdi-account-outline"
                ></v-text-field>
                <v-textarea 
                    label="bio, describe yourself" 
                    variant="outlined" 
                    v-model="userEdited.bio"
                    prepend-icon="mdi-text-account"
                />
                <v-text-field
                    label="Location"
                    variant="outlined"
                    v-model="userEdited.location"
                    prepend-icon="mdi-map-marker-outline"
                ></v-text-field>
                <v-text-field
                    label="Website"
                    variant="outlined"
                    v-model="userEdited.website"
                    prepend-icon="mdi-link"
                ></v-text-field>
            </div>
            <div class="edit-profile-buttons">
                <v-btn class="edit-profile-buttons-label" rounded="xl" color="grey">
                    Clear
                </v-btn>
                <v-btn class="edit-profile-buttons-label" rounded="xl" color="#582b5a" :loading="submit" :disabled="loginError" @click="this.updateUserService">
                    Save changes 
                </v-btn>
            </div>
        </div>
    </BaseDialog>
</template>
<script>
import BaseDialog from '../base/BaseDialog.vue';
import { updateUser, checkIfUserExists, getUser } from '../services/user.service.js';
import { reloadPage } from '../utils/utils';
import { mapMutations } from 'vuex';
import router from '../router';

export default {
    components: {
        BaseDialog
    },
    props: {
        user: [Object, null]
    },
    data() {
        return {
            userEdited: {
                avatar: this.user.avatar,
                backgroundPhoto: this.user.backgroundPhoto || '',
                login: this.user.login,
                bio: this.user.bio,
                location: this.user.location,
                website: this.user.website
            },
            avatarPreview: this.user.avatar,
            backgroundPreview: this.user.backgroundPhoto || '',
            loginTimer: null,
            loginError: false,
            loginErrorMessage: '',
            avatarChanged: false,
            backgroundChanged: false,
            submit: false
        }
    },
    methods: {
        saveAvatar(event) {
            this.avatarChanged = true;
            this.avatarPreview = URL.createObjectURL(event.target.files[0])
            this.userEdited.avatar = event.target.files[0];
        },
        saveBackground(event) {
            this.backgroundChanged = true;
            this.backgroundPreview = URL.createObjectURL(event.target.files[0])
            this.userEdited.backgroundPhoto = event.target.files[0];
        },
        async updateUserService() {
            this.submit = true;
            try {
                let type;
                if(this.avatarChanged && this.backgroundChanged) {
                    type = 'both';
                } else if(this.avatarChanged) {
                    type = 'avatar';
                } else if(this.backgroundChanged) {
                    type = 'background';
                } else {
                    type = 'none';
                }

                const updUser = await updateUser(this.user._id, this.userEdited, type);
                const newUser = await this.getUserService(updUser.login);
                this.reLogUser(newUser);
                reloadPage();
            } catch (error) {
                router.push('/errorpage');
            }
        },
        async getUserService(login) {
            try {
                const res = await getUser(login);
                return res
            } catch (error) {
                router.push('/errorpage');
            }
        },
        onClear() {
            this.userEdited = {
                login: '',
                bio: '',
                location: '',
                website: ''
            }
            this.loginError = false;
            this.loginErrorMessage = '';
            this.loginTimer = null;
        },
        ...mapMutations(['reLogUser'])
    },
    watch: {
        'userEdited.login': async function() {
            if(this.userEdited.login === this.user.login) {
                this.loginError = false;
                this.loginErrorMessage = '';
                return;
            }
            if(this.loginTimer) {
                clearTimeout(this.loginTimer);
            }

            if(this.login === '') {
                this.loginErrorMessage = '';
                return;
            }

            this.loginTimer = setTimeout(async () => {
                    try {
                        const res = await checkIfUserExists(this.userEdited.login);
                        if (res) {
                            this.loginError = true;
                            this.loginErrorMessage = 'This login is already taken';
                        } else {
                            this.loginError = false;
                            this.loginErrorMessage = '';
                        }
                    } catch (error) {
                        router.push('/errorpage');
                    }
            }, 500);
        },
    }
}
</script>
<style lang="scss">
.editProfile {
    padding: 20px 0 0 0;
    .edit-profile-background {
        display: flex;
        justify-content: center;
        @media screen and (max-width: 700px) {
            width: 100%;
            height: auto;
        }
        .edit-profile-background-help {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 600px;
            height: 200px;
            background-color: #d1b2d3;
            margin-bottom: 20px;
            cursor: pointer;
            .edit-profile-background-input {
                opacity: 0;
                position: absolute;
                cursor: pointer;
                width: 600px;
                height: 200px;
            }
            .edit-profile-background-value {
                width: 600px;
                height: 200px;
                object-fit: cover;
                cursor: pointer;
            }
        }
    }
    .edit-profile {
        padding: 75px 0 0 0;
        display: flex;
        flex-direction: column;
        .edit-profile-avatar {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #d1b2d3;
                margin: 0 0 0 50px;
                border-radius: 90px;
                width: 150px;
                height: 150px;
                top: 225px;
                cursor: pointer;
                @media screen and (max-width: 700px) {
                    top: 200px;
                    margin: 0 0 0 20px;
                }
                .edit-profile-avatar-value {
                    width: 150px;
                    height: 150px;
                    object-fit: cover;
                    border-radius:90px;
                    border: 4px solid #ffffff;
                    background-color:transparent;
                    cursor: pointer;
                }
                .edit-profile-avatar-input {
                    opacity: 0;
                    position: absolute;
                    cursor: pointer;
                    height: 150px;
                    width: 150px;
                }
            }
    }
    .edit-profile-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        padding: 20px 0 0 0;
        .edit-profile-buttons-label {
            font-weight: 700;
        }
    }
}
</style>