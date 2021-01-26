<template>
  <div id="view">
    <!-- <button v-on:click="change">change Design</button> -->
    <!-- <h1 v-on:click="onSelect('title')">Select Title</h1>
    <h1 v-on:click="onSelect('logo')">Select Logo</h1>
    <h1 v-on:click="onSelect(null)">Deselect</h1> -->
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue, Prop } from "vue-property-decorator";
import ToDoModel from "@/store/modules/ToDoModel";
import store from "@/store";
import P5 from "p5";
import { Design } from "@/shared/design.class";
import { Format } from "@/shared/format.class";
import { LogoProperty } from "@/shared/designs/design-components/design-component.class";
@Component({
  components: {},
})
export default class MainView extends Vue {
  @Prop()
  design!: Design;

  @Prop()
  format!: Format;
  // @Emit('select')
  // onSelect(type: string) {
  //   return type;
  // }
  private bla = 255;
  change() {
    this.$store.dispatch("addToDo", new ToDoModel("bla", true));
  }

  mounted() {
    new P5((p5) => {
      // console.log(p5);

      p5.setup = () => {
        const canvas = p5.createCanvas(200, 200);
        canvas.parent("view");
        p5.background(255);
        if(LogoProperty.logos.length == 0){
          LogoProperty.loadDefaultLogo(p5);
        }
      };
      p5.draw = () => {
        p5.resizeCanvas(this.format.width, this.format.height);
        // p5.draw
        // p5.background(255,this.bla,0)
        if (this.design) {
          this.design.draw(p5);
        }
      };
    });
  }
}
</script>

<style lang="scss">
#view {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  overflow: auto;
  box-sizing: border-box;
  padding: 32px 128px 128px 32px;
  canvas {
    box-shadow: rgb(0 0 0 / 15%) 0px 5px 15px;
  }
}
</style>
