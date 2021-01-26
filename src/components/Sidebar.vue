<template>
  <div
    class="sidebar"
    :class="{ open: sidebarMode != 'CLOSED' }"
    v-if="!!designs"
  >
    <nav>
      <button
        class="round-btn"
        v-on:click="
          sidebarMode = 'FORMAT';
          title = 'Formatauswahl';
        "
      >
        <i class="material-icons">crop</i>
      </button>
      <button
        class="round-btn"
        v-on:click="
          sidebarMode = 'DESIGN';
          title = 'Designauswahl';
        "
      >
        <i class="material-icons">brush</i>
      </button>
      <button
        class="round-btn"
        v-for="(component, index) of activeDesign.components"
        :key="index"
        v-on:click="
          sidebarMode = 'COMPONENT';
          designComponentIndex = index;
          title = component.name;
        "
      >
        <i class="material-icons">looks_{{ component_icons[index] }}</i>
      </button>
    </nav>
    <div class="content">
      <header>
        <h2>{{ title }}</h2>
        <button class="round-btn close" v-on:click="sidebarMode = 'CLOSED'">
          <i class="material-icons">close</i>
        </button>
      </header>
      <div class="scrollable">
        <transition name="content">
          <FormatSelectionSettings
            v-if="sidebarMode == 'FORMAT'"
            v-on:format="selectFormat"
            v-bind:currentFormat="currentFormat"
          ></FormatSelectionSettings>
        </transition>
        <transition name="content">
          <DesignSettings
            v-if="sidebarMode == 'DESIGN'"
            v-on:select="selectDesign"
            v-bind:active="designIndex"
            v-bind:designs="designs"
          />
        </transition>
        <transition
          name="content"
          v-for="(component, index) of activeDesign.components"
          :key="index"
        >
          <DesignComponentSettings
            v-if="sidebarMode == 'COMPONENT' && designComponentIndex == index"
            v-bind:designComponent="designs[designIndex].components[index]"
            v-on:openInput="openInput"
          />
          <!-- <div v-if="sidebarMode == 'COMPONENT' && designComponentIndex == index">
            {{ designs[designIndex] }}<br />
            {{ designComponentIndex }}
            {{ index }}
          </div> -->
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Design } from "@/shared/design.class";
import { RedDesign } from "@/shared/designs/RedDesign.class";
import { YellowDesign } from "@/shared/designs/YellowDesign.class";
import { BlueDesign } from "@/shared/designs/BlueDesign.class";
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import DesignSettings from "./settings/DesignSettings.vue";
import FormatSelectionSettings from "./settings/FormatSelectionSettings.vue";
import DesignComponentSettings from "./settings/DesignComponentSettings.vue";
import { Format } from "@/shared/format.class";
import { DesignComponentProperty } from "@/shared/designs/design-components/design-component.class";

enum SidebarMode {
  CLOSED = "CLOSED",
  FORMAT = "FORMAT",
  DESIGN = "DESIGN",
  DESIGN_SETTINGS = "DESIGN_SETTINGS",
  COMPONENT = "COMPONENT",
}

@Component({
  components: {
    DesignSettings,
    FormatSelectionSettings,
    DesignComponentSettings,
  },
})
export default class Sidebar extends Vue {
  public sidebarMode: SidebarMode = SidebarMode.CLOSED;
  public designComponentIndex: number | null = null;

  private component_icons = ["one", "two", "3", "4", "5", "6"];

  public title = "";

  @Prop()
  public designIndex!: number;

  @Prop()
  public currentFormat!: Format;

  @Prop()
  public designs!: Design[];

  @Emit("updateDesignIndex")
  selectDesign(index: number) {
    setTimeout(() => {
      this.sidebarMode = SidebarMode.CLOSED;
    }, 10);
    return index;
  }
  get activeDesign() {
    return this.designs[this.designIndex];
  }

  @Emit("changeFormat")
  selectFormat(format: Format) {
    setTimeout(() => {
      this.sidebarMode = SidebarMode.CLOSED;
    }, 10);
    return format;
  }

  @Emit("openInput")
  openInput(prop: DesignComponentProperty<any>) {
    // console.log(prop, this.designComponentIndex);
    setTimeout(() => {
      this.sidebarMode = SidebarMode.CLOSED;
    }, 10);
    return prop;
  }
}
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 0;
  height: 100vh;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 0.1) -5px 0 35px;
  transition: 300ms width ease;
  &.open {
    width: 100%;
  }
  nav {
    position: absolute;
    left: -88px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .content {
    header {
      display: flex;
      height: 56px;
      align-items: center;
      padding: 8px;
      padding-left: 56px;
      h2 {
        display: block;
        margin: 0;
        flex-grow: 1;
        text-align: center;
      }
      .close {
      }
    }
    .scrollable {
      height: calc(100vh - 56px);
      overflow-y: auto;
    }
  }
  // .content-enter-active,
  // .content-leave-active {
  //   transition: opacity 0.5s;
  // }
  // .content-enter, .content-leave-to /* .fade-leave-active below version 2.1.8 */ {
  //   opacity: 0;
  // }
}
</style>
