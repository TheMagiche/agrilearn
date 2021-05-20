<template>
    <div id="premiumMember">
    <section class="section section-lg">
        <div class="container">
        <div class="row">
          
                <div class="premium-text text-center col-lg-4">
                    <div class="premiumContent">
                        <div class="imagePremiumContainer">
                            <img :src="require('@/assets/images/loving.png')" height="15em" alt="instructorimg"/>
                        </div> 
                    <p class="premium-text">Thank you very much for supporting AgriSkul</p>  
                    </div>
                    <div class="text-center">
                        <base-button
                        v-if="!hidden && !completed"
                        class="my-4 btn-warning btn-sm"
                        type="warning"
                        @click="getPremium"
                        >Continue to payment page</base-button>
                        <!-- <base-button
                        v-if="confirmed"
                        class="my-4 btn-warning btn-sm"
                        type="warning"
                        @click="checkPremiumStatus"
                        >Check status of payment</base-button> -->
                        <base-button
                        v-if="completed"
                        class="my-4 btn-green btn-sm"
                        type="success"
                        @click="confirmPremiumStatus"
                        >Complete Process</base-button>
                    </div>           
                </div>
                <div class="col-lg-8">
                    <div class="main-premium-text">{{ message }}</div>
                    <div class="iframeDiv">
                        <vue-friendly-iframe v-if="hidden" :src="pesapalUrl" @load="onLoad"></vue-friendly-iframe>
                    </div>
                    <div v-if="completed" class="completePay">
                        You've got a premuim account for the next 30 days!
                    </div>
                </div>
           
        </div>
      </div>
    </section>
    </div>
</template>

<script>
import axios from 'axios';
// http://www.mysite.com/processingorder? pesapal_transaction_tracking_id=195035be-56bb-48ba-8439-7e12196cb87e&pesapal_merchant_reference=12345
export default {
    data(){
        return{
            message:"Click 'Continue to payment' and wait for the payment page to load. Powered by pesapal.com",
            hidden: false,
            // confirmed: false,
            pesapalUrl:'',
            pesapal_transaction_tracking_id: null,
            pesapal_merchant_reference: null,
            completed: false,
        }
    },
    methods: {
        getPremium: function () {
            const studID = this.$store.getters.userID;
            axios({
                url:`/api/students/${studID}/premium`,
                method:'POST'
            }).then(resp =>{
                this.pesapalUrl = resp.data.urlRedirect;
                this.hidden = true; 
                this.message = resp.data.msg;
            }).catch(err =>{
                // eslint-disable-next-line no-console
                console.log(err);
            });
        },
        onLoad: function(){

        },
        // checkPremiumStatus: function(){
        //     const studID = this.$store.getters.userID;
        //     axios({
        //         url:`/api/students/${studID}/checkpremium`,
        //         method:'POST',
        //         data: {
        //             pesapal_transaction_tracking_id: this.pesapal_transaction_tracking_id,
        //             pesapal_merchant_reference: this.pesapal_merchant_reference
        //         }
        //     }).then(resp =>{
        //         this.hidden = false; 
        //         this.message = resp.data.msg;
        //         if(resp.data.success){
        //             this.confirmed = true; 
        //         }
        //     }).catch(err =>{
        //         // eslint-disable-next-line no-console
        //         console.log(err);
        //     });
        // },
        confirmPremiumStatus: function(){
             const studID = this.$store.getters.userID;
            axios({
                url:`/api/students/${studID}/confirmpremium`,
                method:'POST',
                data: {
                    userID: this.$store.getters.userID
                }
            }).then((res) =>{
                if (res.data.success) {
                    this.$router.push({ name: "studentProfile"});
                } else if (res.data.success == false) {
                    this.error = true;
                    this.message = res.data.msg;
                }
                
            }).catch(err =>{
                // eslint-disable-next-line no-console
                console.log(err);
            });
        },
        checkQueryInRoute: function(){
            if(this.$route.query.pesapal_transaction_tracking_id || this.$route.query.pesapal_merchant_reference){
                this.pesapal_transaction_tracking_id = this.$route.query.pesapal_transaction_tracking_id;
                this.pesapal_merchant_reference =  this.$route.query.pesapal_merchant_reference;
                // this.confirmed = true;
                this.completed = true;
                this.hidden = false;
                this.message ="Click 'Complete Process' as payment is validated and proceed to profile page";
            }
        }
    },
    mounted(){
        this.checkQueryInRoute();
    }
}
</script>