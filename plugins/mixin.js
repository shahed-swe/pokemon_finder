import Vue from 'vue';

Vue.mixin({
    methods:{
        async apiCALL(method, url, dataObj){
            try{
                let apiConfig = {
                    method: method,
                    url: url
                };
                if(method === 'get'){
                    apiConfig.params = dataObj
                }else{
                    apiConfig.data = dataObj
                }

                let data = await this.$axios(apiConfig)
                return data;
            }catch(error){
                return error.response
            }
        }
    }
})