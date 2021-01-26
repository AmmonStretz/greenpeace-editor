<template>
  <div class="format-selection-settings">
    <div
      v-for="(formatGroup, index) of possibleFormats"
      :key="index"
      class="format-group"
    >
      <h2>{{ formatGroup.name }}</h2>
      <div class="formats">
        <div
          v-for="(format, index) of formatGroup.formats"
          :key="'format' + index"
          v-on:click="select(format)"
          class="format"
          :class="{active: currentFormat.name == format.name}"
        >
          <div class="format-preview">
            <div class="size-label">{{ format.width }} x {{ format.height }}</div>
          </div>
          <h3>{{ format.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
/**
 * Format
 */
import { Format, FormatGroup, formats } from "@/shared/format.class";

@Component({
  components: {},
})
export default class FormatSelectionSettings extends Vue {
  private possibleFormats: FormatGroup[] = formats;

  @Prop()
  public currentFormat!: Format;

  @Emit("format")
  select(format: Format) {
    return format;
  }
}
</script>

<style lang="scss">
.format-selection-settings {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  .format-group {
    h2 {
    }
    .formats {
      display: flex;
      flex-flow: row wrap;
      gap: 16px;
      justify-content: center;
      .format {
        &.active {
          background-color: #eee;
        }
        .format-preview {
          width: 200px;
          height: 150px;
          border: 2px solid grey;
            display: flex;
            justify-content: center;
            align-items: center;
          .size-label {
            font-size: 24px;
          }
        }
        h3 {
        }
      }
    }
  }
}
</style>
