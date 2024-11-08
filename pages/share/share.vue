<template>
  <view class="page flex-col">
    <view class="group_1 flex-row">
      <view class="block_1 flex-col">
        <returnBack :titleColor="'#fff'" :bgc="'transparent'" :title="i18n.share"></returnBack>
        <view class="image-text_1 flex-row justify-between">
          <image
              class="label_1"
              referrerpolicy="no-referrer"
              src="@/static/img/login/newlogo.png"
          />
          <text class="text-group_1">Know World</text>
        </view>
        <view class="text-group_2 flex-col">
          <text class="text_4">{{i18n.referAFriend}}</text>
          <text class="text_5">{{i18n.SQshare}}</text>
        </view>
      </view>
      <view class="image-wrapper_1 flex-col">
<!--        <image-->
<!--            class="image_2"-->
<!--            referrerpolicy="no-referrer"-->
<!--        />-->
<!--        <canvas width="200" height="200"  @longpress="handleLongPress"  id="qrcode" ></canvas >-->
        <canvas  id="qrcode" canvas-id="qrcode" class="image_2"></canvas>
      </view>
      <view style="font-weight: 600;color: aliceblue;display: flex;justify-content: center;margin-top: 20px" @click="copyurl">copy link</view>
      <view style="padding: 30px;
    color: aliceblue;">{{below}}</view>
    </view>

  </view>
</template>

<script>
import returnBack from '@/components/returnBack/returnBack.vue'
//import QRCode from "qrcodejs2";
import UQRCode from 'uqrcodejs'; // npm install uqrcodejs

