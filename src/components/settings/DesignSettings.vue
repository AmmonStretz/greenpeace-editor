<template>
  <div class="design-settings">
    <div class="design" v-for="(design, index) of designs" :key="index" v-on:click="select(index)" :class="{active: index == active}">
      <img
        :src="require('@/assets/design-icons/' + design.src)"
      />
      <h3 class="name">
        {{ design.name }}
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Design } from "@/shared/design.class";
import { RedDesign } from "@/shared/designs/RedDesign.class";
import { YellowDesign } from "@/shared/designs/YellowDesign.class";
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class DesignSettings extends Vue {
  @Prop()
  public active!: number;

  @Prop()
  public designs!: Design[];

  @Emit('select')
  select(index: number) {
    
    // this.active = index;
    return index;
  }
}
</script>

<style lang="scss">
.design-settings {
  display: flex;
  flex-flow: row wrap;
  gap: 16;
  align-items: center;
  img {
    display: block;
    // width: 400px;
    // height: 300px;
  }
  .design {
    margin-bottom: 16px;
    padding: 8px;
    &.active {
      background-color: #ddd;
    }
    h3 {
      text-align: center;
      margin: 0;
      padding: 8px;
      font-weight: 500;
    }
  }
}
</style>
