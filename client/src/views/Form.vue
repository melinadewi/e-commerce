<template>
    <div>
        <img alt="Tokoshop" src="../assets/logo.png">
        <br>
        <b-container class ="bv-example-row">
            <b-row align-h="center">
                <b-col cols="4">
                    <b-card>
                        <b-card-text style="font-size: 14px" v-if="$store.state.user.username">
                            <b>Username:</b><br>{{$store.state.user.username}}<br>
                            <b>Email:</b> {{$store.state.user.email}} 
                        </b-card-text>
                        <b-card-text v-if="!$store.state.user.username">
                            <router-link to="/user/register">Register Form</router-link><br>
                            <router-link to="/user/login">Login Form</router-link>
                        </b-card-text>
                    </b-card>
                    <router-view />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
}
</script>
