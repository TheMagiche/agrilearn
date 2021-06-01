<template>
    <a-drawer title="Become a premium member" width="80%" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose">
        <div v-if="!hidden && !completed" class="premium-welcome">
            <div class="premium-text">{{ message }}</div>
            <img :src="require('@/assets/images/loving.png')" height="100%" alt="instructorimg" />
            <p class="premium-text">Thank you very much for supporting AgriSkul</p>

            <a-button @click="getPremium" type="primary"> Continue to payment page </a-button>
        </div>

        <div v-if="hidden" class="premium-welcome">
            <div class="premium-text">{{ message }}</div>
            <a-spin :spinning="spinning" tip="Loading...">
                <div class="iframeDiv">
                    <vue-friendly-iframe v-if="hidden" :src="pesapalUrl" @load="onLoad"></vue-friendly-iframe>
                </div>
            </a-spin>
        </div>

        <div v-if="completed" class="premium-welcome">
            <img :src="require('@/assets/images/loving.png')" height="100%" alt="instructorimg" />
            <p class="premium-text">You've got a premuim account for the next 30 days!</p>
            <a-button type="primary" @click="confirmPremiumStatus">Complete Process</a-button>
            <div class="premium-text">{{ message }}</div>
        </div>
    </a-drawer>
</template>
<style scoped>
span {
    display: inline;
    margin: 0px;
    padding: 0px;
    color: red;
}
.premium-welcome {
    height: 60vh;
    text-align: center;
}
.premium-text {
    font-weight: bold;
    color: black;
}
.iframeDiv {
    width: 100% !important;
    height: 80vh !important;
}
.vue-friendly-iframe {
    width: 100% !important;
    height: 100% !important;
}

@media (max-width: 500px) {
    .premium-welcome img {
        width: 100% !important;
    }
}
</style>
<script>
import { bus } from '@/event-bus';
import axios from 'axios';

export default {
    name: 'PremiumModal',
    data() {
        return {
            message: "Click 'Continue to payment' and wait for the payment page to load. Powered by pesapal.com",
            hidden: false,
            pesapalUrl: '',
            pesapal_transaction_tracking_id: null,
            pesapal_merchant_reference: null,
            completed: false,
            visible: false,
            spinning: true,
        };
    },
    methods: {
        getPremium: function () {
            const studID = this.$store.getters.userID;
            axios({
                url: `/api/students/${studID}/premium`,
                method: 'POST',
            })
                .then((resp) => {
                    this.pesapalUrl = resp.data.urlRedirect;
                    this.hidden = true;
                    this.message = resp.data.msg;
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        onLoad() {
            setTimeout(() => {
                this.spinning = false;
            }, 5000);
        },
        onClose() {
            this.visible = false;
        },
        confirmPremiumStatus: function () {
            const studID = this.$store.getters.userID;
            axios({
                url: `/api/students/${studID}/confirmpremium`,
                method: 'POST',
                data: {
                    userID: this.$store.getters.userID,
                },
            })
                .then((res) => {
                    if (res.data.success) {
                        bus.$emit('stud-premium', true);
                        this.visible = false;
                    } else if (res.data.success == false) {
                        this.error = true;
                        this.message = res.data.msg;
                    }
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        checkQueryInRoute: function () {
            if (this.$route.query.pesapal_transaction_tracking_id || this.$route.query.pesapal_merchant_reference) {
                this.pesapal_transaction_tracking_id = this.$route.query.pesapal_transaction_tracking_id;
                this.pesapal_merchant_reference = this.$route.query.pesapal_merchant_reference;
                // this.confirmed = true;
                this.completed = true;
                this.hidden = false;
                this.message = "Click 'Complete Process' as payment is validated and proceed to profile page";
            }
        },
    },

    created() {
        bus.$on('premium-visible', (val) => {
            this.visible = val;
        });
    },
    mounted() {
        this.checkQueryInRoute();
    },
};
</script>
