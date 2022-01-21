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
            // 商品資料存放處
            products: [],
            // 右側商品明細資料存放處
            templateProduct: {}
        }
    },
    methods: {
        // 驗證使用者
        checkUser() {
            axios.post(`${this.url}v2/api/user/check`)
                .then(res => {
                    console.log('管理者驗證成功');
                })
                .catch(err => {
                    alert(err.data.message);
                    window.location = 'index.html';
                })
        },
        // 取得產品資料
        getData() {
            axios.get(`${this.url}v2/api/${this.api_path}/admin/products`)
                .then(res => {
                    this.products = res.data.products;
                    console.log(this.products);
                })
                .catch(err => {
                    console.log(err.data.message);
                })
        },
        // 刪除指定資料
        deleteProduct(id) {
            axios.delete(`${this.url}v2/api/${this.api_path}/admin/product/${id}`)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err.data.message);
                })
        },
        // 取得產品詳細資料
        getProductInfo(item) {
            this.templateProduct = item;
        }

    },
    mounted() {
        // 取出 Token 的值
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        // 預設 headers 內夾帶 token 的值
        axios.defaults.headers.common.Authorization = token;

        // 進入網頁後，驗證使用者的身分，避免有人直接從後台網址進入
        this.checkUser();
        // 取得產品資料
        this.getData();
        // 刪除資料用
        // this.deleteProduct('-MtrC9h-n7YEU7z6aXu0');
    }
})
app.mount('#app');