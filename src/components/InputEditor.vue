<template>
  <div class="input-editor" v-if="!!property">
    <div v-if="property.type == 'number'" class="number-field">
      <input type="number" v-model="property.value" v-on:change="change" />
    </div>
    <div v-if="property.type == 'logo'" class="logo-field">
      <input type="number" min="0" max="2" step="1" v-model="property.value" v-on:change="change" />
    </div>
    <div v-if="property.type == 'range'" class="range-field">
      <input
        type="range"
        v-model="property.value"
        :min="property.min"
        :max="property.max"
        :step="property.stepsize"
        v-on:change="change"
      />
    </div>
    <div v-if="property.type == 'color'" class="color-field">
      <label for="">red</label>
      <input
        type="range"
        v-model="property.value.r"
        min="0"
        max="255"
        v-on:change="change"
      />
      <label for="">green</label>
      <input
        type="range"
        v-model="property.value.g"
        min="0"
        max="255"
        v-on:change="change"
      />
      <label for="">blue</label>
      <input
        type="range"
        v-model="property.value.b"
        min="0"
        max="255"
        v-on:change="change"
      />
    </div>
    <div v-if="property.type == 'position'" class="position-field">
      <input
        type="number"
        v-model="property.value.x"
        v-on:change="change"
      />
      <input
        type="number"
        v-model="property.value.y"
        v-on:change="change"
      />
    </div>
    <div v-if="property.type == 'string'" class="string-field">
      <textarea type="text" v-model="property.value" v-on:change="change" />
    </div>
    <div v-if="property.type == 'img'" class="img-field">
      <label for="file" :class="{contains: !!property.file}">Choose a file</label>
      <input type="file" id="file" @change="change" />
    </div>
    <button class="round-btn" v-on:click="done">
      <i class="material-icons">done</i>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import {
  DesignComponent,
  DesignComponentProperty,
  ImageProperty,
} from "@/shared/designs/design-components/design-component.class";
import { Design } from "@/shared/design.class";

@Component({
  components: {},
})
export default class InputEditor extends Vue {
  @Prop()
  public property!: DesignComponentProperty<any>;

  // get prop() {
  // return this.design.components[this.property.index].props[this.property.key];
  // }

  // @Emit('openInput')
  // openInput(prop: DesignComponentProperty<any>) {
  //   return prop;
  // }

  @Emit("change")
  change(event: any) {
    if (this.property.type == "number" || this.property.type == "range" || this.property.type == "logo") {
      this.property.value = +this.property.value;
    }
    if (this.property.type == "color") {
      this.property.value.r = +this.property.value.r;
      this.property.value.g = +this.property.value.g;
      this.property.value.b = +this.property.value.b;
    }
    if (this.property.type == "position") {
      this.property.value.x = +this.property.value.x;
      this.property.value.y = +this.property.value.y;
    }
    if (this.property instanceof ImageProperty) {
      const file = event.target.files[0];
      this.property.file = file;
      this.property.value = null;
    }
    return this.property;
  }
  @Emit("done")
  done() {
    return;
  }
}
</script>

<style lang="scss">
.input-editor {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  background-color: #00000096;
  width: 100%;
  height: 100vh;
  .number-field {
    input {
      padding: 12px;
      font-size: 24px;
      border-radius: 28px;
      outline: none !important;
    }
  }
  .logo-field {
    input {
      padding: 12px;
      font-size: 24px;
      border-radius: 28px;
      outline: none !important;
    }
  }
  .position-field {
    input {
      padding: 12px;
      font-size: 24px;
      border-radius: 28px;
      outline: none !important;
    }
  }
  .string-field {
    input {
      padding: 12px;
      font-size: 24px;
      border-radius: 28px;
      outline: none !important;
    }
  }
  .color-field {
    input {
      padding: 12px;
      font-size: 24px;
      border-radius: 28px;
      outline: none !important;
    }
  }
  .img-field {
    label {
      padding: 12px;
      font-size: 24px;
      border-radius: 28px;
      background-color: #eee;
      &.contains {
        background-color: red;
      }
    }
    input {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
    }
  }
}
</style>
