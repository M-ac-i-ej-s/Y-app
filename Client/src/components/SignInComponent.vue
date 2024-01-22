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
                        v-model="login"
                        prepend-icon="mdi-account-outline"
                    ></v-text-field>
                    <span class="sign-component-nescessary-error login" v-if="loginErrorMessage">
                        {{ loginErrorMessage }}
                    </span>
                    <v-text-field
                        class="sign-component-nescessary-value"
                        label="Email*"
                        variant="outlined"
                        v-model="email"
                        prepend-icon="mdi-email-outline"
                    ></v-text-field>
                    <span class="sign-component-nescessary-error email" v-if="emailErrorMessage">
                        {{ emailErrorMessage }}
                    </span>
                    <v-text-field
                        class="sign-component-nescessary-value"
                        label="Telephone Number*"
                        variant="outlined"
                        v-model="telNumber"
                        prepend-icon="mdi-phone-outline"
                    ></v-text-field>
                    <span class="sign-component-nescessary-error tel" v-if="telNumberErrorMessage">
                        {{ telNumberErrorMessage }}
                    </span>
                    <v-text-field
                        :class="`sign-component-nescessary-value ${passwordColor}`"
                        label="Password*"
                        variant="outlined"
                        v-model="password"
                        prepend-icon="mdi-lock-outline"
                        type="password"
                    ></v-text-field>
                    <span class="sign-component-nescessary-error password" v-if="passwordErrorMessage">
                        {{ passwordErrorMessage }}
                    </span>
                </div>
                <div class="sign-component-not-nescessary">
                    <div class="sign-component-not-nescessary-avatar" v-if="!avatarPreview">
                        <input class="sign-component-not-nescessary-avatar-input" type="file" @change="saveAvatar">
                        <v-icon icon="mdi-camera-outline"></v-icon>
                    </div>
                    <div v-else class="sign-component-not-nescessary-avatar">
                        <input class="sign-component-not-nescessary-avatar-input" type="file" @change="saveAvatar">
                        <img class="sign-component-not-nescessary-avatar-value" :src="avatarPreview" alt="avatar"/>
                    </div>
                    <v-textarea class="sign-component-not-nescessary-bio" label="bio, describe yourself" variant="outlined" v-model="bio"/>
                </div>
                <div class="sign-component-info">
                    <span class="sign-component-info-label">* - nescessary to complete creating the account</span>
                </div>
                <div class="sign-component-buttons">
                    <v-btn class="sign-component-buttons-label" rounded="xl" color="grey" @click="onClear">
                        Clear
                    </v-btn>
                    <v-btn class="sign-component-buttons-label" rounded="xl" color="purple-darken-2" @click="onRegister" :disabled="loginError || emailError || telNumberError || passwordError">
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
import { checkIfUserExists, checkIfEmailExists, checkIfPhoneExists } from '../services/user.service';
import { register } from '../services/auth.service';
import authHeader from '../services/auth-header';
import { mapMutations } from 'vuex';

