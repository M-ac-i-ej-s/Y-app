<template>
    <v-dialog :width="dialogWidth" class="Component">
        <template v-slot:activator="{ props }">
            <div v-if="!isRepost" class="component-container">
                <v-btn v-if="!isNav || width > 1200" class="component-button" rounded="xl" v-bind="props" :color="buttonColor">
                    {{ buttonLabel }}
                </v-btn>
                <v-btn v-else icon="mdi-plus" color="#582b5a" v-bind="props"/>
            </div>
            <div v-else>
                <v-icon class="component-icon" icon="mdi-repeat-variant" v-bind="props"/>
            </div>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card class="component">
            <div class="component-header">
                <div class="component-header-button">
                    <v-btn
                    icon="mdi-close"
                    variant="text"
                    size="small"
                    @click="isActive.value = false"
                    ></v-btn>
                </div>
                <img class="component-header-image" src="../assets/Ylogo.png" alt="yLogo">
                <div class="component-header-decoy"/>
            </div>
            <div class="component-actions">
                <slot></slot>
            </div>
          </v-card>
        </template>
      </v-dialog>
</template> 

<script>

export default {
    name: 'BaseDialog',
    props: {
        buttonLabel: String,
        dialogWidth: Number,
        buttonColor: {
            type: String,
            default: 'white'
        },
        isNav: {
            type: Boolean,
            default: false
        },
        width: Number,
        isRepost: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style lang="scss" scoped>
.component-container {
    width: 100%;
    .component-button {
        width: 100%;
        font-weight: 700;
        color: #582b5a;
}
}
.component-icon {
    color: gray;
    cursor: pointer;
    transition: 0.2s ease;
    border-radius: 50%;
    &:hover {
        color: #99a127;
    }
}
.Component {
    .component {
        padding: 10px 10px 20px 10px;
        .component-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 5px 0 5px;
            .component-header-image {
                width: 10%;
            }
            .component-header-button {
                width: 10%;
            }
            .component-header-decoy {
                width: 10%;
            }
        }
        .component-actions {
            display: flex;
            flex-direction: column;
            padding: 0 50px 0 50px;
            gap: 20px;
            .component-actions-label {
                display: flex;
                justify-content: center;
                font-size: 2vw;
                font-weight: 700;
                padding: 10px 0 10px 0;
                text-align: center;
                .component-actions-label-spacer {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                
                }
            }
            .component-actions-login {
                display: flex;
                justify-content: center;
                .component-actions-button {
                    width: 80%;
                    font-weight: 700;
                }
            }
        }
    }
}

</style>