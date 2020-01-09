<template>
  <v-container>
    <v-layout justify-center wrap>
      <v-data-table
        dense
        :headers="headers"
        :items="products"
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Manage Product</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn
                  small
                  color="primary"
                  dark
                  class="mb-2"
                  v-on="on"
                  @click="editFlag = false"
                  >New Product</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Product Name"
                          :readonly="editFlag"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.description"
                          label="Description"
                          :readonly="editFlag"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.stock"
                          label="# of Stock"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.price"
                          label="Price"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
          <v-icon small @click="deleteItem(item)">delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from "../firebase";
//import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      editFlag: false,
      itemId: "",
      headers: [
        {
          text: "Product name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Product description", value: "description" },
        { text: "# of stocks", value: "stock" },
        { text: "Price", value: "price" },
        { text: "Actions", value: "action", sortable: false }
      ],

      products: [],
      editedItem: {
        name: "",
        description: "",
        stock: 0,
        price: 0
      },
      defaultItem: {
        name: "",
        description: "",
        stock: 0,
        price: 0
      }
    };
  },

  firestore() {
    return {
      products: db.collection("product").orderBy("name")
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  computed: {
    formTitle() {
      return this.editFlag ? "Edit Item" : "Add Product";
    }
  },

  methods: {
    editItem(item) {
      this.editFlag = true;
      this.editedItem = Object.assign({}, item);
      this.itemId = item.id;
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this Product?") &&
        db
          .collection("product")
          .doc(item.id)
          .delete();
    },

    save() {
      if (this.editFlag) {
        db.collection("product")
          .doc(this.itemId)
          .update({
            stock: this.editedItem.stock,
            price: this.editedItem.price
          })
          .then(() => {
            console.log("product updated");
          });
      } else {
        db.collection("product")
          .add(this.editedItem)
          .then(docRef => {
            console.log("New product added ", docRef.id);
          })
          .catch(error => {
            console.error("Error adding product: ", error);
          });
      }
      this.close(); //close the dialog
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      }, 300);
    }
  }
};
</script>
