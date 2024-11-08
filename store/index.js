import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        accessToken: uni.getStorageSync("accessToken") || "",
        userInfo: uni.getStorageSync("userInfo") || {},
    },
    mutations:{
        refreshUser(state, data){
            state.userInfo = data;
            uni.setStorageSync("userInfo", data);
        },
        //清除用户信息
        deleteUser(state) {
          state.userInfo = {}
          uni.removeStorageSync("userInfo");
          uni.removeStorageSync("accessToken");
        },
        setToken(state,data){
            state.accessToken = data;
            uni.setStorageSync("accessToken", data);
        }

    },
    actions:{
        getUserInfo({commit},{_this}){
            _this.$u.api.queryByUser().then(res=>{
                let data = {
                    ...res.data.user,
                }
                commit('refreshUser',res.data)
            })
        },
    }
})



export default store;