<!--  -->
<template>
  <div class="content">
    <div class="bg">
      <img src="../../static/mike.jpg" alt srcset />
      <button @click="start">开始录音</button>
      <button @click="stop_send">语音转换</button>
      <button @click="destroy">销毁录音</button>
      <label for="#">{{result}}</label>
    </div>
  </div>
</template>
<script>
import Recorder from "js-audio-recorder";
import axios from "axios";
export default {
  data() {
    return {
      recorder: null,
      result: ""
    };
  },
  computed: {
    text() {
      return this.$store.state.count;
    }
  },
  created() {
    this.$data.recorder = new Recorder({
      sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
      sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
      numChannels: 1, // 声道，支持 1 或 2， 默认是1
      compiling: false // 是否边录边转换，默认是false
    });
  },
  methods: {
    start() {
      this.$data.recorder.start().then(
        () => {
          // 开始录音
        },
        error => {
          // 出错了
          console.log(`${error.name} : ${error.message}`);
        }
      );
    },
    destroy() {
      this.$data.recorder.destroy().then(function() {
        this.$data.recorder = null;
      });
    },
    stop_send() {
      this.$data.recorder.stop();
      axios({
        url: "http://127.0.0.1:3000/upload",
        method: "post",
        data: this.$data.recorder.getPCMBlob(),
        headers: {
          "Content-Type": "application/octet-stream" //指定消息格式
        }
      })
        .then(res => (this.result = res.data))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>

.bg {
  text-align: center;
  transform: translateY(100px);
  background-size: cover;
  position: relative;
  width: 300px;
  height: 380px;
  line-height: 2;
  margin: auto;
  border-radius: 10px;
  background: transparent;
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
.bg::after {
  content: "";
  background: url("../../static/ing.jpg") no-repeat;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: -30px;
  z-index: -1;
  -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -ms-filter: blur(10px);
  -o-filter: blur(10px);
  filter: blur(40px);
}
button {
  font-size: 24px;
  height: 60px;
  cursor: pointer;
  margin: 10px 2px;
  width: 100%;
  display: block;
}
button:hover {
  background-color: rgb(93, 243, 7);
}
.content {
  text-align: center;
  width: 100%;
}
img {
  margin-top: 16px;
  margin-bottom: 12px;
  width: 100px;
  height: 100px;
  transition: all 2s ease;
  border-radius: 50%;
}
img:hover {
  transform: rotate(360deg);
}
</style>
