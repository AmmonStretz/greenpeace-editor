<template>
  <div class="size-settings vertical-group">
    <label>Medium</label>
    <select
      v-if="!!config"
      name="LeaveType"
      @change="onChangeCathegory($event)"
      class="form-control"
      v-model="selectedCathegory"
    >
      <option
        v-for="(cathegory, index) of config"
        :key="'cathegory_' + index"
        :value="index"
      >
        {{ cathegory.name }}
      </option>
    </select>
    <label>Format</label>
    <select
      v-if="!!config"
      name="sizeSelector"
      @change="onChangeSize($event)"
      class="form-control"
      v-model="selectedSize"
    >
      <option
        v-for="(size, index) of config[+selectedCathegory].sizes"
        :key="'size_' + index"
        :value="index"
      >
        {{ size.name }}
      </option>
    </select>
    <!-- <label>Größe</label>
    <div>
      <input type="number" name="width" id="" v-bind:value="width" /> x
      <input type="number" name="height" id="" v-bind:value="height" />
    </div> -->
    <!-- {{ size }} -->
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
// import P5 from "p5";

@Component
export default class SizeSettings extends Vue {
  public selectedCathegory = 0;
  public selectedSize = 0;
  @Prop()
  public config!: any[];
  mounted() {
    this.change();
  }
  onChangeCathegory(event: any) {
    this.selectedSize = 0;
    this.change();
  }
  onChangeSize(event: any) {
    this.change();
  }
  @Emit("change")
  change() {
    return {
      width: this.config[this.selectedCathegory].sizes[this.selectedSize].width,
      height: this.config[this.selectedCathegory].sizes[this.selectedSize].height,
    };
  }
}
</script>
<style scoped lang="scss">
.size-settings {
  display: flex;
  flex-direction: column;
}
</style>
