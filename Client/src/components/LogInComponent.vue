<template>
    <BaseDialog :buttonLabel="'Log in'" :dialogWidth="550">
            <div class="login-component-actions">
                <div class="login-component-actions-label">
                    <div class="login-component-actions-label-spacer">
                        <span>Log in to your</span>
                        <span>Y account.</span>
                    </div>
                </div>
                <div class="login-component-actions-buttons">
                    <v-text-field
                    class="login-component-actions-buttons-value"
                    label="Email"
                    variant="outlined"
                    v-model="email"
                    prepend-icon="mdi-email-outline"
                    ></v-text-field>
                    <v-text-field
                    class="login-component-actions-buttons-value"
                    label="Password"
                    variant="outlined"
                    v-model="password"
                    prepend-icon="mdi-lock-outline"
                    type="password"
                    ></v-text-field>
                </div>
                <div class="login-component-actions-error" v-if="errorMessage">
                    <span>
                        {{errorMessage}}
                    </span>
                </div>
                <div class="login-component-actions-login">
                    <v-btn class="login-component-actions-login-button" rounded="xl" color="purple-darken-2" @click="onLogin">
                        Log In
                    </v-btn>
                </div>
            </div>
    </BaseDialog>
</template> 

<script>
import BaseDialog from '../base/BaseDialog.vue'
import { login } from '../services/auth.service';
import { mapMutations } from 'vuex';
import router from '../router';

export default {
    components: {
        BaseDialog
    },
    data() {
        return {
            email: null,
            password: null,
            errorMessage: ''
        }
    },
    methods: {
        onLogin() {
            login(this.email, this.password)
                .then((response) => {
                    this.loggedIn(response.User);
                    router.push('/home');
                })
                .catch((err) => {
                    if(err.response.status === 400) {
                        this.password = null;
                        this.errorMessage = err.response.data.message;
                    } else {
                        router.push('/errorpage');
                    }
            })
        },
        ...mapMutations(['loggedIn', 'loggedOut']),
    },

}
</script>
<style lang="scss" scoped>
.login-component-actions {
    display: flex;
    flex-direction: column;
    padding: 0 50px 0 50px;
    gap: 20px;
    .login-component-actions-label {
        display: flex;
        justify-content: center;
        font-size: 2vw;
        font-weight: 700;
        padding: 10px 0 10px 0;
        text-align: center;
        .login-component-actions-label-spacer {
            display: flex;
            flex-direction: column;
            gap: 5px;
            }
    }
    .login-component-actions-login {
        display: flex;
        justify-content: center;
        .login-component-actions-login-button {
            width: 80%;
            font-weight: 700;
        }
    }
    .login-component-actions-buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        .login-component-actions-buttons-value {
            width: 100%;
        }

    }
    .login-component-actions-error {
        position: absolute;
        margin: 265px 0 0 55px; 
        color: red;
        font-weight: 700;
    }
}
.login-component-button {
        width: 100%;
        font-weight: 700;
        color: #582b5a;
}
</style>