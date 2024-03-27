<template>
    <div class="lg:px-48 px-12 pt-24 flex items-center justify-center "  >
        <div class="flex justify-center items-center shadow bg-gradient-to-r rounded-2xl  from-green-500 to-blue-500 p-10">


            <form v-on:submit.prevent="login()" class=" flex w-auto flex-col gap-5 ">
                <vs-alert v-show="error" danger flat>
          
                <ul>
                    <li v-for="(value, key) in errorMessage" :key="key">
                    {{ key }} : {{ value[0] }}
                    </li>
                </ul>
                 </vs-alert>

                <vs-alert v-show="success" success flat>
                    <template #title>
                        logged with success
                    </template>
                </vs-alert>



                <vs-input v-model="user.email" placeholder="Email">
                    <template v-if="validEmail" #message-success>
                        Email Valid
                    </template>
                    <template v-if="!validEmail && user.email !== ''" #message-danger>
                        Email Invalid
                    </template>
                </vs-input>

                <vs-input type="password" v-model="user.password" placeholder="Password">
                    <template v-if="user.password && user.password.length < 4" #message-warn>
                        short password
                    </template>
                </vs-input>

                <vs-button class="w-24" :loading="active = 0" > Register
                </vs-button>
            </form>
            <div class=" lg:w-1/2  pl-10 hidden lg:block ">
                <img src="OIP.jpg" alt="">
            </div>
        </div>
    </div>
</template>
<script>

import axios from '../axios/axios-config.js';
export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            status: false
            ,
            error: false
            ,
            success: false
            ,
            errorMessage: {
                "whrong" : ["password or email"]
            }
        };
    }
    ,
    computed: {
        validEmail() {
            return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email)
        }
    },
    methods: {
        login() {

            axios.post('/login', this.user)
                .then(response => {
                    console.log(response.data)
                    this.success = true
                    this.error = false
                    localStorage.setItem('name', response.data.data.name)
                    localStorage.setItem('email', response.data.data.email)
                    localStorage.setItem('token', response.data.token)
                    this.$router.push('/');
                })
                .catch(error => {
                    console.log(error.response.data.errors)
                    this.error = true
                    this.success = false
                    if(error.response.data.errors)
                        this.errorMessage = error.response.data.errors
                    else  this.errorMessage = {

                        "whrong" : ["password or email"]
                    }
                    this.user.password = "";
                }).finally(() => {
                });
        }
    },
    beforeUpdate() {
        this.status = true
    },
    updated() {
        this.status = false
    }

}
</script>