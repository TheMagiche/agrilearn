<template>
    <div id="premiumMember">
    <section class="section section-lg">
      <div class="container">
        <div class="row justify-content-center">
            <div class="wrapper row mb-3">
                <div class="premium-text text-center col-lg-4">
                    Thank you very much for supporting
                    <p>AgriSkul</p>
                    <p>{{ message }}</p>

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
                        >Success</base-button>
                    </div>  
                    
                </div>
                <div class="loader text-center col-lg-8">
                    <vue-friendly-iframe v-if="hidden" :src="pesapalUrl" @load="onLoad"></vue-friendly-iframe>
                    <div v-if="completed" class="completePay">
                        You've got a premuim account for the next 30 days!
                    </div>
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
            message:"Click below and wait for the payment page, to load. Powered by pesapal.com",
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
                this.message ="Click below to check status of the payment.";
            }
        }
    },
    mounted(){
        this.checkQueryInRoute();
    }
}
</script>