<template>
  <nav class="button-list">
    <ul>
      <li v-for="(button, index) of config" :key="'main_button_' + index">
        <button
          class="round-btn"
          v-if="!button.children"
          v-on:click="fireEvent(button.eventMode)"
        >
          <i class="material-icons">{{ button.icon }}</i>
        </button>
        <button
          class="round-btn"
          v-if="button.children"
          v-bind:class="{ active: button.isOpen }"
          v-on:click="button.isOpen = !button.isOpen"
        >
          <i class="material-icons">{{ button.icon }}</i>
        </button>
        <transition name="fade">
          <ul v-if="button.children && button.isOpen">
            <li v-for="(child, i) of button.children" :key="'main_button_' + i">
              <button class="round-btn" v-on:click="fireEvent(child.eventMode)">
                <i class="material-icons">{{ child.icon }}</i>
              </button>
            </li>
          </ul>
        </transition>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
// import HelloWorld from "./components/HelloWorld.vue";
// import Settings from "./components/Settings.vue";
// this.switchToConfirm();
import { ButtonConfig } from "../shared/button-config.class";

@Component({
  components: {
    // Settings,
  },
})
export default class ButtonList extends Vue {
  @Prop()
  public config!: ButtonConfig[];
  @Emit("event")
  public fireEvent(eventMode: string) {
    for (let i = 0; i < this.config.length; i++) {
      const button: any = this.config[i];
      if (button.isOpen != undefined) {
        button.isOpen = false;
      }
    }
    return eventMode;
  }
}
</script>

<style lang="scss">
button.round-btn {
  background-color: #eee;
  box-shadow: rgb(0 0 0 / 25%) 0 3px 3px;
  border: none;
  padding: 16px;
  border-radius: 50%;
  outline: none;
  transition: 300ms background-color ease;
  &.active {
    background-color: #73c82c;
    color: white;
  }
  &.primary {
    background-color: #73c82c;
    color: white;
  }
  &.alert {
    background-color: red;
    color: white;
  }
  i.material-icons {
    display: block;
  }
}
nav.button-list {
  position: fixed;
  top: 0;
  right: 0;
  margin: 16px;
  & > ul {
    position: absolute;
    right: 0;
  }
  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      display: flex;
      flex-direction: row-reverse;
      margin-bottom: 16px;
      ul {
        flex-direction: row;
        li {
          margin: 0 16px 0 0;
        }
      }
    }
  }
}
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
