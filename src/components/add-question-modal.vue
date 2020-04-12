<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Add new question</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Title:">
          <b-input v-model="form.title" placeholder="Please provide a title">
          </b-input>
        </b-field>
        <b-field
          label="Your question:"
          message="Note: use markdown to format your question."
        >
          <b-input
            v-model="form.body"
            placeholder="What do you need answered?"
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
  data() {
    return {
      form: {
        title: "",
        body: ""
      }
    };
  },
  methods: {
    onSubmit(evt) {
      this.$http.post("api/question", this.form).then(res => {
        this.$emit("question-added", res.data);
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
