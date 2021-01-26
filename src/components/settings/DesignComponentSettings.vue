<template>
  <div class="design-component-settings">
    <div v-for="key of Object.keys(designComponent.props)" :key="key" v-on:click="edit(key)">
      <div v-if="designComponent.props[key].type == 'string'" class="property string">
        {{designComponent.props[key].name}}: {{designComponent.props[key].value}}
      </div>
      <div v-if="designComponent.props[key].type == 'number'" class="property number">
        {{designComponent.props[key].name}}: {{designComponent.props[key].value}}
      </div>
      <div v-if="designComponent.props[key].type == 'logo'" class="property logo">
        {{designComponent.props[key].name}}: {{designComponent.props[key].value}}
      </div>
      <div v-if="designComponent.props[key].type == 'range'" class="property range">
        {{designComponent.props[key].name}}: {{designComponent.props[key].value}}
      </div>
      <div v-if="designComponent.props[key].type == 'color'" class="property color">
        {{designComponent.props[key].name}}: {{designComponent.props[key].value}}
      </div>
      <div v-if="designComponent.props[key].type == 'img'" class="property img">
        {{designComponent.props[key].name}}: IMAGE
      </div>
      <div v-if="designComponent.props[key].type == 'position'" class="property position">
        {{designComponent.props[key].name}}: x: {{designComponent.props[key].value.x}}, y: {{designComponent.props[key].value.y}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { DesignComponent, DesignComponentProperty } from "@/shared/designs/design-components/design-component.class";

@Component({
  components: {},
})
export default class DesignComponentSettings extends Vue {

  @Prop()
  public designComponent!: DesignComponent;

  edit(key: string) {
    const mobileVersion = true; // TODO: check if mobile version
    if(mobileVersion){
      this.openInput(this.designComponent.props[key]);
    }
  }
  @Emit('openInput')
  openInput(prop: DesignComponentProperty<any>) {
    return prop;
  }
}
</script>

<style lang="scss">
.design-component-settings {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  .property {
    padding: 16px;
    border: 1px #aaa solid;
  }
}
</style>
