<template>
  <div id="app">
    <!-- bla{{ToDos}}bla<br> -->
    <!-- <button v-on:click="change">change Design</button> -->
    <main-view v-bind:design="currentDesign" v-bind:format="currentFormat" />
    <sidebar
      v-bind:designs="designs"
      v-bind:designIndex="designIndex"
      v-on:updateDesignIndex="updateDesignIndex"
      v-on:changeFormat="updateFormat"
      v-bind:currentFormat="currentFormat"
      v-on:openInput="openInput"
    ></sidebar>
    <!-- <button style="position:fixed" v-on:click="changeProp()">change</button> -->
    <transition name="zoom">
    <InputEditor
      v-if="prop && editorIdOpen"
      v-bind:property="prop"
      v-on:done="InputEditorDone"
    />
    </transition>
    <img id="default" src="./assets/default.jpg">
    <img id="logo_black" src="./assets/logos/gp_logo_black.svg">
    <img id="logo_green" src="./assets/logos/gp_logo_green.svg">
    <img id="logo_white" src="./assets/logos/gp_logo_white.svg">
    <!-- <button v-on:click="openSidebar=true">open</button> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainView from "./components/MainView.vue";
import Sidebar from "./components/Sidebar.vue";
import InputEditor from "./components/InputEditor.vue";

import ToDoModel from "@/store/modules/ToDoModel";
import store from "@/store";

/**
 * Designs
 */
import { Design } from "./shared/design.class";
import { RedDesign } from "@/shared/designs/RedDesign.class";
import { YellowDesign } from "@/shared/designs/YellowDesign.class";
import { BlueDesign } from "@/shared/designs/BlueDesign.class";

/**
 * Format
 */
import { Format, FormatGroup, formats } from "@/shared/format.class";

@Component({
  components: {
    MainView,
    Sidebar,
    InputEditor,
  },
})
export default class App extends Vue {
  public designIndex = 0;
  public designs: Design[] = [
    new BlueDesign(),
    new BlueDesign(),
    new RedDesign(),
    new YellowDesign(),
    new BlueDesign(),
  ];
  get currentDesign(): Design {
    return this.designs[this.designIndex];
  }
  updateDesignIndex(index: number): void {
    this.designIndex = index;
  }

  public currentFormat = formats[0].formats[0];
  updateFormat(format: Format) {
    this.currentFormat = format;
    console.log(format);
  }

  private a = 0;
  change() {
    this.$store.dispatch("addToDo", new ToDoModel("bla", true));
    this.$store.dispatch("countUp", (this.a += 10));
    console.log(this.$store.state.count);
  }


  public prop: any = null;
  public editorIdOpen = false;
  openInput(prop: any){
    this.editorIdOpen = true;
    this.prop = prop;
    // console.log(prop);
    // console.log(this.designs[this.designIndex].components[prop.index].props[prop.key].value = 'werwerwerwre');
    
    // this.prop = prop;
  }
  InputEditorDone() {
    this.editorIdOpen = false;
  }
}
</script>

<style lang="scss">
@import url("../node_modules/material-design-icons/iconfont/material-icons.css");
@import "./shared/styles/index.scss";

#app {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #eee;


  
  .zoom-enter-active,
  .zoom-leave-active {
    transition: opacity 0.5s;
    >* {
      transition: transform 0.5s;
    }
  }
  .zoom-enter, .zoom-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    >* {
      transform: scale(0.0);
    }
  }
  >img {
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
  }
}
</style>
