<template>
    <BaseDialog :buttonLabel="'Create account'" :dialogWidth="750" :buttonColor="'purple-darken-2'">
        <div class="signInComponent">
            <div class="sign-label">
                Create your Y account
            </div>
            <div class="sign-component">
                <div class="sign-component-nescessary">
                    <v-text-field
                        class="sign-component-nescessary-value"
                        label="Login*"
                        variant="outlined"
                        prepend-icon="mdi-account-outline"
                    ></v-text-field>
                    <v-text-field
                        class="sign-component-nescessary-value"
                        label="Email*"
                        variant="outlined"
                        prepend-icon="mdi-email-outline"
                    ></v-text-field>
                    <v-text-field
                        class="sign-component-nescessary-value"
                        label="Telephone Number*"
                        variant="outlined"
                        prepend-icon="mdi-phone-outline"
                    ></v-text-field>
                    <v-text-field
                        class="sign-component-nescessary-value"
                        label="Password*"
                        variant="outlined"
                        prepend-icon="mdi-lock-outline"
                        type="password"
                    ></v-text-field>
                </div>
                <div class="sign-component-not-nescessary">
                    <div v-if="!avatar" class="sign-component-not-nescessary-avatar">
                        <input class="sign-component-not-nescessary-avatar-input" type="file" @change="saveavatar">
                        <v-icon icon="mdi-camera-outline"></v-icon>
                    </div>
                    <div v-else class="sign-component-not-nescessary-avatar">
                        <input class="sign-component-not-nescessary-avatar-input" type="file" @change="saveavatar">
                        <v-img class="sign-component-not-nescessary-avatar-value" :src="avatar" alt="avatar" aspect-ratio="1/1" :width="100"/>
                    </div>
                    <v-textarea class="sign-component-not-nescessary-bio" label="bio, describe yourself" variant="outlined"/>
                </div>
                <div class="sign-component-info">
                    <span class="sign-component-info-label">* - nescessary to complete creating the account</span>
                </div>
                <div class="sign-component-buttons">
                    <v-btn class="sign-component-buttons-label" rounded="xl" color="grey">
                        Clear
                    </v-btn>
                    <v-btn class="sign-component-buttons-label" rounded="xl" color="purple-darken-2">
                        Create account
                    </v-btn>
                </div>
            </div>
        </div>
    </BaseDialog>
</template>
<script>
import BaseDialog from '../base/BaseDialog.vue'
import router from '../router';
import { register } from '../services/auth.service';
import authHeader from '../services/auth-header';

export default {
    components: {
        BaseDialog
    },
    data() {
        return {
            avatar: null,
            login: String,
            email: String,
            telNumber : String,
            password : String,
            bio: String,
        }
    },
    methods : {
        saveAvatar(event) {
            this.avatar = URL.createObjectURL(event.target.files[0])
        },
        onRegister() {
            register(this.login, this.email, this.telNumber, this.password, this.bio, this.avatar)
                .then(() => {
                    router.push('/home');
                    authHeader();
                })
                .catch(() => {
                    console.log('error');
                });
        }
    },
}
</script>
<style lang="scss">
.signInComponent {
    .sign-label {
        font-size: 2vw;
        font-weight: 700;
        padding: 10px 0 10px 0;
        text-align: center;
        @media screen and (max-width: 768px) {
            font-size: 4vw;
        }
    }
    .sign-component {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        padding: 20px 0 0 0;
        @media screen and (max-width: 768px) {
            display: flex;
            flex-direction: column;
        }
        .sign-component-nescessary {
            display: flex;
            flex-direction: column;
            gap: 5px;
            align-self: end;
            width: 100%;
            .sign-component-nescessary-value {
                width: 100%;
            }
        }
        .sign-component-not-nescessary {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            .sign-component-not-nescessary-avatar {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #d1b2d3;
                border-radius: 90px;
                width: 150px;
                height: 150px;
                cursor: pointer;
                border: 1px solid #c5c5c5;
                .sign-component-not-nescessary-avatar-value {
                    border-radius:90px;
                    background-color:transparent;
                    cursor: pointer;
                }
                .sign-component-not-nescessary-avatar-input {
                    opacity: 0;
                    position: absolute;
                    cursor: pointer;
                    height: 150px;
                    width: 150px;
                    z-index: 10;
                }
            }
            .sign-component-not-nescessary-bio {
                align-self: end;
                width: 100%;
            }
        }
        .sign-component-buttons {
            grid-column-start: 2;
            justify-self: end;
            display: flex;
            gap: 10px;
            .sign-component-buttons-label {
                font-weight: 700;
            }
        }
    }
}

</style>