<template>
  <form
    :id="form"
    :ref="form"
    class="vueForm"
    :name="form"
    :novalidate="validate"
    :autocomplete="autocomplete"
    @submit="ctx"
  >
    <div class="formElements">
      <slot />
    </div>
    <div class="formButtons">
      <vue-button
        type="submit"
        text="Submit"
        tag="formSubmitButton"
        category="small"
        icon="fas fa-clipboard-check"
        :disabled="!validInput"
        :ctx="ctx"
      />
      <input class="btn" type="reset" value="Reset" />
    </div>
  </form>
</template>

<script>
import vueButton from "@/components/vueButton";

export default {
  name: "VueForm", //props

  components: {
    vueButton
  }, //data

  props: {
    alert: {
      required: true,
      type: Object
    },
    ctx: {
      required: true,
      type: Function
    },
    form: {
      required: false,
      type: [String, null],
      default: null
    },
    autocomplete: {
      required: false,
      type: [Boolean, null],
      default: true
    },
    validate: {
      required: false,
      type: [Boolean, null],
      default: false
    }
  },

  // data() {
  //   const dWarning = null;
  //   const dDanger = null;

  //   return {
  //     dWarning,
  //     dDanger
  //   };
  // }, //data

  computed: {
    validInput: function() {
      const alert = this.alert;
      const form = this.$refs[this.form];
      if (form && !alert["error"] && !alert["warning"]) {
        const inputs = [
          ...Array.from(form.getElementsByTagName("select")),
          ...Array.from(form.getElementsByTagName("input"))
        ];

        for (let index = 0; index < inputs.length; ++index) {
          if (inputs[index].required && !inputs[index].value) {
            return false;
          }
          //skipPAsswordMatch value check
          if (inputs[index].type === "password") {
            index++;
          }
        }
        return true;
      }
      return false;
    } //validInput
  }, //computed

  methods: {
    alerts: function(type, message) {
      // console.log(message);
      if (type == "warning") {
        this.dWarning = message;
      } else if (type == "error") {
        this.dDanger = message;
      } else {
        alert("error in input alert module");
      }
    } //alerts
  } //methods
}; //default
</script>

<style lang="less" scoped>
@import (reference) "../Less/customMixins.less";
@import (reference) "../Less/customVariables.less";

.vueForm {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin: 0 auto;
  & > div {
    display: flex;
    &.formElements {
      flex-direction: column;
    }
    &.formButtons {
      flex-direction: row-reverse;
      & > input {
        font-size: @fontSizeMd;
        margin-right: @spaceMd;
        &:first-child {
          margin-right: 0;
        }
        &[type="reset"] {
          background-color: transparent;
        }
      }
    }
  }
}
</style>
