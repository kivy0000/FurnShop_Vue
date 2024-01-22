<template>
  <div>
    <Header/><!-- 头部页面   -->

    <div style="display: flex"><!-- 主体部分  -->

      <Aside/><!-- 侧边栏  -->

      <router-view style="flex: 1"/><!-- 内容区域，由路由到的视图组件展示 ,初始化路由为 /  -->


    </div>

  </div>
</template>

<script>
// 这里导入了Header
import Header from "@/components/Header";
import Aside from "@/components/Aside";
//layout"组件可以在页面中使用该组件的内容，从而实现页面布局的复用。
//当多个页面需要相同的布局时，只需要在各个页面中引入"layout"组件即可，而不需要重复编写相同的布局代码。
export default {
  name: "layout",
  components: {
    Header,
    Aside
  }
}
</script>

<style scoped>
</style>
<!--下面是模板
可以通过以下步骤来实现在打开界面时播放指定音频的功能：

1. 在项目中创建一个名为`AudioPlayer`的组件，用来播放音频文件。可以使用`<audio>`标签来实现音频播放功能。

```html
<template>
  <audio ref="audioPlayer" :src="audioSrc"></audio>
</template>

<script>
export default {
  name: "AudioPlayer",
  props: {
    audioSrc: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.$refs.audioPlayer.play();
  }
}
</script>
```

2. 在需要播放音频的界面中，导入`AudioPlayer`组件，并在模板中使用`<audio-player>`标签，并传入要播放的音频文件的路径。

```html
<template>
  <div>
    <Header/>
    <el-button type="primary">导航界面</el-button>
    <audio-player :audio-src="audioPath" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import AudioPlayer from "@/components/AudioPlayer";

export default {
  name: "layout",
  components: {
    Header,
    AudioPlayer
  },
  data() {
    return {
      audioPath: "/path/to/audio.mp3" // 替换成实际的音频文件路径
    }
  }
}
</script>

<style>
</style>
```

3. 在界面打开时，`AudioPlayer`组件会自动播放音频文件。

注意：在实际项目中，可能需要根据具体的需求来控制音频的播放和暂停，以及添加其他交互功能。以上只是一个简单的示例，具体实现方式可以根据项目需求进行调整。
-------------------------------->
<!--  <nav> 原来自带的路由模板-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </nav>-->
<!--  <router-view/>-->
<!--风格模板-->
<!--#app {-->
<!--font-family: Avenir, Helvetica, Arial, sans-serif;-->
<!-- -webkit-font-smoothing: antialiased;-->
<!-- -moz-osx-font-smoothing: grayscale;-->
<!--text-align: center;-->
<!--color: #2c3e50;-->
<!--}-->

<!--nav {-->
<!--padding: 30px;-->
<!--}-->

<!--nav a {-->
<!--font-weight: bold;-->
<!--color: #2c3e50;-->
<!--}-->

<!--nav a.router-link-exact-active {-->
<!--color: #42b983;-->
<!--}-->