export default {
  computed: {
    i18n() {
      return this.$t('message')
    }

  },
  components: {
    returnBack
  },
  data() {
    return {
      below:"Earn a 5% rebate when your referred users complete quizzes, and a 3% rebate when your subordinates' referred users complete quizzes.",
      constants: {},
      inviterNo:'',
      qrCodeCanvasId: 'qrcode', // canvas 元素的 ID
      content: '', // 二维码内容
    };
  },
  onShow() {
    this.inviterNo=uni.getStorageSync('inviterNo');
  },
  onReady() {
    this.uinitQrcode()
  },

  methods: {
    uinitQrcode(){
      const content = `${uni.$u.http.config.website}/#/pages/register/register?inviterNo=${this.inviterNo}`;
      this.content=content
// 获取uQRCode实例
      var qr = new UQRCode();
      console.log('--------',qr)
// 设置二维码内容
      qr.data = content;
// 设置二维码大小，必须与canvas设置的宽高一致
      qr.size = 230;
// 调用制作二维码方法
      qr.make();
// 获取canvas上下文
      var canvasContext = uni.createCanvasContext('qrcode', this); // 如果是组件，this必须传入
// 设置uQRCode实例的canvas上下文
      qr.canvasContext = canvasContext;
// 调用绘制方法将二维码图案绘制到canvas上
      qr.drawCanvas();

    },
    //下载
    download() {
      // 通过uni.createCanvasContext方式创建绘制上下文的，对应导出API为uni.canvasToTempFilePath
// 调用完ctx.draw()方法后不能第一时间导出，否则会异常，需要有一定的延时
      setTimeout(() => {
        uni.canvasToTempFilePath(
            {
              canvasId: this.qrCodeCanvasId,
              fileType: this.fileType,
              width: this.canvasWidth,
              height: this.canvasHeight,
              success: res => {
                console.log(res);
                uni.saveImageToPhotosAlbum({
                  filePath: tempFilePath,
                  success: res => {
                    console.log(res);
                  },
                  fail: err => {
                    console.log(err);
                  }
                });
              },
              fail: err => {
                console.log(err);
              }
            },
            // this // 组件内使用必传当前实例
        );
      }, 300);
    },
    copyurl(){
      //复制链接
      uni.setClipboardData({
        data: this.content,
        success: function () {
          // 复制成功后的提示
          uni.showToast({
            title: 'Content copied to clipboard',
            icon: 'none',
            duration: 2000
          });
        }
      });
    },


    generateQRCode() {
      const canvas = document.getElementById(this.qrCodeCanvasId);
      new QRCode(canvas, {
        text: this.content,
        width: 200,
        height: 200
      });
    },
    handleLongPress() {
      this.downloadQRCode();
    },
    downloadQRCode() {
      const canvas = document.getElementById(this.qrCodeCanvasId);
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        uni.downloadFile({
          url: url,
          success: (res) => {
            if (res.statusCode === 200) {
              uni.saveFile({
                tempFilePath: res.tempFilePath,
                success: (saveRes) => {
                  uni.showToast({
                    title: '二维码已保存',
                    icon: 'success'
                  });
                },
                fail: (err) => {
                  uni.showToast({
                    title: '保存失败',
                    icon: 'none'
                  });
                }
              });
            } else {
              uni.showToast({
                title: '下载失败',
                icon: 'none'
              });
            }
          },
          fail: (err) => {
            uni.showToast({
              title: '下载失败',
              icon: 'none'
            });
          }
        });
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.page {
  background-color: rgba(247, 247, 247, 1);
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  background: url(@/static/img/aboutUs/1.png);
  background-size: 100% 100%;
  .group_1 {
   width: 100vw;
    height: 100vh;
    .block_1 {
      padding: 20px;
      .section_1 {
        width: 363px;
        align-self: center;
        .thumbnail_1 {
          width: 16px;
          height: 10px;
          margin: 2px 0 3px 0;
        }
        .text_1 {
          overflow-wrap: break-word;
          color: rgba(3, 3, 3, 1);
          font-size: 12px;
          font-family: SFProText-Regular;
          font-weight: normal;
          text-align: left;
          white-space: nowrap;
          line-height: 14px;
          margin: 1px 0 0 4px;
        }
        .thumbnail_2 {
          width: 14px;
          height: 10px;
          margin: 2px 0 3px 5px;
        }
        .text_2 {
          overflow-wrap: break-word;
          color: rgba(0, 0, 0, 1);
          font-size: 12px;
          font-family: SFProText-Regular;
          font-weight: normal;
          text-align: right;
          white-space: nowrap;
          line-height: 14px;
          margin-left: 223px;
        }
        .image_1 {
          width: 26px;
          height: 12px;
          margin: 1px 0 2px 3px;
        }
      }
      .nav-bar_1 {
       width: 100%;
        margin-top: 15px;
       display: flex;
        align-items: center;
        .icon_1 {
          width: 15px;
          height: 13px;
          margin: 4px 0 5px 0;
        }
        .text_3 {
          overflow-wrap: break-word;
          color: rgba(255, 255, 255, 1);
          font-size: 16px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          text-align: center;
          white-space: nowrap;
          line-height: 22px;
        }
      }
      .image-text_1 {
        display: flex;
        align-items: center;
        margin: 0 auto;
        width: 250px;
        align-self: center;
        margin-top: 15vh;
        .label_1 {
          width: 40px;
          height: 38px;
        }
        .text-group_1 {
          height: 30px;
          overflow-wrap: break-word;
          color: rgba(255, 255, 255, 1);
          font-size: 30px;
          font-family: PangMenZhengDao;
          font-weight: 600;
          text-align: left;
          white-space: nowrap;
          line-height: 30px;
          margin-left: 10px;

        }
      }
      .text-group_2 {
        margin: 0 auto;
        width: 126px;
        align-self: center;
        margin-top: 35px;
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        .text_4 {
          display: block;
          overflow-wrap: break-word;
          color: rgba(255, 255, 255, 1);
          font-size: 22px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          text-align: left;
          white-space: nowrap;
          line-height: 30px;
          margin: 0 18px 0 20px;
        }
        .text_5 {
          display: block;
          overflow-wrap: break-word;
          color: rgba(255, 255, 255, 1);
          font-size: 14px;
          font-weight: normal;
          text-align: left;
          white-space: nowrap;
          line-height: 40px;
          margin-top: 11px;
        }
      }
    }
    .image-wrapper_1 {
      width: 65vw;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.02);
      background-color: rgba(255, 255, 255, 1);
      border-radius: 15px;
      padding: 24px 15px 20px 24px;


      .image_2 {
        width: 240px;
        height: 240px;
      }
    }
  }
}
/* 隐藏滚动条 */
.page::-webkit-scrollbar {
  display: none;
}

</style>


