<template>
    <div id="studentProfile">
       <section class="section section-large">
           <div class="container">
               <div class="row">
                <div class="col-lg-3">
                    
                    <div class="profile-avatar">
                        <p class="avatar-letter">{{first_name[0]}} {{last_name[0]}}</p>
                    </div>

                    <div class="profile-details text-center">
                        <h2>{{first_name}} {{last_name}}</h2>
                        <p class="username">@{{username}}</p>
                        <hr>
                        <div class="profile-subdetails text-left">
                            <span>Account Type:</span> <p> {{type}}</p>
                            <span>Account Status:</span> <p>{{status}}</p>
                        </div>
                     
                    </div>
                </div>   
                <div class="col-lg-9">
                  
                    <div class="profile-form">
                        <h1 class="profile-heading">Main Details <span>~ Can't be changed</span></h1>
                        <div class="profile-fields">
                                <h3 class="profile-subheading">Email</h3>
    
                                <base-input
                                alternative
                                disabled
                                class="mb-3"
                              
                                placeholder="Email"
                                v-model.trim="email"
                                ></base-input>
                            </div>
                            <div class="profile-fields">
                                <h3 class="profile-subheading">Username</h3>
                               
                                <base-input
                                alternative
                                    disabled
                                class="mb-3 profile-input"
                                placeholder="Username"
                                v-model.trim="username"
                                ></base-input>
                            </div>
                              <div class="profile-fields">
                                <h3 class="profile-subheading">Phone number</h3>
                                
                                <base-input
                                alternative
                                disabled
                                class="mb-3"
                              
                                placeholder="+254 - - -  - - -  - - -"
                                v-model.trim="phoneNumber"
                                ></base-input>
                            </div>
                            <hr>
                            <base-alert v-if="detail_error" type="danger" dismissible="true">
                            {{
                            message
                            }}
                        </base-alert>
                        <base-alert v-if="detail_success" type="success" dismissible="true">
                            {{
                            message
                            }}
                        </base-alert>
                             <h1 class="profile-heading">Personal Details <span>~ Fill in both details</span></h1>
                            <div class="profile-fields">
                                <h3 class="profile-subheading">First name</h3>
                              
                                <base-input
                                alternative
                                class="mb-3"
                      
                                placeholder="First name"
                                v-model.trim="fname"
                                ></base-input>
                            </div>
                            <div class="profile-fields">
                                <h3 class="profile-subheading">Last name</h3>
                             
                                <base-input
                                alternative
                                class="mb-3"
                              
                                placeholder="Last name"
                                v-model.trim="lname"
                                ></base-input>
                            </div>
                    
                             <div class="text-right">
                                <base-button
                                class="my-4 btn-green btn-sm"
                                type="success"
                                @click="updateDetails"
                                >Update details</base-button>
                                
                            </div>
                        <form role="form">
                            <base-alert v-if="password_error" type="danger" dismissible="true">
                            {{
                            message
                            }}
                        </base-alert>
                        <base-alert v-if="password_success" type="success" dismissible="true">
                            {{
                            message
                            }}
                        </base-alert>
                            <h1 class="profile-heading">Password Change</h1>
                            <div class="profile-fields">
                                <h3 class="profile-subheading">New Password</h3>
                
                                <span v-if="!$v.password.minLength">Password must be at least 6 characters</span>
                                <span v-if="!$v.password.maxLength">password too long</span>
                                <base-input
                                alternative
                                type="password"
                                placeholder="Password"
                                v-model.trim="password"
                                ></base-input>
                            </div>
                            <div class="profile-fields">
                                <h3 class="profile-subheading">Confirm new password</h3>
                               
                                <span v-if="!$v.confirm_password.sameAsPassword">Passwords must match</span>
                                <base-input
                                alternative
                                type="password"
                                placeholder="Confirm Password"
                                v-model.trim="confirm_password"
                                ></base-input>
                            </div>
                            <div class="text-right">
                                <base-button
                                class="my-4 btn-green btn-sm"
                                type="success"
                                @click="updatePassword"
                                >Update password</base-button>
                                
                            </div>
                        </form>
                    </div>
                </div>
                
              
               </div>
           </div>
       </section>
    </div>
</template>

<script>
import {
  required,
  minLength,
  sameAs,
  maxLength
} from 'vuelidate/lib/validators';
import axios from 'axios';
export default {
    data(){
        return{
            fname:'',
            lname:'',
            first_name:'',
            last_name:'',
            username:'',
            email:'',
            phoneNumber:'',
            verified: false,
            status: 'Free Account',
            classes:0,
            type:'',
            submitted: false,
            password: '',
            confirm_password: '',
            detail_success: false,
            detail_error: false,
            password_success: false,
            password_error: false,
            message:''
        }
    },
    computed: {
        getusername: function(){
            return this.$store.getters.username;
        }
    },
    validations: {
        password: { required, minLength: minLength(6), maxLength: maxLength(13) },
        confirm_password: { required, sameAsPassword: sameAs('password') }
    },
    methods:{
        getDetails: function(){
            const studID = this.$store.getters.userID;
            axios({
                url:`/api/students/${studID}/profile`,
                method:'GET'
            }).then(resp =>{
                this.username = resp.data.username;
                this.email = resp.data.email;
                this.type =  resp.data.type;
                this.verified = resp.data.verified;
                this.phoneNumber = resp.data.phoneNumber;
                this.first_name = resp.data.first_name;
                this.last_name = resp.data.last_name;
                this.classes = resp.data.classes;
                if (resp.data.status == true) {
                    this.status = "Paid Account";
                } else {
                    this.status = "Free Account";
                }
            }) .catch(err => {
              // eslint-disable-next-line no-console
              console.log(err);
            });
        },
        updateDetails: function(){
              axios({
                url:'/api/students/profile/update',
                data:{
                    username: this.$store.getters.username,
                    first_name: this.fname,
                    last_name: this.lname
                },
                method:'POST'
            }).then(resp =>{
                this.first_name = resp.data.first_name;
                this.last_name = resp.data.last_name;
                this.detail_success = resp.data.success;
                this.message = resp.data.msg;
            }) .catch(err => {
              // eslint-disable-next-line no-console
              console.log(err);
            });  
        },
        updatePassword: function(){
            
              axios({
                url:'/api/users/password/update',
                method:'POST',
                data:{
                    username: this.$store.getters.username,
                    password: this.password,
                }
            }).then(resp =>{
                this.password_success = resp.data.success;
                this.message = resp.data.msg;
                this.password = '';
                this.confirm_password = '';
                   
            }) .catch(err => {
              // eslint-disable-next-line no-console
              console.log(err);
            });  
        },
    },
    mounted(){
        this.getDetails();
    }
}
</script>