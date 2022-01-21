// 設定 url 及 API 路徑
import {
    createApp
} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const app = createApp({
    data() {
        return {
            // 站點網址
            url: 'https://vue3-course-api.hexschool.io/',
            // 自己申請的 API 路徑
            api_path: 'ivy2846357',
            // 登入帳密儲存區
            user: {
                'username': '',
                'password': ''
            }
        }
    },
    methods: {
        login() {
            axios.post(`${this.url}v2/admin/signin`, this.user)
                .then(res => {
                    // 抓取 token 和 expired 的值
                    const {
                        token,
                        expired
                    } = res.data;
                    // 將兩個值放進 cookie 內
                    document.cookie = `myToken=${token}; expires=${new Date(expired)}`;
                    window.location = 'product.html';
                    console.log(res);
                })
                .catch(err => {
                    alert(err.data.message);
                })
        }
    }
})
app.mount('#app');