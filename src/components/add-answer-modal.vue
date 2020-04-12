<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Add new answer</p>
      </header>
      <section class="modal-card-body">
        <b-field
          label="Your answer:"
          message="Note: use markdown to format your answer."
        >
          <b-input
            v-model="form.body"
            placeholder="Provide an answer"
            type="textarea"
          >
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Close
        </button>
        <button class="button is-primary" type="button" @click="onSubmit()">
          Submit
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    questionId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: {
        title: "",
        body: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$http
        .post(`api/question/${this.questionId}/answer`, this.form)
        .then(res => {
          this.$emit("answer-added", res.data);
          this.$parent.close();
        });
    },
    onHidden() {
      Object.assign(this.form, {
        title: "",
        body: ""
      });
    }
  }
};
</script>
