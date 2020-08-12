<template>
  <div class="home">
    <img src="@/assets/logo.png" alt="Vue Logo" id="vue-logo" />
    <div class="title">What do I need to do today?</div>
    <input v-model="myTodo" />
    <button @click="addTodo">Add</button>
    <div v-if="errors != ''" id="errors">{{ errors }}</div>

    <div
      v-if="
        this.$store.getters.getItems && this.$store.getters.getItems.length > 0
      "
    >
      <div class="title">Todos that need to be done today</div>

      <div v-for="item in this.$store.getters.getItems" :key="item.id">
        {{ item.title }}<br /><br />
        <small style="text-decoration:underline;" @click="deleteItem(item.id)"
          >Delete</small
        >
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
export default {
  name: "App",
  beforeCreate: function() {
    this.$store.dispatch("setItems");
  },
  data: function() {
    return {
      myTodo: "",
      errors: "",
    };
  },
  methods: {
    addTodo: function() {
      this.errors = "";

      if (this.myTodo !== "") {
        db.collection("items")
          .add({
            title: this.myTodo,
            createdAt: Date.now(),
          })
          .then((response) => {
            if (response) {
              this.myTodo = "";
            }
          })
          .catch((error) => {
            this.errors = error;
          });
      } else {
        this.errors = "Enter a todo";
      }
      //console.log("myTodo: " + this.myTodo);
    },
    deleteItem: function(id) {
      if (id) {
        db.collection("items")
          .doc(id)
          .delete()
          .then(function() {
            console.log("deleted");
          })
          .catch(function(e) {
            this.errors = e;
          });
      } else {
        this.errors = "no Id";
      }
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body,
html,
#app {
  background: green;
}

.home {
  width: 300px;
  margin: auto;
  margin-top: 15px;
}

#vue-logo {
  width: 100px;
}

input,
button {
  border: 0;
  width: 100px;
  margin: 0 0 10 px;
  padding: 7px;
}

input {
  font-size: 12px;
}

button {
  background: #43b823;
  border: 0;
  text-transform: uppercase;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}
title {
  font-size: 14px;
  font-weight: 700;
  padding: 0 0 10 0;
  margin: 0 0 10 0;
  border: 1px solid #6666;
}
#errors {
  background: #a52222;
  color: #fff;
  padding: 5px;
}
</style>