export default {
    components: {
        BaseDialog,
    },
    data() {
        return {
            formData: new FormData(),
            avatarPreview: null,
            avatar: null,
            login: '',
            email: '',
            telNumber: '',
            password: '',
            bio: '',
            loginError: true,
            loginTimer: null,
            loginErrorMessage: '',
            emailError: true,
            emailTimer: null,
            emailErrorMessage: '',
            telNumberError: true,
            telNumberTimer: null,
            telNumberErrorMessage: '',
            passwordStrength: 0,
            passwordError: true,
            passwordErrorMessage: '',
            passwordColor: ''
        }
    },
    methods : {
        saveAvatar(event) {
            this.avatarPreview = URL.createObjectURL(event.target.files[0])
            this.avatar = event.target.files[0];
        },
        onRegister() {
            register(this.login, this.email, this.telNumber, this.password, this.bio, this.avatar)
                .then((response) => {
                    this.loggedIn(response.User);
                    router.push('/home');
                    authHeader();
                })
                .catch((err) => {
                    router.push('/errorpage');
                });
        },
        validateEmail() {
            return String(this.email)
                .toLowerCase()
                .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        },
        validatePhone() {
            const phoneNum = this.telNumber.replace(/[^\d]/g, '');
            if(phoneNum.length > 6 && phoneNum.length < 11) {
                  return true;  
            } else {
                return false;
            }
        },
        checkpassword() {
            if(this.password === ''){
                this.passwordColor = '';
                this.passwordStrength = 0;
                return;
            }

            if (this.password.length < 6) {
                this.passwordError = true;
                this.passwordColor = 'red';
                this.passwordErrorMessage = 'minimum number of characters is 6';
                return;
            } else {
                this.passwordError = false;
                this.passwordErrorMessage = '';
            }

            if (this.password.match(/[0-9]+/) && this.password.match(/[$@#&!]+/)) {
                this.passwordColor = 'green';
                this.passwordStrength = 2;
            } else if (this.password.match(/[0-9]+/) || this.password.match(/[$@#&!]+/)) {
                this.passwordColor = 'orange';
                this.passwordStrength = 1;
            } else {
                this.passwordErrorMessage = 'password not strong enough';
                this.passwordColor = 'red';
                this.passwordError = true;
                this.passwordStrength = 0;
            }
        },
        onClear() {
            this.login = '';
            this.email = '';
            this.telNumber = '';
            this.password = '';
            this.bio = '';
            this.avatar = null;
        },
        ...mapMutations(['loggedIn', 'loggedOut']),
    },
    watch: {
        login: async function() {
            if(this.loginTimer) {
                clearTimeout(this.loginTimer);
            }

            if(this.login === '') {
                this.loginErrorMessage = '';
                return;
            }

            this.loginTimer = setTimeout(async () => {
                    try {
                        const res = await checkIfUserExists(this.login);
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
        email: async function() {
            if(this.emailTimer) {
                clearTimeout(this.emailTimer);
            }

            if(this.email === '') {
                this.emailErrorMessage = '';
                return;
            }

            if(this.validateEmail()) {
                this.emailTimer = setTimeout(async () => {
                    try {
                        const res = await checkIfEmailExists(this.email);
                        if (res) {
                            this.emailError = true;
                            this.emailErrorMessage = 'This email is already taken';
                        } else {
                            this.emailError = false;
                            this.emailErrorMessage = '';
                        }
                    } catch (error) {
                        router.push('/errorpage');
                    }
                 }, 500);
            } else {
                this.emailError = true;
                this.emailErrorMessage = 'This email is not valid';
            }
        },
        telNumber: function() {
            if (this.telNumberTimer) {
                clearTimeout(this.telNumberTimer);
            }

            if(this.telNumber === '') {
                this.telNumberErrorMessage = '';
                return;
            }

            if(this.validatePhone()) {
                this.telNumberTimer = setTimeout(async () => {
                    try {
                        const res = await checkIfPhoneExists(this.telNumber);
                        if (res) {
                            this.telNumberError = true;
                            this.telNumberErrorMessage = 'This phone number is already taken';
                        } else {
                            this.telNumberError = false;
                            this.telNumberErrorMessage = '';
                        }
                    } catch (error) {
                        router.push('/errorpage');
                    }
                 }, 500);
            } else {
                this.telNumberError = true;
                this.telNumberErrorMessage = 'This phone number is not valid';
            }
        },
        password: function() {
            this.checkpassword(this.password);
        }
    }
}
</script>
<style scoped lang="scss">
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
                &.red {
                    color: red;
                }
                &.orange {
                    color: orange;
                }
                &.green {
                    color: green;
                }
            }
            .sign-component-nescessary-error {
                position: absolute;
                color: red;
                font-size: 12px;
                &.login {
                    margin: 60px 0 0 50px;
                }
                &.email {
                    margin: 142px 0 0 50px;
                }
                &.tel {
                    margin: 224px 0 0 50px;
                }
                &.password {
                    margin: 306px 0 0 50px;
                }
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
                    width: 150px;
                    height: 150px;
                    background-color:transparent;
                    object-fit: cover;
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