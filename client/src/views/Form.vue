<template>
    <div>
        <img alt="Vue logo" src="../assets/logo.png">
        <br>
        <b-container class ="bv-example-row">
            <b-row align-h="center">
                <b-col cols="4">
                    <router-view />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
  created () {
    this.$router.push('/user/login')
  }
}
</script>
