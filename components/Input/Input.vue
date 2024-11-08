<template>
	<view class="input-container">
		<!-- <view v-if="emailError && email" class="error">{{ emailError }}</view> -->
		<transition name="label-fade" mode="out-in">
			<view v-if="isFocused || hasValue" key="label" class="label"
				:class="{ 'label-visible': isFocused || hasValue }" :style="(emailError && email)?'color: red':''">
				{{ (emailError && email)?emailError:label }}
			</view>
		</transition>
		<u-input disabledColor="transparent" :disabled='disabled' ref="input" v-model="inputValue" class="input-field" :type="pswtype"
			:class="{ 'input-raised': !(isFocused || hasValue), 'input-lowered': isFocused || hasValue }"
			:placeholder="isFocused || hasValue ? '' : placeholder" @focus="handleFocus" @blur="handleBlur"
			@input="handleInput" />
		<view class="password-box" v-if="password">
			<image class="img" @click="changepswdShow" v-if="pswdShow" src="@/static/img/login/can.png" alt="" />
			<image class="img" @click="changepswdShow" v-else src="@/static/img/login/cant.png" alt="" />
		</view>
    <view  class="password-box" style="font-size: 12px;color: #336AE2" v-if="regemail" @click="isregemail">{{regemailtext}}</view>
    <view v-else class="password-box" style="font-size: 12px;color: #336AE2">{{second}}s</view>


	</view>
</template>

<script>
	export default {
		props: {
			label: String,
			placeholder: String,
			value: String,

			password: {
				default: false,
				type: Boolean,
			},
			number : {
				default: false,
				type: Boolean,
			},
			email : {
				default: false,
				type: Boolean,
			},
      regemailtext:String,
      regemail: {
        default: true,
        type: Boolean,
      },
			disabled : {
				default: false,
				type: Boolean,
			},
		},
		computed: {
			i18n() {
				return this.$t('message')
			}

		},
		data() {
			return {
        // regemail:true,
				inputValue: this.value,
				isFocused: false,
				hasValue: false,
				pswdShow: false,
				pswtype: 'text',
				emailError: '',
        second:'60',
        debounceTimeout: null,
        interval:null
			};
		},
		watch: {
			value(val) {
				this.inputValue = val;
				this.hasValue = !!val;
			}
		},
		created() {
			if (this.password) {
				this.pswtype = "password"
			}
			if (this.number) {
				this.pswtype = "number"
			}

		},
		methods: {
			focusInput() {
				this.$refs.input.focus();
			},
			handleFocus() {
				this.isFocused = true;
			},
			handleBlur() {
				this.isFocused = false;
				// this.hasValue = !!this.inputValue;
			},
			handleInput(value) {
				const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
				if (!emailPattern.test(this.inputValue) && this.email) {
				  this.emailError = this.i18n.emailError;
				  this.$emit('input', value);
				  this.$emit('emailError', true);
				} else {
				  this.emailError = '';
				  this.$emit('emailError', false);
				  this.$emit('input', value);
				}
			},
			changepswdShow() {
				this.pswdShow = !this.pswdShow
				if (this.pswdShow) {
					this.pswtype = "text"
				} else {
					this.pswtype = "password"
				}
			},
      // isregemail(){
      //       this.$emit('isregemail',this.inputValue)
      //   this.code()
      // },

      isregemail() {
            if (this.emailError || !this.inputValue) {return}
        // 清除之前的 timeout
        clearTimeout(this.debounceTimeout);

        // 设置新的 timeout
        this.debounceTimeout = setTimeout(() => {
          this.$emit('isregemail', this.inputValue);
            this.code();
        }, 1000); // 1000 毫秒的防抖时间，可以根据需要调整
      },
      code(){
        //验证码倒计时功能
        this.interval = setInterval(() => {
          var times = this.second - 1;
          //that.second = times<10?'0'+times:times ;//小于10秒补 0
          this.second = times;
        }, 1000);
        setTimeout(() => {
          clearInterval(this.interval);
          this.second = 60;
          this.$emit('isregemailcode',this.inputValue)
        }, 60000);
      }

		},
    beforeDestroy() {
      // 在组件销毁前清除计时器
      clearTimeout(this.interval);
      clearTimeout(this.debounceTimeout)
    }
	};
</script>

<style scoped lang="scss">
	.input-container {
		position: relative;
		background-color: #EDEFF3;
		border-radius: 34rpx;
		height: 120rpx;
		padding: 0 10rpx;
		box-sizing: border-box;

		/* Fixed height to prevent resizing */
		.password-box {
			position: absolute;
			top: calc(50% - 20rpx);
			right: 2%;

			.img {
				width: 40rpx;
				height: 40rpx;
				padding-right: 20rpx;
				padding-bottom: 30rpx;
			}
		}
	}

	.label {
		position: absolute;
		top: 50%;
		left: 30rpx;
		transform: translateY(-50%);
		font-size: 32rpx;
		/* Larger font when hidden */
		color: rgba(0, 0, 0, .5);
		transition: all 0.3s ease;
		opacity: 0;
	}

	.label-visible {
		transform: translateY(-150%);
		font-size: 24rpx;
		/* Smaller font when visible */
		opacity: 1;
	}



	.input-field {
		width: 90%;
		height: 100%;
		border: none;
		background-color: transparent;
		transition: transform 0.3s ease;
	}

	.input-raised {
		transform: translateY(-10%);
	}

	.input-lowered {
		transform: translateY(10%);
	}

	.label-fade-enter-active,
	.label-fade-leave-active {
		transition: opacity 0.3s, transform 0.3s;
	}

	.label-fade-enter,
	.label-fade-leave-to {
		opacity: 0;
		transform: translateY(-50%);
	}
	.error {
	  color: red;
	  font-size: 14px;
	  height: 100rpx;
	  margin: 20rpx 0;
	}
</style>